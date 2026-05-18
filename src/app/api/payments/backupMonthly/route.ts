import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { cleanOldFiles } from "@/utils/cleanOldFiles";
import { supabaseStorage } from "@/utils/supabaseStorageHelpers";

export async function POST() {
  try {
    // 1) Calcular mes
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2, "0")}`;

    // 2) Chequear en la tabla si ya se hizo backup
    const { rows } = await pool().query(
      "SELECT 1 FROM monthly_backups WHERE month = $1",
      [currentMonth]
    );
    if (rows.length > 0) {
      return NextResponse.json({ success: false, message: "Backup ya hecho este mes" });
    }

    // 3) Traer todos los pagos
    const result = await pool().query("SELECT * FROM payments");
    const payments = result.rows;

    // 4) Limpiar primero (para no pasarnos del free tier)
    await cleanOldFiles("historicos");

    // 5) Subir JSON a Supabase Storage
    const filePath = `${currentMonth}.json`;
    const fileBuffer = Buffer.from(JSON.stringify(payments, null, 2));
    const { error: uploadError } = await supabaseStorage
      .storage
      .from("historicos")
      .upload(filePath, fileBuffer, { upsert: true });

    if (uploadError) {
      return NextResponse.json({ success: false, message: "Error subiendo histórico" });
    }

    // 6) Marcar en la DB que hicimos backup
    await pool().query(
      "INSERT INTO monthly_backups (month) VALUES ($1)",
      [currentMonth]
    );

    // 7) Borrar pagos
    await pool().query("DELETE FROM payments");

    return NextResponse.json({ success: true, month: currentMonth });
  } catch (err) {
    console.error("Backup mensual error:", err);
    return NextResponse.json({ success: false, message: "Error interno" }, { status: 500 });
  }
}
