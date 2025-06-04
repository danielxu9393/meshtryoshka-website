<script lang="ts">
  import { onMount } from 'svelte';
  import { BeforeAfter } from '$lib/utils/beforeAfter';

  /** 
   * Props:
   *  - comparisons: Array<{
   *       id: string;         // unique container ID, e.g. "comp1"
   *       before: string;     // URL of the before-image
   *       after: string;      // URL of the after-image
   *       captionBefore: string;
   *       captionAfter: string;
   *    }>
   *  - columns: number       // number of CSS grid columns
   */
  export let comparisons: Array<{
    id: string;
    before: string;
    after: string;
    captionBefore: string;
    captionAfter: string;
  }> = [];

  export let columns: number = 2;

  // Compute Tailwind grid‐column class (e.g. "grid-cols-2")
  $: columnClass = `grid-cols-${columns}`;

  onMount(() => {
    comparisons.forEach((item) => {
      // Instantiate a BeforeAfter slider for each container
      new BeforeAfter({ id: `#${item.id}` });
    });
  });
</script>

<div class="grid {columnClass} gap-4">
  {#each comparisons as { id, before, after, captionBefore, captionAfter }}
    <div id="{id}" class="relative small-bal-container bg-white rounded shadow overflow-hidden">
      <div class="bal-wrapper">
        <!-- AFTER layer -->
        <div class="bal-after">
          <img src="{after}" alt="After image" class="img-fluid w-full h-auto block" />
          <div class="bal-afterPosition afterLabel">
            {captionAfter}
          </div>
        </div>
        <!-- BEFORE layer -->
        <div class="bal-before">
          <div class="bal-before-inset">
            <img src="{before}" alt="Before image" class="img-fluid w-full h-auto block" />
            <div class="bal-beforePosition beforeLabel">
              {captionBefore}
            </div>
          </div>
        </div>
        <!-- Handle -->
        <!-- <div class="bal-handle"></div> -->
        <div class="bal-handle" style="left: 50%;">
            <div class="handle-left-arrow"></div>
            <div class="handle-right-arrow"></div>
        </div>
      </div>
    </div>
  {/each}
</div>

<style>
  /* 
    The CSS for .small-bal-container, .bal-wrapper, .bal-before, .bal-after, etc.
    comes from src/styles/beforeAfter.css (imported globally in main.ts).
  */
</style>