"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { Button } from "@/components/ui/8bit/button";
import { Input } from "@/components/ui/input";

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

    const handleKeyPress = (letter: string) => {
        setCode((prev) => prev + letter);
    };

    const handleBackspace = () => {
        setCode((prev) => prev.slice(0, -1));
    };

    const handleValidate = () => {
        console.log("Code entré :", code);
        if (code === "BELAGE") {
            setIsUnlocked(true);
        }
    };

    if (isUnlocked) {
        return <main className={styles.roomBackgroundUnlocked}></main>;
    }

    return (
        <main className={styles.roomBackgroundLocked}>
            {/* Overlay stage (référence plein écran) */}
            <div className={styles.stage}>
                {/* Actions */}
                <div className={styles.container}>
                    <Button
                        className="bg-opacity-0"
                        onClick={() => setShowCodeInput((prev) => !prev)}
                    >
                        {showCodeInput ? "Retour" : "Entrer le code"}
                    </Button>

                    {showCodeInput && (
                        <Button
                            className="bg-opacity-0 border border-white"
                            onClick={handleBackspace}
                            disabled={code.length === 0}
                        >
                            Effacer
                        </Button>
                    )}

                    {!showCodeInput && (
                        <Button
                            className="bg-opacity-0"
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

                        <div className={styles.validateWrapper}>
                            <Button className="bg-opacity-0 w-80 h-12 border border-white" onClick={handleValidate}></Button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
