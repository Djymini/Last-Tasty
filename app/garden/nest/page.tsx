"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { InfoBubble } from "@/components/ui/shared/InfoBubble";
import { Button } from "@/components/ui/button";

export default function NestPage() {
    const router = useRouter();
    const [keyTaken, setKeyTaken] = useState(false);

    return (
        <main className={styles.main}>
            {!keyTaken && (
                <div
                    className={`${styles.zone} ${styles.keyZone}`}
                    onClick={() => setKeyTaken(true)}
                    role="button"
                />
            )}

            {keyTaken && (
                <InfoBubble
                    title="Objet obtenu"
                    description="Tu as obtenu une clé."
                    top="35%"
                    left="40%"
                    width="280px"
                >
                    <div style={{ marginTop: "12px", textAlign: "right", backgroundColor: "grey" }}>
                        <Button
                            variant="outline"
                            className="bg-gray-200 text-gray-900 hover:bg-gray-300 border border-gray-400"
                            onClick={() => router.push("/garden")}
                        >
                            Retour au jardin
                        </Button>
                    </div>
                </InfoBubble>
            )}
        </main>
    );
}
