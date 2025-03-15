import Link from "next/link";
import { Shield } from "lucide-react";

function Footer() {
  return (
    <footer className="w-full border-t bg-background py-6 md:py-12">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">SafeScreen</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Secure file storage and sharing for individuals and teams.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm hover:text-primary">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-primary">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-primary">
                  Security
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-primary">
                  Enterprise
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-primary">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-primary">
                  GDPR
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} SafeScreen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
