export interface PaymentCreateDTO {
  name: string;
  amount: number;
  type: string;
  date: string | null;
}