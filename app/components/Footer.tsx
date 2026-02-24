'use client';

import Link from 'next/link';

// Image assets from public/images directory
const imgImage1 = '/images/a-priori-logo.svg';
const imgBrownLogo = '/images/brown-logo.svg';

export default function Footer() {
	return (
		<footer className="w-full max-w-[1280px] px-24 pb-8">
			<div className="relative pt-8">
				{/* Double line border effect */}
				<div className="absolute left-0 right-0 top-0 h-px bg-black"></div>
				<div className="absolute left-0 right-0 top-1 h-px bg-black"></div>
				<div className="flex gap-32">
					<div>
						<h3
							className="font-semibold text-[var(--color-accent)] mb-2 text-[14px]"
							style={{
								fontFamily: 'var(--font-poppins)',
							}}
						>
							ABOUT
						</h3>
						<div
							className="flex flex-col gap-1 text-black text-[14px]"
							style={{
								fontFamily: 'var(--font-source-serif-pro)',
							}}
						>
							<a href="/about" className="hover:underline">
								About <em>A Priori</em>
							</a>
							<a
								href="/about#editorial-process"
								className="hover:underline"
							>
								Editorial Process
							</a>
							<a href="/staff" className="hover:underline">
								Staff
							</a>
							<a href="/contact" className="hover:underline">
								Contact Us
							</a>
						</div>
					</div>
					<div>
						<h3
							className="font-semibold text-[var(--color-accent)] mb-2 text-[14px]"
							style={{
								fontFamily: 'var(--font-poppins)',
							}}
						>
							PUBLICATIONS
						</h3>
						<div
							className="flex flex-col gap-1 text-black text-[14px]"
							style={{
								fontFamily: 'var(--font-source-serif-pro)',
							}}
						>
							<a
								href="/volumes/latest"
								className="hover:underline"
							>
								Latest Volume
							</a>
							<a href="/volumes" className="hover:underline">
								All Volumes
							</a>
							<a href="/papers" className="hover:underline">
								Papers
							</a>
						</div>
					</div>
					<div>
						<h3
							className="font-semibold text-[var(--color-accent)] mb-2 text-[14px]"
							style={{
								fontFamily: 'var(--font-poppins)',
							}}
						>
							SUBMISSION
						</h3>
						<div
							className="flex flex-col gap-1 text-black text-[14px]"
							style={{
								fontFamily: 'var(--font-source-serif-pro)',
							}}
						>
							<a href="/submission" className="hover:underline">
								Submit to Annual Volume
							</a>
							<a
								href="/submission#digital"
								className="hover:underline"
							>
								Contribute Digital Paper
							</a>
							<a
								href="/submission#process"
								className="hover:underline"
							>
								Submission Process
							</a>
						</div>
					</div>
				</div>

				<div className="h-px bg-[var(--color-tertiary)] my-8"></div>

				<div className="flex items-center justify-between">
					<Link
						href="/"
						className="flex gap-2 items-center hover:opacity-80 transition-opacity"
					>
						<div className="relative w-8 h-8">
							<img
								alt="A Priori Logo"
								className="w-full h-full object-cover grayscale"
								src={imgImage1}
								onError={e => {
									e.currentTarget.src =
										"data:image/svg+xml,%3Csvg width='32' height='32' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='32' height='32' fill='%23ddd'/%3E%3C/svg%3E";
								}}
							/>
						</div>
						<div className="flex flex-col justify-center">
							<p
								className="font-semibold text-[16px] text-black"
								style={{
									fontFamily: 'var(--font-source-serif-pro)',
								}}
							>
								A PRIORI
							</p>
							<p
								className="text-[12px] text-black"
								style={{
									fontFamily: 'var(--font-source-serif-pro)',
								}}
							>
								Undergraduate Journal of Philosophy
							</p>
						</div>
					</Link>
					<div className="flex gap-4 items-center">
						<a
							href="https://brown.edu/"
							target="_blank"
							rel="noopener noreferrer"
							className="relative w-[65px] h-8 hover:opacity-80 transition-opacity"
						>
							<img
								alt="Brown University Logo"
								className="w-full h-full object-cover"
								src={imgBrownLogo}
								onError={e => {
									e.currentTarget.src =
										"data:image/svg+xml,%3Csvg width='65' height='32' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='65' height='32' fill='%23ddd'/%3E%3C/svg%3E";
								}}
							/>
						</a>
						<div className="h-6 w-px bg-[var(--color-tertiary)]"></div>
						<a
							href="https://philosophy.brown.edu/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-[12px] text-black font-medium hover:opacity-80 transition-opacity"
							style={{ fontFamily: 'var(--font-poppins)' }}
						>
							Philosophy
						</a>
					</div>
				</div>

				<p
					className="text-[12px] text-[var(--color-text-secondary)] mt-4"
					style={{ fontFamily: 'var(--font-source-serif-pro)' }}
				>
					© 2026 A Priori, Brown University Undergraduate Journal of
					Philosophy
				</p>
			</div>
		</footer>
	);
}
