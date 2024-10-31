import { renderHook } from "@testing-library/react-hooks";
import { useParkingData } from "./useParkingData.tsx";
import { vi, describe, expect, beforeEach, test } from "vitest";

const mockParkingSpaces = [
  {
    "parkingSpaceId": 1,
    "floor": 1,
    "vehicleType": "RESIDENT",
    "isOccupied": false
  },
  {
    "parkingSpaceId": 2,
    "floor": 1,
    "vehicleType": "CAR",
    "isOccupied": false
  },
  {
    "parkingSpaceId": 3,
    "floor": 1,
    "vehicleType": "RESIDENT",
    "isOccupied": true
  },
];

const mockFetchData = vi.fn();

vi.mock("../services/apiService", () => {
  return {
    getOccupation: (...args: undefined[]) => mockFetchData(...args),
  };
});

describe("useLaunchesData", () => {
  beforeEach(() => {
    mockFetchData.mockResolvedValue(mockParkingSpaces);
    localStorage.clear();
  });

  test("fetches and populates launch data on initial render", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useParkingData(),
    );

    await waitForNextUpdate();

    expect(result.current.filteredSpaces).toEqual(mockParkingSpaces);
  });

  test("filters launches by type", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useParkingData('CAR'),
    );

    await waitForNextUpdate();

    expect(result.current.filteredSpaces).toHaveLength(1);
    expect(result.current.filteredSpaces[0].spaceType).toBe("CAR");
  });

  test("filters parking spaces by occupation", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useParkingData(undefined, true),
    );

    await waitForNextUpdate();

    expect(result.current.filteredSpaces).toHaveLength(1);
    expect(result.current.filteredSpaces[0].isOccupied).toBe(true);
  });

});