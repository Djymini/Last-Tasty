"use client"

import { useState } from "react"
import { Package } from "lucide-react"
import { cn } from "@/lib/utils"

interface InventoryItemProps {
    name: string
    description: string
    imageUrl?: string
    rarity?: "common" | "uncommon" | "rare" | "epic" | "legendary"
}

const rarityColors = {
    common: "border-stone-400 bg-stone-900",
    uncommon: "border-green-500 bg-green-950",
    rare: "border-blue-500 bg-blue-950",
    epic: "border-purple-500 bg-purple-950",
    legendary: "border-amber-400 bg-amber-950",
}

const rarityTextColors = {
    common: "text-stone-300",
    uncommon: "text-green-400",
    rare: "text-blue-400",
    epic: "text-purple-400",
    legendary: "text-amber-400",
}

export function InventoryItem({
                                  name,
                                  description,
                                  imageUrl,
                                  rarity = "common",
                              }: InventoryItemProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="flex flex-col items-center gap-4">
            {/* 8-bit Style Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "relative cursor-pointer font-[family-name:var(--font-retro)] text-xs",
                    "bg-stone-800 text-stone-100 px-4 py-3",
                    "border-4 border-stone-600",
                    "shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]",
                    "hover:bg-stone-700 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]",
                    "active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
                    "transition-all duration-100"
                )}
            >
                {isOpen ? "CLOSE" : "OPEN"} ITEM
            </button>

            {/* Item Card */}
            {isOpen && (
                <div
                    className={cn(
                        "w-64 p-0 animate-in fade-in zoom-in-95 duration-200",
                        "border-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.9)]",
                        rarityColors[rarity]
                    )}
                >
                    {/* Card Header */}
                    <div className="border-b-4 border-stone-700 bg-stone-800 px-3 py-2">
                        <h3
                            className={cn(
                                "font-[family-name:var(--font-retro)] text-[10px] leading-relaxed truncate",
                                rarityTextColors[rarity]
                            )}
                        >
                            {name}
                        </h3>
                    </div>

                    {/* Square Image Container */}
                    <div className="p-4">
                        <div
                            className={cn(
                                "aspect-square w-full border-4 border-stone-600 bg-stone-950",
                                "flex items-center justify-center overflow-hidden"
                            )}
                            style={{ imageRendering: "pixelated" }}
                        >
                            {imageUrl ? (
                                <img
                                    src={imageUrl || "/placeholder.svg"}
                                    alt={name}
                                    className="size-full object-cover"
                                    style={{ imageRendering: "pixelated" }}
                                />
                            ) : (
                                <Package className="size-16 text-stone-600" strokeWidth={1.5} />
                            )}
                        </div>
                    </div>

                    {/* 8-bit Alert/Description Box */}
                    <div className="px-4 pb-4">
                        <div
                            className={cn(
                                "border-4 border-stone-600 bg-stone-950 p-3",
                                "shadow-[inset_2px_2px_0px_0px_rgba(0,0,0,0.5)]"
                            )}
                        >
                            <div className="flex items-start gap-2">
                <span className="text-amber-400 font-[family-name:var(--font-retro)] text-[8px]">
                  !
                </span>
                                <p className="font-[family-name:var(--font-retro)] text-[8px] leading-relaxed text-stone-300">
                                    {description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Rarity Badge */}
                    <div className="border-t-4 border-stone-700 bg-stone-800 px-3 py-2">
            <span
                className={cn(
                    "font-[family-name:var(--font-retro)] text-[8px] uppercase",
                    rarityTextColors[rarity]
                )}
            >
              {rarity}
            </span>
                    </div>
                </div>
            )}
        </div>
    )
}
