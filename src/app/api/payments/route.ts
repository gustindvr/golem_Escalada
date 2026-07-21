import { pool } from "@/lib/db";
import { PaymentCreateDTO } from "@/types/payments";
import { apiResponse } from "@/utils/apiResponse";


// ==================== POST (Create) ====================
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as PaymentCreateDTO;

    const { name, amount, mode_id, type_id, date, payment_method, paid, description } = body;
    const shouldUsePaid = Number(mode_id) === 3;

    const result = await pool().query(
      shouldUsePaid
        ? `INSERT INTO payments (name, amount, mode_id, type_id, date, payment_method, paid, description)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           RETURNING id`
        : `INSERT INTO payments (name, amount, mode_id, type_id, date, payment_method, description)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           RETURNING id`,
      shouldUsePaid
        ? [name, amount, mode_id, type_id, date, payment_method ?? null, paid ?? false, description ?? null]
        : [name, amount, mode_id, type_id, date, payment_method ?? null, description ?? null]
    );
    const inserted = result.rows[0];
    return apiResponse(201, "Pago creado correctamente", { id: inserted.id });
  } catch (error) {
    console.error(error);
    return apiResponse(500, "Error al crear pago");
  }
}

// ==================== GET (Read) ====================
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const modeId = Number(searchParams.get("mode_id") ?? 1);

    const sql = `
      SELECT
        p.id,
        p.name,
        p.amount,
        p.date,
        p.mode_id,
        p.type_id,
        p.payment_method,
        p.paid,
        p.description,
        pt.name AS type
      FROM payments p
      JOIN payment_types pt
        ON p.type_id = pt.id
      WHERE p.mode_id = $1
      ORDER BY p.id DESC
    `;

    const result = await pool().query(sql, [modeId]);
    const rows = result.rows;

    return apiResponse(200, "Pagos obtenidos correctamente", rows);
  } catch (error) {
    console.error("Error en GET /payments:", error);
    return apiResponse(500, "Error al obtener pagos");
  }
}

// ==================== PUT (Update) ====================
export async function PUT(request: Request) {
  try {
    const { id, name, amount, mode_id, type_id, date, payment_method, paid } = await request.json();
    const shouldUsePaid = Number(mode_id) === 3;

    if (!id) {
      return apiResponse(400, "ID requerido");
    }

    const fields: string[] = [];
    const values: unknown[] = [];
    let idx = 1;

    if (name !== undefined) {
      fields.push(`name = $${idx++}`);
      values.push(name);
    }
    if (amount !== undefined) {
      fields.push(`amount = $${idx++}`);
      values.push(amount);
    }
    if (mode_id !== undefined) {
      fields.push(`mode_id = $${idx++}`);
      values.push(mode_id);
    }
    if (type_id !== undefined) {
      fields.push(`type_id = $${idx++}`);
      values.push(type_id);
    }
    if (date !== undefined) {
      const dateOnly = typeof date === "string"
        ? date.split("T")[0]
        : null;
      if (!dateOnly || isNaN(new Date(dateOnly).getTime())) {
        return apiResponse(400, "Fecha inválida");
      }
      fields.push(`date = $${idx++}`);
      values.push(dateOnly);
    }
    if (payment_method !== undefined) {
      fields.push(`payment_method = $${idx++}`);
      values.push(payment_method ?? null);
    }
    if (shouldUsePaid && paid !== undefined) {
      fields.push(`paid = $${idx++}`);
      values.push(paid);
    }

    if (fields.length === 0) {
      return apiResponse(400, "No hay campos para actualizar");
    }

    values.push(id);
    const sql = `
      UPDATE payments
      SET ${fields.join(", ")}
      WHERE id = $${idx}
      RETURNING id
    `;

    const result = await pool().query(sql, values);
    if (result.rowCount === 0) {
      return apiResponse(404, "Pago no encontrado");
    }

    return apiResponse(200, "Pago actualizado correctamente", { id: result.rows[0].id });
  } catch (error) {
    console.error("Error en PUT /payments:", error);
    return apiResponse(500, "Error interno del servidor");
  }
}

// ==================== DELETE (Delete) ====================
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return apiResponse(400, "ID requerido");
    }

    const result = await pool().query(
      "DELETE FROM payments WHERE id = $1 RETURNING id",
      [id]
    );

    if (result.rowCount === 0) {
      return apiResponse(404, "Pago no encontrado");
    }

    return apiResponse(200, "Pago eliminado correctamente", { id: result.rows[0].id });
  } catch (error) {
    console.error("Error en DELETE /payments:", error);
    return apiResponse(500, "Error interno del servidor");
  }
}