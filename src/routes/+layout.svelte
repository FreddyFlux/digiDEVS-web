<script lang="ts">
	import { Footer, Navigation } from '$components';
	import '../app.css';

	let { children } = $props();
</script>

<Navigation />
{@render children()}
<Footer />
