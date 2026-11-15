<script>
  import { store, setView, ROLES } from './lib/store.svelte.js';
  import Sidebar from './components/Sidebar.svelte';
  import Toasts from './components/Toasts.svelte';
  import Registry from './views/Registry.svelte';
  import Annotation from './views/Annotation.svelte';
  import Biopsy from './views/Biopsy.svelte';
  import Pathology from './views/Pathology.svelte';
  import Followup from './views/Followup.svelte';
  import Stats from './views/Stats.svelte';

  const VIEWS = { registry: Registry, annotation: Annotation, biopsy: Biopsy, pathology: Pathology, followup: Followup, stats: Stats };
  const COMPONENT = $derived(VIEWS[store.view] || Registry);
</script>

<div class="app-grid">
  <Sidebar />
  <div class="main-col">
    <main class="content">
      {#key store.view}
        <div class="fade-up">
          <COMPONENT />
        </div>
      {/key}
    </main>
  </div>
</div>
<Toasts />

<style>
  .main-col { background: var(--bg); }
  @media (max-width: 760px) {
    .app-grid { grid-template-columns: minmax(0, 1fr); }
  }
</style>
