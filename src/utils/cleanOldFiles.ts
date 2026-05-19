import { supabaseStorage } from "./supabaseStorageHelpers";


export async function cleanOldFiles(bucket: string, maxFiles = 5) {
  // listamos todos los archivos
  const { data: files, error } = await supabaseStorage
    .storage
    .from(bucket)
    .list("", { limit: 1000 });

  if (error || !files) return;

  // ordenamos por nombre (asumiendo formato YYYY-MM.json)
  const sorted = files?.sort((a, b) => a.name.localeCompare(b.name)) || [];

  const totalFiles = sorted.length;

  // si hay más archivos que el máximo permitido...
  if (totalFiles > maxFiles) {
    // calculamos cuántos eliminar
    const removeCount = totalFiles - maxFiles;
    const toRemove = sorted.slice(0, removeCount).map(f => f.name);

    // eliminamos los más antiguos
    await supabaseStorage
      .storage
      .from(bucket)
      .remove(toRemove);
  }
}
