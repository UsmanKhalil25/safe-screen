import { z } from "zod";
import { cookies } from "next/headers";
import { FileUp, AlertCircle, LucideIcon } from "lucide-react";

import { RecentFilesListItem } from "./recent-files-list-item";

import { API_ENDPOINTS, HTTP_METHOD } from "@/constants";
import { apiClient } from "@/lib/api/client";
import { fileSchema } from "@/lib/schemas";

const filesResponseSchema = z.object({
  data: z.array(fileSchema),
});

interface StateMessageProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const StateMessage = ({
  icon: Icon,
  title,
  description,
}: StateMessageProps) => (
  <div className="p-6 flex flex-col items-center justify-center text-center">
    <div className="rounded-full bg-muted p-5 mb-4">
      <Icon className="h-10 w-10 text-muted-foreground" />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm mb-6 max-w-md">{description}</p>
  </div>
);

const FileListContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="flex-1 rounded-xl border bg-card text-card-foreground shadow-sm">
    <h2 className="text-xl font-bold m-4">Recently Uploaded Files</h2>
    {children}
  </div>
);

async function RecentFilesList() {
  const cookieHeader = (await cookies()).toString();

  const response = await apiClient({
    url: API_ENDPOINTS.FILES.BASE,
    method: HTTP_METHOD.GET,
    params: {
      limit: 5,
      sort: "desc",
    },
    headers: { Cookie: cookieHeader },
  });

  const json = await response.json();
  const parsed = filesResponseSchema.safeParse(json);
  if (!parsed.success) {
    return (
      <FileListContainer>
        <StateMessage
          icon={AlertCircle}
          title="Error fetching files"
          description="Oops! We couldn’t load your recent files. Please try again later."
        />
      </FileListContainer>
    );
  }

  const files = parsed.data.data;

  if (files.length === 0) {
    return (
      <FileListContainer>
        <StateMessage
          icon={FileUp}
          title="No files uploaded yet"
          description="When you upload files, they’ll appear here for quick access. Start by uploading your first file."
        />
      </FileListContainer>
    );
  }

  return (
    <FileListContainer>
      <div className="py-4">
        {files.map((file) => (
          <RecentFilesListItem key={file.id} file={file} />
        ))}
      </div>
    </FileListContainer>
  );
}

export { RecentFilesList };
