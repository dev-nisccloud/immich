<script lang="ts">
  import ImmichLogo from '$lib/components/shared-components/immich-logo.svelte';
  import { mobileDevice } from '$lib/stores/mobile-device.svelte';
</script>

<a data-sveltekit-preload-data="hover" class="ms-4" href="/">
  <ImmichLogo class="h-[80px] w-[80px] max-w-none" noText={mobileDevice.maxMd} />
</a>
