"use client";

import { parseAsInteger, parseAsStringEnum, useQueryStates } from "nuqs";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { SORT_COLUMNS } from "@/lib/contracts/files";

const sortByValues = SORT_COLUMNS.map((column) => column.value);
const sortDirValues = ["asc", "desc"] as const;

const sortDirLabels: Record<(typeof sortDirValues)[number], string> = {
	asc: "Ascending",
	desc: "Descending",
};

const sortDirItems = sortDirValues.map((value) => ({
	value,
	label: sortDirLabels[value],
}));

export function SortControls() {
	const [{ sortBy, sortDir }, setQuery] = useQueryStates(
		{
			sortBy: parseAsStringEnum(sortByValues).withDefault("createdAt"),
			sortDir: parseAsStringEnum([...sortDirValues]).withDefault("desc"),
			page: parseAsInteger,
		},
		{ shallow: false, clearOnDefault: true },
	);

	return (
		<>
			<Select
				items={SORT_COLUMNS}
				value={sortBy}
				onValueChange={(next: string | null) => {
					if (!next) return;
					setQuery({
						sortBy: next as (typeof sortByValues)[number],
						page: null,
					});
				}}
			>
				<SelectTrigger className="w-32">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Sort by</SelectLabel>
						{SORT_COLUMNS.map((column) => (
							<SelectItem key={column.value} value={column.value}>
								{column.label}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
			<Select
				items={sortDirItems}
				value={sortDir}
				onValueChange={(next: string | null) => {
					if (!next) return;
					setQuery({
						sortDir: next as (typeof sortDirValues)[number],
						page: null,
					});
				}}
			>
				<SelectTrigger className="w-32">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Order</SelectLabel>
						{sortDirValues.map((dir) => (
							<SelectItem key={dir} value={dir}>
								{sortDirLabels[dir]}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</>
	);
}
