'use client';

import Nav from './components/Nav';
import Footer from './components/Footer';
import CallForSubmissions from './components/CallForSubmissions';
import ReadVolumeCTA from './components/ReadVolumeCTA';

// Image assets from public/images directory
const imgBanner1 = '/images/banner-placeholder.svg';

export default function Home() {
	return (
		<div className="bg-white min-h-screen w-full flex flex-col items-center">
			<Nav />

			{/* Call for Submissions Banner */}
			<CallForSubmissions />

			{/* Main Content Grid */}
			<div className="w-full max-w-[1280px] px-4 sm:px-6 lg:px-24 py-8">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* Featured Article - Full Width */}
					<div className="col-span-1 sm:col-span-2 lg:col-span-4 flex flex-col lg:flex-row gap-4 pb-8 border-b border-[var(--color-tertiary)]">
						<div className="flex-1 flex flex-col gap-2">
							<h2
								className="text-[24px] font-semibold text-black"
								style={{
									fontFamily: 'var(--font-source-serif-pro)',
								}}
							>
								Does the Same Theory of Welfare Apply to All
								Welfare Subjects?
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
								companies hundreds of subpoenas for information
								on accounts that track or comment on Immigration
								and Customs Enforcement, officials and tech
								workers said.
							</p>
						</div>
						<div className="w-full lg:w-[532px] flex flex-col gap-1">
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
								className="text-[10px] text-[var(--color-text-secondary)] text-right"
								style={{ fontFamily: 'var(--font-poppins)' }}
							>
								Image via The U.S. Department of State
							</p>
						</div>
					</div>

					{/* Article Cards Row 1 */}
					<ArticleCard />
					<ArticleCard />
					<div className="col-span-1 sm:col-span-2">
						<ArticleCard />
					</div>

					{/* Divider */}
					<div className="col-span-1 sm:col-span-2 lg:col-span-4 h-px bg-gray-300"></div>

					{/* Article Cards Row 2 */}
					<ArticleCard />
					<ArticleCard />
					<ArticleCard />
					<ArticleCard />
				</div>
			</div>

			{/* Read Volume 6 Section */}
			<ReadVolumeCTA />

			<Footer />
		</div>
	);
}

function ArticleCard() {
	return (
		<div className="flex flex-col gap-1">
			<h3
				className="text-[20px] font-semibold text-black"
				style={{ fontFamily: 'var(--font-source-serif-pro)' }}
			>
				Does the Same Theory of Welfare Apply to All Welfare Subjects?
			</h3>
			<p
				className="text-[14px] text-[var(--color-accent)] font-medium"
				style={{ fontFamily: 'var(--font-poppins)' }}
			>
				James Wolcott
			</p>
			<p
				className="text-[14px] text-[var(--color-text-secondary)] leading-6"
				style={{ fontFamily: 'var(--font-source-serif-pro)' }}
			>
				The department has sent Google, Meta and other companies
				hundreds of subpoenas for information on accounts that track or
				comment on Immigration and Customs Enforcement, officials and
				tech workers said.
			</p>
		</div>
	);
}
