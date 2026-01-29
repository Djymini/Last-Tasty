"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import "@/components/ui/8bit/styles/retro.css";
import { FloorTitle } from "./FloorTitle";
import { NavigationArrow } from "./NavigationArrow";
import { MansionFloorPlan, type FloorPlanImage } from "./MansionFloorPlan";

const DEFAULT_FLOOR_IMAGES: FloorPlanImage[] = [
    { src: "/manor-blueprints/Basement.png", alt: "Basement" },
    { src: "/manor-blueprints/1rst-floor.png", alt: "First floor" },
    { src: "/manor-blueprints/2nd-floor.png", alt: "Second floor" },
    { src: "/manor-blueprints/3rd-floor.png", alt: "Third floor" },
];

interface MansionMapViewerProps {
    isOpen: boolean;
    onClose: () => void;
    className?: string;
    customFloorImages?: FloorPlanImage[];
    totalFloors?: number;
    planWidth?: number;
    planHeight?: number;
}

export function MansionFloorViewer(props: MansionMapViewerProps) {
    if (!props.isOpen) return null;
    return <MansionFloorViewerInner {...props} />;
}

function MansionFloorViewerInner({
                                     isOpen,
                                     onClose,
                                     className = "",
                                     customFloorImages,
                                     totalFloors = 4,
                                     planWidth = 280,
                                     planHeight = 200,
                                 }: MansionMapViewerProps) {
    const images = useMemo(
        () => (customFloorImages && customFloorImages.length > 0 ? customFloorImages : DEFAULT_FLOOR_IMAGES),
        [customFloorImages]
    );

    const TOTAL_FLOORS = Math.max(1, images.length || totalFloors);

    const [currentFloor, setCurrentFloor] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const goToPreviousFloor = useCallback(() => {
        if (isAnimating) return;
        setCurrentFloor((prev) => {
            if (prev <= 0) return prev;
            setIsAnimating(true);
            window.setTimeout(() => setIsAnimating(false), 150);
            return prev - 1;
        });
    }, [isAnimating]);

    const goToNextFloor = useCallback(() => {
        if (isAnimating) return;
        setCurrentFloor((prev) => {
            if (prev >= TOTAL_FLOORS - 1) return prev;
            setIsAnimating(true);
            window.setTimeout(() => setIsAnimating(false), 150);
            return prev + 1;
        });
    }, [isAnimating, TOTAL_FLOORS]);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") goToPreviousFloor();
            if (e.key === "ArrowRight") goToNextFloor();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose, goToPreviousFloor, goToNextFloor]);

    return (
        <div
            className={
                "fixed inset-0 z-50 flex items-center justify-center " +
                "bg-black/80 backdrop-blur-sm " +
                className
            }
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div
                className={
                    "relative bg-stone-900 border-8 border-stone-700 " +
                    "shadow-[8px_8px_0px_0px_rgba(0,0,0,0.9)] " +
                    "p-6 w-[720px] max-w-[92vw]"
                }
                onClick={(e) => e.stopPropagation()}
            >
                {/* Coins pixel */}
                <div className="absolute -top-2 -left-2 w-4 h-4 bg-amber-600" />
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-amber-600" />
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-amber-600" />
                <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-amber-600" />

                {/* Close */}
                <button
                    onClick={onClose}
                    type="button"
                    aria-label="Fermer"
                    className={
                        "absolute -top-4 -right-4 z-10 size-10 bg-red-800 border-4 border-red-600 " +
                        "shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] " +
                        "hover:bg-red-700 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.8)] " +
                        "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none " +
                        "transition-all duration-100 flex items-center justify-center " +
                        "text-white font-bold retro text-sm"
                    }
                >
                    X
                </button>

                {/* Header */}
                <div className="flex flex-col items-center gap-4 mb-6">
                    <h1 className="retro text-amber-500 text-lg tracking-widest">PLANS DU MANOIR</h1>
                    <FloorTitle floor={currentFloor} />
                </div>

                {/* ✅ CENTRAGE PERFECT : grid 3 colonnes */}
                <div
                    className="mx-auto grid items-center gap-6"
                    style={{
                        gridTemplateColumns: `80px ${planWidth}px 80px`,
                        width: `${80 + planWidth + 80 + 48}px`, // 48 = gap approx (2 gaps à 24px)
                        maxWidth: "100%",
                        justifyContent: "center",
                    }}
                >
                    <div className="flex justify-center">
                        <NavigationArrow
                            direction="left"
                            onClick={goToPreviousFloor}
                            disabled={currentFloor === 0 || isAnimating}
                        />
                    </div>

                    <div
                        className={
                            "relative border-4 border-stone-600 bg-stone-950 " +
                            "shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] overflow-hidden " +
                            (isAnimating ? "opacity-50" : "")
                        }
                        style={{ width: planWidth }}
                    >
                        <div
                            className="absolute inset-0 pointer-events-none z-10"
                            style={{
                                background:
                                    "repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)",
                            }}
                        />
                        <MansionFloorPlan floor={currentFloor} customImages={images} width={planWidth} height={planHeight} />
                    </div>

                    <div className="flex justify-center">
                        <NavigationArrow
                            direction="right"
                            onClick={goToNextFloor}
                            disabled={currentFloor === TOTAL_FLOORS - 1 || isAnimating}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col items-center gap-3 mt-6">
                    <div className="flex gap-2">
                        {Array.from({ length: TOTAL_FLOORS }).map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => {
                                    if (isAnimating) return;
                                    setIsAnimating(true);
                                    window.setTimeout(() => {
                                        setCurrentFloor(index);
                                        setIsAnimating(false);
                                    }, 150);
                                }}
                                className={
                                    "size-4 border-2 transition-colors duration-100 " +
                                    (currentFloor === index
                                        ? "bg-amber-500 border-amber-300"
                                        : "bg-stone-700 border-stone-500 hover:bg-stone-600")
                                }
                                aria-label={`Aller a l'etage ${index}`}
                            />
                        ))}
                    </div>

                    <p className="retro text-stone-500 text-[8px] tracking-wide">FLECHES POUR NAVIGUER - ESC POUR FERMER</p>
                </div>
            </div>
        </div>
    );
}
