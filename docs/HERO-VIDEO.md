# Full-screen New Jersey homepage hero

The homepage opening now fills the viewport below the existing header, with the existing headline, supporting copy, and actions over real New Jersey waterfront skyline footage. A navy gradient keeps the text readable. This presentation was explicitly approved by the user. The shared header/navigation, typography, lower homepage sections, attorney photo hover effects, interior pages, and SEO code remain unchanged.

## Asset and license

- Current clip: `public/videos/new-jersey-waterfront.mp4`.
- Current poster: `public/images/new-jersey-waterfront.jpg`, extracted near the start of the licensed video and delivered through Next.js image optimization.
- Source: [Hoboken, New Jersey Silhouetted Skyline Sunset 4K, Videezy item 3526](https://www.videezy.com/urban/3526-hoboken-new-jersey-silhouetted-skyline-sunset-4k). The provider identifies the subject as the New Jersey waterfront skyline. The website uses the broad caption “New Jersey waterfront,” rather than asserting a particular municipality. This replaces the previous footage centered on Manhattan.
- Original: downloaded through the item's official Free Download link, at 3840×2160. The lower-resolution preview was used only during evaluation and is not shipped.
- License reviewed November 5, 2026: [Videezy Standard License for item 3526](https://www.videezy.com/resources/3526/license_info_modal). It permits personal and commercial use with attribution. The homepage displays the required “Free stock footage by Videezy” credit and links to Videezy. Retain this credit while using the free license.
- Optimized version: H.264/yuv420p, 1920×1080, 20fps, 14.5 seconds, 2,665,149 bytes (approximately 2.67 MB). No audio. Two-thirds source speed and a short dissolve at the loop boundary; fast-start metadata enables progressive playback.
- Earlier Manhattan/Pexels and generic architecture/Mixkit footage remains in the repository for prior-version reference but is no longer requested by the homepage. No footage came from another law firm's website.

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

TypeScript, ESLint, and Next.js production build pass. The existing route checks and indexing tests pass. Safari desktop review confirms the New Jersey footage, full-screen layout, autoplay, readable gold headline, and on-page license credit. The prior component's desktop/mobile playback and pause/play behavior was manually verified; the current version retains that lifecycle. OS preference emulation, power-saving modes, cross-browser testing, and Lighthouse measurements were not performed. The approved page intentionally remains noindex.
