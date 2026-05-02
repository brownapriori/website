import { Fragment } from 'react';
import Link from 'next/link';
import Nav from './components/Nav';
import Footer from './components/Footer';
import CallForSubmissions from './components/CallForSubmissions';
import ReadVolumeCTA from './components/ReadVolumeCTA';
import { client } from '@/sanity/lib/client';
import { settingsQuery, type SiteSettings, type FeaturedArticle } from '@/sanity/queries/settings';
import { formatAuthors } from '@/sanity/queries/article';

function truncate(text: string, maxChars: number): string {
	if (text.length <= maxChars) return text;
	const cut = text.slice(0, maxChars);
	const lastSpace = cut.lastIndexOf(' ');
	return cut.slice(0, lastSpace > 0 ? lastSpace : maxChars).trimEnd() + '…';
}

export default async function Home() {
	const settings: SiteSettings | null = await client.fetch(settingsQuery);

	const submissionsBannerActive = settings?.submissionsOpen === 'yes';
	const submissionsVolumeNumber = settings?.submissionsVolumeNumber ?? null;
	const featuredArticles = settings?.featuredArticles ?? [];
	const cta = settings?.readVolumeCTA ?? null;
	const ctaPosition = cta?.position ?? 'belowFeatured';

	const readVolumeCTA = cta && (
		<ReadVolumeCTA
			volumeNumber={cta.volumeNumber}
			title={cta.title}
			contents={cta.contents}
			coverImageUrl={cta.coverImageUrl}
			coverImageAlt={cta.coverImageAlt}
		/>
	);

	return (
		<div className="bg-white min-h-screen w-full flex flex-col items-center">
			<Nav />

			{ctaPosition === 'belowNav' && readVolumeCTA}

			<CallForSubmissions
				active={submissionsBannerActive}
				volumeNumber={submissionsVolumeNumber}
			/>

			<div className="w-full max-w-[1280px] px-4 sm:px-6 lg:px-24 pt-2 pb-8">
				{featuredArticles.length > 0 ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
						<FeaturedArticleSection article={featuredArticles[0]} />
						{featuredArticles.slice(1).map((article, i, arr) => {
							const isWide = i === 2;
							return (
								<Fragment key={article._id}>
									{i === 3 && (
										<div className="hidden sm:block col-span-1 sm:col-span-2 lg:col-span-4 h-px bg-[var(--color-tertiary)]" />
									)}
									<div className={isWide ? 'col-span-1 sm:col-span-2' : ''}>
										<ArticleCard
											article={article}
											mobileDivider={i < arr.length - 1}
											maxChars={isWide ? 600 : 300}
										/>
									</div>
								</Fragment>
							);
						})}
					</div>
				) : null}
			</div>

			{ctaPosition === 'belowFeatured' && readVolumeCTA}

			<Footer />
		</div>
	);
}

function FeaturedArticleSection({ article }: { article: FeaturedArticle }) {
	return (
		<Link href={`/papers/${article.slug}`} className="group col-span-1 sm:col-span-2 lg:col-span-4 flex flex-col lg:flex-row gap-4 pb-8 border-b border-[var(--color-tertiary)]">
			<div className="flex-1 flex flex-col gap-2">
				<h2
					className="text-[24px] font-semibold text-black group-hover:text-[var(--color-text-secondary)] transition-colors"
					style={{ fontFamily: 'var(--font-source-serif-pro)' }}
				>
					{article.title}
				</h2>
				<p
					className="text-[16px] text-[var(--color-accent)] font-medium"
					style={{ fontFamily: 'var(--font-poppins)' }}
				>
					{formatAuthors(article.authors)}
				</p>
				<p
					className="text-[16px] text-[var(--color-text-secondary)] leading-6"
					style={{ fontFamily: 'var(--font-source-serif-pro)' }}
				>
					{truncate(article.abstract, 300)}
				</p>
			</div>
			{article.coverImageUrl && (
				<div className="w-full lg:w-[532px] shrink-0 flex flex-col gap-1">
					<div className="aspect-video w-full bg-gray-200">
						<img
							src={article.coverImageUrl}
							alt={article.title}
							className="w-full h-full object-cover"
						/>
					</div>
					{article.coverImageCaption && (
						<p
							className="text-[10px] text-[var(--color-text-secondary)] text-right"
							style={{ fontFamily: 'var(--font-poppins)' }}
						>
							Image via {article.coverImageCaption}
						</p>
					)}
				</div>
			)}
		</Link>
	);
}

function ArticleCard({
	article,
	mobileDivider = false,
	maxChars = 300,
}: {
	article: FeaturedArticle;
	mobileDivider?: boolean;
	maxChars?: number;
}) {
	return (
		<Link
			href={`/papers/${article.slug}`}
			className={`group flex flex-col gap-1 ${
				mobileDivider
					? 'border-b border-[var(--color-tertiary)] pb-6 sm:border-b-0 sm:pb-0'
					: ''
			}`}
		>
			<h3
				className="text-[20px] font-semibold text-black group-hover:text-[var(--color-text-secondary)] transition-colors"
				style={{ fontFamily: 'var(--font-source-serif-pro)' }}
			>
				{article.title}
			</h3>
			<p
				className="text-[14px] text-[var(--color-accent)] font-medium"
				style={{ fontFamily: 'var(--font-poppins)' }}
			>
				{formatAuthors(article.authors)}
			</p>
			<p
				className="text-[14px] text-[var(--color-text-secondary)] leading-6"
				style={{ fontFamily: 'var(--font-source-serif-pro)' }}
			>
				{truncate(article.abstract, maxChars)}
			</p>
		</Link>
	);
}
