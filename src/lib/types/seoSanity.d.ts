type SanitySeo = {
	_id: string;
	_type: 'seo';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	title: string;
	description: string;
	keywords: Array<string>;
	ogTitle: string;
	ogDescription: string;
	ogUrl: string;
	ogLocale: string;
	canonicalUrl: string;
	structuredDataDescription: string;
	alternateLanguage: string;
	alternateLanguageUrl: string;
	language: string;
};

interface ProcessedSeo {
	title: string;
	description: string;
	keywords: Array<string>;
	ogTitle: string;
	ogDescription: string;
	ogUrl: string;
	ogLocale: string;
	canonicalUrl: string;
	structuredDataDescription: string;
	alternateLanguage: string;
	alternateLanguageUrl: string;
	language: string;
}
