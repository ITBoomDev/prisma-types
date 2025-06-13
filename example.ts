import { PrismaClient } from '@prisma/client';
import {
    PrismaTableKey,
    PrismaTableArgs,
    PrismaTableResults,
    PrismaOpResult,
} from '@itboom/prisma-types';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Fix the model name statically
const tableKey: PrismaTableKey = 'user';

// Get all argument types for operations on this model
type UserArgs = PrismaTableArgs<typeof tableKey>;

// Get all result types for operations on this model (with default payload)
type UserResults = PrismaTableResults<typeof tableKey>;

// Prepare a payload for the 'findFirst' operation
const findFirstPayload: UserArgs['findFirst'] = {
    where: { email: 'example@example.com' },
    select: {
        id: true,
        name: true,
        posts: {
            select: {
                title: true,
                published: true
            },
        },
    },
};

// Infer the result type for 'findFirst' based on the payload
type UserFindFirstResult = PrismaOpResult<
    typeof tableKey,
    'findFirst',
    typeof findFirstPayload
>;

async function main() {
    const user: UserFindFirstResult = await prisma.user.findFirst(findFirstPayload);
    console.log('📦 Fetched user with posts:', user);
}

main()
    .catch((e) => {
        console.error('❌ Error during execution:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });