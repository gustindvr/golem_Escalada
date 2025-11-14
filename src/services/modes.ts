import { Mode } from "@/types/modes";

type ApiResponse<T> = {
  status: number;
  message: string;
  data: T;
};

export async function getModes(): Promise<Mode[] | null> {
  try {
    const res = await fetch("/api/modes");
    if (!res.ok) return null;

    const json = (await res.json()) as ApiResponse<Mode[]>;

    if (Array.isArray(json.data)) return json.data;
    return null;
  } catch (err) {
    console.error("Error fetching modes:", err);
    return null;
  }
}
