import { Table } from "antd"
import { useEffect, useState } from "react"
import { dataClientColumns } from "./utils/columnsClients"

export interface Pagos {
  id: number
  client: string
  amount: number
  type: string
  date: string
};

const TableComponent = () => {
  const [pagos, setPagos] = useState<Pagos[]>([]);
  
  useEffect(() => {
    fetch("/api/payments")
      .then(res => res.json())
      .then(data => setPagos(data.data))
  }, [])

  return (
    <Table
      dataSource={pagos}
      columns={dataClientColumns}
      rowKey="id"
      scroll={{ x: 320 }}
      pagination={{
        position: ["bottomCenter"],
      }}
    />
  )
}

export default TableComponent