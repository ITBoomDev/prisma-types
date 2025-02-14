import { PrismaClient } from '@prisma/client';
import { TableKey, TableArgs, OpResult } from './dist';

const prisma = new PrismaClient();

const tableKey: TableKey = "user";
type UserArgs = TableArgs<typeof tableKey>;

// Create a payload for the findFirst operation.
const findFirstPayload = {
    where: { email: "example@example.com" },
    select: { posts: true },
} satisfies UserArgs['findFirst']

type UserFindFirstResult = OpResult<typeof tableKey, "findFirst", typeof findFirstPayload>;

const user: UserFindFirstResult = await prisma.user.findFirst(findFirstPayload);
console.log("findFirst result:", user);