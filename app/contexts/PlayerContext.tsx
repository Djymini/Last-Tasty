"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import {PlayerType} from "@/app/types/PlayerType";

interface PlayerContextType {
    value: PlayerType;
    setValue: (val: PlayerType) => void;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

interface PlayerProviderProps {
    children: ReactNode;
}

export const PlayerProvider = ({ children }: PlayerProviderProps) => {
    const [value, setValue] = useState<PlayerType>({
        sessionNumber: "",
        location: "",
        inventory: [],
        idProgression: 0,
        introductionIsViewed: false,
        postitIsViewed: false,
        diaryIsViewed: false,
        libraryIsOpen: false,
        gordonIsViewed: false,
    });

    return (
        <PlayerContext.Provider value={{ value, setValue }}>
            {children}
        </PlayerContext.Provider>
);
};

export const usePlayerContext = () => {
    const context = useContext(PlayerContext);
    if (!context) {
        throw new Error("usePlayerContext doit être utilisé à l'intérieur de PlayerProvider");
    }
    return context;
};
