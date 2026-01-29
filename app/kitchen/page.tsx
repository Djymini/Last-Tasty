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

export default function KitchenPage() {
    const router = useRouter();

    const { open, show } = useTimedOpen(2500);
    const { cursor, show: showCursor, move, hide } = useCursorOverlay();

    const [screamerOpen, setScreamerOpen] = useState(false);

    const zones = [
        {
            id: 2,
            className: styles.zone2,
            bubble: (
                <InfoBubble
                    title="Un étrange document"
                    description="Il me sera sûrement utile."
                    top="13%"
                    left="-180%"
                />
            ),
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
        },
    ];

    return (
        <main className={styles.main}>
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
                    onClick={() => show(z.id)}
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
