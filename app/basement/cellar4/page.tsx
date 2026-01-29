"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../basement/page.module.css";
import InteractiveZone from "@/components/ui/shared/InteractiveZone/InteractiveZone";
import ScreamerOverlay2 from "@/components/ui/screamerOverlay/ScreamerOverlay2";
import CursorOverlay from "@/components/ui/shared/cursorOverlay/CursorOverlay";
import {usePlayerContext} from "@/app/contexts/PlayerContext";
import {InventoryBoard} from "@/components/ui/inventory-board";

type CursorDir = "up" | "down" | "left" | "right";

export default function Cellar4() {
    const router = useRouter();
    const [cursor, setCursor] = useState({
        visible: false,
        x: 0,
        y: 0,
        dir: "down" as CursorDir,
        label: "",
    });

    const show = (dir: CursorDir, label: string) =>
        setCursor((c) => ({ ...c, visible: true, dir, label }));
    const move = (e: React.MouseEvent) =>
        setCursor((c) => ({ ...c, x: e.clientX, y: e.clientY }));
    const hide = () => setCursor((c) => ({ ...c, visible: false, label: "" }));

    return (
        <main className={styles.cellarBackground4}>
            <InventoryBoard rows={2} cols={6} />
            <div className={styles.cursorLayer}>
                <CursorOverlay
                    visible={cursor.visible}
                    x={cursor.x}
                    y={cursor.y}
                    dir={cursor.dir}
                    label={cursor.label}
                />
            </div>
            <div className={styles.interactiveLayer}>
                <InteractiveZone
                    top="75%"
                    left="0%"
                    width="100%"
                    height="25%"
                    label="Retour vers le hall"
                    dir="down"
                    onEnter={show}
                    onMove={move}
                    onLeave={hide}
                    onClick={() => router.push("/hall")}
                />
            </div>
        </main>
    );
}
