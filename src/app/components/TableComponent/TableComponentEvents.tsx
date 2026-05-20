"use client";

import { Col, Input, Row, Space, Table } from "antd";
import { PaymentEvent } from "@/types/payments";
import { EyeOutlined } from "@ant-design/icons";
import { usePaymentRowActions } from "@/app/hooks/usePaymentRowAction";
import { useState } from "react";
import PaymentsViewEvent from "../Common/Modal/ViewPaymentEvent";
import { dataEventClientColumns } from "./utils/columnsEventClient";

type Props = {
  data: PaymentEvent[];
  loading: boolean;
}

export default function TableComponentEvents({ data, loading }: Props) {
  const { selectedEvent, mode, openView, close } = usePaymentRowActions();
  const [searchText, setSearchText] = useState("");

  const filteredData = data?.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = dataEventClientColumns?.concat({
    title: "Acción",
    key: "action",
    align: "center",
    render: (_: unknown, record: PaymentEvent) => (
      <Space>
          <EyeOutlined style={{ color: "#434343" }} onClick={() => openView(record)} />
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
      {mode === "view" && selectedEvent && (
        <PaymentsViewEvent
          visible={true}
          initialValues={selectedEvent}
          onClose={close}
        />
      )}
    </>
  );
}
