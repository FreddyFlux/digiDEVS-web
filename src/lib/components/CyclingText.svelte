<script lang="ts">
	interface HeroSectionProps {
		data: {
			heroText: ProcessedHeroText;
		};
	}

	let { data }: HeroSectionProps = $props();

	let currentWordIndex = $state(0);
	let currentText = $state('');
	let isDeleting = $state(false);
	let isPaused = $state(false);
	let isWordGap = $state(false);
	let typingSpeed = 200; // milliseconds per character
	let pauseDuration = 1200; // pause when word is complete
	let wordGapDuration = 800; // pause between words

	const { staticText, dynamicText } = data.heroText;

	function typeEffect() {
		const currentWord = dynamicText[currentWordIndex];

		if (isWordGap) {
			// Do nothing during word gap
			return;
		} else if (isDeleting) {
			currentText = currentWord.substring(0, currentText.length - 1);
			if (currentText === '') {
				isDeleting = false;
				isWordGap = true;
				// After word gap duration, move to next word
				setTimeout(() => {
					isWordGap = false;
					currentWordIndex = (currentWordIndex + 1) % dynamicText.length;
				}, wordGapDuration);
			}
		} else if (isPaused) {
			// Do nothing during pause
			return;
		} else {
			currentText = currentWord.substring(0, currentText.length + 1);
			if (currentText === currentWord) {
				isPaused = true;
				// After pause duration, start deleting
				setTimeout(() => {
					isPaused = false;
					isDeleting = true;
				}, pauseDuration);
			}
		}
	}

	// Start the typing effect when the component mounts
	$effect(() => {
		const interval = setInterval(typeEffect, typingSpeed);
		return () => clearInterval(interval);
	});
</script>

<div class="cycling-text-container">
	<h1 class="cycling-text text-container">
		<span class="static-text">{staticText}</span>
		<span class="dynamic-text">`{currentText}`</span>
	</h1>
</div>

<style>
	h1 {
		font-family: 'Prelude-Regular', sans-serif;
		font-size: 6rem;
		letter-spacing: 2px;
	}

	@media screen and (max-width: 37.5em) {
		/* 600px */
		h1 {
			font-size: 5rem;
		}
	}

	@media screen and (max-width: 25em) {
		/* 400px */
		h1 {
			font-size: 4rem;
		}
	}

	.text-container {
		display: flex;
	}

	/* MAKE TEXT GO LINE UNDER LINE ON SMALLER SCREENS */
	@media screen and (max-width: 56.25em) {
		.text-container {
			flex-direction: column;
			gap: 5.5rem;
			align-items: flex-start;
			text-align: left;
			padding: 0 1rem;
		}

		.cycling-text {
			flex-direction: column;
			align-items: flex-start;
			gap: 2rem;
			width: 100%;
		}

		.static-text,
		.dynamic-text {
			width: 100%;
			white-space: nowrap;
			text-align: left;
			display: block;
			position: relative;
		}

		.static-text {
			margin-bottom: 0.5rem;
		}

		.dynamic-text {
			margin-left: 0;
			margin-top: 0.8rem;
			min-width: unset;
		}

		.dynamic-text::before {
			content: '';
			display: inline-block;
			width: -2em;
		}
	}

	.cycling-text {
		display: flex;
		align-items: flex-end;
		justify-content: center;
		gap: 0.5rem;
		text-align: center;
	}

	.static-text {
		color: inherit;
	}

	.dynamic-text {
		color: inherit;
		margin-left: 1rem;
		width: auto;
		min-width: min(48rem, 70vw);
		display: inline-block;
		position: relative;
		text-align: left;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	@media screen and (max-width: 25em) {
		/* 400px */
		.dynamic-text {
			margin-left: 0;
		}
	}
</style>
