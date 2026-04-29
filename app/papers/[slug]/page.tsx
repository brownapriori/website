import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {client} from '@/sanity/lib/client';
import {
	articleBySlugQuery,
	buildCitationText,
	buildCitationHtml,
	extractFootnotes,
	extractHeadings,
	type ArticleDetail,
} from '@/sanity/queries/article';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import PaperDetailClient from './PaperDetailClient';
import {
	absoluteUrl,
	createPageMetadata,
	JsonLd,
	siteName,
	truncateDescription,
} from '../../seo';

type PaperDetailPageProps = {
	params: Promise<{slug: string}>;
};

export async function generateMetadata({
	params,
}: PaperDetailPageProps): Promise<Metadata> {
	const {slug} = await params;
	const article = await client.fetch<ArticleDetail | null>(articleBySlugQuery, {
		slug,
	});

	if (!article) {
		return createPageMetadata({
			title: 'Paper Not Found',
			description: 'The requested A Priori paper could not be found.',
			path: `/papers/${slug}`,
		});
	}

	const authors = article.authors.join(', ');
	const description = truncateDescription(
		article.abstract ||
			`Read "${article.title}" by ${authors} in ${siteName}.`,
	);

	return createPageMetadata({
		title: article.title,
		description,
		path: `/papers/${article.slug}`,
	});
}

export default async function PaperDetailPage({
	params,
}: PaperDetailPageProps) {
	const {slug} = await params;
	const article = await client.fetch<ArticleDetail | null>(articleBySlugQuery, {
		slug,
	});

	if (!article) {
		notFound();
	}

	const citationText = buildCitationText(article);
	const citationHtml = buildCitationHtml(article);
	const {footnotes} = extractFootnotes(article.content ?? []);
	const headings = extractHeadings(article.content ?? []);

	const tocItems = [
		{href: '#abstract', label: 'Abstract'},
		...headings.map(h => ({href: `#${h.id}`, label: h.text})),
		...(footnotes.length > 0 ? [{href: '#footnotes', label: 'Notes'}] : []),
	];
	const articleJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'ScholarlyArticle',
		headline: article.title,
		description: article.abstract,
		url: absoluteUrl(`/papers/${article.slug}`),
		author: article.authors.map(name => ({
			'@type': 'Person',
			name,
		})),
		isPartOf: article.volume
			? {
					'@type': 'PublicationVolume',
					name: `${siteName} Volume ${article.volume.number}`,
					volumeNumber: article.volume.number,
					datePublished: String(article.volume.year),
					isPartOf: {
						'@type': 'Periodical',
						name: siteName,
						url: absoluteUrl('/'),
					},
				}
			: {
					'@type': 'Periodical',
					name: siteName,
					url: absoluteUrl('/'),
				},
		pagination: article.pageRange
			? `${article.pageRange.start}-${article.pageRange.end}`
			: undefined,
		encoding: article.pdfUrl
			? {
					'@type': 'MediaObject',
					contentUrl: article.pdfUrl,
					encodingFormat: 'application/pdf',
				}
			: undefined,
		publisher: {
			'@type': 'Organization',
			name: siteName,
			url: absoluteUrl('/'),
		},
	};

	return (
		<div className="bg-white min-h-screen w-full flex flex-col items-center">
			<JsonLd data={articleJsonLd} />
			<Nav
				variant="paper"
				paperTitle={article.title}
				paperAuthor={article.authors.join(', ')}
			/>
			<PaperDetailClient
				article={article}
				volume={article.volume}
				footnotes={footnotes}
				tocItems={tocItems}
				citationText={citationText}
				citationHtml={citationHtml}
			/>
			<Footer />
		</div>
	);
}
