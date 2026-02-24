interface TableOfContentsItem {
	href: string;
	label: string;
	children?: TableOfContentsItem[];
}

interface TableOfContentsProps {
	items: TableOfContentsItem[];
	variant?: 'default' | 'submission';
	title?: string;
}

const variantStyles = {
	default: {
		container:
			'border border-[var(--color-tertiary)] p-4 sm:p-6 flex flex-col gap-3 lg:sticky lg:top-24 self-start w-full',
		title: 'text-[16px] font-semibold text-black',
		titleStyle: { fontFamily: 'var(--font-source-serif-pro)' },
		list: 'flex flex-col',
		link: 'text-[14px] text-black hover:text-[var(--color-accent)] transition-colors',
		linkStyle: { fontFamily: 'var(--font-source-serif-pro)' },
		nestedList: 'flex flex-col ml-4 mt-1',
		nestedLink:
			'text-[14px] text-black hover:text-[var(--color-accent)] transition-colors',
		nestedLinkStyle: { fontFamily: 'var(--font-source-serif-pro)' },
	},
	submission: {
		container:
			'border border-[var(--color-tertiary)] p-4 sm:p-6 flex flex-col gap-3 lg:sticky lg:top-24 self-start w-full',
		title: 'text-[16px] font-semibold text-black',
		titleStyle: { fontFamily: 'var(--font-source-serif-pro)' },
		list: 'flex flex-col',
		link: 'font-poppins font-semibold text-[14px] text-accent hover:underline',
		linkStyle: undefined,
		nestedList: 'flex flex-col ml-4 mt-1',
		nestedLink:
			'font-source-serif-pro text-[14px] text-black hover:text-accent transition-colors',
		nestedLinkStyle: undefined,
	},
} as const;

export default function TableOfContents({
	items,
	variant = 'default',
	title = 'Table of Contents',
}: TableOfContentsProps) {
	const styles = variantStyles[variant];

	return (
		<aside className={styles.container}>
			<h2 className={styles.title} style={styles.titleStyle}>
				{title}
			</h2>
			<div className={styles.list}>
				{items.map(item => (
					<div key={item.href}>
						<a
							href={item.href}
							className={styles.link}
							style={styles.linkStyle}
						>
							{item.label}
						</a>
						{item.children && item.children.length > 0 ? (
							<div className={styles.nestedList}>
								{item.children.map(child => (
									<a
										key={child.href}
										href={child.href}
										className={styles.nestedLink}
										style={styles.nestedLinkStyle}
									>
										{child.label}
									</a>
								))}
							</div>
						) : null}
					</div>
				))}
			</div>
		</aside>
	);
}
