"use client";

import { parseAsInteger, useQueryStates } from "nuqs";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from "@/lib/contracts/files";

const pageSizeItems = PAGE_SIZE_OPTIONS.map((size) => ({
	value: String(size),
	label: `${size} / page`,
}));

export function PageSizeSelect() {
	const [{ pageSize }, setQuery] = useQueryStates(
		{
			pageSize: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
			page: parseAsInteger,
		},
		{ shallow: false, clearOnDefault: true },
	);

	return (
		<Select
			items={pageSizeItems}
			value={String(pageSize)}
			onValueChange={(next: string | null) => {
				if (!next) return;
				setQuery({ pageSize: Number(next), page: null });
			}}
		>
			<SelectTrigger className="w-32">
				<SelectValue>
					{(value: string | null) => (value ? `${value} / page` : "")}
				</SelectValue>
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Page size</SelectLabel>
					{PAGE_SIZE_OPTIONS.map((size) => (
						<SelectItem key={size} value={String(size)}>
							{size} / page
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
