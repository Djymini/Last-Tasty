"use client";
import { useEffect, useRef, useState } from "react";

export function useTimedOpen(timeoutMs = 2500) {
    const [open, setOpen] = useState<number | null>(null);
    const timeoutRef = useRef<number | null>(null);

    const show = (id: number) => {
        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setOpen(id);
        timeoutRef.current = window.setTimeout(() => {
            setOpen(null);
            timeoutRef.current = null;
        }, timeoutMs);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
        };
    }, []);

    return { open, setOpen, show };
}
