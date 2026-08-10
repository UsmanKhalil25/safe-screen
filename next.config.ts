// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		serverActions: {
			bodySizeLimit: "30mb",
		},
	},
	async redirects() {
		return [
			{
				source: "/",
				destination: "/dashboard",
				permanent: false,
			},
		];
	},
};

export default nextConfig;

initOpenNextCloudflareForDev();
