import { axiosClient } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

export interface SearchResult {
  document_id: string;
  filename: string;
  user_email: string;
  uploaded_at: string;
  highlight: string[];
  score: number;
}

export interface SearchResponse {
  total: number;
  results: SearchResult[];
}

export const useSearch = (q: string) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["search", q],
    queryFn: () =>
      axiosClient.get<SearchResponse>("/search", {
        params: { q, userEmail: user?.email },
      }),
    enabled: !!q && q.trim().length > 0,
  });
};
