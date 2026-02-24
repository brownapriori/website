'use client';

import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function StaffPage() {
	return (
		<div className="bg-white min-h-screen w-full flex flex-col items-center">
			<Nav />

			{/* Masthead */}
			<div className="w-full max-w-[1280px] px-4 sm:px-6 lg:px-24 py-4">
				<h1
					className="text-[32px] font-semibold text-black"
					style={{ fontFamily: 'var(--font-source-serif-pro)' }}
				>
					Masthead
				</h1>
			</div>

			{/* Divider */}
			<div className="w-full max-w-[1280px] px-4 sm:px-6 lg:px-24">
				<div className="h-px bg-[var(--color-tertiary)]"></div>
			</div>

			{/* Staff Content */}
			<div className="w-full max-w-[1280px] px-4 sm:px-6 lg:px-24 py-8">
				<div className="flex flex-col gap-2">
					<h2
						className="text-[20px] font-semibold text-black"
						style={{
							fontFamily: 'var(--font-source-serif-pro)',
						}}
					>
						The 6th Editorial Board
					</h2>

					{/* Staff Grid - Row-based layout */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 mt-6 items-start">
						{/* Row 1: Editors-in-Chief */}
						<StaffSection title="Editors-in-Chief">
							<StaffMember name="Austin Smart" />
							<StaffMember name="Peter Haynes" />
							<StaffMember name="Steve Nam" />
						</StaffSection>

						<div className="hidden lg:block col-span-2"></div>

						{/* Row 2: Readers, Developmental Editors, Line Editors */}
						<StaffSection title="Readers">
							<StaffMember name="Gavin Li" />
							<StaffMember name="Henry Roden" />
							<StaffMember name="Ziyi Ye" />
							<StaffMember name="Eric Wu" />
							<StaffMember name="Simon Beil" />
							<StaffMember name="Avery Kaak" />
							<StaffMember name="Gabriel Gonzalez" />
							<StaffMember name="Edward Ho" />
							<StaffMember name="Jason Mao" />
							<StaffMember name="Sophia Barki" />
							<StaffMember name="Maria Kim" />
							<StaffMember name="Charles Luke" />
							<StaffMember name="Mansie Bennett" />
							<StaffMember name="Atiksh Gupta" />
							<StaffMember name="Jeffrey Kunzweiler" />
							<StaffMember name="Eduardo Michelsen" />
						</StaffSection>

						<StaffSection title="Developmental Editors">
							<StaffMember name="Ziyi Ye" />
							<StaffMember name="Eric Wu" />
							<StaffMember name="Edward Ho" />
							<StaffMember name="Jason Mao" />
							<StaffMember name="Romi Bhatia" />
							<StaffMember name="Maria Kim" />
							<StaffMember name="Charles Luke" />
							<StaffMember name="Mansie Bennett" />
							<StaffMember name="Charles Lebwohl" />
							<StaffMember name="Atiksh Gupta" />
							<StaffMember name="Jeffrey Kunzweiler" />
						</StaffSection>

						<StaffSection title="Line Editors">
							<StaffMember name="Alexander Chow" />
							<StaffMember name="Henry Roden" />
							<StaffMember name="Avery Kaak" />
							<StaffMember name="Lily Luby" />
							<StaffMember name="Jason Mao" />
							<StaffMember name="Sophia Barki" />
							<StaffMember name="Mansie Bennett" />
							<StaffMember name="Janine Ren" />
							<StaffMember name="Zachary Woltanski" />
						</StaffSection>

						{/* Row 3: Copy Editors */}
						<StaffSection title="Copy Editors">
							<StaffMember name="Henry Roden" />
							<StaffMember name="Bryanna Gonzalez" />
							<StaffMember name="Mansie Bennett" />
							<StaffMember name="Daniel Mun" />
							<StaffMember name="Janine Ren" />
							<StaffMember name="Zachary Woltanski" />
							<StaffMember name="Gavin Li" />
						</StaffSection>

						<div className="hidden lg:block col-span-2"></div>

						{/* Row 4: Production, Social Media, Technology */}
						<StaffSection title="Production">
							<StaffMember name="Bryanna Gonzalez" />
							<StaffMember name="Elena Ko" />
						</StaffSection>

						<StaffSection title="Social Media">
							<StaffMember name="Emerson Rhodes" />
						</StaffSection>

						<StaffSection title="Technology">
							<StaffMember name="Eric Wu" />
						</StaffSection>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}

function StaffSection({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col">
			<h3
				className="text-[18px] font-semibold text-[var(--color-accent)] mb-1"
				style={{ fontFamily: 'var(--font-poppins)' }}
			>
				{title}
			</h3>
			<div className="flex flex-col">{children}</div>
		</div>
	);
}

function StaffMember({ name }: { name: string }) {
	return (
		<p
			className="text-[16px] text-black leading-6"
			style={{ fontFamily: 'var(--font-source-serif-pro)' }}
		>
			{name}
		</p>
	);
}
