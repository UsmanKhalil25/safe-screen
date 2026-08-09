import type * as React from "react";

export function DropboxIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<title>Dropbox</title>
			<rect width="24" height="24" rx="5" fill="#0061FF" />
			<g transform="translate(3.6,3.6) scale(0.7)" fill="#fff">
				<path d="M6 1.807L0 5.629l6 3.822 6.001-3.822L6 1.807zM18 1.807l-6 3.822 6 3.822 6-3.822-6-3.822zM0 13.274l6 3.822 6.001-3.822L6 9.452l-6 3.822zM18 9.452l-6 3.822 6 3.822 6-3.822-6-3.822zM6 18.371l6.001 3.822 6-3.822-6-3.822L6 18.371z" />
			</g>
		</svg>
	);
}
