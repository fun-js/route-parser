[![travis build](https://img.shields.io/travis/fun-js/route-parser.svg?style=flat)](https://travis-ci.org/fun-js/route-parser)
[![Dependency Status](https://david-dm.org/fun-js/route-parser.svg?theme=shields.io)](https://david-dm.org/fun-js/route-parser)
[![devDependency Status](https://david-dm.org/fun-js/route-parser/dev-status.svg?theme=shields.io)](https://david-dm.org/fun-js/route-parser#info=devDependencies)
[![Codecov](https://img.shields.io/codecov/c/github/fun-js/route-parser.svg)]()
[![MIT License](https://img.shields.io/npm/l/starwars-names.svg?style=flat)](http://opensource.org/licenses/MIT)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat)](https://github.com/semantic-release/semantic-release)

## What is it?

A 10X FASTER and functional route parser (run the benchmark for yourself), for Javascript in Node and the browser. Its api is inspired by [route-parser](https://github.com/rcs/route-parser), but is implemented in a functional way, don't rely in 'this' keyword.


## How do I install it?

```Shell
npm install --save @funjs/route-parser
or
yarn add @funjs/route-parser
```

## How do I use it?

```javascript
const Router = require('@funjs/route-parser');
const route = Router('/books/:section=(programming|romance|horror)/:title');
route.match('/books/programming/JavaScript-Good-Parts'); // { section: 'programming', title: 'JavaScript-Good-Parts' }
```

## How do I customize delimiters and named segment?

```javascript
const Router = require('@funjs/route-parser', { delimiter: ':', namedSegment: '$' });
const route = Router('books:$section=(programming|romance|horror):$title');
route.match('books:programming:JavaScript-Good-Parts'); // { section: 'programming', title: 'JavaScript-Good-Parts' }
```


## What can I use in my routes?

| Example         | Description          |
| --------------- | -------- |
| `:name`         |  a named parameter to capture from the route up to `/`, `?`, or end of string  |
| `*`        |  a splat to capture from the route up to `?` or end of string |
| <code>:name=(a&#124;b&#124;c)</code>  |  a named parameter group that doesn't have to be part of the query. Can contain nested optional groups, params, and splats
| anything else   | free form literals |

Some examples:

* `/some/:thing`
* `/users/:id/comments/:comment/rating/:rating`
* `/*/foo/*`
* `/books/:section=(Romance|Horror)/:title`


## How does it work?

For performance reasons the matching is done by generating regulars expressions.


## How to run the benchmark?

```Shell
cd benchmark
npm install
node index.js
```


## TODO:

- [x] RegExp Matching
- [x] Named parameters
- [x] named parameters Options
- [ ] Reverse Matching
- [x] Customizables delimiters and named segments
- [ ] Querystrings

