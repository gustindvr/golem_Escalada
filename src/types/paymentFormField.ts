export type PaymentFormFields = {
  name: string;
  amount: number;
  type_id: number;
  date: { $d: Date };
};