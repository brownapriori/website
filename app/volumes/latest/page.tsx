import {notFound, redirect} from 'next/navigation';
import {client} from '@/sanity/lib/client';
import {latestVolumeNumberQuery} from '@/sanity/queries/volume';

export default async function LatestVolumePage() {
	const volume = await client.fetch<{number: number} | null>(
		latestVolumeNumberQuery,
	);

	if (!volume) {
		notFound();
	}

	redirect(`/volumes/${volume.number}`);
}
