# babel-plugin-transform-monad-notation



## Installation

```sh
$ npm install babel-plugin-transform-monad-notation
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-monad-notation"]
}
```

### Via CLI

```sh
$ babel --plugins transform-monad-notation script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-monad-notation"]
});
```
