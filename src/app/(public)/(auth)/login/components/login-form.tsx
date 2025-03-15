"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Shield } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingText } from "@/components/ui/loading-text";

import { GitHubIcon } from "@/components/icons/github-icon";
import { GoogleIcon } from "@/components/icons/google-icon";

import { LoginSchema, loginSchema } from "@/lib/schemas";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginSchema) => {
    setIsSubmitting(true);
    try {
      console.log("Submitting the form", data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...form}>
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col items-center gap-2">
            <Link
              href="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <Shield className="size-6" />
            </Link>
            <h1 className="text-xl font-bold">Welcome to SafeScreen</h1>
            <p className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="underline underline-offset-4">
                Sign up
              </Link>
            </p>
          </div>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4"
            aria-label="Login form"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="m@example.com"
                      autoComplete="email"
                      aria-describedby="email-error"
                    />
                  </FormControl>
                  <FormMessage
                    id="email-error"
                    className="text-red-600"
                    aria-live="polite"
                  />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      autoComplete="current-password"
                      aria-describedby="password-error"
                    />
                  </FormControl>
                  <FormMessage
                    id="password-error"
                    className="text-red-600"
                    aria-live="polite"
                  />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
              aria-live="polite"
            >
              {isSubmitting ? <LoadingText text="Logging in..." /> : "Login"}
            </Button>
          </form>

          <div className="flex flex-col gap-6">
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Button
                variant="outline"
                className="w-full flex items-center gap-2"
              >
                <GitHubIcon />
                Continue with GitHub
              </Button>
              <Button
                variant="outline"
                className="w-full flex items-center gap-2"
              >
                <GoogleIcon className="w-5 h-5" />
                Continue with Google
              </Button>
            </div>
          </div>
        </div>
      </Form>

      <p className="text-center text-xs text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link
          href="#"
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="#"
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
