import auth from "@/modules/auth/server/route";
import game from "@/modules/game/server/route";

import { cors } from "hono/cors";
import { verify } from "hono/jwt";
import { Context, Hono } from "hono";
import { serve } from "@hono/node-server";

import { JWT } from "./modules/auth/types/jwt";

declare module "hono" {
  interface ContextVariableMap {
    authUser: JWT;
  }
}

const app = new Hono();

const authMiddleware = async (c: Context, next: () => Promise<void>) => {
  const authHeader = c.req.header("Authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : undefined;

  if (!token) {
    return c.text("Unauthorized", 401);
  }

  try {
    const decoded = await verify(token, process.env.JWT_SECRET!) as unknown as JWT;

    c.set("authUser", decoded);
    await next();
  } catch (error) {
    console.error("Token verification error:", error);
    return c.json({ error: "Invalid token" }, 401);
  }
};

app.use("*", cors({
  origin: process.env.NEXT_PUBLIC_FRONTEND_URL!,
  allowMethods: ["GET", "POST"],
  allowHeaders: ["Content-Type", "Authorization"],
  exposeHeaders: ["Content-Length"],
  credentials: true
}));

app.use("/game/*", authMiddleware);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const route = app
  .route("/auth", auth)
  .route("/game", game)

serve({
  fetch: app.fetch,
  port: 3001
}, () => {
  console.log(`Hono server running at ${process.env.NEXT_PUBLIC_BACKEND_URL}`);
});

export type AppType = typeof route;