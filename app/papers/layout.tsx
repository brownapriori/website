import type {Metadata} from 'next';
import type {ReactNode} from 'react';
import {createPageMetadata} from '../seo';

export const metadata: Metadata = createPageMetadata({
	title: 'Papers',
	description:
		"Browse undergraduate philosophy papers published by A Priori, Brown University's undergraduate journal of philosophy.",
	path: '/papers',
});

export default function PapersLayout({children}: {children: ReactNode}) {
	return children;
}
