# Active Theory · Creative Digital Experiences

A high-performance WebGL digital experience matching [activetheory.net](https://activetheory.net/), engineered with full WebGL canvas stage (`#Stage`), real-time fluid mouse flow physics, kinetic typography shaders (`BasicGLTextBatch`), 3D scene environments, responsive spatial navigation, ambient audio soundtracks with visualizer HUD, and interactive work/lab case studies.

---

## 1. Overview & Architecture

- **Visual & Interaction Design**: Identical to [Active Theory (activetheory.net)](https://activetheory.net/) with full WebGL canvas stage (`#Stage`), interactive water reflection surface with real-time fluid mouse flow physics, kinetic typography shaders (`BasicGLTextBatch`), 3D scene environments (Abbot Kinney, Amsterdam Bridge, Skate Park, Venice Beach), and responsive spatial navigation.
- **Engine**: Active Theory v6 WebGL engine (`app.1780406240914.js`), with off-thread worker processing (`hydra-thread.js`) and Draco 3D mesh decompression.
- **Dynamic Asset Pipeline**: Custom Vite middleware (`vite.config.js`) resolving MIME headers for `.vs`, `.ktx`, `.bin`, `.wasm`, and `.cube` assets, plus dynamic symlinks for both dev and static production deployments.

---

## 2. Directory Structure

```
ai-3d-portfolio/
├── public/
│   ├── assets/
│   │   ├── cms/           # Metadata, contact, and project datasets (dev & latest)
│   │   ├── css/           # Studio SCSS stylesheet
│   │   ├── data/          # UIL layouts (uil.1780406240914.json, uil.json)
│   │   ├── fonts/         # NB Architekt Std font family (Regular, Light, Bold)
│   │   ├── fx/            # Glitch displacement maps & optical distortion textures
│   │   ├── geometry/      # 3D geometries (scenes, particles, logo, meshes)
│   │   ├── images/        # PBR LUTs, water normals, textures, UI iconography
│   │   ├── js/            # Active Theory v6 engine & Draco wasm decoders
│   │   ├── meta/          # Web manifest, apple touch icons, favicons
│   │   ├── music/         # Ambient soundtracks
│   │   ├── shaders/       # Compiled GLSL vertex & fragment shaders (compiled.vs)
│   │   └── video/         # Showreel video & preview posters
│   ├── unsupported.html   # Fallback for incompatible browsers
│   ├── favicon.svg
│   └── icons.svg
├── dist/                  # Optimized production build with symlinked routes
├── index.html             # High-DPI Active Theory v6 stage entrypoint
├── vite.config.js         # Custom MIME & path resolver plugin
└── package.json           # Dependencies and build scripts
```

---

## 3. Quick Start & Commands

### Prerequisites
- **Node.js**: `v20.0.0` or higher
- **npm**: `v10.0.0` or higher

```bash
# 1. Install dependencies
npm install

# 2. Start local development server (with HMR)
npm run dev

# 3. Build optimized production bundle
npm run build

# 4. Preview production build locally
npm run preview

# 5. Run static linting
npm run lint
```

---

## 4. Key Engineering Features

1. **Active Theory v6 Engine**:
   - High-DPI `#Stage` WebGL canvas with fluid surface simulation and cursor ripples.
   - Smooth spatial camera scrolling across Home, Work, About, Lab, and Contact views.
   - 3D floating interactive project cards with case studies, video textures, and touch navigation.
2. **Audio Controller & Visualizer**:
   - Ambient music player with 8 integrated soundtrack tracks and real-time visualizer HUD.
3. **Vite Dynamic Path Resolver Plugin**:
   - Serves `.vs`, `.ktx`, `.bin`, `.wasm`, and `.cube` with accurate MIME headers.
   - Generates production symlinks in `dist/` allowing any static host (Nginx, Apache, Cloudflare Pages, Vercel) to serve without 404 errors.
