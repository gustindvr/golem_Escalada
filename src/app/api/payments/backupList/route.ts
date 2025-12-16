import { supabaseStorage } from "@/utils/supabaseStorageHelpers";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabaseStorage
    .storage
    .from("historicos")
    .list("");

  if (error || !data) return NextResponse.json([], { status: 500 });

  const months = data.map(f => f.name.replace(".json",""));
  return NextResponse.json(months);
}
