'use client';

import { useState } from 'react';
import {
	ChevronLeft,
	ChevronRight,
	FileText,
	Link as LinkIcon,
} from 'lucide-react';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import TableOfContents from '../../components/TableOfContents';
import SuggestedCitation from '../../components/SuggestedCitation';

const placeholderPdfUrl = '/A_Priori_VIII_2.pdf';
const paperTitle =
	'Does the Same Theory of Welfare Apply to All Welfare Subjects?';
const paperAuthor = 'James Wolcott';

export default function PaperDetailPage() {
	const [linkCopied, setLinkCopied] = useState(false);
	const [citationCopied, setCitationCopied] = useState(false);

	const citationText =
		'Wolcott, James. "Does the Same Theory of Welfare Apply to All Welfare Subjects?" A Priori, vol. 7, 2026.';
	const citationHtml =
		'Wolcott, James. &ldquo;Does the Same Theory of Welfare Apply to All Welfare Subjects?&rdquo; <em>A Priori</em>, vol. 7, 2026.';

	const handleCopyLink = async () => {
		const copied = await copyToClipboard({
			plainText: window.location.href,
		});
		if (!copied) return;
		setLinkCopied(true);
		setTimeout(() => setLinkCopied(false), 750);
	};

	const handleCopyCitation = async () => {
		const copied = await copyToClipboard({
			plainText: citationText,
			htmlText: citationHtml,
		});
		if (!copied) return;
		setCitationCopied(true);
		setTimeout(() => setCitationCopied(false), 750);
	};

	return (
		<div className="bg-white min-h-screen w-full flex flex-col items-center">
			<Nav />

			<div className="w-full max-w-[1280px] px-4 sm:px-6 lg:px-24 py-4">
				<div
					className="flex items-center gap-2 text-[16px]"
					style={{ fontFamily: 'var(--font-poppins)' }}
				>
					<a
						href="/papers"
						className="text-[var(--color-text-secondary)] hover:text-black transition-colors"
					>
						Papers
					</a>
				</div>
			</div>

			<div className="w-full max-w-[1280px] px-4 sm:px-6 lg:px-24">
				<div className="grid grid-cols-1 lg:grid-cols-[1fr_272px] gap-x-8 lg:gap-x-24 gap-y-6 items-start">
					<div className="flex flex-col gap-6">
						<div className="flex flex-col gap-2">
							<h1
								className="text-[32px] font-semibold text-black"
								style={{
									fontFamily: 'var(--font-source-serif-pro)',
								}}
							>
								{paperTitle}
							</h1>
							<p
								className="text-[16px] text-[var(--color-accent)] font-medium"
								style={{ fontFamily: 'var(--font-poppins)' }}
							>
								{paperAuthor}
							</p>
							<p
								className="text-[16px] text-[var(--color-text-secondary)]"
								style={{
									fontFamily: 'var(--font-source-serif-pro)',
								}}
							>
								February 15, 2026
							</p>
						</div>

						<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
							<div className="flex flex-wrap items-center gap-2">
								<HeaderButtonLink
									href={placeholderPdfUrl}
									variant="primary"
								>
									<span className="inline-flex items-center gap-2">
										<FileText
											size={16}
											strokeWidth={1.75}
										/>
										PDF
									</span>
								</HeaderButtonLink>
								<div className="relative inline-flex">
									<HeaderButton onClick={handleCopyLink}>
										<span className="inline-flex items-center gap-2">
											<LinkIcon
												size={16}
												strokeWidth={1.75}
											/>
											COPY LINK
										</span>
									</HeaderButton>
									{linkCopied ? (
										<div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-10">
											<div
												className="relative bg-white border border-[var(--color-tertiary)] text-black text-[12px] px-2 py-1"
												style={{
													fontFamily:
														'var(--font-poppins)',
												}}
											>
												Copied!
												<span className="absolute left-1/2 -translate-x-1/2 -top-[5px] h-2 w-2 rotate-45 bg-white border-l border-t border-[var(--color-tertiary)]"></span>
											</div>
										</div>
									) : null}
								</div>
							</div>
						</div>

						<div className="h-px bg-[var(--color-tertiary)]"></div>
					</div>

					<SuggestedCitation
						className="order-2 lg:order-2 self-end"
						onClick={handleCopyCitation}
						copied={citationCopied}
						text={
							<>
								Wolcott, James. &ldquo;Does the Same Theory of
								Welfare Apply to All Welfare Subjects?&rdquo;{' '}
								<em>A Priori</em>, vol. 7, 2026.
							</>
						}
					/>

					<div className="order-4 lg:order-3 flex flex-col gap-6">
						<Section id="abstract" title="Abstract">
							<p>
								The discussion of welfare across human and
								non-human subjects raises a central
								methodological question: should a single theory
								of welfare apply to all welfare subjects, or
								must theories vary according to the capacities
								and forms of life of different beings? This
								paper evaluates prominent accounts of welfare
								and argues for a constrained pluralism that
								preserves cross-subject comparability while
								respecting subject-specific conditions for
								well-being.
							</p>
						</Section>

						<div className="h-px bg-[var(--color-tertiary)]"></div>

						<Section id="introduction" title="Introduction">
							<p>
								Contemporary welfare theory often assumes that a
								general account of well-being can be extended
								uniformly to all possible subjects. Yet this
								assumption is increasingly contested. Cases
								involving non-human animals, artificial agents,
								and cognitively divergent humans reveal
								pressures on single-theory models that privilege
								one structure of desire, pleasure, or objective
								value.
							</p>
							<p>
								I argue that the strongest form of theoretical
								monism is unsustainable. At the same time,
								unrestricted pluralism risks collapsing welfare
								discourse into disconnected local frameworks. A
								more defensible position is a constrained
								pluralism: a common normative architecture
								paired with subject-sensitive criteria for
								realization.
							</p>
						</Section>

						<div className="h-px bg-[var(--color-tertiary)]"></div>

						<Section id="citation" title="Citation">
							<p>
								Wolcott, James. &ldquo;Does the Same Theory of
								Welfare Apply to All Welfare Subjects?&rdquo;{' '}
								<em>A Priori</em>, vol. 7, 2026.
							</p>
						</Section>
					</div>

					<div className="order-3 lg:order-4">
						<TableOfContents
							items={[
								{ href: '#abstract', label: 'Abstract' },
								{
									href: '#introduction',
									label: 'Introduction',
								},
								{ href: '#citation', label: 'Citation' },
							]}
						/>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}

function Section({
	id,
	title,
	children,
}: {
	id: string;
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div id={id} className="flex flex-col gap-4 scroll-mt-24">
			<h2
				className="text-[16px] font-semibold text-[var(--color-accent)]"
				style={{ fontFamily: 'var(--font-poppins)' }}
			>
				{title}
			</h2>
			<div
				className="flex flex-col gap-4 text-[16px] text-black leading-6"
				style={{ fontFamily: 'var(--font-source-serif-pro)' }}
			>
				{children}
			</div>
		</div>
	);
}

function HeaderButton({
	children,
	onClick,
	variant = 'secondary',
}: {
	children: React.ReactNode;
	onClick?: () => void;
	variant?: 'primary' | 'secondary';
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`inline-flex items-center justify-center bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-secondary-hover)] transition-colors px-3 py-2 text-[12px] font-semibold leading-none ${
				variant === 'primary'
					? 'bg-[var(--color-accent)] text-white hover:opacity-90'
					: 'text-black'
			}`}
			style={{ fontFamily: 'var(--font-poppins)' }}
		>
			{children}
		</button>
	);
}

