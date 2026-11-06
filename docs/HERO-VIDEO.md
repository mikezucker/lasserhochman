# Full-screen New Jersey homepage hero

The homepage opening now fills the viewport below the existing header, with the existing headline, supporting copy, and actions over real New Jersey waterfront skyline footage. A navy gradient keeps the text readable. This presentation was explicitly approved by the user. The shared header/navigation, typography, lower homepage sections, attorney photo hover effects, interior pages, and SEO code remain unchanged.

## Asset and license

- Current clip: `public/videos/new-jersey-waterfront.mp4`.
- Current poster: `public/images/new-jersey-waterfront.jpg`, extracted near the start of the licensed video and delivered through Next.js image optimization.
- Source: [Hoboken, New Jersey Silhouetted Skyline Sunset 4K, Videezy item 3526](https://www.videezy.com/urban/3526-hoboken-new-jersey-silhouetted-skyline-sunset-4k). The provider identifies the subject as the New Jersey waterfront skyline. The website uses the broad caption “New Jersey waterfront,” rather than asserting a particular municipality. This replaces the previous footage centered on Manhattan.
- Original: downloaded through the item's official Free Download link, at 3840×2160. The lower-resolution preview was used only during evaluation and is not shipped.
- License reviewed November 5, 2026: [Videezy Standard License for item 3526](https://www.videezy.com/resources/3526/license_info_modal). It permits personal and commercial use with attribution. The homepage displays the required “Free stock footage by Videezy” credit and links to Videezy. Retain this credit while using the free license.
- Optimized version: H.264 High Profile Level 4.0/yuv420p, 1920×1080, 20fps, 14.5 seconds, 2,665,149 bytes (approximately 2.67 MB). No audio. Two-thirds source speed and a short dissolve at the loop boundary; fast-start metadata enables progressive playback.
- Earlier Manhattan/Pexels and generic architecture/Mixkit footage remains in the repository for prior-version reference but is no longer requested by the homepage. No footage came from another law firm's website.

## Behavior

The server-rendered poster appears immediately, with video source assignment deferred until browser idle (with a two-second deadline), independently of the page load event. Only an onscreen hero in a visible tab receives a source. Playback is muted, inline, and looping. The video element remains opaque for Safari visibility checks; the poster above it fades out over 800ms only after playback starts. The video fills the background using object-fit cover. Desktop and mobile focal positions keep the skyline in view.

Reduced motion and Save-Data use the poster without assigning the video source. Unsupported MP4, no JavaScript, autoplay restrictions, and download/decode failures retain the photograph. Source removal and CSS respond to live reduced-motion preference changes. Playback pauses when offscreen or in a hidden tab. No native or custom video controls are displayed, as requested. Pausing or a rejected play attempt restores the poster.

## Files

- `src/app/page.tsx`: full-screen homepage hero integration.
- `src/components/home/cinematic-hero.module.css`: homepage-only overlay, viewport sizing, text contrast, and responsive positioning.
- `src/components/home/hero-video.tsx`: progressively loaded video and optimized poster.
- `src/components/home/hero-video.module.css`: media sizing, fade, reduced motion, and pause control.

Replace the local footage/poster paths in the component for future approved assets and record their provenance here. Keep audio stripped, H.264 compatibility, progressive metadata, restrained movement, and a small payload.

## Validation

TypeScript, ESLint, and Next.js production build pass. The existing route checks and indexing tests pass. Safari desktop review confirms the New Jersey footage, full-screen layout, autoplay, readable gold headline, and on-page license credit. The prior component's desktop/mobile playback and pause/play behavior was manually verified; the current version retains that lifecycle. OS preference emulation, power-saving modes, cross-browser testing, and Lighthouse measurements were not performed. The approved page intentionally remains noindex.

## Mobile playback investigation — November 6, 2026

Reproduced a startup dependency in Playwright WebKit with an iPhone-sized viewport: holding a font request open kept `document.readyState` at `interactive`, the video source absent, and playback at zero. Releasing that request completed `window.load` and started playback. Startup now schedules idle work directly after hydration instead of waiting for every page resource. The prior component already supplied autoplay, muted, loop, and playsInline; there was no mobile breakpoint disabling playback.

The prior transparent-until-playing video also coupled CSS visibility to a successful playback event. WebKit documents visibility requirements for native autoplay, so the fade now belongs to the poster instead. This is compatibility hardening; the old video did play in desktop WebKit with mobile emulation, so this was not established as the cause on a physical iPhone. See [WebKit's video policies](https://webkit.org/blog/6784/new-video-policies-for-ios/).

`ffprobe` found a silent H.264 High Profile/yuv420p MP4 declaring Level 5.0 despite its 1080p/20fps stream fitting Level 4.0. The SPS level was corrected with `ffmpeg -c:v copy -bsf:v h264_metadata=level=4 -an -movflags +faststart`; no re-encoding or new download variant was introduced. Decoded-frame SHA-256 hashes before/after match, and the file remains 2,665,149 bytes. Local HTTP checks return `video/mp4`, `Accept-Ranges: bytes`, and HTTP 206 for range requests. The deployed host's headers still need confirmation if its configuration differs.

Physical iPhone Safari remains untested. Verify a cold load over Wi-Fi and cellular, inline silent looping, portrait/landscape cover positioning, scroll-away/return and tab switching, and the original poster when Low Power Mode or autoplay restrictions block playback. Desktop WebKit with mobile emulation does not reproduce iOS hardware decoding or power policies.

Validation after the fix: ESLint, TypeScript, all 10 repository tests, production build, and route smoke checks (25 pages/61 resources) pass. Playwright WebKit and Chrome pass desktop and iPhone-viewport playback, cover sizing without overflow, silent inline attributes, looping, offscreen pause/resume, playback while a font request holds page load open, blocked-play and network-error poster fallbacks, and live reduced-motion changes. Reduced Motion and Save-Data made zero MP4 requests. A mobile WebKit screenshot was inspected for the retained layout and overlays. Browser-policy denial was simulated; this is not a physical Low Power Mode test.
