import { useState } from "react";
import { PaymentEvent, type Payment } from "@/types/payments";

type UsePaymentActions = {
  selected: Payment | null;
  selectedEvent: PaymentEvent | null;
  mode: "edit" | "delete" | "view" | null;
  openEdit: (row: Payment) => void;
  openDelete: (row: Payment) => void;
  openView: (row: PaymentEvent) => void;
  close: () => void;
};

export function usePaymentRowActions(): UsePaymentActions {
  const [selected, setSelected] = useState<Payment | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<PaymentEvent | null>(null);
  const [mode, setMode] = useState<"edit" | "delete" | "view" | null>(null);

  const openEdit = (row: Payment) => {
    setSelected(row);
    setMode("edit");
  };
  const openDelete = (row: Payment) => {
    setSelected(row);
    setMode("delete");
  };
  const openView = (row: PaymentEvent) => {
    setSelectedEvent(row);
    setMode("view");
  }
  const close = () => {
    setSelected(null);
    setSelectedEvent(null);
    setMode(null);
  };

  return { selected, selectedEvent, mode, openEdit, openDelete, openView, close };
}