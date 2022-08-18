const { signalsByName } = require('@esm2cjs/human-signals');
const assert = require("assert");

assert(signalsByName.SIGINT.name === 'SIGINT');
