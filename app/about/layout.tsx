import type {Metadata} from 'next';
import type {ReactNode} from 'react';
import {createPageMetadata} from '../seo';

export const metadata: Metadata = createPageMetadata({
	title: 'About',
	description:
		"Learn about A Priori, Brown University's undergraduate journal of philosophy, including its mission, affiliation, editorial board, and values.",
	path: '/about',
});

export default function AboutLayout({children}: {children: ReactNode}) {
	return children;
}
