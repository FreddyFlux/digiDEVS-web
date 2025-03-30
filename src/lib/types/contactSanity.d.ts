type SanityContact = {
	_id: string;
	_type: 'contact';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	contactHeadline: string;
	contactTitle: string;
	contactText: Array<string>;
	namePlaceholder: string;
	emailPlaceholder: string;
	messagePlaceholder: string;
	sentMessage: string;
	loadingMessage: string;
	errorMessage: string;
	contactLinkText: string;
	language: string;
};

interface ProcessedContact {
	contactHeadline: string;
	contactTitle: string;
	contactText: Array<string>;
	namePlaceholder: string;
	emailPlaceholder: string;
	messagePlaceholder: string;
	sentMessage: string;
	loadingMessage: string;
	errorMessage: string;
	contactLinkText: string;
	language: string;
}
