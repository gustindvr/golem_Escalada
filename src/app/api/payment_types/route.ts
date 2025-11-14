import { pool } from "@/lib/db";
import { apiResponse } from "@/utils/apiResponse";

export async function GET(modeId: number) {
  try {
    const [rows] = await pool.query(
  "SELECT id, name FROM payment_types WHERE mode_id = ?",
  [modeId]
);

    return apiResponse(200, "Tipos de pagos obtenidos correctamente", rows);
  } catch (error) {
    console.error("Error en GET /payment_types:", error);
    return apiResponse(500, "Error interno del servidor");
  }
}