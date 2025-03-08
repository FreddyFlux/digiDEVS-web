<script>
	import {
		HeroSection,
		ContactSection,
		AboutMeSection,
		SkillsSection,
		MyWorkSection
	} from '$components';

	const { data } = $props();
	let { skills, projects } = data;
</script>

<HeroSection />
<AboutMeSection />
<SkillsSection {skills} />
<ContactSection />
<MyWorkSection {projects} />
