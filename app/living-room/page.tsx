"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css";
import CursorOverlay from "@/components/ui/shared/cursorOverlay/CursorOverlay";
import { InfoBubble } from "@/components/ui/shared/InfoBubble";
import InteractiveZone from "@/components/ui/shared/InteractiveZone/InteractiveZone";

type CursorDir = "up" | "left" | "right" | "down";

export default function LivingRoomPage() {
    const router = useRouter();

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

    const show = (dir: CursorDir, label: string) =>
        setCursor((c) => ({ ...c, visible: true, dir, label }));

    const move = (e: React.MouseEvent) =>
        setCursor((c) => ({ ...c, x: e.clientX, y: e.clientY }));

    const hide = () => setCursor((c) => ({ ...c, visible: false, label: "" }));

    return (
        <main className={styles.main}>
            <CursorOverlay
                visible={cursor.visible}
                x={cursor.x}
                y={cursor.y}
                dir="down"
                label="Retour vers le hall"
            />


            <div className={`group ${styles.fireplace}`} onClick={() => router.push("/hall")}>
                <InfoBubble
                    title="Cheminée"
                    description="Il doit bien y avoir quelqu'un dans les parages..."
                    className="opacity-0 translate-y-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-y-0"
                    style={{
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                        width: "220px",
                        pointerEvents: "none",
                    }}
                />
            </div>

            <div className={`group ${styles.blueprint}`}>
                <InfoBubble
                    title="Plan"
                    description="On dirait les plans du manoir."
                    className="opacity-0 translate-y-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-y-0"
                    style={{
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                        width: "220px",
                        pointerEvents: "none",
                    }}
                />
            </div>

            <div className={`group ${styles.portrait}`}>
                <InfoBubble
                    title="Portrait"
                    description="Voici donc les propriétaires."
                    className="opacity-0 translate-y-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-y-0"
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: "50%",
                        transform: "translateX(-50%) translateY(8px)",
                        width: "240px",
                        pointerEvents: "none",
                    }}
                />
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
