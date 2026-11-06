# Homepage architectural video

The approved homepage layout is unchanged. Only the existing hero image contents now use `src/components/home/hero-video.tsx` and its scoped CSS module. The original container, global CSS, headline, typography, actions, attorney photographs/hover rules, shared header, interior pages, and SEO code are untouched.

## Asset and license

- Local delivery: `public/videos/architecture.mp4` → `/videos/architecture.mp4`.
- Source: Mixkit, [Apartaments building, item 3115](https://mixkit.co/free-stock-video/apartaments-building-3115/).
- Original download: https://assets.mixkit.co/videos/3115/3115-720.mp4.
- License checked November 5, 2026: [Mixkit Stock Video Free License](https://mixkit.co/license/#videoFree); item listing explicitly identifies commercial and personal use under that license. The license permits modification and use in commercial projects. Attribution is optional. See also [Mixkit User Terms](https://mixkit.co/terms/).
- This is general architectural footage, not the firm's office. No video was taken from another law firm's website. Dhillon Law was a visual reference only.
- The clip is 1280×720 H.264, 24fps, approximately 24.5 seconds and 2.25 MB (2.14 MiB). No audio track. Playback is slowed to two-thirds of source speed, with a one-second crossfade across the loop boundary. The MP4 metadata is moved to the front for progressive playback.
- Poster and fallback remain the existing `/images/architecture.jpg`, served through Next.js image optimization. Its provenance is recorded in `ASSETS.md`.

## Behavior and performance

The initial server-rendered markup retains the exact original optimized Image props and its preload. The video has `autoplay`, `muted`, `loop`, `playsInline`, `preload="none"`, an optimized poster, and no source URL until the page has loaded and the browser is idle. It only starts while the hero intersects the viewport and the document is visible. Playback pauses offscreen or in a background tab; a deliberate user pause persists when returning to the hero.

Reduced-motion preference or Save-Data suppresses source assignment, so those visitors see the existing static image without a video download. A live preference change pauses playback and removes the source; CSS also hides the video immediately for reduced motion. Unsupported MP4, no JavaScript, autoplay denial (including power-saving restrictions), download errors, and decode errors leave the photograph visible. The video fades in over 800ms only once playback starts. No added dependencies, embeds, external video requests, or layout changes.

A small 44px pause/play control inside the video lets visitors stop continuous motion. Existing CTA buttons remain exactly where they were. Video positioning and desaturation match the image's desktop/mobile rules, with `object-fit: cover`.

## Replacing the footage later

Replace `public/videos/architecture.mp4` with a licensed, restrained architectural clip, or change `videoSource` in `hero-video.tsx`. Keep H.264/yuv420p, no audio, fast-start metadata, and a small payload (target under 3 MB). Verify the crop at desktop and mobile dimensions and keep the existing poster unless a matching poster is approved. Record provenance and license for any replacement. Do not add a URL to the server-rendered video element: keeping source assignment deferred prevents unwanted downloads for reduced-motion and Save-Data visitors.

## Validation

- TypeScript, ESLint, and Next.js production build pass.
- ffprobe confirms H.264, 1280×720, 24.5 seconds, and no audio stream.
- Production route smoke checks and the existing noindex tests are run unchanged.
- Scope review confirms no edits to shared header/navigation, global styles, typography, attorney hover styles, interior pages, or SEO implementation.

- Safari desktop and 390px responsive review confirms the existing layout and video crop. Autoplay starts, and the pause/play control changes playback and its accessible label correctly.
- Reduced-motion/Save-Data behavior is implemented and code-reviewed; OS-level preference emulation and power-saving modes were not manually exercised.
