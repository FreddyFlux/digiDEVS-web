<script lang="ts">
	import logoImg from '$assets/img/digidevs-logo.png';
	import { LangButtons, Button } from '$components';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	interface NavbarProps {
		data: {
			nav: ProcessedNavbar;
		};
		lang: string;
		slug?: string;
	}

	const { data, lang, slug = undefined }: NavbarProps = $props();
	const { language, navbar, mainLink, copyrightText } = data.nav;

	let nav: HTMLElement;
	let currentLang = $state('');
	let isVisible = $state(true);
	let lastScrollY = $state(0);
	let inactivityTimer: number;
	let scrollTimer: number;
	let isScrolling = $state(false);

	function setLanguage(language: string) {
		const currentPath = window.location.pathname;
		const pathParts = currentPath.split('/').filter(Boolean);

		// Update the language part (first segment)
		pathParts[0] = language;

		// If we're on an experience page (has slug), ensure we maintain the structure
		if (slug) {
			// Ensure we have the correct structure: /[lang]/experience/[slug]
			if (pathParts.length < 3) {
				pathParts.push('experience', slug);
			} else {
				pathParts[0] = language;
			}
		}

		window.location.href = `/${pathParts.join('/')}`;
	}

	function animateNavbar(show: boolean) {
		// Clear any existing inactivity timer
		if (inactivityTimer) window.clearTimeout(inactivityTimer);

		if (show) {
			// Show navbar with GSAP
			gsap.to(nav, {
				duration: 0.5,
				y: 0,
				opacity: 1,
				ease: 'power2.out'
			});
		} else {
			// Hide navbar with GSAP
			gsap.to(nav, {
				duration: 0.5,
				y: -100,
				opacity: 0,
				ease: 'power2.in'
			});
		}
	}

	// Function to start inactivity timer
	function startInactivityTimer() {
		// Clear any existing timer first
		if (inactivityTimer) window.clearTimeout(inactivityTimer);

		// Set new timer - hide navbar after 2 seconds of no scrolling
		inactivityTimer = window.setTimeout(() => {
			if (lastScrollY > 100 && isVisible) {
				isVisible = false;
				animateNavbar(false);
			}
			isScrolling = false;
		}, 2000);
	}

	onMount(() => {
		const pathParts = window.location.pathname.split('/').filter(Boolean);
		currentLang = pathParts[0];

		// Initial setup for the navbar
		gsap.set(nav, {
			y: 0,
			opacity: 1
		});

		const handleScroll = () => {
			const currentScrollY = window.pageYOffset;
			isScrolling = true;

			// Don't animate at the top of the page
			if (currentScrollY <= 50) {
				animateNavbar(true);
				lastScrollY = currentScrollY;
				return;
			}

			// Scrolling down
			if (currentScrollY > lastScrollY && isVisible) {
				isVisible = false;
				animateNavbar(false);
			}
			// Scrolling up
			else if (currentScrollY < lastScrollY && !isVisible) {
				isVisible = true;
				animateNavbar(true);
			}

			// Start/reset the inactivity timer
			startInactivityTimer();

			lastScrollY = currentScrollY;
		};

		// Set up a debounced scroll event listener for better performance
		window.addEventListener('scroll', () => {
			if (scrollTimer) window.clearTimeout(scrollTimer);
			scrollTimer = window.setTimeout(handleScroll, 10);
		});

		// Initial inactivity timer
		startInactivityTimer();

		// Clean up on component destruction
		return () => {
			if (scrollTimer) window.clearTimeout(scrollTimer);
			if (inactivityTimer) window.clearTimeout(inactivityTimer);
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<nav bind:this={nav} class="navigation">
	<div class="logo">
		<a href="/">
			<img src={logoImg} alt="logo" />
		</a>
	</div>
	<LangButtons {setLanguage} />
	<div class="menu">
		{#each navbar as item}
			<a href={`/${language}/${item.link}`}>{item.name}</a>
		{/each}
		<Button
			onclick={() => {
				window.location.href = `/${language}#contact`;
			}}>contact</Button
		>
	</div>
</nav>

<style>
	.navigation {
		max-height: 12vh;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 3rem;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		box-sizing: border-box;
		background-color: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		z-index: 1000;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		overflow-x: hidden;
	}

	@media screen and (max-width: 37.5em) {
		/* 600px */
		.navigation {
			padding: 1rem 1.5rem;
		}
	}

	.menu {
		display: flex;
		align-items: center;
		gap: 3rem;
		font-size: 2.5rem;
	}

	@media screen and (max-width: 56.25em) {
		.menu {
			gap: 1.5rem;
			font-size: 2rem;
		}
	}

	@media screen and (max-width: 37.5em) {
		/* 600px */
		.menu {
			gap: 1.2rem;
			font-size: 1.6rem;
		}
	}
	.menu a {
		text-decoration: none;
		color: #000;
		font-weight: 600;
	}

	.logo {
		max-width: 30rem;
	}

	@media screen and (max-width: 56.25em) {
		.logo {
			max-width: 20rem;
		}
	}

	@media screen and (max-width: 37.5em) {
		/* 600px */
		.logo {
			max-width: 13rem;
		}
	}

	.logo img {
		width: 100%;
		height: auto;
		display: block;
	}

	.logo a {
		display: block;
		text-decoration: none;
	}
</style>
