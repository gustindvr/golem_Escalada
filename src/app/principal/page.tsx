import { Divider } from "antd"

export default function Principal() {
  return (
    <div className="flex flex-col items-center justify-center mb-10">
      <h3 className="text-4xl">DIAS Y HORARIOS</h3>
      <Divider />
      <div className="flex flex-col text-center align-center">
        <h4 className="bold">Juveniles y adultos</h4>
        <p>Lunes a Viernes de 18:00 a 22:00</p>
        <p>Sábados de 14:00 a 18:00</p>
      </div>
      <Divider />
      <div className="flex flex-col text-center align-center">
        <h4 className="bold">Escuelita infantil (6 a 12 años)</h4>
        <p>Sábados de 13:00 a 14:30</p>
      </div>
    </div>
  );
}