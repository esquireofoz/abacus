# Abacus: Automattic's Experimentation Platform UI

## Getting started

Run `npm install` to install dependencies, then run one of the following commands:

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm start`: Runs the built app in production mode.

## Scripts

All the scripts for this project are initiated via npm scripts. Please see the `"scripts"` section in `package.json`.

### Linting

**lint**

Runs all the linters.

```sh
npm run lint
```

**lint:css**

Runs a linter on all the styling code.

```sh
npm run lint:css
```

**lint:css:fix**

Runs a linter on all the styling code and fixes issues that are fixable.

```sh
npm run lint:css:fix
```

**lint:js**

Runs a linter on all the JavaScript and TypeScript code including those with JSX.

```sh
npm run lint:js
```

**lint:js:fix**

Runs a linter on all the JavaScript and TypeScript code and fixes any found issues that are fixable.

```sh
npm run lint:js:fix
```

### Pre-Commit Hooks

Pre-commit hooks have been put in place via `husky` which will run the `precommit` NPM script. This script runs `lint-staged` but could be used to run different or more commands. The `lint-staged` command will run commands on only the staged files of the commit according to the configuration. The `lint-staged` configuration is in `package.json`.

### Testing

**test:unit**

Runs the unit tests with Jest.

The unit tests are found throughout the project excluding tests in the `__tests__` and `e2e` directory. (Tests in those directories are for integration and end-to-end tests.)

```sh
npm run test:unit
npm run test:unit -- --coverage
npm run test:unit -- --watch
```

## Setup

### Testing

The testing setup wasn't the easiest thing to figure out given that we want it to work with Jest, Next.js, TypeScript, Testing-Library, and React.

https://github.com/zeit/next.js/tree/canary/examples/with-jest shows a Next.js project using Jest and Testing-Library but not with TypeScript.

https://github.com/zeit/next.js/tree/canary/examples/with-typescript shows a Next.js project using TypeScript but nothing about testing.

https://www.pluralsight.com/guides/how-to-test-react-components-in-typescript helped but didn't exactly work with Next.js. One take-away was a simpler way of test setup files. The `setupFilesAfterEnv` in `jest.config.js` was the result.

https://medium.com/@kjaer/setting-up-jest-and-enzyme-for-typescript-next-js-apps-ce383167643 shows how with Next.js, Jest, TypeScript, and Enzyme. This is the closest I found and switching out Enzyme for React Testing-Library was simple enough. This guide explains why we have two TypeScript configuration files.
