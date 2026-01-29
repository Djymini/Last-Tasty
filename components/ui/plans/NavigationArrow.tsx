"use client";

import React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "./ArrowIcons";

type Props = {
    direction: "left" | "right";
    onClick: () => void;
    disabled?: boolean;
};

export function NavigationArrow({ direction, onClick, disabled }: Props) {
    const Icon = direction === "left" ? ArrowLeftIcon : ArrowRightIcon;

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            aria-label={direction === "left" ? "Previous floor" : "Next floor"}
            className={
                "h-14 w-14 border-4 border-stone-600 bg-stone-800 " +
                "shadow-[4px_4px_0px_0px_rgba(0,0,0,0.85)] " +
                "hover:bg-stone-700 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.85)] " +
                "active:translate-x-[3px] active:translate-y-[3px] active:shadow-none " +
                "transition-all duration-100 " +
                "disabled:opacity-40 disabled:hover:translate-x-0 disabled:hover:translate-y-0 " +
                "flex items-center justify-center text-stone-100"
            }
        >
            <Icon size={26} />
        </button>
    );
}
