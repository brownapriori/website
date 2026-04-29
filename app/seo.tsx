import type {Metadata} from 'next';
import type {ReactElement} from 'react';

export const siteUrl = 'https://brownapriori.org';
export const siteName = 'A Priori';
export const siteDescription =
	"Brown University's undergraduate journal of philosophy.";
export const logoUrl = '/a-priori-logo.svg';
export const faviconUrl = '/favicon.svg';
export const contactEmail = 'a-priori@brown.edu';

type PageMetadataInput = {
	title: string;
	description: string;
	path: string;
};

export function absoluteUrl(path: string): string {
	return new URL(path, siteUrl).toString();
}

export function truncateDescription(text: string, maxLength = 160): string {
	const normalized = text.replace(/\s+/g, ' ').trim();
	if (normalized.length <= maxLength) return normalized;
	return `${normalized.slice(0, maxLength - 3).trimEnd()}...`;
}

export function createPageMetadata({
	title,
	description,
	path,
}: PageMetadataInput): Metadata {
	return {
		title,
		description,
		alternates: {
			canonical: path,
		},
		openGraph: {
			type: 'website',
			url: path,
			siteName,
			title: `${title} | ${siteName}`,
			description,
			images: [
				{
					url: logoUrl,
					alt: 'A Priori logo',
				},
			],
		},
		twitter: {
			card: 'summary',
			title: `${title} | ${siteName}`,
			description,
			images: [logoUrl],
		},
	};
}

export function JsonLd({data}: {data: Record<string, unknown>}): ReactElement {
	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{__html: JSON.stringify(data)}}
		/>
	);
}
