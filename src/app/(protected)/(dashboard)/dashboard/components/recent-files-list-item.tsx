import { formatDistanceToNow } from "date-fns";

import { FileSchema } from "@/lib/schemas";
import { useFileIcon } from "@/hooks/use-file-icon";

interface RecentFilesListItemProps {
  file: FileSchema;
}

function RecentFilesListItem({ file }: RecentFilesListItemProps) {
  const fileIcon = useFileIcon({
    fileName: file.name,
    fileType: file.mimetype,
    size: "h-6 w-6",
    color: "text-muted-foreground",
  });

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div
      key={file.id}
      className="flex items-center px-4 py-2 border-b last:border-0 hover:bg-muted/50 transition-colors"
    >
      <div className="mr-3 text-muted-foreground">{fileIcon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate">{file.name}</p>
        <p className="text-xs text-muted-foreground">
          {formatFileSize(file.size)} •{" "}
          {formatDistanceToNow(file.createdAt, { addSuffix: true })}
        </p>
      </div>
    </div>
  );
}

export { RecentFilesListItem };
