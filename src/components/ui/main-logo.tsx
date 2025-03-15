import Link from "next/link";
import { Shield } from "lucide-react";

interface MainLogoProps {
  className?: string;
  path?: string;
}

function MainLogo({ className = "", path = "/" }: MainLogoProps) {
  return (
    <Link href={path} className={className} prefetch={false}>
      <Shield className="h-6 w-6 transition-transform duration-500 hover:rotate-360" />
    </Link>
  );
}

export { MainLogo };
