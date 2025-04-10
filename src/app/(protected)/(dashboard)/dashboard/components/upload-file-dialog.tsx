"use client";

import { useState, useCallback } from "react";
import {
  Upload,
  X,
  FileText,
  ImageIcon,
  File,
  Check,
  Loader2,
} from "lucide-react";
import { useDropzone } from "react-dropzone";

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
import { Progress } from "@/components/ui/progress";
import { showToast } from "@/lib/toast-helper";
import { cn } from "@/lib/utils";

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
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [open, setOpen] = useState(false);

  // Callback for both drag & drop and file input
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setUploadComplete(false);

    // If the file is an image, generate a preview
    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  }, []);

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setProgress(0);

    // Simulate progress updates until the upload completes
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + Math.random() * 10, 95));
    }, 300);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);

      if (res.ok) {
        setProgress(100);
        setUploadComplete(true);
        showToast(
          "info",
          "File uploaded successfully",
          `${file.name} has been uploaded.`
        );

        // Close the dialog after a short delay, then reset state
        setTimeout(() => {
          setOpen(false);
          setTimeout(() => {
            setFile(null);
            setPreview(null);
            setProgress(0);
            setUploadComplete(false);
            setUploading(false);
          }, 300);
        }, 1500);
      } else {
        setProgress(0);
        showToast(
          "error",
          "Upload failed",
          "There was an error uploading your file. Please try again."
        );
        setUploading(false);
      }
    } catch (error) {
      clearInterval(progressInterval);
      setProgress(0);
      showToast(
        "error",
        "Upload failed",
        "There was an error uploading your file. Please try again."
      );
      setUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
    setUploadComplete(false);
  };

  const getFileIcon = () => {
    if (!file) return <FileText className="h-10 w-10 text-muted-foreground" />;
    if (file.type.startsWith("image/"))
      return <ImageIcon className="h-10 w-10 text-blue-500" />;
    if (file.type.includes("pdf"))
      return <FileText className="h-10 w-10 text-red-500" />;
    if (file.type.includes("word") || file.type.includes("document"))
      return <FileText className="h-10 w-10 text-blue-700" />;
    return <File className="h-10 w-10 text-gray-500" />;
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
                  {preview ? (
                    <div className="h-16 w-16 rounded-md overflow-hidden border bg-muted flex items-center justify-center">
                      <img
                        src={preview || "/placeholder.svg"}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-16 w-16 rounded-md border bg-muted flex items-center justify-center">
                      {getFileIcon()}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <p className="font-medium text-sm truncate max-w-[250px]">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {file.type || "Unknown type"} •{" "}
                      {formatFileSize(file.size)}
                    </p>

                    {uploading && (
                      <div className="mt-2 w-full">
                        <Progress value={progress} className="h-1.5 w-full" />
                        <p className="text-xs text-muted-foreground mt-1">
                          {progress < 100
                            ? `Uploading... ${Math.round(progress)}%`
                            : "Upload complete!"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                {!uploading && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleRemoveFile}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
            onClick={handleUpload}
            disabled={!file || uploading || uploadComplete}
            className="min-w-[100px]"
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : uploadComplete ? (
              <Check className="h-4 w-4 mr-2" />
            ) : (
              <Upload className="h-4 w-4 mr-2" />
            )}
            {uploading
              ? "Uploading..."
              : uploadComplete
              ? "Uploaded"
              : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { UploadFileDialog };
