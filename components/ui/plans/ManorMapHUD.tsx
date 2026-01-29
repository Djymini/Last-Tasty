"use client";

import React from "react";
import { useGameUI } from "@/app/contexts/GameUIContext";
import {ManorMapHUDButton} from "@/components/ui/plans/ManorMapHUDButton";
import {MansionFloorViewer} from "@/components/ui/plans/MansionMapViewer";


export function ManorMapHUD() {
    const { isMapOpen, closeMap, hasManorMap } = useGameUI();

    return (
        <>
            <ManorMapHUDButton />
            {hasManorMap && <MansionFloorViewer isOpen={isMapOpen} onClose={closeMap} />}
        </>
    );
}
