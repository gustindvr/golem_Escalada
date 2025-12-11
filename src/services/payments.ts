import { ApiResponse } from "@/types/api";
import { PaymentCreateDTO, PaymentDeleteDTO, PaymentEditDTO } from "@/types/payments";

export async function registerPayment(
  payload: PaymentCreateDTO
): Promise<ApiResponse<{ id: number }> | null> {
  try {
    const res = await fetch("/api/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) return null;

    return (await res.json()) as ApiResponse<{ id: number }>;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deletePayment( 
  payload: PaymentDeleteDTO 
): Promise<ApiResponse<{ id: number }> | null> {
  try {
    const res = await fetch("/api/payments", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) return null;

    return (await res.json()) as ApiResponse<{ id: number }>;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function editPayment(
  payload: PaymentEditDTO
): Promise<ApiResponse<{ id: number }> | null> {
  try {
    const res = await fetch("/api/payments", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) return null;
    return (await res.json()) as ApiResponse<{ id: number }>;
  } catch (error) {
    console.error(error);
    return null;
  }
}