"use client";

import Link from "next/link";

import { useConfirm } from "@/hooks/use-confirm";

import { Button } from "@/components/ui/button";

import { useCookies } from "@/providers/cookie-provider";

import { useCheat } from "@/modules/game/api/use-cheat";
import { useGameStore } from "@/modules/game/stores/use-game-store";

interface FooterProps {
  numbers: number[];
}

export const Footer = ({ numbers }: FooterProps) => {
  const [ConfirmDialog, confirm] = useConfirm({
    title: "Cheating",
    description: "Are you sure to use cheat for this expression",
  });

  const { mutate } = useCheat();
  const { cookie } = useCookies();
  const { isCheat, setIsCheat } = useGameStore();

  const handleCheat = async () => {
    const ok = await confirm();

    if (ok) {
      setIsCheat(true);
      mutate({ 
        json: { numbers }, 
        header: {
          Authorization: `Bearer ${cookie}`
        }, 
      });
    }
  }

  return (
    <>
      <ConfirmDialog />
      <footer className="lg:min-h-[100px] min-h-20 border-t-2">
        <div className="max-w-[1140px] h-full mx-auto flex items-center self-start justify-between px-6 lg:px-10 gap-8">
          <Button size="lg" asChild>
            <Link href="/history">
              History
            </Link>
          </Button>
          {!isCheat ? (
            <Button 
              size="lg" 
              variant="danger" 
              onClick={handleCheat}
            >
              Cheat
            </Button>
          ) : (
            <Button size="lg" onClick={() => setIsCheat(false)}>
              Go back
            </Button>
          )}
        </div>
      </footer>
    </>
  );
}
