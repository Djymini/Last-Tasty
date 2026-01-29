"use client";

interface PixelMapIconProps {
    size?: number;      // taille globale
    className?: string;
}

/**
 * Icône pixel-art représentant une carte / plans
 */
export function PixelMapIcon({ size = 32, className = "" }: PixelMapIconProps) {
    const px = Math.floor(size / 8); // taille d’un pixel

    return (
        <div
            className={"relative " + className}
            style={{
                width: size,
                height: size,
                imageRendering: "pixelated",
            }}
            aria-hidden="true"
        >
            {/* fond */}
            <div className="absolute inset-0 bg-stone-200 border-2 border-stone-800" />

            {/* pliures verticales */}
            <div
                className="absolute bg-stone-400"
                style={{ left: px * 3, top: px, width: px / 2, height: px * 6 }}
            />
            <div
                className="absolute bg-stone-400"
                style={{ left: px * 5, top: px, width: px / 2, height: px * 6 }}
            />

            {/* points / pièces */}
            <div className="absolute bg-red-600" style={{ left: px * 2, top: px * 3, width: px, height: px }} />
            <div className="absolute bg-blue-600" style={{ left: px * 4, top: px * 2, width: px, height: px }} />
            <div className="absolute bg-green-600" style={{ left: px * 6, top: px * 4, width: px, height: px }} />
        </div>
    );
}
