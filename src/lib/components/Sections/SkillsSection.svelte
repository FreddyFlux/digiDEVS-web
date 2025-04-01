<script lang="ts">
	import { SectionHeadline } from '$components';
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	interface SkillsSectionProps {
		data: {
			skills: Skill[];
		};
	}

	let { data }: SkillsSectionProps = $props();
	const { skills } = data;
	let sectionIsVisible = false;

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
			gsap.set('.skills-section-wrapper', { opacity: 0, visibility: 'hidden' }); // Hide the entire section
			gsap.set('.skills-headline-animation', { opacity: 0, y: 50 });
			gsap.set('.skill-icon-animation', { opacity: 0, y: 30, scale: 0.8 });

			// Create main visibility ScrollTrigger
			ScrollTrigger.create({
				trigger: '#skills',
				start: 'top 90%',
				end: 'bottom 10%',
				onEnter: () => {
					sectionIsVisible = true;
					resetAndPlay();
				},
				onEnterBack: () => {
					sectionIsVisible = true;
					resetAndPlay();
				},
				onLeave: () => {
					sectionIsVisible = false;
					hideSection();
				},
				onLeaveBack: () => {
					sectionIsVisible = false;
					hideSection();
				},
				// Force the animation to run every time it enters viewport
				toggleActions: 'restart none none reset'
			});

			function hideSection() {
				gsap.to('.skills-section-wrapper', {
					opacity: 0,
					duration: 0.3,
					onComplete: () => {
						// Make section completely invisible after fade out
						gsap.set('.skills-section-wrapper', { visibility: 'hidden' });
						// Reset animations to initial state
						gsap.set('.skills-headline-animation', { opacity: 0, y: 50 });
						gsap.set('.skill-icon-animation', { opacity: 0, y: 30, scale: 0.8 });
					}
				});
			}

			function resetAndPlay() {
				// Make section visible but opacity 0 before animation
				gsap.set('.skills-section-wrapper', { visibility: 'visible' });

				// First show the section wrapper
				gsap.to('.skills-section-wrapper', {
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
				tl.to('.skills-headline-animation', {
					opacity: 1,
					y: 0,
					duration: 0.4,
					ease: 'power3.out'
				}).to(
					'.skill-icon-animation',
					{
						opacity: 1,
						y: 0,
						scale: 1,
						duration: 0.4,
						stagger: 0.1,
						ease: 'back.out(1.7)'
					},
					'-=0.2'
				);
			}

			function playUpAnimation() {
				const tl = gsap.timeline();
				tl.to('.skill-icon-animation', {
					opacity: 1,
					y: 0,
					scale: 1,
					duration: 0.4,
					stagger: {
						each: 0.1,
						from: 'end' // Start from the last icon
					},
					ease: 'back.out(1.7)'
				}).to(
					'.skills-headline-animation',
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

<section class="mt-l mb-l" id="skills">
	<div class="skills-section-wrapper">
		<div class="skills-headline-animation">
			<SectionHeadline sectionName="skills">Skills</SectionHeadline>
		</div>
		<div class="wrapper default-margin">
			<div class="skills-container mt-m">
				{#each skills as skill, index}
					<i class={skill.iconClass + ' skill-icon-animation'}></i>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.skills-section-wrapper {
		opacity: 0; /* Initially hidden */
		visibility: hidden; /* Completely hide from layout initially */
	}

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
