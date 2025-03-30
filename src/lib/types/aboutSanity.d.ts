type SanityAboutSection = {
	_id: string;
	_type: 'about';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	aboutText: Array<string>;
	linkText: string;
	language: string;
};

interface ProcessedAboutSection {
	aboutText: Array<string>;
	linkText: string;
	language: string;
}
