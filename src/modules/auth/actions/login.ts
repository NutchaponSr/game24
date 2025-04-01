"use server";

import { cookies } from "next/headers";

import { client } from "@/lib/rpc";

import { authSchema, AuthSchema } from "@/modules/auth/schema/auth";

export const login = async (value: AuthSchema) => {
  const validatedValue = authSchema.safeParse(value);

  if (!validatedValue.success) {
    return { error: "Invalid inputs" };
  }

  const response = await client.api.auth.login.$post({ json: validatedValue.data });

  const data = await response.json();

  if (!response.ok) {
    return { error: (data as { error: string }).error || "Failed to login" };
  }

  if (!("token" in data)) {
    return { error: "Invalid response from server" };
  }

  (await cookies()).set("token", data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", 
    maxAge: 60 * 60 * 24 * 30,
  });

  return null;
}