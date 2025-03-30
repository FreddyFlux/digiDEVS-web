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
