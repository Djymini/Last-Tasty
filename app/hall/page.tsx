"use client";

import { useRouter } from "next/navigation";
import {useContext, useEffect, useState} from "react";
import styles from "./page.module.css";
import CursorOverlay from "@/components/ui/shared/cursorOverlay/CursorOverlay";
import InteractiveZone from "@/components/ui/shared/InteractiveZone/InteractiveZone";
import {InfoBubble} from "@/components/ui/shared/InfoBubble";
import {InventoryBoard} from "@/components/ui/inventory-board";
import {usePlayerContext} from "@/app/contexts/PlayerContext";
import Dialogue from "@/components/ui/8bit/blocks/dialogue";

type CursorDir = "up" | "left" | "right" | "down";

export default function HallPage() {
    const router = useRouter();
    const context = usePlayerContext();
    const [currentDialogue, setCurrentDialogue] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const [showDialogue, setShowDialogue] = useState(true);

    const handleToggleDialogue = () => {
        setShowDialogue(!showDialogue);
        if (!showDialogue) {
            setCurrentDialogue(0);
        }
        context.setValue(prev => ({
            ...prev,
            introductionIsViewed: true,
        }));
    };

    useEffect(() => {
        if (!showDialogue) return;

        setDisplayedText("");
        setIsTyping(true);
        let index = 0;
        const text = currentMessage.text;

        const typingInterval = setInterval(() => {
            if (index < text.length) {
                setDisplayedText(text.slice(0, index + 1));
                index++;
            } else {
                setIsTyping(false);
                clearInterval(typingInterval);
            }
        }, 40);

        return () => clearInterval(typingInterval);
    }, [currentDialogue, showDialogue]);


    const [cursor, setCursor] = useState<{
        visible: boolean;
        x: number;
        y: number;
        dir: CursorDir;
        label: string;
    }>({
        visible: false,
        x: 0,
        y: 0,
        dir: "up",
        label: "",
    });

    const [showLockedInfo, setShowLockedInfo] = useState(false);

    const show = (dir: CursorDir, label: string) =>
        setCursor((c) => ({ ...c, visible: true, dir, label }));

    const move = (e: React.MouseEvent) =>
        setCursor((c) => ({ ...c, x: e.clientX, y: e.clientY }));

    const hide = () =>
        setCursor((c) => ({ ...c, visible: false, label: "" }));

    const openLockedDoor = (hasKey: boolean, path: string) => {
        if (!context.value.inventory.some(item => item.name === "Clé de la bibliothèque")) {
            setShowLockedInfo(true);

            window.setTimeout(() => {
                setShowLockedInfo(false);
            }, 2500);

            return;
        }

        setShowLockedInfo(false);
        router.push(path);
    };

    // TODO: à lier avec l'inventaire
    const hasLibraryKey = false;

    const dialogues = [
        {
            speaker: "?",
            text: "Que faites vous ici ? Vous devez vous enfuir. Cette maison est bizarre. Pour sortir les livres et le marque page sont la clé. Une carte se trouve dans le salon Bonne chance !",
            avatarSrc: "https://api.dicebear.com/7.x/pixel-art/svg?seed=hero",
            avatarFallback: "HR",
            isPlayer: true,
        }
    ];

    const currentMessage = dialogues[0];

    return (
        <main className={styles.main}>
            <InventoryBoard rows={2} cols={6} />
            <CursorOverlay
                visible={cursor.visible}
                x={cursor.x}
                y={cursor.y}
                dir={cursor.dir}
                label={cursor.label}
            />

            {showLockedInfo && (
                <InfoBubble
                    top="40%"
                    left="65%"
                    width="280px"
                    title="Porte verrouillée"
                    description="La porte est verouillée."
                    style={{ transform: "translateX(-50%)" }}
                />
            )}

            <InteractiveZone
                top="0%"
                left="15%"
                width="17%"
                height="29%"
                label="Couloir ouest"
                dir="up"
                onEnter={show}
                onMove={move}
                onLeave={hide}
                onClick={() => router.push("/west-corridor")}
            />

            <InteractiveZone
                top="0%"
                left="68%"
                width="17%"
                height="29%"
                label="Couloir est"
                dir="up"
                onEnter={show}
                onMove={move}
                onLeave={hide}
                onClick={() => router.push("/east-corridor")}
            />

            <InteractiveZone
                top="50%"
                left="25%"
                width="5%"
                height="27%"
                label="Cave"
                dir="left"
                onEnter={show}
                onMove={move}
                onLeave={hide}
                onClick={() => router.push("/basement")}
            />

            <InteractiveZone
                top="36%"
                left="40%"
                width="18%"
                height="38%"
                label="Jardin"
                dir="up"
                onEnter={show}
                onMove={move}
                onLeave={hide}
                onClick={() => router.push("/garden")}
            />

            <InteractiveZone
                top="41%"
                left="60%"
                width="10%"
                height="35%"
                label="Bibliothèque"
                dir="up"
                onEnter={show}
                onMove={move}
                onLeave={hide}
                onClick={() => openLockedDoor(hasLibraryKey, "/library")}
            />

            <InteractiveZone
                top="74%"
                left="0%"
                width="18%"
                height="26%"
                label="Salon"
                dir="left"
                onEnter={show}
                onMove={move}
                onLeave={hide}
                onClick={() => router.push("/living-room")}
            />

            <InteractiveZone
                top="74%"
                right="0%"
                width="18%"
                height="26%"
                label="Cuisine"
                dir="right"
                onEnter={show}
                onMove={move}
                onLeave={hide}
                onClick={() => router.push("/kitchen")}
            />



            <InteractiveZone
                top="78%"
                left="38%"
                width="24%"
                height="22%"
                label="Vers la porte de sortie"
                dir="down"
                onEnter={show}
                onMove={move}
                onLeave={hide}
                onClick={() => router.push("/entrance")}
            />

            {showDialogue && !context.value.introductionIsViewed && (
                <div
                    className="bg-slate-900 p-4 border-t-4 border-foreground cursor-pointer"
                    onClick={handleToggleDialogue}
                >
                    <div className="max-w-2xl mx-auto">
                        <Dialogue
                            avatarSrc={currentMessage.avatarSrc}
                            avatarFallback={currentMessage.avatarFallback}
                            title={currentMessage.speaker}
                            description={displayedText}
                            player={currentMessage.isPlayer}
                        />

                        {/* Continue indicator */}
                        <div className="flex justify-end mt-2">
              <span
                  className={`retro text-xs text-muted-foreground ${isTyping ? "opacity-0" : "animate-pulse"}`}
              >
                [ Fermer ]
              </span>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
