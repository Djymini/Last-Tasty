"use client";

import { useEffect } from "react";
import styles from "./screamerOverlay.module.css";

type Props = {
    open: boolean;
    src: string;
    alt?: string;
    onClose: () => void;
};

export default function ScreamerOverlay({ open, src, alt = "", onClose }: Props) {
    useEffect(() => {
        if (!open) return;

        const audio = new Audio("/sounds/screamer.mp3");
        audio.volume = 1;
        audio.play().catch(() => {});

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
            audio.pause();
            audio.currentTime = 0;
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className={styles.backdrop}>
            <button
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Fermer"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
            </button>

            <img className={styles.image} src={src} alt={alt} />
        </div>
    );
}
