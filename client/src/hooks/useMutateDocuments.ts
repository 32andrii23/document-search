import type { Document } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";
import { toast } from "sonner";

export const useMutateDocuments = () => {
  const queryClient = useQueryClient();

  const createDocument = async (doc: Omit<Document, "id">) => {
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

  const deleteDocument = async (docId: string) => {
    await axiosClient.delete(`/documents/${docId}`);
  };

  const deleteDocumentMutation = useMutation({
    mutationFn: deleteDocument,
    onSuccess: () => {
      toast.success("Document deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete document"
      );
    },
  });

  return {
    createDocumentMutation,
    deleteDocumentMutation,
  };
};
