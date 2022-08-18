#!/bin/bash

npx gulp build
mv build/src/ build/esm
mkdir -p build/cjs

PJSON=$(cat package.json | jq '
	del(.type)
  | del(.homepage)
	| .description = .description + ". This is a fork of " + .repository + ", but with CommonJS support."
	| .repository = "esm2cjs/" + .name
	| .name |= "@esm2cjs/" + .
	| .author = { "name": "Dominic Griesel", "email": "d.griesel@gmx.net" }
	| .publishConfig = { "access": "public" }
	| .funding = "https://github.com/sponsors/AlCalzone"
	| .main = "build/cjs/main.js"
  | .types = "build/esm/main.d.ts"
  | .typesVersions = {}
	| .typesVersions["*"] = {}
	| .typesVersions["*"]["build/esm/main.d.ts"] = ["build/esm/main.d.ts"]
	| .typesVersions["*"]["build/cjs/main.d.ts"] = ["build/esm/main.d.ts"]
	| .typesVersions["*"]["*"] = ["build/esm/*"]
	| .module = "build/esm/main.js"
	| .files = ["build/**/*.{js,d.ts,json}"]
	| .exports = {}
	| .exports["."].import = "./build/esm/main.js"
	| .exports["."].require = "./build/cjs/main.js"
	| .exports["./package.json"] = "./package.json"
	| .scripts["to-cjs"] = "esm2cjs --in build/esm --out build/cjs -t node12"
')
echo "$PJSON" > package.json

npm i -D @alcalzone/esm2cjs
npm run to-cjs
npm uninstall -D @alcalzone/esm2cjs

PJSON=$(cat package.json | jq 'del(.scripts["to-cjs"])')
echo "$PJSON" > package.json
