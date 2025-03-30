<script lang="ts">
	import { SectionHeadline } from '$components';
	interface SkillsSectionProps {
		data: {
			skills: Skill[];
		};
	}

	let { data }: SkillsSectionProps = $props();
	const { skills } = data;
</script>

<section class="mt-l mb-l">
	<SectionHeadline sectionName="skills">Skills</SectionHeadline>
	<div class="wrapper default-margin">
		<div class="skills-container mt-m">
			{#each skills as skill}
				<i class={skill.iconClass}></i>
			{/each}
		</div>
	</div>
</section>

<style>
	.wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.skills-container {
		width: 60%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		row-gap: 1.6rem;
		column-gap: 1rem;
	}

	@media screen and (max-width: 37.5em) {
		/* 600px */
		.skills-container {
			width: 70%;
		}
	}

	@media screen and (max-width: 31.25em) {
		/* 500px */
		.skills-container {
			width: 80%;
		}
	}

	@media screen and (max-width: 25em) {
		/* 400px */
		.skills-container {
			width: 100%;
		}
	}

	i {
		font-size: 8rem;
		color: black;
	}

	@media screen and (max-width: 37.5em) {
		/* 600px */
		i {
			font-size: 7rem;
		}
	}

	@media screen and (max-width: 31.25em) {
		/* 500px */
		i {
			font-size: 6rem;
		}
	}
</style>
