"use client";

import { useState } from "react";
import InteractiveZone from "@/components/ui/shared/InteractiveZone/InteractiveZone";
import {InfoBubble} from "@/components/ui/shared/InfoBubble";
import styles from "./page.module.css";
import CursorOverlay from "@/components/ui/shared/cursorOverlay/CursorOverlay";
import { useRouter } from "next/navigation";

type CursorDir = "up" | "left" | "right" | "down";

export default function EastCorridorPage() {
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
        dir: "up",
        label: "",
    });

    const show = (dir: CursorDir, label: string) =>
        setCursor((c) => ({ ...c, visible: true, dir, label }));

    const move = (e: React.MouseEvent) =>
        setCursor((c) => ({ ...c, x: e.clientX, y: e.clientY }));

    const hide = () =>
        setCursor((c) => ({ ...c, visible: false, label: "" }));

    return (
        <main className={styles.page}>
            <CursorOverlay
                visible={cursor.visible}
                x={cursor.x}
                y={cursor.y}
                dir={cursor.dir}
                label={cursor.label}
            />

            <div className={`group ${styles.door1}`}>
                <InfoBubble
                    title="Porte"
                    description="Cette porte est condamnée"
                    className="opacity-0 transition-all duration-150 group-hover:opacity-100"
                    style={{
                        position: "absolute",
                        top: "40%",
                        width: "15vw",
                        pointerEvents: "none",
                    }}
                />
            </div>


            <InteractiveZone
                top="24vh"
                left="28vw"
                width="6vw"
                height="51vh"
                label="Chambre du majordome"
                dir="up"
                onEnter={show}
                onMove={move}
                onLeave={hide}
                onClick={() => router.push("/maid-room")}
            />

            <InteractiveZone
                top="28vh"
                left="43vw"
                width="14vw"
                height="37vh"
                label="Chambre principal"
                dir="up"
                onEnter={show}
                onMove={move}
                onLeave={hide}
                onClick={() => router.push("/maid-room")}
            />

            <div className={`group ${styles.door4}`}>
                <InfoBubble
                    title="Porte"
                    description="Cette porte est condamnée"
                    className="opacity-0 translate-y-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-y-0"
                    style={{
                        position: "absolute",

                        top: "37%",

                        width: "15vw",
                        pointerEvents: "none",
                    }}
                />
            </div>

            <div className={`group ${styles.door5}`}>
                <InfoBubble
                    title="Porte"
                    description="Cette porte est condamnée"
                    className="opacity-0 translate-y-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-y-0"
                    style={{
                        position: "absolute",

                        top: "40%",

                        width: "15vw",
                        pointerEvents: "none",
                    }}
                />
            </div>

            <InteractiveZone
                top="80vh"
                left="20vw"
                width="60vw"
                height="20vh"
                label="Retourner à l'acceuil"
                dir="up"
                onEnter={show}
                onMove={move}
                onLeave={hide}
                onClick={() => router.push("/hall")}
            />
        </main>
    );
}