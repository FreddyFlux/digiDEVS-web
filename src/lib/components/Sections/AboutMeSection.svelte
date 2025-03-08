<script lang="ts">
	import { Button, SectionHeadline } from '$components';
	import image from '$assets/img/about-me.jpeg';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	function onclick() {
		goto('/#contact-form');
	}

	let observer: IntersectionObserver | null = null;

	onMount(() => {
		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
					}
				});
			},
			{
				threshold: 0.1
			}
		);

		document.querySelectorAll('.fade-in').forEach((element) => {
			observer?.observe(element);
		});
	});
</script>

<section class="about" id="about">
	<SectionHeadline sectionName={'about-me'}>digiDEVS</SectionHeadline>
	<div class="about-container default-margin mt-m">
		<div class="image-container">
			<img src={image} alt="" class="image" />
		</div>
		<div class="text">
			<p>
				Hei, jeg er Fredrik, drivkraften bak vårt lille frilans byrå digiDEVS: som spesialiserer seg
				på webdesign, applikasjonsutvikling, automasjon og prosjektledelse.
			</p>
			<p>
				Min erfaring kommer fra jobb innenfor IT, digital markedsføring, optimalisering av
				hjemmesider og system. Jeg har i tillegg selvlært meg selv gjennom flere år til å bli en
				brukbar programmerer innenfor web og applikasjonsutvikling.
			</p>
			<p>
				Med familie og bosted i Split, Kroatia har vi dannet et nettverk av profesjonelle utviklere
				som er med å jobber frilans på prosjekter for Norske kunder.
			</p>
			<p>
				Gjennom vårt engasjement og forbindelser kan vi levere forutsigbare og helhetlige løsninger
				som er skreddersydd for å dekke alt fra enkle behov til å støtte opp om kompliserte
				løsninger.
			</p>
			<Button className="mt-m" {onclick}>La oss snakke om ditt prosjekt</Button>
		</div>
	</div>
</section>

<style>
	.about {
		margin-top: 150vh;
		padding-top: 20vh;
		z-index: 0;
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
