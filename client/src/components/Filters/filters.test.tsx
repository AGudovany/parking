import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Filters from "./Filters";
import "@testing-library/jest-dom";

describe("Filters Component", () => {
  const typeFilterHandler = vi.fn();
  const occupationFilterHandler = vi.fn();

  it("renders filters correctly", () => {
    render(
      <Filters
          typeFilterHandler={typeFilterHandler}
          occupationFilterHandler={occupationFilterHandler}
      />,
    );

    expect(screen.getByPlaceholderText("Filter by type:")).toBeInTheDocument();

    expect(screen.getByLabelText("Filter by occupation:")).toBeInTheDocument();
  });

  it("calls typeFilterHandler on input change", () => {
    render(
      <Filters
          typeFilterHandler={typeFilterHandler}
          occupationFilterHandler={occupationFilterHandler}
      />,
    );

    const select = screen.getByPlaceholderText("Filter by type");
    fireEvent.change(select, { target: { value: "CAR" } });

    expect(typeFilterHandler).toHaveBeenCalledTimes(1);
  });

  it("calls occupationFilterHandler on year select change", () => {
    render(
      <Filters
          typeFilterHandler={typeFilterHandler}
          occupationFilterHandler={occupationFilterHandler}
      />,
    );

    const select = screen.getByLabelText("Filter by occupation:");
    fireEvent.change(select, { target: { value: 'true' } });

    expect(occupationFilterHandler).toHaveBeenCalledTimes(1);
  });
});
