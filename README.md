# Meshtryoshka project website

Project page for *Meshtryoshka: Differentiable Mesh Rendering for Unbounded Scenes*.

This is a static, dependency-free site — a single hand-written HTML file plus
its assets. There is no build step or framework.

## Structure

```
index.html        # the entire site (inline CSS + a little vanilla JS)
final_videos/     # result + optimization-progress videos
figures/          # method figures (SVG/PNG)
ours_render/      # "after" images for the comparison sliders
3dgs_results/     # "before" images for the comparison sliders
```

## Developing

Open `index.html` directly, or serve the repo so relative paths resolve:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying

GitHub Pages serves the site straight from this branch. In the repo's
**Settings → Pages**, set:

- **Source:** Deploy from a branch
- **Branch:** `main`, folder `/ (root)`

No build step runs. The `.nojekyll` file disables Jekyll so that asset files
beginning with an underscore (e.g. `_DSC8679.mp4`) are served correctly.
