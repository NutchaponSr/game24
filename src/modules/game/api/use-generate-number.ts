import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

import { useCookies } from "@/providers/cookie-provider";

export const useGenerateNumber = () => {
  const { cookie } = useCookies();

  const query = useQuery({
    queryKey: ["number"],
    queryFn: async () => {
      const response = await client.game["generate-number"].$get({
        header: {
          Authorization: `Bearer ${cookie}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      return data.data;
    },
    enabled: false,
    refetchOnWindowFocus: false,
  });

  return query;
};