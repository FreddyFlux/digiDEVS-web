<script lang="ts">
	import { onMount } from 'svelte';

	const words = [' tilpasninger', 'websider', ' applikasjoner', ' systemer', ' automasjoner'];
	let currentWordIndex = 0;
	let currentCharIndex = 0;
	let isDeleting = false;
	let displayText = '';
	const typingSpeed = 155; // Speed for typing and deleting
	const pauseDuration = 1200; // How long to pause when word is complete
	const pauseDurationBetweenWords = 800; // How long to pause between words

	function typeEffect(): void {
		const currentWord = words[currentWordIndex];

		if (isDeleting) {
			// Delete characters
			if (currentCharIndex > 0) {
				displayText = currentWord.substring(0, currentCharIndex - 1);
				currentCharIndex--;
				setTimeout(typeEffect, typingSpeed);
			} else {
				// When deleting is complete, move to next word
				isDeleting = false;
				currentWordIndex = (currentWordIndex + 1) % words.length;
				setTimeout(() => {
					typeEffect();
				}, pauseDurationBetweenWords);
			}
		} else {
			// Type characters
			if (currentCharIndex < currentWord.length) {
				displayText = currentWord.substring(0, currentCharIndex + 1);
				currentCharIndex++;
				setTimeout(typeEffect, typingSpeed);
			} else {
				// Word is complete, pause before deleting
				setTimeout(() => {
					isDeleting = true;
					typeEffect();
				}, pauseDuration);
			}
		}
	}

	onMount(() => {
		typeEffect();
	});
</script>

<div class="text-container">
	<h1 class="cycling-text">
		<span class="static-text mb-m">Skreddersydde</span>
	</h1>
	<h1 class="cycling-text">
		<span class="dynamic-text">{displayText}<span class="cursor"></span> </span>
	</h1>
</div>

<style>
	h1 {
		font-family: 'Prelude-Regular', sans-serif;
		font-size: 6rem;
		letter-spacing: 2px;
	}

	.text-container {
		display: flex;
	}

	/* MAKE TEXT GO LINE UNDER LINE ON SMALLER SCREENS */
	@media screen and (max-width: 56.25em) {
		.text-container {
			flex-direction: column;
		}
	}

	.cycling-text {
		display: flex;
		align-items: bottom;
		justify-content: center;
		gap: 0.5rem;
	}

	.static-text {
		color: inherit;
	}

	.dynamic-text {
		color: inherit;
		margin-left: 2rem;
		min-width: 48rem;
		display: inline-block;
	}

	@media screen and (max-width: 56.25em) {
		.dynamic-text {
			width: 100%;
		}
	}

	.cursor {
		display: inline-block;
		width: 2px;
		height: 1em;
		background-color: currentColor;
		margin-left: 2px;
		animation: blink 0.7s infinite;
	}

	@keyframes blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}
</style>
