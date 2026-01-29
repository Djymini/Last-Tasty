"use client";
import { useState } from "react";

export type CursorDir = "up" | "left" | "right" | "down";

export function useCursorOverlay() {
    const [cursor, setCursor] = useState<{
        visible: boolean;
        x: number;
        y: number;
        dir: CursorDir;
        label: string;
    }>({ visible: false, x: 0, y: 0, dir: "down", label: "" });

    const show = (dir: CursorDir, label: string) =>
        setCursor((c) => ({ ...c, visible: true, dir, label }));

    const move = (e: React.MouseEvent) =>
        setCursor((c) => ({ ...c, x: e.clientX, y: e.clientY }));

    const hide = () => setCursor((c) => ({ ...c, visible: false, label: "" }));

    return { cursor, show, move, hide };
}
