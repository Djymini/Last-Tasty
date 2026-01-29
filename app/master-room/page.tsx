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
                label="Retourner dans le couloir"
            />

            <div className={`group ${styles.painting}`}>
                <InfoBubble
                    title="Tableau"
                    description="Il serait temps de faire les poussières dans le coin ..."
                    className="opacity-0 translate-y-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-y-0"
                    style={{
                        position: "absolute",
                        top: "2vh",
                        left: "2vw",
                        width: "25vw",
                        pointerEvents: "none",
                    }}
                />
            </div>

            <div className={`group ${styles.bookmark}`}>
                <InfoBubble
                    title="Marque page de René"
                    description="ça pourrait m'être utile !"
                    className="opacity-0 translate-y-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-y-0"
                    style={{
                        position: "absolute",
                        top: "-2vh",
                        left: "-20vw",
                        width: "20vw",
                        pointerEvents: "none",
                    }}
                />
            </div>

            <InteractiveZone
                top="65vh"
                left="0vw"
                width="100vw"
                height="35vh"
                label="Retourner dans le couloir"
                dir="down"
                onEnter={show}
                onMove={move}
                onLeave={hide}
                onClick={() => router.push("/east-corridor")}
            />
        </main>
    );
}
