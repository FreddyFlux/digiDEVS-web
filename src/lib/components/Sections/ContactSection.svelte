<script lang="ts">
	import { Button, SectionHeadline } from '$components';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	interface ContactSectionProps {
		data: {
			contactSection: ProcessedContact;
		};
	}

	let { data }: ContactSectionProps = $props();
	const {
		contactHeadline,
		contactTitle,
		contactText,
		namePlaceholder,
		emailPlaceholder,
		messagePlaceholder,
		sentMessage,
		loadingMessage,
		errorMessage,
		contactLinkText,
		language
	} = data.contactSection;

	let contactName = $state('');
	let contactMail = $state('');
	let informationAboutProject = $state('');
	let isFormInvalid = $state(false);
	let isEmailSent = $state(false);
	let showErrorMessage = $state(false);
	let isLoading = $state(false);

	let sectionEl = $state<HTMLElement | null>(null);
	let headlineEl = $state<HTMLElement | null>(null);
	let titleEl = $state<HTMLElement | null>(null);
	let textEls = $state<HTMLElement[]>([]);
	let inputEls = $state<HTMLElement[]>([]);
	let textareaEl = $state<HTMLElement | null>(null);
	let buttonEl = $state<HTMLElement | null>(null);

	async function onSubmit(event: Event) {
		event.preventDefault();

		if (contactMail && contactName && informationAboutProject) {
			// show user that something happend
			isLoading = true;
			// send data to project
			const response = await fetch('/api/send-mail', {
				method: 'POST',
				body: JSON.stringify({
					contactName,
					contactMail,
					informationAboutProject
				}),
				headers: { 'Content-type': 'application/json' }
			});
			isLoading = false;
			if (response.ok) {
				isEmailSent = true;
			} else {
				showErrorMessage = true;
			}
		} else {
			// trying to submit an incomplete/invalid form
			isFormInvalid = true;
		}
	}

	$effect(() => {
		if (
			contactName ||
			contactMail ||
			informationAboutProject ||
			!contactName ||
			!contactMail ||
			!informationAboutProject
		) {
			isFormInvalid = false;
		}
	});

	onMount(() => {
		// Register ScrollTrigger plugin
		gsap.registerPlugin(ScrollTrigger);

		// Set initial state (hidden)
		gsap.set([headlineEl, titleEl, ...textEls, ...inputEls, textareaEl, buttonEl], {
			opacity: 0,
			y: 20
		});

		// Create two different timelines for scrolling down and scrolling up
		let lastScrollDirection = 0; // 1 for down, -1 for up
		let animationActive = false;

		// Initialize scroll trigger
		const scrollTrigger = ScrollTrigger.create({
			trigger: sectionEl,
			start: 'top 80%',
			end: 'center 20%',
			onEnter: (self) => {
				lastScrollDirection = 1; // scrolling down
				playAnimation(true);
			},
			onLeave: (self) => {
				hideAllElements();
			},
			onEnterBack: (self) => {
				lastScrollDirection = -1; // scrolling up
				playAnimation(false);
			},
			onLeaveBack: (self) => {
				hideAllElements();
			}
			// markers: true, // For debugging
		});

		function hideAllElements() {
			gsap.to([headlineEl, titleEl, ...textEls, ...inputEls, textareaEl, buttonEl], {
				opacity: 0,
				y: 20,
				duration: 0.3,
				stagger: 0.05,
				overwrite: true
			});
		}

		function playAnimation(scrollingDown: boolean) {
			// Kill any ongoing animations
			gsap.killTweensOf([headlineEl, titleEl, ...textEls, ...inputEls, textareaEl, buttonEl]);

			// Get elements in the correct order based on scroll direction
			let elements;
			if (scrollingDown) {
				// Down order: headline → title → text → inputs → textarea → button
				elements = [headlineEl, titleEl, ...textEls, ...inputEls, textareaEl, buttonEl];
			} else {
				// Up order: button → textarea → inputs → text → title → headline
				elements = [
					buttonEl,
					textareaEl,
					...inputEls.slice().reverse(),
					...textEls.slice().reverse(),
					titleEl,
					headlineEl
				];
			}

			// Animate elements in sequence
			gsap.to(elements, {
				opacity: 1,
				y: 0,
				duration: 0.4,
				stagger: 0.1,
				ease: 'power2.out',
				overwrite: true
			});
		}

		return () => {
			// Clean up ScrollTrigger
			if (scrollTrigger) {
				scrollTrigger.kill();
			}
		};
	});
