import { useState } from "react";
import type { Payment } from "@/types/payments";

type UsePaymentActions = {
  selected: Payment | null;
  mode: "edit" | "delete" | null;
  openEdit: (row: Payment) => void;
  openDelete: (row: Payment) => void;
  close: () => void;
};

export function usePaymentRowActions(): UsePaymentActions {
  const [selected, setSelected] = useState<Payment | null>(null);
  const [mode, setMode] = useState<"edit" | "delete" | null>(null);

  const openEdit = (row: Payment) => {
    setSelected(row);
    setMode("edit");
  };
  const openDelete = (row: Payment) => {
    setSelected(row);
    setMode("delete");
  };
  const close = () => {
    setSelected(null);
    setMode(null);
  };

  return { selected, mode, openEdit, openDelete, close };
}