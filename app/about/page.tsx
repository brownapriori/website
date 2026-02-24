'use client';

import Link from 'next/link';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';

export default function AboutPage() {
	return (
		<div className="bg-white min-h-screen w-full flex flex-col items-center">
			<Nav />

			{/* Masthead */}
			<div className="w-full max-w-[1280px] px-24 py-4">
				<h1
					className="text-[32px] font-semibold text-black"
					style={{ fontFamily: 'var(--font-source-serif-pro)' }}
				>
					About
				</h1>
			</div>

			{/* Divider */}
			<div className="w-full max-w-[1280px] px-24">
				<div className="h-px bg-[var(--color-tertiary)]"></div>
			</div>

			{/* Content */}
			<div className="w-full max-w-[1280px] px-24 py-8">
				<div className="grid grid-cols-[1fr_272px] gap-x-24 gap-y-6 items-start">
					{/* Left Column - Main Content */}
					<div className="flex flex-col gap-6">
						{/* Mission Statement */}
						<Section
							id="mission-statement"
							title="Mission Statement"
						>
							<p>
								<em
									style={{
										fontFamily:
											'var(--font-source-serif-pro)',
									}}
								>
									A Priori
								</em>{' '}
								is Brown University's undergraduate journal of
								philosophy. Published annually, the journal
								features outstanding philosophical work written
								by undergraduates from institutions around the
								world. We aim to showcase rigorous, original
								scholarship across all areas of philosophy and
								to provide a serious venue for emerging voices
								in the discipline.
							</p>
							<p>
								Through careful editorial review and selection,
								our journal seeks to recognize and promote
								exceptional undergraduate research that
								demonstrates clarity of argument, intellectual
								depth, and meaningful engagement with
								philosophical questions.
							</p>
						</Section>

						{/* Affiliation */}
						<Section id="affiliation" title="Affiliation">
							<p>
								<em
									style={{
										fontFamily:
											'var(--font-source-serif-pro)',
									}}
								>
									A Priori
								</em>{' '}
								is affiliated with Brown University and the
								Department of Philosophy. The journal operates
								with the support and funding of the department,
								and reflects its commitment to rigorous
								philosophical inquiry and undergraduate
								scholarship.
							</p>
							<p>
								The journal does not handle inquiries regarding
								the university or the department. Please contact
								those respective offices for concerns pertaining
								to those.
							</p>
						</Section>

						{/* The Editorial Board */}
						<Section
							id="editorial-board"
							title="The Editorial Board"
						>
							<p>
								The Editorial Board is composed annually of
								students and advisors from Brown University. The
								Editors-in-Chief oversee the Board's work,
								coordinate the review process, guide editorial
								deliberation, and ensure the integrity and
								quality of each volume.
							</p>
							<p>
								Board members are responsible for evaluating
								submissions through a structured review process,
								providing substantive feedback, and upholding
								the journal's standards of philosophical rigor,
								fairness, and intellectual seriousness.
							</p>
							<p>
								A full list of our Board members are available
								under our{' '}
								<Link
									href="/staff"
									className="text-[var(--color-accent)] hover:underline"
								>
									Masthead
								</Link>
								. All web-related inquiries should be directed
								to the Technology team.
							</p>
						</Section>

						{/* Value Statement */}
						<Section id="value-statement" title="Value Statement">
							<p>
								<em
									style={{
										fontFamily:
											'var(--font-source-serif-pro)',
									}}
								>
									A Priori
								</em>{' '}
								is committed to philosophical excellence across
								traditions and methodologies. While we welcome
								submissions from all branches of philosophy, we
								are particularly attentive to work that expands
								the boundaries of traditional analytic
								discourse, including scholarship in philosophy
								of race, philosophy of gender, and non-Western
								philosophical traditions.
							</p>
							<p>
								We value intellectual rigor, openness to diverse
								philosophical perspectives, and sustained
								engagement with questions that shape both the
								discipline and the broader world. The journal is
								also committed to amplifying the work of
								students from groups historically
								underrepresented in philosophy, and to fostering
								a publication space that reflects the breadth
								and diversity of philosophical inquiry today.
							</p>
						</Section>
					</div>

					<TableOfContents
						items={[
							{
								href: '#mission-statement',
								label: 'Mission Statement',
							},
							{ href: '#affiliation', label: 'Affiliation' },
							{
								href: '#editorial-board',
								label: 'The Editorial Board',
							},
							{
								href: '#value-statement',
								label: 'Value Statement',
							},
						]}
					/>
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
				className="flex flex-col gap-4 text-[16px] text-black leading-6"
				style={{ fontFamily: 'var(--font-source-serif-pro)' }}
			>
				{children}
			</div>
		</div>
	);
}
