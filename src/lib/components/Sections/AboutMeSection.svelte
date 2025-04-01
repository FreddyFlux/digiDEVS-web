<script lang="ts">
	import { Button, SectionHeadline } from '$components';
	import image from '$assets/img/about-me.jpeg';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import gsap from 'gsap';

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

	onMount(() => {
		// Import ScrollTrigger dynamically to avoid SSR issues
		import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
			// Register ScrollTrigger plugin
			gsap.registerPlugin(ScrollTrigger);

			// Track scroll direction
			let direction = 'down';
			let lastScrollTop = 0;

			function updateDirection() {
				const st = window.pageYOffset || document.documentElement.scrollTop;
				direction = st > lastScrollTop ? 'down' : 'up';
				lastScrollTop = st <= 0 ? 0 : st;
			}

			// Add scroll event listener
			window.addEventListener('scroll', updateDirection);

			// Set initial state - all elements are invisible
			gsap.set('.about-section-wrapper', { opacity: 0 }); // Hide the entire section
			gsap.set('.headline-animation', { opacity: 0, y: 50 });
			gsap.set('.paragraph-animation', { opacity: 0, y: 30 });
			gsap.set('.button-animation', { opacity: 0, y: 20 });

			// Create main visibility ScrollTrigger
			ScrollTrigger.create({
				trigger: '#about',
				start: 'top 90%',
				end: 'bottom 10%',
				onEnter: resetAndPlay,
				onEnterBack: resetAndPlay,
				onLeave: hideSection,
				onLeaveBack: hideSection
			});

			function hideSection() {
				gsap.to('.about-section-wrapper', {
					opacity: 0,
					duration: 0.3,
					onComplete: () => {
						// Reset animations to initial state
						gsap.set('.headline-animation', { opacity: 0, y: 50 });
						gsap.set('.paragraph-animation', { opacity: 0, y: 30 });
						gsap.set('.button-animation', { opacity: 0, y: 20 });
					}
				});
			}

			function resetAndPlay() {
				// First show the section wrapper
				gsap.to('.about-section-wrapper', {
					opacity: 1,
					duration: 0.3,
					onComplete: () => {
						// Then play the appropriate animation based on scroll direction
						if (direction === 'down') {
							playDownAnimation();
						} else {
							playUpAnimation();
						}
					}
				});
			}

			function playDownAnimation() {
				const tl = gsap.timeline();
				tl.to('.headline-animation', {
					opacity: 1,
					y: 0,
					duration: 0.4,
					ease: 'power3.out'
				})
					.to(
						'.paragraph-animation',
						{
							opacity: 1,
							y: 0,
							duration: 0.4,
							stagger: 0.1,
							ease: 'power2.out'
						},
						'-=0.2'
					)
					.to(
						'.button-animation',
						{
							opacity: 1,
							y: 0,
							duration: 0.4,
							ease: 'back.out(1.7)'
						},
						'-=0.2'
					);
			}

			function playUpAnimation() {
				const tl = gsap.timeline();
				tl.to('.button-animation', {
					opacity: 1,
					y: 0,
					duration: 0.4,
					ease: 'back.out(1.7)'
				})
					.to(
						'.paragraph-animation',
						{
							opacity: 1,
							y: 0,
							duration: 0.4,
							stagger: {
								each: 0.1,
								from: 'end' // Start from the last paragraph
							},
							ease: 'power2.out'
						},
						'-=0.2'
					)
					.to(
						'.headline-animation',
						{
							opacity: 1,
							y: 0,
							duration: 0.4,
							ease: 'power3.out'
						},
						'-=0.2'
					);
			}

			// Clean up event listener on component unmount
			return () => {
				window.removeEventListener('scroll', updateDirection);
				ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
			};
		});
	});
</script>

<section class="about" id="about">
	<div class="about-section-wrapper">
		<div class="headline-animation">
			<SectionHeadline sectionName={'about-me'}>digiDEVS</SectionHeadline>
		</div>
		<div class="about-container default-margin mt-m">
			<div class="image-container">
				<img src={image} alt="Fredrik" class="image" />
			</div>
			<div class="text">
				{#each aboutText as text, index}
					<p class="paragraph-animation">{text}</p>
				{/each}
				<div class="button-animation">
					<Button className="mt-m" {onclick}>
						{linkText}
					</Button>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.about {
		margin-top: 150vh;
		padding-top: 20vh;
		z-index: 0;
	}

	.about-section-wrapper {
		opacity: 0; /* Initially hidden */
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
