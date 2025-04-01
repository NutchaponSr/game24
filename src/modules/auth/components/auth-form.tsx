"use client";

import toast from "react-hot-toast";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useAuth } from "@/providers/auth-provider";

import { authSchema, AuthSchema } from "@/modules/auth/schema/auth";

import { login } from "@/modules/auth/actions/login";
import { register } from "@/modules/auth/actions/register";

interface AuthFormProps {
  mode: "SignUp" | "SignIn";
  onModeChange: () => void;
}

export const AuthForm = ({ mode, onModeChange }: AuthFormProps) => {
  const { refreshSession } = useAuth();

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const form = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (value: AuthSchema) => {
    startTransition(async () => {
      if (mode === "SignIn") {
        login(value)
          .then(async (data) => {
            if (data?.error) {
              toast.error(data.error);
            } else {
              router.refresh();
              await refreshSession();
              toast.success("Login successfully");
            }
          })
          .catch(() => toast.error("Something went wrong"))
      } else {
        register(value)
          .then((data) => {
            if (data?.error) {
              toast.error(data.error);
            } else {
              toast.success("Register successfully");
            }
          })
          .catch(() => toast.error("Something went wrong"))
      }
    });
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending} autoFocus />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Continue
        </Button>
        <Button type="button" variant="ghost" disabled={isPending} onClick={onModeChange}>
          {mode === "SignUp" ? "Already have an account?" : "Need an account?"}
        </Button>
      </form>
    </Form>
  );
};