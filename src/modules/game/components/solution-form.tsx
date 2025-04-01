import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useCookies } from "@/providers/cookie-provider";

import { gameSchema, GameSchema } from "@/modules/game/schema/game";

import { useSolution } from "@/modules/game/api/use-solution";

interface SolutionFormProps {
  numbers: number[];
}

export const SolutionForm = ({ numbers }: SolutionFormProps) => {
  const { cookie } = useCookies();
  const { mutate, isPending } = useSolution();

  const form = useForm<GameSchema>({
      resolver: zodResolver(gameSchema),
      defaultValues: {
        expression: "",
      }
    });
  
    const onSubmit = (value: GameSchema) => {
      mutate({
        json: {
          expression: value.expression,
          numbers,
        },
        header: {
          Authorization: `Bearer ${cookie}`,
        },
      }, {
        onSuccess: () => {
          form.reset();
        }
      });
    }

  return (
    <Form {...form}>
      <form className="w-full flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField 
          control={form.control}
          name="expression"
          render={({ field }) => (
            <FormItem className="grow">
              <FormControl>
                <Input {...field} className="w-full" placeholder="Enter your solution..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="secondary" type="submit" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}