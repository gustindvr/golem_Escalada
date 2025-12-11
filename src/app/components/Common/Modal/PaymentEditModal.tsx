import { Modal} from "antd";
import { Values } from "../../Payments/CreatePayment";
import FormPayment from "../../Payments/FormPayment";
import { useEffect, useState } from "react";
import { getPaymentTypes } from "@/services/paymentTypes";
import { PaymentType } from "@/types/paymentsTypes";
import { PropsAlert } from "../AlertCmponent/AlertComponent";
import { Payment, PaymentEditDTO } from "@/types/payments";
import { editPayment } from "@/services/payments";

type Props = {
  visible: boolean;
  initialValues: Payment;
  onClose(): void;
  onSaved(): void;
  modeId: number;
};

export default function PaymentEditModal({ visible, initialValues, onClose, onSaved, modeId }: Props) {
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


  const onFinish = async (values: Values) => {
    setLoading(true);

    const dto: PaymentEditDTO = {
      id: initialValues.id,
      name: values.name,
      amount: values.amount,
      mode_id: modeId,
      type_id: values.type_id,
      date: values.date ? values.date.$d.toISOString() : null,
    };

    const res = await editPayment(dto);
    if (res?.status === 201) {
      setAlert({
        show: true,
        status: "success",
        title: "Registro creado con éxito",
      });
      setTimeout(() => setAlert((prev) => ({ ...prev, show: false })), 5000);
    }
    if (res === null) {
      setAlert({
          show: true,
          status: "error",
          title: "Error al intentar crear el registro",
        });
      setTimeout(() => setAlert((prev) => ({ ...prev, show: false })), 5000);
    }

    setLoading(false)
    onSaved();
  };

  return (
    <Modal open={visible} onCancel={onClose} title="Editar pago" footer={null}>
      <FormPayment
        onFinish={(val: Values) => onFinish(val)} 
        alert={alert} 
        loading={loading} 
        types={types}
        type="edit"
        initialValues={initialValues}
      />
    </Modal>
  );
}