import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button size="lg" variant="ghost">
          Privacy Policy
        </Button>
        <Button size="lg" variant="ghost">
          Terms & Conditions
        </Button>
      </div>
    </footer>
  );
}