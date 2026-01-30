"use client";

import { useRouter } from "next/navigation";
import {useContext, useState} from "react";
import styles from "./page.module.css";
import CursorOverlay from "@/components/ui/shared/cursorOverlay/CursorOverlay";
import InteractiveZone from "@/components/ui/shared/InteractiveZone/InteractiveZone";
import {InfoBubble} from "@/components/ui/shared/InfoBubble";
import {InventoryBoard} from "@/components/ui/inventory-board";
import {usePlayerContext} from "@/app/contexts/PlayerContext";

type CursorDir = "up" | "left" | "right" | "down";

export default function HallPage() {
    const router = useRouter();
    const context = usePlayerContext();


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
                label="Vers l'entrée"
                dir="down"
                onEnter={show}
                onMove={move}
                onLeave={hide}
                onClick={() => router.push("/entrance")}
            />

        </main>
    );
}
