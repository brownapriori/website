import Nav from '../components/Nav';
import Footer from '../components/Footer';
import {client} from '@/sanity/lib/client';
import {rolesQuery, staffQuery, type Role, type StaffDoc} from '@/sanity/queries/staff';

function splitNameParts(name: string) {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	const lastName = parts.length ? parts[parts.length - 1] : '';
	const firstNames = parts.length > 1 ? parts.slice(0, -1).join(' ') : '';
	return {lastName, firstNames};
}

function compareByLastName(a: string, b: string) {
	const aParts = splitNameParts(a);
	const bParts = splitNameParts(b);

	const byLast = aParts.lastName.localeCompare(bParts.lastName);
	if (byLast !== 0) return byLast;

	const byFirst = aParts.firstNames.localeCompare(bParts.firstNames);
	if (byFirst !== 0) return byFirst;

	return a.localeCompare(b);
}

async function getStaffSections() {
	const [roles, staff] = await Promise.all([
		client.fetch<Role[]>(rolesQuery),
		client.fetch<StaffDoc[]>(staffQuery),
	]);

	const sections = roles.map(role => ({
		...role,
		names: [] as string[],
	}));

	const roleIndex = new Map(sections.map((role, idx) => [role._id, idx]));

	for (const person of staff) {
		const roleIds = new Set<string>();
		if (person.role?._id) roleIds.add(person.role._id);
		for (const r of person.roles || []) {
			if (r?._id) roleIds.add(r._id);
		}

		for (const roleId of roleIds) {
			const idx = roleIndex.get(roleId);
			if (idx === undefined) continue;
			sections[idx].names.push(person.name);
		}
	}

	for (const section of sections) {
		section.names.sort(compareByLastName);
	}

	return sections.filter(section => section.names.length > 0);
}

function groupSectionsByHierarchy(
	sections: Array<Role & { names: string[] }>,
) {
	const byHierarchy = new Map<number, Array<Role & { names: string[] }>>();

	for (const section of sections) {
		const hierarchy =
			typeof section.hierarchy === 'number'
				? section.hierarchy
				: Number.MAX_SAFE_INTEGER;
		const bucket = byHierarchy.get(hierarchy);
		if (bucket) {
			bucket.push(section);
		} else {
			byHierarchy.set(hierarchy, [section]);
		}
	}

	return [...byHierarchy.entries()]
		.sort((a, b) => a[0] - b[0])
		.map(([, groupedSections]) => groupedSections);
}

export default async function StaffPage() {
	const sections = await getStaffSections();
	const sectionsByHierarchy = groupSectionsByHierarchy(sections);

	return (
		<div className="bg-white min-h-screen w-full flex flex-col items-center">
			<Nav />

			<div className="w-full max-w-[1280px] px-4 sm:px-6 lg:px-24 py-4">
				<h1
					className="text-[32px] font-semibold text-black"
					style={{ fontFamily: 'var(--font-source-serif-pro)' }}
				>
					Masthead
				</h1>
			</div>

			<div className="w-full max-w-[1280px] px-4 sm:px-6 lg:px-24">
				<div className="h-px bg-[var(--color-tertiary)]"></div>
			</div>

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

					<div className="flex flex-col gap-8 mt-6">
						{sectionsByHierarchy.map((hierarchySections, groupIndex) => (
							<div
								key={`hierarchy-group-${groupIndex}`}
								className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 items-start"
							>
								{hierarchySections.map(section => (
									<StaffSection key={section._id} title={section.title}>
										{section.names.map(name => (
											<StaffMember
												key={`${section._id}-${name}`}
												name={name}
											/>
										))}
									</StaffSection>
								))}
							</div>
						))}
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
