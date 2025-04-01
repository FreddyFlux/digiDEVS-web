export function processSeoEntries(rawSeoSection: SanitySeo[]) {
	const processedSeoSection: ProcessedSeo[] = rawSeoSection.map((seoSection) => {
		return {
			title: seoSection.title,
			description: seoSection.description,
			keywords: seoSection.keywords,
			ogTitle: seoSection.ogTitle,
			ogDescription: seoSection.ogDescription,
			ogUrl: seoSection.ogUrl,
			ogLocale: seoSection.ogLocale,
			canonicalUrl: seoSection.canonicalUrl,
			structuredDataDescription: seoSection.structuredDataDescription,
			alternateLanguage: seoSection.alternateLanguage,
			alternateLanguageUrl: seoSection.alternateLanguageUrl,
			language: seoSection.language
		};
	});
	return processedSeoSection;
}
