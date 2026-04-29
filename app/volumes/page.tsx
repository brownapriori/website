import Link from 'next/link';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ReadVolumeCTA from '../components/ReadVolumeCTA';
import {client} from '@/sanity/lib/client';
import {allVolumesQuery, type VolumeListItem} from '@/sanity/queries/volume';

function ordinal(n: number): string {
	const s = ['th', 'st', 'nd', 'rd'];
	const v = n % 100;
	return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export default async function VolumesPage() {
	const volumes = await client.fetch<VolumeListItem[]>(allVolumesQuery);

	return (
		<div className="bg-white min-h-screen w-full flex flex-col items-center">
			<Nav />

			<div className="w-full max-w-[1280px] px-4 sm:px-6 lg:px-24 py-4">
				<h1
					className="text-[32px] font-semibold text-black"
					style={{fontFamily: 'var(--font-source-serif-pro)'}}
				>
					Volumes
				</h1>
			</div>

			<ReadVolumeCTA />

			<div className="w-full max-w-[1280px] px-4 sm:px-6 lg:px-24 pb-8">
				<div className="flex flex-col">
					{volumes.map((volume, index) => (
						<div key={volume._id}>
							<Link
								href={`/volumes/${volume.number}`}
								className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-4 group"
							>
								<p
									className="text-[16px] text-[var(--color-text-secondary)] leading-6"
									style={{
										fontFamily: 'var(--font-source-serif-pro)',
									}}
								>
									{volume.year}
								</p>
								<div className="flex flex-col gap-1">
									<h3
										className="text-[24px] font-semibold text-black group-hover:underline"
										style={{
											fontFamily:
												'var(--font-source-serif-pro)',
										}}
									>
										Volume {volume.number}
									</h3>
									<p
										className="text-[16px] text-[var(--color-accent)] font-medium"
										style={{fontFamily: 'var(--font-poppins)'}}
									>
										The {ordinal(volume.number)} Editorial Board
									</p>
									{volume.eics && (
										<p
											className="text-[16px] text-[var(--color-text-secondary)] leading-6"
											style={{
												fontFamily:
													'var(--font-source-serif-pro)',
											}}
										>
											{volume.eics},{' '}
											<em>Editor-in-Chief</em>
										</p>
									)}
								</div>
							</Link>
							{index < volumes.length - 1 && (
								<div className="h-px bg-[var(--color-tertiary)] my-6"></div>
							)}
						</div>
					))}
				</div>
			</div>

			<Footer />
		</div>
	);
}
