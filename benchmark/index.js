'use strict';

/* eslint import/no-unresolved: 0*/
const Benchmark = require('benchmark');
const Route = require('route-parser');
const FnRoute = require('../src');

const compiledRoute = Route('my/fancy/route/page/:page');
const compiledFnRoute = FnRoute('my/fancy/route/page/:page');

const suite = new Benchmark.Suite();

// add tests
suite.add('route-parser#compile', () => Route('my/fancy/route/page/:page'))
  .add('functional-route-parser#compile', () => FnRoute('my/fancy/route/page/:page'))

  // add listeners
  .on('cycle', event => console.log(String(event.target)))
  .on('complete', function complete() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ async: true });

// add tests
suite.add('route-parser#match', () => compiledRoute.match('my/fancy/route/page/7'))
  .add('functional-route-parser#match', () => compiledFnRoute.parse('my/fancy/route/page/7'))

  // add listeners
  .on('cycle', event => console.log(String(event.target)))
  .on('complete', function complete() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ async: true });
