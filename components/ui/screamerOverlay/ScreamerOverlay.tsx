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
            <img className={styles.image} src={src} alt={alt} />
        </div>
    );
}
