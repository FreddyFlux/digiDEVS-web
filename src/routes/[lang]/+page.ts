import sanityClient, { processNavbarEntries } from '$lib/utils/navbarSanity';
import { processAboutEntries } from '$lib/utils/aboutSanity';
import { processProjectEntries } from '$lib/utils/projectSanity';
import { processHeroText } from '$lib/utils/heroSanity';
import { processContactEntries } from '$lib/utils/contactSanity';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const lang = params.lang;

	const rawNavbar: SanityNavbar[] = await sanityClient.fetch(
		`*[_type == "navbar" && language == $lang]`,
		{ lang }
	);

	if (rawNavbar.length !== 1) {
		throw error(404, 'Page not found');
	}
	const nav = processNavbarEntries(rawNavbar)[0];

	const rawHeroText: SanityHeroText[] = await sanityClient.fetch(
		`*[_type == "heroText" && language == $lang]`,
		{ lang }
	);
	if (rawHeroText.length !== 1) {
		throw error(404, 'Page not found');
	}
	const heroText = processHeroText(rawHeroText)[0];

	const rawAboutSections: SanityAboutSection[] = await sanityClient.fetch(
		`*[_type == "about" && language == $lang]`,
		{ lang }
	);
	if (rawAboutSections.length !== 1) {
		throw error(404, 'Page not found');
	}
	const aboutSection = processAboutEntries(rawAboutSections)[0];

	const rawContactSections: SanityContact[] = await sanityClient.fetch(
		`*[_type == "contact" && language == $lang]`,
		{ lang }
	);
	if (rawAboutSections.length !== 1) {
		throw error(404, 'Page not found');
	}
	const contactSection = processContactEntries(rawContactSections)[0];

	const skills: Skill[] = await sanityClient.fetch(`*[_type == 'skills'][0].skillsList`);

	const rawProjects: SanityProject[] = await sanityClient.fetch(
		`*[_type == "project" && language == $lang]`,
		{ lang }
	);

	const projects = processProjectEntries(rawProjects);

	return {
		nav,
		heroText,
		aboutSection,
		projects,
		skills,
		contactSection
	};
};

// import type { PageLoad } from './$types';
// import sanityClient from '$lib/utils/projectSanity';
// import { processProjectEntries } from '$lib/utils/projectSanity';
// import { error } from '@sveltejs/kit';

// export const load: PageLoad = async ({ params }) => {
// 	const { lang } = params.lang;

// 	if (!lang) {
// 		throw error(404, 'Language not found');
// 	}

// 	const rawProjects: SanityProject[] = await sanityClient.fetch(
// 		"*[_type == 'project' && 'language == $lang ] | order(dateAccomplished desc)",
// 		{ lang }
// 	);

// 	const skills: Skill[] = await sanityClient.fetch(`*[_type == 'skills'][0].skillsList`);
// 	const projects = rawProjects.map(processProjectEntries);

// 	return {
// 		skills,
// 		projects
// 	};
// };
