# QA Bootcamp - Week 2

## Run the Playwright suite

You need Node.js 20 or newer. From the repository root:

1. Install the dependencies and Chromium:

   ```sh
   npm install
   npx playwright install chromium
   ```

2. Copy `.env.example` to `.env` (`Copy-Item .env.example .env` in PowerShell, or `cp .env.example .env` on macOS/Linux).

3. Run the full suite:

   ```sh
   npm test
   ```

The suite includes homepage, login, and search UI checks, a catalogue page object test, and two API tests. Set `BASE_URL` or `API_URL` in `.env` to point the tests at another environment.

## Day 6: TypeScript basics and profile validator

The examples in `src/ts-basics/` cover typed variables, functions and default
parameters, objects with readonly properties, type aliases, tuples, union types
with type narrowing, and optional chaining for missing values.

`src/profile-validator.ts` defines a `UserProfile` type and an `isNotified`
function. It uses optional chaining (`?.`) and nullish coalescing (`??`) to read
the notification setting safely, defaulting to `false` when settings or the
notification flag are missing. Four profiles cover enabled notifications,
missing settings, empty settings, and explicitly disabled notifications.

To run the TypeScript examples with Node.js:

```sh
node --experimental-strip-types src/ts-basics/optional-chaining.ts
node --experimental-strip-types src/profile-validator.ts
```

The optional-chaining example prints `undefined`, `2000`, and `undefined`.
The profile example prints `true`, `false`, `false`, and `false`.
