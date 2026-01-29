"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../basement/page.module.css";
import { InfoBubble } from "@/components/ui/shared/InfoBubble";
import InteractiveZone from "@/components/ui/shared/InteractiveZone/InteractiveZone";

import ScreamerOverlay2 from "@/components/ui/screamerOverlay/ScreamerOverlay2";
import CursorOverlay from "@/components/ui/shared/cursorOverlay/CursorOverlay";

type CursorDir = "up" | "down" | "left" | "right";

export default function Cellar2() {
    const router = useRouter();
    const [open, setOpen] = useState<number | null>(null);
    const timeoutRef = useRef<number | null>(null);
    const goTimeoutRef = useRef<number | null>(null);

    const [cursor, setCursor] = useState<{
        visible: boolean;
        x: number;
        y: number;
        dir: CursorDir;
        label: string;
    }>({ visible: false, x: 0, y: 0, dir: "down", label: "" });

    const showBubble = (id: number) => {
        if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
        setOpen(id);
        timeoutRef.current = window.setTimeout(() => {
            setOpen(null);
            timeoutRef.current = null;
        }, 2500);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
            if (goTimeoutRef.current) window.clearTimeout(goTimeoutRef.current);
        };
    }, []);

    const show = (dir: CursorDir, label: string) =>
        setCursor((c) => ({ ...c, visible: true, dir, label }));
    const move = (e: React.MouseEvent) =>
        setCursor((c) => ({ ...c, x: e.clientX, y: e.clientY }));
    const hide = () => setCursor((c) => ({ ...c, visible: false, label: "" }));


    return (
        <main className={styles.cellarBackground2}>
            <ScreamerOverlay2 imageUrl="/screamer2.png" durationMs={800} />

            <div
                className={`${styles.zone} ${styles.zone2}`}
                role="button"
                tabIndex={0}
                onClick={(e) => { e.stopPropagation(); showBubble(2); }}
            />
            <div
                className={`${styles.zone} ${styles.zone3}`}
                role="button"
                tabIndex={0}
                onClick={(e) => { e.stopPropagation(); showBubble(3); }}
            />
            <div
                className={`${styles.zone} ${styles.zone4}`}
                role="button"
                tabIndex={0}
                onClick={(e) => { e.stopPropagation(); showBubble(4); }}
            />

            {open === 2 && (
                <InfoBubble
                    title="Pleins d'objets"
                    description="Il n' y a rien d'utile sur cette table."
                    top="50%"
                    left="60%"
                />
            )}

            <div className={styles.cursorLayer}>
                <CursorOverlay
                    visible={cursor.visible}
                    x={cursor.x}
                    y={cursor.y}
                    dir={cursor.dir}
                    label={cursor.label}
                />
            </div>

            {open === 3 && (
                <InfoBubble
                    title="Caisse en bois"
                    description="Il n'y a rien d'interessant dans cette caisse"
                    top="65%"
                    left="65%"
                />
            )}

            {open === 4 && (
                <>
                    <InfoBubble
                        title="Echelle"
                        description="Cette échelle peut m'aider"
                        top="40%"
                        left="35%"
                    />
                    <button
                        type="button"
                        className={styles.bubbleAction}
                        onClick={() => router.push("/basement/cellar3")}
                    >
                        Récupérer cette échelle
                    </button>
                </>
            )}

            <div className={styles.interactiveLayer}>
                <InteractiveZone
                    top="75%"
                    left="0%"
                    width="100%"
                    height="20%"
                    label="Remonter"
                    dir="down"
                    onEnter={show}
                    onMove={move}
                    onLeave={hide}
                    onClick={() => router.push("/basement")}
                    className={styles.debugZone}
                />
            </div>
        </main>
    );
}