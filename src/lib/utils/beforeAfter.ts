// src/lib/utils/beforeAfter.ts

/**
 * clamp(n, min, max)
 * -------------------
 *   Utility function that clamps `n` between min and max.
 *   We avoid mutating Number.prototype in TS; instead we export a helper.
 */
export function clamp(n: number, min: number, max: number): number {
    return Math.min(Math.max(n, min), max);
  }
  
  /**
   * BeforeAfter
   * -------------
   *   A vanilla‐TS class that turns any container with the `.bal-wrapper`
   *   structure into an image “before/after” slider. 
   *
   *   Expected HTML structure for each slider:
   *     <div id="comp1" class="small-bal-container">
   *       <div class="bal-wrapper">
   *         <div class="bal-after">
   *           <img src="after.jpg" class="img-fluid" />
   *           <div class="bal-afterPosition afterLabel">After Label</div>
   *         </div>
   *         <div class="bal-before">
   *           <div class="bal-before-inset">
   *             <img src="before.jpg" class="img-fluid" />
   *             <div class="bal-beforePosition beforeLabel">Before Label</div>
   *           </div>
   *         </div>
   *         <div class="bal-handle"></div>
   *       </div>
   *     </div>
   *
   *   Usage in a Svelte component:
   *     import { BeforeAfter } from '$lib/utils/beforeAfter';
   *     onMount(() => { new BeforeAfter({ id: '#comp1' }); });
   *
   *   Props:
   *     - enteryObject: { id: string }  where id is a CSS selector (e.g. "#comp1")
   */
  interface BeforeAfterOptions {
    id: string;
  }
  
  export class BeforeAfter {
    private container!: HTMLElement;
    private beforeEl!: HTMLElement;
    private beforeInsetEl!: HTMLElement;
    private afterTextEl!: HTMLElement;
    private handleEl!: HTMLElement;
  
    constructor(options: BeforeAfterOptions) {
      const { id } = options;
      const container = document.querySelector<HTMLElement>(id);
      if (!container) {
        console.warn(`BeforeAfter: container ${id} not found.`);
        return;
      }
      this.container = container;
      // Query sub‐elements
      const before = container.querySelector<HTMLElement>('.bal-before');
      const beforeInset = container.querySelector<HTMLElement>('.bal-before-inset');
      const afterText = container.querySelector<HTMLElement>('.bal-afterPosition');
      const handle = container.querySelector<HTMLElement>('.bal-handle');
  
      if (!before || !beforeInset || !afterText || !handle) {
        console.warn(`BeforeAfter: one of the required sub-elements is missing inside ${id}.`);
        return;
      }
  
      this.beforeEl = before;
      this.beforeInsetEl = beforeInset;
      this.afterTextEl = afterText;
      this.handleEl = handle;
  
      // Initial setup: set the width of .bal-before-inset to the container’s width
      this.updateBeforeInsetWidth();
      // On window resize, update again
      window.addEventListener('resize', () => this.updateBeforeInsetWidth());
  
      // Initialize at 50%
      this.beforeEl.style.width = '50%';
      this.handleEl.style.left = '50%';
  
      // Touch events
      container.addEventListener('touchstart', (e) => {
        container.addEventListener('touchmove', this.onTouchMove);
      });
  
      // Mouse events
      container.addEventListener('mousemove', this.onMouseMove);
    }
  
    // Calculate and set the .bal-before-inset width to the container’s width in pixels
    private updateBeforeInsetWidth() {
      const w = this.container.offsetWidth;
      this.beforeInsetEl.style.width = `${w}px`;
    }
  
    // Handler for touch‐move: adjust slider based on finger position
    private onTouchMove = (e: TouchEvent) => {
      const containerWidth = this.container.offsetWidth;
      const touchX = e.changedTouches[0].clientX;
      const startOfDiv = this.container.offsetLeft;
      const modifiedX = touchX - startOfDiv;
      if (modifiedX > 10 && modifiedX < containerWidth - 10) {
        const newWidthPct = (modifiedX * 100) / containerWidth;
        this.beforeEl.style.width = `${newWidthPct}%`;
        this.afterTextEl.style.zIndex = '1';
        this.handleEl.style.left = `${newWidthPct}%`;
      }
    };
  
    // Handler for mouse‐move: adjust slider based on mouse X position
    private onMouseMove = (e: MouseEvent) => {
      const containerWidth = this.container.offsetWidth;
      const xOffset = e.offsetX;
      if (xOffset > 10 && xOffset < containerWidth - 10) {
        const newWidthPct = (xOffset * 100) / containerWidth;
        this.beforeEl.style.width = `${newWidthPct}%`;
        this.afterTextEl.style.zIndex = '1';
        this.handleEl.style.left = `${newWidthPct}%`;
      }
    };
  }