"use client";

import Image from "next/image";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { AuthForm } from "@/modules/auth/components/auth-form";

export const AuthModal = () => {
  
  const [authMode, setAuthMode] = useState<"SignUp" | "SignIn">("SignIn");

  const onModeChange = () => setAuthMode(authMode === "SignIn" ? "SignUp" : "SignIn");

  return (
    <Dialog onOpenChange={() => setTimeout(() => setAuthMode("SignIn"), 100)}>
      <DialogTrigger asChild>
        <Button>
          Get Started
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex justify-center items-center">
          <Image src="/logo.svg" alt="Logo" width={32} height={32} />
        </div>
        <DialogHeader className="items-center">
          <DialogTitle>{authMode === "SignUp" ? "Sign Up" : "Sign In"}</DialogTitle>
          <DialogDescription>
            {authMode === "SignUp"
              ? "We just need a few details to get you started."
              : "Welcome back! Please enter your credentials."}
          </DialogDescription>
        </DialogHeader>
        <AuthForm
          mode={authMode}
          onModeChange={onModeChange}
        />
      </DialogContent>
    </Dialog>
  );
}