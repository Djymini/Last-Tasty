"use client"

import React from "react"

import { useState } from "react"
import { Package, X, Sword, Heart, Shield, Sparkles, Flame, Gem } from "lucide-react"
import { cn } from "@/lib/utils"
import {Item} from "@/domain/entities/Item";
import {usePlayerContext} from "@/app/contexts/PlayerContext";

interface InventoryBoardProps {
    items?: Item[]
    rows?: number
    cols?: number
}

export function InventoryBoard({
                                   rows = 4,
                                   cols = 6
                               }: InventoryBoardProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState<Item | null>(null)
    const context = usePlayerContext();


    const totalSlots = rows * cols
    const slots = Array.from({ length: totalSlots }, (_, i) => context.value.inventory[i] || null)

    return (
        <div className="relative">
            {/* Inventory Button with Backpack Image */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "relative cursor-pointer",
                    "size-20 bg-stone-800",
                    "border-4 border-stone-600",
                    "shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]",
                    "hover:bg-stone-700 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]",
                    "active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
                    "transition-all duration-100",
                    "flex items-center justify-center"
                )}
            >
                {/* 8-bit Backpack Icon */}
                <div className="relative">
                    <img src="/icons/backpack.png" alt="Image d'inventaire"/>
                </div>
            </button>

            {/* Inventory Board Panel */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
                    <div
                        className={cn(
                            "relative bg-stone-900 border-8 border-stone-700",
                            "shadow-[8px_8px_0px_0px_rgba(0,0,0,0.9)]",
                            "animate-in fade-in zoom-in-95 duration-200",
                            "max-w-[95vw] max-h-[95vh] overflow-auto"
                        )}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b-4 border-stone-700 bg-stone-800 px-4 py-3">
                            <h2 className="font-[family-name:var(--font-retro)] text-sm text-amber-400">
                                INVENTORY
                            </h2>
                            <button
                                onClick={() => { setIsOpen(false); setSelectedItem(null); }}
                                className={cn(
                                    "size-8 bg-red-700 border-2 border-red-900",
                                    "flex items-center justify-center",
                                    "hover:bg-red-600 active:bg-red-800",
                                    "transition-colors"
                                )}
                            >
                                <X className="size-4 text-white" />
                            </button>
                        </div>

                        {/* Inventory Grid */}
                        <div className="p-4">
                            <div
                                className="grid gap-2"
                                style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
                            >
                                {slots.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => item && setSelectedItem(item)}
                                        className={cn(
                                            "aspect-square size-16 bg-stone-950",
                                            "border-4 flex items-center justify-center",
                                            "transition-all duration-100",
                                            item ? [
                                                "cursor-pointer hover:scale-105 hover:brightness-125",
                                                selectedItem?.idItem === item.idItem && "ring-2 ring-white ring-offset-2 ring-offset-stone-900"
                                            ] : [
                                                "border-stone-700 cursor-default"
                                            ]
                                        )}
                                        disabled={!item}
                                    >
                                        {item ? (
                                            <div
                                                className={cn("text-stone-300")}>
                                                <img src={item.image} alt="Image d'inventaire"/>
                                            </div>
                                        ) : (
                                            <div className="size-4 border-2 border-dashed border-stone-700" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Selected Item Description Alert */}
                        {selectedItem && (
                            <div className="border-t-4 border-stone-700 bg-stone-800 p-4">
                                <div className={cn(
                                    "border-4 border-stone-600 bg-stone-950 p-4",
                                    "shadow-[inset_2px_2px_0px_0px_rgba(0,0,0,0.5)]"
                                )}>
                                    <div className="flex items-start gap-4">
                                        {/* Item Preview */}
                                        <div className={cn(
                                            "size-16 shrink-0 border-4 bg-stone-900 flex items-center justify-center"
                                        )}>
                                            <div>
                                                <img src={selectedItem.image} alt="Image d'inventaire"/>
                                            </div>
                                        </div>

                                        {/* Item Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-amber-400 font-[family-name:var(--font-retro)] text-xs">!</span>
                                                <h3 className={cn(
                                                    "font-[family-name:var(--font-retro)] text-xs truncate"
                                                )}>
                                                    {selectedItem.name}
                                                </h3>
                                            </div>
                                            <p className="font-[family-name:var(--font-retro)] text-[8px] leading-relaxed text-stone-400">
                                                {selectedItem.description}
                                            </p>
                                            <div className="mt-2">
                        <span className={cn(
                            "font-[family-name:var(--font-retro)] text-[8px] uppercase px-2 py-1 border-2",
                            "bg-stone-900"
                        )}>
                        </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Footer */}
                        <div className="border-t-4 border-stone-700 bg-stone-800 px-4 py-2 flex justify-between items-center">
              <span className="font-[family-name:var(--font-retro)] text-[8px] text-stone-500">
                {context.value.inventory.length}/{totalSlots} SLOTS
              </span>
                            <div className="flex gap-1">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="size-2 bg-amber-400" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
