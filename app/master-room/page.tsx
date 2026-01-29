"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css";
import CursorOverlay from "@/components/ui/shared/cursorOverlay/CursorOverlay";
import { InfoBubble } from "@/components/ui/shared/InfoBubble";
import InteractiveZone from "@/components/ui/shared/InteractiveZone/InteractiveZone";
import { Button } from "@/components/ui/button";
import { useCursorOverlay } from "@/app/hooks/useCursorOverlay";

export default function LivingRoomPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const { cursor, show: showCursor, move, hide } = useCursorOverlay();

    const bookmarkTaken = searchParams.get("blueprint") === "1";
    const [open, setOpen] = useState<number | null>(null);

    const onTakeBookmark = () => {
        router.push("/living-room?bookmark=1");
    };
    return (
        <main className={`${styles.main} ${bookmarkTaken ? styles.bookmarkTaken : ""}`}>
            <CursorOverlay {...cursor} />

            <div className={styles.painting} onClick={() => setOpen(1)} role="button">
                {open === 1 && (
                    <InfoBubble
                        title="Tableau"
                        description="Il serait temps de faire les poussières dans le coin ..."
                        style={{
                            position: "absolute",
                            top: "2vh",
                            left: "2vw",
                            width: "25vw",
                            pointerEvents: "none",
                        }}
                    />
                )}
            </div>

            <div className={`group ${styles.bookmark}`}>
                <InfoBubble
                    title="Marque page de René"
                    description="ça pourrait m'être utile !"
                    style={{
                        position: "absolute",
                        top: "-2vh",
                        left: "-20vw",
                        width: "20vw",

                    }}>
                    <div style={{ marginTop: 12, textAlign: "right" }}>
                        <Button
                            variant="outline"
                            className="bg-gray-200 text-gray-900 hover:bg-gray-300 border border-gray-400"
                            onClick={onTakeBookmark}
                        >
                            Ramasser
                        </Button>
                    </div>
                </InfoBubble>

            </div>

            <InteractiveZone
                top="65vh"
                left="0vw"
                width="100vw"
                height="35vh"
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
