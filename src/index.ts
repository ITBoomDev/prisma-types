/**
 * @packageDocumentation
 * @module @itboom/prisma-types
 *
 * This library provides helper types for working with Prisma Client operations,
 * allowing you to extract operation arguments and results for Prisma models.
 *
 * @example
 * import {
 *   TableKey,
 *   TableArgs,
 *   TableResults,
 * } from '@itboom/prisma-types';
 *
 * const tableKey: TableKey = "user";
 * type UserArgs = TableArgs<typeof tableKey>;
 * // By default, the payload is the operation arguments;
 * // to override it, supply a custom type as the second parameter.
 * type UserResults = TableResults<typeof tableKey>;
 * type CustomUserResults = TableResults<typeof tableKey, { foo: string }>;
 *
 * type UserFindFirstArgs = UserArgs['findFirst'];
 * type UserFindFirstResult = CustomUserResults['findFirst'];
 */

import { PrismaClient, type Prisma } from '@prisma/client';
import { type Operation } from '@prisma/client/runtime/library.js';

/**
 * The keys (model names) of Prisma Client tables.
 * (Derived from Prisma's internal type map.)
 */
export type TableKey = Prisma.TypeMap["meta"]["modelProps"];

/**
 * Given a table key, extract the corresponding model (table) from Prisma Client.
 */
type Table<T extends TableKey> = PrismaClient[T];

/**
 * Extract the model metadata from a Prisma table.
 */
type TableModel<T extends TableKey> = Table<T>[symbol];

/**
 * Extract the types associated with a Prisma table model.
 */
type TableTypes<T extends TableKey> = TableModel<T>["types"];

/**
 * Extract the available operation keys for a given table.
 */
type OpKey<T extends TableKey> = keyof TableTypes<T>["operations"] & Operation;

/**
 * Retrieve the argument types for a specific table operation.
 */
export type OpArgs<T extends TableKey, O extends OpKey<T>> = Prisma.Args<Table<T>, O>;

/**
 * Retrieve the result type for a specific table operation.
 *
 * The third parameter, P, represents the payload.
 * It defaults to the operation arguments if not overridden.
 */
export type OpResult<
    T extends TableKey,
    O extends OpKey<T>,
    P extends OpArgs<T, O> = OpArgs<T, O>
> = Prisma.Result<Table<T>, P, O>;


/**
 * Collection of argument types for all operations of a specific table.
 */
export type TableArgs<T extends TableKey> = {
    [O in OpKey<T>]: OpArgs<T, O>;
};

/**
 * Collection of result types for all operations of a specific table.
 *
 * The payload type can be optionally specified.
 * By default, the operation result uses its default arguments.
 *
 * Usage:
 * - TableResults<typeof tableKey> uses the default payload.
 * - TableResults<typeof tableKey, MyPayload> overrides the payload.
 */
export type TableResults<T extends TableKey, P = void> = {
    [O in OpKey<T>]: [P] extends [void]
    ? OpResult<T, O>
    : OpResult<T, O, P & OpArgs<T, O>>;
}