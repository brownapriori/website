'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

// Image assets from public/images directory
const imgImage1 = '/images/temp-logo.svg';
const imgBrownLogo = '/images/brown-logo.svg';

interface NavProps {
	variant?: 'default' | 'paper';
	paperTitle?: string;
	paperAuthor?: string;
}

const navLinks = [
	{ href: '/volumes', label: 'VOLUMES' },
	{ href: '/papers', label: 'PAPERS' },
	{ href: '/about', label: 'ABOUT' },
	{ href: '/staff', label: 'STAFF' },
	{ href: '/submission', label: 'SUBMISSION' },
	{ href: '/contact', label: 'CONTACT' },
] as const;

function PrimaryLinks() {
	return (
		<div
			className="flex gap-6 md:gap-10 lg:gap-16 items-center md:justify-center text-[var(--color-text-secondary)] text-[14px] md:text-[16px] text-center font-medium overflow-x-auto whitespace-nowrap"
			style={{ fontFamily: 'var(--font-poppins)' }}
		>
			{navLinks.map(link => (
				<Link
					key={link.href}
					href={link.href}
					className="hover:text-black transition-colors"
				>
					{link.label}
				</Link>
			))}
		</div>
	);
}

export default function Nav({
	variant = 'default',
	paperTitle,
	paperAuthor,
}: NavProps) {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		if (variant === 'paper') {
			// Paper variant still uses scroll state, but this keeps dependency explicit.
		}

		const handleScroll = () => {
			// Switch to compact nav when scrolled past the main header (approximately 132px)
			setIsScrolled(window.scrollY > 132);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [variant]);

	return (
		<>
			{/* Main Header - Hidden when scrolled */}
			<nav
				className={`bg-white w-full max-w-[1280px] flex flex-col transition-all duration-300 ${
					isScrolled
						? '-translate-y-4 opacity-0 pointer-events-none'
						: 'translate-y-0 opacity-100'
				}`}
			>
				<div className="flex items-center justify-between px-4 sm:px-6 lg:px-24 py-8">
					{/* Logo Section */}
					<Link
						href="/"
						className="flex gap-4 items-center hover:opacity-80 transition-opacity"
					>
						<div className="relative w-16 h-16">
							<img
								alt="A Priori Logo"
								className="w-full h-full object-cover grayscale"
								src={imgImage1}
								onError={e => {
									e.currentTarget.src =
										"data:image/svg+xml,%3Csvg width='64' height='64' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='64' height='64' fill='%23ddd'/%3E%3C/svg%3E";
								}}
							/>
						</div>
						<div className="flex flex-col justify-center h-[45px]">
							<p
								className="font-semibold text-[20px] text-black text-left"
								style={{
									fontFamily: 'var(--font-source-serif-pro)',
								}}
							>
								A PRIORI
							</p>
							<p
								className="text-[16px] text-black"
								style={{
									fontFamily: 'var(--font-source-serif-pro)',
								}}
							>
								Undergraduate Journal of Philosophy
							</p>
						</div>
					</Link>

					{/* Brown Logo Section */}
					<div className="hidden md:flex gap-4 items-center">
						<a
							href="https://brown.edu/"
							target="_blank"
							rel="noopener noreferrer"
							className="relative w-[97px] h-[48px] hover:opacity-80 transition-opacity"
						>
							<img
								alt="Brown University Logo"
								className="w-full h-full object-cover"
								src={imgBrownLogo}
								onError={e => {
									e.currentTarget.src =
										"data:image/svg+xml,%3Csvg width='97' height='48' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='97' height='48' fill='%23ddd'/%3E%3C/svg%3E";
								}}
							/>
						</a>
						<div className="h-9 w-px bg-[var(--color-tertiary)]"></div>
						<a
							href="https://philosophy.brown.edu/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-[16px] text-black text-center font-medium hover:opacity-80 transition-opacity"
							style={{ fontFamily: 'var(--font-poppins)' }}
						>
							Philosophy
						</a>
					</div>
				</div>

				{/* Navigation Links - Default State */}
				<div className="relative px-4 sm:px-6 lg:px-24">
					{/* Double line border effect - constrained to content width */}
					<div className="absolute left-4 right-4 sm:left-6 sm:right-6 lg:left-24 lg:right-24 top-0 h-px bg-black"></div>
					<div className="absolute left-4 right-4 sm:left-6 sm:right-6 lg:left-24 lg:right-24 top-1 h-px bg-black"></div>
					<div className="py-4 mt-1">
						<PrimaryLinks />
					</div>
				</div>
			</nav>

			{/* Compact Scrolled Header - Fixed position, always outside document flow */}
			<nav
				className={`bg-white w-full shadow-[0px_0px_8px_0px_rgba(0,0,0,0.25)] fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
					isScrolled
						? 'translate-y-0 opacity-100'
						: '-translate-y-full opacity-0 pointer-events-none'
				}`}
			>
				<div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-24">
					<div className="grid grid-cols-[auto_1fr_auto] items-center py-3 sm:py-4 gap-4">
						{/* Small Logo */}
						<Link
							href="/"
							className="w-8 h-8 hover:opacity-80 transition-opacity"
						>
							<img
								alt="A Priori Logo"
								className="w-full h-full object-cover grayscale"
								src={imgImage1}
								onError={e => {
									e.currentTarget.src =
										"data:image/svg+xml,%3Csvg width='32' height='32' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='32' height='32' fill='%23ddd'/%3E%3C/svg%3E";
								}}
							/>
						</Link>

						{variant === 'paper' ? (
							<button
								type="button"
								onClick={() =>
									window.scrollTo({
										top: 0,
										behavior: 'smooth',
									})
								}
								aria-label="Scroll to top"
								className="flex items-center justify-center gap-3 min-w-0 hover:opacity-80 transition-opacity"
							>
								<p
									className="text-[14px] sm:text-[16px] font-semibold text-black text-center truncate"
									style={{
										fontFamily:
											'var(--font-source-serif-pro)',
									}}
								>
									{paperTitle}
								</p>
								<div className="hidden sm:block h-4 w-px bg-[var(--color-tertiary)]"></div>
								<p
									className="hidden sm:block text-[14px] text-[var(--color-text-secondary)] truncate"
									style={{ fontFamily: 'var(--font-poppins)' }}
								>
									{paperAuthor}
								</p>
							</button>
						) : (
							<PrimaryLinks />
						)}

						{/* Empty space for grid balance */}
						<div className="w-8"></div>
					</div>
				</div>
			</nav>
		</>
	);
}
