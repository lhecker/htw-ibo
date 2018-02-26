# htw-ibo

This project is the final work result for "Implementierung von Benutzeroberflächen" (IBO) at the HTW Dresden.

It contains a simple drawing web application twice - once implemented using React and once using Vue and is supposed to show possible advantages by employing immutable datastructures in your project (in this case using React and Immutable.js).

## Setup

```
yarn install
```

## Usage

```
yarn run (dev|dev-prod|build)
```

* `dev` will start a local development server at `localhost:8080` with hot-reload etc.
* `dev-prod` starts the same local server, but using production settings (**recommended for testing**). This is important in case of React, as its production performance is far far greater than its development performance.
* `build` will only build the project and put the resulting files in a folder called `dist`.

The resulting website defines two routes:

* `/vue` uses the Vue implementation.
* `/react` uses the React implementation.
