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