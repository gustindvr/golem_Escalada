import { TableProps } from "antd"
import { formatAmount } from "@/utils/commons"
import { PaymentEvent } from "@/types/payments"

export const dataEventClientColumns: TableProps<PaymentEvent>['columns'] = [
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
    title: "Descripción",
    dataIndex: "description",
    key: "description",
    align: "center",
  },
]