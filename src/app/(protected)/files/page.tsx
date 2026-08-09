import { files } from "./data";
import { FilesView } from "./components/files-view";

export default function FilesPage() {
	return <FilesView initialFiles={files} />;
}
