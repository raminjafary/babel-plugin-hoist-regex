# Babel Plugin Hoist Regex

[![npm][npm]][npm-url]

> A simple babel plugin to hoist regular expressions

## Installation

```bash
yarn add babel-plugin-hoist-regex
# or 
npm i babel-plugin-hoist-regex

```

## Usage

```js
// .babelrc
{
  "plugins": [
      "babel-plugin-hoist-regex"
    ]
}

```

### Before transpilation:

```js
function literalRegExp(value) {
  const regex = /[0-9]+/
  const result = regex.exec(value)
  return (newRegExp = () => {
    const rgx = new RegExp('\\d+')
    const input = rgx.test(result.input)
    return input
  })()
}
literalRegExp(123456789)

```
### After transpilation:

```js
const _rgx = new RegExp('\\d+');

const _regex = /[0-9]+/;

function literalRegExp(value) {
  var result = _regex.exec(value);

  return (newRegExp = function newRegExp() {
    var input = _rgx.test(result.input);

    return input;
  })();
}

literalRegExp(123456789);

```

## License

MIT

[npm]: https://badgen.net/npm/v/babel-plugin-hoist-regex
[npm-url]: https://www.npmjs.com/package/babel-plugin-hoist-regex
