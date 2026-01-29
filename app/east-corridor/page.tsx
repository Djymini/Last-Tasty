"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css";
import CursorOverlay from "@/components/ui/shared/cursorOverlay/CursorOverlay";
import { InfoBubble } from "@/components/ui/shared/InfoBubble";
import InteractiveZone from "@/components/ui/shared/InteractiveZone/InteractiveZone";
import { Button } from "@/components/ui/button";
import { useCursorOverlay } from "@/app/hooks/useCursorOverlay";
import {usePlayerContext} from "@/app/contexts/PlayerContext";
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
                                left: "40%",
                                width: "15vw",
                                pointerEvents: "none"
                            }}
                        />
                    )}
                </div>

                <InteractiveZone
                    top="22vh"
                    left="28vw"
                    width="6vw"
                    height="53vh"
                    label="Chambre du majordome"
                    dir="left"
                    onEnter={showCursor}
                    onMove={move}
                    onLeave={hide}
                    onClick={() => router.push("/maid-room")}
                />

                <InteractiveZone
                    top="26vh"
                    left="43vw"
                    width="14vw"
                    height="42vh"
                    label="Chambre principal"
                    dir="up"
                    onEnter={showCursor}
                    onMove={move}
                    onLeave={hide}
                    onClick={() => router.push("/master-room")}
                />

                <div className={`group ${styles.door2}`} onClick={() => setOpen(2)} role="button">
                    {open === 2 && (
                        <InfoBubble
                            title="Porte"
                            description="Cette porte est condamnée"
                            style={{
                                position: "absolute",

                                top: "37%",

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