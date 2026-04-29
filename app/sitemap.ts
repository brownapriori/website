import type {MetadataRoute} from 'next';
import {client} from '@/sanity/lib/client';
import {
	allArticleSitemapItemsQuery,
	type ArticleSitemapItem,
} from '@/sanity/queries/article';
import {allVolumesQuery, type VolumeListItem} from '@/sanity/queries/volume';
import {absoluteUrl} from './seo';

const staticRoutes = [
	'/',
	'/about',
	'/papers',
	'/volumes',
	'/staff',
	'/submission',
	'/contact',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const [articles, volumes] = await Promise.all([
		client.fetch<ArticleSitemapItem[]>(allArticleSitemapItemsQuery),
		client.fetch<VolumeListItem[]>(allVolumesQuery),
	]);

	const now = new Date();
	const staticEntries = staticRoutes.map(path => ({
		url: absoluteUrl(path),
		lastModified: now,
		changeFrequency: 'monthly' as const,
		priority: path === '/' ? 1 : 0.7,
	}));

	const articleEntries = articles.map(article => ({
		url: absoluteUrl(`/papers/${article.slug}`),
		lastModified: new Date(article._updatedAt),
		changeFrequency: 'monthly' as const,
		priority: 0.8,
	}));

	const volumeEntries = volumes.map(volume => ({
		url: absoluteUrl(`/volumes/${volume.number}`),
		lastModified: new Date(volume._updatedAt),
		changeFrequency: 'monthly' as const,
		priority: 0.8,
	}));

	return [...staticEntries, ...volumeEntries, ...articleEntries];
}
