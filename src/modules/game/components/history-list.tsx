"use client";

import React from "react";

import { format, formatDistanceToNow } from "date-fns";
import { CalendarDaysIcon, ClockIcon, SearchIcon } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

import { useGetHistory } from "@/modules/game/api/use-get-history";
import { Button } from "@/components/ui/button";

export const HistoryList = () => {
  const { 
    data, 
    isLoading, 
    hasNextPage, 
    fetchNextPage, 
    isFetchingNextPage, 
  } = useGetHistory();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 2 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-60" />
        ))}
      </div>
    );
  }

  if (!data?.pages.length) {
    return (
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">
          Recent projects
        </h3>
        <div className="flex flex-col gap-y-4 items-center justify-center h-32">
          <SearchIcon className="size-6 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">
            No projects found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {data.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.data.map((history) => (
            <div key={history.id} className="border-2 rounded-xl border-b-4">
            <div className="pb-3 p-3">
              <h2 className="text-lg font-bold">Math Solution</h2>
              <p className="text-sm text-muted-foreground">{formatDistanceToNow(new Date(history.createdAt), { addSuffix: true })}</p>
            </div>
            <div className="flex flex-col justify-center p-3">
              <div className="mb-4 flex justify-center gap-3">
                {history.numbers.map((number, index) => (
                  <div key={index} className="h-10 w-10 flex items-center justify-center text-lg font-bold rounded-lg bg-sky-500/15 text-sky-500 border-sky-300 border-2 ">
                    {number}
                  </div>
                ))}
              </div>
              <div className="bg-muted p-3 rounded-md">
                <h2 className="text-center text-lg font-bold">{history.solution}</h2>
              </div>
  
            </div>
            <div className="border-t-2 bg-muted/20 px-3 py-2">
              <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CalendarDaysIcon className="h-3.5 w-3.5" />
                  <span>{format(history.createdAt, "MMM d, yyyy")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-3.5 w-3.5" />
                  <span>{format(history.createdAt, "p")}</span>
                </div>
              </div>
            </div>
          </div>  
          ))}
        </React.Fragment>
      ))}
      {hasNextPage && (
        <div className="w-full flex items-center justify-center pt-4">
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
}