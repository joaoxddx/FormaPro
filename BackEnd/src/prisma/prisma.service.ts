import { Injectable } from '@nestjs/common';
//import {PrismaClient} from "@prisma/client/extension";
import { PrismaClient } from '../generated/prisma/client';
import {PrismaPg} from "@prisma/adapter-pg";

@Injectable()
export class PrismaService extends PrismaClient{
    constructor() {
        const databaseUrl = process.env.DATABASE_URL;
        if(!databaseUrl) throw new Error("Conexão de banco não configurado");
        const adapter = new PrismaPg({ connectionString: databaseUrl });
        super({adapter});
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
