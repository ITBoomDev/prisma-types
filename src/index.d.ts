/**
 * @packageDocumentation
 * @module @itboom/prisma-types
 *
 * This library provides helper types for working with Prisma Client operations,
 * allowing you to extract operation arguments and results for Prisma models.
 *
 * @example
 * import {
 *   PrismaTableKey,
 *   PrismaTableArgs,
 *   PrismaTableResults,
 * } from '@itboom/prisma-types';
 *
 * const key: PrismaTableKey = "user";
 * type Args = PrismaTableArgs<typeof key>;
 * type Results = PrismaTableResults<typeof key>;
 * type FindFirstArgs = Args['findFirst'];
 * type FindFirstResult = Results['findFirst'];
 */

import type { PrismaClient, Prisma } from '@prisma/client';
import type { Operation } from '@prisma/client/runtime/library.js';

/**
 * The keys (model names) of Prisma Client tables.
 */
export type PrismaTableKey = Prisma.TypeMap['meta']['modelProps'];

/**
 * Given a table key, extract the corresponding model from Prisma Client.
 */
type PrismaTable<T extends PrismaTableKey> = PrismaClient[T];

/**
 * Extract the model metadata from a Prisma table.
 */
type PrismaTableModel<T extends PrismaTableKey> = PrismaTable<T>[symbol];

/**
 * Extract the type structure associated with a model.
 */
type PrismaTableTypes<T extends PrismaTableKey> = PrismaTableModel<T>['types'];

/**
 * Extract the valid operation keys for a given model.
 */
type PrismaOpKey<T extends PrismaTableKey> = keyof PrismaTableTypes<T>['operations'] & Operation;

/**
 * Arguments for a specific operation.
 */
export type PrismaOpArgs<
    T extends PrismaTableKey,
    O extends PrismaOpKey<T>
> = Prisma.Args<PrismaTable<T>, O>;

/**
 * Result for a specific operation.
 */
export type PrismaOpResult<
    T extends PrismaTableKey,
    O extends PrismaOpKey<T>,
    P extends PrismaOpArgs<T, O> = PrismaOpArgs<T, O>
> = Prisma.Result<PrismaTable<T>, P, O>;

/**
 * All arguments for all operations on a model.
 */
export type PrismaTableArgs<T extends PrismaTableKey> = {
    [O in PrismaOpKey<T>]: PrismaOpArgs<T, O>;
};

/**
 * All results for all operations on a model.
 */
export type PrismaTableResults<T extends PrismaTableKey, P = void> = {
    [O in PrismaOpKey<T>]: [P] extends [void]
    ? PrismaOpResult<T, O>
    : PrismaOpResult<T, O, P & PrismaOpArgs<T, O>>;
};