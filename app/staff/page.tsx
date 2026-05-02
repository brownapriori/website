import type {Metadata} from 'next';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import {client} from '@/sanity/lib/client';
import {rolesQuery, type Role} from '@/sanity/queries/staff';
import {mastheadOrdinalQuery} from '@/sanity/queries/settings';
import {absoluteUrl, createBreadcrumbJsonLd, createPageMetadata, JsonLd} from '../seo';

export const metadata: Metadata = createPageMetadata({
	title: 'Masthead',
	description:
		'Meet the editorial board and staff of A Priori, Brown University undergraduate journal of philosophy.',
	path: '/staff',
});

function compareByLastName(a: string, b: string) {
	const lastName = (name: string) => name.trim().split(/\s+/).at(-1) ?? '';
	const byLast = lastName(a).localeCompare(lastName(b));
	if (byLast !== 0) return byLast;
	return a.localeCompare(b);
}

function groupByHierarchy(roles: Role[]) {
	const byHierarchy = new Map<number, Role[]>();
	for (const role of roles) {
		const key = typeof role.hierarchy === 'number' ? role.hierarchy : Number.MAX_SAFE_INTEGER;
		const bucket = byHierarchy.get(key);
		if (bucket) bucket.push(role);
		else byHierarchy.set(key, [role]);
	}
	return [...byHierarchy.entries()]
		.sort((a, b) => a[0] - b[0])
		.map(([, group]) => group);
}

export default async function StaffPage() {
	const [roles, mastheadOrdinal] = await Promise.all([
		client.fetch<Role[]>(rolesQuery),
		client.fetch<string | null>(mastheadOrdinalQuery),
	]);

	const rolesWithMembers = roles
		.filter(r => r.members && r.members.length > 0)
		.map(r => ({...r, members: [...(r.members ?? [])].sort(compareByLastName)}));

	const sectionsByHierarchy = groupByHierarchy(rolesWithMembers);

	const breadcrumbJsonLd = createBreadcrumbJsonLd([
		{name: 'Home', url: absoluteUrl('/')},
		{name: 'Masthead', url: absoluteUrl('/staff')},
	]);

	return (
		<div className="bg-white min-h-screen w-full flex flex-col items-center">
			<JsonLd data={breadcrumbJsonLd} />
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
						style={{ fontFamily: 'var(--font-source-serif-pro)' }}
					>
						{mastheadOrdinal ? `The ${mastheadOrdinal} Editorial Board` : 'The Editorial Board'}
					</h2>

					<div className="flex flex-col gap-8 mt-6">
						{sectionsByHierarchy.map((group, groupIndex) => (
							<div
								key={`hierarchy-group-${groupIndex}`}
								className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 items-start"
							>
								{group.map(section => (
									<StaffSection key={section._id} title={section.title}>
										{section.members!.map(name => (
											<StaffMember key={`${section._id}-${name}`} name={name} />
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

function StaffSection({ title, children }: { title: string; children: React.ReactNode }) {
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
