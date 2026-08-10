import { Download, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { FileRecord } from "@/lib/contracts/files";

const statusVariant: Record<FileRecord["status"], "secondary" | "outline"> = {
	active: "secondary",
	deleted: "outline",
};

export function FileDetailHeader({ file }: { file: FileRecord }) {
	return (
		<div className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3">
			<div>
				<div className="flex items-center gap-1.5 text-sm text-muted-foreground">
					<Link href="/files" className="hover:text-foreground">
						Files
					</Link>
					<span className="opacity-50">/</span>
					<span className="text-foreground">{file.fileName}</span>
				</div>
				<div className="mt-1 flex items-center gap-2">
					<h1 className="text-lg font-semibold">{file.fileName}</h1>
					<Badge variant={statusVariant[file.status]} className="capitalize">
						{file.status}
					</Badge>
				</div>
			</div>
			<div className="flex items-center gap-2">
				<Button variant="ghost" size="icon" aria-label="Rename">
					<Pencil />
				</Button>
				<Button variant="destructive" size="icon" aria-label="Delete">
					<Trash2 />
				</Button>
				<Button>
					<Download />
					Download
				</Button>
			</div>
		</div>
	);
}
