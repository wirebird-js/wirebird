# Wirebird

HTTP requests debugger for Node.js.
Use Wirebird to inspect requests your Node.js application makes.

It's very similar to Chrome DevTools, but for Node.js.

## Installation

In order to sniff outgoing HTTP traffic from your Node.js application,
you have to install `wirebird-client` and attach it to the inspected process.

In order to view the requests you need to install `wirebird` globally and run it.

### Install Wirebird globally

```sh
npm i -g wirebird
```

### Add wirebird-client to your project

```sh
npm i -D wirebird-client
```

Now it's time to attach `wirebird-client`.
For example, if your project used to be run by the following command:

```
npm run dev
```

, now you need to replace it with:

```
NODE_OPTIONS="-r wirebird-client/inject" WIREBIRD=ui npm run dev
```

## Usage

To start Wirebird, run:

```sh
wirebird
```

You can change the default port:

```sh
wirebird --port 3000
# or:
wirebird -p 3000
```

Also if you dont need to start browser automatically, you can disable it:

```sh
wirebird --headless
# or:
wirebird -H
```
