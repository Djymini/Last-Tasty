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

export default function LivingRoomPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const { cursor, show: showCursor, move, hide } = useCursorOverlay();

    const blueprintTaken = searchParams.get("blueprint") === "1";
    const [open, setOpen] = useState<number | null>(null);
    const context = usePlayerContext();


    const onTakeBlueprint = () => {
        context.setValue(prev => ({
            ...prev,
            inventory: [
                ...prev.inventory,
                {
                    idItem: 6,
                    name: "Plan de la maison",
                    description: "Ca peut-etre utile pour se repérer",
                    image: "/icons/map.png"
                }
            ]
        }));
        router.push("/living-room?blueprint=1");
    };

    return (
        <main className={`${styles.main} ${blueprintTaken ? styles.blueprintTaken : ""}`}>
            <InventoryBoard rows={2} cols={6} />
            <CursorOverlay {...cursor} />

            <div className={styles.fireplace} onClick={() => setOpen(1)} role="button">
                {open === 1 && (
                    <InfoBubble
                        title="Cheminée"
                        description="Il doit bien y avoir quelqu'un dans les parages..."
                        style={{
                            position: "absolute",
                            top: "12px",
                            left: "12px",
                            width: "220px",
                            pointerEvents: "none",
                        }}
                    />
                )}
            </div>

            {!blueprintTaken && (
                <>
                    {open !== 2 && (
                        <div className={styles.blueprint} onClick={() => setOpen(2)} role="button" />
                    )}

                    {open === 2 && (
                        <InfoBubble
                            title="Plan"
                            description="On dirait les plans du manoir."
                            top="40%"
                            left="42%"
                            width="300px"
                        >
                            <div style={{ marginTop: 12, textAlign: "right" }}>
                                <Button
                                    variant="outline"
                                    className="bg-gray-200 text-gray-900 hover:bg-gray-300 border border-gray-400"
                                    onClick={onTakeBlueprint}
                                >
                                    Ramasser
                                </Button>
                            </div>
                        </InfoBubble>
                    )}
                </>
            )}

            <div className={styles.portrait} onClick={() => setOpen(3)} role="button">
                {open === 3 && (
                    <InfoBubble
                        title="Portrait"
                        description="Voici donc les propriétaires."
                        style={{
                            position: "absolute",
                            top: "100%",
                            left: "50%",
                            transform: "translateX(-50%) translateY(8px)",
                            width: "240px",
                            pointerEvents: "none",
                        }}
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
                onEnter={showCursor}
                onMove={move}
                onLeave={hide}
                onClick={() => router.push("/hall")}
            />
        </main>
    );
}
