"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import styles from "@/app/kitchen/page.module.css";

import { InfoBubble } from "@/components/ui/shared/InfoBubble";
import InteractiveZone from "@/components/ui/shared/InteractiveZone/InteractiveZone";
import CursorOverlay from "@/components/ui/shared/cursorOverlay/CursorOverlay";
import ScreamerOverlay from "@/components/ui/screamerOverlay/ScreamerOverlay";
import { InventoryBoard } from "@/components/ui/inventory-board";
import { Button } from "@/components/ui/button";

import { useTimedOpen } from "@/app/hooks/useTimedOpen";
import { useCursorOverlay } from "@/app/hooks/useCursorOverlay";
import { usePlayerContext } from "@/app/contexts/PlayerContext";
import { addItemOnce } from "@/app/utils/inventory";
import {toast} from "@/components/ui/8bit/toast";

export default function KitchenPage() {
    const router = useRouter();
    const context = usePlayerContext();

    const { open, show } = useTimedOpen(2500);
    const { cursor, show: showCursor, move, hide } = useCursorOverlay();

    const [screamerOpen, setScreamerOpen] = useState(false);

    useEffect(() => {
        if (!screamerOpen) return;

        const timer = setTimeout(() => {
            setScreamerOpen(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [screamerOpen]);

    const NOTE_ITEM = useMemo(
        () => ({
            idItem: 3,
            name: "Note du post-it trouvé dans la cuisine",
            description: "Voir le majordome pour la pie",
            image: "/icons/notepad.png",
        }),
        []
    );

    const BOOK_ITEM = useMemo(
        () => ({
            idItem: 9,
            name: "Enterre moi mon amour",
            description: "Un livre avec un symbole de coeur",
            image: "/icons/heart_book.png",
        }),
        []
    );

    const hasNote = context.value.inventory.some((i) => i.name === NOTE_ITEM.name);
    const hasBook = context.value.inventory.some((i) => i.name === BOOK_ITEM.name);

    const onTakeNote = () => {
        context.setValue((prev) => ({
            ...prev,
            inventory: addItemOnce(prev.inventory, NOTE_ITEM),
        }));
        toast("Post-it ramassé")

    };

    const onTakeBook = () => {
        context.setValue((prev) => ({
            ...prev,
            inventory: addItemOnce(prev.inventory, BOOK_ITEM),
        }));
        toast("Livre ramassé")
    };

    const zones = [
        {
            id: 2,
            className: styles.zone2,
            bubble: (
                <InfoBubble
                    title="Un étrange document"
                    description={hasNote ? "Je viens de le récuperer non ?" : "Il me sera sûrement utile."}
                    top="12%"
                    left="-180%"
                >
                    {!hasNote && (
                        <div style={{ marginTop: 12, textAlign: "right" }}>
                            <Button
                                variant="outline"
                                className="bg-gray-200 text-gray-900 hover:bg-gray-300 border border-gray-400"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onTakeNote();
                                }}
                            >
                                Ramasser
                            </Button>
                        </div>
                    )}
                </InfoBubble>
            ),
            action: () => show(2),
        },
        {
            id: 3,
            className: styles.zone3,
            bubble: (
                <InfoBubble
                    title="Plusieurs rangées de bocaux"
                    description="Je n'ose pas imaginer ce qu'il y a à l'intérieur"
                    top="150px"
                    left="250px"
                />
            ),
            action: () => show(3),
        },
        {
            id: 4,
            className: styles.zone4,
            bubble: (
                <InfoBubble
                    title="Livre"
                    description={hasBook ? "C'est trop bizarre !" : "Ce livre semble être un indice."}
                    top="150px"
                    left="250px"
                >
                    {!hasBook && (
                        <div style={{ marginTop: 12, textAlign: "right" }}>
                            <Button
                                variant="outline"
                                className="bg-gray-200 text-gray-900 hover:bg-gray-300 border border-gray-400"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onTakeBook();
                                }}
                            >
                                Ramasser
                            </Button>
                        </div>
                    )}
                </InfoBubble>
            ),
            action: () => show(4),
        },
    ];

    return (
        <main className={styles.main}>
            <InventoryBoard rows={2} cols={6} />

            <ScreamerOverlay
                open={screamerOpen}
                src="screamer.png"
                alt="Screamer"
                onClose={() => setScreamerOpen(false)}
            />

            <CursorOverlay {...cursor} />

            <div
                className={`${styles.zone} ${styles.zone1}`}
                onClick={() => setScreamerOpen(true)}
                role="button"
            />

            {zones.map((z) => (
                <div
                    key={z.id}
                    className={`${styles.zone} ${z.className}`}
                    onClick={z.action}
                    role="button"
                >
                    {open === z.id && z.bubble}
                </div>
            ))}

            <InteractiveZone
                top="75%"
                left="0%"
                width="60%"
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
