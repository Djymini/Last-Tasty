import { prisma } from "@/lib/prisma";
import {Party} from "@/domain/entities/Party";
import {Item} from "@/domain/entities/Item";

export class PartyRepository {
    async create(sessionNumber: string): Promise<Party> {
        const party = await prisma.party.create({
            data: {
                session_number: sessionNumber,
                location: "hall",
            },
        });
        return {
            sessionNumber: party.session_number,
            location: party.location,
        } as Party;
    }

    async findBySessionNumber(sessionNumber: string): Promise<Party | null> {
        const party = await prisma.party.findUnique({
            where: { session_number: sessionNumber },
            include: {
                inventory: true,
                progression: true,
            },
        });

        if (!party) return null;

        return {
            sessionNumber: party.session_number,
            location: party.location,
        } as Party;
    }

    /*async getItemsOfParty(sessionNumber: number): Promise<Item[]> {
        const inventoryEntries = await prisma.inventory.findMany({
            where: { session_number: sessionNumber },
            include: { item: true },
        });

        return inventoryEntries.map(entry => entry.item);
    }*/

    async delete(sessionNumber: string): Promise<void> {
        await prisma.party.delete({
            where: { session_number: sessionNumber },
        });
    }
}
