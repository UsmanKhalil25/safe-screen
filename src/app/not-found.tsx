import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl animate-bounce">
            404
          </h1>
          <p className="text-muted-foreground">
            Looks like you've ventured into the unknown digital realm.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard" prefetch={false}>
            Return to website
          </Link>
        </Button>
      </div>
    </div>
  );
}
