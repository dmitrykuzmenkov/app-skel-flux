Flux Application Skeleton
======
Skeleton for build single-page javascript powered application with flux paradigm

## Installation

Clone skeleton from git and remove git folder
```bash
git clone git@github.com:dmitrykuzmenkov/app-skel-flux.git app
rm -fr app/.git
cd app
npm install
```

## Usage

After installation npm dependencies just start webpack-dev-server

```bash
npm run dev
```

Open in your browser (http://localhost:8080/webpack-dev-server/) and develop with live reload


## Build

To build distribution to deploy use build command

```
npm run build
```

## Philosophy

1. Everything is decomposited into components.
2. Components are in component folder.
3. Each component have in own directory main initialization module with same name as folder, less styles, jext template and other staff.
4. Components must be fully independed of each other.
5. Each component releases only small function and be as simple as possible.
6. Use separated presenter to union template and data in the controller.
7. Components do not know about each other.
8. Component can listen for event using dispatcher and do useful staff to change own state.
9. Removing component must leave system to be stable.
