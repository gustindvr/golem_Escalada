import { Input, Modal } from "antd";
import { PaymentEvent } from "@/types/payments";
import { formatDate } from "@/utils/commons";

type Props = {
  visible: boolean;
  initialValues: PaymentEvent;
  onClose(): void;
};

export default function PaymentsViewEvent({ visible, initialValues, onClose }: Props) {

  const formattedDate = formatDate(initialValues.date);

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      title="Ver pago"
      footer={null}
      className="rounded-xl overflow-hidden p-0"
    >
      <div className="space-y-6 p-6 bg-white">
        <div className="grid grid-cols-[120px_1fr] gap-4 items-center">
          <span className="text-sm font-semibold text-slate-700">Nombre</span>
          <Input className="w-full rounded-lg" value={initialValues.name} readOnly />
        </div>

        <div className="grid grid-cols-[120px_1fr] gap-4 items-center">
          <span className="text-sm font-semibold text-slate-700">Monto</span>
          <Input className="w-full rounded-lg" value={initialValues.amount} readOnly />
        </div>

        <div className="grid grid-cols-[120px_1fr] gap-4 items-center">
          <span className="text-sm font-semibold text-slate-700">Tipo</span>
          <Input className="w-full rounded-lg" value={initialValues.type} readOnly />
        </div>

        <div className="grid grid-cols-[120px_1fr] gap-4 items-center">
          <span className="text-sm font-semibold text-slate-700">Fecha</span>
          <Input className="w-full rounded-lg" value={formattedDate} readOnly />
        </div>

        <div className="grid grid-cols-[120px_1fr] gap-4 items-start">
          <span className="text-sm font-semibold text-slate-700 pt-2">Descripción</span>
          <Input.TextArea
            className="w-full rounded-lg"
            value={initialValues.description || ""}
            readOnly
            autoSize={{ minRows: 3, maxRows: 6 }}
          />
        </div>
      </div>
    </Modal>
  );
}