"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import styles from "../page.module.css";

import CursorOverlay from "@/components/ui/shared/cursorOverlay/CursorOverlay";
import { InfoBubble } from "@/components/ui/shared/InfoBubble";
import InteractiveZone from "@/components/ui/shared/InteractiveZone/InteractiveZone";
import { Button } from "@/components/ui/button";

import { useCursorOverlay } from "@/app/hooks/useCursorOverlay";
import { usePlayerContext } from "@/app/contexts/PlayerContext";
import {addItemOnce} from "@/app/utils/inventory";
import {MANOR_MAP_ITEM} from "@/app/constants/items";
import {InventoryBoard} from "@/components/ui/inventory-board";

type OpenZone = 1 | 2 | 3 | null;

export default function LivingRoomPage2() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const context = usePlayerContext();

    const { cursor, show: showCursor, move, hide } = useCursorOverlay();
    const { setValue } = usePlayerContext();



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


    return (
        <main
            className={styles.main2}
            onClick={closeZone}
            role="presentation"
        >
            <InventoryBoard rows={2} cols={6} />
            <CursorOverlay {...cursor} />

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
                            width: "50%",
                            pointerEvents: "none",
                        }}
                    />
                )}
            </div>


            {/*  */}
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
                            width: "80%",
                            pointerEvents: "none",
                        }}
                    />
                )}
            </div>

            <InteractiveZone
                top="80%"
                left="0%"
                width="100%"
                height="20%"
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
