"use client";

import { cn } from "@/lib/utils";
import { MapIcon } from "./icons/map-icon";
import "@/components/ui/8bit/styles/retro.css";

interface MapButtonProps {
    onClick: () => void;
    className?: string;
}

export function MapButton({ onClick, className }: MapButtonProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "relative cursor-pointer",
                "size-20 bg-stone-800",
                "border-4 border-stone-600",
                "shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]",
                "hover:bg-stone-700 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]",
                "active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
                "transition-all duration-100",
                "flex items-center justify-center",
                className
            )}
            aria-label="Ouvrir les plans du manoir"
        >
            <div className="relative">
                <MapIcon size={48} />
                <span className="absolute -top-2 -right-3 bg-amber-700 text-amber-100 font-[family-name:var(--font-retro)] text-[8px] px-1 border-2 border-amber-900 retro">
          MAP
        </span>
            </div>
        </button>
    );
}
