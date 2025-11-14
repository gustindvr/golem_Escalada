import { PaymentCreateDTO } from "@/types/payments";

type ApiResponse<T> = {
  status: number;
  message: string;
  data: T;
};

export async function registerPayment(
  payload: PaymentCreateDTO
): Promise<ApiResponse<{ id: number }> | null> {

  const res = await fetch("/api/payments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) return null;

  const json = (await res.json()) as ApiResponse<{ id: number }>;
  return json;
}