<script lang="ts">
	import { Button, SectionHeadline } from '$components';
	import image from '$assets/img/about-me.jpeg';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	function onclick() {
		goto('/#contact-form');
	}

	interface AboutMeSectionProps {
		data: {
			aboutSection: ProcessedAboutSection;
		};
	}

	const { data }: AboutMeSectionProps = $props();

	const { aboutText, linkText } = data.aboutSection;

	let observer: IntersectionObserver | null = null;

	onMount(() => {
		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
					}
				});
			},
			{
				threshold: 0.1
			}
		);

		document.querySelectorAll('.fade-in').forEach((element) => {
			observer?.observe(element);
		});
	});
</script>

<section class="about" id="about">
	<SectionHeadline sectionName={'about-me'}>digiDEVS</SectionHeadline>
	<div class="about-container default-margin mt-m">
		<div class="image-container">
			<img src={image} alt="picture of Fredrik" class="image" />
		</div>
		<div class="text">
			{#each aboutText as text}
				<p>{text}</p>
			{/each}
			<Button className="mt-m" {onclick}>
				{linkText}
			</Button>
		</div>
	</div>
</section>

<style>
	.about {
		margin-top: 150vh;
		padding-top: 20vh;
		z-index: 0;
	}

	.about-container {
		padding: 0 1rem;
		border-radius: 20px;
		display: flex;
		gap: 4rem;
		justify-content: space-between;
		align-items: stretch;
	}

	@media screen and (max-width: 56.25em) {
		.about-container {
			flex-direction: column;
		}
	}

	.image {
		width: 100%;
		border-radius: 20px;
		object-fit: cover;
	}

	@media screen and (max-width: 56.25em) {
		.image-container {
			display: flex;
			align-content: center;
			justify-content: center;
		}
	}

	@media screen and (max-width: 56.25em) {
		.image {
			width: 60%;
			align-self: center;
			justify-self: center;
		}
	}

	.text {
		width: 100%;
		text-align: left;
	}

	.text p {
		font-size: 1.8rem;
		margin-bottom: 1rem;
	}
</style>
