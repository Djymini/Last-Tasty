import { prisma } from "@/lib/prisma";
import {Inventory} from "@/domain/entities/Inventory";

export class InventoryRepository {
    async create(sessionNumber: number, idItem: number): Promise<Inventory> {
        return prisma.inventory.create({
            data: {
                session_number: sessionNumber,
                id_item: idItem,
            },
        });
    }

    async delete(sessionNumber: number): Promise<void> {
        await prisma.inventory.delete({
            where: { session_number: sessionNumber },
        });
    }
}