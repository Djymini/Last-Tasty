import { prisma } from "@/lib/prisma";
import {Inventory} from "@/domain/entities/Inventory";

export class ItemRepository {
    async create(nameItem: string, imageUrl:string): Promise<Inventory> {
        return prisma.item.create({
            data: {
                name: nameItem,
                image_url: imageUrl,
            },
        });
    }

    async delete(sessionNumber: number): Promise<void> {
        await prisma.item.delete({
            where: { session_number: sessionNumber },
        });
    }
}