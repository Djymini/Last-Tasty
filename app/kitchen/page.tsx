"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/app/kitchen/page.module.css";
import { InfoBubble } from "@/components/ui/shared/InfoBubble";
import InteractiveZone from "@/components/ui/shared/InteractiveZone/InteractiveZone";
import { useRouter } from "next/navigation";
import CursorOverlay from "@/components/ui/shared/cursorOverlay/CursorOverlay";
import ScreamerOverlay from "@/components/ui/screamerOverlay/ScreamerOverlay";

type CursorDir = "up" | "left" | "right" | "down";

export default function KitchenPage() {
    const router = useRouter();
    const [open, setOpen] = useState<number | null>(null);
    const timeoutRef = useRef<number | null>(null);

    const [screamerOpen, setScreamerOpen] = useState(false);

    const [cursor, setCursor] = useState<{
        visible: boolean;
        x: number;
        y: number;
        dir: CursorDir;
        label: string;
    }>({
        visible: false,
        x: 0,
        y: 0,
        dir: "down",
        label: "",
    });

    const showBubble = (id: number) => {
        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

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
        <main className={styles.main}>
            <ScreamerOverlay
                open={screamerOpen}
                src="screamer.png"
                alt="Screamer"
                onClose={() => setScreamerOpen(false)}
            />

            <CursorOverlay
                visible={cursor.visible}
                x={cursor.x}
                y={cursor.y}
                dir={cursor.dir}
                label={cursor.label}
            />

            <div
                className={`${styles.zone} ${styles.zone1}`}
                onClick={() => setScreamerOpen(true)}
                role="button"
            />

            <div className={`${styles.zone} ${styles.zone2}`} onClick={() => showBubble(2)} role="button">
                {open === 2 && (
                    <InfoBubble title="Un étrange document" description="Il me sera sûrement utile." top="13%" left="-180%" />
                )}
            </div>

            <div className={`${styles.zone} ${styles.zone3}`} onClick={() => showBubble(3)} role="button">
                {open === 3 && (
                    <InfoBubble
                        title="Plusieurs rangées de bocaux"
                        description="Je n'ose pas imaginer ce qu'il y a à l'intérieur"
                        top="150px"
                        left="250px"
                    />
                )}
            </div>

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
        </main>
    );
}
