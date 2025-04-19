"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoadingText } from "@/components/ui/loading-text";

import { cn } from "@/lib/utils";
import { showToast } from "@/lib/toast-helper";
import { useFileIcon } from "@/hooks/use-file-icon";
import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS, HTTP_METHOD } from "@/constants";

interface DragAndDropAreaProps {
  onDrop: (acceptedFiles: File[]) => void;
}

const DragAndDropArea = ({ onDrop }: DragAndDropAreaProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
        isDragActive
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-2">
        <Upload className="h-8 w-8 text-muted-foreground" />
        <div className="flex flex-col items-center">
          <p className="font-medium text-sm">
            {isDragActive ? "Drop the file here" : "Drag & drop a file here"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            or click to browse files
          </p>
        </div>
      </div>
    </div>
  );
};

function UploadFileDialog() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileIcon = useFileIcon({ fileName: file?.name, fileType: file?.type });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (!selectedFile) return;

    setFile(selectedFile);
  }, []);

  const handleUpload = async () => {
    if (!file) return;
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await apiClient({
        url: API_ENDPOINTS.FILES.BASE,
        method: HTTP_METHOD.POST,
        data: formData,
      });

      const result = await response.json();

      setFile(null);
      setOpen(false);

      showToast(
        "success",
        "Upload complete",
        result.message || "File has been successfully processed."
      );
      router.refresh();
    } catch (error) {
      console.error("Error uploading file: ", error);
      showToast(
        "error",
        "Upload failed",
        `${
          error instanceof Error
            ? error.message
            : "An unexpected error occurred"
        }`
      );
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(2)} MB`;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          <span>Upload Files</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
          <DialogDescription>
            Drag and drop a file or click to browse. Supported formats: images,
            PDF, and documents.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {!file ? (
            <DragAndDropArea onDrop={onDrop} />
          ) : (
            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="h-16 w-16 rounded-md border bg-muted flex items-center justify-center">
                    {fileIcon}
                  </div>
                  <div className="flex flex-col">
                    <p className="font-medium text-sm truncate max-w-[250px]">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {file.type || "Unknown type"} •{" "}
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleRemoveFile}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            type="submit"
            className="w-full"
            disabled={uploading || !file}
            onClick={handleUpload}
            aria-live="polite"
          >
            {uploading ? <LoadingText text="Uploading..." /> : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { UploadFileDialog };
