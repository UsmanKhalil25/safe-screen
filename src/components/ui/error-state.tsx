import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

function ErrorState({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="error-state"
			className={cn(
				"flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-xl border-dashed p-6 text-center text-balance",
				className,
			)}
			{...props}
		/>
	);
}

function ErrorStateHeader({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="error-state-header"
			className={cn("flex max-w-sm flex-col items-center gap-2", className)}
			{...props}
		/>
	);
}

const errorStateMediaVariants = cva(
	"mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "bg-transparent",
				icon: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive [&_svg:not([class*='size-'])]:size-4",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function ErrorStateMedia({
	className,
	variant = "default",
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof errorStateMediaVariants>) {
	return (
		<div
			data-slot="error-state-icon"
			data-variant={variant}
			className={cn(errorStateMediaVariants({ variant, className }))}
			{...props}
		/>
	);
}

function ErrorStateTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="error-state-title"
			className={cn(
				"font-heading text-sm font-medium tracking-tight",
				className,
			)}
			{...props}
		/>
	);
}

function ErrorStateDescription({
	className,
	...props
}: React.ComponentProps<"p">) {
	return (
		<div
			data-slot="error-state-description"
			className={cn(
				"text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
				className,
			)}
			{...props}
		/>
	);
}

export {
	ErrorState,
	ErrorStateHeader,
	ErrorStateTitle,
	ErrorStateDescription,
	ErrorStateMedia,
};
