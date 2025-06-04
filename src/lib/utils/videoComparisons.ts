// src/lib/utils/videoComparisons.ts

import { clamp } from './beforeAfter';

/**
 * playVids(videoId)
 * -----------------
 *   Given a <video id="videoId"> whose source is a single
 *   horizontally concatenated “before|after” video, plus
 *   a <canvas id="videoIdMerge"> overlay, we draw the split-screen
 *   preview (left half vs. right half) interactively.
 *
 *   - `videoId`: string, the ID of the <video> element (e.g. "vid1").
 *
 *   This function sets up event listeners on the canvas (mousemove, touchmove),
 *   then repeatedly draws onto the canvas via requestAnimationFrame.
 */
export function playVids(videoId: string): void {
  const videoMerge = document.getElementById(videoId + 'Merge') as HTMLCanvasElement;
  const vid = document.getElementById(videoId) as HTMLVideoElement;

  if (!videoMerge || !vid) {
    console.warn(`playVids: could not find video or canvas for ID '${videoId}'`);
    return;
  }

  let position = 0.75; // normalized [0…1]
  let vidWidth = 0;    // will set once metadata is loaded
  let vidHeight = 0;

  const mergeContext = videoMerge.getContext('2d');
  if (!mergeContext) {
    console.warn(`playVids: cannot get 2D context of canvas '${videoId}Merge'`);
    return;
  }

  // Only start drawing once the video has enough data
  if (vid.readyState > 3) {
    vidWidth = vid.videoWidth / 2;
    vidHeight = vid.videoHeight;
    vid.play();

    // Update vidWidth/vidHeight if metadata changes (rare after load)
    vid.addEventListener('loadedmetadata', () => {
      vidWidth = vid.videoWidth / 2;
      vidHeight = vid.videoHeight;
    });

    // Mouse/touch event handlers to recalc `position`
    function trackLocation(e: MouseEvent) {
      const rect = videoMerge.getBoundingClientRect();
      position = clamp((e.clientX - rect.x) / rect.width, 0, 1);
    }
    function trackLocationTouch(e: TouchEvent) {
      const rect = videoMerge.getBoundingClientRect();
      position = clamp((e.touches[0].clientX - rect.x) / rect.width, 0, 1);
    }

    videoMerge.addEventListener('mousemove', trackLocation);
    videoMerge.addEventListener('touchstart', trackLocationTouch);
    videoMerge.addEventListener('touchmove', trackLocationTouch);

    // The render loop: draw left half, then clipped right half, then handle
    const drawLoop = () => {
      // Draw left half (source x=0, width=vidWidth)
      mergeContext.drawImage(vid, 0, 0, vidWidth, vidHeight, 0, 0, vidWidth, vidHeight);

      // Compute clipping region for the right half
      const colStart = clamp(vidWidth * position, 0, vidWidth);
      const colWidth = clamp(vidWidth - vidWidth * position, 0, vidWidth);

      // Draw portion of the right half (source x=vidWidth+colStart)
      mergeContext.drawImage(
        vid,
        colStart + vidWidth,
        0,
        colWidth,
        vidHeight,
        colStart,
        0,
        colWidth,
        vidHeight
      );

      // Draw the vertical separator and arrow
      const arrowLength = 0.09 * vidHeight;
      const arrowheadWidth = 0.025 * vidHeight;
      const arrowheadLength = 0.04 * vidHeight;
      const arrowPosY = vidHeight / 10;
      const arrowWidth = 0.007 * vidHeight;
      const currX = vidWidth * position;

      // Semi-transparent circle behind arrow
      mergeContext.beginPath();
      mergeContext.arc(currX, arrowPosY, arrowLength * 0.7, 0, Math.PI * 2, false);
      mergeContext.fillStyle = '#FFD79340';
      mergeContext.fill();
      mergeContext.closePath();

      // Separator line
      mergeContext.beginPath();
      mergeContext.moveTo(currX, 0);
      mergeContext.lineTo(currX, vidHeight);
      mergeContext.closePath();
      mergeContext.strokeStyle = '#444444';
      mergeContext.lineWidth = 5;
      mergeContext.stroke();

      // Draw double‐headed arrow
      mergeContext.beginPath();
      mergeContext.moveTo(currX, arrowPosY - arrowWidth / 2);
      // Right half
      mergeContext.lineTo(
        currX + arrowLength / 2 - arrowheadLength / 2,
        arrowPosY - arrowWidth / 2
      );
      mergeContext.lineTo(
        currX + arrowLength / 2 - arrowheadLength / 2,
        arrowPosY - arrowheadWidth / 2
      );
      mergeContext.lineTo(currX + arrowLength / 2, arrowPosY);
      mergeContext.lineTo(
        currX + arrowLength / 2 - arrowheadLength / 2,
        arrowPosY + arrowheadWidth / 2
      );
      mergeContext.lineTo(
        currX + arrowLength / 2 - arrowheadLength / 2,
        arrowPosY + arrowWidth / 2
      );
      // Left half
      mergeContext.lineTo(
        currX - arrowLength / 2 + arrowheadLength / 2,
        arrowPosY + arrowWidth / 2
      );
      mergeContext.lineTo(
        currX - arrowLength / 2 + arrowheadLength / 2,
        arrowPosY + arrowheadWidth / 2
      );
      mergeContext.lineTo(currX - arrowLength / 2, arrowPosY);
      mergeContext.lineTo(
        currX - arrowLength / 2 + arrowheadLength / 2,
        arrowPosY - arrowheadWidth / 2
      );
      mergeContext.lineTo(
        currX - arrowLength / 2 + arrowheadLength / 2,
        arrowPosY
      );
      mergeContext.lineTo(
        currX - arrowLength / 2 + arrowheadLength / 2,
        arrowPosY - arrowWidth / 2
      );
      mergeContext.lineTo(currX, arrowPosY - arrowWidth / 2);
      mergeContext.closePath();
      mergeContext.fillStyle = '#444444';
      mergeContext.fill();

      requestAnimationFrame(drawLoop);
    };

    requestAnimationFrame(drawLoop);
  } else {
    // If video is not ready, wait for it to have metadata
    vid.addEventListener('loadedmetadata', () => playVids(videoId));
  }
}

/**
 * resizeAndPlay(element)
 * ----------------------
 *   Call this on the <video> element’s `onloadedmetadata` or `oncanplay` event.
 *   It:
 *     1) Finds the sibling canvas (id + "Merge"), sets its width/height to half+full
 *     2) Calls .play() on the video
 *     3) Hides the <video> element’s native display by setting its height to 0
 *     4) Calls playVids(video.id)
 *
 *   Usage in Svelte:
 *     <video
 *       id="{id}"
 *       src="{combinedUrl}"
 *       onloadedmetadata="{(e) => resizeAndPlay(e.target)}"
 *       muted
 *       playsinline
 *     />
 */
export function resizeAndPlay(element: HTMLVideoElement): void {
  const canvas = document.getElementById(element.id + 'Merge') as HTMLCanvasElement;
  if (!canvas) {
    console.warn(`resizeAndPlay: canvas for '${element.id}Merge' not found.`);
    return;
  }
  canvas.width = element.videoWidth / 2;
  canvas.height = element.videoHeight;
  element.play();
  element.style.height = '0px'; // hide the raw <video> element
  playVids(element.id);
}