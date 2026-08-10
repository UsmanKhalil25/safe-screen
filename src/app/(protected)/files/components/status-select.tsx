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

const statusOptions = ["all", "active", "deleted"] as const;

const statusItems = statusOptions.map((option) => ({
	value: option,
	label: option[0].toUpperCase() + option.slice(1),
}));

export function StatusSelect() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const current = searchParams.getAll("status");
	const value =
		current.length === 1 &&
		(current[0] === "active" || current[0] === "deleted")
			? current[0]
			: "all";

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
					{statusOptions.map((option) => (
						<SelectItem key={option} value={option} className="capitalize">
							{option}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
