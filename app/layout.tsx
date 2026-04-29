import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { IBM_Plex_Serif, Poppins } from 'next/font/google';
import {
	absoluteUrl,
	contactEmail,
	faviconUrl,
	JsonLd,
	logoUrl,
	siteDescription,
	siteName,
	siteUrl,
} from './seo';
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
	metadataBase: new URL(siteUrl),
	applicationName: siteName,
	title: {
		default: `${siteName} | Undergraduate Journal of Philosophy`,
		template: `%s | ${siteName}`,
	},
	description: siteDescription,
	keywords: [
		'A Priori',
		'Brown University',
		'undergraduate philosophy',
		'philosophy journal',
		'student research',
		'academic philosophy',
	],
	authors: [{ name: 'A Priori' }],
	creator: 'A Priori',
	publisher: 'A Priori, Brown University',
	alternates: {
		canonical: '/',
	},
	openGraph: {
		type: 'website',
		url: '/',
		siteName,
		title: `${siteName} | Undergraduate Journal of Philosophy`,
		description: siteDescription,
		images: [
			{
				url: logoUrl,
				alt: 'A Priori logo',
			},
		],
	},
	twitter: {
		card: 'summary',
		title: `${siteName} | Undergraduate Journal of Philosophy`,
		description: siteDescription,
		images: [logoUrl],
	},
	icons: {
		icon: [
			{
				url: faviconUrl,
				type: 'image/svg+xml',
			},
		],
		shortcut: [faviconUrl],
		apple: [
			{
				url: faviconUrl,
				type: 'image/svg+xml',
			},
		],
	},
};

const organizationJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Organization',
	name: siteName,
	url: siteUrl,
	logo: absoluteUrl(logoUrl),
	email: contactEmail,
	parentOrganization: {
		'@type': 'CollegeOrUniversity',
		name: 'Brown University',
		url: 'https://www.brown.edu/',
	},
	sameAs: ['https://www.instagram.com/brownapriori/'],
};

const periodicalJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Periodical',
	name: siteName,
	alternateName: 'A Priori: Brown University Undergraduate Journal of Philosophy',
	url: siteUrl,
	description: siteDescription,
	publisher: organizationJsonLd,
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
					href={logoUrl}
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
				<JsonLd data={organizationJsonLd} />
				<JsonLd data={periodicalJsonLd} />
				{children}
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
