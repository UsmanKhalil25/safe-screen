import { DropboxIcon } from "@/components/icons/dropbox-icon";
import { GoogleDriveIcon } from "@/components/icons/google-drive-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const integrations = [
	{
		label: "Google Drive",
		icon: GoogleDriveIcon,
		status: "Connected",
		statusVariant: "secondary" as const,
		description: "Import files from Google Drive.",
		account: "Connected as jordan@acme.com",
		action: "Import files",
		actionVariant: "default" as const,
	},
	{
		label: "Dropbox",
		icon: DropboxIcon,
		status: "Not connected",
		statusVariant: "outline" as const,
		description: "Import files from Dropbox.",
		action: "Connect",
		actionVariant: "outline" as const,
	},
];

export default function IntegrationsPage() {
	return (
		<div className="flex flex-col gap-4 px-4 py-4 lg:px-6">
			<div>
				<h2 className="text-lg font-semibold">Integrations</h2>
				<p className="text-sm text-muted-foreground">
					Connect other services to import files into Safe Screen.
				</p>
			</div>

			<div className="grid gap-4 sm:grid-cols-2">
				{integrations.map((integration) => {
					const Icon = integration.icon;

					return (
						<Card key={integration.label} className="h-full">
							<CardHeader>
								<div className="flex items-start gap-3">
									<Icon className="size-8 shrink-0" />
									<div className="min-w-0">
										<CardTitle>{integration.label}</CardTitle>
										<CardDescription>{integration.description}</CardDescription>
									</div>
								</div>
								<CardAction>
									<Badge variant={integration.statusVariant}>
										{integration.status}
									</Badge>
								</CardAction>
							</CardHeader>
							{integration.account && (
								<CardContent className="flex-1 text-sm text-muted-foreground">
									{integration.account}
								</CardContent>
							)}
							<CardFooter className="mt-auto justify-end">
								<Button variant={integration.actionVariant}>
									{integration.action}
								</Button>
							</CardFooter>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
