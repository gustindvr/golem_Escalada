import { useAlertContext } from "@/app/context/AlertContext";

export function useAlert() {
  const { showAlert } = useAlertContext();

  return { showAlert };
}