'use client';

import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ReadVolumeCTA from '../components/ReadVolumeCTA';

// Sample volumes data
const volumes = [
	{
		id: 1,
		title: 'Volume 6',
		author: 'The 6th Editorial Board',
		date: '2024',
		editors: 'Sarah Johnson, Michael Chen, Emily Rodriguez',
		editorsTitle: 'Editors-in-Chief',
	},
	{
		id: 2,
		title: 'Volume 5',
		author: 'The 5th Editorial Board',
		date: '2023',
		editors: 'David Martinez, Jessica Wu',
		editorsTitle: 'Editors-in-Chief',
	},
	{
		id: 3,
		title: 'Volume 4',
		author: 'The 4th Editorial Board',
		date: '2022',
		editors: 'Amanda Thompson',
		editorsTitle: 'Editor-in-Chief',
	},
	{
		id: 4,
		title: 'Volume 3',
		author: 'The 3rd Editorial Board',
		date: '2021',
		editors: 'Robert Kim, Lisa Anderson, James Brown',
		editorsTitle: 'Editors-in-Chief',
	},
];

export default function VolumesPage() {
	return (
		<div className="bg-white min-h-screen w-full flex flex-col items-center">
			<Nav />

			{/* Page Title */}
			<div className="w-full max-w-[1280px] px-4 sm:px-6 lg:px-24 py-4">
				<h1
					className="text-[32px] font-semibold text-black"
					style={{ fontFamily: 'var(--font-source-serif-pro)' }}
				>
					Volumes
				</h1>
			</div>

			{/* Read Volume CTA */}
			<ReadVolumeCTA />

			{/* Volumes List */}
			<div className="w-full max-w-[1280px] px-4 sm:px-6 lg:px-24 pb-8">
				<div className="flex flex-col">
					{volumes.map((volume, index) => (
						<div key={volume.id}>
							<div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-4">
								<p
									className="text-[16px] text-[var(--color-text-secondary)] leading-6"
									style={{
										fontFamily:
											'var(--font-source-serif-pro)',
									}}
								>
									{volume.date}
								</p>
								<div className="flex flex-col gap-1">
									<h3
										className="text-[24px] font-semibold text-black"
										style={{
											fontFamily:
												'var(--font-source-serif-pro)',
										}}
									>
										{volume.title}
									</h3>
									<p
										className="text-[16px] text-[var(--color-accent)] font-medium"
										style={{
											fontFamily: 'var(--font-poppins)',
										}}
									>
										{volume.author}
									</p>
									<p
										className="text-[16px] text-[var(--color-text-secondary)] leading-6"
										style={{
											fontFamily:
												'var(--font-source-serif-pro)',
										}}
									>
										{volume.editors},{' '}
										<em>{volume.editorsTitle}</em>
									</p>
								</div>
							</div>
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
