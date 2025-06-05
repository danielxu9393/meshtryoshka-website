<!-- src/routes/+page.svelte -->

<script lang="ts">
    import ComparisonGrid from '$lib/components/ComparisonGrid.svelte';
    import { onMount } from 'svelte';
  
    // (A) Example data for image-comparison slider (unchanged)
    const imageComparisons = [
      {
        id: 'comp1',
        before: '/3dgs_results/stump/test/ours_30000/renders/_DSC9221.png',
        after: '/ours_render/stump/_DSC9221.JPG',
        captionBefore: '3D Gaussian Splatting',
        captionAfter: 'Meshtryoshka (Ours)'
      },
      {
        id: 'comp2',
        before: '/3dgs_results/bicycle/test/ours_30000/renders/_DSC8752.png',
        after: '/ours_render/bicycle/_DSC8752.JPG',
        captionBefore: '3D Gaussian Splatting',
        captionAfter: 'Meshtryoshka (Ours)'
      },
      {
        id: 'comp3',
        before: '/3dgs_results/bonsai/test/ours_30000/renders/DSCF5605.png',
        after: '/ours_render/bonsai/DSCF5605.JPG',
        captionBefore: '3D Gaussian Splatting',
        captionAfter: 'Meshtryoshka (Ours)'
      },
      {
        id: 'comp4',
        before: '/3dgs_results/garden/test/ours_30000/renders/DSC08084.png',
        after: '/ours_render/garden/DSC08084.JPG',
        captionBefore: '3D Gaussian Splatting',
        captionAfter: 'Meshtryoshka (Ours)'
      },
      {
        id: 'comp5',
        before: '/3dgs_results/room/test/ours_30000/renders/DSCF4675.png',
        after: '/ours_render/room/DSCF4675.JPG',
        captionBefore: '3D Gaussian Splatting',
        captionAfter: 'Meshtryoshka (Ours)'
      },
      {
        id: 'comp6',
        before: '/3dgs_results/kitchen/test/ours_30000/renders/DSCF0664.png',
        after: '/ours_render/kitchen/DSCF0664.JPG',
        captionBefore: '3D Gaussian Splatting',
        captionAfter: 'Meshtryoshka (Ours)'
      },
    ];
  
  
    // (E) onMount runs only in the browser → safe from SSR errors
    onMount(async () => {
      // Dynamically import Bulma Carousel JS from node_modules
      // This never runs on the server because onMount is client-only in Svelte
      const bulmaCarousel = (await import('bulma-carousel/dist/js/bulma-carousel.min.js')).default;
  
      // - Attach the carousel behavior to every <div id="…-carousel" class="carousel"> on the page
      // - We’ll give each carousel a unique ID below
      // - You can pass options like slidesToShow, autoplay, etc.
      bulmaCarousel.attach('#trajectory-carousel', {
        slidesToScroll: 1,
        slidesToShow: 3,
        infinite: true,
        autoplay: false,
        pauseOnHover: true
      });
  
      bulmaCarousel.attach('#opt-progress-carousel', {
        slidesToScroll: 1,
        slidesToShow: 3,
        infinite: true,
        autoplay: false,
        pauseOnHover: true
      });

  
    });
  </script>
  
  <main>
    <!-- (0) Hero / Author Section using Bulma classes -->
    <section class="hero is-light">
      <div class="hero-body">
        <div class="container is-max-desktop">
          <div class="columns is-centered">
            <div class="column has-text-centered">
              <h1 class="title is-1">
                Meshtryoshka: Differentiable Mesh Rendering for Unbounded Scenes
              </h1>
              <div class="is-size-5">
                <span class="mr-4">
                  <a href="https://orcid.org/0000-0002-1223-4475" target="_blank">David Charatan</a>
                  <sup>* ¹</sup>
                </span>
                <span class="mr-4">
                  <a href="https://orcid.org/0009-0003-4982-6671" target="_blank">Daniel Xu</a>
                  <sup>* ¹</sup>
                </span>
                <span class="mr-4">
                  <a href="https://orcid.org/0009-0005-5300-5475" target="_blank">Rick Szeliski</a>
                  <sup>²</sup>
                </span>
                <span class="mr-4">
                  <a href="https://orcid.org/0009-0002-5829-2192" target="_blank">George Kopanas</a>
                  <sup>³</sup>
                </span>
                <span>
                  <a href="https://orcid.org/0000-0002-0107-5704" target="_blank">Vincent Sitzmann</a>
                  <sup>¹</sup>
                </span>
              </div>
              <div class="is-size-5">
                <sup>*</sup> Denotes equal contribution
              </div>
              <div class="is-size-5 mb-4">
                <span class="mr-4"><sup>¹</sup> Massachusetts Institute of Technology</span>
                <span class="mr-4"><sup>²</sup> University of Washington</span>
                <span><sup>³</sup> Runway AI, Inc.</span>
              </div>
              <div class="buttons is-centered">
                <a href="meshtryoshka.pdf" class="button is-dark is-rounded">
                  <!-- <span class="icon"><i class="fas fa-file-pdf"></i></span> -->
                  <span class="icon"><i class="ai ai-arxiv"></i></span>
                  <span>Arxiv</span>
                </a>
                <a href="https://github.com/dcharatan/triangle-splatting" class="button is-dark is-rounded">
                  <span class="icon"><i class="fab fa-github"></i></span>
                  <span>Code</span>
                </a>
                <a href="ours_render.zip" class="button is-dark is-rounded">
                  <span class="icon"><i class="far fa-clipboard"></i></span>
                  <span>Results (ZIP)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- (3) Trajectory View Carousel -->
    <section class="hero is-light is-small">
      <div class="hero-body">
        <div class="container">
          <!-- 
            The “results-carousel” class is optional—only here so you can
            write custom CSS if you want to override the Bulma-Carousel defaults.
          -->
          <h2 class="title is-3 has-text-centered mb-4">Videos</h2>

          <div id="trajectory-carousel" class="carousel results-carousel">
            <div class="item">
            <video class="is-fullwidth" autoplay muted loop controls preload="metadata">
                <source src="final_videos/surface_1.5_DSC07956.JPG.mp4" type="video/mp4" />
            </video>
            </div>
            <div class="item">
            <video class="is-fullwidth" autoplay muted loop controls preload="metadata">
                <source src="final_videos/surface_1.5__DSC9213.JPG.mp4" type="video/mp4" />
            </video>
            </div>
            <div class="item">
            <video class="is-fullwidth" autoplay muted loop controls preload="metadata">
                <source src="final_videos/surface_0.2__DSC9056.JPG.mp4" type="video/mp4" />
            </video>
            </div>
            <div class="item">
              <video class="is-fullwidth" autoplay muted loop controls preload="metadata">
                <source src="final_videos/surface_1.5__DSC8768.JPG.mp4" type="video/mp4" />
              </video>
            </div>
            <!-- <div class="item">
              <video class="is-fullwidth" autoplay muted loop controls preload="metadata">
                <source src="final_videos/surface_1.5_DSCF5565.JPG.mp4" type="video/mp4" />
              </video>
            </div> -->
            <!-- <div class="item">
              <video class="is-fullwidth" autoplay muted loop controls preload="metadata">
                <source src="final_videos/surface_1.5_DSCF0656.JPG.mp4" type="video/mp4" />
              </video>
            </div> -->
          </div>
        </div>
      </div>
    </section>
  
    <!-- (4) Optimization Progress Carousel -->
    <section class="hero is-light is-small">
      <div class="hero-body">
        <div class="container">
            <h2 class="title is-3 has-text-centered mb-4">Optimization Progress</h2>
          <div id="opt-progress-carousel" class="carousel results-carousel">
            <div class="item">
              <video class="is-fullwidth" autoplay muted loop controls preload="metadata">
                <source src="final_videos/_DSC8679.mp4" type="video/mp4" />
              </video>
            </div>
            <div class="item">
              <video class="is-fullwidth" autoplay muted loop controls preload="metadata">
                <source src="final_videos/DSCF6017.mp4" type="video/mp4" />
              </video>
            </div>
            <div class="item">
              <video class="is-fullwidth" autoplay muted loop controls preload="metadata">
                <source src="final_videos/_DSC9040.mp4" type="video/mp4" />
              </video>
            </div>
            <div class="item">
              <video class="is-fullwidth" autoplay muted loop controls preload="metadata">
                <source src="final_videos/_DSC9293.mp4" type="video/mp4" />
              </video>
            </div>
            <!-- <div class="item">
              <video class="is-fullwidth" autoplay muted loop controls preload="metadata">
                <source src="final_videos/DSC07956.mp4" type="video/mp4" />
              </video>
            </div>
            <div class="item">
              <video class="is-fullwidth" autoplay muted loop controls preload="metadata">
                <source src="final_videos/DSCF0656.mp4" type="video/mp4" />
              </video>
            </div> -->
          </div>
        </div>
      </div>
    </section>
  
    <!-- (1) Abstract Section -->
    <section class="section">
      <div class="container is-max-desktop">
        <div class="columns is-centered has-text-centered">
          <div class="column is-four-fifths">
            <h2 class="title is-3">Abstract</h2>
            <div class="content has-text-justified">
              <p>
                Differentiable rendering has emerged as a powerful approach for 3D reconstruction
                and novel view synthesis. Today, state-of-the-art differentiable rendering methods
                combine a variety of custom representations of 3D geometry and appearance with
                specialized renderers. However, most downstream tasks in computer graphics rely on
                3D meshes, which provide superior portability, allow for hardware-accelerated rendering,
                and are at the core of most computer graphics workflows. While prior work has attempted
                differentiable rendering with mesh representations, these approaches are limited to
                object-centric scenes and fail to reconstruct large-scale, unbounded scenes.
              </p>
              <p>
                In this work, we introduce <em>Meshtryoshka</em>, a novel mesh differentiable rendering
                framework that combines an off-the-shelf triangle rasterizer with a 3D representation
                that consists of nested mesh shells which resemble a matryoshka doll. In every forward
                pass, the mesh shells are extracted anew from a 3D signed distance function via
                iso-surface extraction, and the opacities for each vertex are computed as a function
                of signed distance. Each mesh shell is then rasterized independently, and the final
                image is created via alpha compositing. Crucially, mesh vertex positions are updated
                only indirectly via gradients that flow through the opacity values into the signed
                distance function, and hence, our method is compatible with off-the-shelf mesh renderers
                that need not be differentiable with respect to vertex positions.
              </p>
              <p>
                On object-centric scenes, our method performs competitively with surface-based differentiable
                rendering techniques. To the best of our knowledge, our method is the first differentiable
                mesh rendering method that scales to unbounded, real-world 3D scenes, where it yields
                high-quality novel view synthesis results approaching those of state-of-the-art, non-mesh
                methods. Our method suggests that it may be possible to solve the differentiable rendering
                problem without relying on specialized renderers, only using conventional tools from the
                computer graphics toolbox.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- (1) Methods Section -->
    <section class="section">
        <div class="container" style="width: 80%; margin: 0 auto;">
        <div class="columns is-centered has-text-centered">
            <div class="column">
            <h2 class="title is-3">Overview</h2>
            <div class="content has-text-justified">
                <img
                src="/figures/figure_overview/figure_overview.svg"
                alt="Teaser Figure"
                style="width: 100%; height: auto; display: block; margin-bottom: 2.5rem;"
                />

                <!-- <img
                src="/figures/figure_teaser/figure_teaser.png"
                alt="Teaser Figure"
                style="width: 100%; height: auto; display: block; margin-bottom: 2.5rem;"
                /> -->
                <p>
                  We transform a standard <em>non-differentiable</em> triangle rasterizer into an effective 
                  triangle-based differentiable renderer via several key ideas. First, we parameterize scenes 
                  via cubic grids of signed distances and view-dependent colors. We apply differentiable
                  marching cubes on multiple level sets of the signed distance field, to extract a set of 
                  nested mesh shells---a <em>Meshtryoshka</em>---from a scene. Each shell is a mesh whose vertices
                  contain color features interpolated from the grid representation.
                </p>

                <img
                src="/figures/figure_rendering/figure_rendering.svg"
                alt="Teaser Figure"
                style="width: 100%; height: auto; display: block; margin-bottom: 2.5rem;"
                />

                <p>
                  Second, we render these shells using a two-step pipeline of rasterization and deferred shading, 
                  which allows us to utilize an off-the-shelf rasterizers. A rasterizer computes for each pixel
                  the triangle ID and barycentric coordinates of the first ray-triangle intersection. 
                  While this operation is non-differentiable, it can be combined with differentiable image-space interpolation
                  to convert per-triangle-vertex values into differentiable per-pixel values.
                  We perform this process on each mesh shell independently, and then combine the results via alpha compositing,
                  using the signed distance values to compute per-shell opacities. As explained in our paper, this formulation
                  is a close approximation of rendering the shells using ray tracing, allowing for gradient-based optimization.
                </p>
                

                <img
                src="/figures/figure_marching_cubes/figure_marching_cubes.svg"
                alt="Teaser Figure"
                style="width: 100%; height: auto; display: block; margin-bottom: 2.5rem;"
                />
                <p>
                  Finally, to scale to real-world scenes, we use a mask to only store parameters in regions
                  occupied by shells. To handle this, we implement the differentiable marching cubes
                  that works on a sparse grid. We optimize coarse to fine, starting from a dense grid at
                  low resolution. At a fixed
                  interval, we prune and subdivide the grid by marking all voxels
                  that contribute to triangles on the zero level set, dilating, and upscaling
                  to form the new active grid. After
                  extracting a new set of vertices for the upscaled active grid, we 
                  trilinearly interpolate the previous subdivision
                  level's signed distance and spherical harmonics values.

                  We divide real-world scenes into foreground and background. The foreground
                  is represented as a regular 3D grid, while the background is represented
                  as a set of six truncated frustums resembling a tesseract in 3D. Each frustum
                  composes of frustum-shaped voxels which naturally are larger in proportion to the distance
                  from the scene center, ensuring that farther regions are represented
                  more sparsely.
                  
                </p>
      
            </div>
            </div>
        </div>
        </div>
    </section>
  
    <!-- (2) Image-Comparisons (unchanged) -->
    <section class="section">
      <!-- <div class="container is-max-desktop"> -->
      <div class="container is-fluid">
        <h2 class="title is-3 has-text-centered mb-4">Image Comparisons</h2>
        <ComparisonGrid comparisons={imageComparisons} columns="2" />
      </div>
    </section>
  

  
  </main>
  
  <style>
    /* Bulma handles most styling. If you need to tweak the carousel’s look: */
    .results-carousel {
    overflow: hidden;
    }

    .results-carousel .item {
    margin: 5px;
    overflow: hidden;
    border: 1px solid #bbb;
    border-radius: 10px;
    padding: 0;
    font-size: 0;
    }

    .results-carousel video {
    margin: 0;
    }

      /* Replace 3/2 with your PDF’s actual width / height ratio */
  .pdf-wrapper {
    width: 100%;
    aspect-ratio: 3 / 2; /* e.g. 1200×800 → 3/2 → 1.5 */
    /* you can optionally add max-width if you don’t want it to grow beyond some value:
       max-width: 800px; */
  }
  .pdf-content {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }
  </style>