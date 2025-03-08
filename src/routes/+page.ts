import type { PageLoad } from './$types';
import sanityClient from '$lib/utils/sanity';
import { processProjectEntries } from '$lib/utils/sanity';
export const load: PageLoad = async () => {
	const rawProjects: SanityProject[] = await sanityClient.fetch(
		"*[_type == 'project'] | order(dateAccomplished desc)"
	);

	const skills: Skill[] = await sanityClient.fetch(`*[_type == 'skills'][0].skillsList`);
	const projects = rawProjects.map(processProjectEntries);

	return {
		skills,
		projects
	};
};
