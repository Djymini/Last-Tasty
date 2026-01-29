"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";

import "@/components/ui/8bit/styles/retro.css";
import {FloorTitle} from "@/components/ui/plans/FloorTitle";
import {NavigationArrow} from "@/components/ui/plans/NavigationArrow";
import {FloorPlanImage, MansionFloorPlan} from "@/components/ui/plans/MansionFloorPlan";

interface MansionMapViewerProps {
    isOpen: boolean;
    onClose: () => void;
    className?: string;
    customFloorImages?: FloorPlanImage[];
    totalFloors?: number;
    planWidth?: number;
    planHeight?: number;
}

export function MansionMapViewer({
                                     isOpen,
                                     onClose,
                                     className,
                                     customFloorImages,
                                     totalFloors = 4,
                                     planWidth = 280,
                                     planHeight = 200,
                                 }: MansionMapViewerProps) {
    const TOTAL_FLOORS = useMemo(
        () => customFloorImages?.length ?? totalFloors,
        [customFloorImages?.length, totalFloors]
    );

    const [currentFloor, setCurrentFloor] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClose = useCallback(() => {
        setCurrentFloor(0);      // ✅ reset ici, plus dans un useEffect
        setIsAnimating(false);
        onClose();
    }, [onClose]);

    const goToPreviousFloor = useCallback(() => {
        if (currentFloor > 0 && !isAnimating) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentFloor((prev) => prev - 1);
                setIsAnimating(false);
            }, 150);
        }
    }, [currentFloor, isAnimating]);

    const goToNextFloor = useCallback(() => {
        if (currentFloor < TOTAL_FLOORS - 1 && !isAnimating) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentFloor((prev) => prev + 1);
                setIsAnimating(false);
            }, 150);
        }
    }, [currentFloor, isAnimating, TOTAL_FLOORS]); // ✅ TOTAL_FLOORS ajouté

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                handleClose();
            } else if (e.key === "ArrowLeft") {
                goToPreviousFloor();
            } else if (e.key === "ArrowRight") {
                goToNextFloor();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, handleClose, goToPreviousFloor, goToNextFloor]);

    if (!isOpen) return null;

    return (
        <div
            className={cn(
                "fixed inset-0 z-50 flex items-center justify-center",
                "bg-black/80 backdrop-blur-sm",
                className
            )}
            onClick={handleClose} // ✅ ici aussi
        >
            <div
                className={cn(
                    "relative",
                    "bg-stone-900",
                    "border-8 border-stone-700",
                    "shadow-[8px_8px_0px_0px_rgba(0,0,0,0.9)]",
                    "p-6",
                    "animate-in fade-in zoom-in-95 duration-200"
                )}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={handleClose} // ✅ ici aussi
                    className={cn(
                        "absolute -top-4 -right-4 z-10",
                        "size-10 bg-red-800",
                        "border-4 border-red-600",
                        "shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]",
                        "hover:bg-red-700 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.8)]",
                        "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
                        "transition-all duration-100",
                        "flex items-center justify-center",
                        "text-white font-bold retro text-sm"
                    )}
                    aria-label="Fermer"
                >
                    X
                </button>

                {/* Header */}
                <div className="flex flex-col items-center gap-4 mb-6">
                    <h1 className="retro text-amber-500 text-lg tracking-widest">
                        PLANS DU MANOIR
                    </h1>
                    <FloorTitle floor={currentFloor} />
                </div>

                {/* Map content */}
                <div className="flex items-center gap-4">
                    <NavigationArrow
                        direction="left"
                        onClick={goToPreviousFloor}
                        disabled={currentFloor === 0 || isAnimating}
                    />

                    <div
                        className={cn(
                            "relative",
                            "border-4 border-stone-600",
                            "bg-stone-950",
                            "shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]",
                            "overflow-hidden",
                            isAnimating && "opacity-50"
                        )}
                    >
                        <div
                            className="absolute inset-0 pointer-events-none z-10"
                            style={{
                                background:
                                    "repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)",
                            }}
                        />

                        <MansionFloorPlan
                            floor={currentFloor}
                            customImages={customFloorImages}
                            width={planWidth}
                            height={planHeight}
                        />
                    </div>

                    <NavigationArrow
                        direction="right"
                        onClick={goToNextFloor}
                        disabled={currentFloor === TOTAL_FLOORS - 1 || isAnimating}
                    />
                </div>

                {/* Footer */}
                <div className="flex flex-col items-center gap-3 mt-6">
                    <div className="flex gap-2">
                        {Array.from({ length: TOTAL_FLOORS }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    if (!isAnimating) {
                                        setIsAnimating(true);
                                        setTimeout(() => {
                                            setCurrentFloor(index);
                                            setIsAnimating(false);
                                        }, 150);
                                    }
                                }}
                                className={cn(
                                    "size-4 border-2 transition-colors duration-100",
                                    currentFloor === index
                                        ? "bg-amber-500 border-amber-300"
                                        : "bg-stone-700 border-stone-500 hover:bg-stone-600"
                                )}
                                aria-label={`Aller a l'etage ${index}`}
                            />
                        ))}
                    </div>

                    <p className="retro text-stone-500 text-[8px] tracking-wide">
                        FLECHES POUR NAVIGUER - ESC POUR FERMER
                    </p>
                </div>
            </div>
        </div>
    );
}
