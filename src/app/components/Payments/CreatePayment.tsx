"use client";

import { useEffect, useState } from "react";
import { registerPayment } from "@/services/payments";
import { getPaymentTypes } from "@/services/paymentTypes";
import { PaymentCreateDTO } from "@/types/payments";
import { PaymentType } from "@/types/paymentsTypes";
import FormPayment from "./FormPayment";
import { useAlert } from "@/app/hooks/useAlert";

export type Values = {
  id: number;
  name: string;
  amount: number;
  type_id: number;
  date: { $d: Date };
}

export default function CreatePayment({ modeId }: { modeId: number }) {
  const { showAlert } = useAlert();
  const [types, setTypes] = useState<PaymentType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPaymentTypes(modeId).then(setTypes);
  }, [modeId]);

  const onFinish = async (values: Values) => {
    setLoading(true);

    const dto: PaymentCreateDTO = {
      name: values.name,
      amount: values.amount,
      mode_id: modeId,
      type_id: values.type_id,
      date: values.date ? values.date.$d.toISOString() : null,
    };

    const res = await registerPayment(dto);
    if (res?.status === 201) {
      showAlert({ status: "success", title: "Registro creado con éxito" });
    }
    if (res === null) {
      showAlert({
          status: "error",
          title: "Error al intentar crear el registro",
        });
    }
    setLoading(false)
  };

  return (
    <section>
      <h2 className="mb-6 font-bold">Registro de pago</h2>
      <FormPayment 
        onFinish={(val: Values) => onFinish(val)}
        loading={loading} 
        types={types}
        type="create"
      />
    </section>
  );
}
