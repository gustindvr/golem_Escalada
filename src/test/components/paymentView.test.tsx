import React from "react";
import { render, screen } from "@testing-library/react";
import PaymentsView from "@/app/components/Payments/PaymentsView";

jest.mock("../../app/components/Payments/CreatePayment.tsx", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-create-payment"></div>
}));

jest.mock("../../app/components/TableComponent/TableComponent.tsx", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-table"></div>
}));

describe("PaymentsView", () => {
  it("renderiza el título según props", () => {
    render(<PaymentsView modeId={1} title="Muro Libre" />);
    expect(screen.getByRole("heading", { name: /Muro Libre/i })).toBeInTheDocument();
  });

  it("incluye los componentes TableComponent y CreatePayment", () => {
    render(<PaymentsView modeId={2} title="Clases Técnica" />);
    expect(screen.getByTestId("mock-table")).toBeInTheDocument();
    expect(screen.getByTestId("mock-create-payment")).toBeInTheDocument();
  });
});
