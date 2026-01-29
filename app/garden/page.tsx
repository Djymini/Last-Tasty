"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "@/app/garden/page.module.css";
import { InfoBubble } from "@/components/ui/shared/InfoBubble";
import { Button } from "@/components/ui/button";
import InteractiveZone from "@/components/ui/shared/InteractiveZone/InteractiveZone";
import CursorOverlay from "@/components/ui/shared/cursorOverlay/CursorOverlay";
import {useTimedOpen} from "@/app/hooks/useTimedOpen";
import {useCursorOverlay} from "@/app/hooks/useCursorOverlay";



type InventoryItem = "ladder" | "key";

export default function GardenPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const getInventory = (): InventoryItem[] => {
        const inv: InventoryItem[] = [];
        if (searchParams.get("ladder") === "1") inv.push("ladder");
        if (searchParams.get("key") === "1") inv.push("key");
        return inv;
    };

    const inventory = getInventory();
    const hasLadder = inventory.includes("ladder");
    const hasKey = inventory.includes("key");

    const { open, setOpen, show } = useTimedOpen(2500);
    const { cursor, show: showCursor, move, hide } = useCursorOverlay();

    const onNestClick = () => {
        if (!hasLadder) return show(1);
        setOpen(2);
    };

    const onClimbToNest = () => {
        router.push(`/garden/nest?ladder=${hasLadder ? "1" : "0"}&key=${hasKey ? "1" : "0"}`);
    };

    const zones = [
        {
            id: 3,
            className: styles.zone1,
            bubble: (
                <InfoBubble
                    title="Un vieux pot de fleurs"
                    description="La terre est fraîche… quelqu’un s’en est servi récemment."
                    top="-10%"
                    left="-50%"
                />
            ),
        },
        {
            id: 4,
            className: styles.zone2,
            bubble: (
                <InfoBubble
                    title="Une lanterne allumée"
                    description="Elle éclaire encore le jardin, malgré la nuit."
                    top="120%"
                    left="50%"
                />
            ),
        },
        {
            id: 5,
            className: styles.zone3,
            bubble: (
                <InfoBubble
                    title="La pleine lune"
                    description="Sa lumière rend le jardin étrangement silencieux."
                    top="120%"
                    left="50%"
                />
            ),
        },
    ];

    return (
        <main className={styles.main}>
            <CursorOverlay {...cursor} />

            {!hasKey && (
                <div className={`${styles.zone} ${styles.nestZone}`} onClick={onNestClick} role="button">
                    {open === 1 && (
                        <InfoBubble title="Trop haut" description="Je ne peux pas atteindre le nid." top="50%" left="100%" />
                    )}

                    {open === 2 && (
                        <InfoBubble
                            title="Échelle"
                            description="Vous posez l'échelle. Vous pouvez atteindre le nid."
                            top="50%"
                            left="100%"
                            width="340px"
                        >
                            <div style={{ marginTop: 12, textAlign: "right" }}>
                                <Button
                                    variant="outline"
                                    className="bg-gray-200 text-gray-900 hover:bg-gray-300 border border-gray-400"
                                    onClick={onClimbToNest}
                                >
                                    Monter au nid
                                </Button>
                            </div>
                        </InfoBubble>
                    )}
                </div>
            )}

            {zones.map((z) => (
                <div
                    key={z.id}
                    className={`${styles.zone} ${z.className}`}
                    onMouseEnter={() => setOpen(z.id)}
                    onMouseLeave={() => setOpen(null)}
                >
                    {open === z.id && z.bubble}
                </div>
            ))}


            <InteractiveZone
                top= "75%"
                left= "30%"
                width= "40%"
                height= "25%"
                label="Vers le hall"
                dir="down"
                onEnter={showCursor}
                onMove={move}
                onLeave={hide}
                onClick={() => router.push("/hall")}
            />
        </main>
    );
}