function HeaderButtonLink({
	children,
	href,
	variant = 'secondary',
}: {
	children: React.ReactNode;
	href: string;
	variant?: 'primary' | 'secondary';
}) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className={`inline-flex items-center justify-center transition-colors px-3 py-2 text-[12px] font-semibold leading-none ${
				variant === 'primary'
					? 'bg-[var(--color-accent)] text-white hover:opacity-90'
					: 'bg-[var(--color-bg-secondary)] text-black hover:bg-[var(--color-bg-secondary-hover)]'
			}`}
			style={{ fontFamily: 'var(--font-poppins)' }}
		>
			{children}
		</a>
	);
}

async function copyToClipboard({
	plainText,
	htmlText,
}: {
	plainText: string;
	htmlText?: string;
}) {
	try {
		if (
			htmlText &&
			typeof ClipboardItem !== 'undefined' &&
			typeof navigator.clipboard.write === 'function'
		) {
			await navigator.clipboard.write([
				new ClipboardItem({
					'text/html': new Blob([htmlText], { type: 'text/html' }),
					'text/plain': new Blob([plainText], { type: 'text/plain' }),
				}),
			]);
			return true;
		}

		await navigator.clipboard.writeText(plainText);
		return true;
	} catch {
		try {
			const textarea = document.createElement('textarea');
			textarea.value = plainText;
			textarea.style.position = 'fixed';
			textarea.style.opacity = '0';
			document.body.appendChild(textarea);
			textarea.focus();
			textarea.select();
			const copied = document.execCommand('copy');
			document.body.removeChild(textarea);
			return copied;
		} catch {
			return false;
		}
	}
}
