export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex min-h-svh items-center justify-center p-6">
			{children}
		</div>
	);
}
