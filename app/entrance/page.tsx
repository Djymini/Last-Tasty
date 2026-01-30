"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { Button } from "@/components/ui/8bit/button";
import { Input } from "@/components/ui/input";
import {InventoryBoard} from "@/components/ui/inventory-board";
import {usePlayerContext} from "@/app/contexts/PlayerContext";

const KEYS = [
    "A", "B", "C", "D",
    "E", "F", "G", "H",
    "I","K", "J", "L",
    "M", "N", "O", "P",
];

export default function Entrance() {
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [code, setCode] = useState("");
    const [isUnlocked, setIsUnlocked] = useState(false);
    const router = useRouter();
    const context = usePlayerContext();

    const handleKeyPress = (letter: string) => {
        setCode((prev) => prev + letter);
    };

    const handleBackspace = () => {
        setCode((prev) => prev.slice(0, -1));
    };

    const handleValidate = () => {
        console.log("Code entré :", code);
        if (code === "PAIN") {
            setIsUnlocked(true);
        }
    };

    if (isUnlocked) {
        return (
            <main className={styles.roomBackgroundUnlocked}>
                <div className={styles.endMessage}>
                    <p>
                        Bravo vous avez réussi à sortir ! Le calvaire ce termine enfin.
                        Néanmoins, une pensée vous obsède : où est donc passé ce satané tasty krousty . . .
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.roomBackgroundLocked}>
            {/* Overlay stage (référence plein écran) */}
            <InventoryBoard rows={2} cols={6} />
            <div className={styles.stage}>
                {/* Actions */}
                <div className={styles.container}>
                    <Button
                        className="cursor-pointer bg-opacity-0 border border-white"
                        onClick={() => setShowCodeInput((prev) => !prev)}
                    >
                        {showCodeInput ? "Retour" : "Entrer le code"}
                    </Button>

                    {showCodeInput && (
                        <Button
                            className="cursor-pointer bg-opacity-0 border border-white"
                            onClick={handleBackspace}
                            disabled={code.length === 0}
                        >
                            Effacer
                        </Button>
                    )}

                    {!showCodeInput && (
                        <Button
                            className="w-full cursor-pointer bg-opacity-0 border border-white"
                            onClick={() => router.push("/hall")}
                        >
                            Explorer le manoir
                        </Button>
                    )}
                </div>

                {/* Overlay boîtier */}
                {showCodeInput && (
                    <div className={styles.panelOverlay}>
                        {/* écran */}
                        <Input
                            className={styles.validation}
                            value={code}
                            readOnly
                        />

                        {/* touches */}
                        <div className={styles.keyboard}>
                            {KEYS.map((letter) => (
                                <button
                                    key={letter}
                                    className={styles.keyboardKey}
                                    type="button"
                                    onClick={() => handleKeyPress(letter)}
                                    aria-label={`Touche ${letter}`}
                                >
                                    <span className="sr-only">{letter}</span>
                                </button>
                            ))}
                        </div>

                        <div >
                            <button className={styles.validateWrapper} onClick={handleValidate}></button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
