import { useState } from "react";
import type { Document } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";
import { toast } from "sonner";

export const useDocuments = () => {
  const queryClient = useQueryClient();

  const [documents, setDocuments] = useState<Document[]>([]);

  const createDocument = async (doc: Document) => {
    const response = await axiosClient.post("/documents", doc);
    return response.data;
  };

  const createDocumentMutation = useMutation({
    mutationFn: createDocument,
    onSuccess: () => {
      toast.success("Document created successfully");
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to create document"
      );
    },
  });

  const deleteDocument = (docId: string) => {};

  return {
    documents,
    createDocumentMutation,
    deleteDocument,
  };
};
