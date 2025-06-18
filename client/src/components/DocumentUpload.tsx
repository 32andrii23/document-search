import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload } from "lucide-react";
import { AllowedType } from "@/lib/consts";
import { useUpload } from "@/hooks/useUpload";
// import { useDocuments } from "@/hooks/useDocuments";

export function DocumentUpload() {
  const { getUploadUrlMutation, uploadFileMutation } = useUpload();
  // const { createDocumentMutation } = useDocuments();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadUrl = await getUploadUrlMutation.mutateAsync({
      filename: file.name,
      type: file.type as AllowedType,
    });

    const uploadedFile = await uploadFileMutation.mutateAsync({
      file,
      url: uploadUrl,
    });

    console.log(uploadedFile);
  };

  const isUploading =
    getUploadUrlMutation.isPending || uploadFileMutation.isPending;

  const error = getUploadUrlMutation.isError || uploadFileMutation.isError;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Document</CardTitle>
        <CardDescription>
          Upload PDF or DOCX files to make them searchable
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file-upload">Select File</Label>
            <Input
              id="file-upload"
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
            <p className="text-sm text-gray-500 mt-1">
              Only PDF and DOCX files are supported
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isUploading && (
            <Alert>
              <Upload className="h-4 w-4" />
              <AlertDescription>
                Processing document... Please wait.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
