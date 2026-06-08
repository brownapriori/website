import {client} from '@/sanity/lib/client';
import {notFound} from 'next/navigation';

export const revalidate = 3600;

export async function GET(
	_req: Request,
	{params}: {params: Promise<{number: string}>},
) {
	const volumeNumber = Number((await params).number);

	const pdfUrl = await client.fetch<string | null>(
		`*[_type == "volume" && number == $number][0].pdf.asset->url`,
		{number: volumeNumber},
	);

	if (!pdfUrl) notFound();

	const upstream = await fetch(pdfUrl);
	if (!upstream.ok) return new Response('Failed to fetch PDF', {status: 502});

	return new Response(upstream.body, {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Disposition': `inline; filename="A_Priori_vol_${volumeNumber}.pdf"`,
		},
	});
}
