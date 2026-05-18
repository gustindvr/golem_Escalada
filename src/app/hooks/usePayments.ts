/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from "react";
import { Payment } from "@/types/payments";

export function usePayments(modeId: number) {
  const [state, setState] = useState<{
    data: Payment[];
    loading: boolean;
  }>({
    data: [],
    loading: false,
  });

  const fetchPayments = useCallback(async () => {
    setState({ data: [], loading: true });
    console.log("Fetching payments for modeId:", modeId);
    try {
      const res = await fetch(`/api/payments?mode_id=${modeId}`);
      console.log(res);
      const json = await res.json();
      setState({ data: json.data, loading: false });
    } catch (error) {
      console.error("Error al traer pagos:", error);
      setState({ data: [], loading: false });
    }
  }, [modeId]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  return {
    data: state.data,
    loading: state.loading,
    refresh: fetchPayments,
  };
}
