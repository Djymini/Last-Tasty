import { prisma } from "@/lib/prisma";
import {PartyRepository} from "@/infrastructure/repositories/PartyRepository";
import {Party} from "@/domain/entities/Party";
import { NextResponse } from "next/server";
import {PartyService} from "@/domain/services/PartyService";

export const runtime = "nodejs";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const sessionNumber = String(searchParams.get("sessionNumber"));

    const partyService = new PartyService();
    const party = await partyService.find(sessionNumber);

    return NextResponse.json(party);
}

export async function POST(req: Request) {
    const body = await req.json();

    const partyService = new PartyService();
    const party = await partyService.create();

    return NextResponse.json(party);
}