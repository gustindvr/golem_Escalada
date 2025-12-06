export interface Payment {
  id: number;
  name: string;
  amount: number;
  mode_id: number;
  type_id: number;
  date: string;
}

export interface PaymentCreateDTO {
  name: string;
  amount: number;
  mode_id: number;
  type: string;
  type_id: number;
  date: string | null;
}