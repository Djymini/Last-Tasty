"use client";

import styles from "./page.module.css"
import {InfoBubble} from "@/components/ui/shared/InfoBubble";
import InteractiveZone from "@/components/ui/shared/InteractiveZone/InteractiveZone";
import {useRouter} from "next/navigation";
import {useState} from "react";
import CursorOverlay from "@/components/ui/shared/cursorOverlay/CursorOverlay";
import {usePlayerContext} from "@/app/contexts/PlayerContext";
import {InventoryBoard} from "@/components/ui/inventory-board";
import { useCursorOverlay } from "@/app/hooks/useCursorOverlay";
import {Button} from "@/components/ui/button";
import { toast } from "@/components/ui/8bit/toast"




export default function MaidRoomPage() {
    const router = useRouter();
    const context = usePlayerContext();

    const { cursor, show: showCursor, move, hide } = useCursorOverlay();
    const [open, setOpen] = useState<number | null>(null);

    const onTakeBook = () => {
        if (!context.value.inventory.some(item => item.name === "Note du journal du majordome")){
            context.setValue(prev => ({
                ...prev,
                inventory: [
                    ...prev.inventory,
                    {
                        idItem: 11,
                        name: "Note du journal du majordome",
                        description: "La pie a encore volé la clé de la bibliothèque. Je vais devoir aller chercher l'echelle à la cave pour la récupérer",
                        image: "/icons/notepad.png"
                    }
                ]
            }));
            toast("Note du journal du majordome ramassé")
        }
    }


    return (
        <main className={styles.main}>
            <InventoryBoard rows={2} cols={6} />
            <CursorOverlay {...cursor} />

            <div className={styles.bed} onClick={() => setOpen(1)} role="button">
                {open === 1 && (
                    <InfoBubble
                        title="Lit"
                        description="Ce majordome est bien lotit !"
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

            <div className={styles.book} onClick={() => setOpen(2)} role="button">
                {open === 2 && (
                    <InfoBubble
                        title="Journal"
                        description="Journal de Bob le majordome, il semblerait contenir une note intéressante ..."
                        top="-15%"
                        left="-15%"
                        width="70%"
                    >
                        <div style={{ marginTop: 12, textAlign: "right" }}>
                            <Button
                                variant="outline"
                                className="bg-gray-200 text-gray-900 hover:bg-gray-300 border border-gray-400"
                                onClick={onTakeBook}
                            >
                                Ramasser
                            </Button>
                        </div>
                    </InfoBubble>
                )}
            </div>

            <InteractiveZone
                top="72vh"
                left="0vw"
                width="53vw"
                height="28vh"
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