"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_node_util = require("node:util");
var import_ajv = __toESM(require("ajv"));
var import_ava = __toESM(require("ava"));
var import_human_signals = require("human-signals");
var import_test_each = require("test-each");
const ajv = new import_ajv.default({});
const validate = (value, schema) => {
  const isValid = ajv.validate(schema, value);
  if (isValid) {
    return true;
  }
  return ajv.errorsText(ajv.errors, { separator: "\n" });
};
const JSON_SCHEMA = {
  type: "object",
  minProperties: 1,
  additionalProperties: {
    type: "object",
    properties: {
      name: { type: "string", pattern: "SIG[A-Z\\d]+" },
      number: { type: "integer", minimum: 1, maximum: 64 },
      description: { type: "string", minLength: 1 },
      supported: { type: "boolean" },
      action: {
        type: "string",
        enum: ["terminate", "core", "ignore", "pause", "unpause"]
      },
      forced: { type: "boolean" },
      standard: {
        type: "string",
        enum: ["ansi", "posix", "bsd", "systemv", "other"]
      }
    },
    additionalProperties: false
  }
};
(0, import_test_each.each)(
  [
    { title: "signalsByName", signals: import_human_signals.signalsByName },
    { title: "signalsByNumber", signals: import_human_signals.signalsByNumber }
  ],
  ({ title }, { signals }) => {
    (0, import_ava.default)(`Shape | ${title}`, (t) => {
      t.is(validate(signals, JSON_SCHEMA), true);
    });
  }
);
(0, import_ava.default)("Object keys | signalsByName", (t) => {
  t.true(Object.entries(import_human_signals.signalsByName).every(([key, { name }]) => key === name));
});
(0, import_ava.default)("Object keys | signalsByNumber", (t) => {
  t.true(
    Object.entries(import_human_signals.signalsByNumber).every(
      ([key, { number }]) => key === String(number)
    )
  );
});
(0, import_ava.default)("Same signals", (t) => {
  t.true(
    Object.values(import_human_signals.signalsByNumber).every(
      (signal) => (0, import_node_util.isDeepStrictEqual)(signal, import_human_signals.signalsByName[signal.name])
    )
  );
});
//# sourceMappingURL=main.test.js.map
