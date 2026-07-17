'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

// Image assets from public/images directory
const imgImage1 = '/a-priori-logo.svg';
const imgBrownLogo = '/images/brown-logo.svg';

interface NavProps {
	variant?: 'default' | 'paper';
	paperTitle?: string;
	paperAuthor?: string;
}

const navLinks = [
	{ href: '/volumes', label: 'VOLUMES' },
	// { href: '/papers', label: 'PAPERS' },
	{ href: '/about', label: 'ABOUT' },
	{ href: '/staff', label: 'STAFF' },
	{ href: '/submission', label: 'SUBMISSION' },
	{ href: '/contact', label: 'CONTACT' },
] as const;

function PrimaryLinks() {
	return (
		<div
			className="hidden md:flex gap-10 lg:gap-16 items-center justify-center text-[var(--color-text-secondary)] text-[16px] text-center font-medium whitespace-nowrap"
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

function MobileBrand() {
	return (
		<Link href="/" className="flex min-w-0 items-center justify-center gap-2 hover:opacity-80 transition-opacity">
			<img alt="" className="h-8 w-8 shrink-0 object-cover grayscale" src={imgImage1} />
			<span
				className="truncate text-[17px] font-semibold text-black"
				style={{ fontFamily: 'var(--font-source-serif-pro)' }}
			>
				A PRIORI
			</span>
		</Link>
	);
}

function MobileMenu({ id, open, onClose }: { id: string; open: boolean; onClose: () => void }) {
	return (
		<div
			id={id}
			role="dialog"
			aria-modal="true"
			aria-hidden={!open}
			aria-label="Navigation menu"
			inert={!open}
			className={`fixed inset-0 z-[60] flex flex-col bg-white transition-transform duration-300 ease-out md:hidden ${
				open ? 'translate-x-0' : 'pointer-events-none -translate-x-full'
			}`}
		>
			<div className="flex h-14 shrink-0 items-center px-3">
				<button
					type="button"
					onClick={onClose}
					aria-label="Close navigation menu"
					className="flex h-10 w-10 items-center justify-center text-[var(--color-text-secondary)] hover:text-black"
				>
					<X aria-hidden="true" className="h-6 w-6" strokeWidth={1.75} />
				</button>
			</div>
			<div className="grid grid-cols-1 py-6" style={{ fontFamily: 'var(--font-poppins)' }}>
				{navLinks.map(link => (
					<Link
						key={link.href}
						href={link.href}
						onClick={onClose}
						className="border-b border-[var(--color-tertiary)] px-8 py-5 text-[17px] font-medium text-[var(--color-text-secondary)] last:border-b-0 hover:text-black"
					>
						{link.label}
					</Link>
				))}
			</div>
			<div className="mt-auto flex items-center justify-center gap-4 px-8 py-6">
				<a
					href="https://brown.edu/"
					target="_blank"
					rel="noopener noreferrer"
					className="h-12 w-[97px] hover:opacity-80 transition-opacity"
				>
					<img
						alt="Brown University Logo"
						className="h-full w-full object-cover"
						src={imgBrownLogo}
					/>
				</a>
				<div className="h-9 w-px bg-[var(--color-tertiary)]" />
				<a
					href="https://philosophy.brown.edu/"
					target="_blank"
					rel="noopener noreferrer"
					className="text-[16px] font-medium text-black hover:opacity-80 transition-opacity"
					style={{ fontFamily: 'var(--font-poppins)' }}
				>
					Philosophy
				</a>
			</div>
		</div>
	);
}

function MobileHeader({
	menuId,
	menuOpen,
	onToggle,
}: {
	menuId: string;
	menuOpen: boolean;
	onToggle: () => void;
}) {
	return (
		<div className="grid h-14 grid-cols-[40px_1fr_40px] items-center px-3 md:hidden">
			<button
				type="button"
				onClick={onToggle}
				aria-label="Open navigation menu"
				aria-expanded={menuOpen}
				aria-controls={menuId}
				className="flex h-10 w-10 items-center justify-center text-[var(--color-text-secondary)] hover:text-black"
			>
				<Menu aria-hidden="true" className="h-6 w-6" strokeWidth={1.75} />
			</button>
			<MobileBrand />
			<div aria-hidden="true" className="h-10 w-10" />
		</div>
	);
}

export default function Nav({
	variant = 'default',
	paperTitle,
	paperAuthor,
}: NavProps) {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		if (variant === 'paper') {
			// Paper variant still uses scroll state, but this keeps dependency explicit.
		}

		const handleScroll = () => {
			const headerHeight = window.innerWidth < 768 ? 56 : 132;
			setIsScrolled(window.scrollY > headerHeight);
			setIsMenuOpen(false);
		};

		handleScroll();
		window.addEventListener('scroll', handleScroll);
		window.addEventListener('resize', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleScroll);
		};
	}, [variant]);

	useEffect(() => {
		if (!isMenuOpen) return;

		const previousOverflow = document.body.style.overflow;
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setIsMenuOpen(false);
		};

		document.body.style.overflow = 'hidden';
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [isMenuOpen]);

	return (
		<>
			{/* Main Header - Hidden when scrolled */}
			<nav
				className={`relative bg-white w-full max-w-[1280px] flex flex-col transition-all duration-300 ${
					isScrolled
						? '-translate-y-4 opacity-0 pointer-events-none'
						: 'translate-y-0 opacity-100'
				}`}
			>
				<MobileHeader
					menuId="mobile-navigation-menu"
					menuOpen={isMenuOpen}
					onToggle={() => setIsMenuOpen(open => !open)}
				/>

				<div className="hidden md:flex items-center justify-between px-6 lg:px-24 py-8">
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
				<div className="relative hidden px-6 lg:px-24 md:block">
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
				<MobileHeader
					menuId="mobile-navigation-menu"
					menuOpen={isMenuOpen}
					onToggle={() => setIsMenuOpen(open => !open)}
				/>
				<div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-24">
					<div className="hidden md:grid grid-cols-[auto_1fr_auto] items-center py-4 gap-4">
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

			<MobileMenu
				id="mobile-navigation-menu"
				open={isMenuOpen}
				onClose={() => setIsMenuOpen(false)}
			/>
		</>
	);
}
