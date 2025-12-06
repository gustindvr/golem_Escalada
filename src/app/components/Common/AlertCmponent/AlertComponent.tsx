"use client";

import { Alert } from "antd";
import { useEffect } from "react";
import "./ShowAlert.css";

export type PropsAlert = {
  show?: boolean;
  status: "success" | "error" | "warning";
  title: string;
  duration?: number;
  onClose?: () => void;
};

export const ShowAlert = ({
  show,
  status,
  title,
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
      <Alert type={status} title={title} showIcon />
    </div>
  );
};
