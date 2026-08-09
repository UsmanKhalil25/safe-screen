"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "@/components/ui/input-group";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";

export const signInSchema = z.object({
	email: z.email("Enter a valid email address"),
	password: z.string().min(1, "Password is required"),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

export function SignInForm() {
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();

	const form = useForm<SignInFormValues>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(data: SignInFormValues) {
		await authClient.signIn.email(
			{ email: data.email, password: data.password },
			{
				onSuccess: () => {
					router.push("/dashboard");
					router.refresh();
				},
				onError: (ctx) => {
					toast.add({ title: ctx.error.message, type: "error" });
				},
			},
		);
	}

	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle>Welcome back</CardTitle>
				<CardDescription>
					Enter your credentials below to sign in to your account.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					id="sign-in-form"
					onSubmit={form.handleSubmit(onSubmit)}
					noValidate
				>
					<FieldGroup>
						<Controller
							name="email"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="email">Email</FieldLabel>
									<Input
										{...field}
										id="email"
										type="email"
										autoComplete="email"
										aria-invalid={fieldState.invalid}
										placeholder="jane@example.com"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<Controller
							name="password"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<div className="flex items-center justify-between">
										<FieldLabel htmlFor="password">Password</FieldLabel>
										<Link
											href="/forgot-password"
											className="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
										>
											Forgot password?
										</Link>
									</div>
									<InputGroup>
										<InputGroupInput
											{...field}
											id="password"
											type={showPassword ? "text" : "password"}
											autoComplete="current-password"
											aria-invalid={fieldState.invalid}
											placeholder="••••••••"
										/>
										<InputGroupAddon align="inline-end">
											<InputGroupButton
												size="icon-xs"
												aria-label={
													showPassword ? "Hide password" : "Show password"
												}
												onClick={() => setShowPassword((v) => !v)}
											>
												{showPassword ? <EyeOffIcon /> : <EyeIcon />}
											</InputGroupButton>
										</InputGroupAddon>
									</InputGroup>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
					</FieldGroup>
				</form>
			</CardContent>
			<CardFooter className="flex-col gap-4">
				<Button
					type="submit"
					form="sign-in-form"
					className="w-full"
					disabled={form.formState.isSubmitting}
				>
					Sign in
				</Button>
				<FieldDescription className="text-center">
					Don&apos;t have an account? <Link href="/sign-up">Sign up</Link>
				</FieldDescription>
			</CardFooter>
		</Card>
	);
}
