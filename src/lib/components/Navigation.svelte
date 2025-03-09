<script>
	import logoImg from '$assets/img/digidevs-logo.png';
	import { Button } from '$components';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let lastScroll = 0;
	let scrollDirection = '';
	let nav;

	function goToContactForm() {
		goto('https://www.digidevs.no#contact-form');
	}

	onMount(() => {
		const handleScroll = () => {
			const currentScroll = window.pageYOffset;

			if (currentScroll <= 0) {
				scrollDirection = '';
				return;
			}

			if (currentScroll > lastScroll) {
				scrollDirection = 'scroll-down';
			} else if (currentScroll < lastScroll) {
				scrollDirection = 'scroll-up';
			}

			lastScroll = currentScroll;
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<nav
	class="navigation"
	bind:this={nav}
	class:scroll-down={scrollDirection === 'scroll-down'}
	class:scroll-up={scrollDirection === 'scroll-up'}
>
	<div class="logo">
		<a href="/">
			<img src={logoImg} alt="logo" />
		</a>
	</div>
	<div class="menu">
		<a href="https://www.digidevs.no#about">om digiDEVS</a>
		<a href="https://www.digidevs.no#my-work">Prosjekter</a>
		<Button className="nav-bar" onclick={goToContactForm}>Kontakt</Button>
	</div>
</nav>

<style>
	.navigation {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 5rem;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background: transparent;
		z-index: 1000;
		transition: transform 0.3s ease-in-out;
	}

	@media screen and (max-width: 37.5em) {
		/* 600px */
		.navigation {
			padding: 1rem 2rem;
		}
	}

	.navigation.scroll-down {
		transform: translateY(-100%);
	}

	.navigation.scroll-up {
		transform: translateY(0);
	}

	.menu {
		display: flex;
		align-items: center;
		gap: 4rem;
		font-size: 3rem;
	}

	@media screen and (max-width: 56.25em) {
		.menu {
			gap: 2rem;
			font-size: 2.4rem;
		}
	}

	@media screen and (max-width: 37.5em) {
		/* 600px */
		.menu {
			gap: 2rem;
			font-size: 1.8rem;
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
