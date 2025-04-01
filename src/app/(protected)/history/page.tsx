import Link from "next/link";

import { Button } from "@/components/ui/button";

import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";

import { UserButton } from "@/modules/auth/components/user-button";
import { HistoryList } from "@/modules/game/components/history-list";

const HistoryPage = () => {
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <div className="flex flex-col justify-between w-full gap-4">
          <div className="w-full border-b-2 flex justify-end pb-4">
            <UserButton />
          </div>
          <Button variant="super" asChild>
            <Link href="/overviews">
              Overview
            </Link>
          </Button>
        </div>
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-3">
            History
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            View all recent activities and changes.
          </p>
        </div>
        <HistoryList />
      </FeedWrapper>
    </div>
  );
}

export default HistoryPage;