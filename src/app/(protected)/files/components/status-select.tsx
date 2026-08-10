"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { FILE_STATUS_FILTER_OPTIONS } from "../constants";

const statusItems = FILE_STATUS_FILTER_OPTIONS.map((option) => ({
	value: option,
	label: option[0].toUpperCase() + option.slice(1),
}));

export function StatusSelect() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const current = searchParams.get("status");
	const value = current === "active" || current === "deleted" ? current : "all";

	return (
		<Select
			items={statusItems}
			value={value}
			onValueChange={(next: string | null) => {
				const params = new URLSearchParams(searchParams.toString());
				params.delete("status");
				if (next && next !== "all") params.set("status", next);
				params.delete("page");
				router.push(`${pathname}?${params.toString()}`);
			}}
		>
			<SelectTrigger className="w-40">
				<SelectValue className="capitalize" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Status</SelectLabel>
					{FILE_STATUS_FILTER_OPTIONS.map((option) => (
						<SelectItem key={option} value={option} className="capitalize">
							{option}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
