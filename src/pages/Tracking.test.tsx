import React from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tracking from "./Tracking";

const mockUseEnterpriseShipments = vi.fn();

vi.mock("@/hooks/useEnterpriseShipments", () => ({
  useEnterpriseShipments: () => mockUseEnterpriseShipments(),
}));

type MockShipment = {
  awb?: string | null;
};

beforeEach(() => {
  mockUseEnterpriseShipments.mockReset();
});

describe("Tracking page", () => {
  it("shows validation error on empty submit", async () => {
    mockUseEnterpriseShipments.mockReturnValue({ data: [], isLoading: false });

    const user = userEvent.setup();
    render(<Tracking />);

    await user.click(screen.getByRole("button", { name: /track/i }));
    expect(screen.getByText(/enter a tracking id/i)).toBeInTheDocument();
  });

  it("finds shipment case-insensitively and trims input", async () => {
    const shipments: MockShipment[] = [{ awb: "AbC123" }];
    mockUseEnterpriseShipments.mockReturnValue({ data: shipments, isLoading: false });

    const user = userEvent.setup();
    render(<Tracking />);

    await user.type(screen.getByPlaceholderText(/tracking id/i), "  abc123  ");
    await user.click(screen.getByRole("button", { name: /track/i }));

    expect(screen.getByText(/shipment found/i)).toBeInTheDocument();
    expect(screen.getByText(/tracking:\s*AbC123/i)).toBeInTheDocument();
  });

  it("shows not found when shipment does not exist", async () => {
    const shipments: MockShipment[] = [{ awb: "ZX9" }];
    mockUseEnterpriseShipments.mockReturnValue({ data: shipments, isLoading: false });

    const user = userEvent.setup();
    render(<Tracking />);

    await user.type(screen.getByPlaceholderText(/tracking id/i), "nope");
    await user.click(screen.getByRole("button", { name: /track/i }));

    expect(screen.getByText(/no shipment found/i)).toBeInTheDocument();
    expect(screen.getByText(/nope/i)).toBeInTheDocument();
  });

  it("disables the button while loading", () => {
    mockUseEnterpriseShipments.mockReturnValue({ data: [], isLoading: true });

    render(<Tracking />);
    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByText(/loading shipments/i)).toBeInTheDocument();
  });
});\nexport src/pages/Tracking.test.tsx;
