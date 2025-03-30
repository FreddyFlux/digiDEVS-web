import { createClient, type ClientConfig } from '@sanity/client';

const config: ClientConfig = {
	projectId: 'hogfexa0',
	dataset: 'production',
	apiVersion: '2024-01-01',
	useCdn: false
};

const sanityClient = createClient(config);
export default sanityClient;

export function processAboutEntries(rawAboutSection: SanityAboutSection[]) {
	const processedAboutSection: ProcessedAboutSection[] = rawAboutSection.map((aboutSection) => {
		return {
			aboutText: aboutSection.aboutText,
			linkText: aboutSection.linkText,
			language: aboutSection.language
		};
	});
	return processedAboutSection;
}
