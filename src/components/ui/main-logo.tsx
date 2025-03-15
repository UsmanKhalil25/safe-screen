import Link from "next/link";
import { Shield } from "lucide-react";

interface MainLogoProps {
  className?: string;
}

function MainLogo({ className = "" }: MainLogoProps) {
  return (
    <Link href="/" className={className} prefetch={false}>
      <Shield className="h-6 w-6 transition-transform duration-500 group-hover:rotate-360" />
    </Link>
  );
}

export { MainLogo };
