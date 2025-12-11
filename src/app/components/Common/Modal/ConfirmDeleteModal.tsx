import { Modal } from "antd";
import { Payment } from "@/types/payments";
import { deletePayment } from "@/services/payments";
import { useEffect, useState } from "react";

type Props = {
  visible: boolean;
  payment: Payment;
  onClose(): void;
  onDeleted(): void;
  selected: Payment | null;
};

export default function ConfirmDeleteModal({ visible, payment, onClose, onDeleted, selected }: Props) {
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>()


  const handleDelete = async () => {
    if (selectedPayment?.id) {
      await deletePayment({ id: selectedPayment?.id });
      onDeleted();
    }
  };

  useEffect(() => {
    setSelectedPayment(selected)
  }, [selected])

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      title="Confirmar eliminación"
      onOk={handleDelete}
      okText="Eliminar"
      okType="danger"
    >
      ¿Estás seguro que querés eliminar el pago de <strong>{payment.name}</strong> por <strong>{payment.amount}</strong>?
    </Modal>
  );
}