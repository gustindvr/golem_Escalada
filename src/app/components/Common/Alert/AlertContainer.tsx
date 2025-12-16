"use client";

import { useEffect } from "react";
import { useAlertContext } from "@/app/context/AlertContext";
import { ShowAlert } from "./AlertComponent";

export default function AlertContainer() {
  const { alert, hideAlert } = useAlertContext();

  useEffect(() => {
    if (alert?.show) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [alert?.show]);

  if (!alert || !alert.show) return null;

  return (
    <ShowAlert
      show={alert.show}
      status={alert.status}
      title={alert.title}
      onClose={hideAlert}
      duration={alert.duration}
    />
  );
}
