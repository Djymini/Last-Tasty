import {Item} from "@/domain/entities/Item";

export type PlayerType = {
    sessionNumber: string,
    location: string,
    inventory: Item[],
    idProgression: number,
    introductionIsViewed: boolean,
    postitIsViewed: boolean,
    diaryIsViewed: boolean,
    libraryIsOpen: boolean,
    gordonIsViewed: boolean,
}