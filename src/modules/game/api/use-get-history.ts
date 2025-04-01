import { useInfiniteQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

import { client } from "@/lib/rpc";

import { useCookies } from "@/providers/cookie-provider";

export type ResponseType = InferResponseType<typeof client.api.game.history.$get, 200>;

export const useGetHistory = () => {
  const { cookie } = useCookies();

  const query = useInfiniteQuery<ResponseType, Error>({
    queryKey: ["history"],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const response = await client.api.game.history.$get({
        header: {
          Authorization: `Bearer ${cookie}`,
        },
        query: {
          page: (pageParam as number).toString(),
          limit: "5",
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      return await response.json()
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  return query
}