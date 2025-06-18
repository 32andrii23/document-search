import type React from "react";

import { useState } from "react";
import { toast } from "sonner";
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
import type { Document } from "@/types";
import { generateMockContent } from "@/data";

interface DocumentUploadProps {
  onUpload: (doc: Document) => void;
}

export function DocumentUpload({ onUpload }: DocumentUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      const errorMessage = "Only PDF and DOCX files are allowed";
      setUploadError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    setIsUploading(true);
    setUploadError("");

    const loadingToast = toast.loading(`Uploading ${file.name}...`);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const newDoc: Document = {
        id: Date.now().toString(),
        filename: file.name,
        uploadDate: new Date().toISOString(),
        content: generateMockContent(
          file.name,
          file.type.includes("pdf") ? "pdf" : "docx"
        ),
        type: file.type.includes("pdf") ? "pdf" : "docx",
      };

      onUpload(newDoc);

      toast.dismiss(loadingToast);
      toast.success(`${file.name} uploaded successfully!`);

      e.target.value = "";
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setIsUploading(false);
    }
  };

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

          {uploadError && (
            <Alert variant="destructive">
              <AlertDescription>{uploadError}</AlertDescription>
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
