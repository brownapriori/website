import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import {client} from '@/sanity/lib/client';
import {
	allVolumesQuery,
	volumeByNumberQuery,
	type Volume,
	type VolumeListItem,
} from '@/sanity/queries/volume';
import LatestVolumeClient from '../latest/LatestVolumeClient';
import {absoluteUrl, createBreadcrumbJsonLd, createPageMetadata, JsonLd, siteName} from '../../seo';

type VolumePageProps = {
	params: Promise<{number: string}>;
};

export async function generateMetadata({
	params,
}: VolumePageProps): Promise<Metadata> {
	const {number} = await params;
	const volumeNumber = Number(number);

	if (!Number.isInteger(volumeNumber) || volumeNumber < 1) {
		return createPageMetadata({
			title: 'Volume Not Found',
			description: 'The requested A Priori volume could not be found.',
			path: `/volumes/${number}`,
		});
	}

	const volume = await client.fetch<Volume | null>(volumeByNumberQuery, {
		number: volumeNumber,
	});

	if (!volume) {
		return createPageMetadata({
			title: 'Volume Not Found',
			description: 'The requested A Priori volume could not be found.',
			path: `/volumes/${number}`,
		});
	}

	return createPageMetadata({
		title: `Volume ${volume.number}`,
		description: `Read Volume ${volume.number} (${volume.year}) of A Priori, Brown University undergraduate journal of philosophy.`,
		path: `/volumes/${volume.number}`,
	});
}

export default async function VolumePage({
	params,
}: VolumePageProps) {
	const {number} = await params;
	const volumeNumber = Number(number);

	if (!Number.isInteger(volumeNumber) || volumeNumber < 1) {
		notFound();
	}

	const [volume, volumes] = await Promise.all([
		client.fetch<Volume | null>(volumeByNumberQuery, {
			number: volumeNumber,
		}),
		client.fetch<VolumeListItem[]>(allVolumesQuery),
	]);

	if (!volume) {
		notFound();
	}

	const volumeNumbers = volumes.map(item => item.number);
	const previousNumbers = volumeNumbers.filter(item => item < volume.number);
	const nextNumbers = volumeNumbers.filter(item => item > volume.number);
	const previousNumber =
		previousNumbers.length > 0 ? Math.max(...previousNumbers) : null;
	const nextNumber = nextNumbers.length > 0 ? Math.min(...nextNumbers) : null;
	const volumeJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'PublicationVolume',
		name: `${siteName} Volume ${volume.number}`,
		url: absoluteUrl(`/volumes/${volume.number}`),
		volumeNumber: volume.number,
		datePublished: String(volume.year),
		isPartOf: {
			'@type': 'Periodical',
			name: siteName,
			url: absoluteUrl('/'),
		},
		hasPart: volume.articles.map(article => ({
			'@type': 'ScholarlyArticle',
			headline: article.title,
			url: article.slug
				? absoluteUrl(`/papers/${article.slug}`)
				: absoluteUrl(`/volumes/${volume.number}`),
			author: article.authors.map(name => ({
				'@type': 'Person',
				name,
			})),
			pagination: article.pageRange
				? `${article.pageRange.start}-${article.pageRange.end}`
				: undefined,
		})),
		encoding: volume.pdfUrl
			? {
					'@type': 'MediaObject',
					contentUrl: volume.pdfUrl,
					encodingFormat: 'application/pdf',
				}
			: undefined,
	};

	const breadcrumbJsonLd = createBreadcrumbJsonLd([
		{name: 'Home', url: absoluteUrl('/')},
		{name: 'Volumes', url: absoluteUrl('/volumes')},
		{name: `Volume ${volume.number}`, url: absoluteUrl(`/volumes/${volume.number}`)},
	]);

	return (
		<div className="bg-white min-h-screen w-full flex flex-col items-center">
			<JsonLd data={volumeJsonLd} />
			<JsonLd data={breadcrumbJsonLd} />
			<Nav />
			<LatestVolumeClient
				volume={volume}
				navigation={{previousNumber, nextNumber}}
			/>
			<Footer />
		</div>
	);
}
