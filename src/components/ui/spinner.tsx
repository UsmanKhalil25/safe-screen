import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Spinner({
  className,
  ...props
}: React.HTMLAttributes<SVGSVGElement>) {
  return (
    <Loader2
      className={cn("h-8 w-8 animate-spin text-primary", className)}
      {...props}
    />
  );
}
