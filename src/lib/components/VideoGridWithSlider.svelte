<script lang="ts">
  import { onMount } from 'svelte';
  import { resizeAndPlay } from '$lib/utils/videoComparisons';

  /**
   * Props:
   *  - comparisons: Array<{
   *       id: string;      // unique ID for this video (e.g. "vid1")
   *       combinedUrl: string; // URL to a single video that has left‐half=before, right‐half=after
   *       title?: string;  // optional caption below
   *    }>
   *  - columns: number   // number of grid columns
   */
  export let comparisons: Array<{
    id: string;
    combinedUrl: string;
    title?: string;
  }> = [];

  export let columns: number = 2;

  // Compute Tailwind grid‐column class (e.g. "grid-cols-3")
  $: columnClass = `grid-cols-${columns}`;

  onMount(() => {
    // After mount, wait for 'loadedmetadata' on each <video> to call resizeAndPlay
    comparisons.forEach(({ id }) => {
      const videoEl = document.getElementById(id) as HTMLVideoElement | null;
      if (videoEl) {
        videoEl.addEventListener('loadedmetadata', () => {
          resizeAndPlay(videoEl);
        });
      }
    });
  });
</script>

<div class="grid {columnClass} gap-4">
  {#each comparisons as { id, combinedUrl, title }}
    <div class="relative bg-gray-100 rounded shadow overflow-hidden">
      <!-- 
        The <video> element is loaded off‐screen (we hide it by setting height=0).
        We rely on the sibling <canvas> (id="{id}Merge") to draw the split view.
      -->
      <video
        id="{id}"
        src="{combinedUrl}"
        muted
        playsinline
        class="block w-full h-auto"
      ></video>

      <canvas
        id="{id}Merge"
        class="absolute top-0 left-0 w-full h-full"
      ></canvas>

      {#if title}
        <div class="p-2 bg-white text-center text-sm font-medium text-gray-700">
          {title}
        </div>
      {/if}
    </div>
  {/each}
</div>

<style>
  /* No extra CSS needed here; the canvas is positioned on top of the video. */
</style>