# @esm2cjs/strip-final-newline

This is a fork of https://github.com/ehmicky/human-signals, but automatically patched to support ESM **and** CommonJS, unlike the original repository.

## Install

Use an npm alias to install this package under the original name:
```
npm i human-signals@npm:@esm2cjs/human-signals
```

```jsonc
// package.json
"dependencies": {
    "human-signals": "npm:@esm2cjs/human-signals@^4.2.0"
}
```

## Usage

```js
// Using ESM import syntax
import { signalsByName, signalsByNumber } from "human-signals";

// Using CommonJS require()
const { signalsByName, signalsByNumber } = require("human-signals");
```


For more details, please see the original [repository](https://github.com/ehmicky/human-signals).

## Sponsoring

To support my efforts in maintaining the ESM/CommonJS hybrid, please sponsor [here](https://github.com/sponsors/AlCalzone).

To support the original author of the module, please sponsor [here](https://github.com/ehmicky/human-signals).
