import { Check } from "lucide-react";

interface FeatureListItemProps {
  children: React.ReactNode;
  variant?: "default" | "inverted";
}

export function FeatureListItem({
  children,
  variant = "default",
}: FeatureListItemProps) {
  return (
    <li className="flex items-center">
      <Check
        className={`mr-2 h-4 w-4 ${
          variant === "inverted" ? "text-primary-foreground" : "text-primary"
        }`}
      />
      {children}
    </li>
  );
}
