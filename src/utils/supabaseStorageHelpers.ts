import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;

export const supabaseStorage = createClient(supabaseUrl, supabaseKey);

export async function listFiles(bucket: string) {
  const { data, error } = await supabaseStorage
    .storage
    .from(bucket)
    .list("", { limit: 1000, sortBy: { column: "name", order: "asc" } }); // lista todos los archivos por nombre

  if (error) {
    console.error("Error listando archivos:", error);
    return [];
  }
  return data || [];
}
