import { FileTable } from "./components/file-table/file-table";
import type { FilesQuery } from "./components/file-table/file-table-impl";
import { SearchInput } from "./components/search-input";
import { SelectionActionsBar } from "./components/selection/selection-actions-bar";
import { SelectionProvider } from "./components/selection/selection-provider";
import { SortSelect } from "./components/sort-select";
import { StatusSelect } from "./components/status-select";
import { UploadDialog } from "./components/upload-dialog";

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
				<UploadDialog />
			</div>

			<SelectionProvider>
				<div className="w-full">
					<div className="flex items-center gap-2 py-4">
						<SearchInput />
						<StatusSelect />
						<SortSelect />
					</div>

					<SelectionActionsBar />

					<FileTable query={query} />
				</div>
			</SelectionProvider>
		</div>
	);
}
