'use client';

import NextLink from 'next/link';
import {useState} from 'react';
import {FileText, Link as LinkIcon, X} from 'lucide-react';
import {PortableText} from 'next-sanity';
import TableOfContents from '../../components/TableOfContents';
import SuggestedCitation from '../../components/SuggestedCitation';
import type {
	ArticleDetail,
	ExtractedFootnote,
	ArticleVolume,
} from '@/sanity/queries/article';

type TocItem = {href: string; label: string};

type Props = {
	article: ArticleDetail;
	volume: ArticleVolume | null;
	footnotes: ExtractedFootnote[];
	tocItems: TocItem[];
	citationText: string;
	citationHtml: string;
};

export default function PaperDetailClient({
	article,
	volume,
	footnotes,
	tocItems,
	citationText,
	citationHtml,
}: Props) {
	const [linkCopied, setLinkCopied] = useState(false);
	const [citationCopied, setCitationCopied] = useState(false);
	const [activeFootnoteId, setActiveFootnoteId] = useState<string | null>(null);
	const activeFootnote = activeFootnoteId
		? footnotes.find(fn => fn.id === activeFootnoteId)
		: null;

	const handleCopyLink = async () => {
		const copied = await copyToClipboard({plainText: window.location.href});
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

	const ptComponents = {
		block: {
			normal: ({children}: {children?: React.ReactNode}) => (
				<p
					className="text-[16px] text-black leading-6"
					style={{fontFamily: 'var(--font-source-serif-pro)'}}
				>
					{children}
				</p>
			),
			blockquote: ({children}: {children?: React.ReactNode}) => (
				<blockquote
					className="border-l-2 border-[var(--color-tertiary)] pl-4 italic text-[16px] text-black leading-6"
					style={{fontFamily: 'var(--font-source-serif-pro)'}}
				>
					{children}
				</blockquote>
			),
			h2: ({children, value}: {children?: React.ReactNode; value: {children?: Array<{text?: string}>}}) => {
				const text = (value.children ?? []).map(c => c.text ?? '').join('');
				const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/, '');
				return (
					<h2
						id={id}
						className="text-[20px] font-semibold text-black scroll-mt-24"
						style={{fontFamily: 'var(--font-source-serif-pro)'}}
					>
						{children}
					</h2>
				);
			},
			h3: ({children, value}: {children?: React.ReactNode; value: {children?: Array<{text?: string}>}}) => {
				const text = (value.children ?? []).map(c => c.text ?? '').join('');
				const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/, '');
				return (
					<h3
						id={id}
						className="text-[18px] font-semibold text-black scroll-mt-24"
						style={{fontFamily: 'var(--font-source-serif-pro)'}}
					>
						{children}
					</h3>
				);
			},
		},
		marks: {
			strong: ({children}: {children?: React.ReactNode}) => (
				<strong>{children}</strong>
			),
			em: ({children}: {children?: React.ReactNode}) => (
				<em>{children}</em>
			),
			code: ({children}: {children?: React.ReactNode}) => (
				<code className="font-mono bg-gray-100 px-1 text-[14px]">
					{children}
				</code>
			),
			footnote: ({
				children,
				value,
			}: {
				children?: React.ReactNode;
				value?: {_key?: string};
			}) => (
				<sup
					id={value?._key ? `footnote-ref-${value._key}` : undefined}
					className="text-[12px] text-[var(--color-accent)] scroll-mt-24"
					style={{fontFamily: 'var(--font-poppins)'}}
				>
					<button
						type="button"
						onClick={() => {
							if (value?._key) {
								setActiveFootnoteId(value._key);
							}
						}}
						className="cursor-pointer hover:underline"
						aria-label="Show note"
					>
						{children}
					</button>
				</sup>
			),
			link: ({
				children,
				value,
			}: {
				children?: React.ReactNode;
				value?: {href?: string};
			}) => (
				<a
					href={value?.href}
					target="_blank"
					rel="noopener noreferrer"
					className="underline hover:text-[var(--color-accent)]"
				>
					{children}
				</a>
			),
		},
	};

	const simpleComponents = {
		block: {
			normal: ({children}: {children?: React.ReactNode}) => (
				<span
					className="text-[16px] text-black leading-6"
					style={{fontFamily: 'var(--font-source-serif-pro)'}}
				>
					{children}
				</span>
			),
		},
	};

	return (
		<>
			<div className="w-full max-w-[1280px] px-4 sm:px-6 lg:px-24 py-4">
				<div
					className="flex items-center gap-4 text-[16px] text-[var(--color-text-secondary)]"
					style={{fontFamily: 'var(--font-poppins)'}}
				>
					{volume ? (
						<>
							<span>Journal Article</span>
							<span
								className="h-4 w-px bg-[var(--color-tertiary)]"
								aria-hidden="true"
							></span>
							<NextLink
								href={`/volumes/${volume.number}`}
								className="hover:text-black transition-colors"
							>
								Volume {volume.number}
							</NextLink>
							<span
								className="text-[var(--color-tertiary)] text-[14px] leading-none -mx-1"
								aria-hidden="true"
							>•</span>
							<span>{volume.year}</span>
						</>
					) : (
						<NextLink
							href="/papers"
							className="hover:text-black transition-colors"
						>
							Papers
						</NextLink>
					)}
				</div>
			</div>

			<div className="w-full max-w-[1280px] px-4 sm:px-6 lg:px-24 pb-8">
				<div className="grid grid-cols-1 lg:grid-cols-[1fr_272px] gap-x-8 lg:gap-x-24 gap-y-6">
					<div className="order-1 flex flex-col gap-6">
						<div className="flex flex-col gap-2">
							<h1
								className="text-[32px] font-semibold text-black"
								style={{
									fontFamily: 'var(--font-source-serif-pro)',
								}}
							>
								{article.title}
							</h1>
							<p
								className="text-[16px] text-[var(--color-accent)] font-medium"
								style={{fontFamily: 'var(--font-poppins)'}}
							>
								{article.authors.join(', ')}
							</p>
						</div>

						<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
							<div className="flex flex-wrap items-center gap-2">
								{article.pdfUrl && (
									<HeaderButtonLink
										href={`${article.pdfUrl}?dl=${article.slug}.pdf`}
										variant="primary"
									>
										<span className="inline-flex items-center gap-2">
											<FileText size={16} strokeWidth={1.75} />
											PDF
										</span>
									</HeaderButtonLink>
								)}
								<div className="relative inline-flex">
									<HeaderButton onClick={handleCopyLink}>
										<span className="inline-flex items-center gap-2">
											<LinkIcon size={16} strokeWidth={1.75} />
											COPY LINK
										</span>
									</HeaderButton>
									{linkCopied ? (
										<div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-10">
											<div
												className="relative bg-white border border-[var(--color-tertiary)] text-black text-[12px] px-2 py-1"
												style={{fontFamily: 'var(--font-poppins)'}}
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
							<span
								dangerouslySetInnerHTML={{__html: citationHtml}}
							/>
						}
					/>

					{tocItems.length > 0 && (
						<div className="order-3 lg:order-4 flex flex-col gap-6">
							<TableOfContents items={tocItems} />
						</div>
					)}

					<div className="order-4 lg:order-3 flex flex-col gap-6">
						<Section id="abstract" title="Abstract">
							<p>{article.abstract}</p>
						</Section>

						{article.content?.length > 0 && (
							<>
								<div className="h-px bg-[var(--color-tertiary)]"></div>
								<div className="flex flex-col gap-4">
									<PortableText
										value={article.content}
										// eslint-disable-next-line @typescript-eslint/no-explicit-any
										components={ptComponents as any}
									/>
								</div>
							</>
						)}

						{footnotes.length > 0 && (
							<>
								<div className="h-px bg-[var(--color-tertiary)]"></div>
								<Section id="footnotes" title="Notes">
									{footnotes.map(footnote => (
										<div
											key={footnote.id}
											id={`footnote-${footnote.id}`}
											className="grid grid-cols-[2rem_1fr] gap-3 scroll-mt-24"
										>
											<a
												href={`#footnote-ref-${footnote.id}`}
												className="text-right text-[16px] text-[var(--color-accent)] tabular-nums hover:underline"
												aria-label={`Jump to note ${footnote.superscript} reference`}
											>
												{footnote.superscript}.
											</a>
											<div className="min-w-0">
												<PortableText
													value={footnote.content}
													// eslint-disable-next-line @typescript-eslint/no-explicit-any
													components={simpleComponents as any}
												/>
											</div>
										</div>
									))}
								</Section>
							</>
						)}
					</div>
				</div>
			</div>
			{activeFootnote ? (
				<FootnoteCard
					footnote={activeFootnote}
					onClose={() => setActiveFootnoteId(null)}
					components={simpleComponents}
				/>
			) : null}
		</>
	);
}

