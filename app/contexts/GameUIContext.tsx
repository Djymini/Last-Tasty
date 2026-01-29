"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type GameUIState = {
    hasManorMap: boolean;
    unlockManorMap: () => void;

    isMapOpen: boolean;
    openMap: () => void;
    closeMap: () => void;
    toggleMap: () => void;
};

const GameUIContext = createContext<GameUIState | null>(null);

const STORAGE_KEY = "game.hasManorMap";

export function GameUIProvider({ children }: { children: React.ReactNode }) {
    const [hasManorMap, setHasManorMap] = useState(false);
    const [isMapOpen, setIsMapOpen] = useState(false);

    // Hydrate depuis localStorage
    useEffect(() => {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw === "true") setHasManorMap(true);
    }, []);

    // Persiste
    useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, String(hasManorMap));
    }, [hasManorMap]);

    const value = useMemo<GameUIState>(
        () => ({
            hasManorMap,
            unlockManorMap: () => setHasManorMap(true),

            isMapOpen,
            openMap: () => setIsMapOpen(true),
            closeMap: () => setIsMapOpen(false),
            toggleMap: () => setIsMapOpen((v) => !v),
        }),
        [hasManorMap, isMapOpen]
    );

    return <GameUIContext.Provider value={value}>{children}</GameUIContext.Provider>;
}

export function useGameUI() {
    const ctx = useContext(GameUIContext);
    if (!ctx) throw new Error("useGameUI must be used within <GameUIProvider />");
    return ctx;
}
