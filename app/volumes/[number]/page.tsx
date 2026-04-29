import {notFound} from 'next/navigation';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import {client} from '@/sanity/lib/client';
import {
	allVolumesQuery,
	volumeByNumberQuery,
	type Volume,
	type VolumeListItem,
} from '@/sanity/queries/volume';
import LatestVolumeClient from '../latest/LatestVolumeClient';

export default async function VolumePage({
	params,
}: {
	params: Promise<{number: string}>;
}) {
	const {number} = await params;
	const volumeNumber = Number(number);

	if (!Number.isInteger(volumeNumber) || volumeNumber < 1) {
		notFound();
	}

	const [volume, volumes] = await Promise.all([
		client.fetch<Volume | null>(volumeByNumberQuery, {
			number: volumeNumber,
		}),
		client.fetch<VolumeListItem[]>(allVolumesQuery),
	]);

	if (!volume) {
		notFound();
	}

	const volumeNumbers = volumes.map(item => item.number);
	const previousNumbers = volumeNumbers.filter(item => item < volume.number);
	const nextNumbers = volumeNumbers.filter(item => item > volume.number);
	const previousNumber =
		previousNumbers.length > 0 ? Math.max(...previousNumbers) : null;
	const nextNumber = nextNumbers.length > 0 ? Math.min(...nextNumbers) : null;

	return (
		<div className="bg-white min-h-screen w-full flex flex-col items-center">
			<Nav />
			<LatestVolumeClient
				volume={volume}
				navigation={{previousNumber, nextNumber}}
			/>
			<Footer />
		</div>
	);
}
