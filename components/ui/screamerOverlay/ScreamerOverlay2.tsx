"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./ScreamerOverlay2.module.css";

export type ScreamerOverlayProps = {
  delayMs?: number;     // délai avant apparition
  durationMs?: number;  // durée d’affichage
  imageUrl: string;
  enabled?: boolean;
};

import { usePathname } from "next/navigation";

export default function ScreamerOverlay2({
                                           delayMs = 2000,
                                           durationMs = 800,
                                           imageUrl,
                                           enabled = true,
                                         }: ScreamerOverlayProps) {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  const hideTimeoutRef = useRef<number | null>(null);
  const showTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    // reset à chaque changement de page
    if (showTimeoutRef.current) window.clearTimeout(showTimeoutRef.current);
    if (hideTimeoutRef.current) window.clearTimeout(hideTimeoutRef.current);

    showTimeoutRef.current = window.setTimeout(() => {
      setVisible(true);

      hideTimeoutRef.current = window.setTimeout(() => {
        setVisible(false);
      }, durationMs);
    }, delayMs);

    return () => {
      if (showTimeoutRef.current) window.clearTimeout(showTimeoutRef.current);
      if (hideTimeoutRef.current) window.clearTimeout(hideTimeoutRef.current);
    };
  }, [pathname, enabled, delayMs, durationMs]); // 👈 IMPORTANT

  if (!visible) return null;

  return (
      <div
          className={styles.screamer}
          style={{ backgroundImage: `url(${imageUrl})` }}
      />
  );
}
