<script lang="ts">
	import { SectionHeadline } from '$components';
	interface SkillsSectionProps {
		skills: Skill[];
	}

	let { skills }: SkillsSectionProps = $props();
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

	i {
		font-size: 8rem;
		color: black;
	}
</style>
