"use client";

export type FloorPlanImage = { src: string; alt: string };

type Props = {
    floor: number;
    customImages: FloorPlanImage[];
    width: number;
    height: number;
};

export function MansionFloorPlan({ floor, customImages, width, height }: Props) {
    const img = customImages[floor];

    return (
        <div style={{ width, height }} className="flex items-center justify-center">
            {img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={img.src}
                    alt={img.alt}
                    width={width}
                    height={height}
                    className="block object-contain pixelated"
                    style={{ imageRendering: "pixelated" }}
                />
            ) : (
                <span className="retro text-stone-400 text-[10px]">No map</span>
            )}
        </div>
    );
}
