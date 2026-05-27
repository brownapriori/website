'use client';

import NextLink from 'next/link';
import {useState} from 'react';
import {ChevronLeft, ChevronRight, FileText, Link} from 'lucide-react';
import {TextAlignStart} from 'lucide-react';
import SuggestedCitation from '../../components/SuggestedCitation';
import type {Volume, VolumeArticle} from '@/sanity/queries/volume';

function ordinal(n: number): string {
	const s = ['th', 'st', 'nd', 'rd'];
	const v = n % 100;
	return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

type Tab = 'toc' | 'pdf';

type VolumeNavigation = {
	previousNumber: number | null;
	nextNumber: number | null;
};

export default function LatestVolumeClient({
	volume,
	navigation = {previousNumber: null, nextNumber: null},
}: {
	volume: Volume;
	navigation?: VolumeNavigation;
}) {
	const [activeTab, setActiveTab] = useState<Tab>('toc');
	const [linkCopied, setLinkCopied] = useState(false);
	const [citationCopied, setCitationCopied] = useState(false);

	const citationPlainText = `A Priori. Vol. ${volume.number}. Providence, RI: Department of Philosophy, Brown University, ${volume.year}.`;
	const citationHtmlText = `<em>A Priori</em>. Vol. ${volume.number}. Providence, RI: Department of Philosophy, Brown University, ${volume.year}.`;

	const handleCopyLink = async () => {
		const copied = await copyToClipboard({plainText: window.location.href});
		if (!copied) return;
		setLinkCopied(true);
		setTimeout(() => setLinkCopied(false), 750);
	};

	const handleCopyCitation = async () => {
		const copied = await copyToClipboard({
			plainText: citationPlainText,
			htmlText: citationHtmlText,
		});
		if (!copied) return;
		setCitationCopied(true);
		setTimeout(() => setCitationCopied(false), 750);
	};

	return (
		<>
			<div className="w-full max-w-[1280px] px-4 sm:px-6 lg:px-24 py-4">
				<div
					className="flex items-center gap-2 text-[16px]"
					style={{fontFamily: 'var(--font-poppins)'}}
				>
					<NextLink
						href="/volumes"
						className="text-[var(--color-text-secondary)] hover:underline"
					>
						Volumes
					</NextLink>
					<span className="text-[var(--color-tertiary)]">/</span>
					<span className="text-[var(--color-accent)]">
						Volume {volume.number}
					</span>
				</div>
			</div>

			<div className="w-full max-w-[1280px] px-4 sm:px-6 lg:px-24">
				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-3">
						<div className="flex flex-col gap-1">
							<h1
								className="text-[32px] font-semibold text-black"
								style={{
									fontFamily: 'var(--font-source-serif-pro)',
								}}
							>
								Volume {volume.number}
							</h1>
							<p
								className="text-[20px] text-black"
								style={{
									fontFamily: 'var(--font-source-serif-pro)',
								}}
							>
								A Priori: Brown University Undergraduate Journal
								of Philosophy
							</p>
							<p
								className="text-[16px] text-[var(--color-accent)] font-medium"
								style={{fontFamily: 'var(--font-poppins)'}}
							>
								The {ordinal(volume.number)} Editorial Board
							</p>
							<p
								className="text-[16px] text-[var(--color-text-secondary)]"
								style={{
									fontFamily: 'var(--font-source-serif-pro)',
								}}
							>
								{volume.year}
							</p>
						</div>

						<div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
							<div className="flex flex-wrap items-center gap-2">
								{volume.pdfUrl && (
									<SmallButtonLink
										href={`${volume.pdfUrl}?dl=A_Priori_vol_${volume.number}.pdf`}
										variant="primary"
									>
										<span className="inline-flex items-center gap-1.5">
											<FileText
												size={16}
												strokeWidth={1.75}
											/>
											PDF
										</span>
									</SmallButtonLink>
								)}
								<div className="relative inline-flex">
									<SmallButton onClick={handleCopyLink}>
										<span className="inline-flex items-center gap-1.5">
											<Link
												size={16}
												strokeWidth={1.75}
											/>
											COPY LINK
										</span>
									</SmallButton>
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
							{navigation.previousNumber || navigation.nextNumber ? (
								<div className="flex flex-wrap items-center gap-2">
									{navigation.previousNumber ? (
										<SmallInternalButtonLink
											href={`/volumes/${navigation.previousNumber}`}
										>
											<span className="inline-flex items-center gap-1.5">
												<ChevronLeft
													size={16}
													strokeWidth={1.75}
												/>
												PREVIOUS VOLUME
											</span>
										</SmallInternalButtonLink>
									) : null}
									{navigation.nextNumber ? (
										<SmallInternalButtonLink
											href={`/volumes/${navigation.nextNumber}`}
										>
											<span className="inline-flex items-center gap-1.5">
												NEXT VOLUME
												<ChevronRight
													size={16}
													strokeWidth={1.75}
												/>
											</span>
										</SmallInternalButtonLink>
									) : null}
								</div>
							) : null}
						</div>
					</div>

					<div className="relative">
						<div className="absolute left-0 right-0 bottom-0 z-0 h-px bg-[var(--color-tertiary)]"></div>
						<div className="relative z-10 flex h-[34px] w-full max-w-[300px] items-center">
							<button
								type="button"
								onClick={() => setActiveTab('toc')}
								className={`px-3 py-2 text-[12px] font-semibold ${
									activeTab === 'toc'
										? 'bg-white shadow-[inset_1px_0_0_0_var(--color-tertiary),inset_-1px_0_0_0_var(--color-tertiary),inset_0_1px_0_0_var(--color-tertiary)]'
										: 'bg-[var(--color-bg-secondary)] shadow-[inset_0_-1px_0_0_var(--color-tertiary)]'
								}`}
								style={{fontFamily: 'var(--font-poppins)'}}
							>
								TABLE OF CONTENTS
							</button>
							<button
								type="button"
								onClick={() => setActiveTab('pdf')}
								className={`px-3 py-2 text-[12px] font-semibold ${
									activeTab === 'pdf'
										? 'bg-white shadow-[inset_1px_0_0_0_var(--color-tertiary),inset_-1px_0_0_0_var(--color-tertiary),inset_0_1px_0_0_var(--color-tertiary)]'
										: 'bg-[var(--color-bg-secondary)] shadow-[inset_0_-1px_0_0_var(--color-tertiary)]'
								}`}
								style={{fontFamily: 'var(--font-poppins)'}}
							>
								PDF
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="w-full max-w-[1280px] px-4 sm:px-6 lg:px-24 pb-8">
				{activeTab === 'toc' ? (
					<TableOfContentsView articles={volume.articles} />
				) : (
					<PdfView
						pdfUrl={volume.pdfUrl}
						volumeNumber={volume.number}
						year={volume.year}
						onCopyCitation={handleCopyCitation}
						citationCopied={citationCopied}
					/>
				)}
			</div>
		</>
	);
}

function TableOfContentsView({articles}: {articles: VolumeArticle[]}) {
	return (
		<div className="flex flex-col">
			{articles.map((article, index) => {
				const pages = article.pageRange
					? `pp. ${article.pageRange.start}–${article.pageRange.end}`
					: null;
				const authors = article.authors.join(', ');

				return (
					<div
						key={article._id}
						className={`py-6 ${
							index < articles.length - 1
								? 'border-b border-[var(--color-tertiary)]'
								: ''
						}`}
					>
						<div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-4">
							<p
								className="text-[14px] text-[var(--color-text-secondary)] leading-6"
								style={{
									fontFamily: 'var(--font-source-serif-pro)',
								}}
							>
								{pages}
							</p>
							<div className="flex flex-col gap-1">
								<h2
									className="text-[20px] font-semibold text-black"
									style={{
										fontFamily:
											'var(--font-source-serif-pro)',
									}}
								>
									{article.slug ? (
										<NextLink
											href={`/papers/${article.slug}`}
											className="hover:text-[var(--color-text-secondary)] transition-colors"
										>
											{article.title}
										</NextLink>
									) : (
										article.title
									)}
								</h2>
								<p
									className="text-[14px] text-[var(--color-accent)] font-medium"
									style={{fontFamily: 'var(--font-poppins)'}}
								>
									{authors}
								</p>
								<div className="flex items-center gap-2 mt-1">
									{article.slug ? (
										<RowButtonLink
											href={`/papers/${article.slug}`}
										>
											<span className="inline-flex items-center gap-1.5">
												<TextAlignStart
													size={16}
													strokeWidth={1.75}
												/>
												READ ARTICLE
											</span>
										</RowButtonLink>
									) : (
										<RowButton>
											<span className="inline-flex items-center gap-1.5">
												<TextAlignStart
													size={16}
													strokeWidth={1.75}
												/>
												READ ARTICLE
											</span>
										</RowButton>
									)}
									{article.pdfUrl && (
										<RowButtonLink href={article.slug ? `${article.pdfUrl}?dl=${article.slug}.pdf` : article.pdfUrl} newTab>
											<span className="inline-flex items-center gap-1.5">
												<FileText
													size={16}
													strokeWidth={1.75}
												/>
												PDF
											</span>
										</RowButtonLink>
									)}
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

function PdfView({
	pdfUrl,
	volumeNumber,
	year,
	onCopyCitation,
	citationCopied,
}: {
	pdfUrl: string | null;
	volumeNumber: number;
	year: number;
	onCopyCitation: () => void;
	citationCopied: boolean;
}) {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-[768px_272px] gap-12 pt-8">
			<div className="order-2 lg:order-1 bg-[var(--color-bg-secondary)] border border-[var(--color-tertiary)] h-[960px] overflow-hidden">
				{pdfUrl ? (
					<iframe
						src={pdfUrl}
						title="Volume PDF"
						className="w-full h-full"
					/>
				) : (
					<div
						className="flex items-center justify-center h-full text-[var(--color-text-secondary)]"
						style={{fontFamily: 'var(--font-source-serif-pro)'}}
					>
						PDF not available
					</div>
				)}
			</div>
			<div className="order-1 lg:order-2 h-fit lg:sticky lg:top-24 flex flex-col gap-4">
				<SuggestedCitation
					onClick={onCopyCitation}
					copied={citationCopied}
					text={
						<>
							<em>A Priori</em>. Vol. {volumeNumber}. Providence,
							RI: Department of Philosophy, Brown University, {year}
							.
						</>
					}
				/>
			</div>
		</div>
	);
}

function SmallButton({
	children,
	variant = 'secondary',
	onClick,
}: {
	children: React.ReactNode;
	variant?: 'primary' | 'secondary';
	onClick?: () => void;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`inline-flex items-center justify-center px-3 py-2 text-[12px] font-semibold leading-none transition-colors ${
				variant === 'primary'
					? 'bg-[var(--color-accent)] text-white hover:opacity-90'
					: 'bg-[var(--color-bg-secondary)] text-black hover:bg-[var(--color-bg-secondary-hover)]'
			}`}
			style={{fontFamily: 'var(--font-poppins)'}}
		>
			{children}
		</button>
	);
}

function SmallButtonLink({
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
			className={`inline-flex items-center justify-center px-3 py-2 text-[12px] font-semibold leading-none transition-colors ${
				variant === 'primary'
					? 'bg-[var(--color-accent)] text-white hover:opacity-90'
					: 'bg-[var(--color-bg-secondary)] text-black hover:bg-[var(--color-bg-secondary-hover)]'
			}`}
			style={{fontFamily: 'var(--font-poppins)'}}
		>
			{children}
		</a>
	);
}

function SmallInternalButtonLink({
	children,
	href,
}: {
	children: React.ReactNode;
	href: string;
}) {
	return (
		<NextLink
			href={href}
			className="inline-flex items-center justify-center px-3 py-2 text-[12px] font-semibold leading-none transition-colors bg-[var(--color-bg-secondary)] text-black hover:bg-[var(--color-bg-secondary-hover)]"
			style={{fontFamily: 'var(--font-poppins)'}}
		>
			{children}
		</NextLink>
	);
}

function RowButton({children}: {children: React.ReactNode}) {
	return (
		<button
			type="button"
			className="inline-flex items-center justify-center bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-secondary-hover)] transition-colors px-3 py-2 text-[12px] font-semibold leading-none text-black"
			style={{fontFamily: 'var(--font-poppins)'}}
		>
			{children}
		</button>
	);
}

function RowButtonLink({
	href,
	children,
	newTab = false,
}: {
	href: string;
	children: React.ReactNode;
	newTab?: boolean;
}) {
	return (
		<a
			href={href}
			target={newTab ? '_blank' : undefined}
			rel={newTab ? 'noopener noreferrer' : undefined}
			className="inline-flex items-center justify-center bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-secondary-hover)] transition-colors px-3 py-2 text-[12px] font-semibold leading-none text-black"
			style={{fontFamily: 'var(--font-poppins)'}}
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
					'text/html': new Blob([htmlText], {type: 'text/html'}),
					'text/plain': new Blob([plainText], {type: 'text/plain'}),
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
