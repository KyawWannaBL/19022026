// file: src/pages/Tracking.test.tsx
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tracking from "./Tracking";

type MockShipment = {
  tracking_number?: string | null;
};

type UseEnterpriseShipmentsReturn = {
  data: MockShipment[];
  isLoading: boolean;
};

const mockUseEnterpriseShipments = vi.fn<[], UseEnterpriseShipmentsReturn>();

vi.mock("@/hooks/useEnterpriseShipments", () => ({
  useEnterpriseShipments: () => mockUseEnterpriseShipments(),
}));

function setHookState(
  state: Partial<UseEnterpriseShipmentsReturn> = {},
): void {
  mockUseEnterpriseShipments.mockReturnValue({
    data: [],
    isLoading: false,
    ...state,
  });
}

beforeEach(() => {
  mockUseEnterpriseShipments.mockReset();
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("Tracking page", () => {
  it("shows validation error on empty submit", async () => {
    setHookState({ data: [], isLoading: false });

    const user = userEvent.setup();
    render(<Tracking />);

    await user.click(screen.getByRole("button", { name: /track/i }));
    expect(screen.getByText(/enter a tracking id/i)).toBeInTheDocument();
  });

  it("finds shipment case-insensitively and trims input", async () => {
    setHookState({ data: [{ tracking_number: "AbC123" }], isLoading: false });

    const user = userEvent.setup();
    render(<Tracking />);

    await user.type(screen.getByPlaceholderText(/tracking id/i), "  abc123  ");
    await user.click(screen.getByRole("button", { name: /track/i }));

    expect(screen.getByText(/shipment found/i)).toBeInTheDocument();
    expect(screen.getByText(/tracking:\s*AbC123/i)).toBeInTheDocument();
  });

  it("shows not found when shipment does not exist", async () => {
    setHookState({ data: [{ tracking_number: "ZX9" }], isLoading: false });

    const user = userEvent.setup();
    render(<Tracking />);

    await user.type(screen.getByPlaceholderText(/tracking id/i), "nope");
    await user.click(screen.getByRole("button", { name: /track/i }));

    expect(screen.getByText(/no shipment found/i)).toBeInTheDocument();
    expect(screen.getByText(/nope/i)).toBeInTheDocument();
  });

  it("disables the button while loading", () => {
    setHookState({ data: [], isLoading: true });

    const { container } = render(<Tracking />);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(container.querySelector(".animate-spin")).not.toBeNull();
  });
});