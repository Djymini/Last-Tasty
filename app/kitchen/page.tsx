"use client";

import { useState } from "react";
import styles from "@/app/kitchen/page.module.css";
import {InfoBubble} from "@/components/ui/shared/InfoBubble";

export default function KitchenPage() {
    const [openBubble, setOpenBubble] = useState<number | null>(null);

    const toggleBubble = (index: number) => {
        setOpenBubble(openBubble === index ? null : index);
    };

    return (
        <main className={styles.main}>
            <div
                className={styles.zone}
                onClick={() => toggleBubble(1)}
            >
                Zone 1
                {openBubble === 1 && (
                    <InfoBubble
                        title="Cuisine"
                        description="Ici, vous pouvez gérer vos recettes."
                        top="100%"
                        left="0"
                    />
                )}
            </div>

            <div
                className={styles.zone}
                onClick={() => toggleBubble(2)}
            >
                Zone 2
                {openBubble === 2 && (
                    <InfoBubble
                        title="Ingrédients"
                        description="Liste et gestion des ingrédients."
                        top="100%"
                        left="0"
                    />
                )}
            </div>

            <div
                className={styles.zone}
                onClick={() => toggleBubble(3)}
            >
                Zone 3
                {openBubble === 3 && (
                    <InfoBubble
                        title="Ustensiles"
                        description="Organisation des ustensiles."
                        top="100%"
                        left="0"
                    />
                )}
            </div>
        </main>
    );
}
