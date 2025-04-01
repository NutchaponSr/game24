import bcrypt from "bcryptjs";

import { Hono } from "hono";
import { sign } from "hono/jwt";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/lib/db";

import { authSchema } from "@/modules/auth/schema/auth";

const app = new Hono()
  .post(
    "/register",
    zValidator(
      "json",
      authSchema,
    ),
    async (ctx) => {
      const { username, password } = ctx.req.valid("json");

      const existingUser = await db.user.findUnique({
        where: {
          username,
        },
      });

      if (existingUser) {
        return ctx.json({ error: "Username already in use" }, 409);
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await db.user.create({
        data: {
          username,
          password: hashedPassword,
        },
      });

      return ctx.json({ success: true }, 201);
    }
  )
  .post(
    "/login",
    zValidator(
      "json",
      authSchema
    ),
    async (ctx) => {
      const { username, password } = ctx.req.valid("json");

      const user = await db.user.findUnique({
        where: {
          username,
        },
      });

      if (!user) {
        return ctx.json({ error: "User not found" }, 404);
      }
      
      const matchPassword = await bcrypt.compare(password, user.password);
      
      if (!matchPassword) {
        return ctx.json({ error: "Password not match" }, 401);
      }

      const token = await sign({
        sub: user.id,
        name: user.username,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
      }, process.env.JWT_SECRET!);

      return ctx.json({ success: true, token }, 200);
    }
  )

export default app;