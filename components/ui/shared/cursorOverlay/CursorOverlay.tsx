"use client";

import Image from "next/image";
import styles from "./CursorOverlay.module.css";

type CursorDir = "up" | "left" | "right" | "down";

type Props = {
    visible: boolean;
    x: number;
    y: number;
    dir: CursorDir;
    label: string;
};

export default function CursorOverlay({ visible, x, y, dir, label }: Props) {
    const isVertical = dir === "up" || dir === "down";
    const rotation =
        dir === "down"
            ? "rotate(0deg)"
            : dir === "left"
                ? "rotate(90deg)"
                : dir === "right"
                    ? "rotate(-90deg)"
                    : "rotate(180deg)";

    return (
        <div
            className={styles.cursor}
            style={{
                opacity: visible ? 1 : 0,
                transform: `translate(${x}px, ${y}px)`,
            }}
        >
            <div className={styles.wrapper}>
                <p className={styles.label}>{label}</p>
                <div
                    className={`${styles.arrow} ${
                        isVertical ? styles.bounceVertical : styles.bounceHorizontal
                    }`}
                >
                    <Image
                        src="/arrow-down.png"
                        alt=""
                        width={46}
                        height={46}
                        draggable={false}
                        unoptimized
                        style={{ transform: rotation, transformOrigin: "center" }}
                    />
                </div>
            </div>
        </div>
    );
}
