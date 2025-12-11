"use client";

import { Space, Table } from "antd";
import { useEffect, useState } from "react";
import { dataClientColumns } from "./utils/columnsClients";
import { Payment } from "@/types/payments";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { usePaymentRowActions } from "@/app/hooks/usePaymentRowAction";
import ConfirmDeleteModal from "../Common/Modal/ConfirmDeleteModal";
import PaymentEditModal from "../Common/Modal/PaymentEditModal";

export default function TableComponent({ modeId }: { modeId: number }) {
  const [data, setData] = useState([]);
  const { selected, mode, openEdit, openDelete, close } = usePaymentRowActions();

  useEffect(() => {
    fetch(`/api/payments?mode_id=${modeId}`)
      .then(res => res.json())
      .then(json => setData(json.data));
  }, [modeId]);

  const columns = dataClientColumns?.concat({
    title: "Acción",
    key: "action",
    align: "center",
    render: (_: unknown, record: Payment) => (
      <Space>
          <EditOutlined style={{ color: "#434343" }} onClick={() => openEdit(record)} />
          <CloseOutlined style={{ color: "#a61d24" }} onClick={() => openDelete(record)} />
      </Space>
    )
  });

  return (
    <>
      <Table
        rowKey="id"
        dataSource={data}
        columns={columns}
        scroll={{ x: 320 }}
        pagination={{ placement: ["bottomCenter"] }}
      />

      {mode === "edit" && selected && (
        <PaymentEditModal
          visible={true}
          initialValues={selected}
          onClose={close}
          onSaved={() => close()}
          modeId={modeId}
        />
      )}

      {mode === "delete" && selected && (
        <ConfirmDeleteModal
          visible={true}
          payment={selected}
          onClose={close}
          onDeleted={() => close()}
          selected={selected}
        />
      )}
    </>
  );
}
