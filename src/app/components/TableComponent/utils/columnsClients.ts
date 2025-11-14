import { TableProps } from "antd"
import { Pagos } from "../TableComponent"
import { formatAmount, formatDate } from "@/utils/commons"

export const dataClientColumns: TableProps<Pagos>['columns'] = [
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
    render: (amount) => formatAmount(amount)
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
    render: (date) => formatDate(date)
  },
]