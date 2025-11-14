import { pool } from "@/lib/db";
import { apiResponse } from "@/utils/apiResponse";
import { ResultSetHeader, RowDataPacket } from 'mysql2';


// ==================== POST (Create) ====================
export async function POST(request: Request) {
  try {
    const { name, amount, type, date } = await request.json();

    if (!name || !amount || !type || !date) {
      return apiResponse(400, `Faltan campos requeridos name: ${name}, amount: ${amount}, type: ${type}, date: ${date}`);
    }

    const mysqlDate =
      typeof date === "string" ? date.split("T")[0] : null;

    if (!mysqlDate || isNaN(new Date(mysqlDate).getTime())) {
      return apiResponse(400, "Fecha inválida");
    }

    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO pagos (name, amount, type, date) VALUES (?, ?, ?, ?)",
      [name, amount, type, mysqlDate]
    );
    return apiResponse(201, "Pago registrado correctamente", {
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error en POST /pagos:", error);
    return apiResponse(500, "Error interno del servidor");
  }
}

// ==================== GET (Read) ====================
export async function GET() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM pagos ORDER BY id DESC"
    );

    return apiResponse(200, "Pagos obtenidos correctamente", rows);
  } catch (error) {
    console.error("Error en GET /pagos:", error);
    return apiResponse(500, "Error interno del servidor");
  }
}

// ==================== PUT (Update) ====================
export async function PUT(request: Request) {
  try {
    const { id, name, amount, type, date } = await request.json();

    if (!id) return apiResponse(400, "ID requerido");
    if (!name && !amount && !type && !date)
      return apiResponse(400, "No hay campos para actualizar");

    const fields: string[] = [];
    const values: (string | number)[] = [];

    if (name) {
      fields.push("name = ?");
      values.push(name);
    }
    if (amount) {
      fields.push("amount = ?");
      values.push(amount);
    }
    if (type) {
      fields.push("type = ?");
      values.push(type);
    }
    if (date) {
      const mysqlDate =
        typeof date === "string" ? date.split("T")[0] : null;
      if (!mysqlDate || isNaN(new Date(mysqlDate).getTime())) {
        return apiResponse(400, "Fecha inválida");
      }
      fields.push("date = ?");
      values.push(mysqlDate);
    }

    values.push(id);

    const [result] = await pool.query<ResultSetHeader>(
      `UPDATE pagos SET ${fields.join(", ")} WHERE id = ?`,
      values
    );

    if (result.affectedRows === 0) {
      return apiResponse(404, "Pago no encontrado");
    }

    return apiResponse(200, "Pago actualizado correctamente");
  } catch (error) {
    console.error("Error en PUT /pagos:", error);
    return apiResponse(500, "Error interno del servidor");
  }
}

// ==================== DELETE (Delete) ====================
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) return apiResponse(400, "ID requerido");

    const [result] = await pool.query<ResultSetHeader>(
      "DELETE FROM pagos WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return apiResponse(404, "Pago no encontrado");
    }

    return apiResponse(200, "Pago eliminado correctamente");
  } catch (error) {
    console.error("Error en DELETE /pagos:", error);
    return apiResponse(500, "Error interno del servidor");
  }
}