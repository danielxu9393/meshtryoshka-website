<script>
  /** 
   * VideoGrid.svelte
   * Props:
   *  - videos: Array<{ src: string, title: string }>
   *  - columns: number (number of columns in the grid)
   *
   * Usage:
   * <VideoGrid videos="{demoVideos}" columns="{3}" />
   */
  export let videos = [];
  export let columns = 3;

  // Compute Tailwind column class based on `columns` prop
  // e.g., if columns = 3, class = 'grid-cols-3'
  $: columnClass = `grid-cols-${columns}`;
</script>

<div class="grid {columnClass} gap-4">
  {#each videos as { src, title }, index}
    <div class="bg-gray-100 rounded overflow-hidden shadow">
      <!-- Container to maintain 16:9 aspect ratio -->
      <div class="relative w-full pb-[56.25%]"> 
        <video
          class="absolute top-0 left-0 w-full h-full object-cover"
          src="{src}"
          controls
          preload="metadata"
        />
      </div>
      <div class="p-2 text-center">
        <p class="text-sm font-medium text-gray-700">{title}</p>
      </div>
    </div>
  {/each}
</div>

<style>
  /* 
    - The wrapper uses `padding-bottom: 56.25%` (16:9 aspect ratio) so that 
      the video element fills the container.
    - Tailwind’s `object-cover` ensures that videos maintain aspect ratio 
      while covering the container.
  */
</style>