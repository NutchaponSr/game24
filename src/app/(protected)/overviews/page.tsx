"use client";

import toast from "react-hot-toast";

import { useMount } from "react-use";
import { useState } from "react";
import { RefreshCcwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { useCookies } from "@/providers/cookie-provider";

import { Card } from "@/modules/game/components/card";
import { SolutionForm } from "@/modules/game/components/solution-form";
import { SolutionsList } from "@/modules/game/components/solution-list";

import { useCheat } from "@/modules/game/api/use-cheat";
import { useGameStore } from "@/modules/game/stores/use-game-store";
import { useGenerateNumber } from "@/modules/game/api/use-generate-number";

import { Footer } from "../components/footer";
import { Header } from "../components/header";

const OverviewsPage = () => {
  const { cookie } = useCookies();
  const { solutions, isCheat } = useGameStore();
  const { data, isPending, refetch } = useGenerateNumber();

  const numbers = data || [];

  const [copiedItems, setCopiedItems] = useState<Set<number>>(new Set());

  const { mutate } = useCheat();

  const onCopy = (expression: string, index: number) => {
    navigator.clipboard.writeText(expression).then(() => {
      toast.success("Copied link to clipboard");
      setCopiedItems((prev) => {
        const newSet = new Set(prev);
        newSet.add(index); 
        return newSet;
      });
  
      setTimeout(() => {
        setCopiedItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(index); 
          return newSet;
        });
      }, 3000); 
    });
  };

  useMount(() => refetch());

  return (
    <>
      <Header />
      <div className="flex-1">
        <div className="h-full flex items-start justify-center my-8">
          <div className="w-full max-w-3xl px-6 flex flex-col gap-y-12 items-start">
            <div className="flex items-center gap-4">
              <h1 className="text-lg lg:text-3xl font-bold text-neutral-700">Game24</h1>
              <Button
                size="icon"
                variant="sidebar"
                onClick={async () => {
                  const newData = await refetch();
                  if (isCheat) {
                    mutate({
                      json: { numbers: newData.data ?? [] },
                      header: {
                        Authorization: `Bearer ${cookie}`,
                      },
                    });
                  }
                }}
              >
                <RefreshCcwIcon className="size-5" />
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {isPending ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-48 w-32" />
                ))
              ) : (
                numbers.map((number, index) => (
                  <Card key={index} className="border-b-4 hover:bg-black/5">
                    {number}
                  </Card>
                ))
              )}
              <Card target className="border-rose-600 bg-rose-500">
                24
              </Card>
            </div>
            {!isCheat && <SolutionForm numbers={numbers} />}
            {isCheat && (
              <div className="border-t-2 w-full flex flex-col gap-4">
                <SolutionsList 
                  solutions={solutions} 
                  copiedItems={copiedItems} 
                  onCopy={onCopy} 
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer numbers={numbers} />
    </>
  );
}

export default OverviewsPage;