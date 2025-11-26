import CreatePayment from "./CreatePayment";
import TableComponent from "../TableComponent/TableComponent";

export default function PaymentsView({ modeId, title }: { modeId: number; title: string }) {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">{title}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-neutral-100 p-4 lg:p-12 rounded-md h-fit">
          <CreatePayment modeId={modeId} />
        </div>
        <TableComponent modeId={modeId} />
      </div>
    </div>
  );
}
