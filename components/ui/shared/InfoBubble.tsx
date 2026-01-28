"use client";

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/8bit/alert";

type InfoBubbleProps = {
    top?: string;
    left?: string;
    width?: string;
    title: string;
    description: string;
    className?: string;
    style?: React.CSSProperties;
};

export function InfoBubble({
                               top = "16px",
                               left = "16px",
                               width = "220px",
                               title,
                               description,
                               className,
                               style,
                           }: InfoBubbleProps) {
    return (
        <div
            className={className}
            style={{
                position: "absolute",
                top,
                left,
                width,
                zIndex: 10,
                ...style,
            }}
        >
            <Alert className="w-full">
                <AlertTitle
                    className="!block !whitespace-normal !overflow-visible !text-clip !break-words !leading-[1.3] !mb-2"
                >
                    {title}
                </AlertTitle>

                <AlertDescription className="!block !whitespace-normal !break-words !leading-[1.35]">
                    {description}
                </AlertDescription>
            </Alert>
        </div>
    );
}
