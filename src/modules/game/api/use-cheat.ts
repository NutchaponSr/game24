import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

import { useGameStore } from "@/modules/game/stores/use-game-store";

type ResponseType = InferResponseType<typeof client.game.cheat.$post, 200>;
type RequestType = InferRequestType<typeof client.game.cheat.$post>;

export const useCheat = () => {
  const { setSolutions } = useGameStore();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, header }) => {
      const response = await client.game.cheat.$post({ json, header });

      if (!response.ok) {
        throw new Error("Failed to get cheats");
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      setSolutions(data);
    }
  });

  return mutation;
}