export interface Payment {
  id: number;
  name: string;
  amount: number;
  mode_id: number;
  type_id: number;
  date: string;
  payment_method?: string | null;
  paid?: boolean | null;
  description?: string | null;
}

export interface PaymentCreateDTO {
  name: string;
  amount: number;
  mode_id: number;
  type_id: number;
  date: string | null;
  payment_method?: string | null;
  paid?: boolean | null;
  description?: string | null;
}

export interface PaymentDeleteDTO {
  id: number;
}

export interface PaymentEditDTO {
  id: number;
  name: string;
  amount: number;
  mode_id: number;
  type_id: number;
  date: string | null;
  payment_method?: string | null;
  paid?: boolean | null;
}

export interface PaymentEvent {
  id: number;
  name: string;
  amount: number;
  mode_id: number;
  type: string;
  date: string;
  description: string;
}