import { createClient, type ClientConfig } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const config: ClientConfig = {
	projectId: 'hogfexa0',
	dataset: 'production',
	apiVersion: '2024-01-01',
	useCdn: false
};

const sanityClient = createClient(config);
export default sanityClient;

export function processProjectEntries(rawProject: SanityProject) {
	const builder = imageUrlBuilder(sanityClient);
	const projectImageUrl = builder.image(rawProject.image).url();

	const processedProject: ProcessedProject = {
		name: rawProject.name,
		company: rawProject.company,
		dateAccomplished: rawProject.dateAccomplished,
		stack: rawProject.stack,
		slug: rawProject.slug,
		urlLink: rawProject.urlLink,
		projectImageUrl,
		// content: Array<ProcessedTextContent | ProcessedImageContent>;
		content: rawProject.content.map(processProjectContent)
	};

	return processedProject;
}

function processProjectContent(content: RawTextContent | RawImageContent) {
	// process text content
	if (content._type === 'block') {
		const processedTextContent: ProcessedTextContent = {
			type: 'text',
			style: content.style,
			textToRender: content.children.map((elem) => elem.text).join('\n')
		};
		return processedTextContent;
	} else {
		// process image content
		const builder = imageUrlBuilder(sanityClient);
		const projectImageUrl = builder.image(content).url();

		const processedImage: ProcessedImageContent = {
			type: 'image',
			url: projectImageUrl
		};
		return processedImage;
	}
}
