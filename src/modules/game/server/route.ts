import {  z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { 
  evaluateExpression, 
  generateAllExpressions, 
  usesAllNumbersOnce 
} from "@/lib//utils";
import { db } from "@/lib/db";

import { cheatSchema } from "@/modules/game/schema/cheat";

const app = new Hono()
  .get(
    "/generate-number", 
    async (ctx) => {
      const numbers = new Set<number>();

      while (numbers.size < 4) {
        numbers.add(Math.floor(Math.random() * 10));
      }

      return ctx.json({ data: Array.from(numbers) });
    }
  )
  .get(
    "/history",
    zValidator(
      "query", 
      z.object({
        page: z.coerce.number(),
        limit: z.coerce.number(),
      }),
    ),
    zValidator("header", z.object({
      Authorization: z.string(),
    })),
    async (ctx) => {
      const session = ctx.get("authUser");

      const { page, limit } = ctx.req.valid("query");

      if (!session.sub) {
        return ctx.json({ error: "Unauthorized" }, 401);
      }

      const skip = (page - 1) * limit;

      const data = await db.game.findMany({
        where: {
          userId: session.sub,
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      });

      const formattedHistory = data.map(entry => ({
        ...entry,
        numbers: entry.numbers.split(",").map(Number),
      }));

      return ctx.json({ 
        data: formattedHistory,
        nextPage: data.length === limit ? page + 1 : null,
      });
    }
  )
  .post(
    "/submit-solution",
    zValidator(
      "json", 
      z.object({
        numbers: z.array(z.number()),
        expression: z.string(),
      })
    ),
    zValidator("header", z.object({
      Authorization: z.string(),
    })),
    async (ctx) => {
      const session = ctx.get("authUser");

      const { expression, numbers } = ctx.req.valid("json");

      if (!session.sub) {
        return ctx.json({ error: "Unauthorized" }, 401);
      }

      const usesCorrectNumbers = usesAllNumbersOnce(expression, numbers)

      if (!usesCorrectNumbers) {
        return ctx.json({ error: "Expression must use all numbers exactly once" }, 400);
      }

      const result = evaluateExpression(expression);

      const isCorrect = Math.abs(result - 24) < 0.0001 && usesCorrectNumbers;

      if (isCorrect) {
        await db.game.create({
          data: {
            userId: session.sub,
            numbers: numbers.join(","),
            solution: expression,
          },
        });
      } else {
        return ctx.json({ error: "It's not correct" }, 400);
      }

      return ctx.json({ success: true }, 200);
    }
  )
  .post(
    "/cheat",
    zValidator(
      "json",
      cheatSchema
    ),
    zValidator("header", z.object({
      Authorization: z.string(),
    })),
    async (ctx) => {
      const token = ctx.get("authUser");

      const { numbers } = ctx.req.valid("json");


      if (!token.sub) {
        return ctx.json({ error: "Unauthorized" }, 401);
      }

      const solutions = generateAllExpressions(numbers);

      return ctx.json({ data: solutions });
    }
  )

export default app;