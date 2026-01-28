import { prisma } from "@/lib/prisma";
import {Party} from "@/domain/entities/Party";
import {Item} from "@/domain/entities/Item";

export class PartyRepository {
    async create(sessionNumber: number): Promise<Party> {
        return prisma.party.create({
            data: {
                session_number: sessionNumber,
                id_location: "hall",
            },
        });
    }

    async findBySessionNumber(sessionNumber: number): Promise<Party | null> {
        return prisma.party.findUnique({
            where: { session_number: sessionNumber },
            include: {
                inventory: true,
                progression: true,
            },
        });
    }

    async getItemsOfParty(sessionNumber: number): Promise<Item[]> {
        const inventoryEntries:Item[] = await prisma.inventory.findMany({
            where: { session_number: sessionNumber },
            include: {
                item: true,
            },
        });

        return inventoryEntries;
    }


    async delete(sessionNumber: number): Promise<void> {
        await prisma.party.delete({
            where: { session_number: sessionNumber },
        });
    }
}