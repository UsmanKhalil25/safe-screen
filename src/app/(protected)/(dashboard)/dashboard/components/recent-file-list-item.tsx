import { formatDistanceToNow } from "date-fns";

import { FileSchema } from "@/lib/schemas";
import { useFileIcon } from "@/hooks/use-file-icon";

interface RecentFileListItemProps {
  file: FileSchema;
}

function RecentFileListItem({ file }: RecentFileListItemProps) {
  const fileIcon = useFileIcon({
    fileName: file.name,
    fileType: file.mimetype,
    size: "h-8 w-8",
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
      className="flex items-center p-3 border-b last:border-0 hover:bg-muted/50 transition-colors"
    >
      <div className="mr-3 text-muted-foreground">{fileIcon}</div>
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{file.name}</p>
        <p className="text-sm text-muted-foreground">
          {formatFileSize(file.size)} •{" "}
          {formatDistanceToNow(file.createdAt, { addSuffix: true })}
        </p>
      </div>
    </div>
  );
}

export { RecentFileListItem };
