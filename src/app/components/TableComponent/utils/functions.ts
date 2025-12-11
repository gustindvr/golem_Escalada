export const deletePayment = async (id: number) => {
  try {
    const res = await fetch("api/payments", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id),
    })
    console.log(res);
  } catch (error) {
    return error
  }
}