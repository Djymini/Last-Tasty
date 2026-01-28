"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { InfoBubble } from "@/components/ui/shared/InfoBubble";
import { Button } from "@/components/ui/button";

export default function NestPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const hasLadder = searchParams.get("ladder") === "1";

    const [open, setOpen] = useState<number | null>(null);

    const onConfirmKey = () => {
        router.push(`/garden?ladder=${hasLadder ? "1" : "0"}&key=1`);
    };

    return (
        <main className={styles.main}>
            {open !== 1 && (
                <div
                    className={`${styles.zone} ${styles.keyZone}`}
                    onClick={() => setOpen(1)}
                    role="button"
                />
            )}

            {open === 1 && (
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
