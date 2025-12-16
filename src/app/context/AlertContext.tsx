"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { PropsAlert } from "@/app/components/Common/Alert/AlertComponent";

type AlertContextType = {
  alert: PropsAlert | null;
  showAlert: (alert: Omit<PropsAlert, "show">) => void;
  hideAlert: () => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alert, setAlert] = useState<PropsAlert | null>(null);

  const showAlert = useCallback((alertData: Omit<PropsAlert, "show">) => {
    setAlert({ ...alertData, show: true });
  }, []);

  const hideAlert = useCallback(() => {
    setAlert(prev => (prev ? { ...prev, show: false } : null));
  }, []);

  return (
    <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlertContext() {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useAlertContext must be used within an AlertProvider");
  return context;
}
