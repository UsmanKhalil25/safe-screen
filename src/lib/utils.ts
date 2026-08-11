import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatFileSize(bytes: number): string {
	if (bytes === 0) return "0 B";
	const units = ["B", "KB", "MB", "GB", "TB"];
	const exponent = Math.min(
		Math.floor(Math.log(bytes) / Math.log(1024)),
		units.length - 1,
	);
	const value = bytes / 1024 ** exponent;
	return `${exponent === 0 ? value : value.toFixed(1)} ${units[exponent]}`;
}

export function formatDate(date: Date): string {
	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	}).format(date);
}

export function pluralize(
	count: number,
	singular: string,
	plural: string = `${singular}s`,
): string {
	return count === 1 ? singular : plural;
}

export function triggerDownload(url: string) {
	const iframe = document.createElement("iframe");
	iframe.style.display = "none";
	iframe.src = url;
	document.body.appendChild(iframe);
	setTimeout(() => iframe.remove(), 10_000);
}
