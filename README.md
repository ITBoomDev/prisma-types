# @itboom/prisma-types 🚀

**@itboom/prisma-types** is a helper TypeScript types library for working with
Prisma Client operations. It allows you to easily extract operation arguments
and results for Prisma models (tables), and even customize payload types when
needed.

> ❗️**NOTICE (v1.1.0+)**\
> All exported types now start with a **`Prisma`** prefix for clarity and
> future-proofing.\
> Example: `TableArgs` → `PrismaTableArgs`, `OpResult` → `PrismaOpResult`, etc.

---

## Table of Contents

1. [Features ✨](#features)
2. [Installation 📦](#installation)
3. [Usage 🔧](#usage)
   - [Basic Example](#basic-example)
   - [Custom Payload Example](#custom-payload-example)
4. [API Reference 📚](#api-reference)
5. [Documentation 📝](#documentation)
6. [License 📄](#license)
7. [Contributing 🤝](#contributing)
8. [Contact 📬](#contact)

---

## Features ✨

- 🔍 **Extract Operation Arguments & Results:** Easily obtain type definitions
  for operations such as `findFirst`, `update`, `upsert`, etc.
- 🧩 **Customizable Payloads:** "Fix" a table (model) name first and later
  provide a custom payload type via generics.
- 🔌 **Seamless Integration:** Works directly with your generated Prisma Client
  types.\
  _Note:_ Ensure you have run `prisma generate` to have all required types
  available.

---

## Installation 📦

### Using npm

```bash
npm install @itboom/prisma-types
```

### Using Bun

```bash
bun add @itboom/prisma-types
```

> _Note:_ Make sure you have `@prisma/client` installed and that you've run
> `prisma generate`.

---

## Usage 🔧

### Basic Example

```ts
import {
  PrismaTableArgs,
  PrismaTableKey,
  PrismaTableResults,
} from "@itboom/prisma-types";

const tableKey: PrismaTableKey = "user";

// Get all operation argument types for the "user" table
type UserArgs = PrismaTableArgs<typeof tableKey>;

// Get all operation result types for the "user" table
type UserResults = PrismaTableResults<typeof tableKey>;

// Example: Types for the "findFirst" operation
type UserFindFirstArgs = UserArgs["findFirst"];
type UserFindFirstResult = UserResults["findFirst"];

// Usage in code:
const payload: UserFindFirstArgs = {
  where: { id: 1 },
  include: { posts: true },
};

const result: UserFindFirstResult = await prisma.user.findFirst(payload);
```

---

### Custom Payload Example

```ts
import { PrismaTableKey, PrismaTableResults } from "@itboom/prisma-types";

const tableKey: PrismaTableKey = "user";

// Define a custom payload interface
interface MyPayload {
  customField: string;
}

// Override the default payload for operation results
type CustomUserResults = PrismaTableResults<typeof tableKey, MyPayload>;

// Now, for example, the "update" operation will use your custom payload
const customResult: CustomUserResults["update"] = await prisma.user.update({
  where: { id: 1 },
  data: { name: "New Name" },
});
```

---

## API Reference 📚

### Types

| Type                       | Description                                                                   |
| -------------------------- | ----------------------------------------------------------------------------- |
| `PrismaTableKey`           | Available Prisma model names, from `Prisma.TypeMap`.                          |
| `PrismaTableArgs<T>`       | Argument types for all operations on table `T`.                               |
| `PrismaTableResults<T, P>` | Result types for all operations on table `T`, with optional payload override. |
| `PrismaOpArgs<T, O>`       | Arguments for operation `O` on table `T`.                                     |
| `PrismaOpResult<T, O, P>`  | Result for operation `O` on table `T` using payload `P`.                      |

---

## Documentation 📝

To generate detailed documentation using [TypeDoc](https://typedoc.org/), run:

```bash
npx typedoc --out docs src
```

This will create an HTML documentation site in the `docs/` folder.

---

## License 📄

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE)
file for details.

---

## Contributing 🤝

Contributions are welcome!\
Please open an issue or submit a PR to improve type inference, extend features,
or fix bugs.

---

## Contact 📬

For questions or further information, please contact:

**📨 itboom.dev@gmail.com**

---

Enjoy using **@itboom/prisma-types** and happy coding! 🎉