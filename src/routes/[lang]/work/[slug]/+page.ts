import sanityClient from '$lib/utils/sanityHandler';
import { processProjectEntries } from '$lib/utils/projectSanity';
import { processNavbarEntries } from '$lib/utils/navbarSanity';

import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const lang = params.lang;
	const slug = params.slug;

	const rawNavbar: SanityNavbar[] = await sanityClient.fetch(
		`*[_type == "navbar" && language == $lang]`,
		{ lang }
	);

	if (rawNavbar.length !== 1) {
		throw error(404, 'Page not found');
	}
	const nav = processNavbarEntries(rawNavbar)[0];

	const rawProjects: SanityProject[] = await sanityClient.fetch(
		`*[_type == "project" && language == $lang && slug == $slug]`,
		{ lang, slug }
	);

	if (rawProjects.length !== 1) {
		throw error(404, 'Project not found');
	}

	const project = processProjectEntries(rawProjects);

	return {
		project,
		nav
	};
};
