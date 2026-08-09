import { Upload } from "lucide-react";

import { Button } from "@/components/ui/button";

import { columns } from "./columns";
import { files } from "./data";
import { DataTable } from "./data-table";

export default function FilesPage() {
	return (
		<div className="flex flex-col gap-4 px-4 py-4 lg:px-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-lg font-semibold">Files</h2>
					<p className="text-sm text-muted-foreground">
						Documents uploaded for candidate screening.
					</p>
				</div>
				<Button>
					<Upload />
					Upload file
				</Button>
			</div>
			<DataTable columns={columns} data={files} />
		</div>
	);
}
