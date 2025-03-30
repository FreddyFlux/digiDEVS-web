import { createClient, type ClientConfig } from '@sanity/client';

const config: ClientConfig = {
	projectId: 'hogfexa0',
	dataset: 'production',
	apiVersion: '2024-01-01',
	useCdn: false
};

const sanityClient = createClient(config);
export default sanityClient;

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
