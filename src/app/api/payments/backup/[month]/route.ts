import { supabaseStorage } from "@/utils/supabaseStorageHelpers";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { month: string } }) {
  const { month } = params;
  const { data, error } = await supabaseStorage
    .storage
    .from("historicos")
    .download(`${month}.json`);

  if (error || !data) {
    return NextResponse.json({ error: "No existe el histórico" }, { status: 404 });
  }

  const text = await data.text();
  return NextResponse.json(JSON.parse(text));
}
