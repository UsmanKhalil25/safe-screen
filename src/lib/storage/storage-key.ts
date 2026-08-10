function sanitizeExtension(fileName: string): string {
	const match = /\.([a-zA-Z0-9]{1,10})$/.exec(fileName);

	return match ? `.${match[1].toLowerCase()}` : "";
}

export function buildStorageKey(
	ownerId: string,
	fileId: string,
	fileName: string,
): string {
	return `${ownerId}/${fileId}${sanitizeExtension(fileName)}`;
}
