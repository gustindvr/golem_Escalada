import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { cleanOldFiles } from "@/utils/cleanOldFiles";
import { buildExcelBuffer } from "@/utils/excelExport";
import { sendHistoricalFile, supabaseStorageAdmin } from "@/utils/supabaseStorageHelpers";

async function getModeName(modeId: number) {
  const { rows } = await pool().query("SELECT name FROM modes WHERE id = $1", [modeId]);
  return rows[0]?.name?.toLowerCase() ?? `modo-${modeId}`;
}

async function storageObjectExists(bucket: string, objectPath: string) {
  if (!supabaseStorageAdmin) {
    return false;
  }

  const downloadResult = await supabaseStorageAdmin.storage.from(bucket).download(objectPath);
  const data = downloadResult?.data;
  const error = downloadResult?.error;

  return !error && Boolean(data);
}

export async function POST(request: Request) {
  console.log("[backupMonthly] POST start");
  console.log("[backupMonthly] user-agent:", request.headers.get("user-agent"));

  try {
    const body = await request.json().catch(() => ({}));
    const modeId = Number(body?.modeId ?? 0);

    if (!modeId) {
      return NextResponse.json({ success: false, message: "Falta modeId" }, { status: 400 });
    }

    // 1) Calcular mes
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2, "0")}`;
    const modeName = await getModeName(modeId);
    const filePath = `${modeName}/${currentMonth}.xlsx`;

    // 2) Verificar si el backup ya existe en Storage y/o en la tabla de control
    const { rows } = await pool().query(
      "SELECT 1 FROM monthly_backups WHERE month = $1 AND mode_id = $2",
      [currentMonth, modeId]
    );
    const hasDbBackup = rows.length > 0;
    const hasStorageBackup = await storageObjectExists("historicos", filePath);

    console.log("[backupMonthly] hasDbBackup:", hasDbBackup);
    console.log("[backupMonthly] hasStorageBackup:", hasStorageBackup);

    if (hasDbBackup && hasStorageBackup) {
      return NextResponse.json({ success: false, message: "Backup ya hecho este mes" });
    }

    // 3) Traer solo los pagos del mes actual y del modo solicitado
    const result = await pool().query(
      `SELECT * FROM payments WHERE mode_id = $1 AND to_char(date::date, 'YYYY-MM') = $2`,
      [modeId, currentMonth]
    );
    const payments = result.rows;

    // 4) Limpiar primero (para no pasarnos del free tier)
    await cleanOldFiles("historicos");
    console.log("Old historical files cleaned up successfully.");
    console.log(currentMonth, "current month for backup");
    console.log(payments, "payments to backup");

    // 5) Subir Excel compatible (TSV) a Supabase Storage
    const fileBuffer = await buildExcelBuffer(payments);
    const uploadError = await sendHistoricalFile("historicos", filePath, fileBuffer);

    if (!uploadError) {
      return NextResponse.json({ success: false, message: "Error subiendo histórico" });
    }

    // 6) Marcar en la DB que hicimos backup (evitar condición de carrera)
    const insertRes = await pool().query(
      "INSERT INTO monthly_backups (month, mode_id) VALUES ($1, $2) ON CONFLICT (month, mode_id) DO NOTHING RETURNING month",
      [currentMonth, modeId]
    );

    // Si no se insertó significa que otro proceso marcó el backup concurrentemente
    if (insertRes.rowCount === 0) {
      // eliminar el archivo subido por esta ejecución para no dejar duplicados
      try {
        await supabaseStorageAdmin?.storage.from("historicos").remove([filePath]);
      } catch (e) {
        console.error("Error removing uploaded historical file after concurrent backup:", e);
      }

      return NextResponse.json({ success: false, message: "Backup ya hecho este mes" });
    }

    // 7) Solo borrar los pagos si el archivo quedó realmente subido en Storage
    const downloadResult = await supabaseStorageAdmin
      ?.storage
      .from("historicos")
      .download(filePath);
    const storageData = downloadResult?.data;
    const storageError = downloadResult?.error;

    if (!storageError && storageData) {
      await pool().query(
        "DELETE FROM payments WHERE mode_id = $1 AND to_char(date::date, 'YYYY-MM') = $2",
        [modeId, currentMonth]
      );
    } else {
      console.warn("[backupMonthly] Backup file not found in storage; skipping payment deletion.", storageError);
    }

    return NextResponse.json({ success: true, month: currentMonth });
  } catch (err) {
    console.error("Backup mensual error:", err);
    return NextResponse.json({ success: false, message: "Error interno" }, { status: 500 });
  }
}
