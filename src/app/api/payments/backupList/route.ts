import { supabaseStorageAdmin } from "@/utils/supabaseStorageHelpers";
import { NextResponse } from "next/server";

export async function GET() {
  if (!supabaseStorageAdmin) {
    return NextResponse.json({ error: "Supabase admin client no configurado" }, { status: 500 });
  }

  const { data, error } = await supabaseStorageAdmin
    .storage
    .from("historicos")
    .list("");

  if (error || !data) {
    return NextResponse.json([], { status: 500 });
  }

  const months = data.map((f) => f.name.replace(".json", ""));
  return NextResponse.json(months);
}
