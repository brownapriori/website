import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { IBM_Plex_Serif, Poppins } from 'next/font/google';
import './globals.css';

const ibmPlexSerif = IBM_Plex_Serif({
	variable: '--font-source-serif-pro',
	subsets: ['latin'],
	weight: ['400', '600'],
	style: ['normal', 'italic'],
});

const poppins = Poppins({
	variable: '--font-poppins',
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
	title: 'A Priori - Undergraduate Journal of Philosophy',
	description: "Brown University's undergraduate journal of philosophy",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link
					rel="stylesheet"
					href="https://use.typekit.net/swz0xig.css"
				/>
				<link
					rel="preload"
					href="/images/a-priori-logo.svg"
					as="image"
					type="image/svg+xml"
				/>
				<link
					rel="preload"
					href="/images/brown-logo.svg"
					as="image"
					type="image/svg+xml"
				/>
			</head>
			<body
				className={`${ibmPlexSerif.variable} ${poppins.variable} antialiased`}
			>
				{children}
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
