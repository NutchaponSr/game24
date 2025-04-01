import { z } from "zod";

export const gameSchema = z.object({
  expression: z
    .string()
    .trim()
    .min(1, { message: "Expression cannot be empty" })
    .refine(
      (expression) => {
        const sanitized = expression.replace(/[0-9+\-*/() ]/g, "");
        return sanitized.length === 0;
      },
      { message: "Invalid characters in expression" }
    )
    .refine(
      (expression) => {
        try {
          new Function(`return ${expression}`)();
          return true;
        } catch {
          return false;
        }
      },
      { message: "Invalid expression" }
    ),
});

export type GameSchema = z.infer<typeof gameSchema>; 