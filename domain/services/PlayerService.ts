import {PartyRepository} from "@/infrastructure/repositories/PartyRepository";
import {Party} from "@/domain/entities/Party";

export class PlayerService {
    private repository: PartyRepository;

    constructor() {
        this.repository = new PartyRepository();
    }

    async create() {
        const sessionNumber:string = this.createSessionCode();
        return this.repository.create(sessionNumber)
    }

    async find(sessionNumber:string): Promise<Party | null> {
        return this.repository.findBySessionNumber(sessionNumber);
    }

    private createSessionCode(): string{
        return Date.now().toString(36).replace(/[o,O,0]+/g, '-');
    }
}