import toast from "react-hot-toast";

import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

import { useGenerateNumber } from "@/modules/game/api/use-generate-number";

type ResponseType = InferResponseType<typeof client.game["submit-solution"]["$post"]>;
type RequestType = InferRequestType<typeof client.game["submit-solution"]["$post"]>;

export const useSolution= () => {
  const { refetch } = useGenerateNumber();

  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, header }) => {
      const response = await client.game["submit-solution"].$post({ 
        json,
        header
      })

      const data = await response.json();

      if (!response.ok) {
        throw new Error("error" in data ? data.error : "Failed to check expression");
      }

      return data;
    },
    onSuccess: () => {
      toast.success("Correct!");
      queryClient.invalidateQueries({ queryKey: ["history"] });
      refetch();
    },
    onError: (error: Error) => {
      toast.error(error.message, { style: { fontSize: "14px" } });
    },
  });

  return mutation;
}; 