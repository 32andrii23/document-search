import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMutateDocuments } from "@/hooks/useMutateDocuments";
import { useQueryDocuments } from "@/hooks/useQueryDocuments";
import { useS3 } from "@/hooks/useS3";
import type { Document } from "@/types";
import { Calendar, FileText, Trash2, Loader2 } from "lucide-react";

export function DocumentList() {
  const { getDeleteUrlMutation, deleteFileMutation } = useS3();
  const { deleteDocumentMutation } = useMutateDocuments();
  const { data: documents, isLoading } = useQueryDocuments();

  const handleDelete = async (doc: Document) => {
    try {
      const deleteUrl = await getDeleteUrlMutation.mutateAsync(doc.filename);

      await deleteFileMutation.mutateAsync(deleteUrl);

      await deleteDocumentMutation.mutateAsync(doc.id.toString());
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const isDeleting =
    getDeleteUrlMutation.isPending ||
    deleteFileMutation.isPending ||
    deleteDocumentMutation.isPending;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Your Documents ({isLoading ? "😁" : documents?.data.length})
        </CardTitle>
        <CardDescription>Manage your uploaded documents</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : documents?.data.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No documents uploaded yet</p>
          </div>
        ) : (
          <ScrollArea className="h-96">
            <div className="space-y-3">
              {documents?.data.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">{doc.filename}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {new Date(doc.uploadedAt).toLocaleDateString()}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {doc.s3Url.split(".").pop()?.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(doc)}
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