</script>

<section class="mt-l" id="contact" bind:this={sectionEl}>
	<div bind:this={headlineEl}>
		<SectionHeadline sectionName="contact-form">{contactHeadline}</SectionHeadline>
	</div>
	<div class="form-container default-margin mt-m">
		{#if isEmailSent}
			<div class="spinner-container">
				<h3>{sentMessage}</h3>
			</div>
		{:else if isLoading}
			<div class="spinner-container">
				<div class="spinner"></div>
				<h3>{loadingMessage}</h3>
			</div>
		{:else if showErrorMessage}
			<h3>
				{errorMessage} <a href="mailto:fredrik@digidevs.no" class="link">fredrik@digidevs.no</a>
			</h3>
		{:else}
			<div class="form-text mb-m">
				<h3 class="bold mb-s" bind:this={titleEl}>{contactTitle}</h3>
				{#each contactText as text, i}
					<p bind:this={textEls[i]}>{text}</p>
				{/each}
			</div>

			<form>
				<input
					type="text"
					class="text-input mb-m"
					class:input-error={isFormInvalid && !Boolean(contactName.length)}
					placeholder={namePlaceholder}
					bind:value={contactName}
					bind:this={inputEls[0]}
				/>
				<input
					type="text"
					class="text-input mb-m"
					class:input-error={isFormInvalid && !Boolean(contactMail.length)}
					placeholder={emailPlaceholder}
					bind:value={contactMail}
					bind:this={inputEls[1]}
				/>
				<textarea
					placeholder={messagePlaceholder}
					class:input-error={isFormInvalid && !Boolean(informationAboutProject.length)}
					bind:value={informationAboutProject}
					bind:this={textareaEl}
				></textarea>
				<div bind:this={buttonEl}>
					<Button onclick={onSubmit}>{contactLinkText}</Button>
				</div>
			</form>
		{/if}
	</div>
</section>

<style>
	section {
		padding: 7rem 0 7rem 0;
	}

	.form-container {
		display: flex;
		justify-content: space-between;
	}

	@media screen and (max-width: 56.25em) {
		.form-container {
			flex-direction: column;
		}
	}

	.form-text {
		width: 39%;
	}

	@media screen and (max-width: 56.25em) {
		.form-text {
			width: 100%;
		}
	}

	.form-text p {
		font-size: 1.8rem;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 45%;
	}

	@media screen and (max-width: 56.25em) {
		form {
			width: 60%;
		}
	}

	form * {
		font-size: 2rem;
		font-family: 'Inter Tight', sans-serif;
		font-weight: 500;
		color: black;
	}

	textarea,
	input {
		width: 100%;
		background-color: rgba(0, 0, 0, 0.035);
		border-radius: 8px;
		padding: 0.5rem 1.2rem;
		outline: none;
		border: none;
	}

	input {
		height: 4.8rem;
	}

	textarea {
		height: 12rem;
		margin-bottom: 4rem;
	}

	textarea::placeholder,
	input::placeholder {
		font-size: 2rem;
		font-weight: 400;
	}

	.input-error {
		background-color: rgba(223, 87, 87, 0.667);
	}

	.input-error::placeholder {
		color: white;
	}

	.spinner {
		border: 4px solid rgba(0, 0, 0, 0.1);
		border-left-color: black;
		border-radius: 50%;
		width: 1.6rem;
		height: 1.6rem;
		display: inline-block;
		margin-right: 1rem;
		animation: spin 0.5s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.spinner-container {
		display: flex;
	}
</style>
