'use client';

import { useState } from 'react';
import Link from 'next/link';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

// Image assets from public/images directory
const imgBanner1 = '/images/banner-placeholder.svg';

// Sample articles data
const articles = [
	{
		id: 1,
		title: 'Does the Same Theory of Welfare Apply to All Welfare Subjects?',
		author: 'James Wolcott',
		date: 'Feb 15, 2026',
		excerpt:
			'The department has sent Google, Meta and other companies hundreds of subpoenas for information on accounts that track or comment on Immigration and Customs Enforcement, officials and tech workers said.',
	},
	{
		id: 2,
		title: 'Neighbor Recalls Investigators Searching Home Next Door in Guthrie Disappearance',
		author: 'James Wolcott',
		date: 'Feb. 14, 2026',
		excerpt:
			'The department has sent Google, Meta and other companies hundreds of subpoenas for information on accounts that track or comment on Immigration and Customs Enforcement, officials and tech workers said.',
	},
	{
		id: 3,
		title: "Latest Updates: Authorities Execute Search Warrant Near Nancy Guthrie's Home, No One in Custody",
		author: 'James Wolcott',
		date: 'Feb. 13, 2026',
		excerpt:
			'The department has sent Google, Meta and other companies hundreds of subpoenas for information on accounts that track or comment on Immigration and Customs Enforcement, officials and tech workers said.',
	},
	{
		id: 4,
		title: 'ICE Tried to Justify a Minneapolis Shooting. Its Story Unraveled.',
		author: 'James Wolcott',
		date: 'Feb. 15, 2026',
		excerpt:
			'The department has sent Google, Meta and other companies hundreds of subpoenas for information on accounts that track or comment on Immigration and Customs Enforcement, officials and tech workers said.',
	},
];

export default function PapersPage() {
	const [searchQuery, setSearchQuery] = useState('');

	return (
		<div className="bg-white min-h-screen w-full flex flex-col items-center">
			<Nav />

			{/* Page Title */}
			<div className="w-full max-w-[1280px] px-24 py-4">
				<h1
					className="text-[32px] font-semibold text-black"
					style={{ fontFamily: 'var(--font-source-serif-pro)' }}
				>
					Papers
				</h1>
			</div>

			<div className="w-full max-w-[1280px] px-24">
				<div className="h-px bg-[var(--color-tertiary)]"></div>
			</div>

			{/* Featured Article */}
			<div className="w-full max-w-[1280px] px-24 py-8">
				<div className="flex gap-4">
					<div className="flex-1 flex flex-col gap-2">
						<h2
							className="text-[24px] font-semibold text-black"
							style={{
								fontFamily: 'var(--font-source-serif-pro)',
							}}
						>
							<Link href="/papers/does-the-same-theory-of-welfare-apply-to-all-welfare-subjects">
								Does the Same Theory of Welfare Apply to All
								Welfare Subjects?
							</Link>
						</h2>
						<p
							className="text-[16px] text-[var(--color-accent)] font-medium"
							style={{ fontFamily: 'var(--font-poppins)' }}
						>
							James Wolcott
						</p>
						<p
							className="text-[16px] text-[var(--color-text-secondary)] leading-6"
							style={{
								fontFamily: 'var(--font-source-serif-pro)',
							}}
						>
							The department has sent Google, Meta and other
							companies hundreds of subpoenas for information on
							accounts that track or comment on Immigration and
							Customs Enforcement, officials and tech workers
							said.
						</p>
					</div>
					<div className="w-[532px] flex flex-col gap-1">
						<div className="aspect-video w-full bg-gray-200 relative">
							<img
								alt="Featured article banner"
								className="w-full h-full object-cover"
								src={imgBanner1}
								onError={e => {
									e.currentTarget.src =
										"data:image/svg+xml,%3Csvg width='532' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='532' height='300' fill='%23e5e7eb'/%3E%3C/svg%3E";
								}}
							/>
						</div>
						<p
							className="text-[10px] text-[var(--color-text-secondary)] text-right leading-6"
							style={{ fontFamily: 'var(--font-poppins)' }}
						>
							Image via The U.S. Department of State
						</p>
					</div>
				</div>
			</div>

			{/* Filter and Search Bar */}
			<div className="w-full max-w-[1280px] px-24 pb-6">
				<div className="border border-[var(--color-tertiary)] grid grid-cols-[1fr_4fr]">
					<div className="border-r border-[var(--color-tertiary)] px-4 py-4 flex items-center justify-center">
						<button
							className="flex items-center gap-2.5 text-[16px] text-black font-medium"
							style={{ fontFamily: 'var(--font-poppins)' }}
						>
							Latest
							<svg
								width="12"
								height="6"
								viewBox="0 0 12 6"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M1 1L6 5L11 1"
									stroke="black"
									strokeWidth="1.5"
								/>
							</svg>
						</button>
					</div>
					<div className="px-4 py-4 flex items-center">
						<input
							type="text"
							placeholder="Search for an article..."
							value={searchQuery}
							onChange={e => setSearchQuery(e.target.value)}
							className="w-full text-[16px] text-[var(--color-text-secondary)] outline-none"
							style={{ fontFamily: 'var(--font-poppins)' }}
						/>
					</div>
				</div>
			</div>

			{/* Articles List */}
			<div className="w-full max-w-[1280px] px-24 pb-8">
				<div className="flex flex-col">
					{articles.map((article, index) => (
						<div key={article.id}>
							<div className="grid grid-cols-[1fr_4fr] gap-4">
								<p
									className="text-[14px] text-[var(--color-text-secondary)] leading-6"
									style={{
										fontFamily:
											'var(--font-source-serif-pro)',
									}}
								>
									{article.date}
								</p>
								<div className="flex flex-col gap-1">
									<h3
										className="text-[20px] font-semibold text-black"
										style={{
											fontFamily:
												'var(--font-source-serif-pro)',
										}}
									>
										<Link href="/papers/does-the-same-theory-of-welfare-apply-to-all-welfare-subjects">
											{article.title}
										</Link>
									</h3>
									<p
										className="text-[14px] text-[var(--color-accent)] font-medium"
										style={{
											fontFamily: 'var(--font-poppins)',
										}}
									>
										{article.author}
									</p>
									<p
										className="text-[14px] text-[var(--color-text-secondary)] leading-6"
										style={{
											fontFamily:
												'var(--font-source-serif-pro)',
										}}
									>
										{article.excerpt}
									</p>
								</div>
							</div>
							{index < articles.length - 1 && (
								<div className="h-px bg-[var(--color-tertiary)] my-6"></div>
							)}
						</div>
					))}
				</div>
			</div>

			<Footer />
		</div>
	);
}
