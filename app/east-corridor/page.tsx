"use client";

import {InfoBubble} from "@/components/ui/shared/InfoBubble";
import styles from "./page.module.css";

type CursorDir = "up" | "left" | "right" | "down";

export default function EastCorridorPage() {
    return (
        <main className={styles.page}>
            <div className={`group ${styles.door1}`}>
                <InfoBubble
                    title="Porte"
                    description="Cette porte est condamnée"
                    className="opacity-0 transition-all duration-150 group-hover:opacity-100"
                    style={{
                        position: "absolute",
                        top: "40%",
                        width: "15vw",
                        pointerEvents: "none",
                    }}
                />
            </div>

            <div className={`group ${styles.door2}`}>

            </div>

            <div className={`group ${styles.door3}`}>

            </div>

            <div className={`group ${styles.door4}`}>
                <InfoBubble
                    title="Porte"
                    description="Cette porte est condamnée"
                    className="opacity-0 translate-y-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-y-0"
                    style={{
                        position: "absolute",

                        top: "37%",

                        width: "15vw",
                        pointerEvents: "none",
                    }}
                />
            </div>

            <div className={`group ${styles.door5}`}>
                <InfoBubble
                    title="Porte"
                    description="Cette porte est condamnée"
                    className="opacity-0 translate-y-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-y-0"
                    style={{
                        position: "absolute",

                        top: "40%",

                        width: "15vw",
                        pointerEvents: "none",
                    }}
                />
            </div>
        </main>
    );
}