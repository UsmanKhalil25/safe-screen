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

export const signUpSchema = z
	.object({
		name: z.string().min(2, "Name must be at least 2 characters").max(50),
		email: z.email("Enter a valid email address"),
		password: z.string().min(8, "Password must be at least 8 characters"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export type SignUpFormValues = z.infer<typeof signUpSchema>;

export function SignUpForm() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const router = useRouter();

	const form = useForm<SignUpFormValues>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	async function onSubmit(data: SignUpFormValues) {
		await authClient.signUp.email(
			{ name: data.name, email: data.email, password: data.password },
			{
				onSuccess: () => {
					router.push("/");
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
				<CardTitle>Create an account</CardTitle>
				<CardDescription>
					Enter your details below to get started.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					id="sign-up-form"
					onSubmit={form.handleSubmit(onSubmit)}
					noValidate
				>
					<FieldGroup>
						<Controller
							name="name"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="name">Name</FieldLabel>
									<Input
										{...field}
										id="name"
										autoComplete="name"
										aria-invalid={fieldState.invalid}
										placeholder="Jane Doe"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

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
									<FieldLabel htmlFor="password">Password</FieldLabel>
									<InputGroup>
										<InputGroupInput
											{...field}
											id="password"
											type={showPassword ? "text" : "password"}
											autoComplete="new-password"
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

						<Controller
							name="confirmPassword"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="confirm-password">
										Confirm password
									</FieldLabel>
									<InputGroup>
										<InputGroupInput
											{...field}
											id="confirm-password"
											type={showConfirmPassword ? "text" : "password"}
											autoComplete="new-password"
											aria-invalid={fieldState.invalid}
											placeholder="••••••••"
										/>
										<InputGroupAddon align="inline-end">
											<InputGroupButton
												size="icon-xs"
												aria-label={
													showConfirmPassword
														? "Hide password"
														: "Show password"
												}
												onClick={() => setShowConfirmPassword((v) => !v)}
											>
												{showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
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
					form="sign-up-form"
					className="w-full"
					disabled={form.formState.isSubmitting}
				>
					Create account
				</Button>
				<FieldDescription className="text-center">
					Already have an account? <Link href="/sign-in">Sign in</Link>
				</FieldDescription>
			</CardFooter>
		</Card>
	);
}
