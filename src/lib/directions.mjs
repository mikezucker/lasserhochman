/** Choose a map handoff without inspecting installed apps or requesting location. */
export function directionsUrl(webUrl, userAgent = "", maxTouchPoints = 0) {
  const destination = new URL(webUrl).searchParams.get("destination");
  if (!destination) return webUrl;
  const address = encodeURIComponent(destination);
  // iPadOS can identify itself as a Mac when requesting desktop websites.
  if (
    /iPhone|iPad|iPod/i.test(userAgent) ||
    (/Macintosh/i.test(userAgent) && maxTouchPoints > 1)
  ) {
    return `https://maps.apple.com/?daddr=${address}&dirflg=d`;
  }
  if (/Android/i.test(userAgent)) {
    // Leave the package unspecified so Android uses the user's map handler
    // or offers a chooser. Chrome falls back to the web if no app handles it.
    return `intent:0,0?q=${address}#Intent;scheme=geo;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(webUrl)};end`;
  }
  return webUrl;
}
