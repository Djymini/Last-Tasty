"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/garden/page.module.css";
import { InfoBubble } from "@/components/ui/shared/InfoBubble";

type InventoryItem = "ladder";

export default function GardenPage() {
    const router = useRouter();

    const inventory: InventoryItem[] = [];
    const hasLadder = inventory.includes("ladder");

    const [bubbleOpen, setBubbleOpen] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    const showBubble = () => {
        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        setBubbleOpen(true);

        timeoutRef.current = window.setTimeout(() => {
            setBubbleOpen(false);
            timeoutRef.current = null;
        }, 2500);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
        };
    }, []);

    const onNestClick = () => {
        if (hasLadder) {
            router.push("/garden/nest");
            return;
        }
        showBubble();
    };

    return (
        <main className={styles.main}>
            <div className={`${styles.zone} ${styles.nestZone}`} onClick={onNestClick} role="button">
                {bubbleOpen && (
                    <InfoBubble
                        title="Trop haut"
                        description="Je ne peux pas atteindre le nid."
                        top="50%"
                        left="100%"
                    />
                )}
            </div>
        </main>
    );
}
