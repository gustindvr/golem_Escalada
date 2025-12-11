import { TableProps } from "antd"
import { formatAmount, formatDate } from "@/utils/commons"
import { Payment } from "@/types/payments"

export const dataClientColumns: TableProps<Payment>['columns'] = [
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
]