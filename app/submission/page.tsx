import Nav from '../components/Nav';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';

interface SectionProps {
	id: string;
	title: string;
	isSubsection?: boolean;
	children: React.ReactNode;
}

function Section({ id, title, isSubsection = false, children }: SectionProps) {
	return (
		<section id={id} className="scroll-mt-24 flex flex-col gap-2">
			<h2
				className={`${
					isSubsection
						? 'font-poppins font-semibold text-[18px] text-accent'
						: 'font-source-serif-pro font-semibold text-[24px] text-black'
				}`}
			>
				{title}
			</h2>
			<div className="font-source-serif-pro text-base text-black">
				{children}
			</div>
		</section>
	);
}

export default function SubmissionsPage() {
	return (
		<div className="min-h-screen flex flex-col">
			<Nav />

			{/* Masthead */}
			<div className="px-24 py-4">
				<h1 className="font-source-serif-pro font-semibold text-[32px] text-black">
					Submission
				</h1>
			</div>

			{/* Divider */}
			<div className="mx-24 border-t border-tertiary" />

			{/* Main Content */}
			<div className="px-24 py-8">
				<div className="grid grid-cols-[1fr_272px] gap-24">
					{/* Left Column - Main Content */}
					<div className="flex flex-col gap-6">
						<Section id="journal-articles" title="Journal Articles">
							<p>
								A Priori, Brown University&apos;s undergraduate
								journal of philosophy, is an annual review of
								the best essays from all branches of philosophy
								written by undergraduates. Our journal publishes
								one volume per academic year, fielding
								submissions from undergraduates around the
								world.
							</p>
							<p className="mt-4">
								We seek to publish exceptional articles in the
								philosophical discipline at large. The journal
								especially encourages submissions addressing
								topics on the margins of traditional analytical
								philosophy, including essays on philosophy of
								race, philosophy of gender, and non-Western
								philosophy. We are furthermore committed to
								highlighting the work of students from groups
								underrepresented in philosophy.
							</p>
						</Section>

						<Section id="process" title="Process" isSubsection>
							<p>
								Submissions are open in the fall semester of
								every academic year. The deadline to submit is
								roughly during the winter. We encourage all
								potential authors who are interested in
								publishing under our yearly volume to plan
								ahead.
							</p>
							<p className="mt-4">
								Decisions regarding the outcome of the
								submission are released 6–8 weeks after
								submissions close.
							</p>
							<p className="mt-4">
								The Editorial Board of <em>A Priori</em> applies
								a double-blind review process for its screening
								process. Successful articles will go through a
								developmental edit phase, where our editors will
								work in conjunction with authors to further
								develop the arguments raised in the paper.
							</p>
						</Section>

						<Section
							id="eligibility"
							title="Eligibility"
							isSubsection
						>
							<p>
								Our journal currently only accepts submissions
								from individuals who meet our eligibility
								requirements:
							</p>
							<ul className="list-disc ml-6 mt-4">
								<li>
									Must be an actively enrolled in a
									degree-granting undergraduate program at
									time of submission
								</li>
								<li>
									Students from community colleges are
									encouraged to submit
								</li>
								<li>
									If co-authored, all listed authors must be
									an undergraduate student
								</li>
							</ul>
						</Section>

						<Section
							id="generative-ai"
							title="Use of Generative AI"
							isSubsection
						>
							<p>
								The use of generative AI in submissions is
								grounds for rejection. If we find it to be
								excessive or have questions about the
								originality of your work, we will reach out to
								clarify, or (in extreme cases) your submission
								may be rejected.
							</p>
						</Section>

						<Section
							id="requirements"
							title="Submission Requirements"
							isSubsection
						>
							<p>
								We request that all submissions adhere to the
								following specifications:
							</p>
							<ul className="list-disc ml-6 mt-4">
								<li>
									Submission is sufficiently philosophical in
									nature
								</li>
								<li>
									Work must be original and not published
									elsewhere
								</li>
								<li>
									Remove all identifiable information in the
									submission document itself
								</li>
								<li>
									Include an abstract of no more than 300
									words
								</li>
								<li>
									The word count should be from 1,000 to 8,000
									words (excluding the abstract)
								</li>
								<li>
									Upload the article as a{' '}
									<code className="font-mono text-accent">
										.docx
									</code>{' '}
									file
								</li>
								<li>
									(Preferred) Format citations and
									bibliography in the Chicago
									Notes-Bibliography style
								</li>
							</ul>
						</Section>

						<Section id="submit" title="Submit" isSubsection>
							<p>
								Submissions for <strong>Volume 11</strong> are
								currently open!
							</p>
							<p className="mt-4">
								The deadline to submit is{' '}
								<strong>February 13th, 2026</strong>. Please
								ensure you meet the eligibility and submission
								requirements prior to submission.
							</p>
							<p className="mt-4">
								Please contact{' '}
								<a
									href="mailto:a-priori@brown.edu"
									className="text-accent hover:underline"
								>
									a-priori@brown.edu
								</a>{' '}
								if you have any questions.
							</p>
							<a
								href="#"
								className="inline-flex items-center gap-4 border border-accent px-8 py-3 mt-4 text-accent font-poppins hover:bg-accent hover:text-white transition-colors"
							>
								Submit now
								<svg
									width="6"
									height="12"
									viewBox="0 0 6 12"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="mt-0.5"
								>
									<path
										d="M1 1L5 6L1 11"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</a>
						</Section>
					</div>

					<TableOfContents
						variant="submission"
						items={[
							{
								href: '#journal-articles',
								label: 'Journal Articles',
								children: [
									{ href: '#process', label: 'Process' },
									{
										href: '#eligibility',
										label: 'Eligibility',
									},
									{
										href: '#generative-ai',
										label: 'Use of Generative AI',
									},
									{
										href: '#requirements',
										label: 'Submission Requirements',
									},
									{ href: '#submit', label: 'Submit' },
								],
							},
						]}
					/>
				</div>
			</div>

			<Footer />
		</div>
	);
}
