"use client";

import React from "react";
import { useGameUI } from "./GameUIContext";
import { ManorMapHUDButton } from "./ManorMapHUDButton";
import { MansionFloorViewer } from "@/components/ui/plans/MansionFloorViewer"; // ton composant modal

export function GameHUD() {
    const { isMapOpen, closeMap, hasManorMap } = useGameUI();

    return (
        <>
            <ManorMapHUDButton />

            {/* Le viewer est monté seulement si on a débloqué */}
            {hasManorMap && (
                <MansionFloorViewer
                    isOpen={isMapOpen}
                    onClose={closeMap}
                    // customFloorImages={...} // optionnel
                />
            )}
        </>
    );
}
