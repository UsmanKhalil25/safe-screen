import { Spinner } from "@/components/ui/spinner";

interface LoadingTextProps {
  text: string;
  textClassName?: string;
}

export function LoadingText({ text, textClassName }: LoadingTextProps) {
  return (
    <span className="flex items-center gap-2">
      <Spinner className="w-4 h-4 text-inherit" />
      <span className={textClassName}>{text}</span>
    </span>
  );
}
