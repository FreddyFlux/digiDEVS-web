import { createClient, type ClientConfig } from '@sanity/client';

const config: ClientConfig = {
	projectId: 'hogfexa0',
	dataset: 'production',
	apiVersion: '2024-01-01',
	useCdn: false
};

const sanityClient = createClient(config);
export default sanityClient;

export function processHeroText(rawHeroText: SanityHeroText[]): ProcessedHeroText[] {
	const processedHeroText: ProcessedHeroText[] = rawHeroText.map((heroText) => {
		return {
			staticText: heroText.staticText,
			dynamicText: heroText.dynamicText,
			language: heroText.language
		};
	});
	return processedHeroText;
}
