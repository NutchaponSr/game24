"use server";

import { client } from "@/lib/rpc";

import { authSchema, AuthSchema } from "@/modules/auth/schema/auth";

export const register = async (value: AuthSchema) => {
  const validatedValue = authSchema.safeParse(value);

  if (!validatedValue.success) {
    return { error: "Invalid inputs" };
  }

  const response = await client.auth.register.$post({ json: validatedValue.data });

  const data = await response.json();
  if (!response.ok) {
    return { error: (data as { error: string }).error || "Failed to register" };
  }

  return { success: (data as { success: boolean }).success };
}