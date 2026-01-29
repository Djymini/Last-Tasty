import { prisma } from "@/lib/prisma";
import {Progression} from "@/domain/entities/Progression";

export class ProgressionRepository {
    async create(): Promise<Progression> {
        return prisma.progression.create({
            data: {
                introduction_is_Viewed: false,
                postit_is_viewed: false,
                diary_is_viewed: false,
                library_is_open: false,
                gordon_is_viewed: false,
            },
        });
    }

    async update(progression: Progression): Promise<Progression> {
        return prisma.progression.update({
            data: {
                introduction_is_viewed: progression.introductionIsViewed,
                postit_is_viewed: progression.postitIsViewed,
                diary_is_viewed: progression.diaryIsViewed,
                library_is_open: progression.libraryIsOpen,
                gordon_is_viewed: progression.gordonIsViewed,
            }
        })
    }

    async delete(idProgression: number): Promise<void> {
        await prisma.progression.delete({
            where: { id_progression: idProgression },
        });
    }
}