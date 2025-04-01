import sanityClient from '$lib/utils/sanityHandler';
import { processSeoEntries } from '$lib/utils/seoSanity';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params }) => {
	const lang = params.lang;

	// Fetch SEO data from Sanity
	const rawSeoData = await sanityClient.fetch(`*[_type == "seo" && language == $lang]`, { lang });

	if (rawSeoData.length !== 1) {
		// Use default SEO if no specific SEO data found
		return {};
	}

	const seoData = processSeoEntries(rawSeoData)[0];

	return {
		seo: {
			title: seoData.title,
			description: seoData.description,
			keywords: seoData.keywords.join(', '),
			ogTitle: seoData.ogTitle,
			ogDescription: seoData.ogDescription,
			ogUrl: seoData.ogUrl,
			ogLocale: seoData.ogLocale,
			canonical: seoData.canonicalUrl,
			structuredData: {
				'@context': 'https://schema.org',
				'@type': 'WebSite',
				description: seoData.structuredDataDescription
			},
			alternateLanguages: seoData.alternateLanguage
				? { [seoData.alternateLanguage]: seoData.alternateLanguageUrl }
				: {}
		}
	};
};
