export function processContactEntries(rawContact: SanityContact[]) {
	const processedContact: ProcessedContact[] = rawContact.map((contact) => {
		return {
			contactHeadline: contact.contactHeadline,
			contactTitle: contact.contactTitle,
			contactText: contact.contactText,
			namePlaceholder: contact.namePlaceholder,
			emailPlaceholder: contact.emailPlaceholder,
			messagePlaceholder: contact.messagePlaceholder,
			sentMessage: contact.sentMessage,
			loadingMessage: contact.loadingMessage,
			errorMessage: contact.errorMessage,
			contactLinkText: contact.contactLinkText,
			language: contact.language
		};
	});
	return processedContact;
}
