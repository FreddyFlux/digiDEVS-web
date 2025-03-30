import imageUrlBuilder from '@sanity/image-url';
import sanityClient from '$lib/utils/sanityHandler';

export function processProjectEntries(rawProjects: SanityProject[]) {
	const builder = imageUrlBuilder(sanityClient);

	const processedProjects = rawProjects.map((project) => {
		// Helper function to safely process image URLs
		const getImageUrl = (image: { asset?: { _ref: string; _type: string } }) => {
			try {
				return builder.image(image).url();
			} catch (error) {
				console.warn('Failed to process image URL:', error);
				return null;
			}
		};

		const projectImageUrl = getImageUrl(project.image);

		return {
			name: project.name,
			company: project.company,
			dateAccomplished: project.dateAccomplished,
			stack: project.stack,
			projectImageUrl: projectImageUrl || null,
			slug: project.slug,
			content: project.content.map(processProjectsContent),
			urlLink: project.urlLink,
			language: project.language
		};
	});

	return processedProjects;
}

function processProjectsContent(content: RawTextContent | RawImageContent) {
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
