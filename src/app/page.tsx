"use client"

import CreatePayment from "./components/Payments/CreatePayment"
import { Col, Image, Row } from "antd"
import TableComponent from "./components/TableComponent/TableComponent"

export default function Home() {

  return (
    <main className="p-6">
      <div className="flex justify-center items-center w-full">
        <Image
          src="/Logo.png"
          alt="Logo Golem Escalada"
          preview={false}
          className="max-w-96"
        />
      </div>

      <Row gutter={[16, 5]} align="top">
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <CreatePayment />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <TableComponent />
        </Col>
      </Row>

      <footer>
      <div className="text-xs mt-2 text-center">
        © 2025 Golem. Desarrollo y código por Agustín Del Valle. Todos los derechos reservados.
      </div>
      </footer>
    </main>
  )
}
