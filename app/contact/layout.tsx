import type {Metadata} from 'next';
import type {ReactNode} from 'react';
import {createPageMetadata} from '../seo';

export const metadata: Metadata = createPageMetadata({
	title: 'Contact',
	description:
		"Contact A Priori, Brown University's undergraduate journal of philosophy, for editorial correspondence and journal inquiries.",
	path: '/contact',
});

export default function ContactLayout({children}: {children: ReactNode}) {
	return children;
}
