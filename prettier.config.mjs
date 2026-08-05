/** @type {import("prettier").Config} */
const config = {
	useTabs: true,
	plugins: [
		"@ianvs/prettier-plugin-sort-imports",
		"prettier-plugin-tailwindcss",
	],
	tailwindStylesheet: "./src/app/globals.css",
	importOrder: [
		"<BUILTIN_MODULES>",
		"",
		"<THIRD_PARTY_MODULES>",
		"",
		"^@/(.*)$",
		"",
		"^[.]",
	],
	importOrderTypeScriptVersion: "5.7.4",
};

export default config;
