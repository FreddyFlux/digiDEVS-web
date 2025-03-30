type SanityHeroText = {
	_id: string;
	_type: 'heroText';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	staticText: string;
	dynamicText: Array<string>;
	language: string;
};

interface ProcessedHeroText {
	staticText: string;
	dynamicText: Array<string>;
	language: string;
}
