<script lang="ts">
	import SectionHeadline from '$components/SectionHeadline.svelte';
	import gsap from 'gsap';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	interface MyWorkSectionProps {
		data: {
			projects: ProcessedProject[];
		};
	}
	let { data }: MyWorkSectionProps = $props();
	const { projects } = data;
	const mainProject = projects[0];
	const otherProjects = projects.slice(1);

	let sectionEl = $state<HTMLElement | null>(null);
	let headlineEl = $state<HTMLElement | null>(null);
	let mainProjectEl = $state<HTMLElement | null>(null);
	let projectEls = $state<HTMLElement[]>([]);

	// Function to create shake animation on hover
	function createShakeAnimation(element: HTMLElement) {
		if (!element) return; // Safety check

		// Set up the hover animations
		element.addEventListener('mouseenter', () => {
			// Kill any existing animations on this element
			gsap.killTweensOf(element);

			// Make sure element is visible first
			gsap.set(element, { opacity: 1, clearProps: 'opacity' });

			// Create a continuous shaking animation that lasts until hover out
			gsap.to(element, {
				x: 'random(-3,3)', // Random x movement between -3 and 3 pixels
				y: 'random(-2,2)', // Random y movement between -2 and 2 pixels
				duration: 0.1, // Duration for each "shake"
				repeat: -1, // Repeat indefinitely until hover out
				yoyo: true, // Alternate back and forth
				ease: 'power1.inOut'
				// No onComplete callback, so no push down effect
			});
		});

		// Reset on mouse leave
		element.addEventListener('mouseleave', () => {
			gsap.killTweensOf(element);
			gsap.to(element, {
				x: 0,
				y: 0,
				scale: 1, // Reset any scale changes
				duration: 0.3,
				ease: 'power2.out'
			});
		});
	}

	onMount(() => {
		if (browser) {
			import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
				gsap.registerPlugin(ScrollTrigger);

				// Safety check to ensure elements exist
				if (!headlineEl || !mainProjectEl || projectEls.some((el) => !el)) {
					console.error('Some elements were not properly bound');
					return;
				}

				// Initially hide all elements with more pronounced offsets
				gsap.set(headlineEl, { opacity: 0, x: -120 });
				gsap.set(mainProjectEl, { opacity: 0, x: 120 });
				gsap.set(projectEls, { opacity: 0, y: 100 });

				// Create animation when section enters viewport
				const sectionTrigger = ScrollTrigger.create({
					trigger: sectionEl,
					start: 'top 80%',
					end: 'bottom 20%',
					onEnter: () => {
						animateIn();
						// Delay applying hover effects until after fade-in
						setTimeout(() => {
							// Apply shake animations to all project cards
							if (mainProjectEl) createShakeAnimation(mainProjectEl);
							projectEls.forEach((projectEl) => {
								if (projectEl) createShakeAnimation(projectEl);
							});
						}, 1000);
					},
					onLeave: () => animateOut(),
					onEnterBack: () => animateIn(),
					onLeaveBack: () => animateOut(),
					markers: false // Set to true for debugging
				});

				return () => {
					// Clean up the ScrollTrigger on component unmount
					sectionTrigger.kill();
				};
			});
		}
	});

	function animateIn() {
		// Timeline for sequenced animations
		const tl = gsap.timeline();

		// Headline fades in from left with more dramatic movement
		tl.to(headlineEl, {
			opacity: 1,
			x: 0,
			duration: 0.8,
			ease: 'back.out(1.2)'
		});

		// Main project fades in from right with more dramatic movement
		tl.to(
			mainProjectEl,
			{
				opacity: 1,
				x: 0,
				duration: 0.8,
				ease: 'back.out(1.2)',
				onComplete: () => {
					// Ensure it's fully visible after animation
					gsap.set(mainProjectEl, { clearProps: 'opacity,x' });
				}
			},
			'-=0.5'
		);

		// Each project fades in from bottom one by one with more dramatic movement
		projectEls.forEach((projectEl, index) => {
			tl.to(
				projectEl,
				{
					opacity: 1,
					y: 0,
					duration: 0.7,
					ease: 'power3.out',
					onComplete: () => {
						// Ensure it's fully visible after animation
						gsap.set(projectEl, { clearProps: 'opacity,y' });
					}
				},
				`-=${index === 0 ? 0.4 : 0.25}`
			);
		});
	}

	function animateOut() {
		gsap.to([headlineEl, mainProjectEl, ...projectEls], {
			opacity: 0,
			x: (i) => (i === 0 ? -80 : i === 1 ? 80 : 0), // Move headline left, main project right, others no x movement
			y: (i) => (i > 1 ? 60 : 0), // Move projects down, but not headline or main project
			duration: 0.6,
			ease: 'power2.in',
			stagger: 0.1
		});
	}
</script>

<section class="mt-l" id="my-work" bind:this={sectionEl}>
	<div bind:this={headlineEl}>
		<SectionHeadline sectionName="my-work">My Work</SectionHeadline>
	</div>
	<div class="default-margin projects-container mt-m">
		<article class="main-project mb-l bs-m" bind:this={mainProjectEl}>
			<a href={`/${mainProject.language}/work/${mainProject.slug}`}>
				<img src={mainProject.projectImageUrl} alt={mainProject.name} />

				<div class="project-info mt-s">
					<div class="title-and-company">
						<h3 class="semi-bold">{mainProject.name}</h3>
						<p class="company dark-grey">{mainProject.company}</p>
					</div>
					<span class="btn-to-article">&rarr;</span>
				</div>
			</a>
		</article>

		<div class="more-projects-container">
			{#each otherProjects as project, i}
				<article class="project bs-m" bind:this={projectEls[i]}>
					<a href={`/${project.language}/work/${project.slug}`}>
						<img src={project.projectImageUrl} alt={project.name} />

						<div class="project-info mt-s">
							<div class="title-and-company">
								<h3 class="semi-bold">{project.name}</h3>
								<p class="company dark-grey">{project.company}</p>
							</div>
							<span class="btn-to-article">&rarr;</span>
						</div>
					</a>
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

	.main-project:hover {
		transform: none;
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

	.project:hover {
		transform: none;
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
		height: 4rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 4rem;
		border: 1px solid black;
		border-radius: 40px;
		padding: 0 2rem;
	}

	.company {
		font-size: 18px;
		margin-bottom: 0;
	}
</style>
