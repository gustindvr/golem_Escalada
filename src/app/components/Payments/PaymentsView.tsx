"use client"

import CreatePayment from "./CreatePayment";
import TableComponent from "../TableComponent/TableComponent";
import { usePayments } from "@/app/hooks/usePayments";
import DownloadButton from "../Common/Buttons/DownloadButton/DownloadButton";
import { useEffect } from "react";

export default function PaymentsView({ modeId, title }: { modeId: number; title: string }) {
  console.log("Mode ID en PaymentsView:", modeId);
  const { data, refresh, loading } = usePayments(modeId);
  console.log("Datos obtenidos en PaymentsView:", data);
  useEffect(() => {
    const doBackup = async () => {
      try {
        await fetch("/api/payments/backupMonthly", { method: "POST" });
        console.log("Entra en el try")
      } catch (err) {
        console.log("Sale por el catch")
        console.error("Error en backup mensual:", err);
      }
    };
    console.log("Entra a hacer el backup mensual");
    doBackup();
  }, []);
  
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">{title}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-neutral-100 p-4 lg:p-12 rounded-md h-fit">
          <CreatePayment modeId={modeId} refresh={refresh} />
        </div>
        <TableComponent modeId={modeId} data={data} refresh={refresh} loading={loading} />
      </div>
      <div>
        <DownloadButton />
      </div>
    </div>
  );
}
