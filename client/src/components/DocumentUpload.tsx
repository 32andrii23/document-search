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
import { Upload, Loader2 } from "lucide-react";
import { AllowedType } from "@/lib/consts";
import { useUpload } from "@/hooks/useUpload";
import { useAuth } from "@/hooks/useAuth";
import { v4 as uuidv4 } from "uuid";
import { useMutateDocuments } from "@/hooks/useMutateDocuments";

export function DocumentUpload() {
  const { user } = useAuth();
  const { getUploadUrlMutation, uploadFileMutation } = useUpload();
  const { createDocumentMutation } = useMutateDocuments();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;

    const file = e.target.files?.[0];
    if (!file) return;

    const uploadFileName = `${user.email}-${uuidv4()}-${file.name}`;

    const uploadUrl = await getUploadUrlMutation.mutateAsync({
      filename: uploadFileName,
      type: file.type as AllowedType,
    });

    await uploadFileMutation.mutateAsync({
      file,
      url: uploadUrl,
    });

    const s3Url = `https://${
      import.meta.env.VITE_AWS_S3_BUCKET_NAME
    }.s3.amazonaws.com/${uploadFileName}`;

    await createDocumentMutation.mutateAsync({
      filename: uploadFileName,
      s3Url,
      userEmail: user.email,
    });
  };

  const isUploading =
    getUploadUrlMutation.isPending ||
    uploadFileMutation.isPending ||
    createDocumentMutation.isPending;

  const error =
    getUploadUrlMutation.isError ||
    uploadFileMutation.isError ||
    createDocumentMutation.isError;

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
              <AlertDescription className="flex items-center gap-2">
                Processing document...{" "}
                <Loader2 className="h-4 w-4 animate-spin" />
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
