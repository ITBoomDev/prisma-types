@itboom/prisma-types 🚀
=======================

**@itboom/prisma-types** is a helper TypeScript types library for working with Prisma Client operations. It allows you to easily extract operation arguments and results for Prisma models (tables), and even customize payload types when needed.

Table of Contents
-----------------

1.  [Features ✨](#features)
2.  [Installation 📦](#installation)
3.  [Usage 🔧](#usage)
    *   [Basic Example](#basic-example)
    *   [Custom Payload Example](#custom-payload-example)
4.  [API Reference 📚](#api-reference)
5.  [Documentation 📝](#documentation)
6.  [License 📄](#license)
7.  [Contributing 🤝](#contributing)
8.  [Contact 📬](#contact)

Features ✨
----------

*   **Extract Operation Arguments & Results:** Easily obtain type definitions for operations such as `findFirst`, `update`, `upsert`, etc.
*   **Customizable Payloads:** "Fix" a table (model) name first and later provide a custom payload type via generics.
*   **Seamless Integration:** Works directly with your generated Prisma Client types. _Note:_ Ensure you have run `prisma generate` to have all required types available.

Installation 📦
---------------

### Using npm

    npm install @itboom/prisma-types

### Using Bun

    bun add @itboom/prisma-types

_Note:_ Make sure you have `@prisma/client` installed and that you've run `prisma generate`.

Usage 🔧
--------

### Basic Example

    import {
      TableKey,
      TableArgs,
      TableResults,
    } from '@itboom/prisma-types';
    
    const tableKey: TableKey = "user";
    
    // Retrieve the operation argument types for the "user" table
    type UserArgs = TableArgs<typeof tableKey>;
    
    // Retrieve the operation result types for the "user" table with the default payload
    type UserResults = TableResults<typeof tableKey>;
    
    // Example: Extract types for the "findFirst" operation
    type UserFindFirstArgs = UserArgs['findFirst'];
    type UserFindFirstResult = UserResults['findFirst'];
    
    // Usage in code:
    const payload: UserFindFirstArgs = {
      where: { id: 1 },
      include: { posts: true },
    };
    
    const result: UserFindFirstResult = await prisma.user.findFirst(payload);
    

### Custom Payload Example

    import { TableKey, TableResults } from '@itboom/prisma-types';
    
    const tableKey: TableKey = "user";
    
    // Define a custom payload interface
    interface MyPayload {
      customField: string;
    }
    
    // Override the default payload for operation results
    type CustomUserResults = TableResults<typeof tableKey, MyPayload>;
    
    // Now, for example, the "update" operation will have MyPayload as the payload type:
    const customResult: CustomUserResults['update'] = await prisma.user.update({
      where: { id: 1 },
      data: { name: 'New Name' }
    });
    

API Reference 📚
----------------

### Types

*   **TableKey:** Represents the available Prisma model names (tables), derived from `Prisma.TypeMap`.
*   **TableArgs<T>:** A collection of argument types for all operations of a specific table `T`.
*   **TableResults<T, P = void>:** A collection of result types for all operations of table `T`. The second parameter `P` allows you to override the default payload. If omitted, the default payload is used.
*   **OpArgs<T, O>:** Operation arguments for a specific operation `O` of table `T`.
*   **OpResult<T, O, P>:** Operation result type for a specific operation `O` of table `T` with payload type `P`.

Documentation 📝
----------------

To generate detailed documentation using [TypeDoc](https://typedoc.org/), run:

    npx typedoc --out docs src

This will create an HTML documentation site in the `docs` folder that covers all exported types and their usage.

License 📄
----------

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

Contributing 🤝
---------------

Contributions are welcome! If you have suggestions, improvements, or bug fixes, please open an issue or submit a pull request.

Contact 📬
----------

For questions or further information, please contact: [your-email@example.com](mailto:your-email@example.com)

* * *

Enjoy using **@itboom/prisma-types** and happy coding! 🎉