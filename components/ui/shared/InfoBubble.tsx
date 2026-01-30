"use client";

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/8bit/alert";

type InfoBubbleProps = {
    top?: string;
    left?: string;
    width?: string;
    title: string;
    description: string;
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
};

export function InfoBubble({
                               top = "16px",
                               left = "16px",
                               width = "220px",
                               title,
                               description,
                               children,
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
                <AlertTitle className="!block !whitespace-normal !mb-2">
                    {title}
                </AlertTitle>

                <AlertDescription className="!block !whitespace-normal">
                    {description}
                </AlertDescription>

                {children}
            </Alert>
        </div>
    );
}
