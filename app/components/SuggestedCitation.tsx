interface SuggestedCitationProps {
	title?: string;
	text: React.ReactNode;
	className?: string;
	onClick?: () => void;
	copied?: boolean;
}

export default function SuggestedCitation({
	title = 'Suggested Citation',
	text,
	className = '',
	onClick,
	copied = false,
}: SuggestedCitationProps) {
	return (
		<div
			onClick={onClick}
			className={`relative border border-[var(--color-tertiary)] p-6 flex flex-col gap-3 ${
				onClick
					? 'cursor-pointer hover:bg-[var(--color-bg-secondary)] transition-colors'
					: ''
			} ${className}`}
		>
			{copied ? (
				<div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full">
					<div
						className="relative bg-white border border-[var(--color-tertiary)] text-black text-[12px] px-2 py-1"
						style={{ fontFamily: 'var(--font-poppins)' }}
					>
						Copied!
						<span className="absolute left-1/2 -translate-x-1/2 -bottom-[5px] h-2 w-2 rotate-45 bg-white border-r border-b border-[var(--color-tertiary)]"></span>
					</div>
				</div>
			) : null}
			<h2
				className="text-[16px] font-semibold text-black"
				style={{ fontFamily: 'var(--font-source-serif-pro)' }}
			>
				{title}
			</h2>
			<p
				className="text-[14px] text-[var(--color-text-secondary)] leading-6"
				style={{ fontFamily: 'var(--font-source-serif-pro)' }}
			>
				{text}
			</p>
		</div>
	);
}
