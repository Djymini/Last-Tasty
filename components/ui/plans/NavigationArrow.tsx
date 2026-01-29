"use client";

import { cn } from "@/lib/utils";
import "@/components/ui/8bit/styles/retro.css";
import {ArrowLeftIcon, ArrowRightIcon} from "lucide-react";

interface NavigationArrowProps {
    direction: "left" | "right";
    onClick: () => void;
    disabled?: boolean;
    className?: string;
}

export function NavigationArrow({
                                    direction,
                                    onClick,
                                    disabled = false,
                                    className,
                                }: NavigationArrowProps) {
    const Icon = direction === "left" ? ArrowLeftIcon : ArrowRightIcon;

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "relative cursor-pointer",
                "size-14 bg-stone-800",
                "border-4 border-stone-600",
                "shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)]",
                "hover:bg-stone-700 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]",
                "active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
                "transition-all duration-100",
                "flex items-center justify-center",
                "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] disabled:hover:bg-stone-800",
                className
            )}
            aria-label={direction === "left" ? "Etage precedent" : "Etage suivant"}
        >
            <Icon size={32} className="text-amber-400" />
        </button>
    );
}
