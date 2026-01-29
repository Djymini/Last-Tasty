"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import styles from "./page.module.css";

import CursorOverlay from "@/components/ui/shared/cursorOverlay/CursorOverlay";
import { InfoBubble } from "@/components/ui/shared/InfoBubble";
import InteractiveZone from "@/components/ui/shared/InteractiveZone/InteractiveZone";
import { Button } from "@/components/ui/button";

import { useCursorOverlay } from "@/app/hooks/useCursorOverlay";
import { useGameUI } from "@/app/contexts/GameUIContext";

type OpenZone = 1 | 2 | 3 | null;

export default function LivingRoomPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const { cursor, show: showCursor, move, hide } = useCursorOverlay();
    const { unlockManorMap, openMap } = useGameUI();

    const blueprintTaken = useMemo(() => searchParams.get("blueprint") === "1", [searchParams]);
    const [open, setOpen] = useState<OpenZone>(null);

    const openZone = useCallback((zone: Exclude<OpenZone, null>) => {
        setOpen(zone);
    }, []);

    const closeZone = useCallback(() => {
        setOpen(null);
    }, []);

    const navigateTo = useCallback(
        (path: string) => {
            closeZone();
            router.push(path);
        },
        [router, closeZone]
    );

    const onTakeBlueprint = useCallback(() => {
        // 1) On débloque dans votre UI globale
        unlockManorMap();

        // 2) UX: on ouvre direct la map
        openMap();

        // 3) On persiste l'état via l'URL (source de vérité)
        if (!blueprintTaken) {
            router.push("/living-room?blueprint=1");
        } else {
            // si déjà pris, on évite un push inutile
            closeZone();
        }
    }, [unlockManorMap, openMap, router, blueprintTaken, closeZone]);

    return (
        <main
            className={`${styles.main} ${blueprintTaken ? styles.blueprintTaken : ""}`}
            onClick={closeZone}
            role="presentation"
        >
            <CursorOverlay {...cursor} />

            {/* Fireplace */}
            <div
                className={styles.fireplace}
                role="button"
                tabIndex={0}
                onClick={(e) => {
                    e.stopPropagation();
                    openZone(1);
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") openZone(1);
                }}
            >
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

            {/* Blueprint */}
            {!blueprintTaken && (
                <>
                    {open !== 2 && (
                        <div
                            className={styles.blueprint}
                            role="button"
                            tabIndex={0}
                            onClick={(e) => {
                                e.stopPropagation();
                                openZone(2);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") openZone(2);
                            }}
                        />
                    )}

                    {open === 2 && (
                        <InfoBubble
                            title="Plan"
                            description="On dirait les plans du manoir."
                            top="40%"
                            left="42%"
                            width="300px"
                        >
                            <div style={{ marginTop: 12, display: "flex", justifyContent: "flex-end", gap: 8 }}>
                                <Button
                                    variant="outline"
                                    className="bg-gray-200 text-gray-900 hover:bg-gray-300 border border-gray-400"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onTakeBlueprint();
                                    }}
                                >
                                    Ramasser
                                </Button>

                                <Button
                                    variant="outline"
                                    className="bg-transparent text-gray-200 hover:bg-white/10 border border-gray-500"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        closeZone();
                                    }}
                                >
                                    Fermer
                                </Button>
                            </div>
                        </InfoBubble>
                    )}
                </>
            )}

            {/* Portrait */}
            <div
                className={styles.portrait}
                role="button"
                tabIndex={0}
                onClick={(e) => {
                    e.stopPropagation();
                    openZone(3);
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") openZone(3);
                }}
            >
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
                onClick={() => navigateTo("/hall")}
            />

        </main>
    );
}
