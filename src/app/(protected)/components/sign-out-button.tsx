"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
	const router = useRouter();

	async function handleSignOut() {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push("/sign-in");
					router.refresh();
				},
				onError: (ctx) => {
					toast.add({ title: ctx.error.message, type: "error" });
				},
			},
		});
	}

	return (
		<Button variant="outline" size="sm" onClick={handleSignOut}>
			Sign out
		</Button>
	);
}
