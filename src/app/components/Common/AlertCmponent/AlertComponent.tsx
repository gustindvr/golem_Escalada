"use client";

import { Alert } from "antd";
import { useEffect } from "react";
import "./ShowAlert.css";

export type PropsAlert = {
  show?: boolean;
  status: "success" | "error" | "warning";
  message: string;
  duration?: number;
  onClose?: () => void;
};

export const ShowAlert = ({
  show,
  status,
  message,
  duration = 5000,
  onClose,
}: PropsAlert) => {

  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [show, duration, onClose]);


  return (
    <div className="alert-overlay">
      <Alert type={status} message={message} showIcon />
    </div>
  );
};
