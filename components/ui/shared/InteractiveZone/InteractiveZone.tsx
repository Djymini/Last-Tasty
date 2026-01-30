"use client";

import Image from "next/image";
import styles from "./InteractiveZone.module.css";

type CursorDir = "up" | "left" | "right" | "down";

type Props = {
    top: string;
    left?: string;
    right?: string;
    width: string;
    height: string;
    label?: string;
    dir?: CursorDir;
    iconSrc?: string;
    clickable?: boolean;
    onEnter?: (dir: CursorDir, label: string) => void;
    onMove?: (e: React.MouseEvent) => void;
    onLeave?: () => void;
    onClick?: () => void;
    className?: string;
};

export default function InteractiveZone({
                                            top,
                                            left,
                                            right,
                                            width,
                                            height,
                                            label,
                                            dir,
                                            iconSrc,
                                            clickable = true,
                                            onEnter,
                                            onMove,
                                            onLeave,
                                            onClick,
                                        }: Props) {
    return (
        <div
            className={styles.zone}
            style={{ top, left, right, width, height }}
            onMouseEnter={() => dir && label && onEnter?.(dir, label)}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            onClick={clickable ? onClick : undefined}
        >
            {iconSrc && (
                <Image
                    src={iconSrc}
                    alt=""
                    width={32}
                    height={32}
                    draggable={false}
                    className={styles.icon}
                    unoptimized
                />
            )}
        </div>
    );
}
