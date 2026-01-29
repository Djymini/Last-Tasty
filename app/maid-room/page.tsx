"use client";

import styles from "./page.module.css"
import {InfoBubble} from "@/components/ui/shared/InfoBubble";
import InteractiveZone from "@/components/ui/shared/InteractiveZone/InteractiveZone";
import {useRouter} from "next/navigation";
import {useState} from "react";
import CursorOverlay from "@/components/ui/shared/cursorOverlay/CursorOverlay";
import {usePlayerContext} from "@/app/contexts/PlayerContext";
import {InventoryBoard} from "@/components/ui/inventory-board";

type CursorDir = "up" | "left" | "right" | "down";

export default function MaidRoomPage() {
    const router = useRouter();
    const context = usePlayerContext();

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
            <InventoryBoard rows={2} cols={6} />
            <CursorOverlay
                visible={cursor.visible}
                x={cursor.x}
                y={cursor.y}
                dir="down"
                label="Retourner dans le couloir"
            />

            <div className={`group ${styles.bed}`}>
                <InfoBubble
                    title="Lit"
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
            <div className={`group ${styles.book}`}>
                <InfoBubble
                    title="Journal"
                    description="Journal de Bob le majordome"
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

            <InteractiveZone
                top="72vh"
                left="0vw"
                width="53vw"
                height="28vh"
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