"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css";

import CursorOverlay from "@/components/ui/shared/cursorOverlay/CursorOverlay";
import InteractiveZone from "@/components/ui/shared/InteractiveZone/InteractiveZone";
import { InfoBubble } from "@/components/ui/shared/InfoBubble";
import { Button } from "@/components/ui/button";
import { useCursorOverlay } from "@/app/hooks/useCursorOverlay";
import {usePlayerContext} from "@/app/contexts/PlayerContext";
import {InventoryBoard} from "@/components/ui/inventory-board";
import {toast} from "@/components/ui/8bit/toast";

export default function LibraryPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const { cursor, show: showCursor, move, hide } = useCursorOverlay();

    const booksTaken = searchParams.get("books") === "1";
    const [open, setOpen] = useState<number | null>(null);
    const context = usePlayerContext();

    const onTakeBooks = () => {
        context.setValue(prev => ({
            ...prev,
            inventory: [
                ...prev.inventory,
                {
                    idItem: 3,
                    name: "Un été ensoleillé",
                    description: "Un livre avec un symbole de soleil",
                    image: "/icons/solar_book.png"
                },
                {
                    idItem: 4,
                    name: "Je t'attends sous la pluie",
                    description: "Un livre avec un symbole de pluie",
                    image: "/icons/rain_book.png"
                },
                {
                    idItem: 5,
                    name: "Silence, ça pousse",
                    description: "Un livre avec un symbole d'arbre",
                    image: "/icons/tree_book.png"
                }
            ]
        }));
        toast("3 livres aont été ramassés")
        router.push("/library?books=1");
        setOpen(null);
    };

    return (
        <main className={`${styles.main} ${booksTaken ? styles.booksTaken : ""}`}>
            <InventoryBoard rows={2} cols={6} />
            <CursorOverlay {...cursor} />

            {!booksTaken && (
                <>
                    {open !== 1 && (
                        <div
                            className={styles.booksZone}
                            role="button"
                            onClick={() => setOpen(1)}
                            aria-label="Livres"
                        />
                    )}

                    {open === 1 && (
                        <InfoBubble
                            title="Livres"
                            description="Trois livres poussiéreux... Ça pourrait m'être utile."
                            top="50%"
                            left="40%"
                            width="320px"
                        >
                            <div style={{ marginTop: 12, textAlign: "right" }}>
                                <Button
                                    variant="outline"
                                    className="bg-gray-200 text-gray-900 hover:bg-gray-300 border border-gray-400"
                                    onClick={onTakeBooks}
                                >
                                    Ramasser
                                </Button>
                            </div>
                        </InfoBubble>
                    )}
                </>
            )}

            {!booksTaken ? (
                <>
                    <InteractiveZone
                        top="70%"
                        left="0%"
                        width="26%"
                        height="60%"
                        label="Retour vers le hall"
                        dir="down"
                        onEnter={showCursor}
                        onMove={move}
                        onLeave={hide}
                        onClick={() => router.push("/hall")}
                    />

                    <InteractiveZone
                        top="70%"
                        left="74%"
                        width="26%"
                        height="60%"
                        label="Retour vers le hall"
                        dir="down"
                        onEnter={showCursor}
                        onMove={move}
                        onLeave={hide}
                        onClick={() => router.push("/hall")}
                    />
                </>
            ) : (
                <>
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
                </>
            )}
        </main>
    );
}
