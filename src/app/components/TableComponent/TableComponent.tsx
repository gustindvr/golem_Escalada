"use client";

import { Col, Input, Row, Space, Table } from "antd";
import { dataClientColumns } from "./utils/columnsClients";
import { Payment } from "@/types/payments";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { usePaymentRowActions } from "@/app/hooks/usePaymentRowAction";
import ConfirmDeleteModal from "../Common/Modal/ConfirmDeleteModal";
import PaymentEditModal from "../Common/Modal/PaymentEditModal";
import { useState } from "react";

type Props = {
  modeId: number;
  data: Payment[];
  loading: boolean;
  refresh: () => void;
}

export default function TableComponent({ modeId, data, loading, refresh }: Props) {
  const { selected, mode, openEdit, openDelete, close } = usePaymentRowActions();
  const [searchText, setSearchText] = useState("");

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

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
      <Col>
        <Row>
          <Input.Search
            placeholder="Buscar por nombre…"
            allowClear
            onSearch={(value) => setSearchText(value)}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: 5 }}
          />
        </Row>

        <Table
          rowKey="id"
          dataSource={filteredData}
          columns={columns}
          scroll={{ x: 320 }}
          pagination={{ placement: ["bottomCenter"] }}
          loading={loading}
          />
      </Col>
      {mode === "edit" && selected && (
        <PaymentEditModal
          visible={true}
          initialValues={selected}
          onClose={close}
          onSaved={() => close()}
          modeId={modeId}
          refresh={refresh}
        />
      )}

      {mode === "delete" && selected && (
        <ConfirmDeleteModal
          visible={true}
          payment={selected}
          onClose={close}
          onDeleted={() => close()}
          selected={selected}
          refresh={refresh}
        />
      )}
    </>
  );
}
