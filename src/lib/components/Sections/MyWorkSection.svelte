<script lang="ts">
	import SectionHeadline from '$components/SectionHeadline.svelte';

	interface MyWorkSectionProps {
		projects: ProcessedProject[];
	}
	let { projects }: MyWorkSectionProps = $props();
	const mainProject = projects[0];
	const otherProjects = projects.slice(1);
</script>

<section class="mt-l" id="my-work">
	<SectionHeadline sectionName="my-work">My Work</SectionHeadline>
	<div class="default-margin projects-container mt-m">
		<article class="main-project mb-l bs-m">
			<a href={`/work/${mainProject.slug}`}>
				<img src={mainProject.projectImageUrl} alt={mainProject.name} />
			</a>
			<div class="project-info mt-s">
				<div class="title-and-company">
					<h3 class="semi-bold">{mainProject.name}</h3>
					<p class="company dark-grey">{mainProject.company}</p>
				</div>
				<a href={`/work/${mainProject.slug}`} class="btn-to-article">&rarr;</a>
			</div>
		</article>
		<div class="more-projects-container">
			{#each otherProjects as project}
				<article class="project bs-m">
					<a href={`/work/${project.slug}`}>
						<img src={project.projectImageUrl} alt={project.name} />
					</a>
					<div class="project-info mt-s">
						<div class="title-and-company">
							<h3 class="semi-bold">{project.name}</h3>
							<p class="company dark-grey">{project.company}</p>
						</div>
						<a href={`/work/${project.slug}`} class="btn-to-article">&rarr;</a>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.main-project {
		padding: 0 0 0.5rem 0;
		border-radius: 20px;
	}

	img {
		width: 100%;
		border-radius: 20px;
		object-fit: cover;
		cursor: pointer;
	}

	.more-projects-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.more-projects-container img {
		height: 35rem;
	}

	.main-project img {
		max-height: 45rem;
	}

	.project {
		width: 48%;
		border-radius: 20px;
		padding-bottom: 0.5rem;
	}

	@media screen and (max-width: 37.5em) {
		/* 600px */
		.project {
			width: 100%;
			margin-bottom: 6rem;
		}
	}

	.project-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 1rem;
	}

	.btn-to-article {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 40px;
		border: 1px solid black;
		border-radius: 40px;
		padding: 0px 24px;
	}

	.company {
		font-size: 18px;
		margin-bottom: 0;
	}
</style>
