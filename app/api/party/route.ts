import { prisma } from "@/lib/prisma";
import {PartyRepository} from "@/infrastructure/repositories/PartyRepository";
import {Party} from "@/domain/entities/Party";

export async function GET(sessionNumber: number): Promise<Party | null> {
    const partyRepository = new PartyRepository();
    const response = partyRepository.findBySessionNumber(sessionNumber)
    return response;
}

export async function PUT(party: Party): Promise<Party | null> {
    const partyRepository = new PartyRepository();
    const response = partyRepository.create(party.sessionNumber)
    return party;
}