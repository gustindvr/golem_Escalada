import { Button, DatePicker, Form, FormProps, Input, InputNumber, Select } from "antd";
import { useState } from "react";
import { PropsAlert, ShowAlert } from "../Common/AlertCmponent/AlertComponent";
import { registerPayment } from "@/services/payments";
import { PaymentCreateDTO } from "@/types/payments";

type FieldType = {
  id: number,
  name: string;
  amount: number;
  type: string;
  date: {
    $d: Date;
  }
};

const CreatePayment = () => {
  const [alert, setAlert] = useState<PropsAlert>({
    show: false,
    status: "success",
    message: "",
  });

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
  const jsDate = values.date?.$d;
  const isoDate = jsDate ? new Date(jsDate).toISOString() : null;

  const payload: PaymentCreateDTO = {
    name: values.name,
    amount: Number(values.amount),
    type: values.type,
    date: isoDate,
  };

  try {
    const res = await registerPayment(payload);
    if (res?.status === 201) {
      setAlert({
        show: true,
        status: "success",
        message: "Registro creado con éxito",
      });

      setTimeout(() => setAlert((prev) => ({ ...prev, show: false })), 5000);
    }
  } catch (error) {
    setAlert({
      show: true,
      status: "error",
      message: "Error al intentar crear el registro",
    });
    setTimeout(() => setAlert((prev) => ({ ...prev, show: false })), 5000);
  }
};

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.error("Error:", errorInfo);
  };

  return (
    <div className="flex justify-center items-center w-full p-4">
      {alert.show && (
        <ShowAlert show status={alert.status} message={alert.message} />
      )}

      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-xl shadow-md p-2">
        <div className="text-lg font-semibold mb-6 text-center">
          Registrar pago
        </div>

        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Nombre"
            name="name"
            rules={[{ required: true, message: "Por favor ingrese un nombre" }]}
          >
            <Input className="w-full" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Monto"
            name="amount"
            rules={[{ required: true, message: "Por favor ingrese un monto" }]}
          >
            <InputNumber className="w-full" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Tipo"
            name="type"
            rules={[{ required: true, message: "Por favor seleccione el tipo" }]}
          >
            <Select
              allowClear
              className="w-full"
              options={[
                { label: "Mensual", value: "Mensual" },
                { label: "Diario", value: "Diario" },
                { label: "Otro", value: "Otro" },
              ]}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Fecha"
            name="date"
            rules={[{ required: true, message: "Por favor ingrese la fecha" }]}
          >
            <DatePicker
              lang="es"
              format={["DD/MM/YYYY"]}
              className="w-full"
            />
          </Form.Item>

          <Form.Item className="text-center mt-6">
            <Button type="primary" htmlType="submit" className="w-full sm:w-auto">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreatePayment;
