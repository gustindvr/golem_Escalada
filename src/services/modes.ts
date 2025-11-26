import { ApiResponse } from "@/types/api";
import { Mode } from "@/types/modes";

export async function getModes(): Promise<Mode[]> {
  const res = await fetch("/api/modes");
  const json = (await res.json()) as ApiResponse<Mode[]>;
  return json.data;
}