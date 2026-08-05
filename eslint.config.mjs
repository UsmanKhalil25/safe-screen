import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

const eslintConfig = [
	{
		ignores: [
			".next/**",
			".open-next/**",
			".wrangler/**",
			"out/**",
			"build/**",
			"next-env.d.ts",
			"cloudflare-env.d.ts",
		],
	},
	...nextCoreWebVitals,
	...nextTypescript,
	prettier,
];

export default eslintConfig;
