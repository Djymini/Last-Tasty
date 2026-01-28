"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { InfoBubble } from "@/components/ui/shared/InfoBubble";
import { Button } from "@/components/ui/button";

export default function NestPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [keyTaken, setKeyTaken] = useState(false);

    const hasLadder = searchParams.get("ladder") === "1";

    // TODO: à remplacer
    const addKeyToInventory = async () => {

    };

    const onConfirmKey = async () => {
        await addKeyToInventory();

        router.push(`/garden?ladder=${hasLadder ? "1" : "0"}&key=1`);
    };

    return (
        <main className={styles.main}>
            {!keyTaken && (
                <div className={`${styles.zone} ${styles.keyZone}`} onClick={() => setKeyTaken(true)} role="button" />
            )}

            {keyTaken && (
                <InfoBubble
                    title="Objet obtenu"
                    description="Tu as obtenu une clé. Elle est ajoutée à ton inventaire."
                    top="35%"
                    left="40%"
                    width="320px"
                >
                    <div style={{ marginTop: 12, textAlign: "right" }}>
                        <Button
                            variant="outline"
                            className="bg-gray-200 text-gray-900 hover:bg-gray-300 border border-gray-400"
                            onClick={onConfirmKey}
                        >
                            Retour au jardin
                        </Button>
                    </div>
                </InfoBubble>
            )}
        </main>
    );
}
