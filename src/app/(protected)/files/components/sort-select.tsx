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
import { SORT_DIRECTION_LABELS, SORT_DIRECTION_OPTIONS } from "@/lib/constants";
import { SORT_COLUMNS } from "@/lib/contracts/files";

const sortByValues = SORT_COLUMNS.map((column) => column.value);

const sortDirItems = SORT_DIRECTION_OPTIONS.map((value) => ({
	value,
	label: SORT_DIRECTION_LABELS[value],
}));

export function SortSelect() {
	const [{ sortBy, sortDir }, setQuery] = useQueryStates(
		{
			sortBy: parseAsStringEnum(sortByValues).withDefault("createdAt"),
			sortDir: parseAsStringEnum([...SORT_DIRECTION_OPTIONS]).withDefault(
				"desc",
			),
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
						sortDir: next as (typeof SORT_DIRECTION_OPTIONS)[number],
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
						{SORT_DIRECTION_OPTIONS.map((dir) => (
							<SelectItem key={dir} value={dir}>
								{SORT_DIRECTION_LABELS[dir]}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</>
	);
}
