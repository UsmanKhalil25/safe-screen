import { BulkActionsBar } from "./components/bulk-actions-bar";
import { FileTable } from "./components/file-table";
import type { FilesQuery } from "./components/file-table-impl";
import { SearchInput } from "./components/search-input";
import { SelectionProvider } from "./components/selection";
import { SortControls } from "./components/sort-controls";
import { StatusFilter } from "./components/status-filter";
import { UploadFilesButton } from "./components/upload-files-button";

export default async function FilesPage({
	searchParams,
}: {
	searchParams: Promise<FilesQuery>;
}) {
	const query = await searchParams;

	return (
		<div className="flex flex-col gap-4 px-4 py-4 lg:px-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-lg font-semibold">Files</h2>
					<p className="text-sm text-muted-foreground">
						Documents uploaded for candidate screening.
					</p>
				</div>
				<UploadFilesButton />
			</div>

			<SelectionProvider>
				<div className="w-full">
					<div className="flex items-center gap-2 py-4">
						<SearchInput />
						<StatusFilter />
						<SortControls />
					</div>

					<BulkActionsBar />

					<FileTable query={query} />
				</div>
			</SelectionProvider>
		</div>
	);
}
