import { pool } from "@/lib/db";
import { apiResponse } from "@/utils/apiResponse";

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM modes");
    const modes = result.rows || [];
    return apiResponse(200, "Modos obtenidos correctamente", modes);
  } catch (error) {
    console.error("Error en GET /modes:", error);
    return apiResponse(500, "Error interno del servidor");
  }
}