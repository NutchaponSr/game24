import { CheckIcon, CircleXIcon, CopyIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface SolutionsListProps {
  solutions: string[];
  copiedItems: Set<number>;
  onCopy: (expression: string, index: number) => void;
}

export const SolutionsList = ({ 
  solutions, 
  copiedItems,
  onCopy
}: SolutionsListProps) => {
  if (solutions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-48 gap-2">
        <CircleXIcon className="size-8 stroke-[1.75] text-muted-foreground" />
        <p className="text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis">
          No solution for this expression.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 py-6">
      {solutions.map((item, index) => (
        <div key={index} className="border-2 rounded-xl border-b-4 p-3">
          <div className="flex items-center justify-between gap-4">
            <p className="text-ellipsis whitespace-nowrap overflow-hidden text-lg font-semibold">
              {item}
            </p>
            <Button
              size="icon"
              variant="sidebar"
              onClick={() => onCopy(item, index)}
              disabled={copiedItems.has(index)}
            >
              {copiedItems.has(index) ? (
                <CheckIcon className="size-5" />
              ) : (
                <CopyIcon className="size-5" />
              )}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};