import {client} from '@/sanity/lib/client';
import {notFound} from 'next/navigation';

export const revalidate = 3600;

export async function GET(
	_req: Request,
	{params}: {params: Promise<{slug: string}>},
) {
	const {slug} = await params;

	const pdfUrl = await client.fetch<string | null>(
		`*[_type == "article" && slug.current == $slug][0].pdf.asset->url`,
		{slug},
	);

	if (!pdfUrl) notFound();

	const upstream = await fetch(pdfUrl);
	if (!upstream.ok) return new Response('Failed to fetch PDF', {status: 502});

	return new Response(upstream.body, {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Disposition': `inline; filename="${slug}.pdf"`,
		},
	});
}
