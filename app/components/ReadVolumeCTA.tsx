import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function ReadVolumeCTA() {
	const imgImage2 = '/images/article-placeholder.svg';

	return (
		<div className="w-full max-w-[1280px] px-4 sm:px-6 lg:px-24 pb-8">
			<div className="border border-[var(--color-tertiary)] p-2">
				<div className="bg-[var(--color-bg-secondary)] relative overflow-hidden">
					<div className="px-6 sm:px-10 lg:px-[64px] py-8 lg:py-[32px] lg:pr-[calc(64px+176px+64px)]">
						<div className="flex flex-col gap-6">
							<p
								className="text-[24px] font-semibold"
								style={{ fontFamily: 'var(--font-poppins)' }}
							>
								Read{' '}
								<span className="text-[var(--color-accent)]">
									Volume 6
								</span>
								.
							</p>
							<div className="flex flex-col gap-4">
								<p
									className="text-[16px] text-black leading-6"
									style={{
										fontFamily:
											'var(--font-source-serif-pro)',
									}}
								>
									On behalf of the <em>A Priori</em> editorial
									board, we&apos;re proud to be presenting the
									6th volume of <em>A Priori</em>, featuring
									ten exceptionally thoughtful philosophical
									papers from undergraduates across the world.
									We congratulate and thank the authors and
									our editorial staff who have made this
									volume possible.
								</p>
								<p
									className="text-[16px] text-black leading-6"
									style={{
										fontFamily:
											'var(--font-source-serif-pro)',
									}}
								>
									— The 6th Editorial Board of{' '}
									<em>A Priori</em>
								</p>
							</div>
							<Link
								href="/volumes/latest"
								className="group border border-[var(--color-accent)] px-6 lg:px-[32px] py-3 lg:py-[12px] flex items-center gap-2 hover:bg-[var(--color-accent)] transition-colors w-fit"
							>
								<span
									className="text-[16px] text-[var(--color-accent)] group-hover:text-white"
									style={{
										fontFamily: 'var(--font-poppins)',
									}}
								>
									Read now
								</span>
								<ChevronRight
									className="text-[var(--color-accent)] group-hover:text-white h-6"
									strokeWidth={1.5}
								/>
							</Link>
						</div>
					</div>
					<div className="hidden lg:block relative mx-auto mb-4 w-[140px] sm:w-[160px] aspect-[478/728] lg:absolute lg:mx-0 lg:mb-0 lg:right-[64px] lg:top-[16px] lg:bottom-[16px] lg:w-auto">
						<img
							alt="Volume 6 Cover"
							className="w-full h-full object-cover"
							src={imgImage2}
							onError={e => {
								e.currentTarget.src =
									"data:image/svg+xml,%3Csvg width='200' height='250' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='200' height='250' fill='%23e5e7eb'/%3E%3C/svg%3E";
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
