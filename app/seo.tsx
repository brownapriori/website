import type {Metadata} from 'next';
import type {ReactElement} from 'react';

export const siteUrl = 'https://brownapriori.org';
export const siteName = 'A Priori';
export const siteDescription =
	"A Priori is Brown University's undergraduate journal of philosophy, publishing original student research across all areas of philosophical inquiry.";
export const logoUrl = '/a-priori-logo.svg';
export const faviconUrl = '/favicon.svg';
export const sitePublisher = 'Department of Philosophy, Brown University';
export const contactEmail = 'a-priori@brown.edu';

type PageMetadataInput = {
	title: string;
	description: string;
	path: string;
	image?: string;
	imageAlt?: string;
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
	image,
	imageAlt,
}: PageMetadataInput): Metadata {
	const canonicalUrl = absoluteUrl(path);
	const ogImage = image
		? {url: image, alt: imageAlt ?? title}
		: {url: absoluteUrl(logoUrl), alt: 'A Priori logo'};

	return {
		title,
		description,
		alternates: {
			canonical: canonicalUrl,
		},
		openGraph: {
			type: 'website',
			url: canonicalUrl,
			siteName,
			title: `${title} | ${siteName}`,
			description,
			images: [ogImage],
		},
		twitter: {
			card: image ? 'summary_large_image' : 'summary',
			title: `${title} | ${siteName}`,
			description,
			images: [ogImage.url],
		},
	};
}

export function createBreadcrumbJsonLd(
	items: Array<{name: string; url: string}>,
) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: item.url,
		})),
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
