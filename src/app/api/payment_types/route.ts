import { pool } from "@/lib/db";
import { apiResponse } from "@/utils/apiResponse";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const modeId = searchParams.get("mode_id");

    const rows = await pool.query(
      "SELECT * FROM payment_types WHERE mode_id = $1",
      [Number(modeId)]
    );
    const types = rows.rows || [];
    return apiResponse(200, "Tipos obtenidos", types);
  } catch (error) {
    console.error(error);
    return apiResponse(500, "Error al obtener tipos");
  }
}