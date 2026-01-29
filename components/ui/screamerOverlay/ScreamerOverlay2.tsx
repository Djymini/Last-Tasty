"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./ScreamerOverlay2.module.css";

export type ScreamerOverlayProps = {
  delayMs?: number;     // délai avant apparition
  durationMs?: number;  // durée d’affichage
  imageUrl: string;
  enabled?: boolean;
};

export default function ScreamerOverlay2({
                                           delayMs = 2000,
                                           durationMs = 800,
                                           imageUrl,
                                           enabled = true,
                                         }: ScreamerOverlayProps) {
  const [visible, setVisible] = useState(false);

  const hasTriggeredRef = useRef(false);
  const hideTimeoutRef = useRef<number | null>(null);
  const showTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    // 🔒 empêche toute redéclenchement
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;


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
  }, [enabled, delayMs, durationMs]);

  if (!visible) return null;

  return (
      <div
          className={styles.screamer}
          style={{ backgroundImage: `url(${imageUrl})` }}
      />
  );
}
