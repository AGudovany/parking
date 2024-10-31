import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Table from "./Table";
import { expect, test, describe, vi, afterEach } from "vitest";
import "@testing-library/jest-dom";
import {ParkingSpace} from "../../services/apiService.tsx";

const mockParkingSpaces: ParkingSpace[] = [
  {
    "parkingSpaceId": 1,
    "floor": 1,
    "spaceType": "RESIDENT",
    "isOccupied": false,
    "hourlyRate": 0,
  },
  {
    "parkingSpaceId": 2,
    "floor": 1,
    "spaceType": "CAR",
    "isOccupied": false,
    "hourlyRate": 5,
  },
  {
    "parkingSpaceId": 3,
    "floor": 1,
    "spaceType": "RESIDENT",
    "isOccupied": true,
    "hourlyRate": 0,
  },
];

describe("Table component", () => {
  afterEach(() => {
    cleanup();
  });

  test("renders table with correct data", () => {
    render(<Table spaces={mockParkingSpaces} checkInOutHandler={vi.fn()} />);

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(3);

    expect(screen.getByText("RESIDENT")).toBeInTheDocument();
    expect(screen.getByText("CAR")).toBeInTheDocument();
  });

  test("calls checkInOutHandler when button is clicked", () => {
    const mockCheckInOutHandler = vi.fn();
    render(
      <Table spaces={mockParkingSpaces} checkInOutHandler={mockCheckInOutHandler} />,
    );

    const checkInOutButton = screen.getAllByRole("button")[0];
    fireEvent.click(checkInOutButton);

    expect(mockCheckInOutHandler).toHaveBeenCalledWith("1");
  });
});
