import React from "react";
import { renderHook } from "@testing-library/react";
import { AuthProvider } from "../../context/authContext";
import useAuth from "../../hooks/useAuth";

describe("useAuth Hook", () => {
  it("Should throw an error if used outside AuthProvider", () => {
    expect(() => renderHook(() => useAuth())).toThrow(
      new Error("useAuth must be used within an AuthProvider")
    );
  });

  it("Should return auth context when used inside AuthProvider", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current).toHaveProperty("user");
    expect(result.current).toHaveProperty("token");
    expect(result.current).toHaveProperty("login");
    expect(result.current).toHaveProperty("logout");
    expect(result.current).toHaveProperty("pendingRequests");
    expect(result.current).toHaveProperty("updatePendingRequests");
  });
});
