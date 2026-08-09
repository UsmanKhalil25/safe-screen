"use client";

import { debounce, parseAsInteger, parseAsString, useQueryStates } from "nuqs";

import { Input } from "@/components/ui/input";

export function SearchInput() {
	const [{ search }, setQuery] = useQueryStates(
		{
			search: parseAsString.withDefault(""),
			page: parseAsInteger,
		},
		{
			shallow: false,
			clearOnDefault: true,
			limitUrlUpdates: debounce(400),
		},
	);

	return (
		<Input
			placeholder="Filter files..."
			value={search}
			onChange={(event) => setQuery({ search: event.target.value, page: null })}
			className="max-w-sm"
		/>
	);
}
