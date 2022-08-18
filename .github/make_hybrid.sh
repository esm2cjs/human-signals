#!/bin/bash

npx gulp build
mv build/src build/esm
mkdir -p build/cjs
mv index.js esm/index.js
sed -i "s#from 'human-signals'#from '@esm2cjs/human-signals'" test.js
mv test.js test.mjs

PJSON=$(cat package.json | jq --tab '
	del(.type)
  | del(.homepage)
	| .description = .description + ". This is a fork of " + .repository + ", but with CommonJS support."
	| .repository = "esm2cjs/" + .name
	| .name |= "@esm2cjs/" + .
	| .author = { "name": "Dominic Griesel", "email": "d.griesel@gmx.net" }
	| .publishConfig = { "access": "public" }
	| .funding = "https://github.com/sponsors/AlCalzone"
	| .main = "build/cjs/index.js"
  | .types = "build/esm/index.d.ts"
  | .typesVersions = {}
	| .typesVersions["*"] = {}
	| .typesVersions["*"]["build/esm/index.d.ts"] = ["build/esm/index.d.ts"]
	| .typesVersions["*"]["build/cjs/index.d.ts"] = ["build/esm/index.d.ts"]
	| .typesVersions["*"]["*"] = ["build/esm/*"]
	| .module = "build/esm/index.js"
	| .files = ["build/**/*.{js,d.ts,json}"]
	| .exports = {}
	| .exports["."].import = "./build/esm/index.js"
	| .exports["."].require = "./build/cjs/index.js"
	| .exports["./package.json"] = "./package.json"
	| .scripts["to-cjs"] = "esm2cjs --in build/esm --out build/cjs -t node12"
')
echo "$PJSON" > package.json

npm i -D @alcalzone/esm2cjs
npm run to-cjs
npm uninstall -D @alcalzone/esm2cjs

PJSON=$(cat package.json | jq --tab 'del(.scripts["to-cjs"])')
echo "$PJSON" > package.json