function FootnoteCard({
	footnote,
	onClose,
	components,
}: {
	footnote: ExtractedFootnote;
	onClose: () => void;
	components: unknown;
}) {
	return (
		<aside className="fixed bottom-4 left-4 right-4 z-50 max-h-[45vh] overflow-y-auto border border-[var(--color-tertiary)] bg-white p-4 sm:bottom-6 sm:left-auto sm:right-6 sm:w-[360px] sm:p-6">
			<div className="flex items-center justify-between gap-3">
				<h2
					className="text-[16px] font-semibold text-[var(--color-accent)]"
					style={{fontFamily: 'var(--font-poppins)'}}
				>
					{footnote.superscript}.
				</h2>
				<button
					type="button"
					onClick={onClose}
					className="inline-flex h-7 w-7 items-center justify-center text-[var(--color-text-secondary)] hover:text-black transition-colors"
					aria-label="Close note"
				>
					<X size={16} strokeWidth={1.75} />
				</button>
			</div>
			<div
				className="flex flex-col gap-4 text-[16px] text-black leading-6"
				style={{fontFamily: 'var(--font-source-serif-pro)'}}
			>
				<PortableText
					value={footnote.content}
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					components={components as any}
				/>
			</div>
		</aside>
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
				style={{fontFamily: 'var(--font-poppins)'}}
			>
				{title}
			</h2>
			<div
				className="flex flex-col gap-4 text-[16px] text-black leading-6"
				style={{fontFamily: 'var(--font-source-serif-pro)'}}
			>
				{children}
			</div>
		</div>
	);
}

function HeaderButton({
	children,
	onClick,
}: {
	children: React.ReactNode;
	onClick?: () => void;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="inline-flex items-center justify-center bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-secondary-hover)] transition-colors px-3 py-2 text-[12px] font-semibold leading-none text-black"
			style={{fontFamily: 'var(--font-poppins)'}}
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
