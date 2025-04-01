"use server";

import { cookies } from "next/headers";

export const logout = async () => {
  try {
    (await cookies()).delete("token");

    return { success: true };
  } catch {
    return { error: "Failed to log out" };
  }
}