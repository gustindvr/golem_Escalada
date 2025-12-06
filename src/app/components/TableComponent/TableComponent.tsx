"use client";

import { Table } from "antd";
import { useEffect, useState } from "react";
import { dataClientColumns } from "./utils/columnsClients";

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
      columns={dataClientColumns}
      scroll={{ x: 320 }}
      pagination={{
        placement: ["bottomCenter"],
      }}
    />
  );
}
