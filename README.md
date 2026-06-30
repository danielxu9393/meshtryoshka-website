# Meshtryoshka project website

Project page for *Meshtryoshka: Differentiable Mesh Rendering for Unbounded Scenes*.

This is a static, dependency-free site — a single hand-written HTML file plus
its assets. There is no build step or framework.

## Structure

```
docs/
  index.html        # the entire site (inline CSS + a little vanilla JS)
  paper.pdf
  final_videos/     # result + optimization-progress videos
  figures/          # method figures (SVG/PNG)
  ours_render/      # "after" images for the comparison sliders
  3dgs_results/     # "before" images for the comparison sliders
```

## Developing

Open `docs/index.html` directly, or serve the folder so relative paths resolve:

```bash
cd docs
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying

GitHub Pages is published from `docs/` by `.github/workflows/deploy.yml` on every
push to `main`. The workflow just uploads the folder as-is — no build.
