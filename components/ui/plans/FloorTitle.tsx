"use client";

import "@/components/ui/8bit/styles/retro.css";

interface FloorTitleProps {
    floor: number;
    className?: string;
}

const floorNames: Record<number, string> = {
    0: "REZ-DE-CHAUSSEE",
    1: "PREMIER ETAGE",
    2: "DEUXIEME ETAGE",
    3: "GRENIER",
};

export function FloorTitle({ floor, className = "" }: FloorTitleProps) {
    return (
        <div
            className={
                "relative inline-block bg-stone-900 px-6 py-3 " +
                "border-4 border-amber-600 shadow-[4px_4px_0px_0px_#78350f] " +
                className
            }
        >
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-amber-500" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-amber-500" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-amber-500" />

            <h2 className="retro text-amber-400 text-sm tracking-wider text-center">
                {floorNames[floor] || `ETAGE ${floor}`}
            </h2>
        </div>
    );
}
