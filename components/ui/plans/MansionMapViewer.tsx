"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import "@/components/ui/8bit/styles/retro.css";
import { FloorPlanImage, MansionFloorPlan } from "@/components/ui/plans/MansionFloorPlan";
import { NavigationArrow } from "@/components/ui/plans/NavigationArrow";
import { FloorTitle } from "@/components/ui/plans/FloorTitle";

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
                                     planWidth = 900,
                                     planHeight = 600,
                                 }: MansionMapViewerProps) {
    const TOTAL_FLOORS = useMemo(() => {
        return customFloorImages?.length || totalFloors;
    }, [customFloorImages, totalFloors]);

    const [currentFloor, setCurrentFloor] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

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
    }, [currentFloor, isAnimating, TOTAL_FLOORS]);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            } else if (e.key === "ArrowLeft") {
                goToPreviousFloor();
            } else if (e.key === "ArrowRight") {
                goToNextFloor();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose, goToPreviousFloor, goToNextFloor]);

    useEffect(() => {
        if (isOpen) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setCurrentFloor(0);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className={cn(
                "fixed inset-0 z-50 flex items-center justify-center",
                "bg-black/80 backdrop-blur-sm",
                className
            )}
            onClick={onClose}
        >
            <div
                className={cn(
                    "relative",
                    "bg-stone-900",
                    "border-8 border-stone-700",
                    "shadow-[8px_8px_0px_0px_rgba(0,0,0,0.9)]",
                    "p-6",
                    "animate-in fade-in zoom-in-95 duration-200",
                    "w-[min(1100px,92vw)]"
                )}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="absolute -top-2 -left-2 w-4 h-4 bg-amber-600" />
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-amber-600" />
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-amber-600" />
                <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-amber-600" />

                <button
                    onClick={onClose}
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

                <div className="flex flex-col items-center gap-4 mb-6">
                    <h1 className="retro text-amber-500 text-lg tracking-widest">PLANS DU MANOIR</h1>
                    <FloorTitle floor={currentFloor} />
                </div>

                <div className="flex items-center justify-center gap-4 w-full">
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
                        style={{
                            width: `min(${planWidth}px, 80vw)`,
                            height: `min(${planHeight}px, 55vh)`,
                        }}
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
                            className="w-full h-full"
                        />

                    </div>

                    <NavigationArrow
                        direction="right"
                        onClick={goToNextFloor}
                        disabled={currentFloor === TOTAL_FLOORS - 1 || isAnimating}
                    />
                </div>

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
                </div>
            </div>
        </div>
    );
}
