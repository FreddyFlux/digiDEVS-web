<script lang="ts">
	import { Button, Navbar } from '$components';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	interface Props {
		data: {
			project: ProcessedProject[];
			nav: ProcessedNavbar;
		};
		lang: string;
	}

	let { data, lang }: Props = $props();

	const { company, name, dateAccomplished, stack, projectImageUrl, content, urlLink } =
		data.project[0];

	function getTagFromStyle(style: ProcessedTextContent['style']): string {
		if (style === 'normal') {
			return 'p';
		} else {
			return style;
		}
	}

	// References to elements we want to animate
	let companyEl: HTMLElement;
	let nameEl: HTMLElement;
	let projectImageEl: HTMLImageElement;
	let dateHeadingEl: HTMLHeadingElement;
	let dateValueEl: HTMLParagraphElement;
	let techStackHeadingEl: HTMLHeadingElement;
	let skillsListEl: HTMLUListElement;
	let contentBlocksEl: HTMLElement[] = [];

	onMount(() => {
		// Initially hide all elements
		gsap.set(
			[
				companyEl,
				nameEl,
				projectImageEl,
				dateHeadingEl,
				dateValueEl,
				techStackHeadingEl,
				skillsListEl.querySelectorAll('li')
			],
			{ autoAlpha: 0, y: 20 }
		);

		// Hide content blocks
		gsap.set(contentBlocksEl, { autoAlpha: 0, y: 20 });

		// Create timeline for sequential animations
		const tl = gsap.timeline({ defaults: { duration: 0.7, ease: 'power3.out' } });

		// Add animations in sequence
		tl.to(companyEl, { autoAlpha: 1, y: 0 })
			.to(nameEl, { autoAlpha: 1, y: 0 }, '-=0.6')
			.to(projectImageEl, { autoAlpha: 1, y: 0 }, '-=0.5')
			// Start date and content animations sooner with overlap
			.to(dateHeadingEl, { autoAlpha: 1, y: 0 }, '-=0.3') // Overlap with project image
			.to(dateValueEl, { autoAlpha: 1, y: 0 }, '-=0.4')
			// Animate content blocks with overlap
			.to(
				contentBlocksEl,
				{
					autoAlpha: 1,
					y: 0,
					stagger: 0.2
				},
				'-=0.6' // Start content blocks earlier, overlapping with date heading
			)
			.to(techStackHeadingEl, { autoAlpha: 1, y: 0 }, '-=2') // Changed from +=0.4 to -=0.1 to start sooner
			.to(
				skillsListEl.querySelectorAll('li'),
				{
					autoAlpha: 1,
					y: 0,
					stagger: 0.1 // Stagger the animations for each list item
				},
				'-=1.8'
			);
	});
</script>

<Navbar {data} {lang} />
<main class="default-margin work-page">
	<h4 class="mt-m" bind:this={companyEl}>{company}</h4>
	<div class="underscore mb-s"></div>
	<h2 class="mb-s" bind:this={nameEl}>{name}</h2>
	<img
		bind:this={projectImageEl}
		src={projectImageUrl}
		alt={`Picture of work done for ${company}`}
		class="project-image"
	/>
	<div class="project-container mt-m">
		<div class="meta-data mt-m">
			<div class="meta-data-date">
				<h3 class="semi-bold" bind:this={dateHeadingEl}>Date</h3>
				<p bind:this={dateValueEl}>{dateAccomplished.slice(0, 7)}</p>
			</div>
			<div class="meta-data-tech-stack">
				<h4 class="semi-bold" bind:this={techStackHeadingEl}>Tech Stack</h4>
				<ul bind:this={skillsListEl}>
					{#each stack as skill}
						<li>{skill}</li>
					{/each}
				</ul>
			</div>
		</div>
		<div class="project-text mt-m">
			{#each content as block, i}
				{#if block.type === 'text'}
					<svelte:element this={getTagFromStyle(block.style)} bind:this={contentBlocksEl[i]}
						>{block.textToRender}</svelte:element
					>
				{:else}
					<img class="content-image" src={block.url} alt="" bind:this={contentBlocksEl[i]} />
				{/if}
			{/each}
			<Button
				className="mt-m"
				onclick={() => {
					window.location.href = urlLink;
				}}
			>
				Besøk nettsiden
			</Button>
		</div>
	</div>
</main>

<style>
	.work-page {
		padding-top: 8rem;
		padding-bottom: 14rem;
	}

	.project-image {
		width: 100%;
		max-height: 45rem;
		object-fit: cover;
	}

	.content-image {
		width: 100%;
	}

	.project-container {
		display: flex;
	}

	@media screen and (max-width: 56.25em) {
		.project-container {
			flex-direction: column;
		}
	}

	.meta-data {
		min-width: 20rem;
	}

	@media screen and (max-width: 56.25em) {
		.meta-data {
			display: flex;
			justify-content: space-evenly;
		}
	}

	.meta-data-tech-stack {
		margin-top: 2rem;
	}

	@media screen and (max-width: 56.25em) {
		.meta-data-tech-stack {
			margin-top: 0;
		}
	}

	.project-text p {
		margin-bottom: 2rem;
	}

	.project-text h2 {
		margin-bottom: 3rem;
	}

	.project-text h4 {
		margin-bottom: 1rem;
	}
</style>
