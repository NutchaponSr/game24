"use server";

import jwt from "jsonwebtoken";

import { cookies } from "next/headers";

import { JWT } from "@/modules/auth/types/jwt";

export const getSession = async () => {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return { error: "Unauthorized" };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWT;

    return { data: decoded };
  } catch {
    return { error: "Invalid or expired token" };
  }
}