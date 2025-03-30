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
