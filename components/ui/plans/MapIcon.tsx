"use client";

import { cn } from "@/lib/utils";

interface MapIconProps {
    className?: string;
    size?: number;
}

export function MapIcon({ className, size = 40 }: MapIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("pixelated", className)}
            style={{ imageRendering: "pixelated" }}
        >
            {/* Paper background */}
            <rect x="4" y="2" width="24" height="28" fill="#F5E6C8" />
            <rect x="6" y="4" width="20" height="24" fill="#E8D4A8" />

            {/* Rolled edges effect */}
            <rect x="4" y="2" width="2" height="28" fill="#D4C4A0" />
            <rect x="26" y="2" width="2" height="28" fill="#C4B490" />

            {/* Map grid lines */}
            <rect x="8" y="8" width="16" height="2" fill="#8B7355" />
            <rect x="8" y="14" width="16" height="2" fill="#8B7355" />
            <rect x="8" y="20" width="16" height="2" fill="#8B7355" />

            <rect x="10" y="6" width="2" height="18" fill="#8B7355" />
            <rect x="16" y="6" width="2" height="18" fill="#8B7355" />
            <rect x="22" y="6" width="2" height="18" fill="#8B7355" />

            {/* Room markers */}
            <rect x="11" y="9" width="4" height="4" fill="#6B4423" />
            <rect x="17" y="9" width="4" height="4" fill="#6B4423" />
            <rect x="11" y="15" width="4" height="4" fill="#6B4423" />
            <rect x="17" y="15" width="4" height="4" fill="#6B4423" />

            {/* X marks */}
            <rect x="12" y="10" width="2" height="2" fill="#C41E3A" />
            <rect x="18" y="16" width="2" height="2" fill="#C41E3A" />

            {/* Compass indicator */}
            <rect x="20" y="22" width="4" height="4" fill="#2F4F4F" />
            <rect x="21" y="21" width="2" height="2" fill="#C41E3A" />
        </svg>
    );
}
