"use client";

import React from "react";


export function ManorMapHUDButton() {
    const { hasManorMap, toggleMap } = useGameUI();

    if (!hasManorMap) return null;

    return (
        <button
            type="button"
            onClick={toggleMap}
            className={
                "fixed top-4 right-4 z-[60] " +
                "size-16 bg-stone-800 border-4 border-stone-600 " +
                "shadow-[4px_4px_0px_0px_rgba(0,0,0,0.85)] " +
                "hover:bg-stone-700 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.85)] " +
                "active:translate-x-[4px] active:translate-y-[4px] active:shadow-none " +
                "transition-all duration-100 flex items-center justify-center"
            }
            aria-label="Open manor map"
            title="Manor map"
        >
      <span className="text-white">
        <PixelMapIcon pixelSize={2} />
      </span>
        </button>
    );
}
