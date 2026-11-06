# Full-screen New Jersey / New York homepage hero

The homepage opening now fills the viewport below the existing header, with the existing headline, supporting copy, and actions over real Hudson waterfront footage. A navy gradient keeps the text readable. This presentation was explicitly approved by the user. The shared header/navigation, typography, lower homepage sections, attorney photo hover effects, interior pages, and SEO code remain unchanged.

## Asset and license

- Current clip: `public/videos/hudson-waterfront.mp4`.
- Current poster: `public/images/hudson-waterfront.jpg`, extracted from the licensed video and delivered with Next.js image optimization.
- Source: [Drone Footage of New York City, Pexels item 6641647](https://www.pexels.com/video/drone-footage-of-new-york-city-6641647/), by CAPTKHO kho. The source identifies this as a view of New York City from the Jersey waterfront. The footage shows the Hudson and Manhattan skyline with the New Jersey waterfront in the foreground.
- Original download: https://videos.pexels.com/video-files/6641647/6641647-uhd_3840_2160_30fps.mp4.
- License reviewed November 5, 2026: [Pexels License](https://www.pexels.com/license/), which permits website use and modification without required attribution. No footage came from another law firm's website.
- Optimized version: H.264/yuv420p, 1920×1080, 20fps, 18.5 seconds, 2,907,697 bytes (approximately 2.91 MB). No audio. Two-thirds source speed and a short dissolve at the loop boundary; fast-start metadata enables progressive playback.
- The earlier `architecture.mp4` and `architecture.jpg` remain in the repository as prior-version assets, but the homepage no longer requests them. The original architectural clip's source was Mixkit item 3115, under its Stock Video Free License.

## Behavior

The server-rendered poster appears immediately, with video source assignment deferred until page load and browser idle. Playback is muted, inline, and looping, with an 800ms fade-in after playback starts. The video fills the background using object-fit cover. Desktop and mobile focal positions keep the skyline in view.

Reduced motion and Save-Data use the poster without assigning the video source. Unsupported MP4, no JavaScript, autoplay restrictions, and download/decode failures retain the photograph. Source removal and CSS respond to live reduced-motion preference changes. Playback pauses when offscreen or in a hidden tab. The 44px pause/play control remains accessible and remembers deliberate pauses when returning to the hero.

## Files

- `src/app/page.tsx`: full-screen homepage hero integration.
- `src/components/home/cinematic-hero.module.css`: homepage-only overlay, viewport sizing, text contrast, and responsive positioning.
- `src/components/home/hero-video.tsx`: progressively loaded video and optimized poster.
- `src/components/home/hero-video.module.css`: media sizing, fade, reduced motion, and pause control.

Replace the local footage/poster paths in the component for future approved assets and record their provenance here. Keep audio stripped, H.264 compatibility, progressive metadata, restrained movement, and a small payload.

## Validation

TypeScript, ESLint, and Next.js production build pass. The existing route checks and indexing tests pass. Safari desktop review confirms the full-screen layout and autoplay. The prior component's desktop/mobile playback and pause/play behavior was manually verified; the current version retains that lifecycle. OS preference emulation, power-saving modes, cross-browser testing, and Lighthouse measurements were not performed. The approved page intentionally remains noindex.
