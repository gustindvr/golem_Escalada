"use client"

import CreatePayment from "./CreatePayment";
import TableComponent from "../TableComponent/TableComponent";
import { usePayments } from "@/app/hooks/usePayments";
import DownloadButton from "../Common/Buttons/DownloadButton/DownloadButton";
import { useEffect } from "react";
import TableComponentEvents from "../TableComponent/TableComponentEvents";

export default function PaymentsView({ modeId, title }: { modeId: number; title: string }) {
  const { data, dataEvent, refresh, loading, loadingEvent } = usePayments(modeId);
  console.log(dataEvent)
  useEffect(() => {
    const doBackup = async () => {
      try {
        await fetch("/api/payments/backupMonthly", { method: "POST" });
      } catch (err) {
        console.error("Error en backup mensual:", err);
      }
    };
    doBackup();
  }, []);
  
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">{title}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-neutral-100 p-4 lg:p-12 rounded-md h-fit">
          <CreatePayment modeId={modeId} refresh={refresh} />
        </div>
        {
          modeId === 4 ? (
            <TableComponentEvents data={dataEvent} loading={loadingEvent} />
          ) : (
            <TableComponent modeId={modeId} data={data} refresh={refresh} loading={loading} />
          )
        }
      </div>
      <div>
        <DownloadButton />
      </div>
    </div>
  );
}
