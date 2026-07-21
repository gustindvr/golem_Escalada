import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function normalizeSupabaseUrl(rawUrl: string) {
  const value = rawUrl?.trim();
  if (!value) return "";

  const withoutTrailingSlash = value.replace(/\/+$/, "");
  const storageUrlMatch = withoutTrailingSlash.match(/^https?:\/\/([^.]+)\.storage\.supabase\.co\/storage\/v1\/s3$/i);

  if (storageUrlMatch?.[1]) {
    return `https://${storageUrlMatch[1]}.supabase.co`;
  }

  return withoutTrailingSlash;
}

function isPlaceholderKey(key: string | undefined) {
  if (!key) return true;

  const normalized = key.trim();
  return (
    normalized.length < 20 ||
    normalized.includes("*****") ||
    normalized.toLowerCase() === "service_role_admin" ||
    normalized.toLowerCase() === "your_service_role_key" ||
    normalized.toLowerCase() === "your_anon_key"
  );
}

const supabaseUrl = normalizeSupabaseUrl(process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "");
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

function createSupabaseStorageClient(url: string, key: string) {
  if (!url || !key || isPlaceholderKey(key)) {
    console.error("[supabaseStorage] Invalid or placeholder Supabase key detected. Set a real SUPABASE_ANON_KEY or SUPABASE_SERVICE_ROLE_KEY in the environment.");
    return null;
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export const supabaseStorage = createSupabaseStorageClient(supabaseUrl, supabaseAnonKey) as SupabaseClient | null;
export const supabaseStorageAdmin = createSupabaseStorageClient(supabaseUrl, supabaseServiceRoleKey) as SupabaseClient | null;

function getStorageClient(useAdmin = false) {
  return useAdmin ? supabaseStorageAdmin : supabaseStorage;
}

export async function listFiles(bucket: string) {
  const storageClient = getStorageClient(true);

  if (!storageClient) {
    console.error("Supabase Storage no está configurado correctamente");
    return [];
  }

  const { data, error } = await storageClient
    .storage
    .from(bucket)
    .list("", { limit: 1000, sortBy: { column: "name", order: "asc" } });

  if (error) {
    console.error("Error listando archivos:", error);
    return [];
  }

  return data || [];
}

export async function sendHistoricalFile(bucket: string, filePath: string, fileBuffer: Buffer) {
  const storageClient = getStorageClient(true);

  if (!storageClient) {
    console.error("Supabase Storage no está configurado correctamente");
    return false;
  }

  try {
    const { data, error } = await storageClient
      .storage
      .from(bucket)
      .upload(filePath, fileBuffer, { upsert: true });

    if (error) {
      console.error("Error subiendo archivo histórico:", error);
      return false;
    }

    return Boolean(data);
  } catch (error) {
    console.error("Error uploading historical file:", error);
    return false;
  }
}