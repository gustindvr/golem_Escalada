import dayjs from "dayjs";
import { Form, Input, InputNumber, DatePicker, Select, Button } from "antd";
import { PaymentType } from '@/types/paymentsTypes';
import { Values } from './CreatePayment';
import { Payment } from "@/types/payments";
import { useEffect } from "react";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

type Props = {
  onFinish: (val: Values) => void;
  types: PaymentType[];
  loading: boolean;
  type: "create" | "edit";
  initialValues?: Payment;
}

const FormPayment = ({ onFinish, types, loading, type, initialValues }: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        name: initialValues.name,
        amount: initialValues.amount,
        type_id: initialValues.type_id,
        date: initialValues.date ? dayjs(initialValues.date) : null,
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  return (
    <Form
      form={form}
      {...layout}
      onFinish={onFinish}
      labelAlign="left"
      size="middle"
    >

      <Form.Item
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
          loading={loading}
          htmlType="submit"
          type="primary"
        >
          {type === "create" ? "Registrar pago" : "Editar pago"}
        </Button>
      </div>
    </Form>
  )
}

export default FormPayment;
