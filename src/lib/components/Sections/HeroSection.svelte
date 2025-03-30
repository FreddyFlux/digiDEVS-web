<script lang="ts">
	interface HeroSectionProps {
		data: {
			heroText: ProcessedHeroText;
		};
	}

	const { data } = $props();

	import { CyclingText } from '$components';
	import { onMount } from 'svelte';

	let backgroundContainer: HTMLElement;
	let lastScrollY = 0;
	let ticking = false;

	function updateBackgroundStyles() {
		if (!backgroundContainer) return;

		const scrollY = window.scrollY;

		// Snap to bottom when scrolling down past 100vh
		if (scrollY > window.innerHeight) {
			backgroundContainer.classList.add('snap');
		} else {
			backgroundContainer.classList.remove('snap');
		}

		// Fade out when scrolling up past 120vh
		if (scrollY > window.innerHeight * 1.2) {
			backgroundContainer.classList.add('fade-out');
		} else {
			backgroundContainer.classList.remove('fade-out');
		}

		lastScrollY = scrollY;
	}

	// Use $effect for side effects that depend on backgroundContainer
	$effect(() => {
		if (backgroundContainer) {
			updateBackgroundStyles();
		}
	});

	onMount(() => {
		const handleScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					updateBackgroundStyles();
					ticking = false;
				});
				ticking = true;
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<div class="background-container snap fade-out" bind:this={backgroundContainer}>
	<div class="gradient-sphere"></div>
	<div class="blob-sphere"></div>
	<div class="text-container">
		<CyclingText {data} />
	</div>
</div>

<style>
	.text-container {
		height: 80vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.background-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		z-index: -1;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		transition:
			transform 0.5s ease-out,
			opacity 0.4s ease-in-out;
	}

	.background-container.snap {
		transform: translateY(-100vh);
		opacity: 0;
	}

	.background-container.fade-out {
		transform: translateY(-100vh) translateY(-50vh);
	}

	.gradient-sphere {
		position: absolute;
		width: 200%;
		height: 200%;
		background: radial-gradient(
			circle at center,
			rgba(50, 69, 255, 0.15) 0%,
			rgba(188, 82, 238, 0.15) 50%,
			rgba(255, 255, 255, 0) 100%
		);
		filter: blur(100px);
		animation: float 30s ease-in-out infinite;
	}

	.blob-sphere {
		position: absolute;
		width: 100%;
		height: 100%;
		background: radial-gradient(
			circle at center,
			rgba(240, 65, 255, 0.2) 0%,
			rgba(50, 69, 255, 0.2) 50%,
			rgba(255, 255, 255, 0) 100%
		);
		filter: blur(100px);
		animation: blob 45s ease-in-out infinite;
	}

	@keyframes float {
		0% {
			transform: translate(0, 0) scale(1);
		}
		25% {
			transform: translate(10%, 10%) scale(1.2);
		}
		50% {
			transform: translate(0, 20%) scale(1);
		}
		75% {
			transform: translate(-10%, 10%) scale(0.8);
		}
		100% {
			transform: translate(0, 0) scale(1);
		}
	}

	@keyframes blob {
		0% {
			transform: translate(0, 0) scale(1);
		}
		25% {
			transform: translate(-15%, -15%) scale(1.3);
		}
		50% {
			transform: translate(0, -20%) scale(0.9);
		}
		75% {
			transform: translate(15%, -15%) scale(1.1);
		}
		100% {
			transform: translate(0, 0) scale(1);
		}
	}
</style>
