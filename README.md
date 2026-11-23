# QA Bootcamp - Week 2

## Day 6: TypeScript basics and profile validator

The examples in `src/ts-basics/` cover typed variables, functions and default
parameters, objects with readonly properties, type aliases, tuples, union types
with type narrowing, and optional chaining for missing values.

`src/profile-validator.ts` defines a `UserProfile` type and an `isNotified`
function. It uses optional chaining (`?.`) and nullish coalescing (`??`) to read
the notification setting safely, defaulting to `false` when settings or the
notification flag are missing. Three sample profiles demonstrate these cases.

### How to check

With Node.js 22.13 or later, run an example from the repository root:

```sh
node --experimental-strip-types src/ts-basics/optional-chaining.ts
node --experimental-strip-types src/profile-validator.ts
```

The optional-chaining example prints `undefined`, `2000`, and `undefined`.
The profile example prints notification results of `true`, `false`, and `false`.
Use the same command with any other file in `src/ts-basics/` to run that example.
Node strips the TypeScript annotations for execution; these commands do not
perform static type checking.
