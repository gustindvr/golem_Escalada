"use client"

import CreatePayment from "./CreatePayment";
import TableComponent from "../TableComponent/TableComponent";
import { usePayments } from "@/app/hooks/usePayments";
import DownloadButton from "../Common/Buttons/DownloadButton/DownloadButton";
import { useEffect } from "react";
import TableComponentEvents from "../TableComponent/TableComponentEvents";

export default function PaymentsView({ modeId, title }: { modeId: number; title: string }) {
  const { data, dataEvent, refresh, loading, loadingEvent } = usePayments(modeId);

  useEffect(() => {
    const doBackup = async () => {
      try {
        const now = new Date();
        if (now.getDate() !== 1) {
          return;
        }

        console.log("[PaymentsView] Starting monthly backup...");
        const res = await fetch("/api/payments/backupMonthly", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ modeId }),
        });
        console.log("[PaymentsView] backupMonthly status:", res.status);
        const body = await res.text();
        console.log("[PaymentsView] backupMonthly body:", body);
      } catch (err) {
        console.error("[PaymentsView] Error en backup mensual:", err);
      }
    };

    void doBackup();
  }, [modeId]);
  
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
