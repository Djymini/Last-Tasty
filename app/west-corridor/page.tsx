"use client";

import { useState } from "react";
import InteractiveZone from "@/components/ui/shared/InteractiveZone/InteractiveZone";
import {InfoBubble} from "@/components/ui/shared/InfoBubble";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import {useCursorOverlay} from "@/app/hooks/useCursorOverlay";
import CursorOverlay from "@/components/ui/shared/cursorOverlay/CursorOverlay";
import {InventoryBoard} from "@/components/ui/inventory-board";



export default function EastCorridorPage() {
    const router = useRouter();

    const { cursor, show: showCursor, move, hide } = useCursorOverlay();

    const [open, setOpen] = useState<number | null>(null);

    return (
        <main className={styles.page}>
            <InventoryBoard rows={2} cols={6} />
            <CursorOverlay {...cursor} />

            <div className={styles.door1} onClick={() => setOpen(1)} role="button">
                {open === 1 && (
                    <InfoBubble
                        title="Porte"
                        description="Cette porte est condamnée"
                        style={{
                            position: "absolute",
                            top: "40%",
                            width: "15vw",
                            pointerEvents: "none",
                        }}
                    />
                )}
            </div>

            <div className={styles.door2} onClick={() => setOpen(2)} role="button">
                {open === 2 && (
                    <InfoBubble
                        title="Porte"
                        description="Cette porte est condamnée"
                        style={{
                            position: "absolute",
                            top: "40%",
                            width: "15vw",
                            pointerEvents: "none",
                        }}
                    />
                )}
            </div>

            <div className={styles.door3} onClick={() => setOpen(3)} role="button">
                {open === 3 && (
                    <InfoBubble
                        title="Porte"
                        description="Cette porte est condamnée"
                        style={{
                            position: "absolute",
                            top: "40%",
                            width: "15vw",
                            pointerEvents: "none",
                        }}
                    />
                )}
            </div>

            <div className={styles.door4} onClick={() => setOpen(4)} role="button">
                {open === 4 && (
                    <InfoBubble
                        title="Porte"
                        description="Cette porte est condamnée"
                        style={{
                            position: "absolute",
                            top: "40%",
                            width: "15vw",
                            pointerEvents: "none",
                        }}
                    />
                )}
            </div>

            <div className={styles.door5} onClick={() => setOpen(5)} role="button">
                {open === 5 && (
                    <InfoBubble
                        title="Porte"
                        description="Cette porte est condamnée"
                        style={{
                            position: "absolute",
                            top: "40%",
                            width: "15vw",
                            pointerEvents: "none",
                        }}
                    />
                )}
            </div>

            <InteractiveZone
                top="80vh"
                left="22vw"
                width="56vw"
                height="20vh"
                label="Retourner à l'acceuil"
                dir="down"
                onEnter={showCursor}
                onMove={move}
                onLeave={hide}
                onClick={() => router.push("/hall")}
            />
        </main>
    );
}