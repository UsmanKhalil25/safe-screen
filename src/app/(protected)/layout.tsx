import { SignOutButton } from "./components/sign-out-button";

export default async function ProtectedLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex min-h-svh flex-col">
			<header className="flex items-center justify-between border-b px-6 py-4">
				<SignOutButton />
			</header>
			<main className="flex flex-1 items-center justify-center p-6">
				{children}
			</main>
		</div>
	);
}
