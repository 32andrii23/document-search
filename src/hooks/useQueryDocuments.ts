import { axiosClient } from "@/lib/axios";
import { useAuth } from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import type { Document } from "@/types";

export const useQueryDocuments = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["documents", user?.email],
    queryFn: () =>
      axiosClient.get<Document[]>("/documents", {
        params: { userEmail: user?.email },
      }),
  });
};
