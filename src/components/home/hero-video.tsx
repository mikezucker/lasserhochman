"use client";

import Image, { getImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./hero-video.module.css";

const videoSource = "/videos/new-jersey-waterfront.mp4";
const poster = "/images/new-jersey-waterfront.jpg";
const optimizedPoster = getImageProps({
  src: poster,
  alt: "",
  width: 960,
  height: 540,
  quality: 85,
}).props.src;

type Connection = EventTarget & { saveData?: boolean };

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !video.canPlayType("video/mp4")) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: Connection })
      .connection;
    let visible = false;
    let idle = false;
    let disposed = false;
    let failed = false;
    let idleHandle: number | undefined;
    let timer: number | undefined;

    const syncPlayback = () => {
      if (disposed) return;
      if (motion.matches || connection?.saveData) {
        video.pause();
        // Remove the source entirely: reduced motion and Save-Data use only
        // the existing optimized image, including when preferences change.
        if (video.hasAttribute("src")) {
          video.removeAttribute("src");
          video.load();
        }
        return;
      }
      if (!idle || !visible || document.hidden || failed) {
        video.pause();
        return;
      }
      if (!video.hasAttribute("src")) {
        // Set both the default attribute and live properties before attaching
        // a source so Safari evaluates a silent, inline video from the start.
        video.defaultMuted = true;
        video.muted = true;
        video.playsInline = true;
        video.src = videoSource;
        video.load();
      }
      // Autoplay can be denied by browser policy or Low Power Mode. Keep the
      // photograph visible unless actual playback starts; never show an error.
      void video.play().catch(() => {
        if (!disposed && video.paused) setReady(false);
      });
    };
    const deferPlayback = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleHandle = window.requestIdleCallback(
          () => {
            idle = true;
            syncPlayback();
          },
          { timeout: 2000 },
        );
      } else {
        timer = window.setTimeout(() => {
          idle = true;
          syncPlayback();
        }, 200);
      }
    };
    const onError = () => {
      failed = true;
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    });
    observer.observe(video);
    motion.addEventListener("change", syncPlayback);
    connection?.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    video.addEventListener("error", onError);
    // Do not wait for window.load: slow fonts/images on mobile must not
    // prevent the visible hero from ever receiving its source.
    deferPlayback();

    return () => {
      disposed = true;
      observer.disconnect();
      motion.removeEventListener("change", syncPlayback);
      connection?.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      video.removeEventListener("error", onError);
      if (idleHandle !== undefined) window.cancelIdleCallback(idleHandle);
      if (timer !== undefined) window.clearTimeout(timer);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, []);

  return (
    <>
      <div className={`${styles.posterFrame} ${ready ? styles.ready : ""}`}>
        <Image
          className={styles.poster}
          src={poster}
          alt="New Jersey waterfront skyline silhouetted against the setting sun"
          fill
          preload
          sizes="100vw"
          quality={85}
        />
      </div>
      <video
        ref={videoRef}
        className={styles.video}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster={optimizedPoster}
        aria-hidden="true"
        tabIndex={-1}
        disablePictureInPicture
        onPlaying={() => {
          setReady(true);
        }}
        onPause={() => setReady(false)}
        onEmptied={() => setReady(false)}
        onError={() => setReady(false)}
      />
    </>
  );
}
