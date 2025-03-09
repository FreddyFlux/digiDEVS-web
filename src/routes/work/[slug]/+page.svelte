<script lang="ts">
	import { Button } from '$components';
	import { goto } from '$app/navigation';

	let { data } = $props();

	const { company, name, dateAccomplished, stack, projectImageUrl, content, urlLink } =
		data.project;

	function getTagFromStyle(style: ProcessedTextContent['style']): string {
		if (style === 'normal') {
			return 'p';
		} else {
			return style;
		}
	}

	$inspect(urlLink);
</script>

<main class="default-margin work-page">
	<h4>{company}</h4>
	<div class="underscore"></div>
	<h2 class="mb-s">{name}</h2>
	<img src={projectImageUrl} alt={`Picture of work done for ${company}`} class="project-image" />
	<div class="project-container mt-m">
		<div class="meta-data">
			<div class="meta-data-date">
				<h3 class="semi-bold">Date</h3>
				<p>{dateAccomplished.slice(0, 7)}</p>
			</div>
			<div class="meta-data-tech-stack">
				<h4 class="semi-bold">Tech Stack</h4>
				<ul>
					{#each stack as skill}
						<li>{skill}</li>
					{/each}
				</ul>
			</div>
		</div>
		<div class="project-text mt-m">
			{#each content as block}
				{#if block.type === 'text'}
					<svelte:element this={getTagFromStyle(block.style)}>{block.textToRender}</svelte:element>
				{:else}
					<img class="content-image" src={block.url} alt="" />
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
</style>
