import { Checkbox } from "antd"
import type { TableColumnsType } from "antd"
import { formatAmount, formatDate } from "@/utils/commons"
import { Payment } from "@/types/payments"
import { editPayment } from "@/services/payments"

export const dataClientColumns = (modeId: number, refresh: () => void): TableColumnsType<Payment> => {
  const columns: TableColumnsType<Payment> = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Monto",
      dataIndex: "amount",
      key: "amount",
      align: "center",
      render: (amount: number) => formatAmount(amount),
    },
    {
      title: "Tipo",
      dataIndex: "type",
      key: "type",
      align: "center",
      responsive: ["md"],
    },
    {
      title: "Fecha",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (date: string) => formatDate(date),
    },
    {
      title: "Medio de pago",
      dataIndex: "payment_method",
      key: "payment_method",
      align: "center",
      render: (paymentMethod: string | null) => paymentMethod ? (paymentMethod === "transferencia" ? "Transferencia" : "Efectivo") : "-",
    },
  ];

  if (modeId === 3) {
    columns.push({
      title: "Pagó",
      dataIndex: "paid",
      key: "paid",
      align: "center",
      render: (_: unknown, record: Payment) => (
        <Checkbox
          checked={Boolean(record.paid)}
          onChange={async (e) => {
            await editPayment({
              id: record.id,
              name: record.name,
              amount: record.amount,
              mode_id: record.mode_id,
              type_id: record.type_id,
              date: record.date,
              payment_method: record.payment_method ?? null,
              paid: e.target.checked,
            });
            refresh();
          }}
        />
      ),
    });
  }

  return columns;
}