"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

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
import { MainLogo } from "@/components/ui/main-logo";

import { GitHubIcon } from "@/components/icons/github-icon";
import { GoogleIcon } from "@/components/icons/google-icon";

import { registerSchema, RegisterSchema } from "@/lib/schemas";
import { showToast } from "@/lib/toast-helper";

export function RegisterForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterSchema) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        if (response.status === 409) {
          form.setError("email", {
            type: "manual",
            message: "This email is already registered",
          });
          showToast(
            "error",
            "Email already registered",
            "This email is already registered."
          );
          return;
        }

        if (response.status === 400 && result.details) {
          Object.entries(result.details).forEach(([key, value]) => {
            if (key in form.formState.errors) {
              form.setError(key as keyof RegisterSchema, {
                type: "manual",
                message: Array.isArray(value) ? value[0] : String(value),
              });
            }
          });
          showToast(
            "error",
            "Validation error",
            "Please check the form for errors."
          );
          return;
        }

        showToast(
          "error",
          "Something went wrong",
          result.error || "Failed to create account. Please try again."
        );
        return;
      }

      showToast(
        "success",
        "Account created!",
        "Your account has been successfully created."
      );

      router.push("/login");
    } catch (error) {
      console.error("Registration error:", error);
      showToast(
        "error",
        "Registration error",
        "An error occurred while creating your account. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Form {...form}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <MainLogo />
            <h1 className="text-xl font-bold">Create Your Account</h1>
            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Log in
              </Link>
            </p>
          </div>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4"
            aria-label="Sign up form"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="John Doe"
                      autoComplete="name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                    />
                  </FormControl>
                  <FormMessage />
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
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
              aria-live="polite"
            >
              {isSubmitting ? <LoadingText text="Signing up..." /> : "Sign Up"}
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
                onClick={() => {}}
                type="button"
              >
                <GitHubIcon />
                Continue with GitHub
              </Button>
              <Button
                variant="outline"
                className="w-full flex items-center gap-2"
                onClick={() => {}}
                type="button"
              >
                <GoogleIcon className="w-5 h-5" />
                Continue with Google
              </Button>
            </div>
          </div>
        </div>
      </Form>

      <p className="text-center text-xs text-muted-foreground">
        By signing up, you agree to our{" "}
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
