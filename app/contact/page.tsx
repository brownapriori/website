'use client';

import { SiInstagram } from '@icons-pack/react-simple-icons';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';

export default function ContactPage() {
	return (
		<div className="bg-white min-h-screen w-full flex flex-col items-center">
			<Nav />

			{/* Masthead */}
			<div className="w-full max-w-[1280px] px-4 sm:px-6 lg:px-24 py-4">
				<h1
					className="text-[32px] font-semibold text-black"
					style={{ fontFamily: 'var(--font-source-serif-pro)' }}
				>
					Contact
				</h1>
			</div>

			{/* Divider */}
			<div className="w-full max-w-[1280px] px-4 sm:px-6 lg:px-24">
				<div className="h-px bg-[var(--color-tertiary)]"></div>
			</div>

			{/* Content */}
			<div className="w-full max-w-[1280px] px-4 sm:px-6 lg:px-24 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-[1fr_272px] gap-x-8 lg:gap-x-24 gap-y-6 items-start">
					{/* Left Column - Main Content */}
					<div className="order-2 lg:order-1 flex flex-col gap-6">
						{/* General Correspondence */}
						<Section
							id="general-correspondence"
							title="General Correspondence"
						>
							<p>
								For all inquiries, please contact{' '}
								<a
									href="mailto:a-priori@brown.edu"
									className="text-[var(--color-accent)] hover:underline"
								>
									a-priori@brown.edu
								</a>{' '}
								to reach our Editorial Board and operations
								team.
							</p>
							<p>
								While affiliated with Brown University and the
								Department of Philosophy, the journal does not
								handle inquiries regarding the university or the
								department. For matters pertaining to either,
								please contact the appropriate office directly.
							</p>
						</Section>

						{/* Mailing Address */}
						<Section id="mailing-address" title="Mailing Address">
							<div>
								Department of Philosophy
								<br />
								Brown University
								<br />
								Attn: The Editorial Board of{' '}
								<em
									style={{
										fontFamily:
											'var(--font-source-serif-pro)',
									}}
								>
									A Priori
								</em>
								<br />
								<br />
								Box 1918
								<br />
								45 Prospect St.
								<br />
								Providence, RI 02912
								<br />
								United States
							</div>
						</Section>
						{/* Follow Us */}
						<Section id="follow-us" title="Follow Us">
							<a
								href="https://www.instagram.com/brownapriori/"
								target="_blank"
								rel="noopener noreferrer"
								className="bg-[var(--color-bg-secondary)] inline-flex items-center gap-4 px-6 py-3 hover:bg-[var(--color-bg-secondary-hover)] transition-colors"
							>
								<SiInstagram size={24} />
								<span
									style={{
										fontFamily: 'var(--font-poppins)',
									}}
									className="text-[16px] text-black"
								>
									Instagram
								</span>
							</a>
						</Section>
					</div>

					<div className="order-1 lg:order-2">
						<TableOfContents
							items={[
								{
									href: '#general-correspondence',
									label: 'General Correspondence',
								},
								{
									href: '#mailing-address',
									label: 'Mailing Address',
								},
								{ href: '#follow-us', label: 'Follow Us' },
							]}
						/>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}

function Section({
	id,
	title,
	children,
}: {
	id: string;
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div id={id} className="flex flex-col gap-2 scroll-mt-24">
			<h3
				className="text-[18px] font-semibold text-[var(--color-accent)]"
				style={{ fontFamily: 'var(--font-poppins)' }}
			>
				{title}
			</h3>
			<div
				className="flex flex-col items-start gap-4 text-[16px] text-black leading-6"
				style={{ fontFamily: 'var(--font-source-serif-pro)' }}
			>
				{children}
			</div>
		</div>
	);
}
