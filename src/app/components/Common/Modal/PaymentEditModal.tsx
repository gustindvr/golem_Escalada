import { Modal} from "antd";
import { Values } from "../../Payments/CreatePayment";
import FormPayment from "../../Payments/FormPayment";
import { useEffect, useState } from "react";
import { getPaymentTypes } from "@/services/paymentTypes";
import { PaymentType } from "@/types/paymentsTypes";
import { Payment, PaymentEditDTO } from "@/types/payments";
import { editPayment } from "@/services/payments";
import { useAlert } from "@/app/hooks/useAlert";

type Props = {
  visible: boolean;
  initialValues: Payment;
  onClose(): void;
  onSaved(): void;
  modeId: number;
  refresh: () => void;
};

export default function PaymentEditModal({ visible, initialValues, onClose, onSaved, modeId, refresh }: Props) {
  const { showAlert } = useAlert();
  const [types, setTypes] = useState<PaymentType[]>([]);
  const [loading, setLoading] = useState(false);

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
      payment_method: values.payment_method ?? null,
      paid: values.paid ?? false,
    };

    const res = await editPayment(dto);

    if (res?.status === 200) {
      showAlert({
        status: "success",
        title: res.message,
      });
    }
    if (res === null) {
      showAlert({
          status: "error",
          title: "Error al intentar editar el registro",
        });
    }
    refresh();
    setLoading(false)
    onSaved();
  };

  return (
    <Modal open={visible} onCancel={onClose} title="Editar pago" footer={null}>
      <FormPayment
        modeId={modeId}
        onFinish={(val: Values) => onFinish(val)}
        loading={loading} 
        types={types}
        type="edit"
        initialValues={initialValues}
      />
    </Modal>
  );
}