"use client";

import { useMemo, useState } from "react";

import { MapButton } from "@/components/ui/plans/MapButton";
import { MansionMapViewer } from "@/components/ui/plans/MansionMapViewer";
import {usePlayerContext} from "@/app/contexts/PlayerContext";
import {MAP_ITEM} from "@/app/constants/items";

export function MapHud() {
    const { value } = usePlayerContext();
    const [open, setOpen] = useState(false);

    const hasMap = useMemo(
        () => value.inventory.some((it) => it.idItem === MAP_ITEM.idItem),
        [value.inventory]
    );

    if (!hasMap) return null;

    return (
        <>
            <div className="fixed top-4 right-4 z-[9999]">
                <MapButton onClick={() => setOpen(true)} />
            </div>

            <MansionMapViewer
                isOpen={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
}
