"use client";

import { useRouter } from "next/navigation";
import styles from "@/app/kitchen/page.module.css";
import { InfoBubble } from "@/components/ui/shared/InfoBubble";
import InteractiveZone from "@/components/ui/shared/InteractiveZone/InteractiveZone";
import CursorOverlay from "@/components/ui/shared/cursorOverlay/CursorOverlay";
import ScreamerOverlay from "@/components/ui/screamerOverlay/ScreamerOverlay";
import { useTimedOpen } from "@/app/hooks/useTimedOpen";
import { useCursorOverlay } from "@/app/hooks/useCursorOverlay";
import { useState } from "react";
import {InventoryBoard} from "@/components/ui/inventory-board";
import {usePlayerContext} from "@/app/contexts/PlayerContext";
import ScreamerOverlay2 from "@/components/ui/screamerOverlay/ScreamerOverlay2";

export default function KitchenPage() {
    const router = useRouter();

    const { open, show } = useTimedOpen(2500);
    const { cursor, show: showCursor, move, hide } = useCursorOverlay();

    const [screamerOpen, setScreamerOpen] = useState(false);
    const context = usePlayerContext();


    const zones = [
        {
            id: 2,
            className: styles.zone2,
            bubble: (
                <InfoBubble
                    title="Un étrange document"
                    description="Il me sera sûrement utile."
                    top="12%"
                    left="-180%"
                />
            ),
            action: () => {
                if (!context.value.inventory.some(item => item.name === "Note du post-it trouvé dans la cuisine")){
                    context.setValue(prev => ({
                        ...prev,
                        inventory: [
                            ...prev.inventory,
                            {
                                idItem: 3,
                                name: "Note du post-it trouvé dans la cuisine",
                                description: "Voir le majordome pour la pie",
                                image: "/icons/notepad.png"
                            }
                        ]
                    }));
                }
                show(2);
            }
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
            action: () => {show(3);}
        },
        {
            id: 4,
            className: styles.zone4,
            bubble:(
                <InfoBubble
                    title="Livre"
                    description={"Ce livre semble etre un indice"}
                    top="150px"
                    left="250px"
                />
             ),
            action: () => {
                if (!context.value.inventory.some(item => item.name === "Enterre moi mon amour")){
                    context.setValue(prev => ({
                        ...prev,
                        inventory: [
                            ...prev.inventory,
                            {
                                idItem: 9,
                                name: "Enterre moi mon amour",
                                description: "Un livre avec un symbole de coeur",
                                image: "/icons/heart_book.png"
                            }
                        ]
                    }));
                }
                show(4);
            }}
    ];



    return (
        <main className={styles.main}>
            <ScreamerOverlay2 imageUrl={"/screamer.png"} durationMs={800}/>

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
