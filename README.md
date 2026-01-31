# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Project-specific notes

- The app communicates with a backend API. When running the backend locally, set the API base URL in `src/config/api.ts` to your machine's IPv4 address (not `localhost`). Example:

```js
export const API_CONFIG = { BASE_URL: 'http://192.168.1.100:8000/api' };
```

- Use `ipconfig` (Windows) or `ifconfig` (Mac/Linux) to find your machine's IPv4 address and replace the example above.

## Testing

Unit tests are configured with Jest and use the `jest-expo` preset.

- Run unit tests:

```bash
npm test
```

- Run tests with coverage (coverage thresholds set to 70%):

```bash
npm run test:coverage
```

- Integration tests (templates provided):

```bash
npm run test:integration
```

If `npm install` fails with peer dependency resolution errors (common when React versions mismatch with some test libraries), either run:

```bash
npm install --legacy-peer-deps
```

or use the project-default behavior (this repo includes a `.npmrc` that enables `legacy-peer-deps`), then run `npm install` again.

## Integration & E2E

- This repo contains scaffolding for integration and E2E tests. We recommend using Detox for native e2e or Playwright for web. See `e2e/README.md` for guidance on setting up Detox.

## API docs

- A minimal API reference is available at `docs/API.md`. For production-grade documentation, keep an OpenAPI/Swagger spec in the backend and export it here.

