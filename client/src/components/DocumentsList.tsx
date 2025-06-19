import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Trash2, Calendar } from "lucide-react";
import { toast } from "sonner";
import type { Document } from "@/types";
import { useMutateDocuments } from "@/hooks/useMutateDocuments";
import { useQueryDocuments } from "@/hooks/useQueryDocuments";

export function DocumentList() {
  const { deleteDocument } = useMutateDocuments();
  const { data: documents } = useQueryDocuments();

  const handleDelete = (doc: Document) => {
    deleteDocument(doc.id.toString());
    toast.success(`${doc.filename} deleted successfully`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Documents ({documents?.data.length})</CardTitle>
        <CardDescription>Manage your uploaded documents</CardDescription>
      </CardHeader>
      <CardContent>
        {documents?.data.length === 0 ? (
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
                  >
                    <Trash2 className="h-4 w-4" />
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
