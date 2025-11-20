"use client";

import { Table } from "antd";
import { useEffect, useState } from "react";

export default function TableComponent({ modeId }: { modeId: number }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`/api/payments?mode_id=${modeId}`)
      .then(res => res.json())
      .then(json => setData(json.data));
  }, [modeId]);

  return (
    <Table
      rowKey="id"
      dataSource={data}
      columns={[
        { title: "Cliente", dataIndex: "name" },
        { title: "Monto", dataIndex: "amount" },
        { title: "Fecha", dataIndex: "date" },
      ]}
    />
  );
}
