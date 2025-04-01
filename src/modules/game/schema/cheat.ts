import { z } from "zod";

export const cheatSchema = z.object({
  numbers: z
    .array(z.number())
    .length(4, { message: "Must provide exactly 4 numbers" })
    .refine(
      (numbers) => {
        return numbers.every((n) => n >= 0 && n <= 9);
      },
      { message: "Numbers must be between 0 and 9" }
    ),
});

export type CheatSchema = z.infer<typeof cheatSchema>;