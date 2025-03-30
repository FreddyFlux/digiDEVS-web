<script lang="ts">
	import { Button, SectionHeadline } from '$components';

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
</script>

<section class="mt-l" id="contact">
	<SectionHeadline sectionName="contact-form">{contactHeadline}</SectionHeadline>
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
				<h3 class="bold mb-s">{contactTitle}</h3>
				{#each contactText as text}
					<p>{text}</p>
				{/each}
			</div>

			<form>
				<input
					type="text"
					class="text-input mb-m"
					class:input-error={isFormInvalid && !Boolean(contactName.length)}
					placeholder={namePlaceholder}
					bind:value={contactName}
				/>
				<input
					type="text"
					class="text-input mb-m"
					class:input-error={isFormInvalid && !Boolean(contactMail.length)}
					placeholder={emailPlaceholder}
					bind:value={contactMail}
				/>
				<textarea
					placeholder={messagePlaceholder}
					class:input-error={isFormInvalid && !Boolean(informationAboutProject.length)}
					bind:value={informationAboutProject}
				></textarea>
				<Button onclick={onSubmit}>{contactLinkText}</Button>
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
