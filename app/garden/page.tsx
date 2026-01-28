"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "@/app/garden/page.module.css";
import { InfoBubble } from "@/components/ui/shared/InfoBubble";
import { Button } from "@/components/ui/button";

type InventoryItem = "ladder" | "key";

export default function GardenPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // TODO: remplacer ça
    const getInventory = (): InventoryItem[] => {
        const inv: InventoryItem[] = [];
        if (searchParams.get("ladder") === "1") inv.push("ladder");
        if (searchParams.get("key") === "1") inv.push("key");
        return inv;
    };

    const inventory = getInventory();
    const hasLadder = inventory.includes("ladder");
    const hasKey = inventory.includes("key");

    const [open, setOpen] = useState<number | null>(null);
    const timeoutRef = useRef<number | null>(null);

    const showBubble = (id: number) => {
        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        setOpen(id);

        timeoutRef.current = window.setTimeout(() => {
            setOpen(null);
            timeoutRef.current = null;
        }, 2500);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
        };
    }, []);

    const onNestClick = () => {
        if (!hasLadder) {
            showBubble(1); // trop haut
            return;
        }
        setOpen(2); // échelle
    };

    const onClimbToNest = () => {
        router.push(`/garden/nest?ladder=${hasLadder ? "1" : "0"}&key=${hasKey ? "1" : "0"}`);
    };

    return (
        <main className={styles.main}>
            {!hasKey && (
                <div className={`${styles.zone} ${styles.nestZone}`} onClick={onNestClick} role="button">
                    {open === 1 && (
                        <InfoBubble
                            title="Trop haut"
                            description="Je ne peux pas atteindre le nid."
                            top="50%"
                            left="100%"
                        />
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

            <div
                className={`${styles.zone} ${styles.zone1}`}
                onClick={() => showBubble(3)}
                role="button"
            >
                {open === 3 && (
                    <InfoBubble
                        title="Un vieux pot de fleurs"
                        description="La terre est fraîche… quelqu’un s’en est servi récemment."
                        top="-10%"
                        left="50%"
                    />
                )}
            </div>

            <div
                className={`${styles.zone} ${styles.zone2}`}
                onClick={() => showBubble(4)}
                role="button"
            >
                {open === 4 && (
                    <InfoBubble
                        title="Une lanterne allumée"
                        description="Elle éclaire encore le jardin, malgré la nuit."
                        top="120%"
                        left="50%"
                    />
                )}
            </div>

            <div
                className={`${styles.zone} ${styles.zone3}`}
                onClick={() => showBubble(5)}
                role="button"
            >
                {open === 5 && (
                    <InfoBubble
                        title="La pleine lune"
                        description="Sa lumière rend le jardin étrangement silencieux."
                        top="120%"
                        left="50%"
                    />
                )}
            </div>


        </main>
    );
}
