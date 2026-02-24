import Link from 'next/link';

export default function CallForSubmissions() {
	return (
		<div className="w-full max-w-[1280px] flex flex-col px-24 gap-2">
			<div className="h-px bg-[var(--color-tertiary)]"></div>
			<Link
				href="/submission"
				className="bg-[var(--color-bg-secondary)] flex items-center justify-center py-4 hover:bg-[var(--color-bg-secondary-hover)] transition-colors"
			>
				<p className="text-[16px] text-black text-center">
					<span
						className="font-bold text-[var(--color-accent)]"
						style={{ fontFamily: 'var(--font-poppins)' }}
					>
						Call for submissions!{' '}
					</span>
					<span style={{ fontFamily: 'var(--font-poppins)' }}>
						A Priori is accepting submissions for our 7th Volume!
					</span>
				</p>
			</Link>
			<div className="h-px bg-[var(--color-tertiary)]"></div>
		</div>
	);
}
