"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../basement/page.module.css";
import { InfoBubble } from "@/components/ui/shared/InfoBubble";
import CursorOverlay from "@/components/ui/shared/cursorOverlay/CursorOverlay";
import InteractiveZone from "@/components/ui/shared/InteractiveZone/InteractiveZone";


type CursorDir = "up" | "down" | "left" | "right";

export default function Basement() {
    const router = useRouter();
    const [open, setOpen] = useState<number | null>(null);
    const timeoutRef = useRef<number | null>(null);

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
        };
    }, []);

    const show = (dir: CursorDir, label: string) =>
        setCursor((c) => ({ ...c, visible: true, dir, label }));
    const move = (e: React.MouseEvent) =>
        setCursor((c) => ({ ...c, x: e.clientX, y: e.clientY }));
    const hide = () => setCursor((c) => ({ ...c, visible: false, label: "" }));

    return (
        <main className={styles.cellarBackground}>


            <div className={styles.interactiveLayer}>
                <InteractiveZone
                    top="10%"
                    left="0%"
                    width="100%"
                    height="25%"
                    label="Descendre"
                    dir="up"
                    onEnter={show}
                    onMove={move}
                    onLeave={hide}
                    onClick={() => router.push("/basement/cellar2")}
                />
            </div>

            <div className={styles.cursorLayer}>
                <CursorOverlay
                    visible={cursor.visible}
                    x={cursor.x}
                    y={cursor.y}
                    dir={cursor.dir}
                    label={cursor.label}
                />
            </div>

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

            {open === 2 && (
                <InfoBubble
                    title="Amas d'objets"
                    description="Il y a sûrement quelque chose d'utile."
                    top="70%"
                    left="70%"
                />
            )}

            {open === 3 && (
                <InfoBubble
                    title="Toiles d'araignée"
                    description="On dirait que ça fait longtemps que personne n'est venu içi"
                    top="20%"
                    left="10%"
                />
            )}

            <div className={styles.interactiveLayer}>
                <InteractiveZone
                    top="75%"
                    left="0%"
                    width="100%"
                    height="25%"
                    label="Retour vers le hall"
                    dir="down"
                    onEnter={show}
                    onMove={move}
                    onLeave={hide}
                    onClick={() => router.push("/hall")}
                />
            </div>
        </main>
    );
}
