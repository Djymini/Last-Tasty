"use client";

type ArrowIconProps = { className?: string; size?: number };

export function ArrowLeftIcon({ className = "", size = 24 }: ArrowIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className={"pixelated " + className}
            style={{ imageRendering: "pixelated" }}
            aria-hidden="true"
        >
            <rect x="10" y="11" width="2" height="2" />
            <rect x="8" y="9" width="2" height="2" />
            <rect x="8" y="13" width="2" height="2" />
            <rect x="6" y="7" width="2" height="2" />
            <rect x="6" y="15" width="2" height="2" />
            <rect x="4" y="11" width="2" height="2" />
            <rect x="12" y="11" width="8" height="2" />
        </svg>
    );
}

export function ArrowRightIcon({ className = "", size = 24 }: ArrowIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className={"pixelated " + className}
            style={{ imageRendering: "pixelated" }}
            aria-hidden="true"
        >
            <rect x="12" y="11" width="2" height="2" />
            <rect x="14" y="9" width="2" height="2" />
            <rect x="14" y="13" width="2" height="2" />
            <rect x="16" y="7" width="2" height="2" />
            <rect x="16" y="15" width="2" height="2" />
            <rect x="18" y="11" width="2" height="2" />
            <rect x="4" y="11" width="8" height="2" />
        </svg>
    );
}
