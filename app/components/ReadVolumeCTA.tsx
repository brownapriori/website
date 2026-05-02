import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { PortableText } from 'next-sanity';
import type { PortableTextBlock } from 'next-sanity';

const titleComponents = {
	block: {
		normal: ({ children }: { children?: React.ReactNode }) => (
			<p
				className="text-[24px] font-semibold"
				style={{ fontFamily: 'var(--font-poppins)' }}
			>
				{children}
			</p>
		),
	},
	marks: {
		strong: ({ children }: { children?: React.ReactNode }) => (
			<span className="text-[var(--color-accent)]">{children}</span>
		),
	},
};

const contentsComponents = {
	block: {
		normal: ({ children }: { children?: React.ReactNode }) => (
			<p
				className="text-[16px] text-black leading-6"
				style={{ fontFamily: 'var(--font-source-serif-pro)' }}
			>
				{children}
			</p>
		),
	},
	marks: {
		strong: ({ children }: { children?: React.ReactNode }) => (
			<strong>{children}</strong>
		),
		em: ({ children }: { children?: React.ReactNode }) => (
			<em>{children}</em>
		),
	},
};

interface Props {
	volumeNumber: number | null;
	title: PortableTextBlock[] | null;
	contents: PortableTextBlock[] | null;
	coverImageUrl: string | null;
	coverImageAlt: string | null;
}

export default function ReadVolumeCTA({ volumeNumber, title, contents, coverImageUrl, coverImageAlt }: Props) {
	const href = volumeNumber ? `/volumes/${volumeNumber}` : '/volumes/latest';

	return (
		<div className="w-full max-w-[1280px] px-4 sm:px-6 lg:px-24 pb-8">
			<div className="border border-[var(--color-tertiary)] p-2">
				<div className="bg-[var(--color-bg-secondary)] relative overflow-hidden">
					<div className="px-6 sm:px-10 lg:px-[64px] py-8 lg:py-[32px] lg:pr-[calc(64px+176px+64px)]">
						<div className="flex flex-col gap-6">
							{title && title.length > 0 && (
								<PortableText
									value={title}
									// eslint-disable-next-line @typescript-eslint/no-explicit-any
									components={titleComponents as any}
								/>
							)}
							{contents && contents.length > 0 && (
								<div className="flex flex-col gap-4">
									<PortableText
										value={contents}
										// eslint-disable-next-line @typescript-eslint/no-explicit-any
										components={contentsComponents as any}
									/>
								</div>
							)}
							<Link
								href={href}
								className="group border border-[var(--color-accent)] px-6 lg:px-[32px] py-3 lg:py-[12px] flex items-center gap-2 hover:bg-[var(--color-accent)] transition-colors w-fit"
							>
								<span
									className="text-[16px] text-[var(--color-accent)] group-hover:text-white"
									style={{ fontFamily: 'var(--font-poppins)' }}
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
					{coverImageUrl && (
						<div className="hidden lg:block relative mx-auto mb-4 w-[140px] sm:w-[160px] aspect-[478/728] lg:absolute lg:mx-0 lg:mb-0 lg:right-[64px] lg:top-[16px] lg:bottom-[16px] lg:w-auto">
							<img
								alt={coverImageAlt ?? `Volume ${volumeNumber} Cover`}
								className="w-full h-full object-cover"
								src={coverImageUrl}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
