<script lang="ts">
	import {
		HeroSection,
		ContactSection,
		AboutMeSection,
		SkillsSection,
		MyWorkSection,
		Navbar,
		Footer
	} from '$components';

	interface SanityProps {
		data: {
			skills: Skill[];
			heroText: ProcessedHeroText;
			aboutSection: ProcessedAboutSection;
			contactSection: ProcessedContact;
			projects: ProcessedProject[];
			nav: SanityNavbar;
		};
		lang: string;
	}

	const { data, lang }: SanityProps = $props();
</script>

<Navbar {data} {lang} />
<HeroSection {data} />
<AboutMeSection {data} />
<SkillsSection {data} />
<ContactSection {data} />
<MyWorkSection {data} />
<Footer {data} />

<!-- <HeroSection />
<AboutMeSection />
<SkillsSection {data} />
<ContactSection />
<MyWorkSection {data} /> -->
