import { render, screen } from "@testing-library/react";
import { ShowAlert } from "@/app/components/Common/AlertCmponent/AlertComponent";

describe("ShowAlert", () => {
  it("muestra el mensaje recibido", () => {
    render(<ShowAlert show status="success" message="Todo OK" />);
    expect(screen.getByText("Todo OK")).toBeInTheDocument();
  });
});