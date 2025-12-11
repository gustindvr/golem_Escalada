"use client";

import { useAlertContext } from "@/app/context/AlertContext";
import { ShowAlert } from "./AlertComponent";

export default function AlertContainer() {
  const { alert, hideAlert } = useAlertContext();

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
