"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../basement/page.module.css";
import { InfoBubble } from "@/components/ui/shared/InfoBubble";
import InteractiveZone from "@/components/ui/shared/InteractiveZone/InteractiveZone";

import ScreamerOverlay2 from "@/components/ui/screamerOverlay/ScreamerOverlay2";
import CursorOverlay from "@/components/ui/shared/cursorOverlay/CursorOverlay";
import {usePlayerContext} from "@/app/contexts/PlayerContext";
import {InventoryBoard} from "@/components/ui/inventory-board";
import {Button} from "@/components/ui/button";
import {toast} from "@/components/ui/8bit/toast";

type CursorDir = "up" | "down" | "left" | "right";

export default function Cellar2() {
    const router = useRouter();
    const [open, setOpen] = useState<number | null>(null);
    const timeoutRef = useRef<number | null>(null);
    const goTimeoutRef = useRef<number | null>(null);
    const context = usePlayerContext();

    const hasLadder = context.value.inventory.some(
        item => item.name === "Vieille echelle"
    );

    const ladderDescription = hasLadder
        ? "Ce manoir est bizarre"
        : "Cette echelle peut m'aider";

    const [cursor, setCursor] = useState<{
        visible: boolean;
        x: number;
        y: number;
        dir: CursorDir;
        label: string;
    }>({ visible: false, x: 0, y: 0, dir: "down", label: "" });

    const showBubble = (id: number) => {
        if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
        setOpen(id);
        timeoutRef.current = window.setTimeout(() => {
            setOpen(null);
            timeoutRef.current = null;
        }, 2500);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
            if (goTimeoutRef.current) window.clearTimeout(goTimeoutRef.current);
        };
    }, []);

    const show = (dir: CursorDir, label: string) =>
        setCursor((c) => ({ ...c, visible: true, dir, label }));
    const move = (e: React.MouseEvent) =>
        setCursor((c) => ({ ...c, x: e.clientX, y: e.clientY }));
    const hide = () => setCursor((c) => ({ ...c, visible: false, label: "" }));

    const pickupTheLadder = () => {
        context.setValue(prev => ({
            ...prev,
            inventory: [
                ...prev.inventory,
                {
                    idItem: 1,
                    name: "Vieille echelle",
                    description: "Une echelle, pratique pour prendre de la hauteur",
                    image: "/icons/ladder.png"
                }
            ]
        }));
        toast("Echelle ramassée")
        router.push("/basement/cellar3")
    }

    return (
        <main className={styles.cellarBackground2}>
            <InventoryBoard rows={2} cols={6} />
            <ScreamerOverlay2 imageUrl="/screamer2.png" durationMs={800} delayMs={120}/>

            <div
                className={`${styles.zone} ${styles.zone2}`}
                role="button"
                tabIndex={0}
                onClick={(e) => { e.stopPropagation(); showBubble(3); }}
            />
            <div
                className={`${styles.zone} ${styles.zone3}`}
                role="button"
                tabIndex={0}
                onClick={(e) => { e.stopPropagation(); showBubble(2); }}
            />
            <div
                className={`${styles.zone} ${styles.zone4}`}
                role="button"
                tabIndex={0}
                onClick={(e) => { e.stopPropagation(); showBubble(4); }}
            />

            {open === 2 && (
                <InfoBubble
                    title="Amas d'objets"
                    description="Rien d'utile de ce coté-ci"
                    top="50%"
                    left="60%"
                />
            )}

            <div className={styles.cursorLayer}>
                <CursorOverlay
                    visible={cursor.visible}
                    x={cursor.x}
                    y={cursor.y}
                    dir={cursor.dir}
                    label={cursor.label}
                />
            </div>

            {open === 3 && (
                <InfoBubble
                    title="Mur délabré"
                    description="Cette pièce est un vrai dépotoir"
                    top="20%"
                    left="20%"
                />
            )}

            {open === 4 && (
                <>
                    <InfoBubble
                        title="Echelle"
                        description={ladderDescription}
                        top="40%"
                        left="35%"
                        width="25%"
                    >
                    {!hasLadder && (
                        <div style={{ marginTop: 12, textAlign: "right" }}>
                            <Button
                                variant="outline"
                                className="bg-gray-200 text-gray-900 hover:bg-gray-300 border border-gray-400"
                                onClick={pickupTheLadder}
                            >
                                Récupérer cette échelle
                            </Button>
                        </div>
                    )}
                    </InfoBubble>
                </>
            )}

            <div className={styles.interactiveLayer}>
                <InteractiveZone
                    top="75%"
                    left="0%"
                    width="100%"
                    height="20%"
                    label="Remonter"
                    dir="down"
                    onEnter={show}
                    onMove={move}
                    onLeave={hide}
                    onClick={() => router.push("/basement")}
                    className={styles.debugZone}
                />
            </div>
        </main>
    );
}