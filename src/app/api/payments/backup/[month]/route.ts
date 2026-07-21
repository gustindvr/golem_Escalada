import { supabaseStorageAdmin } from "@/utils/supabaseStorageHelpers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ month: string }> }
) {
  if (!supabaseStorageAdmin) {
    return NextResponse.json({ error: "Supabase admin client no configurado" }, { status: 500 });
  }

  const { month } = await context.params;
  const fileName = `${month}.xlsx`;

  console.log(fileName);

  const { data, error } = await supabaseStorageAdmin
    .storage
    .from("historicos")
    .download(fileName);

  console.log("data:", data);
  console.log("error:", error);

  if (error || !data) {
    return NextResponse.json({ error: "No existe el histórico" }, { status: 404 });
  }

  const buffer = Buffer.from(await data.arrayBuffer());
  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${fileName}"`,
    },
  });
}
