'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, FileText, Link } from 'lucide-react';
import { TextAlignStart } from 'lucide-react';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import SuggestedCitation from '../../components/SuggestedCitation';

type Tab = 'toc' | 'pdf';

interface Article {
	id: number;
	title: string;
	author: string;
	pages: string;
}

const articles: Article[] = [
	{
		id: 1,
		title: 'Does the Same Theory of Welfare Apply to All Welfare Subjects?',
		author: 'James Wolcott',
		pages: 'pp. 1-16',
	},
	{
		id: 2,
		title: 'Naive and Sophisticated Hedonism in Subjective Well-Being',
		author: 'Mariana Kim',
		pages: 'pp. 17-33',
	},
	{
		id: 3,
		title: 'Moral Luck, Agency, and Responsibility',
		author: 'Aaron Patel',
		pages: 'pp. 34-49',
	},
];

const placeholderPdfUrl = '/A_Priori_VIII_2.pdf';
const citationText =
	'Wolcott, James. "Does the Same Theory of Welfare Apply to All Welfare Subjects?" A Priori, vol. 6, 2024, pp. 1-16.';
const citationHtml =
	'Wolcott, James. &ldquo;Does the Same Theory of Welfare Apply to All Welfare Subjects?&rdquo; <em>A Priori</em>, vol. 6, 2024, pp. 1-16.';

export default function LatestVolumePage() {
	const [activeTab, setActiveTab] = useState<Tab>('toc');
	const [linkCopied, setLinkCopied] = useState(false);
	const [citationCopied, setCitationCopied] = useState(false);

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

			<div className="w-full max-w-[1280px] px-24 py-4">
				<div
					className="flex items-center gap-2 text-[16px]"
					style={{ fontFamily: 'var(--font-poppins)' }}
				>
					<a
						href="/volumes"
						className="text-[var(--color-text-secondary)] hover:text-black transition-colors"
					>
						Volumes
					</a>
					<span className="text-[var(--color-tertiary)]">/</span>
					<span className="text-[var(--color-accent)]">Volume 6</span>
				</div>
			</div>

			<div className="w-full max-w-[1280px] px-24">
				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-3">
						<div className="flex flex-col gap-1">
							<h1
								className="text-[32px] font-semibold text-black"
								style={{
									fontFamily: 'var(--font-source-serif-pro)',
								}}
							>
								Volume 6
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
								style={{ fontFamily: 'var(--font-poppins)' }}
							>
								The 6th Editorial Board
							</p>
							<p
								className="text-[16px] text-[var(--color-text-secondary)]"
								style={{
									fontFamily: 'var(--font-source-serif-pro)',
								}}
							>
								2024
							</p>
						</div>

						<div className="flex items-center justify-between gap-4">
							<div className="flex items-center gap-2">
								<SmallButtonLink
									href={placeholderPdfUrl}
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
								<div className="relative inline-flex">
									<SmallButton onClick={handleCopyLink}>
										<span className="inline-flex items-center gap-1.5">
											<Link size={16} strokeWidth={1.75} />
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
							<div className="flex items-center gap-2">
								<SmallButton>
									<span className="inline-flex items-center gap-1.5">
										<ChevronLeft
											size={16}
											strokeWidth={1.75}
										/>
										PREVIOUS VOLUME
									</span>
								</SmallButton>
								<SmallButton>
									<span className="inline-flex items-center gap-1.5">
										NEXT VOLUME
										<ChevronRight
											size={16}
											strokeWidth={1.75}
										/>
									</span>
								</SmallButton>
							</div>
						</div>
					</div>

					<div className="relative">
						<div className="absolute left-0 right-0 bottom-0 z-0 h-px bg-[var(--color-tertiary)]"></div>
						<div className="relative z-10 flex h-[34px] w-[300px] items-center">
							<button
								type="button"
								onClick={() => setActiveTab('toc')}
								className={`px-3 py-2 text-[12px] font-semibold ${
									activeTab === 'toc'
										? 'bg-white shadow-[inset_1px_0_0_0_var(--color-tertiary),inset_-1px_0_0_0_var(--color-tertiary),inset_0_1px_0_0_var(--color-tertiary)]'
										: 'bg-[var(--color-bg-secondary)] shadow-[inset_0_-1px_0_0_var(--color-tertiary)]'
								}`}
								style={{ fontFamily: 'var(--font-poppins)' }}
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
								style={{ fontFamily: 'var(--font-poppins)' }}
							>
								PDF
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="w-full max-w-[1280px] px-24 pb-8">
				{activeTab === 'toc' ? (
					<TableOfContentsView />
				) : (
					<PdfView
						pdfUrl={placeholderPdfUrl}
						onCopyCitation={handleCopyCitation}
						citationCopied={citationCopied}
					/>
				)}
			</div>

			<Footer />
		</div>
	);
}

function TableOfContentsView() {
	return (
		<div className="flex flex-col">
			{articles.map((article, index) => (
				<div
					key={article.id}
					className={`py-6 ${
						index < articles.length - 1
							? 'border-b border-[var(--color-tertiary)]'
							: ''
					}`}
				>
					<div className="grid grid-cols-[1fr_4fr] gap-4">
						<p
							className="text-[14px] text-[var(--color-text-secondary)] leading-6"
							style={{
								fontFamily: 'var(--font-source-serif-pro)',
							}}
						>
							{article.pages}
						</p>
						<div className="flex flex-col gap-1">
							<h2
								className="text-[20px] font-semibold text-black"
								style={{
									fontFamily: 'var(--font-source-serif-pro)',
								}}
							>
								{article.title}
							</h2>
							<p
								className="text-[14px] text-[var(--color-accent)] font-medium"
								style={{ fontFamily: 'var(--font-poppins)' }}
							>
								{article.author}
							</p>
							<div className="flex items-center gap-2 mt-1">
								<RowButton>
									<span className="inline-flex items-center gap-1.5">
										<TextAlignStart
											size={16}
											strokeWidth={1.75}
										/>
										READ ARTICLE
									</span>
								</RowButton>
								<RowButton>
									<span className="inline-flex items-center gap-1.5">
										<FileText
											size={16}
											strokeWidth={1.75}
										/>
										PDF
									</span>
								</RowButton>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

function PdfView({
	pdfUrl,
	onCopyCitation,
	citationCopied,
}: {
	pdfUrl: string;
	onCopyCitation: () => void;
	citationCopied: boolean;
}) {
	return (
		<div className="grid grid-cols-[768px_272px] gap-12 pt-8">
			<div className="bg-[var(--color-bg-secondary)] border border-[var(--color-tertiary)] h-[960px] overflow-hidden">
				<iframe
					src={pdfUrl}
					title="Volume PDF"
					className="w-full h-full"
				/>
			</div>
			<div className="h-fit sticky top-24 flex flex-col gap-4">
				<SuggestedCitation
					onClick={onCopyCitation}
					copied={citationCopied}
					text={
						<>
							<em>A Priori</em>. Vol. 7. Providence, RI: Brown
							University Department of Philosophy, 2026.
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
			style={{ fontFamily: 'var(--font-poppins)' }}
		>
			{children}
		</button>
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
			style={{ fontFamily: 'var(--font-poppins)' }}
		>
			{children}
		</a>
	);
}

function RowButton({ children }: { children: React.ReactNode }) {
	return (
		<button
			type="button"
			className="inline-flex items-center justify-center bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-secondary-hover)] transition-colors px-3 py-2 text-[12px] font-semibold leading-none text-black"
			style={{ fontFamily: 'var(--font-poppins)' }}
		>
			{children}
		</button>
	);
}
