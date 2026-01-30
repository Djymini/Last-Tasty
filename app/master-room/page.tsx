"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css";
import CursorOverlay from "@/components/ui/shared/cursorOverlay/CursorOverlay";
import { InfoBubble } from "@/components/ui/shared/InfoBubble";
import InteractiveZone from "@/components/ui/shared/InteractiveZone/InteractiveZone";
import { Button } from "@/components/ui/button";
import { useCursorOverlay } from "@/app/hooks/useCursorOverlay";
import {InventoryBoard} from "@/components/ui/inventory-board";
import {usePlayerContext} from "@/app/contexts/PlayerContext";
import {toast} from "@/components/ui/8bit/toast";

export default function LivingRoomPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const { cursor, show: showCursor, move, hide } = useCursorOverlay();

    const bookmarkTaken = searchParams.get("bookmark") === "1";
    const [open, setOpen] = useState<number | null>(null);
    const context = usePlayerContext();

    const hasBook = context.value.inventory.some(
        item => item.name === "Le satanisme pour les nuls"
    );

    const bookDescription = hasBook
        ? "Bizarre l'ambiance, j'ai déjà le marque-page"
        : "Ça pourrait m'être utile !";

    const onTakeBookmark = () => {
        context.setValue(prev => ({
            ...prev,
            inventory: [
                ...prev.inventory,
                {
                    idItem: 7,
                    name: "Marque page de René",
                    description: "Note pour moi le code est donné en ne comptant que les lettres des livres : Arbre 10 / Feu 4, Pluie 20 / Soleil 2 / Coeur 13",
                    image: "/icons/bookmark.png"
                },
                {
                    idItem: 8,
                    name: "Le satanisme pour les nuls",
                    description: "Un livre avec un symbole de feu. Il est apparu quand j'ai récupéré le marque-page... Hum",
                    image: "/icons/fire_book.png"
                }
            ]
        }));
        toast("Marque-page et livre ramassés")
        router.push("/master-room?bookmark=1");
    };

    return (
        <main className={`${styles.main} ${bookmarkTaken ? styles.bookmarkTaken : ""}`}>
            <InventoryBoard rows={2} cols={6} />
            <CursorOverlay {...cursor} />

            <div className={styles.painting} onClick={() => setOpen(1)} role="button">
                {open === 1 && (
                    <InfoBubble
                        title="Tableau"
                        description="Il serait temps de faire les poussières dans le coin ..."
                        style={{
                            position: "absolute",
                            top: "2vh",
                            left: "2vw",
                            width: "25vw",
                            pointerEvents: "none",
                        }}
                    />
                )}
            </div>

            {!bookmarkTaken && (
                <>
                    {open !== 2 && (
                        <div className={styles.bookmark} onClick={() => setOpen(2)} role="button" />
                    )}

                    {open === 2 && (
                        <InfoBubble
                            title="Marque page de René"
                            description={bookDescription}
                            top="20%"
                            left="70%"
                            width="20%"
                        >
                            {!hasBook && (
                                <div style={{ marginTop: 12, textAlign: "right" }}>
                                    <Button
                                        variant="outline"
                                        className="bg-gray-200 text-gray-900 hover:bg-gray-300 border border-gray-400"
                                        onClick={onTakeBookmark}
                                    >
                                        Ramasser
                                    </Button>
                                </div>
                            )}
                        </InfoBubble>
                    )}
                </>
            )}

            <InteractiveZone
                top="65vh"
                left="0vw"
                width="100vw"
                height="35vh"
                label="Retourner dans le couloir"
                dir="down"
                onEnter={showCursor}
                onMove={move}
                onLeave={hide}
                onClick={() => router.push("/east-corridor")}
            />
        </main>
    );
}
