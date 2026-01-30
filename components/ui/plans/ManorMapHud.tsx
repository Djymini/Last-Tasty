"use client";

import { useState, useMemo } from "react";
import { usePlayerContext } from "@/app/contexts/PlayerContext";
import { MapButton } from "@/components/ui/plans/MapButton";
import { MansionMapViewer } from "@/components/ui/plans/MansionMapViewer";
import { MANOR_MAP_ITEM } from "@/app/constants/items";

export function ManorMapHud() {
    const { value } = usePlayerContext();
    const [isOpen, setIsOpen] = useState(false);

    const hasMap = useMemo(
        () => value.inventory.some((it) => it.idItem === MANOR_MAP_ITEM.idItem),
        [value.inventory]
    );

    if (!hasMap) return null;

    return (
        <>
            <div className="fixed right-1 z-[9999]">
                <MapButton onClick={() => setIsOpen(true)} />
            </div>

            <MansionMapViewer
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                customFloorImages={[
                    { src: "/manor-blueprints/Basement.png", alt: "Sous-sol" },
                    { src: "/manor-blueprints/1rst-floor.png", alt: "Rez-de-chaussée" },
                    { src: "/manor-blueprints/2nd-floor.png", alt: "1er étage" },
                    { src: "/manor-blueprints/3rd-floor.png", alt: "2e étage" },
                ]}
                planWidth={1200}
                planHeight={800}
            />

        </>
    );
}
