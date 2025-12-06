"use client";

import { useEffect, useState } from "react";
import { Form, Input, InputNumber, DatePicker, Select, Button } from "antd";
import { registerPayment } from "@/services/payments";
import { getPaymentTypes } from "@/services/paymentTypes";
import { PaymentCreateDTO } from "@/types/payments";
import { PaymentType } from "@/types/paymentsTypes";
import { PropsAlert, ShowAlert } from "../Common/AlertCmponent/AlertComponent";
import { PaymentFormFields } from "@/types/paymentFormField";
import { SyncOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

export default function CreatePayment({ modeId }: { modeId: number }) {
  const router = useRouter();
  const [types, setTypes] = useState<PaymentType[]>([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<PropsAlert>({
    show: false,
    status: "success",
    title: "",
  });

  useEffect(() => {
    getPaymentTypes(modeId).then(setTypes);
  }, [modeId]);

  const onFinish = async (values:{
    name: string;
    amount: number;
    type_id: number;
    date: { $d: Date };
  }) => {
    setLoading(true);
    const [checkTypeName] = types.filter((t) => t.id === values.type_id);

    const dto: PaymentCreateDTO = {
      name: values.name,
      amount: values.amount,
      mode_id: modeId,
      type: checkTypeName.name,
      type_id: values.type_id,
      date: values.date ? values.date.$d.toISOString() : null,
    };

    try {
    const res = await registerPayment(dto);
    if (res?.status === 201) {
      setAlert({
        show: true,
        status: "success",
        title: "Registro creado con éxito",
      });
      setTimeout(() => setAlert((prev) => ({ ...prev, show: false })), 5000);
    }
  } catch (error) {
    setAlert({
        show: true,
        status: "error",
        title: "Error al intentar crear el registro",
      });
      setTimeout(() => setAlert((prev) => ({ ...prev, show: false })), 5000);
      console.error(error);
    }
    setLoading(false)
    router.refresh();
  };

  return (
    <section>
      <h2 className="mb-6 font-bold">Registro de pago</h2>
      <Form className="w-full items-center" {...layout} onFinish={onFinish} labelAlign="left" size="middle">
        {alert.show && (
          <ShowAlert show status={alert.status} title={alert.title} />
        )}

        <Form.Item<PaymentFormFields>
          label="Nombre"
          name="name"
          rules={[{ required: true, message: "Por favor ingrese un nombre" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item 
          name="amount" 
          label="Monto" 
          rules={[{ required: true, message: "Ingrese un monto" }]}>
          <InputNumber className="w-full" />
        </Form.Item>

        <Form.Item 
          name="type_id" 
          label="Tipo" 
          rules={[{ required: true, message: "Ingrese tipo de pago" }]}>
          <Select
            options={types.map(t => ({ label: t.name, value: t.id }))}
          />
        </Form.Item>

        <Form.Item 
          name="date" 
          label="Fecha" 
          rules={[{ required: true, message: "Ingrese la fecha" }]}>
          <DatePicker format="DD/MM/YYYY" className="w-full" />
        </Form.Item>

        <div className="mt-3 w-full text-center">
          <Button
            icon={loading && <SyncOutlined spin /> }
            variant="solid" color="danger" htmlType="submit" loading={loading}>
            Registrar pago
          </Button>
        </div>
      </Form>
    </section>
  );
}
