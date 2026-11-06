"use client";

import Image, { getImageProps } from "next/image";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./hero-video.module.css";

const videoSource = "/videos/hudson-waterfront.mp4";
const poster = "/images/hudson-waterfront.jpg";
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
  const userPaused = useRef(false);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(true);

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
      if (
        !idle ||
        !visible ||
        document.hidden ||
        userPaused.current ||
        failed
      ) {
        video.pause();
        return;
      }
      if (!video.hasAttribute("src")) {
        video.muted = true;
        video.src = videoSource;
        video.load();
      }
      // Autoplay can be denied by browser policy or Low Power Mode. Keep the
      // photograph visible unless actual playback starts; never show an error.
      void video.play().catch(() => {});
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
    if (document.readyState === "complete") deferPlayback();
    else window.addEventListener("load", deferPlayback, { once: true });

    return () => {
      disposed = true;
      observer.disconnect();
      motion.removeEventListener("change", syncPlayback);
      connection?.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      window.removeEventListener("load", deferPlayback);
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
      <Image
        className={styles.poster}
        src={poster}
        alt="Manhattan skyline across the Hudson River, viewed from the New Jersey waterfront"
        fill
        preload
        sizes="100vw"
        quality={85}
      />
      <video
        ref={videoRef}
        className={`${styles.video} ${ready ? styles.ready : ""}`}
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
          setPaused(false);
        }}
        onPause={() => setPaused(true)}
        onEmptied={() => setReady(false)}
        onError={() => setReady(false)}
      />
      {ready && (
        <button
          type="button"
          className={styles.toggle}
          aria-label={
            paused ? "Play architectural video" : "Pause architectural video"
          }
          title={paused ? "Play motion" : "Pause motion"}
          onClick={() => {
            const video = videoRef.current;
            if (!video) return;
            if (video.paused) {
              userPaused.current = false;
              void video.play().catch(() => {});
            } else {
              userPaused.current = true;
              video.pause();
            }
          }}
        >
          {paused ? (
            <Play size={15} aria-hidden="true" />
          ) : (
            <Pause size={15} aria-hidden="true" />
          )}
        </button>
      )}
    </>
  );
}
