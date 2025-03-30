import { createClient, type ClientConfig } from '@sanity/client';

const config: ClientConfig = {
	projectId: 'hogfexa0',
	dataset: 'production',
	apiVersion: '2024-01-01',
	useCdn: false
};

const sanityClient = createClient(config);
export default sanityClient;

export function processNavbarEntries(rawNavbar: SanityNavbar[]) {
	const processedNavbar: ProcessedNavbar[] = rawNavbar.map((navbar) => {
		return {
			navbar: navbar.navbar,
			mainLink: navbar.mainLink,
			copyrightText: navbar.copyrightText,
			language: navbar.language
		};
	});
	return processedNavbar;
}
