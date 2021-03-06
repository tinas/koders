# koders
Mobile version of kodilan.com built with erste.js

<img width="1295" alt="koders" src="https://user-images.githubusercontent.com/61799852/125201918-dce75380-e279-11eb-9478-c6a7f13e4bd4.jpg">

## Set up
Clone and setup the repository:

```bash
git clone git@github.com:tinas/koders.git
cd koders
npm i
```

## Running development server
koders comes with a webpack dev server.

Run:

```bash
npm start
```

to start the development server on `http://localhost:9000`. It also supports live-reload when source files change under `src` directory.

## Building for production

Run:

```
npm run build
```

This will put a static build under the `www` directory.

## Running in Cordova
Make sure you have cordova installed globally:
```bash
npm i -g cordova
```

Then for iOS, run:

```bash
cordova platform add ios
cordova run ios
```

Provided that you have XCode installed properly, this will start the iOS simulator installed with your app. Cordova builds use production build configuration and copy and use the contents of the `www` directory.

## Linting
koders comes with a pre-configured ESLint.

Run:
```bash
npm run lint
```

to check for errors and run:

```bash
npm run lint-fix
```

to automatically fix stylistic errors.
