import { pool } from "@/lib/db";
import { apiResponse } from "@/utils/apiResponse";
import { RowDataPacket } from "mysql2";

export async function GET() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM modes"
    );
    return apiResponse(200, "Modos obtenidos correctamente", rows);
  } catch (error) {
    console.error("Error en GET /modes:", error);
    return apiResponse(500, "Error interno del servidor");
  }
}