export const formatDate = (value: string) => {
  const d = new Date(value);
  return d.toLocaleDateString("es-AR");
};

export const formatAmount = (value: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(value);