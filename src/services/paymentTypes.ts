import { PaymentType } from "@/types/paymentsTypes";
import { ApiResponse } from "@/types/api";

export async function getPaymentTypes(modeId: number): Promise<PaymentType[]> {
  const res = await fetch(`/api/payment_types?mode_id=${modeId}`);
  const json = (await res.json()) as ApiResponse<PaymentType[]>;
  return json.data;
}