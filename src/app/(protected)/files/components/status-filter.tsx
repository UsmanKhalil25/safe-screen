"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const statusOptions = ["all", "active", "deleted"] as const;

export function StatusFilter() {
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
				{statusOptions.map((option) => (
					<SelectItem key={option} value={option} className="capitalize">
						{option}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
