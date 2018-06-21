var Fhir =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.



/*<replacement>*/

var processNextTick = __webpack_require__(7);
/*</replacement>*/

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var util = __webpack_require__(3);
util.inherits = __webpack_require__(4);
/*</replacement>*/

var Readable = __webpack_require__(21);
var Writable = __webpack_require__(12);

util.inherits(Duplex, Readable);

var keys = objectKeys(Writable.prototype);
for (var v = 0; v < keys.length; v++) {
  var method = keys[v];
  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  processNextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }
    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

Duplex.prototype._destroy = function (err, cb) {
  this.push(null);
  this.end();

  processNextTick(cb, err);
};

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (true) {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.8.3';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = property('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
            i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys =  _.keys(obj),
          length = keys.length,
          results = {},
          currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = property;

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
      return _;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
}.call(this));


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).Buffer))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(30)
var ieee754 = __webpack_require__(31)
var isArray = __webpack_require__(20)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (!process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = nextTick;
} else {
  module.exports = process.nextTick;
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(5)
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @typedef ParseStructureDefinitionResponse
 * @property {string} _type
 * @property {ParseStructureDefinitionResponseProperty[]} _properties
 */

/**
 * @typedef ParseStructureDefinitionResponseProperty
 * @property {string} _name
 * @property {string} [_valueSet]
 * @property {string} [_valueSetStrength]
 * @property {ParseStructureDefinitionResponseProperty[]} _properties
 */

/**
 * @typedef ParseValueSetResponse
 * @property {ParseValueSetResponseSystem[]} systems
 */

/**
 * @typedef ParseValueSetResponseSystem
 * @property {ParseValueSetRepsonseSystemCode[]} codes
 * @property {string} uri
 */

/**
 * @typedef ParseValueSetResponseSystemCode
 * @property {string} code
 * @property {string} display
 */

var _ = __webpack_require__(1);

/**
 * Class responsible for parsing StructureDefinition and ValueSet resources into bare-minimum information
 * needed for serialization and validation.
 * @param {boolean} loadCached
 * @param {StructureDefinition[]} [coreStructureDefinitions]
 * @param {Bundle} [coreValueSetBundle]
 * @constructor
 */
function ParseConformance(loadCached, coreStructureDefinitions) {
    /**
     * @type {ParseStructureDefinitionResponse[]}
     */
    this.parsedStructureDefinitions = loadCached ? __webpack_require__(16) : {};

    /**
     * @type {ParseValueSetResponse[]}
     */
    this.parsedValueSets = loadCached ? __webpack_require__(17) : {};
}

/**
 * Parses any ValueSet and StructureDefinition resources in the bundle and stores
 * them in the parser for use by serialization and validation logic.
 * @param {Bundle} bundle The bundle to parse
 */
ParseConformance.prototype.parseBundle = function(bundle) {
    if (!bundle || !bundle.entry) {
        return;
    }

    for (var i = 0; i < bundle.entry.length; i++) {
        var entry = bundle.entry[i];
        var resource = entry.resource;

        switch (resource.resourceType) {
            case 'StructureDefinition':
                // Only parse a few kinds of StructureDefinition resources
                if (resource.kind != 'resource' && resource.kind != 'complex-type' && resource.kind != 'primitive-type') {
                    break;
                }

                this.parseStructureDefinition(resource);
                break;
            case 'ValueSet':
                this.parseValueSet(resource, bundle);
                break;
        }
    }
}

/**
 * Parses a StructureDefinition resource, reading only properties necessary for the FHIR.js module to perform its functions.
 * structureDefinition must have a unique id, or it will overwrite other parsed structure definitions stored in memory
 * @param {StructureDefinition} structureDefinition The StructureDefinition to parse and load into memory
 * @returns {ParseStructureDefinitionResponseProperty}
 */
ParseConformance.prototype.parseStructureDefinition = function(structureDefinition) {
    var self = this;

    var parsedStructureDefinition = {
        _type: 'Resource',
        _properties: []
    };
    this.parsedStructureDefinitions[structureDefinition.id] = parsedStructureDefinition;         // TODO: Not sure this works for profiles

    if (structureDefinition.snapshot && structureDefinition.snapshot.element) {
        for (var x in structureDefinition.snapshot.element) {
            var element = structureDefinition.snapshot.element[x];
            var elementId = structureDefinition.snapshot.element[x].id;
            elementId = elementId.substring(structureDefinition.id.length + 1);

            if (!element.max) {
                throw 'Expected all base resource elements to have a max value';
            }

            if (!elementId || elementId.indexOf('.') > 0 || !element.type) {
                continue;
            }

            if (element.type.length === 1) {
                var newProperty = {
                    _name: elementId,
                    _type: element.type[0].code,
                    _multiple: element.max !== '1',
                    _required: element.min === 1
                };
                parsedStructureDefinition._properties.push(newProperty);

                self.populateValueSet(element, newProperty);

                if (element.type[0].code == 'BackboneElement') {
                    newProperty._properties = [];
                    self.populateBackboneElement(parsedStructureDefinition, structureDefinition.snapshot.element[x].id, structureDefinition);
                }
            } else if (elementId.endsWith('[x]')) {
                elementId = elementId.substring(0, elementId.length - 3);
                for (var y in element.type) {
                    var choiceType = element.type[y].code;
                    choiceType = choiceType.substring(0, 1).toUpperCase() + choiceType.substring(1);
                    var choiceElementId = elementId + choiceType;
                    var newProperty = {
                        _name: choiceElementId,
                        _choice: elementId,
                        _type: element.type[y].code,
                        _multiple: element.max !== '1',
                        _required: element.min === 1
                    };

                    self.populateValueSet(element, newProperty);

                    parsedStructureDefinition._properties.push(newProperty);
                }
            } else {
                var isReference = true;
                for (var y in element.type) {
                    if (element.type[y].code !== 'Reference') {
                        isReference = false;
                        break;
                    }
                }

                if (isReference) {
                    parsedStructureDefinition._properties.push({
                        _name: elementId,
                        _type: 'Reference',
                        _multiple: element.max !== '1'
                    });
                } else {
                    console.log(elementId);
                }
            }
        }
    }

    return parsedStructureDefinition;
}

/**
 * Parses the ValueSet resource. Parses only bare-minimum information needed for validation against value sets.
 * Currently only supports parsing 'compose'
 * @param {ValueSet} valueSet The ValueSet resource to parse and load into memory
 * @param {Bundle} bundle A bundle of resources that contains any ValueSet or CodeSystem resources that ValueSet being parsed references
 * @returns {ParseValueSetResponse}
 */
ParseConformance.prototype.parseValueSet = function(valueSet, bundle) {
    var self = this;

    if (valueSet.compose) {
        var newValueSet = {
            systems: []
        };

        for (var i = 0; i < valueSet.compose.include.length; i++) {
            var include = valueSet.compose.include[i];
            var newSystem = {
                uri: include.system,
                codes: []
            };

            var nextCodes = null;

            if (!include.concept) {
                if (!bundle) {
                    return;
                }

                // Add all codes from the code system
                var foundCodeSystem = _.find(bundle.entry, function(entry) {
                    return entry.resource.url === include.system
                });

                // Couldn't find the code system, won't include it in validation
                if (!foundCodeSystem) {
                    return;
                }

                foundCodeSystem = foundCodeSystem.resource;

                nextCodes = _.map(foundCodeSystem.concept, function(concept) {
                    return {
                        code: concept.code,
                        display: concept.display
                    };
                });
            } else {
                nextCodes = _.map(include.concept, function(concept) {
                    return {
                        code: concept.code,
                        display: concept.display
                    };
                });
            }

            newSystem.codes = newSystem.codes.concat(nextCodes);
            newValueSet.systems.push(newSystem);
        }

        self.parsedValueSets[valueSet.url] = newValueSet;
        return newValueSet;
    }
}

/**
 * This method is called to ensure that a value set (by its url) is loaded from the core spec
 * @param {string} valueSetUrl The url of the value set
 * @param {Bundle} bundle A bundle that ValueSet is stored in, if the value set is not already loaded into the parser
 * @returns {boolean} Returns true if the value set was found/loaded, otherwise false
 * @private
 */
ParseConformance.prototype.ensureValueSetLoaded = function(valueSetUrl, bundle) {
    var self = this;

    if (this.parsedValueSets[valueSetUrl]) {
        return true;
    }

    if (!bundle) {
        return false;
    }

    var foundValueSetEntry = _.find(bundle.entry, function(entry) {
        return entry.fullUrl === valueSetUrl;
    });

    if (!foundValueSetEntry) {
        return false;
    }

    var foundValueSet = foundValueSetEntry.resource;

    if (this.parseValueSet(foundValueSet)) {
        return true;
    }

    return false;
}

/**
 * @param {ElementDefinition} element
 * @param {ParseStructureDefinitionResponseProperty} property
 * @private
 */
ParseConformance.prototype.populateValueSet = function(element, property) {
    var self = this;
    if (element.binding && element.binding.valueSetReference) {
        property._valueSet = element.binding.valueSetReference.reference;

        if (element.binding.strength) {
            property._valueSetStrength = element.binding.strength;
        }

        self.ensureValueSetLoaded(element.binding.valueSetReference.reference);
    }
}

/**
 * @param {string} resourceType
 * @param {string} parentElementId
 * @param {StructureDefinition} profile
 * @private
 */
ParseConformance.prototype.populateBackboneElement = function(resourceType, parentElementId, profile) {
    var self = this;
    for (var y in profile.snapshot.element) {
        var backboneElement = profile.snapshot.element[y];
        var backboneElementId = backboneElement.id;
        if (!backboneElementId.startsWith(parentElementId + '.') || backboneElementId.split('.').length !== parentElementId.split('.').length + 1) {
            continue;
        }

        backboneElementId = backboneElementId.substring(profile.id.length + 1);
        var parentElementIdSplit = parentElementId.substring(profile.id.length + 1).split('.');
        var parentBackboneElement = null;

        for (var j = 0; j < parentElementIdSplit.length; j++) {
            parentBackboneElement = _.find(!parentBackboneElement ? resourceType._properties : parentBackboneElement._properties, function(property) {
                return property._name == parentElementIdSplit[j];
            });

            if (!parentBackboneElement) {
                throw 'Parent backbone element not found';
            }
        }

        if (parentBackboneElement) {
            if (!backboneElement.type) {
                var type = 'string';

                if (backboneElement.contentReference) {
                    type = backboneElement.contentReference;
                }

                parentBackboneElement._properties.push({
                    _name: backboneElementId.substring(backboneElementId.lastIndexOf('.') + 1),
                    _type: type,
                    _multiple: backboneElement.max !== '1',
                    _required: backboneElement.min === 1
                });
            } else if (backboneElement.type.length == 1) {
                var newProperty = {
                    _name: backboneElementId.substring(backboneElementId.lastIndexOf('.') + 1),
                    _type: backboneElement.type[0].code,
                    _multiple: backboneElement.max !== '1',
                    _required: backboneElement.min === 1,
                    _properties: []
                };
                parentBackboneElement._properties.push(newProperty);

                self.populateValueSet(backboneElement, newProperty);

                if (backboneElement.type[0].code == 'BackboneElement') {
                    self.populateBackboneElement(resourceType, profile.snapshot.element[y].id, profile);
                }
            } else if (backboneElement.id.endsWith('[x]')) {
                var nextElementId = backboneElement.id.substring(backboneElement.id.lastIndexOf('.') + 1, backboneElement.id.length - 3);
                for (var y in backboneElement.type) {
                    var choiceType = backboneElement.type[y].code;
                    choiceType = choiceType.substring(0, 1).toUpperCase() + choiceType.substring(1);
                    var choiceElementId = backboneElement.id.substring(backboneElement.id.lastIndexOf('.') + 1, backboneElement.id.length - 3) + choiceType;
                    var newProperty = {
                        _name: choiceElementId,
                        _choice: backboneElement.id.substring(backboneElement.id.lastIndexOf('.') + 1),
                        _type: backboneElement.type[y].code,
                        _multiple: backboneElement.max !== '1',
                        _required: backboneElement.min === 1
                    };
                    parentBackboneElement._properties.push(newProperty);

                    self.populateValueSet(backboneElement, newProperty);
                }
            } else {
                var isReference = true;
                for (var z in backboneElement.type) {
                    if (backboneElement.type[z].code !== 'Reference') {
                        isReference = false;
                        break;
                    }
                }

                if (!isReference) {
                    throw 'Did not find a reference... not sure what to do';
                }

                var newProperty = {
                    _name: backboneElementId.substring(backboneElementId.lastIndexOf('.') + 1),
                    _type: 'Reference',
                    _multiple: backboneElement.max !== '1',
                    _required: backboneElement.min === 1
                };
                parentBackboneElement._properties.push(newProperty);

                self.populateValueSet(backboneElement, newProperty);
            }
        } else {
            throw 'Unexpected backbone parent element id';
        }
    }
}

module.exports = ParseConformance;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(21);
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = __webpack_require__(12);
exports.Duplex = __webpack_require__(0);
exports.Transform = __webpack_require__(24);
exports.PassThrough = __webpack_require__(39);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, setImmediate, global) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.



/*<replacement>*/

var processNextTick = __webpack_require__(7);
/*</replacement>*/

module.exports = Writable;

/* <replacement> */
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;
  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = __webpack_require__(3);
util.inherits = __webpack_require__(4);
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: __webpack_require__(38)
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(22);
/*</replacement>*/

/*<replacement>*/
var Buffer = __webpack_require__(8).Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*</replacement>*/

var destroyImpl = __webpack_require__(23);

util.inherits(Writable, Stream);

function nop() {}

function WritableState(options, stream) {
  Duplex = Duplex || __webpack_require__(0);

  options = options || {};

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // if _final has been called
  this.finalCalled = false;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // has it been destroyed
  this.destroyed = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || __webpack_require__(0);

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;

    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  processNextTick(cb, er);
}

// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;

  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    processNextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = _isUint8Array(chunk) && !state.objectMode;

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);
    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    processNextTick(cb, er);
    // this can emit finish, and it will always happen
    // after error
    processNextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
    // this can emit finish, but finish must
    // always follow error
    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    var allBuffers = true;
    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }
    buffer.allBuffers = allBuffers;

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequestCount = 0;
  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;
    if (err) {
      stream.emit('error', err);
    }
    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}
function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function') {
      state.pendingcb++;
      state.finalCalled = true;
      processNextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    prefinish(stream, state);
    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) processNextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;
  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  }
  if (state.corkedRequestsFree) {
    state.corkedRequestsFree.next = corkReq;
  } else {
    state.corkedRequestsFree = corkReq;
  }
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  get: function () {
    if (this._writableState === undefined) {
      return false;
    }
    return this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._writableState.destroyed = value;
  }
});

Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;
Writable.prototype._destroy = function (err, cb) {
  this.end();
  cb(err);
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6), __webpack_require__(36).setImmediate, __webpack_require__(2)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Buffer = __webpack_require__(8).Buffer;

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return -1;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// UTF-8 replacement characters ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd'.repeat(p);
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd'.repeat(p + 1);
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd'.repeat(p + 2);
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character for each buffered byte of a (partial)
// character needs to be added to the output.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd'.repeat(this.lastTotal - this.lastNeed);
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = {

  copyOptions: function (options) {
    var key, copy = {};
    for (key in options) {
      if (options.hasOwnProperty(key)) {
        copy[key] = options[key];
      }
    }
    return copy;
  },

  ensureFlagExists: function (item, options) {
    if (!(item in options) || typeof options[item] !== 'boolean') {
      options[item] = false;
    }
  },

  ensureSpacesExists: function (options) {
    if (!('spaces' in options) || (typeof options.spaces !== 'number' && typeof options.spaces !== 'string')) {
      options.spaces = 0;
    }
  },

  ensureKeyExists: function (key, options) {
    if (!(key + 'Key' in options) || typeof options[key + 'Key'] !== 'string') {
      options[key + 'Key'] = options.compact ? '_' + key : key;
    }
  },

  checkFnExists: function (key, options) {
    return key + 'Fn' in options;
  }

};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var convert = __webpack_require__(18);
var _ = __webpack_require__(1);
var ParseConformance = __webpack_require__(9);

/**
 * @constructor
 * @param {ParseConformance} [parser] A parser, which may include specialized StructureDefintion and ValueSet resources
 */
function ConvertToJS(parser) {
    this.parser = parser || new ParseConformance(true);
}

/**
 * Converts the specified XML resource to a JS object, storing arbitrary-length decimals as strings since FHIR spec requires arbitrary precision.
 * @param {string} xml Resource XML string
 * @returns {FHIR.Resource} A Resource object converted from the XML Resource. Decimals stored as strings.
 */
ConvertToJS.prototype.convert = function(xml) {
    var self = this;
    var xmlObj = convert.xml2js(xml);

    if (xmlObj.elements.length === 1) {
        return self.resourceToJS(xmlObj.elements[0], null);
    }
};

/**
 * Converts the specified XML resource to JSON,
 * turning arbitrary-length decimals into JSON numbers as per the FHIR spec.
 * @param {string} xml Resource XML string
 * @returns {string} JSON with Numbers potentially too large for normal JavaScript & JSON.parse
 */
ConvertToJS.prototype.convertToJSON = function(xml) {
    var self = this;
    var xmlObj = convert.xml2js(xml);
    if (xmlObj.elements.length !== 1) {
        return
    }

    /* Decimals are converted into an object with a custom
    toJSON function that wraps them with 'DDDD's of a length
    greater than any length of Ds in the JSON */
    var surroundDecimalsWith = {};
    var jsObj = self.resourceToJS(xmlObj.elements[0], surroundDecimalsWith);
    var maxDLength = self.maxLengthOfDs(jsObj);
    var rpt = '';
    for (var i = 0; i < maxDLength + 5; i++) {
      rpt += 'D';
    }
    surroundDecimalsWith.str = rpt;
    var json = JSON.stringify(jsObj, null, '\t');

    var replaceRegex = new RegExp('"?' + surroundDecimalsWith.str + '"?', 'g');
    // console.log("replaceRegex", replaceRegex)
    var json2 = json.replace(replaceRegex, '');
    return json2
};

ConvertToJS.prototype.maxLengthOfDs = function(obj) {
    /**
     * get length of longest sequence of 'D' characters in a string
     * @param {string} str
    */
    function maxSubstringLengthStr(str) {
        var matches = str.match(/DDDD+/g);
        if (!matches) {
            return 0;
        }
        var ret = matches
                .map(function(substr) { return substr.length })
                .reduce(function(p,c) { return Math.max(p,c)}, 0);
        return ret;
    }
    /**
     * look through object to find longest sequence of 'D' characters
     * so we can safely wrap decimals
    */
    function maxSubstringLength(currentMax, obj) {
        var ret;
        if (typeof(obj) === 'string') {
            ret =  Math.max(currentMax, maxSubstringLengthStr(obj));
        } else if (typeof(obj) === 'object') {
            ret =  Object.keys(obj)
                    .map(function(k) {
                        return Math.max(maxSubstringLengthStr(k), maxSubstringLength(currentMax, obj[k]))
                    })
                    .reduce(function(p,c) { return Math.max(p,c) }, currentMax);
        } else {
            ret =  currentMax;
        }
        return ret;
    }
    return maxSubstringLength(0, obj);
}

/**
 * @param xmlObj
 * @returns {*}
 * @private
 */
ConvertToJS.prototype.resourceToJS = function(xmlObj, surroundDecimalsWith) {
    var self = this;
    var typeDefinition = self.parser.parsedStructureDefinitions[xmlObj.name];
    var self = this;
    var resource = {
        resourceType: xmlObj.name
    };

    if (!typeDefinition) {
        throw new Error('Unknown resource type: ' + xmlObj.name);
    }

    _.each(typeDefinition._properties, function(property) {
        self.propertyToJS(xmlObj, resource, property, surroundDecimalsWith);
    });

    return resource;
}

/**
 * Finds a property definition based on a reference to another type. Should be a BackboneElement
 * @param relativeType {string} Example: "#QuestionnaireResponse.item"
 */
ConvertToJS.prototype.findReferenceType = function(relativeType) {
    if (!relativeType || !relativeType.startsWith('#')) {
        return;
    }

    var resourceType = relativeType.substring(1, relativeType.indexOf('.'));        // Assume starts with #
    var path = relativeType.substring(resourceType.length + 2);
    var resourceDefinition = this.parser.parsedStructureDefinitions[resourceType];
    var pathSplit = path.split('.');

    if (!resourceDefinition) {
        throw new Error('Could not find resource definition for ' + resourceType);
    }

    var current = resourceDefinition;
    for (var i = 0; i < pathSplit.length; i++) {
        var nextPath = pathSplit[i];
        current = _.find(current._properties, function(property) {
            return property._name === nextPath;
        });

        if (!current) {
            return;
        }
    }

    return current;
}

/**
 * @param xmlObj
 * @param obj
 * @param property
 * @private
 */
ConvertToJS.prototype.propertyToJS = function(xmlObj, obj, property, surroundDecimalsWith) {
    var self = this;
    var xmlProperty = _.filter(xmlObj.elements, function(element) {
        return element.name === property._name;
    });

    if (!xmlProperty || xmlProperty.length === 0) {
        return;
    }

    // If this is a reference type then f
    if (property._type.startsWith('#')) {
        var relativeType = this.findReferenceType(property._type);

        if (!relativeType) {
            throw new Error('Could not find reference to element definition ' + relativeType);
        }

        property = relativeType;
    }

    function pushValue(value) {
        if (!value) return;

        switch (property._type) {
            case 'string':
            case 'base64Binary':
            case 'code':
            case 'id':
            case 'markdown':
            case 'uri':
            case 'oid':
            case 'date':
            case 'dateTime':
            case 'time':
            case 'instant':
                if (value.attributes['value']) {
                    if (obj[property._name] instanceof Array) {
                        obj[property._name].push(value.attributes['value'])
                    } else {
                        obj[property._name] = value.attributes['value'];
                    }
                }
                break;
            case 'decimal':
                if (value.attributes['value']) {
                    if (obj[property._name] instanceof Array) {
                        obj[property._name].push(convertDecimal(value.attributes['value'], surroundDecimalsWith))
                    } else {
                        obj[property._name] = convertDecimal(value.attributes['value'], surroundDecimalsWith)
                    }
                }
                break;
            case 'boolean':
                if (value.attributes['value']) {
                    if (obj[property._name] instanceof Array) {
                        obj[property._name].push(toBoolean(value.attributes['value']))
                    } else {
                        obj[property._name] = toBoolean(value.attributes['value'])
                    }
                }
                break;
            case 'integer':
            case 'unsignedInt':
            case 'positiveInt':
                if (value.attributes['value']) {
                    if (obj[property._name] instanceof Array) {
                        obj[property._name].push(toNumber(value.attributes['value']))
                    } else {
                        obj[property._name] = toNumber(value.attributes['value'])
                    }
                }
                break;
            case 'xhtml':
                if (value.elements && value.elements.length > 0) {
                    var div = convert.js2xml({elements: [value]});
                    if (obj[property._name] instanceof Array) {
                        obj[property._name].push(div);
                    } else {
                        obj[property._name] = div;
                    }
                }
                break;
            case 'BackboneElement':
                var newValue = {};

                for (var x in property._properties) {
                    var nextProperty = property._properties[x];
                    self.propertyToJS(value, newValue, nextProperty, surroundDecimalsWith);
                }

                if (obj[property._name] instanceof Array) {
                    obj[property._name].push(newValue);
                } else {
                    obj[property._name] = newValue;
                }
                break;
            case 'Resource':
                if (value.elements.length === 1) {
                    if (obj[property._name] instanceof Array) {
                        obj[property._name].push(self.resourceToJS(value.elements[0], surroundDecimalsWith))
                    } else {
                        obj[property._name] = self.resourceToJS(value.elements[0], surroundDecimalsWith);
                    }
                }
                break;
            default:
                var nextType = self.parser.parsedStructureDefinitions[property._type];

                if (!nextType) {
                    console.log('do something');
                } else {
                    var newValue = {};

                    _.each(nextType._properties, function(nextProperty) {
                        self.propertyToJS(value, newValue, nextProperty, surroundDecimalsWith);
                    });

                    if (obj[property._name] instanceof Array) {
                        obj[property._name].push(newValue);
                    } else {
                        obj[property._name] = newValue;
                    }
                }
                break;
        }
    }
    function toBoolean(value) {
        if (value === "true") {
            return true;
        } else if (value === "false") {
            return false;
        } else {
            throw new Error("value supposed to be a boolean but got: " + value)
        }
    }
    function toNumber(value) {
        if (/^-?\d+$/.test(value) == false) {
            throw new Error("value supposed to be a number but got: " + value)
        }
        return parseInt(value, 10)
    }
    function convertDecimal(value, surroundDecimalsWith) {
        // validation regex from http://hl7.org/fhir/xml.html
        if (/^-?([0]|([1-9][0-9]*))(\.[0-9]+)?$/.test(value) == false) {
            throw new Error("value supposed to be a decimal number but got: " + value)
        }
        if (surroundDecimalsWith) {
            return {
                value: value,
                toJSON() {
                    // surrounding str used as a marker to remove quotes to turn this
                    // into a JSON number as per FHIR spec..
                    return surroundDecimalsWith.str + value + surroundDecimalsWith.str;
                }
            }
        } else {
            return value;
        }
    }

    if (property._multiple) {
        obj[property._name] = [];
    }

    for (var i in xmlProperty) {
        pushValue(xmlProperty[i]);
    }
}

module.exports = ConvertToJS;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = {"Element":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false}]},"BackboneElement":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false}]},"base64Binary":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"value","_multiple":false,"_required":false}]},"boolean":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"value","_multiple":false,"_required":false}]},"code":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"value","_multiple":false,"_required":false}]},"date":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"value","_multiple":false,"_required":false}]},"dateTime":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"value","_multiple":false,"_required":false}]},"decimal":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"value","_multiple":false,"_required":false}]},"id":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"value","_multiple":false,"_required":false}]},"instant":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"value","_multiple":false,"_required":false}]},"integer":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"value","_multiple":false,"_required":false}]},"markdown":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"value","_multiple":false,"_required":false}]},"oid":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"value","_multiple":false,"_required":false}]},"positiveInt":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"value","_multiple":false,"_required":false}]},"string":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"value","_multiple":false,"_required":false}]},"time":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"value","_multiple":false,"_required":false}]},"unsignedInt":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"value","_multiple":false,"_required":false}]},"uri":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"value","_multiple":false,"_required":false}]},"uuid":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"value","_multiple":false,"_required":false}]},"xhtml":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"value","_multiple":false,"_required":true}]},"Address":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"use","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/address-use","_valueSetStrength":"required"},{"_name":"type","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/address-type","_valueSetStrength":"required"},{"_name":"text","_type":"string","_multiple":false,"_required":false},{"_name":"line","_type":"string","_multiple":true,"_required":false},{"_name":"city","_type":"string","_multiple":false,"_required":false},{"_name":"district","_type":"string","_multiple":false,"_required":false},{"_name":"state","_type":"string","_multiple":false,"_required":false},{"_name":"postalCode","_type":"string","_multiple":false,"_required":false},{"_name":"country","_type":"string","_multiple":false,"_required":false},{"_name":"period","_type":"Period","_multiple":false,"_required":false}]},"Age":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"value","_type":"decimal","_multiple":false,"_required":false},{"_name":"comparator","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/quantity-comparator","_valueSetStrength":"required"},{"_name":"unit","_type":"string","_multiple":false,"_required":false},{"_name":"system","_type":"uri","_multiple":false,"_required":false},{"_name":"code","_type":"code","_multiple":false,"_required":false}]},"Annotation":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"authorReference","_choice":"author","_type":"Reference","_multiple":false,"_required":false},{"_name":"authorReference","_choice":"author","_type":"Reference","_multiple":false,"_required":false},{"_name":"authorReference","_choice":"author","_type":"Reference","_multiple":false,"_required":false},{"_name":"authorString","_choice":"author","_type":"string","_multiple":false,"_required":false},{"_name":"time","_type":"dateTime","_multiple":false,"_required":false},{"_name":"text","_type":"string","_multiple":false,"_required":true}]},"Attachment":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"contentType","_type":"code","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"data","_type":"base64Binary","_multiple":false,"_required":false},{"_name":"url","_type":"uri","_multiple":false,"_required":false},{"_name":"size","_type":"unsignedInt","_multiple":false,"_required":false},{"_name":"hash","_type":"base64Binary","_multiple":false,"_required":false},{"_name":"title","_type":"string","_multiple":false,"_required":false},{"_name":"creation","_type":"dateTime","_multiple":false,"_required":false}]},"CodeableConcept":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"coding","_type":"Coding","_multiple":true,"_required":false},{"_name":"text","_type":"string","_multiple":false,"_required":false}]},"Coding":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"system","_type":"uri","_multiple":false,"_required":false},{"_name":"version","_type":"string","_multiple":false,"_required":false},{"_name":"code","_type":"code","_multiple":false,"_required":false},{"_name":"display","_type":"string","_multiple":false,"_required":false},{"_name":"userSelected","_type":"boolean","_multiple":false,"_required":false}]},"ContactDetail":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"name","_type":"string","_multiple":false,"_required":false},{"_name":"telecom","_type":"ContactPoint","_multiple":true,"_required":false}]},"ContactPoint":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"system","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/contact-point-system","_valueSetStrength":"required"},{"_name":"value","_type":"string","_multiple":false,"_required":false},{"_name":"use","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/contact-point-use","_valueSetStrength":"required"},{"_name":"rank","_type":"positiveInt","_multiple":false,"_required":false},{"_name":"period","_type":"Period","_multiple":false,"_required":false}]},"Contributor":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"type","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/contributor-type","_valueSetStrength":"required"},{"_name":"name","_type":"string","_multiple":false,"_required":true},{"_name":"contact","_type":"ContactDetail","_multiple":true,"_required":false}]},"Count":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"value","_type":"decimal","_multiple":false,"_required":false},{"_name":"comparator","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/quantity-comparator","_valueSetStrength":"required"},{"_name":"unit","_type":"string","_multiple":false,"_required":false},{"_name":"system","_type":"uri","_multiple":false,"_required":false},{"_name":"code","_type":"code","_multiple":false,"_required":false}]},"DataRequirement":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"type","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/all-types","_valueSetStrength":"required"},{"_name":"profile","_type":"uri","_multiple":true,"_required":false},{"_name":"mustSupport","_type":"string","_multiple":true,"_required":false},{"_name":"codeFilter","_type":"Element","_multiple":true,"_required":false},{"_name":"dateFilter","_type":"Element","_multiple":true,"_required":false}]},"Distance":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"value","_type":"decimal","_multiple":false,"_required":false},{"_name":"comparator","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/quantity-comparator","_valueSetStrength":"required"},{"_name":"unit","_type":"string","_multiple":false,"_required":false},{"_name":"system","_type":"uri","_multiple":false,"_required":false},{"_name":"code","_type":"code","_multiple":false,"_required":false}]},"Dosage":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"sequence","_type":"integer","_multiple":false,"_required":false},{"_name":"text","_type":"string","_multiple":false,"_required":false},{"_name":"additionalInstruction","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/additional-instruction-codes","_valueSetStrength":"example"},{"_name":"patientInstruction","_type":"string","_multiple":false,"_required":false},{"_name":"timing","_type":"Timing","_multiple":false,"_required":false},{"_name":"asNeededBoolean","_choice":"asNeeded","_type":"boolean","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/medication-as-needed-reason","_valueSetStrength":"example"},{"_name":"asNeededCodeableConcept","_choice":"asNeeded","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/medication-as-needed-reason","_valueSetStrength":"example"},{"_name":"site","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/approach-site-codes","_valueSetStrength":"example"},{"_name":"route","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/route-codes","_valueSetStrength":"example"},{"_name":"method","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/administration-method-codes","_valueSetStrength":"example"},{"_name":"doseRange","_choice":"dose","_type":"Range","_multiple":false,"_required":false},{"_name":"doseQuantity","_choice":"dose","_type":"Quantity","_multiple":false,"_required":false},{"_name":"maxDosePerPeriod","_type":"Ratio","_multiple":false,"_required":false},{"_name":"maxDosePerAdministration","_type":"Quantity","_multiple":false,"_required":false},{"_name":"maxDosePerLifetime","_type":"Quantity","_multiple":false,"_required":false},{"_name":"rateRatio","_choice":"rate","_type":"Ratio","_multiple":false,"_required":false},{"_name":"rateRange","_choice":"rate","_type":"Range","_multiple":false,"_required":false},{"_name":"rateQuantity","_choice":"rate","_type":"Quantity","_multiple":false,"_required":false}]},"Duration":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"value","_type":"decimal","_multiple":false,"_required":false},{"_name":"comparator","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/quantity-comparator","_valueSetStrength":"required"},{"_name":"unit","_type":"string","_multiple":false,"_required":false},{"_name":"system","_type":"uri","_multiple":false,"_required":false},{"_name":"code","_type":"code","_multiple":false,"_required":false}]},"ElementDefinition":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"path","_type":"string","_multiple":false,"_required":true},{"_name":"representation","_type":"code","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/property-representation","_valueSetStrength":"required"},{"_name":"sliceName","_type":"string","_multiple":false,"_required":false},{"_name":"label","_type":"string","_multiple":false,"_required":false},{"_name":"code","_type":"Coding","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/observation-codes","_valueSetStrength":"example"},{"_name":"slicing","_type":"Element","_multiple":false,"_required":false},{"_name":"short","_type":"string","_multiple":false,"_required":false},{"_name":"definition","_type":"markdown","_multiple":false,"_required":false},{"_name":"comment","_type":"markdown","_multiple":false,"_required":false},{"_name":"requirements","_type":"markdown","_multiple":false,"_required":false},{"_name":"alias","_type":"string","_multiple":true,"_required":false},{"_name":"min","_type":"unsignedInt","_multiple":false,"_required":false},{"_name":"max","_type":"string","_multiple":false,"_required":false},{"_name":"base","_type":"Element","_multiple":false,"_required":false},{"_name":"contentReference","_type":"uri","_multiple":false,"_required":false},{"_name":"type","_type":"Element","_multiple":true,"_required":false},{"_name":"defaultValueBase64Binary","_choice":"defaultValue","_type":"base64Binary","_multiple":false,"_required":false},{"_name":"defaultValueBoolean","_choice":"defaultValue","_type":"boolean","_multiple":false,"_required":false},{"_name":"defaultValueCode","_choice":"defaultValue","_type":"code","_multiple":false,"_required":false},{"_name":"defaultValueDate","_choice":"defaultValue","_type":"date","_multiple":false,"_required":false},{"_name":"defaultValueDateTime","_choice":"defaultValue","_type":"dateTime","_multiple":false,"_required":false},{"_name":"defaultValueDecimal","_choice":"defaultValue","_type":"decimal","_multiple":false,"_required":false},{"_name":"defaultValueId","_choice":"defaultValue","_type":"id","_multiple":false,"_required":false},{"_name":"defaultValueInstant","_choice":"defaultValue","_type":"instant","_multiple":false,"_required":false},{"_name":"defaultValueInteger","_choice":"defaultValue","_type":"integer","_multiple":false,"_required":false},{"_name":"defaultValueMarkdown","_choice":"defaultValue","_type":"markdown","_multiple":false,"_required":false},{"_name":"defaultValueOid","_choice":"defaultValue","_type":"oid","_multiple":false,"_required":false},{"_name":"defaultValuePositiveInt","_choice":"defaultValue","_type":"positiveInt","_multiple":false,"_required":false},{"_name":"defaultValueString","_choice":"defaultValue","_type":"string","_multiple":false,"_required":false},{"_name":"defaultValueTime","_choice":"defaultValue","_type":"time","_multiple":false,"_required":false},{"_name":"defaultValueUnsignedInt","_choice":"defaultValue","_type":"unsignedInt","_multiple":false,"_required":false},{"_name":"defaultValueUri","_choice":"defaultValue","_type":"uri","_multiple":false,"_required":false},{"_name":"defaultValueAddress","_choice":"defaultValue","_type":"Address","_multiple":false,"_required":false},{"_name":"defaultValueAge","_choice":"defaultValue","_type":"Age","_multiple":false,"_required":false},{"_name":"defaultValueAnnotation","_choice":"defaultValue","_type":"Annotation","_multiple":false,"_required":false},{"_name":"defaultValueAttachment","_choice":"defaultValue","_type":"Attachment","_multiple":false,"_required":false},{"_name":"defaultValueCodeableConcept","_choice":"defaultValue","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"defaultValueCoding","_choice":"defaultValue","_type":"Coding","_multiple":false,"_required":false},{"_name":"defaultValueContactPoint","_choice":"defaultValue","_type":"ContactPoint","_multiple":false,"_required":false},{"_name":"defaultValueCount","_choice":"defaultValue","_type":"Count","_multiple":false,"_required":false},{"_name":"defaultValueDistance","_choice":"defaultValue","_type":"Distance","_multiple":false,"_required":false},{"_name":"defaultValueDuration","_choice":"defaultValue","_type":"Duration","_multiple":false,"_required":false},{"_name":"defaultValueHumanName","_choice":"defaultValue","_type":"HumanName","_multiple":false,"_required":false},{"_name":"defaultValueIdentifier","_choice":"defaultValue","_type":"Identifier","_multiple":false,"_required":false},{"_name":"defaultValueMoney","_choice":"defaultValue","_type":"Money","_multiple":false,"_required":false},{"_name":"defaultValuePeriod","_choice":"defaultValue","_type":"Period","_multiple":false,"_required":false},{"_name":"defaultValueQuantity","_choice":"defaultValue","_type":"Quantity","_multiple":false,"_required":false},{"_name":"defaultValueRange","_choice":"defaultValue","_type":"Range","_multiple":false,"_required":false},{"_name":"defaultValueRatio","_choice":"defaultValue","_type":"Ratio","_multiple":false,"_required":false},{"_name":"defaultValueReference","_choice":"defaultValue","_type":"Reference","_multiple":false,"_required":false},{"_name":"defaultValueSampledData","_choice":"defaultValue","_type":"SampledData","_multiple":false,"_required":false},{"_name":"defaultValueSignature","_choice":"defaultValue","_type":"Signature","_multiple":false,"_required":false},{"_name":"defaultValueTiming","_choice":"defaultValue","_type":"Timing","_multiple":false,"_required":false},{"_name":"defaultValueDosage","_choice":"defaultValue","_type":"Dosage","_multiple":false,"_required":false},{"_name":"defaultValueContactDetail","_choice":"defaultValue","_type":"ContactDetail","_multiple":false,"_required":false},{"_name":"defaultValueContributor","_choice":"defaultValue","_type":"Contributor","_multiple":false,"_required":false},{"_name":"defaultValueDataRequirement","_choice":"defaultValue","_type":"DataRequirement","_multiple":false,"_required":false},{"_name":"defaultValueParameterDefinition","_choice":"defaultValue","_type":"ParameterDefinition","_multiple":false,"_required":false},{"_name":"defaultValueRelatedArtifact","_choice":"defaultValue","_type":"RelatedArtifact","_multiple":false,"_required":false},{"_name":"defaultValueTriggerDefinition","_choice":"defaultValue","_type":"TriggerDefinition","_multiple":false,"_required":false},{"_name":"defaultValueUsageContext","_choice":"defaultValue","_type":"UsageContext","_multiple":false,"_required":false},{"_name":"defaultValueMeta","_choice":"defaultValue","_type":"Meta","_multiple":false,"_required":false},{"_name":"meaningWhenMissing","_type":"markdown","_multiple":false,"_required":false},{"_name":"orderMeaning","_type":"string","_multiple":false,"_required":false},{"_name":"fixedBase64Binary","_choice":"fixed","_type":"base64Binary","_multiple":false,"_required":false},{"_name":"fixedBoolean","_choice":"fixed","_type":"boolean","_multiple":false,"_required":false},{"_name":"fixedCode","_choice":"fixed","_type":"code","_multiple":false,"_required":false},{"_name":"fixedDate","_choice":"fixed","_type":"date","_multiple":false,"_required":false},{"_name":"fixedDateTime","_choice":"fixed","_type":"dateTime","_multiple":false,"_required":false},{"_name":"fixedDecimal","_choice":"fixed","_type":"decimal","_multiple":false,"_required":false},{"_name":"fixedId","_choice":"fixed","_type":"id","_multiple":false,"_required":false},{"_name":"fixedInstant","_choice":"fixed","_type":"instant","_multiple":false,"_required":false},{"_name":"fixedInteger","_choice":"fixed","_type":"integer","_multiple":false,"_required":false},{"_name":"fixedMarkdown","_choice":"fixed","_type":"markdown","_multiple":false,"_required":false},{"_name":"fixedOid","_choice":"fixed","_type":"oid","_multiple":false,"_required":false},{"_name":"fixedPositiveInt","_choice":"fixed","_type":"positiveInt","_multiple":false,"_required":false},{"_name":"fixedString","_choice":"fixed","_type":"string","_multiple":false,"_required":false},{"_name":"fixedTime","_choice":"fixed","_type":"time","_multiple":false,"_required":false},{"_name":"fixedUnsignedInt","_choice":"fixed","_type":"unsignedInt","_multiple":false,"_required":false},{"_name":"fixedUri","_choice":"fixed","_type":"uri","_multiple":false,"_required":false},{"_name":"fixedAddress","_choice":"fixed","_type":"Address","_multiple":false,"_required":false},{"_name":"fixedAge","_choice":"fixed","_type":"Age","_multiple":false,"_required":false},{"_name":"fixedAnnotation","_choice":"fixed","_type":"Annotation","_multiple":false,"_required":false},{"_name":"fixedAttachment","_choice":"fixed","_type":"Attachment","_multiple":false,"_required":false},{"_name":"fixedCodeableConcept","_choice":"fixed","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"fixedCoding","_choice":"fixed","_type":"Coding","_multiple":false,"_required":false},{"_name":"fixedContactPoint","_choice":"fixed","_type":"ContactPoint","_multiple":false,"_required":false},{"_name":"fixedCount","_choice":"fixed","_type":"Count","_multiple":false,"_required":false},{"_name":"fixedDistance","_choice":"fixed","_type":"Distance","_multiple":false,"_required":false},{"_name":"fixedDuration","_choice":"fixed","_type":"Duration","_multiple":false,"_required":false},{"_name":"fixedHumanName","_choice":"fixed","_type":"HumanName","_multiple":false,"_required":false},{"_name":"fixedIdentifier","_choice":"fixed","_type":"Identifier","_multiple":false,"_required":false},{"_name":"fixedMoney","_choice":"fixed","_type":"Money","_multiple":false,"_required":false},{"_name":"fixedPeriod","_choice":"fixed","_type":"Period","_multiple":false,"_required":false},{"_name":"fixedQuantity","_choice":"fixed","_type":"Quantity","_multiple":false,"_required":false},{"_name":"fixedRange","_choice":"fixed","_type":"Range","_multiple":false,"_required":false},{"_name":"fixedRatio","_choice":"fixed","_type":"Ratio","_multiple":false,"_required":false},{"_name":"fixedReference","_choice":"fixed","_type":"Reference","_multiple":false,"_required":false},{"_name":"fixedSampledData","_choice":"fixed","_type":"SampledData","_multiple":false,"_required":false},{"_name":"fixedSignature","_choice":"fixed","_type":"Signature","_multiple":false,"_required":false},{"_name":"fixedTiming","_choice":"fixed","_type":"Timing","_multiple":false,"_required":false},{"_name":"fixedDosage","_choice":"fixed","_type":"Dosage","_multiple":false,"_required":false},{"_name":"fixedContactDetail","_choice":"fixed","_type":"ContactDetail","_multiple":false,"_required":false},{"_name":"fixedContributor","_choice":"fixed","_type":"Contributor","_multiple":false,"_required":false},{"_name":"fixedDataRequirement","_choice":"fixed","_type":"DataRequirement","_multiple":false,"_required":false},{"_name":"fixedParameterDefinition","_choice":"fixed","_type":"ParameterDefinition","_multiple":false,"_required":false},{"_name":"fixedRelatedArtifact","_choice":"fixed","_type":"RelatedArtifact","_multiple":false,"_required":false},{"_name":"fixedTriggerDefinition","_choice":"fixed","_type":"TriggerDefinition","_multiple":false,"_required":false},{"_name":"fixedUsageContext","_choice":"fixed","_type":"UsageContext","_multiple":false,"_required":false},{"_name":"fixedMeta","_choice":"fixed","_type":"Meta","_multiple":false,"_required":false},{"_name":"patternBase64Binary","_choice":"pattern","_type":"base64Binary","_multiple":false,"_required":false},{"_name":"patternBoolean","_choice":"pattern","_type":"boolean","_multiple":false,"_required":false},{"_name":"patternCode","_choice":"pattern","_type":"code","_multiple":false,"_required":false},{"_name":"patternDate","_choice":"pattern","_type":"date","_multiple":false,"_required":false},{"_name":"patternDateTime","_choice":"pattern","_type":"dateTime","_multiple":false,"_required":false},{"_name":"patternDecimal","_choice":"pattern","_type":"decimal","_multiple":false,"_required":false},{"_name":"patternId","_choice":"pattern","_type":"id","_multiple":false,"_required":false},{"_name":"patternInstant","_choice":"pattern","_type":"instant","_multiple":false,"_required":false},{"_name":"patternInteger","_choice":"pattern","_type":"integer","_multiple":false,"_required":false},{"_name":"patternMarkdown","_choice":"pattern","_type":"markdown","_multiple":false,"_required":false},{"_name":"patternOid","_choice":"pattern","_type":"oid","_multiple":false,"_required":false},{"_name":"patternPositiveInt","_choice":"pattern","_type":"positiveInt","_multiple":false,"_required":false},{"_name":"patternString","_choice":"pattern","_type":"string","_multiple":false,"_required":false},{"_name":"patternTime","_choice":"pattern","_type":"time","_multiple":false,"_required":false},{"_name":"patternUnsignedInt","_choice":"pattern","_type":"unsignedInt","_multiple":false,"_required":false},{"_name":"patternUri","_choice":"pattern","_type":"uri","_multiple":false,"_required":false},{"_name":"patternAddress","_choice":"pattern","_type":"Address","_multiple":false,"_required":false},{"_name":"patternAge","_choice":"pattern","_type":"Age","_multiple":false,"_required":false},{"_name":"patternAnnotation","_choice":"pattern","_type":"Annotation","_multiple":false,"_required":false},{"_name":"patternAttachment","_choice":"pattern","_type":"Attachment","_multiple":false,"_required":false},{"_name":"patternCodeableConcept","_choice":"pattern","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"patternCoding","_choice":"pattern","_type":"Coding","_multiple":false,"_required":false},{"_name":"patternContactPoint","_choice":"pattern","_type":"ContactPoint","_multiple":false,"_required":false},{"_name":"patternCount","_choice":"pattern","_type":"Count","_multiple":false,"_required":false},{"_name":"patternDistance","_choice":"pattern","_type":"Distance","_multiple":false,"_required":false},{"_name":"patternDuration","_choice":"pattern","_type":"Duration","_multiple":false,"_required":false},{"_name":"patternHumanName","_choice":"pattern","_type":"HumanName","_multiple":false,"_required":false},{"_name":"patternIdentifier","_choice":"pattern","_type":"Identifier","_multiple":false,"_required":false},{"_name":"patternMoney","_choice":"pattern","_type":"Money","_multiple":false,"_required":false},{"_name":"patternPeriod","_choice":"pattern","_type":"Period","_multiple":false,"_required":false},{"_name":"patternQuantity","_choice":"pattern","_type":"Quantity","_multiple":false,"_required":false},{"_name":"patternRange","_choice":"pattern","_type":"Range","_multiple":false,"_required":false},{"_name":"patternRatio","_choice":"pattern","_type":"Ratio","_multiple":false,"_required":false},{"_name":"patternReference","_choice":"pattern","_type":"Reference","_multiple":false,"_required":false},{"_name":"patternSampledData","_choice":"pattern","_type":"SampledData","_multiple":false,"_required":false},{"_name":"patternSignature","_choice":"pattern","_type":"Signature","_multiple":false,"_required":false},{"_name":"patternTiming","_choice":"pattern","_type":"Timing","_multiple":false,"_required":false},{"_name":"patternDosage","_choice":"pattern","_type":"Dosage","_multiple":false,"_required":false},{"_name":"patternContactDetail","_choice":"pattern","_type":"ContactDetail","_multiple":false,"_required":false},{"_name":"patternContributor","_choice":"pattern","_type":"Contributor","_multiple":false,"_required":false},{"_name":"patternDataRequirement","_choice":"pattern","_type":"DataRequirement","_multiple":false,"_required":false},{"_name":"patternParameterDefinition","_choice":"pattern","_type":"ParameterDefinition","_multiple":false,"_required":false},{"_name":"patternRelatedArtifact","_choice":"pattern","_type":"RelatedArtifact","_multiple":false,"_required":false},{"_name":"patternTriggerDefinition","_choice":"pattern","_type":"TriggerDefinition","_multiple":false,"_required":false},{"_name":"patternUsageContext","_choice":"pattern","_type":"UsageContext","_multiple":false,"_required":false},{"_name":"patternMeta","_choice":"pattern","_type":"Meta","_multiple":false,"_required":false},{"_name":"example","_type":"Element","_multiple":true,"_required":false},{"_name":"minValueDate","_choice":"minValue","_type":"date","_multiple":false,"_required":false},{"_name":"minValueDateTime","_choice":"minValue","_type":"dateTime","_multiple":false,"_required":false},{"_name":"minValueInstant","_choice":"minValue","_type":"instant","_multiple":false,"_required":false},{"_name":"minValueTime","_choice":"minValue","_type":"time","_multiple":false,"_required":false},{"_name":"minValueDecimal","_choice":"minValue","_type":"decimal","_multiple":false,"_required":false},{"_name":"minValueInteger","_choice":"minValue","_type":"integer","_multiple":false,"_required":false},{"_name":"minValuePositiveInt","_choice":"minValue","_type":"positiveInt","_multiple":false,"_required":false},{"_name":"minValueUnsignedInt","_choice":"minValue","_type":"unsignedInt","_multiple":false,"_required":false},{"_name":"minValueQuantity","_choice":"minValue","_type":"Quantity","_multiple":false,"_required":false},{"_name":"maxValueDate","_choice":"maxValue","_type":"date","_multiple":false,"_required":false},{"_name":"maxValueDateTime","_choice":"maxValue","_type":"dateTime","_multiple":false,"_required":false},{"_name":"maxValueInstant","_choice":"maxValue","_type":"instant","_multiple":false,"_required":false},{"_name":"maxValueTime","_choice":"maxValue","_type":"time","_multiple":false,"_required":false},{"_name":"maxValueDecimal","_choice":"maxValue","_type":"decimal","_multiple":false,"_required":false},{"_name":"maxValueInteger","_choice":"maxValue","_type":"integer","_multiple":false,"_required":false},{"_name":"maxValuePositiveInt","_choice":"maxValue","_type":"positiveInt","_multiple":false,"_required":false},{"_name":"maxValueUnsignedInt","_choice":"maxValue","_type":"unsignedInt","_multiple":false,"_required":false},{"_name":"maxValueQuantity","_choice":"maxValue","_type":"Quantity","_multiple":false,"_required":false},{"_name":"maxLength","_type":"integer","_multiple":false,"_required":false},{"_name":"condition","_type":"id","_multiple":true,"_required":false},{"_name":"constraint","_type":"Element","_multiple":true,"_required":false},{"_name":"mustSupport","_type":"boolean","_multiple":false,"_required":false},{"_name":"isModifier","_type":"boolean","_multiple":false,"_required":false},{"_name":"isSummary","_type":"boolean","_multiple":false,"_required":false},{"_name":"binding","_type":"Element","_multiple":false,"_required":false},{"_name":"mapping","_type":"Element","_multiple":true,"_required":false}]},"Extension":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"url","_type":"uri","_multiple":false,"_required":true},{"_name":"valueBase64Binary","_choice":"value","_type":"base64Binary","_multiple":false,"_required":false},{"_name":"valueBoolean","_choice":"value","_type":"boolean","_multiple":false,"_required":false},{"_name":"valueCode","_choice":"value","_type":"code","_multiple":false,"_required":false},{"_name":"valueDate","_choice":"value","_type":"date","_multiple":false,"_required":false},{"_name":"valueDateTime","_choice":"value","_type":"dateTime","_multiple":false,"_required":false},{"_name":"valueDecimal","_choice":"value","_type":"decimal","_multiple":false,"_required":false},{"_name":"valueId","_choice":"value","_type":"id","_multiple":false,"_required":false},{"_name":"valueInstant","_choice":"value","_type":"instant","_multiple":false,"_required":false},{"_name":"valueInteger","_choice":"value","_type":"integer","_multiple":false,"_required":false},{"_name":"valueMarkdown","_choice":"value","_type":"markdown","_multiple":false,"_required":false},{"_name":"valueOid","_choice":"value","_type":"oid","_multiple":false,"_required":false},{"_name":"valuePositiveInt","_choice":"value","_type":"positiveInt","_multiple":false,"_required":false},{"_name":"valueString","_choice":"value","_type":"string","_multiple":false,"_required":false},{"_name":"valueTime","_choice":"value","_type":"time","_multiple":false,"_required":false},{"_name":"valueUnsignedInt","_choice":"value","_type":"unsignedInt","_multiple":false,"_required":false},{"_name":"valueUri","_choice":"value","_type":"uri","_multiple":false,"_required":false},{"_name":"valueAddress","_choice":"value","_type":"Address","_multiple":false,"_required":false},{"_name":"valueAge","_choice":"value","_type":"Age","_multiple":false,"_required":false},{"_name":"valueAnnotation","_choice":"value","_type":"Annotation","_multiple":false,"_required":false},{"_name":"valueAttachment","_choice":"value","_type":"Attachment","_multiple":false,"_required":false},{"_name":"valueCodeableConcept","_choice":"value","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"valueCoding","_choice":"value","_type":"Coding","_multiple":false,"_required":false},{"_name":"valueContactPoint","_choice":"value","_type":"ContactPoint","_multiple":false,"_required":false},{"_name":"valueCount","_choice":"value","_type":"Count","_multiple":false,"_required":false},{"_name":"valueDistance","_choice":"value","_type":"Distance","_multiple":false,"_required":false},{"_name":"valueDuration","_choice":"value","_type":"Duration","_multiple":false,"_required":false},{"_name":"valueHumanName","_choice":"value","_type":"HumanName","_multiple":false,"_required":false},{"_name":"valueIdentifier","_choice":"value","_type":"Identifier","_multiple":false,"_required":false},{"_name":"valueMoney","_choice":"value","_type":"Money","_multiple":false,"_required":false},{"_name":"valuePeriod","_choice":"value","_type":"Period","_multiple":false,"_required":false},{"_name":"valueQuantity","_choice":"value","_type":"Quantity","_multiple":false,"_required":false},{"_name":"valueRange","_choice":"value","_type":"Range","_multiple":false,"_required":false},{"_name":"valueRatio","_choice":"value","_type":"Ratio","_multiple":false,"_required":false},{"_name":"valueReference","_choice":"value","_type":"Reference","_multiple":false,"_required":false},{"_name":"valueSampledData","_choice":"value","_type":"SampledData","_multiple":false,"_required":false},{"_name":"valueSignature","_choice":"value","_type":"Signature","_multiple":false,"_required":false},{"_name":"valueTiming","_choice":"value","_type":"Timing","_multiple":false,"_required":false},{"_name":"valueDosage","_choice":"value","_type":"Dosage","_multiple":false,"_required":false},{"_name":"valueContactDetail","_choice":"value","_type":"ContactDetail","_multiple":false,"_required":false},{"_name":"valueContributor","_choice":"value","_type":"Contributor","_multiple":false,"_required":false},{"_name":"valueDataRequirement","_choice":"value","_type":"DataRequirement","_multiple":false,"_required":false},{"_name":"valueParameterDefinition","_choice":"value","_type":"ParameterDefinition","_multiple":false,"_required":false},{"_name":"valueRelatedArtifact","_choice":"value","_type":"RelatedArtifact","_multiple":false,"_required":false},{"_name":"valueTriggerDefinition","_choice":"value","_type":"TriggerDefinition","_multiple":false,"_required":false},{"_name":"valueUsageContext","_choice":"value","_type":"UsageContext","_multiple":false,"_required":false},{"_name":"valueMeta","_choice":"value","_type":"Meta","_multiple":false,"_required":false}]},"HumanName":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"use","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/name-use","_valueSetStrength":"required"},{"_name":"text","_type":"string","_multiple":false,"_required":false},{"_name":"family","_type":"string","_multiple":false,"_required":false},{"_name":"given","_type":"string","_multiple":true,"_required":false},{"_name":"prefix","_type":"string","_multiple":true,"_required":false},{"_name":"suffix","_type":"string","_multiple":true,"_required":false},{"_name":"period","_type":"Period","_multiple":false,"_required":false}]},"Identifier":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"use","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/identifier-use","_valueSetStrength":"required"},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/identifier-type","_valueSetStrength":"extensible"},{"_name":"system","_type":"uri","_multiple":false,"_required":false},{"_name":"value","_type":"string","_multiple":false,"_required":false},{"_name":"period","_type":"Period","_multiple":false,"_required":false},{"_name":"assigner","_type":"Reference","_multiple":false,"_required":false}]},"MarketingStatus":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"country","_type":"CodeableConcept","_multiple":false,"_required":true},{"_name":"jurisdiction","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"status","_type":"CodeableConcept","_multiple":false,"_required":true},{"_name":"dateRange","_type":"Period","_multiple":false,"_required":true},{"_name":"restoreDate","_type":"dateTime","_multiple":false,"_required":false}]},"Meta":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"versionId","_type":"id","_multiple":false,"_required":false},{"_name":"lastUpdated","_type":"instant","_multiple":false,"_required":false},{"_name":"source","_type":"uri","_multiple":false,"_required":false},{"_name":"profile","_type":"uri","_multiple":true,"_required":false},{"_name":"security","_type":"Coding","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/security-labels","_valueSetStrength":"extensible"},{"_name":"tag","_type":"Coding","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/common-tags","_valueSetStrength":"example"}]},"Money":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"value","_type":"decimal","_multiple":false,"_required":false},{"_name":"comparator","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/quantity-comparator","_valueSetStrength":"required"},{"_name":"unit","_type":"string","_multiple":false,"_required":false},{"_name":"system","_type":"uri","_multiple":false,"_required":false},{"_name":"code","_type":"code","_multiple":false,"_required":false}]},"Narrative":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/narrative-status","_valueSetStrength":"required"},{"_name":"div","_type":"xhtml","_multiple":false,"_required":true}]},"ParameterDefinition":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"name","_type":"code","_multiple":false,"_required":false},{"_name":"use","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/operation-parameter-use","_valueSetStrength":"required"},{"_name":"min","_type":"integer","_multiple":false,"_required":false},{"_name":"max","_type":"string","_multiple":false,"_required":false},{"_name":"documentation","_type":"string","_multiple":false,"_required":false},{"_name":"type","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/all-types","_valueSetStrength":"required"},{"_name":"profile","_type":"Reference","_multiple":false,"_required":false}]},"Period":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"start","_type":"dateTime","_multiple":false,"_required":false},{"_name":"end","_type":"dateTime","_multiple":false,"_required":false}]},"ProdCharacteristic":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"height","_type":"Quantity","_multiple":false,"_required":false},{"_name":"width","_type":"Quantity","_multiple":false,"_required":false},{"_name":"depth","_type":"Quantity","_multiple":false,"_required":false},{"_name":"weight","_type":"Quantity","_multiple":false,"_required":false},{"_name":"nominalVolume","_type":"Quantity","_multiple":false,"_required":false},{"_name":"externalDiameter","_type":"Quantity","_multiple":false,"_required":false},{"_name":"shape","_type":"string","_multiple":false,"_required":false},{"_name":"color","_type":"string","_multiple":true,"_required":false},{"_name":"imprint","_type":"string","_multiple":true,"_required":false},{"_name":"image","_type":"Attachment","_multiple":true,"_required":false},{"_name":"scoring","_type":"CodeableConcept","_multiple":false,"_required":false}]},"ProductShelfLife":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":true},{"_name":"period","_type":"Quantity","_multiple":false,"_required":true},{"_name":"specialPrecautionsForStorage","_type":"CodeableConcept","_multiple":true,"_required":false}]},"Quantity":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"value","_type":"decimal","_multiple":false,"_required":false},{"_name":"comparator","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/quantity-comparator","_valueSetStrength":"required"},{"_name":"unit","_type":"string","_multiple":false,"_required":false},{"_name":"system","_type":"uri","_multiple":false,"_required":false},{"_name":"code","_type":"code","_multiple":false,"_required":false}]},"Range":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"low","_type":"Quantity","_multiple":false,"_required":false},{"_name":"high","_type":"Quantity","_multiple":false,"_required":false}]},"Ratio":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"numerator","_type":"Quantity","_multiple":false,"_required":false},{"_name":"denominator","_type":"Quantity","_multiple":false,"_required":false}]},"Reference":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"reference","_type":"string","_multiple":false,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"display","_type":"string","_multiple":false,"_required":false}]},"RelatedArtifact":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"type","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/related-artifact-type","_valueSetStrength":"required"},{"_name":"display","_type":"string","_multiple":false,"_required":false},{"_name":"citation","_type":"string","_multiple":false,"_required":false},{"_name":"url","_type":"uri","_multiple":false,"_required":false},{"_name":"document","_type":"Attachment","_multiple":false,"_required":false},{"_name":"resource","_type":"Reference","_multiple":false,"_required":false}]},"SampledData":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"origin","_type":"Quantity","_multiple":false,"_required":true},{"_name":"period","_type":"decimal","_multiple":false,"_required":true},{"_name":"factor","_type":"decimal","_multiple":false,"_required":false},{"_name":"lowerLimit","_type":"decimal","_multiple":false,"_required":false},{"_name":"upperLimit","_type":"decimal","_multiple":false,"_required":false},{"_name":"dimensions","_type":"positiveInt","_multiple":false,"_required":true},{"_name":"data","_type":"string","_multiple":false,"_required":false}]},"Signature":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"type","_type":"Coding","_multiple":true,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/signature-type","_valueSetStrength":"preferred"},{"_name":"when","_type":"instant","_multiple":false,"_required":true},{"_name":"whoUri","_choice":"who","_type":"uri","_multiple":false,"_required":true},{"_name":"whoReference","_choice":"who","_type":"Reference","_multiple":false,"_required":true},{"_name":"whoReference","_choice":"who","_type":"Reference","_multiple":false,"_required":true},{"_name":"whoReference","_choice":"who","_type":"Reference","_multiple":false,"_required":true},{"_name":"whoReference","_choice":"who","_type":"Reference","_multiple":false,"_required":true},{"_name":"whoReference","_choice":"who","_type":"Reference","_multiple":false,"_required":true},{"_name":"onBehalfOfUri","_choice":"onBehalfOf","_type":"uri","_multiple":false,"_required":false},{"_name":"onBehalfOfReference","_choice":"onBehalfOf","_type":"Reference","_multiple":false,"_required":false},{"_name":"onBehalfOfReference","_choice":"onBehalfOf","_type":"Reference","_multiple":false,"_required":false},{"_name":"onBehalfOfReference","_choice":"onBehalfOf","_type":"Reference","_multiple":false,"_required":false},{"_name":"onBehalfOfReference","_choice":"onBehalfOf","_type":"Reference","_multiple":false,"_required":false},{"_name":"onBehalfOfReference","_choice":"onBehalfOf","_type":"Reference","_multiple":false,"_required":false},{"_name":"targetFormat","_type":"code","_multiple":false,"_required":false},{"_name":"sigFormat","_type":"code","_multiple":false,"_required":false},{"_name":"blob","_type":"base64Binary","_multiple":false,"_required":false}]},"SubstanceAmount":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"amountQuantity","_choice":"amount","_type":"Quantity","_multiple":false,"_required":false},{"_name":"amountRange","_choice":"amount","_type":"Range","_multiple":false,"_required":false},{"_name":"amountString","_choice":"amount","_type":"string","_multiple":false,"_required":false},{"_name":"amountType","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"amountText","_type":"string","_multiple":false,"_required":false},{"_name":"referenceRange","_type":"Element","_multiple":false,"_required":false}]},"SubstanceMoiety":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"role","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"name","_type":"string","_multiple":false,"_required":false},{"_name":"stereochemistry","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"opticalActivity","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"molecularFormula","_type":"string","_multiple":false,"_required":false},{"_name":"amount","_type":"SubstanceAmount","_multiple":false,"_required":false}]},"Timing":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"event","_type":"dateTime","_multiple":true,"_required":false},{"_name":"repeat","_type":"Element","_multiple":false,"_required":false},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/timing-abbreviation","_valueSetStrength":"preferred"}]},"TriggerDefinition":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"type","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/trigger-type","_valueSetStrength":"required"},{"_name":"name","_type":"string","_multiple":false,"_required":false},{"_name":"timingTiming","_choice":"timing","_type":"Timing","_multiple":false,"_required":false},{"_name":"timingReference","_choice":"timing","_type":"Reference","_multiple":false,"_required":false},{"_name":"timingDate","_choice":"timing","_type":"date","_multiple":false,"_required":false},{"_name":"timingDateTime","_choice":"timing","_type":"dateTime","_multiple":false,"_required":false},{"_name":"data","_type":"DataRequirement","_multiple":false,"_required":false},{"_name":"condition","_type":"Element","_multiple":false,"_required":false}]},"UsageContext":{"_type":"Resource","_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"code","_type":"Coding","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/usage-context-type","_valueSetStrength":"extensible"},{"_name":"valueCodeableConcept","_choice":"value","_type":"CodeableConcept","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/use-context","_valueSetStrength":"example"},{"_name":"valueQuantity","_choice":"value","_type":"Quantity","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/use-context","_valueSetStrength":"example"},{"_name":"valueRange","_choice":"value","_type":"Range","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/use-context","_valueSetStrength":"example"}]},"SimpleQuantity":{"_type":"Resource","_properties":[{"_name":"ion","_type":"Extension","_multiple":true,"_required":false},{"_name":"ator","_type":"code","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/quantity-comparator","_valueSetStrength":"required"}]},"Resource":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"}]},"Account":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/account-status","_valueSetStrength":"required"},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/account-type","_valueSetStrength":"example"},{"_name":"name","_type":"string","_multiple":false,"_required":false},{"_name":"subject","_type":"Reference","_multiple":false},{"_name":"period","_type":"Period","_multiple":false,"_required":false},{"_name":"active","_type":"Period","_multiple":false,"_required":false},{"_name":"coverage","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"coverage","_type":"Reference","_multiple":false,"_required":true,"_properties":[]},{"_name":"priority","_type":"positiveInt","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"owner","_type":"Reference","_multiple":false,"_required":false},{"_name":"description","_type":"string","_multiple":false,"_required":false},{"_name":"guarantor","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"party","_type":"Reference","_multiple":false,"_required":true},{"_name":"onHold","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"period","_type":"Period","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"partOf","_type":"Reference","_multiple":false,"_required":false}]},"ActivityDefinition":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"url","_type":"uri","_multiple":false,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"version","_type":"string","_multiple":false,"_required":false},{"_name":"name","_type":"string","_multiple":false,"_required":false},{"_name":"title","_type":"string","_multiple":false,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/publication-status","_valueSetStrength":"required"},{"_name":"experimental","_type":"boolean","_multiple":false,"_required":false},{"_name":"date","_type":"dateTime","_multiple":false,"_required":false},{"_name":"publisher","_type":"string","_multiple":false,"_required":false},{"_name":"description","_type":"markdown","_multiple":false,"_required":false},{"_name":"purpose","_type":"markdown","_multiple":false,"_required":false},{"_name":"usage","_type":"string","_multiple":false,"_required":false},{"_name":"approvalDate","_type":"date","_multiple":false,"_required":false},{"_name":"lastReviewDate","_type":"date","_multiple":false,"_required":false},{"_name":"effectivePeriod","_type":"Period","_multiple":false,"_required":false},{"_name":"useContext","_type":"UsageContext","_multiple":true,"_required":false},{"_name":"jurisdiction","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/jurisdiction","_valueSetStrength":"extensible"},{"_name":"topic","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/definition-topic","_valueSetStrength":"example"},{"_name":"contributor","_type":"Contributor","_multiple":true,"_required":false},{"_name":"contact","_type":"ContactDetail","_multiple":true,"_required":false},{"_name":"copyright","_type":"markdown","_multiple":false,"_required":false},{"_name":"relatedArtifact","_type":"RelatedArtifact","_multiple":true,"_required":false},{"_name":"library","_type":"Reference","_multiple":true,"_required":false},{"_name":"kind","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/resource-types","_valueSetStrength":"required"},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/procedure-code","_valueSetStrength":"example"},{"_name":"doNotPerform","_type":"boolean","_multiple":false,"_required":false},{"_name":"timingTiming","_choice":"timing","_type":"Timing","_multiple":false,"_required":false},{"_name":"timingDateTime","_choice":"timing","_type":"dateTime","_multiple":false,"_required":false},{"_name":"timingAge","_choice":"timing","_type":"Age","_multiple":false,"_required":false},{"_name":"timingPeriod","_choice":"timing","_type":"Period","_multiple":false,"_required":false},{"_name":"timingRange","_choice":"timing","_type":"Range","_multiple":false,"_required":false},{"_name":"timingDuration","_choice":"timing","_type":"Duration","_multiple":false,"_required":false},{"_name":"location","_type":"Reference","_multiple":false,"_required":false},{"_name":"participant","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/action-participant-type","_valueSetStrength":"required"},{"_name":"role","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/action-participant-role","_valueSetStrength":"example"}]},{"_name":"productReference","_choice":"product","_type":"Reference","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/medication-codes","_valueSetStrength":"example"},{"_name":"productReference","_choice":"product","_type":"Reference","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/medication-codes","_valueSetStrength":"example"},{"_name":"productCodeableConcept","_choice":"product","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/medication-codes","_valueSetStrength":"example"},{"_name":"quantity","_type":"Quantity","_multiple":false,"_required":false},{"_name":"dosage","_type":"Dosage","_multiple":true,"_required":false},{"_name":"bodySite","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/body-site","_valueSetStrength":"example"},{"_name":"specimenRequirement","_type":"Reference","_multiple":true,"_required":false},{"_name":"transform","_type":"Reference","_multiple":false,"_required":false},{"_name":"dynamicValue","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"path","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"language","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"expression","_type":"string","_multiple":false,"_required":false,"_properties":[]}]}]},"AdverseEvent":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"actuality","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/adverse-event-actuality","_valueSetStrength":"required"},{"_name":"category","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/adverse-event-category","_valueSetStrength":"extensible"},{"_name":"event","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/adverse-event-type","_valueSetStrength":"example"},{"_name":"subject","_type":"Reference","_multiple":false},{"_name":"context","_type":"Reference","_multiple":false},{"_name":"date","_type":"dateTime","_multiple":false,"_required":false},{"_name":"resultingCondition","_type":"Reference","_multiple":true,"_required":false},{"_name":"location","_type":"Reference","_multiple":false,"_required":false},{"_name":"seriousness","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/adverse-event-seriousness","_valueSetStrength":"example"},{"_name":"severity","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/adverse-event-severity","_valueSetStrength":"required"},{"_name":"outcome","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/adverse-event-outcome","_valueSetStrength":"required"},{"_name":"recorder","_type":"Reference","_multiple":false},{"_name":"contributor","_type":"Reference","_multiple":true},{"_name":"suspectEntity","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"instance","_type":"Reference","_multiple":false,"_required":true},{"_name":"causality","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"assessment","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/adverse-event-causality-assess","_valueSetStrength":"example"},{"_name":"productRelatedness","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"author","_type":"Reference","_multiple":false,"_required":false},{"_name":"method","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/adverse-event-causality-method","_valueSetStrength":"example"}]}]},{"_name":"subjectMedicalHistory","_type":"Reference","_multiple":true},{"_name":"referenceDocument","_type":"Reference","_multiple":true,"_required":false},{"_name":"study","_type":"Reference","_multiple":true,"_required":false}]},"AllergyIntolerance":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"clinicalStatus","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/allergy-clinical-status","_valueSetStrength":"required"},{"_name":"verificationStatus","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/allergy-verification-status","_valueSetStrength":"required"},{"_name":"type","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/allergy-intolerance-type","_valueSetStrength":"required"},{"_name":"category","_type":"code","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/allergy-intolerance-category","_valueSetStrength":"required"},{"_name":"criticality","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/allergy-intolerance-criticality","_valueSetStrength":"required"},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/allergyintolerance-code","_valueSetStrength":"example"},{"_name":"patient","_type":"Reference","_multiple":false,"_required":true},{"_name":"encounter","_type":"Reference","_multiple":false,"_required":false},{"_name":"onsetDateTime","_choice":"onset","_type":"dateTime","_multiple":false,"_required":false},{"_name":"onsetAge","_choice":"onset","_type":"Age","_multiple":false,"_required":false},{"_name":"onsetPeriod","_choice":"onset","_type":"Period","_multiple":false,"_required":false},{"_name":"onsetRange","_choice":"onset","_type":"Range","_multiple":false,"_required":false},{"_name":"onsetString","_choice":"onset","_type":"string","_multiple":false,"_required":false},{"_name":"assertedDate","_type":"dateTime","_multiple":false,"_required":false},{"_name":"recorder","_type":"Reference","_multiple":false},{"_name":"asserter","_type":"Reference","_multiple":false},{"_name":"lastOccurrence","_type":"dateTime","_multiple":false,"_required":false},{"_name":"note","_type":"Annotation","_multiple":true,"_required":false},{"_name":"reaction","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"substance","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/substance-code","_valueSetStrength":"example"},{"_name":"manifestation","_type":"CodeableConcept","_multiple":true,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/clinical-findings","_valueSetStrength":"example"},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"onset","_type":"dateTime","_multiple":false,"_required":false,"_properties":[]},{"_name":"severity","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/reaction-event-severity","_valueSetStrength":"required"},{"_name":"exposureRoute","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/route-codes","_valueSetStrength":"example"},{"_name":"note","_type":"Annotation","_multiple":true,"_required":false,"_properties":[]}]}]},"Appointment":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/appointmentstatus","_valueSetStrength":"required"},{"_name":"serviceCategory","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/service-category","_valueSetStrength":"example"},{"_name":"serviceType","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/service-type","_valueSetStrength":"example"},{"_name":"specialty","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/c80-practice-codes","_valueSetStrength":"preferred"},{"_name":"appointmentType","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/v2-0276","_valueSetStrength":"preferred"},{"_name":"reason","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/encounter-reason","_valueSetStrength":"preferred"},{"_name":"indication","_type":"Reference","_multiple":true},{"_name":"priority","_type":"unsignedInt","_multiple":false,"_required":false},{"_name":"description","_type":"string","_multiple":false,"_required":false},{"_name":"supportingInformation","_type":"Reference","_multiple":true,"_required":false},{"_name":"start","_type":"instant","_multiple":false,"_required":false},{"_name":"end","_type":"instant","_multiple":false,"_required":false},{"_name":"minutesDuration","_type":"positiveInt","_multiple":false,"_required":false},{"_name":"slot","_type":"Reference","_multiple":true,"_required":false},{"_name":"created","_type":"dateTime","_multiple":false,"_required":false},{"_name":"comment","_type":"string","_multiple":false,"_required":false},{"_name":"patientInstruction","_type":"string","_multiple":false,"_required":false},{"_name":"incomingReferral","_type":"Reference","_multiple":true,"_required":false},{"_name":"participant","_type":"BackboneElement","_multiple":true,"_required":true,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/encounter-participant-type","_valueSetStrength":"extensible"},{"_name":"actor","_type":"Reference","_multiple":false,"_required":false},{"_name":"required","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/participantrequired","_valueSetStrength":"required"},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/participationstatus","_valueSetStrength":"required"}]},{"_name":"requestedPeriod","_type":"Period","_multiple":true,"_required":false}]},"AppointmentResponse":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"appointment","_type":"Reference","_multiple":false,"_required":true},{"_name":"start","_type":"instant","_multiple":false,"_required":false},{"_name":"end","_type":"instant","_multiple":false,"_required":false},{"_name":"participantType","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/encounter-participant-type","_valueSetStrength":"extensible"},{"_name":"actor","_type":"Reference","_multiple":false},{"_name":"participantStatus","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/participationstatus","_valueSetStrength":"required"},{"_name":"comment","_type":"string","_multiple":false,"_required":false}]},"AuditEvent":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"type","_type":"Coding","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/audit-event-type","_valueSetStrength":"extensible"},{"_name":"subtype","_type":"Coding","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/audit-event-sub-type","_valueSetStrength":"extensible"},{"_name":"action","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/audit-event-action","_valueSetStrength":"required"},{"_name":"period","_type":"Period","_multiple":false,"_required":false},{"_name":"recorded","_type":"instant","_multiple":false,"_required":true},{"_name":"outcome","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/audit-event-outcome","_valueSetStrength":"required"},{"_name":"outcomeDesc","_type":"string","_multiple":false,"_required":false},{"_name":"purposeOfEvent","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/v3-PurposeOfUse","_valueSetStrength":"extensible"},{"_name":"agent","_type":"BackboneElement","_multiple":true,"_required":true,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/participation-role-type","_valueSetStrength":"extensible"},{"_name":"role","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/security-role-type","_valueSetStrength":"example"},{"_name":"reference","_type":"Reference","_multiple":false,"_required":false},{"_name":"userId","_type":"Identifier","_multiple":false,"_required":false,"_properties":[]},{"_name":"altId","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"name","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"requestor","_type":"boolean","_multiple":false,"_required":true,"_properties":[]},{"_name":"location","_type":"Reference","_multiple":false,"_required":false,"_properties":[]},{"_name":"policy","_type":"uri","_multiple":true,"_required":false,"_properties":[]},{"_name":"media","_type":"Coding","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/dicm-405-mediatype","_valueSetStrength":"extensible"},{"_name":"network","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"address","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"type","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/network-type","_valueSetStrength":"required"}]},{"_name":"purposeOfUse","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/v3-PurposeOfUse","_valueSetStrength":"extensible"}]},{"_name":"source","_type":"BackboneElement","_multiple":false,"_required":true,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"site","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":true,"_properties":[]},{"_name":"type","_type":"Coding","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/audit-source-type","_valueSetStrength":"extensible"}]},{"_name":"entity","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false,"_properties":[]},{"_name":"reference","_type":"Reference","_multiple":false,"_required":false,"_properties":[]},{"_name":"type","_type":"Coding","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/audit-entity-type","_valueSetStrength":"extensible"},{"_name":"role","_type":"Coding","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/object-role","_valueSetStrength":"extensible"},{"_name":"lifecycle","_type":"Coding","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/object-lifecycle-events","_valueSetStrength":"extensible"},{"_name":"securityLabel","_type":"Coding","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/security-labels","_valueSetStrength":"extensible"},{"_name":"name","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"query","_type":"base64Binary","_multiple":false,"_required":false,"_properties":[]},{"_name":"detail","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"valueString","_choice":"value[x]","_type":"string","_multiple":false,"_required":true},{"_name":"valueBase64Binary","_choice":"value[x]","_type":"base64Binary","_multiple":false,"_required":true}]}]}]},"Basic":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/basic-resource-type","_valueSetStrength":"example"},{"_name":"subject","_type":"Reference","_multiple":false,"_required":false},{"_name":"created","_type":"date","_multiple":false,"_required":false},{"_name":"author","_type":"Reference","_multiple":false}]},"Binary":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"contentType","_type":"code","_multiple":false,"_required":true},{"_name":"securityContext","_type":"Reference","_multiple":false,"_required":false},{"_name":"content","_type":"base64Binary","_multiple":false,"_required":true}]},"BiologicallyDerivedProduct":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"productCategory","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/product-category","_valueSetStrength":"required"},{"_name":"productCode","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/product-status","_valueSetStrength":"required"},{"_name":"request","_type":"Reference","_multiple":true,"_required":false},{"_name":"quantity","_type":"integer","_multiple":false,"_required":false},{"_name":"parent","_type":"Reference","_multiple":false,"_required":false},{"_name":"collection","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"collector","_type":"Reference","_multiple":false,"_required":false},{"_name":"source","_type":"Reference","_multiple":false,"_required":false},{"_name":"collectedDateTime","_choice":"collected[x]","_type":"dateTime","_multiple":false,"_required":false},{"_name":"collectedPeriod","_choice":"collected[x]","_type":"Period","_multiple":false,"_required":false}]},{"_name":"processing","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"procedure","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/procedure-code","_valueSetStrength":"example"},{"_name":"additive","_type":"Reference","_multiple":false,"_required":false,"_properties":[]},{"_name":"timeDateTime","_choice":"time[x]","_type":"dateTime","_multiple":false,"_required":false},{"_name":"timePeriod","_choice":"time[x]","_type":"Period","_multiple":false,"_required":false}]},{"_name":"manipulation","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"timeDateTime","_choice":"time[x]","_type":"dateTime","_multiple":false,"_required":false},{"_name":"timePeriod","_choice":"time[x]","_type":"Period","_multiple":false,"_required":false}]},{"_name":"storage","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"temperature","_type":"decimal","_multiple":false,"_required":false,"_properties":[]},{"_name":"scale","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/product-storage-scale","_valueSetStrength":"required"},{"_name":"duration","_type":"Period","_multiple":false,"_required":false,"_properties":[]}]}]},"BodyStructure":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"active","_type":"boolean","_multiple":false,"_required":false},{"_name":"morphology","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/bodystructure-code","_valueSetStrength":"example"},{"_name":"location","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/body-site","_valueSetStrength":"example"},{"_name":"locationQualifier","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/bodystructure-relative-location","_valueSetStrength":"example"},{"_name":"description","_type":"string","_multiple":false,"_required":false},{"_name":"image","_type":"Attachment","_multiple":true,"_required":false},{"_name":"patient","_type":"Reference","_multiple":false,"_required":true}]},"Bundle":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"type","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/bundle-type","_valueSetStrength":"required"},{"_name":"timestamp","_type":"instant","_multiple":false,"_required":false},{"_name":"total","_type":"unsignedInt","_multiple":false,"_required":false},{"_name":"link","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"relation","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"url","_type":"uri","_multiple":false,"_required":true,"_properties":[]}]},{"_name":"entry","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"link","_type":"#Bundle.link","_multiple":true,"_required":false},{"_name":"fullUrl","_type":"uri","_multiple":false,"_required":false,"_properties":[]},{"_name":"resource","_type":"Resource","_multiple":false,"_required":false,"_properties":[]},{"_name":"search","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"mode","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/search-entry-mode","_valueSetStrength":"required"},{"_name":"score","_type":"decimal","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"request","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"method","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/http-verb","_valueSetStrength":"required"},{"_name":"url","_type":"uri","_multiple":false,"_required":true,"_properties":[]},{"_name":"ifNoneMatch","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"ifModifiedSince","_type":"instant","_multiple":false,"_required":false,"_properties":[]},{"_name":"ifMatch","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"ifNoneExist","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"response","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"status","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"location","_type":"uri","_multiple":false,"_required":false,"_properties":[]},{"_name":"etag","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"lastModified","_type":"instant","_multiple":false,"_required":false,"_properties":[]},{"_name":"outcome","_type":"Resource","_multiple":false,"_required":false,"_properties":[]}]}]},{"_name":"signature","_type":"Signature","_multiple":false,"_required":false}]},"CapabilityStatement":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"url","_type":"uri","_multiple":false,"_required":false},{"_name":"version","_type":"string","_multiple":false,"_required":false},{"_name":"name","_type":"string","_multiple":false,"_required":false},{"_name":"title","_type":"string","_multiple":false,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/publication-status","_valueSetStrength":"required"},{"_name":"experimental","_type":"boolean","_multiple":false,"_required":false},{"_name":"date","_type":"dateTime","_multiple":false,"_required":true},{"_name":"publisher","_type":"string","_multiple":false,"_required":false},{"_name":"contact","_type":"ContactDetail","_multiple":true,"_required":false},{"_name":"description","_type":"markdown","_multiple":false,"_required":false},{"_name":"useContext","_type":"UsageContext","_multiple":true,"_required":false},{"_name":"jurisdiction","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/jurisdiction","_valueSetStrength":"extensible"},{"_name":"purpose","_type":"markdown","_multiple":false,"_required":false},{"_name":"copyright","_type":"markdown","_multiple":false,"_required":false},{"_name":"kind","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/capability-statement-kind","_valueSetStrength":"required"},{"_name":"instantiates","_type":"uri","_multiple":true,"_required":false},{"_name":"software","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"name","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"version","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"releaseDate","_type":"dateTime","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"implementation","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"description","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"url","_type":"uri","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"fhirVersion","_type":"id","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/fhir-versions","_valueSetStrength":"required"},{"_name":"acceptUnknown","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/unknown-content-code","_valueSetStrength":"required"},{"_name":"format","_type":"code","_multiple":true,"_required":true},{"_name":"patchFormat","_type":"code","_multiple":true,"_required":false},{"_name":"implementationGuide","_type":"uri","_multiple":true,"_required":false},{"_name":"rest","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"mode","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/restful-capability-mode","_valueSetStrength":"required"},{"_name":"documentation","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"security","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"cors","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"service","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/restful-security-service","_valueSetStrength":"extensible"},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"certificate","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"code","_multiple":false,"_required":false,"_properties":[]},{"_name":"blob","_type":"base64Binary","_multiple":false,"_required":false,"_properties":[]}]}]},{"_name":"resource","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/resource-types","_valueSetStrength":"required"},{"_name":"profile","_type":"Reference","_multiple":false,"_required":false,"_properties":[]},{"_name":"supportedProfile","_type":"Reference","_multiple":true,"_required":false,"_properties":[]},{"_name":"documentation","_type":"markdown","_multiple":false,"_required":false,"_properties":[]},{"_name":"interaction","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/type-restful-interaction","_valueSetStrength":"required"},{"_name":"documentation","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"versioning","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/versioning-policy","_valueSetStrength":"required"},{"_name":"readHistory","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"updateCreate","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"conditionalCreate","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"conditionalRead","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/conditional-read-status","_valueSetStrength":"required"},{"_name":"conditionalUpdate","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"conditionalDelete","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/conditional-delete-status","_valueSetStrength":"required"},{"_name":"referencePolicy","_type":"code","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/reference-handling-policy","_valueSetStrength":"required"},{"_name":"searchInclude","_type":"string","_multiple":true,"_required":false,"_properties":[]},{"_name":"searchRevInclude","_type":"string","_multiple":true,"_required":false,"_properties":[]},{"_name":"searchParam","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"name","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"definition","_type":"uri","_multiple":false,"_required":false,"_properties":[]},{"_name":"type","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/search-param-type","_valueSetStrength":"required"},{"_name":"documentation","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"operation","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"name","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"definition","_type":"Reference","_multiple":false,"_required":true,"_properties":[]},{"_name":"documentation","_type":"markdown","_multiple":false,"_required":false,"_properties":[]}]}]},{"_name":"interaction","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/system-restful-interaction","_valueSetStrength":"required"},{"_name":"documentation","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"searchParam","_type":"#CapabilityStatement.rest.resource.searchParam","_multiple":true,"_required":false},{"_name":"operation","_type":"#CapabilityStatement.rest.resource.operation","_multiple":true,"_required":false},{"_name":"compartment","_type":"uri","_multiple":true,"_required":false,"_properties":[]}]},{"_name":"messaging","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"endpoint","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"protocol","_type":"Coding","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/message-transport","_valueSetStrength":"extensible"},{"_name":"address","_type":"uri","_multiple":false,"_required":true,"_properties":[]}]},{"_name":"reliableCache","_type":"unsignedInt","_multiple":false,"_required":false,"_properties":[]},{"_name":"documentation","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"supportedMessage","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"mode","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/event-capability-mode","_valueSetStrength":"required"},{"_name":"definition","_type":"Reference","_multiple":false,"_required":true,"_properties":[]}]}]},{"_name":"document","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"mode","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/document-mode","_valueSetStrength":"required"},{"_name":"documentation","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"profile","_type":"Reference","_multiple":false,"_required":true,"_properties":[]}]}]},"CarePlan":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"instantiates","_type":"uri","_multiple":true,"_required":false},{"_name":"basedOn","_type":"Reference","_multiple":true,"_required":false},{"_name":"replaces","_type":"Reference","_multiple":true,"_required":false},{"_name":"partOf","_type":"Reference","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/care-plan-status","_valueSetStrength":"required"},{"_name":"intent","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/care-plan-intent","_valueSetStrength":"required"},{"_name":"category","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/care-plan-category","_valueSetStrength":"example"},{"_name":"title","_type":"string","_multiple":false,"_required":false},{"_name":"description","_type":"string","_multiple":false,"_required":false},{"_name":"subject","_type":"Reference","_multiple":false},{"_name":"context","_type":"Reference","_multiple":false},{"_name":"period","_type":"Period","_multiple":false,"_required":false},{"_name":"author","_type":"Reference","_multiple":true},{"_name":"careTeam","_type":"Reference","_multiple":true,"_required":false},{"_name":"addresses","_type":"Reference","_multiple":true,"_required":false},{"_name":"supportingInfo","_type":"Reference","_multiple":true,"_required":false},{"_name":"goal","_type":"Reference","_multiple":true,"_required":false},{"_name":"activity","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"outcomeCodeableConcept","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/care-plan-activity-outcome","_valueSetStrength":"example"},{"_name":"outcomeReference","_type":"Reference","_multiple":true,"_required":false,"_properties":[]},{"_name":"progress","_type":"Annotation","_multiple":true,"_required":false,"_properties":[]},{"_name":"reference","_type":"Reference","_multiple":false,"_required":false},{"_name":"detail","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"kind","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/care-plan-activity-kind","_valueSetStrength":"required"},{"_name":"instantiates","_type":"uri","_multiple":false,"_required":false,"_properties":[]},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/procedure-code","_valueSetStrength":"example"},{"_name":"reasonCode","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/clinical-findings","_valueSetStrength":"example"},{"_name":"reasonReference","_type":"Reference","_multiple":true,"_required":false},{"_name":"goal","_type":"Reference","_multiple":true,"_required":false,"_properties":[]},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/care-plan-activity-status","_valueSetStrength":"required"},{"_name":"statusReason","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"prohibited","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"scheduledTiming","_choice":"scheduled[x]","_type":"Timing","_multiple":false,"_required":false},{"_name":"scheduledPeriod","_choice":"scheduled[x]","_type":"Period","_multiple":false,"_required":false},{"_name":"scheduledString","_choice":"scheduled[x]","_type":"string","_multiple":false,"_required":false},{"_name":"location","_type":"Reference","_multiple":false,"_required":false,"_properties":[]},{"_name":"performer","_type":"Reference","_multiple":true,"_required":false},{"_name":"productCodeableConcept","_choice":"product[x]","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/medication-codes","_valueSetStrength":"example"},{"_name":"productReference","_choice":"product[x]","_type":"Reference","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/medication-codes","_valueSetStrength":"example"},{"_name":"productReference","_choice":"product[x]","_type":"Reference","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/medication-codes","_valueSetStrength":"example"},{"_name":"dailyAmount","_type":"Quantity","_multiple":false,"_required":false,"_properties":[]},{"_name":"quantity","_type":"Quantity","_multiple":false,"_required":false,"_properties":[]},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]}]}]},{"_name":"note","_type":"Annotation","_multiple":true,"_required":false}]},"CareTeam":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/care-team-status","_valueSetStrength":"required"},{"_name":"category","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/care-team-category","_valueSetStrength":"example"},{"_name":"name","_type":"string","_multiple":false,"_required":false},{"_name":"subject","_type":"Reference","_multiple":false},{"_name":"context","_type":"Reference","_multiple":false},{"_name":"period","_type":"Period","_multiple":false,"_required":false},{"_name":"participant","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"role","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/participant-role","_valueSetStrength":"example"},{"_name":"member","_type":"Reference","_multiple":false,"_required":false},{"_name":"onBehalfOf","_type":"Reference","_multiple":false,"_required":false,"_properties":[]},{"_name":"period","_type":"Period","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"reasonCode","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/clinical-findings","_valueSetStrength":"example"},{"_name":"reasonReference","_type":"Reference","_multiple":true,"_required":false},{"_name":"managingOrganization","_type":"Reference","_multiple":true,"_required":false},{"_name":"telecom","_type":"ContactPoint","_multiple":true,"_required":false},{"_name":"note","_type":"Annotation","_multiple":true,"_required":false}]},"ChargeItem":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"definition","_type":"uri","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/chargeitem-status","_valueSetStrength":"required"},{"_name":"partOf","_type":"Reference","_multiple":true,"_required":false},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/chargeitem-billingcodes","_valueSetStrength":"example"},{"_name":"subject","_type":"Reference","_multiple":false},{"_name":"context","_type":"Reference","_multiple":false},{"_name":"occurrenceDateTime","_choice":"occurrence","_type":"dateTime","_multiple":false,"_required":false},{"_name":"occurrencePeriod","_choice":"occurrence","_type":"Period","_multiple":false,"_required":false},{"_name":"occurrenceTiming","_choice":"occurrence","_type":"Timing","_multiple":false,"_required":false},{"_name":"participant","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"role","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/performer-role","_valueSetStrength":"example"},{"_name":"actor","_type":"Reference","_multiple":false,"_required":true}]},{"_name":"performingOrganization","_type":"Reference","_multiple":false,"_required":false},{"_name":"requestingOrganization","_type":"Reference","_multiple":false,"_required":false},{"_name":"quantity","_type":"Quantity","_multiple":false,"_required":false},{"_name":"bodysite","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/body-site","_valueSetStrength":"example"},{"_name":"factorOverride","_type":"decimal","_multiple":false,"_required":false},{"_name":"priceOverride","_type":"Money","_multiple":false,"_required":false},{"_name":"overrideReason","_type":"string","_multiple":false,"_required":false},{"_name":"enterer","_type":"Reference","_multiple":false},{"_name":"enteredDate","_type":"dateTime","_multiple":false,"_required":false},{"_name":"reason","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/icd-10","_valueSetStrength":"example"},{"_name":"service","_type":"Reference","_multiple":true},{"_name":"account","_type":"Reference","_multiple":true,"_required":false},{"_name":"note","_type":"Annotation","_multiple":true,"_required":false},{"_name":"supportingInformation","_type":"Reference","_multiple":true,"_required":false}]},"Claim":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/fm-status","_valueSetStrength":"required"},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/claim-type","_valueSetStrength":"extensible"},{"_name":"subType","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/claim-subtype","_valueSetStrength":"example"},{"_name":"use","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/claim-use","_valueSetStrength":"required"},{"_name":"patient","_type":"Reference","_multiple":false,"_required":false},{"_name":"billablePeriod","_type":"Period","_multiple":false,"_required":false},{"_name":"created","_type":"dateTime","_multiple":false,"_required":false},{"_name":"enterer","_type":"Reference","_multiple":false,"_required":false},{"_name":"insurer","_type":"Reference","_multiple":false,"_required":false},{"_name":"provider","_type":"Reference","_multiple":false,"_required":false},{"_name":"organization","_type":"Reference","_multiple":false,"_required":false},{"_name":"priority","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/process-priority","_valueSetStrength":"example"},{"_name":"fundsReserve","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/fundsreserve","_valueSetStrength":"example"},{"_name":"related","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"claim","_type":"Reference","_multiple":false,"_required":false,"_properties":[]},{"_name":"relationship","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/related-claim-relationship","_valueSetStrength":"example"},{"_name":"reference","_type":"Identifier","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"prescription","_type":"Reference","_multiple":false},{"_name":"originalPrescription","_type":"Reference","_multiple":false,"_required":false},{"_name":"payee","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/payeetype","_valueSetStrength":"example"},{"_name":"resource","_type":"Coding","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/ex-payee-resource-type","_valueSetStrength":"extensible"},{"_name":"party","_type":"Reference","_multiple":false,"_required":false}]},{"_name":"referral","_type":"Reference","_multiple":false,"_required":false},{"_name":"facility","_type":"Reference","_multiple":false,"_required":false},{"_name":"careTeam","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"sequence","_type":"positiveInt","_multiple":false,"_required":true,"_properties":[]},{"_name":"provider","_type":"Reference","_multiple":false,"_required":true},{"_name":"responsible","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"role","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/claim-careteamrole","_valueSetStrength":"example"},{"_name":"qualification","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/provider-qualification","_valueSetStrength":"example"}]},{"_name":"information","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"sequence","_type":"positiveInt","_multiple":false,"_required":true,"_properties":[]},{"_name":"category","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/claim-informationcategory","_valueSetStrength":"example"},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/claim-exception","_valueSetStrength":"example"},{"_name":"timingDate","_choice":"timing[x]","_type":"date","_multiple":false,"_required":false},{"_name":"timingPeriod","_choice":"timing[x]","_type":"Period","_multiple":false,"_required":false},{"_name":"valueString","_choice":"value[x]","_type":"string","_multiple":false,"_required":false},{"_name":"valueQuantity","_choice":"value[x]","_type":"Quantity","_multiple":false,"_required":false},{"_name":"valueAttachment","_choice":"value[x]","_type":"Attachment","_multiple":false,"_required":false},{"_name":"valueReference","_choice":"value[x]","_type":"Reference","_multiple":false,"_required":false},{"_name":"reason","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/missing-tooth-reason","_valueSetStrength":"example"}]},{"_name":"diagnosis","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"sequence","_type":"positiveInt","_multiple":false,"_required":true,"_properties":[]},{"_name":"diagnosisCodeableConcept","_choice":"diagnosis[x]","_type":"CodeableConcept","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/icd-10","_valueSetStrength":"example"},{"_name":"diagnosisReference","_choice":"diagnosis[x]","_type":"Reference","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/icd-10","_valueSetStrength":"example"},{"_name":"type","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/ex-diagnosistype","_valueSetStrength":"example"},{"_name":"packageCode","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/ex-diagnosisrelatedgroup","_valueSetStrength":"example"}]},{"_name":"procedure","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"sequence","_type":"positiveInt","_multiple":false,"_required":true,"_properties":[]},{"_name":"date","_type":"dateTime","_multiple":false,"_required":false,"_properties":[]},{"_name":"procedureCodeableConcept","_choice":"procedure[x]","_type":"CodeableConcept","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/icd-10-procedures","_valueSetStrength":"example"},{"_name":"procedureReference","_choice":"procedure[x]","_type":"Reference","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/icd-10-procedures","_valueSetStrength":"example"}]},{"_name":"insurance","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"sequence","_type":"positiveInt","_multiple":false,"_required":true,"_properties":[]},{"_name":"focal","_type":"boolean","_multiple":false,"_required":true,"_properties":[]},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false,"_properties":[]},{"_name":"coverage","_type":"Reference","_multiple":false,"_required":true,"_properties":[]},{"_name":"businessArrangement","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"preAuthRef","_type":"string","_multiple":true,"_required":false,"_properties":[]},{"_name":"claimResponse","_type":"Reference","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"accident","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"date","_type":"date","_multiple":false,"_required":true,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/v3-ActIncidentCode","_valueSetStrength":"extensible"},{"_name":"locationAddress","_choice":"location[x]","_type":"Address","_multiple":false,"_required":false},{"_name":"locationReference","_choice":"location[x]","_type":"Reference","_multiple":false,"_required":false}]},{"_name":"employmentImpacted","_type":"Period","_multiple":false,"_required":false},{"_name":"hospitalization","_type":"Period","_multiple":false,"_required":false},{"_name":"item","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"sequence","_type":"positiveInt","_multiple":false,"_required":true,"_properties":[]},{"_name":"careTeamSequence","_type":"positiveInt","_multiple":true,"_required":false,"_properties":[]},{"_name":"diagnosisSequence","_type":"positiveInt","_multiple":true,"_required":false,"_properties":[]},{"_name":"procedureSequence","_type":"positiveInt","_multiple":true,"_required":false,"_properties":[]},{"_name":"informationSequence","_type":"positiveInt","_multiple":true,"_required":false,"_properties":[]},{"_name":"revenue","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/ex-revenue-center","_valueSetStrength":"example"},{"_name":"category","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/benefit-subcategory","_valueSetStrength":"example"},{"_name":"service","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/service-uscls","_valueSetStrength":"example"},{"_name":"modifier","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/claim-modifiers","_valueSetStrength":"example"},{"_name":"programCode","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/ex-program-code","_valueSetStrength":"example"},{"_name":"servicedDate","_choice":"serviced[x]","_type":"date","_multiple":false,"_required":false},{"_name":"servicedPeriod","_choice":"serviced[x]","_type":"Period","_multiple":false,"_required":false},{"_name":"locationCodeableConcept","_choice":"location[x]","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/service-place","_valueSetStrength":"example"},{"_name":"locationAddress","_choice":"location[x]","_type":"Address","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/service-place","_valueSetStrength":"example"},{"_name":"locationReference","_choice":"location[x]","_type":"Reference","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/service-place","_valueSetStrength":"example"},{"_name":"quantity","_type":"Quantity","_multiple":false,"_required":false,"_properties":[]},{"_name":"unitPrice","_type":"Money","_multiple":false,"_required":false,"_properties":[]},{"_name":"factor","_type":"decimal","_multiple":false,"_required":false,"_properties":[]},{"_name":"net","_type":"Money","_multiple":false,"_required":false,"_properties":[]},{"_name":"udi","_type":"Reference","_multiple":true,"_required":false,"_properties":[]},{"_name":"bodySite","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/tooth","_valueSetStrength":"example"},{"_name":"subSite","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/surface","_valueSetStrength":"example"},{"_name":"encounter","_type":"Reference","_multiple":true,"_required":false,"_properties":[]},{"_name":"detail","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"sequence","_type":"positiveInt","_multiple":false,"_required":true,"_properties":[]},{"_name":"revenue","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/ex-revenue-center","_valueSetStrength":"example"},{"_name":"category","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/benefit-subcategory","_valueSetStrength":"example"},{"_name":"service","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/service-uscls","_valueSetStrength":"example"},{"_name":"modifier","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/claim-modifiers","_valueSetStrength":"example"},{"_name":"programCode","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/ex-program-code","_valueSetStrength":"example"},{"_name":"quantity","_type":"Quantity","_multiple":false,"_required":false,"_properties":[]},{"_name":"unitPrice","_type":"Money","_multiple":false,"_required":false,"_properties":[]},{"_name":"factor","_type":"decimal","_multiple":false,"_required":false,"_properties":[]},{"_name":"net","_type":"Money","_multiple":false,"_required":false,"_properties":[]},{"_name":"udi","_type":"Reference","_multiple":true,"_required":false,"_properties":[]},{"_name":"subDetail","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"sequence","_type":"positiveInt","_multiple":false,"_required":true,"_properties":[]},{"_name":"revenue","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/ex-revenue-center","_valueSetStrength":"example"},{"_name":"category","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/benefit-subcategory","_valueSetStrength":"example"},{"_name":"service","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/service-uscls","_valueSetStrength":"example"},{"_name":"modifier","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/claim-modifiers","_valueSetStrength":"example"},{"_name":"programCode","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/ex-program-code","_valueSetStrength":"example"},{"_name":"quantity","_type":"Quantity","_multiple":false,"_required":false,"_properties":[]},{"_name":"unitPrice","_type":"Money","_multiple":false,"_required":false,"_properties":[]},{"_name":"factor","_type":"decimal","_multiple":false,"_required":false,"_properties":[]},{"_name":"net","_type":"Money","_multiple":false,"_required":false,"_properties":[]},{"_name":"udi","_type":"Reference","_multiple":true,"_required":false,"_properties":[]}]}]}]},{"_name":"total","_type":"Money","_multiple":false,"_required":false}]},"ClaimResponse":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/fm-status","_valueSetStrength":"required"},{"_name":"patient","_type":"Reference","_multiple":false,"_required":false},{"_name":"created","_type":"dateTime","_multiple":false,"_required":false},{"_name":"insurer","_type":"Reference","_multiple":false,"_required":false},{"_name":"requestProvider","_type":"Reference","_multiple":false,"_required":false},{"_name":"requestOrganization","_type":"Reference","_multiple":false,"_required":false},{"_name":"request","_type":"Reference","_multiple":false,"_required":false},{"_name":"outcome","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/remittance-outcome","_valueSetStrength":"required"},{"_name":"disposition","_type":"string","_multiple":false,"_required":false},{"_name":"payeeType","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/payeetype","_valueSetStrength":"example"},{"_name":"item","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"itemSequence","_type":"positiveInt","_multiple":false,"_required":true,"_properties":[]},{"_name":"noteNumber","_type":"positiveInt","_multiple":true,"_required":false,"_properties":[]},{"_name":"adjudication","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"category","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/adjudication","_valueSetStrength":"example"},{"_name":"reason","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/adjudication-reason","_valueSetStrength":"example"},{"_name":"amount","_type":"Money","_multiple":false,"_required":false,"_properties":[]},{"_name":"value","_type":"decimal","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"detail","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"detailSequence","_type":"positiveInt","_multiple":false,"_required":true,"_properties":[]},{"_name":"noteNumber","_type":"positiveInt","_multiple":true,"_required":false,"_properties":[]},{"_name":"adjudication","_type":"#ClaimResponse.item.adjudication","_multiple":true,"_required":false},{"_name":"subDetail","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"subDetailSequence","_type":"positiveInt","_multiple":false,"_required":true,"_properties":[]},{"_name":"noteNumber","_type":"positiveInt","_multiple":true,"_required":false,"_properties":[]},{"_name":"adjudication","_type":"#ClaimResponse.item.adjudication","_multiple":true,"_required":false}]}]}]},{"_name":"addItem","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"itemSequence","_type":"positiveInt","_multiple":true,"_required":false,"_properties":[]},{"_name":"detailSequence","_type":"positiveInt","_multiple":true,"_required":false,"_properties":[]},{"_name":"subdetailSequence","_type":"positiveInt","_multiple":true,"_required":false,"_properties":[]},{"_name":"service","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/service-uscls","_valueSetStrength":"example"},{"_name":"modifier","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/claim-modifiers","_valueSetStrength":"example"},{"_name":"fee","_type":"Money","_multiple":false,"_required":false,"_properties":[]},{"_name":"noteNumber","_type":"positiveInt","_multiple":true,"_required":false,"_properties":[]},{"_name":"adjudication","_type":"#ClaimResponse.item.adjudication","_multiple":true,"_required":false}]},{"_name":"error","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"itemSequence","_type":"positiveInt","_multiple":false,"_required":false,"_properties":[]},{"_name":"detailSequence","_type":"positiveInt","_multiple":false,"_required":false,"_properties":[]},{"_name":"subDetailSequence","_type":"positiveInt","_multiple":false,"_required":false,"_properties":[]},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/adjudication-error","_valueSetStrength":"example"}]},{"_name":"totalCost","_type":"Money","_multiple":false,"_required":false},{"_name":"unallocDeductable","_type":"Money","_multiple":false,"_required":false},{"_name":"totalBenefit","_type":"Money","_multiple":false,"_required":false},{"_name":"payment","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/ex-paymenttype","_valueSetStrength":"example"},{"_name":"adjustment","_type":"Money","_multiple":false,"_required":false,"_properties":[]},{"_name":"adjustmentReason","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/payment-adjustment-reason","_valueSetStrength":"example"},{"_name":"date","_type":"date","_multiple":false,"_required":false,"_properties":[]},{"_name":"amount","_type":"Money","_multiple":false,"_required":false,"_properties":[]},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"reserved","_type":"Coding","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/fundsreserve","_valueSetStrength":"example"},{"_name":"form","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/forms","_valueSetStrength":"example"},{"_name":"processNote","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"number","_type":"positiveInt","_multiple":false,"_required":false,"_properties":[]},{"_name":"type","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/note-type","_valueSetStrength":"required"},{"_name":"text","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"language","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"}]},{"_name":"communicationRequest","_type":"Reference","_multiple":true,"_required":false},{"_name":"insurance","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"sequence","_type":"positiveInt","_multiple":false,"_required":true,"_properties":[]},{"_name":"focal","_type":"boolean","_multiple":false,"_required":true,"_properties":[]},{"_name":"coverage","_type":"Reference","_multiple":false,"_required":true,"_properties":[]},{"_name":"businessArrangement","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"preAuthRef","_type":"string","_multiple":true,"_required":false,"_properties":[]},{"_name":"claimResponse","_type":"Reference","_multiple":false,"_required":false,"_properties":[]}]}]},"ClinicalImpression":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/clinical-impression-status","_valueSetStrength":"required"},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"description","_type":"string","_multiple":false,"_required":false},{"_name":"subject","_type":"Reference","_multiple":false},{"_name":"context","_type":"Reference","_multiple":false},{"_name":"effectiveDateTime","_choice":"effective","_type":"dateTime","_multiple":false,"_required":false},{"_name":"effectivePeriod","_choice":"effective","_type":"Period","_multiple":false,"_required":false},{"_name":"date","_type":"dateTime","_multiple":false,"_required":false},{"_name":"assessor","_type":"Reference","_multiple":false,"_required":false},{"_name":"previous","_type":"Reference","_multiple":false,"_required":false},{"_name":"problem","_type":"Reference","_multiple":true},{"_name":"investigation","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/investigation-sets","_valueSetStrength":"example"},{"_name":"item","_type":"Reference","_multiple":true,"_required":false}]},{"_name":"protocol","_type":"uri","_multiple":true,"_required":false},{"_name":"summary","_type":"string","_multiple":false,"_required":false},{"_name":"finding","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"itemCodeableConcept","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/condition-code","_valueSetStrength":"example"},{"_name":"itemReference","_type":"Reference","_multiple":false,"_required":false},{"_name":"basis","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"prognosisCodeableConcept","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/clinicalimpression-prognosis","_valueSetStrength":"example"},{"_name":"prognosisReference","_type":"Reference","_multiple":true,"_required":false},{"_name":"action","_type":"Reference","_multiple":true},{"_name":"note","_type":"Annotation","_multiple":true,"_required":false}]},"CodeSystem":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"url","_type":"uri","_multiple":false,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"version","_type":"string","_multiple":false,"_required":false},{"_name":"name","_type":"string","_multiple":false,"_required":false},{"_name":"title","_type":"string","_multiple":false,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/publication-status","_valueSetStrength":"required"},{"_name":"experimental","_type":"boolean","_multiple":false,"_required":false},{"_name":"date","_type":"dateTime","_multiple":false,"_required":false},{"_name":"publisher","_type":"string","_multiple":false,"_required":false},{"_name":"contact","_type":"ContactDetail","_multiple":true,"_required":false},{"_name":"description","_type":"markdown","_multiple":false,"_required":false},{"_name":"useContext","_type":"UsageContext","_multiple":true,"_required":false},{"_name":"jurisdiction","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/jurisdiction","_valueSetStrength":"extensible"},{"_name":"purpose","_type":"markdown","_multiple":false,"_required":false},{"_name":"copyright","_type":"markdown","_multiple":false,"_required":false},{"_name":"caseSensitive","_type":"boolean","_multiple":false,"_required":false},{"_name":"valueSet","_type":"uri","_multiple":false,"_required":false},{"_name":"hierarchyMeaning","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/codesystem-hierarchy-meaning","_valueSetStrength":"required"},{"_name":"compositional","_type":"boolean","_multiple":false,"_required":false},{"_name":"versionNeeded","_type":"boolean","_multiple":false,"_required":false},{"_name":"content","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/codesystem-content-mode","_valueSetStrength":"required"},{"_name":"supplements","_type":"Reference","_multiple":false,"_required":false},{"_name":"count","_type":"unsignedInt","_multiple":false,"_required":false},{"_name":"filter","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"code","_multiple":false,"_required":true,"_properties":[]},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"operator","_type":"code","_multiple":true,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/filter-operator","_valueSetStrength":"required"},{"_name":"value","_type":"string","_multiple":false,"_required":true,"_properties":[]}]},{"_name":"property","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"code","_multiple":false,"_required":true,"_properties":[]},{"_name":"uri","_type":"uri","_multiple":false,"_required":false,"_properties":[]},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"type","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/concept-property-type","_valueSetStrength":"required"}]},{"_name":"concept","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"code","_multiple":false,"_required":true,"_properties":[]},{"_name":"display","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"definition","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"designation","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"use","_type":"Coding","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/designation-use","_valueSetStrength":"extensible"},{"_name":"value","_type":"string","_multiple":false,"_required":true,"_properties":[]}]},{"_name":"property","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"code","_multiple":false,"_required":true,"_properties":[]},{"_name":"valueCode","_choice":"value[x]","_type":"code","_multiple":false,"_required":true},{"_name":"valueCoding","_choice":"value[x]","_type":"Coding","_multiple":false,"_required":true},{"_name":"valueString","_choice":"value[x]","_type":"string","_multiple":false,"_required":true},{"_name":"valueInteger","_choice":"value[x]","_type":"integer","_multiple":false,"_required":true},{"_name":"valueBoolean","_choice":"value[x]","_type":"boolean","_multiple":false,"_required":true},{"_name":"valueDateTime","_choice":"value[x]","_type":"dateTime","_multiple":false,"_required":true}]},{"_name":"concept","_type":"#CodeSystem.concept","_multiple":true,"_required":false}]}]},"Communication":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"instantiates","_type":"uri","_multiple":true,"_required":false},{"_name":"basedOn","_type":"Reference","_multiple":true,"_required":false},{"_name":"partOf","_type":"Reference","_multiple":true,"_required":false},{"_name":"inResponseTo","_type":"Reference","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/event-status","_valueSetStrength":"required"},{"_name":"statusReason","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/communication-not-done-reason","_valueSetStrength":"example"},{"_name":"category","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/communication-category","_valueSetStrength":"example"},{"_name":"priority","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/request-priority","_valueSetStrength":"required"},{"_name":"medium","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/v3-ParticipationMode","_valueSetStrength":"example"},{"_name":"subject","_type":"Reference","_multiple":false},{"_name":"recipient","_type":"Reference","_multiple":true},{"_name":"topic","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"about","_type":"Reference","_multiple":true,"_required":false},{"_name":"context","_type":"Reference","_multiple":false},{"_name":"sent","_type":"dateTime","_multiple":false,"_required":false},{"_name":"received","_type":"dateTime","_multiple":false,"_required":false},{"_name":"sender","_type":"Reference","_multiple":false},{"_name":"reasonCode","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/clinical-findings","_valueSetStrength":"example"},{"_name":"reasonReference","_type":"Reference","_multiple":true},{"_name":"payload","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"contentString","_choice":"content[x]","_type":"string","_multiple":false,"_required":true},{"_name":"contentAttachment","_choice":"content[x]","_type":"Attachment","_multiple":false,"_required":true},{"_name":"contentReference","_choice":"content[x]","_type":"Reference","_multiple":false,"_required":true}]},{"_name":"note","_type":"Annotation","_multiple":true,"_required":false}]},"CommunicationRequest":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"basedOn","_type":"Reference","_multiple":true,"_required":false},{"_name":"replaces","_type":"Reference","_multiple":true,"_required":false},{"_name":"groupIdentifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/request-status","_valueSetStrength":"required"},{"_name":"category","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/communication-category","_valueSetStrength":"example"},{"_name":"priority","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/request-priority","_valueSetStrength":"required"},{"_name":"medium","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/v3-ParticipationMode","_valueSetStrength":"example"},{"_name":"subject","_type":"Reference","_multiple":false},{"_name":"recipient","_type":"Reference","_multiple":true},{"_name":"about","_type":"Reference","_multiple":true,"_required":false},{"_name":"context","_type":"Reference","_multiple":false},{"_name":"payload","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"contentString","_choice":"content[x]","_type":"string","_multiple":false,"_required":true},{"_name":"contentAttachment","_choice":"content[x]","_type":"Attachment","_multiple":false,"_required":true},{"_name":"contentReference","_choice":"content[x]","_type":"Reference","_multiple":false,"_required":true}]},{"_name":"occurrenceDateTime","_choice":"occurrence","_type":"dateTime","_multiple":false,"_required":false},{"_name":"occurrencePeriod","_choice":"occurrence","_type":"Period","_multiple":false,"_required":false},{"_name":"authoredOn","_type":"dateTime","_multiple":false,"_required":false},{"_name":"requester","_type":"Reference","_multiple":false},{"_name":"sender","_type":"Reference","_multiple":false},{"_name":"reasonCode","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/v3-ActReason","_valueSetStrength":"example"},{"_name":"reasonReference","_type":"Reference","_multiple":true},{"_name":"note","_type":"Annotation","_multiple":true,"_required":false}]},"CompartmentDefinition":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"url","_type":"uri","_multiple":false,"_required":true},{"_name":"name","_type":"string","_multiple":false,"_required":true},{"_name":"title","_type":"string","_multiple":false,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/publication-status","_valueSetStrength":"required"},{"_name":"experimental","_type":"boolean","_multiple":false,"_required":false},{"_name":"date","_type":"dateTime","_multiple":false,"_required":false},{"_name":"publisher","_type":"string","_multiple":false,"_required":false},{"_name":"contact","_type":"ContactDetail","_multiple":true,"_required":false},{"_name":"description","_type":"markdown","_multiple":false,"_required":false},{"_name":"purpose","_type":"markdown","_multiple":false,"_required":false},{"_name":"useContext","_type":"UsageContext","_multiple":true,"_required":false},{"_name":"jurisdiction","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/jurisdiction","_valueSetStrength":"extensible"},{"_name":"code","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/compartment-type","_valueSetStrength":"required"},{"_name":"search","_type":"boolean","_multiple":false,"_required":true},{"_name":"resource","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/resource-types","_valueSetStrength":"required"},{"_name":"param","_type":"string","_multiple":true,"_required":false,"_properties":[]},{"_name":"documentation","_type":"string","_multiple":false,"_required":false,"_properties":[]}]}]},"Composition":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/composition-status","_valueSetStrength":"required"},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/doc-typecodes","_valueSetStrength":"preferred"},{"_name":"class","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/doc-classcodes","_valueSetStrength":"example"},{"_name":"subject","_type":"Reference","_multiple":false,"_required":false},{"_name":"encounter","_type":"Reference","_multiple":false,"_required":false},{"_name":"date","_type":"dateTime","_multiple":false,"_required":true},{"_name":"author","_type":"Reference","_multiple":true},{"_name":"title","_type":"string","_multiple":false,"_required":true},{"_name":"confidentiality","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/v3-ConfidentialityClassification","_valueSetStrength":"required"},{"_name":"attester","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"mode","_type":"code","_multiple":true,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/composition-attestation-mode","_valueSetStrength":"required"},{"_name":"time","_type":"dateTime","_multiple":false,"_required":false,"_properties":[]},{"_name":"party","_type":"Reference","_multiple":false,"_required":false}]},{"_name":"custodian","_type":"Reference","_multiple":false,"_required":false},{"_name":"relatesTo","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/document-relationship-type","_valueSetStrength":"required"},{"_name":"targetIdentifier","_choice":"target[x]","_type":"Identifier","_multiple":false,"_required":true},{"_name":"targetReference","_choice":"target[x]","_type":"Reference","_multiple":false,"_required":true}]},{"_name":"event","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/v3-ActCode","_valueSetStrength":"example"},{"_name":"period","_type":"Period","_multiple":false,"_required":false,"_properties":[]},{"_name":"detail","_type":"Reference","_multiple":true,"_required":false,"_properties":[]}]},{"_name":"section","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"title","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/doc-section-codes","_valueSetStrength":"example"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false,"_properties":[]},{"_name":"mode","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/list-mode","_valueSetStrength":"required"},{"_name":"orderedBy","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/list-order","_valueSetStrength":"preferred"},{"_name":"entry","_type":"Reference","_multiple":true,"_required":false,"_properties":[]},{"_name":"emptyReason","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/list-empty-reason","_valueSetStrength":"preferred"},{"_name":"section","_type":"#Composition.section","_multiple":true,"_required":false}]}]},"ConceptMap":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"url","_type":"uri","_multiple":false,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"version","_type":"string","_multiple":false,"_required":false},{"_name":"name","_type":"string","_multiple":false,"_required":false},{"_name":"title","_type":"string","_multiple":false,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/publication-status","_valueSetStrength":"required"},{"_name":"experimental","_type":"boolean","_multiple":false,"_required":false},{"_name":"date","_type":"dateTime","_multiple":false,"_required":false},{"_name":"publisher","_type":"string","_multiple":false,"_required":false},{"_name":"contact","_type":"ContactDetail","_multiple":true,"_required":false},{"_name":"description","_type":"markdown","_multiple":false,"_required":false},{"_name":"useContext","_type":"UsageContext","_multiple":true,"_required":false},{"_name":"jurisdiction","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/jurisdiction","_valueSetStrength":"extensible"},{"_name":"purpose","_type":"markdown","_multiple":false,"_required":false},{"_name":"copyright","_type":"markdown","_multiple":false,"_required":false},{"_name":"sourceUri","_choice":"source","_type":"uri","_multiple":false,"_required":false},{"_name":"sourceReference","_choice":"source","_type":"Reference","_multiple":false,"_required":false},{"_name":"targetUri","_choice":"target","_type":"uri","_multiple":false,"_required":false},{"_name":"targetReference","_choice":"target","_type":"Reference","_multiple":false,"_required":false},{"_name":"group","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"source","_type":"uri","_multiple":false,"_required":false,"_properties":[]},{"_name":"sourceVersion","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"target","_type":"uri","_multiple":false,"_required":false,"_properties":[]},{"_name":"targetVersion","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"element","_type":"BackboneElement","_multiple":true,"_required":true,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"code","_multiple":false,"_required":false,"_properties":[]},{"_name":"display","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"target","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"code","_multiple":false,"_required":false,"_properties":[]},{"_name":"display","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"equivalence","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/concept-map-equivalence","_valueSetStrength":"required"},{"_name":"comment","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"dependsOn","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"property","_type":"uri","_multiple":false,"_required":true,"_properties":[]},{"_name":"system","_type":"uri","_multiple":false,"_required":false,"_properties":[]},{"_name":"code","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"display","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"product","_type":"#ConceptMap.group.element.target.dependsOn","_multiple":true,"_required":false}]}]},{"_name":"unmapped","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"mode","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/conceptmap-unmapped-mode","_valueSetStrength":"required"},{"_name":"code","_type":"code","_multiple":false,"_required":false,"_properties":[]},{"_name":"display","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"url","_type":"uri","_multiple":false,"_required":false,"_properties":[]}]}]}]},"Condition":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"clinicalStatus","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/condition-clinical","_valueSetStrength":"required"},{"_name":"verificationStatus","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/condition-ver-status","_valueSetStrength":"required"},{"_name":"category","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/condition-category","_valueSetStrength":"example"},{"_name":"severity","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/condition-severity","_valueSetStrength":"preferred"},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/condition-code","_valueSetStrength":"example"},{"_name":"bodySite","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/body-site","_valueSetStrength":"example"},{"_name":"subject","_type":"Reference","_multiple":false},{"_name":"context","_type":"Reference","_multiple":false},{"_name":"onsetDateTime","_choice":"onset","_type":"dateTime","_multiple":false,"_required":false},{"_name":"onsetAge","_choice":"onset","_type":"Age","_multiple":false,"_required":false},{"_name":"onsetPeriod","_choice":"onset","_type":"Period","_multiple":false,"_required":false},{"_name":"onsetRange","_choice":"onset","_type":"Range","_multiple":false,"_required":false},{"_name":"onsetString","_choice":"onset","_type":"string","_multiple":false,"_required":false},{"_name":"abatementDateTime","_choice":"abatement","_type":"dateTime","_multiple":false,"_required":false},{"_name":"abatementAge","_choice":"abatement","_type":"Age","_multiple":false,"_required":false},{"_name":"abatementPeriod","_choice":"abatement","_type":"Period","_multiple":false,"_required":false},{"_name":"abatementRange","_choice":"abatement","_type":"Range","_multiple":false,"_required":false},{"_name":"abatementString","_choice":"abatement","_type":"string","_multiple":false,"_required":false},{"_name":"assertedDate","_type":"dateTime","_multiple":false,"_required":false},{"_name":"recorder","_type":"Reference","_multiple":false},{"_name":"asserter","_type":"Reference","_multiple":false},{"_name":"stage","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"summary","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/condition-stage","_valueSetStrength":"example"},{"_name":"assessment","_type":"Reference","_multiple":true,"_required":false},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/condition-stage-type","_valueSetStrength":"example"}]},{"_name":"evidence","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/manifestation-or-symptom","_valueSetStrength":"example"},{"_name":"detail","_type":"Reference","_multiple":true,"_required":false,"_properties":[]}]},{"_name":"note","_type":"Annotation","_multiple":true,"_required":false}]},"Consent":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/consent-state-codes","_valueSetStrength":"required"},{"_name":"scope","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/consent-scope","_valueSetStrength":"required"},{"_name":"category","_type":"CodeableConcept","_multiple":true,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/consent-category","_valueSetStrength":"example"},{"_name":"patient","_type":"Reference","_multiple":false,"_required":true},{"_name":"dateTime","_type":"dateTime","_multiple":false,"_required":false},{"_name":"consentingParty","_type":"Reference","_multiple":true},{"_name":"organization","_type":"Reference","_multiple":true,"_required":false},{"_name":"sourceAttachment","_choice":"source","_type":"Attachment","_multiple":false,"_required":false},{"_name":"sourceIdentifier","_choice":"source","_type":"Identifier","_multiple":false,"_required":false},{"_name":"sourceReference","_choice":"source","_type":"Reference","_multiple":false,"_required":false},{"_name":"sourceReference","_choice":"source","_type":"Reference","_multiple":false,"_required":false},{"_name":"sourceReference","_choice":"source","_type":"Reference","_multiple":false,"_required":false},{"_name":"sourceReference","_choice":"source","_type":"Reference","_multiple":false,"_required":false},{"_name":"policy","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"authority","_type":"uri","_multiple":false,"_required":false,"_properties":[]},{"_name":"uri","_type":"uri","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"policyRule","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/v3-ActConsentDirective","_valueSetStrength":"extensible"},{"_name":"verification","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"verified","_type":"boolean","_multiple":false,"_required":true,"_properties":[]},{"_name":"verifiedWith","_type":"Reference","_multiple":false,"_required":false},{"_name":"verificationDate","_type":"dateTime","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"provision","_type":"BackboneElement","_multiple":false,"_required":true,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/consent-provision-type","_valueSetStrength":"required"},{"_name":"period","_type":"Period","_multiple":false,"_required":false,"_properties":[]},{"_name":"actor","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"role","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/security-role-type","_valueSetStrength":"extensible"},{"_name":"reference","_type":"Reference","_multiple":false,"_required":true}]},{"_name":"action","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/consent-action","_valueSetStrength":"example"},{"_name":"securityLabel","_type":"Coding","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/security-labels","_valueSetStrength":"extensible"},{"_name":"purpose","_type":"Coding","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/v3-PurposeOfUse","_valueSetStrength":"extensible"},{"_name":"class","_type":"Coding","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/consent-content-class","_valueSetStrength":"extensible"},{"_name":"code","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/consent-content-code","_valueSetStrength":"example"},{"_name":"dataPeriod","_type":"Period","_multiple":false,"_required":false,"_properties":[]},{"_name":"data","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"meaning","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/consent-data-meaning","_valueSetStrength":"required"},{"_name":"reference","_type":"Reference","_multiple":false,"_required":true,"_properties":[]}]},{"_name":"provision","_type":"#Consent.provision","_multiple":true,"_required":false}]}]},"Contract":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/contract-status","_valueSetStrength":"required"},{"_name":"contentDerivative","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/contract-content-derivative","_valueSetStrength":"example"},{"_name":"issued","_type":"dateTime","_multiple":false,"_required":false},{"_name":"applies","_type":"Period","_multiple":false,"_required":false},{"_name":"subject","_type":"Reference","_multiple":true,"_required":false},{"_name":"authority","_type":"Reference","_multiple":true,"_required":false},{"_name":"domain","_type":"Reference","_multiple":true,"_required":false},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/contract-type","_valueSetStrength":"example"},{"_name":"subType","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/contract-subtype","_valueSetStrength":"example"},{"_name":"term","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false,"_properties":[]},{"_name":"issued","_type":"dateTime","_multiple":false,"_required":false,"_properties":[]},{"_name":"applies","_type":"Period","_multiple":false,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/contract-term-type","_valueSetStrength":"example"},{"_name":"subType","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/contract-term-subtype","_valueSetStrength":"example"},{"_name":"offer","_type":"BackboneElement","_multiple":false,"_required":true,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"topic","_type":"Reference","_multiple":false,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/contract-term-type","_valueSetStrength":"example"},{"_name":"decision","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/v3-ActConsentDirective","_valueSetStrength":"extensible"},{"_name":"text","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"linkId","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"asset","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"class","_type":"Coding","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/consent-content-class","_valueSetStrength":"extensible"},{"_name":"code","_type":"Coding","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/consent-content-code","_valueSetStrength":"example"},{"_name":"period","_type":"Period","_multiple":false,"_required":false,"_properties":[]},{"_name":"dataPeriod","_type":"Period","_multiple":false,"_required":false,"_properties":[]},{"_name":"data","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"meaning","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/contract-data-meaning","_valueSetStrength":"required"},{"_name":"reference","_type":"Reference","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"valuedItem","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"entityCodeableConcept","_choice":"entity[x]","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"entityReference","_choice":"entity[x]","_type":"Reference","_multiple":false,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false,"_properties":[]},{"_name":"effectiveTime","_type":"dateTime","_multiple":false,"_required":false,"_properties":[]},{"_name":"quantity","_type":"Quantity","_multiple":false,"_required":false,"_properties":[]},{"_name":"unitPrice","_type":"Money","_multiple":false,"_required":false,"_properties":[]},{"_name":"factor","_type":"decimal","_multiple":false,"_required":false,"_properties":[]},{"_name":"points","_type":"decimal","_multiple":false,"_required":false,"_properties":[]},{"_name":"net","_type":"Money","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"securityLabel","_type":"Coding","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/security-labels","_valueSetStrength":"extensible"}]},{"_name":"agent","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"actor","_type":"Reference","_multiple":false,"_required":true},{"_name":"role","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/contract-actorrole","_valueSetStrength":"example"}]},{"_name":"action","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/contract-action","_valueSetStrength":"example"},{"_name":"actionReason","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/v3-PurposeOfUse","_valueSetStrength":"example"},{"_name":"group","_type":"#Contract.term","_multiple":true,"_required":false}]},{"_name":"signer","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"Coding","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/contract-signer-type","_valueSetStrength":"preferred"},{"_name":"party","_type":"Reference","_multiple":false,"_required":true},{"_name":"signature","_type":"Signature","_multiple":true,"_required":true,"_properties":[]}]},{"_name":"friendly","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"contentAttachment","_choice":"content[x]","_type":"Attachment","_multiple":false,"_required":true},{"_name":"contentReference","_choice":"content[x]","_type":"Reference","_multiple":false,"_required":true},{"_name":"contentReference","_choice":"content[x]","_type":"Reference","_multiple":false,"_required":true},{"_name":"contentReference","_choice":"content[x]","_type":"Reference","_multiple":false,"_required":true}]},{"_name":"legal","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"contentAttachment","_choice":"content[x]","_type":"Attachment","_multiple":false,"_required":true},{"_name":"contentReference","_choice":"content[x]","_type":"Reference","_multiple":false,"_required":true},{"_name":"contentReference","_choice":"content[x]","_type":"Reference","_multiple":false,"_required":true},{"_name":"contentReference","_choice":"content[x]","_type":"Reference","_multiple":false,"_required":true}]},{"_name":"rule","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"contentAttachment","_choice":"content[x]","_type":"Attachment","_multiple":false,"_required":true},{"_name":"contentReference","_choice":"content[x]","_type":"Reference","_multiple":false,"_required":true}]},{"_name":"legallyBindingAttachment","_choice":"legallyBinding","_type":"Attachment","_multiple":false,"_required":false},{"_name":"legallyBindingReference","_choice":"legallyBinding","_type":"Reference","_multiple":false,"_required":false},{"_name":"legallyBindingReference","_choice":"legallyBinding","_type":"Reference","_multiple":false,"_required":false},{"_name":"legallyBindingReference","_choice":"legallyBinding","_type":"Reference","_multiple":false,"_required":false},{"_name":"legallyBindingReference","_choice":"legallyBinding","_type":"Reference","_multiple":false,"_required":false}]},"Coverage":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/fm-status","_valueSetStrength":"required"},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/coverage-type","_valueSetStrength":"preferred"},{"_name":"policyHolder","_type":"Reference","_multiple":false},{"_name":"subscriber","_type":"Reference","_multiple":false},{"_name":"subscriberId","_type":"string","_multiple":false,"_required":false},{"_name":"beneficiary","_type":"Reference","_multiple":false,"_required":false},{"_name":"dependent","_type":"string","_multiple":false,"_required":false},{"_name":"relationship","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/policyholder-relationship","_valueSetStrength":"example"},{"_name":"period","_type":"Period","_multiple":false,"_required":false},{"_name":"payor","_type":"Reference","_multiple":true},{"_name":"class","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"Coding","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/coverage-level","_valueSetStrength":"extensible"},{"_name":"value","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"name","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"grouping","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"group","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"groupDisplay","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"subGroup","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"subGroupDisplay","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"plan","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"planDisplay","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"subPlan","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"subPlanDisplay","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"class","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"classDisplay","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"subClass","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"subClassDisplay","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"sequence","_type":"string","_multiple":false,"_required":false},{"_name":"order","_type":"positiveInt","_multiple":false,"_required":false},{"_name":"network","_type":"string","_multiple":false,"_required":false},{"_name":"copay","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"Coding","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/coverage-copay-type","_valueSetStrength":"extensible"},{"_name":"value","_type":"Quantity","_multiple":false,"_required":true,"_properties":[]}]},{"_name":"contract","_type":"Reference","_multiple":true,"_required":false}]},"DetectedIssue":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/observation-status","_valueSetStrength":"required"},{"_name":"category","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/detectedissue-category","_valueSetStrength":"preferred"},{"_name":"severity","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/detectedissue-severity","_valueSetStrength":"required"},{"_name":"patient","_type":"Reference","_multiple":false,"_required":false},{"_name":"date","_type":"dateTime","_multiple":false,"_required":false},{"_name":"author","_type":"Reference","_multiple":false},{"_name":"implicated","_type":"Reference","_multiple":true,"_required":false},{"_name":"detail","_type":"string","_multiple":false,"_required":false},{"_name":"reference","_type":"uri","_multiple":false,"_required":false},{"_name":"mitigation","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"action","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/detectedissue-mitigation-action","_valueSetStrength":"preferred"},{"_name":"date","_type":"dateTime","_multiple":false,"_required":false,"_properties":[]},{"_name":"author","_type":"Reference","_multiple":false,"_required":false,"_properties":[]}]}]},"Device":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"udi","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"deviceIdentifier","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"name","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"jurisdiction","_type":"uri","_multiple":false,"_required":false,"_properties":[]},{"_name":"carrierHRF","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"carrierAIDC","_type":"base64Binary","_multiple":false,"_required":false,"_properties":[]},{"_name":"issuer","_type":"uri","_multiple":false,"_required":false,"_properties":[]},{"_name":"entryType","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/udi-entry-type","_valueSetStrength":"required"}]},{"_name":"status","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/device-status","_valueSetStrength":"required"},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/device-kind","_valueSetStrength":"example"},{"_name":"lotNumber","_type":"string","_multiple":false,"_required":false},{"_name":"manufacturer","_type":"string","_multiple":false,"_required":false},{"_name":"manufactureDate","_type":"dateTime","_multiple":false,"_required":false},{"_name":"expirationDate","_type":"dateTime","_multiple":false,"_required":false},{"_name":"model","_type":"string","_multiple":false,"_required":false},{"_name":"version","_type":"string","_multiple":false,"_required":false},{"_name":"patient","_type":"Reference","_multiple":false,"_required":false},{"_name":"owner","_type":"Reference","_multiple":false,"_required":false},{"_name":"contact","_type":"ContactPoint","_multiple":true,"_required":false},{"_name":"location","_type":"Reference","_multiple":false,"_required":false},{"_name":"url","_type":"uri","_multiple":false,"_required":false},{"_name":"note","_type":"Annotation","_multiple":true,"_required":false},{"_name":"safety","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/device-safety","_valueSetStrength":"example"}]},"DeviceComponent":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":true},{"_name":"lastSystemChange","_type":"instant","_multiple":false,"_required":false},{"_name":"source","_type":"Reference","_multiple":false,"_required":false},{"_name":"parent","_type":"Reference","_multiple":false,"_required":false},{"_name":"operationalStatus","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/operational-status","_valueSetStrength":"extensible"},{"_name":"parameterGroup","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/parameter-group","_valueSetStrength":"extensible"},{"_name":"measurementPrinciple","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/measurement-principle","_valueSetStrength":"required"},{"_name":"productionSpecification","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"specType","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/specification-type","_valueSetStrength":"extensible"},{"_name":"componentId","_type":"Identifier","_multiple":false,"_required":false,"_properties":[]},{"_name":"productionSpec","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"languageCode","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"property","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/device-component-property","_valueSetStrength":"extensible"},{"_name":"valueQuantity","_type":"Quantity","_multiple":true,"_required":false,"_properties":[]},{"_name":"valueCode","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[]}]}]},"DeviceMetric":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/devicemetric-type","_valueSetStrength":"preferred"},{"_name":"unit","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/devicemetric-type","_valueSetStrength":"preferred"},{"_name":"source","_type":"Reference","_multiple":false,"_required":false},{"_name":"parent","_type":"Reference","_multiple":false,"_required":false},{"_name":"operationalStatus","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/metric-operational-status","_valueSetStrength":"required"},{"_name":"color","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/metric-color","_valueSetStrength":"required"},{"_name":"category","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/metric-category","_valueSetStrength":"required"},{"_name":"measurementPeriod","_type":"Timing","_multiple":false,"_required":false},{"_name":"calibration","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/metric-calibration-type","_valueSetStrength":"required"},{"_name":"state","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/metric-calibration-state","_valueSetStrength":"required"},{"_name":"time","_type":"instant","_multiple":false,"_required":false,"_properties":[]}]}]},"DeviceRequest":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"instantiates","_type":"uri","_multiple":true,"_required":false},{"_name":"basedOn","_type":"Reference","_multiple":true,"_required":false},{"_name":"priorRequest","_type":"Reference","_multiple":true,"_required":false},{"_name":"groupIdentifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/request-status","_valueSetStrength":"required"},{"_name":"intent","_type":"CodeableConcept","_multiple":false,"_required":true,"_valueSet":"http://build.fhir.org/valueset-request-intent.html","_valueSetStrength":"required"},{"_name":"priority","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/request-priority","_valueSetStrength":"required"},{"_name":"codeReference","_choice":"code","_type":"Reference","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/device-kind","_valueSetStrength":"example"},{"_name":"codeCodeableConcept","_choice":"code","_type":"CodeableConcept","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/device-kind","_valueSetStrength":"example"},{"_name":"parameter","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"valueCodeableConcept","_choice":"value[x]","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"valueQuantity","_choice":"value[x]","_type":"Quantity","_multiple":false,"_required":false},{"_name":"valueRange","_choice":"value[x]","_type":"Range","_multiple":false,"_required":false},{"_name":"valueBoolean","_choice":"value[x]","_type":"boolean","_multiple":false,"_required":false}]},{"_name":"subject","_type":"Reference","_multiple":false},{"_name":"context","_type":"Reference","_multiple":false},{"_name":"occurrenceDateTime","_choice":"occurrence","_type":"dateTime","_multiple":false,"_required":false},{"_name":"occurrencePeriod","_choice":"occurrence","_type":"Period","_multiple":false,"_required":false},{"_name":"occurrenceTiming","_choice":"occurrence","_type":"Timing","_multiple":false,"_required":false},{"_name":"authoredOn","_type":"dateTime","_multiple":false,"_required":false},{"_name":"requester","_type":"Reference","_multiple":false},{"_name":"performerType","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/participant-role","_valueSetStrength":"example"},{"_name":"performer","_type":"Reference","_multiple":false},{"_name":"reasonCode","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/condition-code","_valueSetStrength":"example"},{"_name":"reasonReference","_type":"Reference","_multiple":true},{"_name":"insurance","_type":"Reference","_multiple":true},{"_name":"supportingInfo","_type":"Reference","_multiple":true,"_required":false},{"_name":"note","_type":"Annotation","_multiple":true,"_required":false},{"_name":"relevantHistory","_type":"Reference","_multiple":true,"_required":false}]},"DeviceUseStatement":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"basedOn","_type":"Reference","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/device-statement-status","_valueSetStrength":"required"},{"_name":"subject","_type":"Reference","_multiple":false},{"_name":"derivedFrom","_type":"Reference","_multiple":true},{"_name":"timingTiming","_choice":"timing","_type":"Timing","_multiple":false,"_required":false},{"_name":"timingPeriod","_choice":"timing","_type":"Period","_multiple":false,"_required":false},{"_name":"timingDateTime","_choice":"timing","_type":"dateTime","_multiple":false,"_required":false},{"_name":"recordedOn","_type":"dateTime","_multiple":false,"_required":false},{"_name":"source","_type":"Reference","_multiple":false},{"_name":"device","_type":"Reference","_multiple":false,"_required":true},{"_name":"reasonCode","_type":"CodeableConcept","_multiple":true,"_required":false},{"_name":"reasonReference","_type":"Reference","_multiple":true},{"_name":"bodySite","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/body-site","_valueSetStrength":"example"},{"_name":"note","_type":"Annotation","_multiple":true,"_required":false}]},"DiagnosticReport":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"basedOn","_type":"Reference","_multiple":true},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/diagnostic-report-status","_valueSetStrength":"required"},{"_name":"category","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/diagnostic-service-sections","_valueSetStrength":"example"},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/report-codes","_valueSetStrength":"preferred"},{"_name":"subject","_type":"Reference","_multiple":false},{"_name":"context","_type":"Reference","_multiple":false},{"_name":"effectiveDateTime","_choice":"effective","_type":"dateTime","_multiple":false,"_required":false},{"_name":"effectivePeriod","_choice":"effective","_type":"Period","_multiple":false,"_required":false},{"_name":"issued","_type":"instant","_multiple":false,"_required":false},{"_name":"performer","_type":"Reference","_multiple":true},{"_name":"resultsInterpreter","_type":"Reference","_multiple":true},{"_name":"specimen","_type":"Reference","_multiple":true,"_required":false},{"_name":"result","_type":"Reference","_multiple":true,"_required":false},{"_name":"imagingStudy","_type":"Reference","_multiple":true,"_required":false},{"_name":"media","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"comment","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"link","_type":"Reference","_multiple":false,"_required":true,"_properties":[]}]},{"_name":"conclusion","_type":"string","_multiple":false,"_required":false},{"_name":"codedDiagnosis","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/clinical-findings","_valueSetStrength":"example"},{"_name":"presentedForm","_type":"Attachment","_multiple":true,"_required":false}]},"DocumentManifest":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"masterIdentifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/document-reference-status","_valueSetStrength":"required"},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/c80-doc-typecodes","_valueSetStrength":"extensible"},{"_name":"subject","_type":"Reference","_multiple":false},{"_name":"created","_type":"dateTime","_multiple":false,"_required":false},{"_name":"agent","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/participation-role-type","_valueSetStrength":"extensible"},{"_name":"who","_type":"Reference","_multiple":false,"_required":true}]},{"_name":"recipient","_type":"Reference","_multiple":true},{"_name":"source","_type":"uri","_multiple":false,"_required":false},{"_name":"description","_type":"string","_multiple":false,"_required":false},{"_name":"content","_type":"Reference","_multiple":true,"_required":true},{"_name":"related","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false,"_properties":[]},{"_name":"ref","_type":"Reference","_multiple":false,"_required":false,"_properties":[]}]}]},"DocumentReference":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"masterIdentifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/document-reference-status","_valueSetStrength":"required"},{"_name":"docStatus","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/composition-status","_valueSetStrength":"required"},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/c80-doc-typecodes","_valueSetStrength":"preferred"},{"_name":"class","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/c80-doc-classcodes","_valueSetStrength":"example"},{"_name":"subject","_type":"Reference","_multiple":false},{"_name":"created","_type":"dateTime","_multiple":false,"_required":false},{"_name":"date","_type":"instant","_multiple":false,"_required":false},{"_name":"agent","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/participation-role-type","_valueSetStrength":"extensible"},{"_name":"who","_type":"Reference","_multiple":false,"_required":true}]},{"_name":"authenticator","_type":"Reference","_multiple":false},{"_name":"custodian","_type":"Reference","_multiple":false,"_required":false},{"_name":"relatesTo","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/document-relationship-type","_valueSetStrength":"required"},{"_name":"target","_type":"Reference","_multiple":false,"_required":true,"_properties":[]}]},{"_name":"description","_type":"string","_multiple":false,"_required":false},{"_name":"securityLabel","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/security-labels","_valueSetStrength":"extensible"},{"_name":"content","_type":"BackboneElement","_multiple":true,"_required":true,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"attachment","_type":"Attachment","_multiple":false,"_required":true,"_properties":[]},{"_name":"format","_type":"Coding","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/formatcodes","_valueSetStrength":"preferred"}]},{"_name":"context","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"encounter","_type":"Reference","_multiple":false,"_required":false,"_properties":[]},{"_name":"event","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/v3-ActCode","_valueSetStrength":"example"},{"_name":"period","_type":"Period","_multiple":false,"_required":false,"_properties":[]},{"_name":"facilityType","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/c80-facilitycodes","_valueSetStrength":"example"},{"_name":"practiceSetting","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/c80-practice-codes","_valueSetStrength":"example"},{"_name":"sourcePatientInfo","_type":"Reference","_multiple":false,"_required":false,"_properties":[]},{"_name":"related","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false,"_properties":[]},{"_name":"ref","_type":"Reference","_multiple":false,"_required":false,"_properties":[]}]}]}]},"DomainResource":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false}]},"EligibilityRequest":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/fm-status","_valueSetStrength":"required"},{"_name":"priority","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/process-priority","_valueSetStrength":"example"},{"_name":"patient","_type":"Reference","_multiple":false,"_required":false},{"_name":"servicedDate","_choice":"serviced","_type":"date","_multiple":false,"_required":false},{"_name":"servicedPeriod","_choice":"serviced","_type":"Period","_multiple":false,"_required":false},{"_name":"created","_type":"dateTime","_multiple":false,"_required":false},{"_name":"enterer","_type":"Reference","_multiple":false,"_required":false},{"_name":"provider","_type":"Reference","_multiple":false,"_required":false},{"_name":"organization","_type":"Reference","_multiple":false,"_required":false},{"_name":"insurer","_type":"Reference","_multiple":false,"_required":false},{"_name":"facility","_type":"Reference","_multiple":false,"_required":false},{"_name":"coverage","_type":"Reference","_multiple":false,"_required":false},{"_name":"businessArrangement","_type":"string","_multiple":false,"_required":false},{"_name":"benefitCategory","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/benefit-category","_valueSetStrength":"example"},{"_name":"benefitSubCategory","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/benefit-subcategory","_valueSetStrength":"example"},{"_name":"authorization","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"sequence","_type":"positiveInt","_multiple":false,"_required":true,"_properties":[]},{"_name":"service","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/service-uscls","_valueSetStrength":"example"},{"_name":"modifier","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/claim-modifiers","_valueSetStrength":"example"},{"_name":"unitPrice","_type":"Money","_multiple":false,"_required":false,"_properties":[]},{"_name":"facility","_type":"Reference","_multiple":false,"_required":false}]}]},"EligibilityResponse":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/fm-status","_valueSetStrength":"required"},{"_name":"created","_type":"dateTime","_multiple":false,"_required":false},{"_name":"requestProvider","_type":"Reference","_multiple":false,"_required":false},{"_name":"requestOrganization","_type":"Reference","_multiple":false,"_required":false},{"_name":"request","_type":"Reference","_multiple":false,"_required":false},{"_name":"outcome","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/remittance-outcome","_valueSetStrength":"required"},{"_name":"disposition","_type":"string","_multiple":false,"_required":false},{"_name":"insurer","_type":"Reference","_multiple":false,"_required":false},{"_name":"inforce","_type":"boolean","_multiple":false,"_required":false},{"_name":"insurance","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"coverage","_type":"Reference","_multiple":false,"_required":false,"_properties":[]},{"_name":"contract","_type":"Reference","_multiple":false,"_required":false,"_properties":[]},{"_name":"benefitBalance","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"category","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/benefit-category","_valueSetStrength":"example"},{"_name":"subCategory","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/benefit-subcategory","_valueSetStrength":"example"},{"_name":"excluded","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"name","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"network","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/benefit-network","_valueSetStrength":"example"},{"_name":"unit","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/benefit-unit","_valueSetStrength":"example"},{"_name":"term","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/benefit-term","_valueSetStrength":"example"},{"_name":"financial","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/benefit-type","_valueSetStrength":"example"},{"_name":"allowedUnsignedInt","_choice":"allowed[x]","_type":"unsignedInt","_multiple":false,"_required":false},{"_name":"allowedString","_choice":"allowed[x]","_type":"string","_multiple":false,"_required":false},{"_name":"allowedMoney","_choice":"allowed[x]","_type":"Money","_multiple":false,"_required":false},{"_name":"usedUnsignedInt","_choice":"used[x]","_type":"unsignedInt","_multiple":false,"_required":false},{"_name":"usedMoney","_choice":"used[x]","_type":"Money","_multiple":false,"_required":false}]}]}]},{"_name":"preAuthRef","_type":"string","_multiple":false,"_required":false},{"_name":"authorization","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"authorizationSequence","_type":"positiveInt","_multiple":false,"_required":true,"_properties":[]},{"_name":"required","_type":"boolean","_multiple":false,"_required":true,"_properties":[]},{"_name":"note","_type":"Annotation","_multiple":true,"_required":false,"_properties":[]}]},{"_name":"form","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/forms","_valueSetStrength":"example"},{"_name":"error","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/adjudication-error","_valueSetStrength":"example"}]}]},"Encounter":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/encounter-status","_valueSetStrength":"required"},{"_name":"statusHistory","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/encounter-status","_valueSetStrength":"required"},{"_name":"period","_type":"Period","_multiple":false,"_required":true,"_properties":[]}]},{"_name":"class","_type":"Coding","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/v3-ActEncounterCode","_valueSetStrength":"extensible"},{"_name":"classHistory","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"class","_type":"Coding","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/v3-ActEncounterCode","_valueSetStrength":"extensible"},{"_name":"period","_type":"Period","_multiple":false,"_required":true,"_properties":[]}]},{"_name":"type","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/encounter-type","_valueSetStrength":"example"},{"_name":"serviceType","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"priority","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/v3-ActPriority","_valueSetStrength":"example"},{"_name":"subject","_type":"Reference","_multiple":false},{"_name":"episodeOfCare","_type":"Reference","_multiple":true,"_required":false},{"_name":"incomingReferral","_type":"Reference","_multiple":true,"_required":false},{"_name":"participant","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/encounter-participant-type","_valueSetStrength":"extensible"},{"_name":"period","_type":"Period","_multiple":false,"_required":false,"_properties":[]},{"_name":"individual","_type":"Reference","_multiple":false,"_required":false}]},{"_name":"appointment","_type":"Reference","_multiple":false,"_required":false},{"_name":"period","_type":"Period","_multiple":false,"_required":false},{"_name":"length","_type":"Duration","_multiple":false,"_required":false},{"_name":"reason","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/encounter-reason","_valueSetStrength":"preferred"},{"_name":"diagnosis","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"condition","_type":"Reference","_multiple":false,"_required":true},{"_name":"role","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/diagnosis-role","_valueSetStrength":"preferred"},{"_name":"rank","_type":"positiveInt","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"account","_type":"Reference","_multiple":true,"_required":false},{"_name":"hospitalization","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"preAdmissionIdentifier","_type":"Identifier","_multiple":false,"_required":false,"_properties":[]},{"_name":"origin","_type":"Reference","_multiple":false,"_required":false,"_properties":[]},{"_name":"admitSource","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/encounter-admit-source","_valueSetStrength":"preferred"},{"_name":"reAdmission","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/v2-0092","_valueSetStrength":"example"},{"_name":"dietPreference","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/encounter-diet","_valueSetStrength":"example"},{"_name":"specialCourtesy","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/encounter-special-courtesy","_valueSetStrength":"preferred"},{"_name":"specialArrangement","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/encounter-special-arrangements","_valueSetStrength":"preferred"},{"_name":"destination","_type":"Reference","_multiple":false,"_required":false,"_properties":[]},{"_name":"dischargeDisposition","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/encounter-discharge-disposition","_valueSetStrength":"example"}]},{"_name":"location","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"location","_type":"Reference","_multiple":false,"_required":true,"_properties":[]},{"_name":"status","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/encounter-location-status","_valueSetStrength":"required"},{"_name":"period","_type":"Period","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"serviceProvider","_type":"Reference","_multiple":false,"_required":false},{"_name":"partOf","_type":"Reference","_multiple":false,"_required":false}]},"Endpoint":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/endpoint-status","_valueSetStrength":"required"},{"_name":"connectionType","_type":"Coding","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/endpoint-connection-type","_valueSetStrength":"extensible"},{"_name":"name","_type":"string","_multiple":false,"_required":false},{"_name":"managingOrganization","_type":"Reference","_multiple":false,"_required":false},{"_name":"contact","_type":"ContactPoint","_multiple":true,"_required":false},{"_name":"period","_type":"Period","_multiple":false,"_required":false},{"_name":"payloadType","_type":"CodeableConcept","_multiple":true,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/endpoint-payload-type","_valueSetStrength":"example"},{"_name":"payloadMimeType","_type":"code","_multiple":true,"_required":false},{"_name":"address","_type":"uri","_multiple":false,"_required":true},{"_name":"header","_type":"string","_multiple":true,"_required":false}]},"EnrollmentRequest":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/fm-status","_valueSetStrength":"required"},{"_name":"created","_type":"dateTime","_multiple":false,"_required":false},{"_name":"insurer","_type":"Reference","_multiple":false,"_required":false},{"_name":"provider","_type":"Reference","_multiple":false,"_required":false},{"_name":"organization","_type":"Reference","_multiple":false,"_required":false},{"_name":"candidate","_type":"Reference","_multiple":false,"_required":false},{"_name":"coverage","_type":"Reference","_multiple":false,"_required":false}]},"EnrollmentResponse":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/fm-status","_valueSetStrength":"required"},{"_name":"request","_type":"Reference","_multiple":false,"_required":false},{"_name":"outcome","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/remittance-outcome","_valueSetStrength":"required"},{"_name":"disposition","_type":"string","_multiple":false,"_required":false},{"_name":"created","_type":"dateTime","_multiple":false,"_required":false},{"_name":"organization","_type":"Reference","_multiple":false,"_required":false},{"_name":"requestProvider","_type":"Reference","_multiple":false,"_required":false},{"_name":"requestOrganization","_type":"Reference","_multiple":false,"_required":false}]},"EntryDefinition":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"purpose","_type":"CodeableConcept","_multiple":false,"_required":true},{"_name":"referencedItem","_type":"Reference","_multiple":false},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"additionalIdentifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"classification","_type":"CodeableConcept","_multiple":true,"_required":false},{"_name":"status","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"validityPeriod","_type":"Period","_multiple":false,"_required":false},{"_name":"lastUpdated","_type":"dateTime","_multiple":false,"_required":false},{"_name":"additionalCharacteristic","_type":"CodeableConcept","_multiple":true,"_required":false},{"_name":"additionalClassification","_type":"CodeableConcept","_multiple":true,"_required":false},{"_name":"relatedEntry","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"relationtype","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[]},{"_name":"item","_type":"Reference","_multiple":false,"_required":true,"_properties":[]}]}]},"EpisodeOfCare":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/episode-of-care-status","_valueSetStrength":"required"},{"_name":"statusHistory","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/episode-of-care-status","_valueSetStrength":"required"},{"_name":"period","_type":"Period","_multiple":false,"_required":true,"_properties":[]}]},{"_name":"type","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/episodeofcare-type","_valueSetStrength":"example"},{"_name":"diagnosis","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"condition","_type":"Reference","_multiple":false,"_required":true,"_properties":[]},{"_name":"role","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/diagnosis-role","_valueSetStrength":"preferred"},{"_name":"rank","_type":"positiveInt","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"patient","_type":"Reference","_multiple":false,"_required":true},{"_name":"managingOrganization","_type":"Reference","_multiple":false,"_required":false},{"_name":"period","_type":"Period","_multiple":false,"_required":false},{"_name":"referralRequest","_type":"Reference","_multiple":true,"_required":false},{"_name":"careManager","_type":"Reference","_multiple":false,"_required":false},{"_name":"team","_type":"Reference","_multiple":true,"_required":false},{"_name":"account","_type":"Reference","_multiple":true,"_required":false}]},"EventDefinition":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"url","_type":"uri","_multiple":false,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"version","_type":"string","_multiple":false,"_required":false},{"_name":"name","_type":"string","_multiple":false,"_required":false},{"_name":"title","_type":"string","_multiple":false,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/publication-status","_valueSetStrength":"required"},{"_name":"experimental","_type":"boolean","_multiple":false,"_required":false},{"_name":"date","_type":"dateTime","_multiple":false,"_required":false},{"_name":"publisher","_type":"string","_multiple":false,"_required":false},{"_name":"description","_type":"markdown","_multiple":false,"_required":false},{"_name":"purpose","_type":"markdown","_multiple":false,"_required":false},{"_name":"usage","_type":"string","_multiple":false,"_required":false},{"_name":"approvalDate","_type":"date","_multiple":false,"_required":false},{"_name":"lastReviewDate","_type":"date","_multiple":false,"_required":false},{"_name":"effectivePeriod","_type":"Period","_multiple":false,"_required":false},{"_name":"useContext","_type":"UsageContext","_multiple":true,"_required":false},{"_name":"jurisdiction","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/jurisdiction","_valueSetStrength":"extensible"},{"_name":"topic","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/definition-topic","_valueSetStrength":"example"},{"_name":"contributor","_type":"Contributor","_multiple":true,"_required":false},{"_name":"contact","_type":"ContactDetail","_multiple":true,"_required":false},{"_name":"copyright","_type":"markdown","_multiple":false,"_required":false},{"_name":"relatedArtifact","_type":"RelatedArtifact","_multiple":true,"_required":false},{"_name":"trigger","_type":"TriggerDefinition","_multiple":false,"_required":true}]},"ExampleScenario":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"url","_type":"uri","_multiple":false,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"version","_type":"string","_multiple":false,"_required":false},{"_name":"name","_type":"string","_multiple":false,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/publication-status","_valueSetStrength":"required"},{"_name":"experimental","_type":"boolean","_multiple":false,"_required":false},{"_name":"date","_type":"dateTime","_multiple":false,"_required":false},{"_name":"publisher","_type":"string","_multiple":false,"_required":false},{"_name":"contact","_type":"ContactDetail","_multiple":true,"_required":false},{"_name":"useContext","_type":"UsageContext","_multiple":true,"_required":false},{"_name":"jurisdiction","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/jurisdiction","_valueSetStrength":"extensible"},{"_name":"copyright","_type":"markdown","_multiple":false,"_required":false},{"_name":"purpose","_type":"markdown","_multiple":false,"_required":false},{"_name":"actor","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"actorId","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"type","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/examplescenario-actor-type","_valueSetStrength":"required"},{"_name":"name","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"description","_type":"markdown","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"instance","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"resourceId","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"resourceType","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/resource-types","_valueSetStrength":"required"},{"_name":"name","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"description","_type":"markdown","_multiple":false,"_required":false,"_properties":[]},{"_name":"version","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"versionId","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"description","_type":"markdown","_multiple":false,"_required":true,"_properties":[]}]},{"_name":"containedInstance","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"resourceId","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"versionId","_type":"string","_multiple":false,"_required":false,"_properties":[]}]}]},{"_name":"process","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"title","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"description","_type":"markdown","_multiple":false,"_required":false,"_properties":[]},{"_name":"preConditions","_type":"markdown","_multiple":false,"_required":false,"_properties":[]},{"_name":"postConditions","_type":"markdown","_multiple":false,"_required":false,"_properties":[]},{"_name":"step","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"process","_type":"#ExampleScenario.process","_multiple":true,"_required":false},{"_name":"pause","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"operation","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"number","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"type","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"name","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"initiator","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"receiver","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"description","_type":"markdown","_multiple":false,"_required":false,"_properties":[]},{"_name":"initiatorActive","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"receiverActive","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"request","_type":"#ExampleScenario.instance.containedInstance","_multiple":false,"_required":false},{"_name":"response","_type":"#ExampleScenario.instance.containedInstance","_multiple":false,"_required":false}]},{"_name":"alternative","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"name","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"option","_type":"BackboneElement","_multiple":true,"_required":true,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"description","_type":"markdown","_multiple":false,"_required":true,"_properties":[]},{"_name":"step","_type":"#ExampleScenario.process.step","_multiple":true,"_required":false},{"_name":"pause","_type":"boolean","_multiple":true,"_required":false,"_properties":[]}]}]}]}]},{"_name":"workflow","_type":"Reference","_multiple":true,"_required":false}]},"ExpansionProfile":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"url","_type":"uri","_multiple":false,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"version","_type":"string","_multiple":false,"_required":false},{"_name":"name","_type":"string","_multiple":false,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/publication-status","_valueSetStrength":"required"},{"_name":"experimental","_type":"boolean","_multiple":false,"_required":false},{"_name":"date","_type":"dateTime","_multiple":false,"_required":false},{"_name":"publisher","_type":"string","_multiple":false,"_required":false},{"_name":"contact","_type":"ContactDetail","_multiple":true,"_required":false},{"_name":"description","_type":"markdown","_multiple":false,"_required":false},{"_name":"useContext","_type":"UsageContext","_multiple":true,"_required":false},{"_name":"jurisdiction","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/jurisdiction","_valueSetStrength":"extensible"},{"_name":"fixedVersion","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"system","_type":"uri","_multiple":false,"_required":true,"_properties":[]},{"_name":"version","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"mode","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/system-version-processing-mode","_valueSetStrength":"required"}]},{"_name":"excludedSystem","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"system","_type":"uri","_multiple":false,"_required":true,"_properties":[]},{"_name":"version","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"includeDesignations","_type":"boolean","_multiple":false,"_required":false},{"_name":"designation","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"include","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"designation","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"use","_type":"Coding","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/designation-use","_valueSetStrength":"required"}]}]},{"_name":"exclude","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"designation","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"use","_type":"Coding","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/designation-use","_valueSetStrength":"required"}]}]}]},{"_name":"includeDefinition","_type":"boolean","_multiple":false,"_required":false},{"_name":"activeOnly","_type":"boolean","_multiple":false,"_required":false},{"_name":"excludeNested","_type":"boolean","_multiple":false,"_required":false},{"_name":"excludeNotForUI","_type":"boolean","_multiple":false,"_required":false},{"_name":"excludePostCoordinated","_type":"boolean","_multiple":false,"_required":false},{"_name":"displayLanguage","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"limitedExpansion","_type":"boolean","_multiple":false,"_required":false}]},"ExplanationOfBenefit":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/explanationofbenefit-status","_valueSetStrength":"required"},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/claim-type","_valueSetStrength":"extensible"},{"_name":"subType","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/claim-subtype","_valueSetStrength":"example"},{"_name":"patient","_type":"Reference","_multiple":false,"_required":false},{"_name":"billablePeriod","_type":"Period","_multiple":false,"_required":false},{"_name":"created","_type":"dateTime","_multiple":false,"_required":false},{"_name":"enterer","_type":"Reference","_multiple":false,"_required":false},{"_name":"insurer","_type":"Reference","_multiple":false,"_required":false},{"_name":"provider","_type":"Reference","_multiple":false,"_required":false},{"_name":"organization","_type":"Reference","_multiple":false,"_required":false},{"_name":"referral","_type":"Reference","_multiple":false,"_required":false},{"_name":"facility","_type":"Reference","_multiple":false,"_required":false},{"_name":"claim","_type":"Reference","_multiple":false,"_required":false},{"_name":"claimResponse","_type":"Reference","_multiple":false,"_required":false},{"_name":"outcome","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/remittance-outcome","_valueSetStrength":"required"},{"_name":"disposition","_type":"string","_multiple":false,"_required":false},{"_name":"related","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"claim","_type":"Reference","_multiple":false,"_required":false,"_properties":[]},{"_name":"relationship","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/related-claim-relationship","_valueSetStrength":"example"},{"_name":"reference","_type":"Identifier","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"prescription","_type":"Reference","_multiple":false},{"_name":"originalPrescription","_type":"Reference","_multiple":false,"_required":false},{"_name":"payee","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/payeetype","_valueSetStrength":"example"},{"_name":"resource","_type":"Coding","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/resource-type-link","_valueSetStrength":"extensible"},{"_name":"party","_type":"Reference","_multiple":false,"_required":false}]},{"_name":"information","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"sequence","_type":"positiveInt","_multiple":false,"_required":true,"_properties":[]},{"_name":"category","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/claim-informationcategory","_valueSetStrength":"example"},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/claim-exception","_valueSetStrength":"example"},{"_name":"timingDate","_choice":"timing[x]","_type":"date","_multiple":false,"_required":false},{"_name":"timingPeriod","_choice":"timing[x]","_type":"Period","_multiple":false,"_required":false},{"_name":"valueString","_choice":"value[x]","_type":"string","_multiple":false,"_required":false},{"_name":"valueQuantity","_choice":"value[x]","_type":"Quantity","_multiple":false,"_required":false},{"_name":"valueAttachment","_choice":"value[x]","_type":"Attachment","_multiple":false,"_required":false},{"_name":"valueReference","_choice":"value[x]","_type":"Reference","_multiple":false,"_required":false},{"_name":"reason","_type":"Coding","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/missing-tooth-reason","_valueSetStrength":"example"}]},{"_name":"careTeam","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"sequence","_type":"positiveInt","_multiple":false,"_required":true,"_properties":[]},{"_name":"provider","_type":"Reference","_multiple":false,"_required":true},{"_name":"responsible","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"role","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/claim-careteamrole","_valueSetStrength":"example"},{"_name":"qualification","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/provider-qualification","_valueSetStrength":"example"}]},{"_name":"diagnosis","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"sequence","_type":"positiveInt","_multiple":false,"_required":true,"_properties":[]},{"_name":"diagnosisCodeableConcept","_choice":"diagnosis[x]","_type":"CodeableConcept","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/icd-10","_valueSetStrength":"example"},{"_name":"diagnosisReference","_choice":"diagnosis[x]","_type":"Reference","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/icd-10","_valueSetStrength":"example"},{"_name":"type","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/ex-diagnosistype","_valueSetStrength":"example"},{"_name":"packageCode","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/ex-diagnosisrelatedgroup","_valueSetStrength":"example"}]},{"_name":"procedure","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"sequence","_type":"positiveInt","_multiple":false,"_required":true,"_properties":[]},{"_name":"date","_type":"dateTime","_multiple":false,"_required":false,"_properties":[]},{"_name":"procedureCodeableConcept","_choice":"procedure[x]","_type":"CodeableConcept","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/icd-10-procedures","_valueSetStrength":"example"},{"_name":"procedureReference","_choice":"procedure[x]","_type":"Reference","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/icd-10-procedures","_valueSetStrength":"example"}]},{"_name":"precedence","_type":"positiveInt","_multiple":false,"_required":false},{"_name":"insurance","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"coverage","_type":"Reference","_multiple":false,"_required":false,"_properties":[]},{"_name":"preAuthRef","_type":"string","_multiple":true,"_required":false,"_properties":[]}]},{"_name":"accident","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"date","_type":"date","_multiple":false,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/v3-ActIncidentCode","_valueSetStrength":"extensible"},{"_name":"locationAddress","_choice":"location[x]","_type":"Address","_multiple":false,"_required":false},{"_name":"locationReference","_choice":"location[x]","_type":"Reference","_multiple":false,"_required":false}]},{"_name":"employmentImpacted","_type":"Period","_multiple":false,"_required":false},{"_name":"hospitalization","_type":"Period","_multiple":false,"_required":false},{"_name":"item","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"sequence","_type":"positiveInt","_multiple":false,"_required":true,"_properties":[]},{"_name":"careTeamSequence","_type":"positiveInt","_multiple":true,"_required":false,"_properties":[]},{"_name":"diagnosisSequence","_type":"positiveInt","_multiple":true,"_required":false,"_properties":[]},{"_name":"procedureSequence","_type":"positiveInt","_multiple":true,"_required":false,"_properties":[]},{"_name":"informationSequence","_type":"positiveInt","_multiple":true,"_required":false,"_properties":[]},{"_name":"revenue","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/ex-revenue-center","_valueSetStrength":"example"},{"_name":"category","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/benefit-subcategory","_valueSetStrength":"example"},{"_name":"service","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/service-uscls","_valueSetStrength":"example"},{"_name":"modifier","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/claim-modifiers","_valueSetStrength":"example"},{"_name":"programCode","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/ex-program-code","_valueSetStrength":"example"},{"_name":"servicedDate","_choice":"serviced[x]","_type":"date","_multiple":false,"_required":false},{"_name":"servicedPeriod","_choice":"serviced[x]","_type":"Period","_multiple":false,"_required":false},{"_name":"locationCodeableConcept","_choice":"location[x]","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/service-place","_valueSetStrength":"example"},{"_name":"locationAddress","_choice":"location[x]","_type":"Address","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/service-place","_valueSetStrength":"example"},{"_name":"locationReference","_choice":"location[x]","_type":"Reference","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/service-place","_valueSetStrength":"example"},{"_name":"quantity","_type":"Quantity","_multiple":false,"_required":false,"_properties":[]},{"_name":"unitPrice","_type":"Money","_multiple":false,"_required":false,"_properties":[]},{"_name":"factor","_type":"decimal","_multiple":false,"_required":false,"_properties":[]},{"_name":"net","_type":"Money","_multiple":false,"_required":false,"_properties":[]},{"_name":"udi","_type":"Reference","_multiple":true,"_required":false,"_properties":[]},{"_name":"bodySite","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/tooth","_valueSetStrength":"example"},{"_name":"subSite","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/surface","_valueSetStrength":"example"},{"_name":"encounter","_type":"Reference","_multiple":true,"_required":false,"_properties":[]},{"_name":"noteNumber","_type":"positiveInt","_multiple":true,"_required":false,"_properties":[]},{"_name":"adjudication","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"category","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/adjudication","_valueSetStrength":"example"},{"_name":"reason","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/adjudication-reason","_valueSetStrength":"example"},{"_name":"amount","_type":"Money","_multiple":false,"_required":false,"_properties":[]},{"_name":"value","_type":"decimal","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"detail","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"sequence","_type":"positiveInt","_multiple":false,"_required":true,"_properties":[]},{"_name":"revenue","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/ex-revenue-center","_valueSetStrength":"example"},{"_name":"category","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/benefit-subcategory","_valueSetStrength":"example"},{"_name":"service","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/service-uscls","_valueSetStrength":"example"},{"_name":"modifier","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/claim-modifiers","_valueSetStrength":"example"},{"_name":"programCode","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/ex-program-code","_valueSetStrength":"example"},{"_name":"quantity","_type":"Quantity","_multiple":false,"_required":false,"_properties":[]},{"_name":"unitPrice","_type":"Money","_multiple":false,"_required":false,"_properties":[]},{"_name":"factor","_type":"decimal","_multiple":false,"_required":false,"_properties":[]},{"_name":"net","_type":"Money","_multiple":false,"_required":false,"_properties":[]},{"_name":"udi","_type":"Reference","_multiple":true,"_required":false,"_properties":[]},{"_name":"noteNumber","_type":"positiveInt","_multiple":true,"_required":false,"_properties":[]},{"_name":"adjudication","_type":"#ExplanationOfBenefit.item.adjudication","_multiple":true,"_required":false},{"_name":"subDetail","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"sequence","_type":"positiveInt","_multiple":false,"_required":true,"_properties":[]},{"_name":"revenue","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/ex-revenue-center","_valueSetStrength":"example"},{"_name":"category","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/benefit-subcategory","_valueSetStrength":"example"},{"_name":"service","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/service-uscls","_valueSetStrength":"example"},{"_name":"modifier","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/claim-modifiers","_valueSetStrength":"example"},{"_name":"programCode","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/ex-program-code","_valueSetStrength":"example"},{"_name":"quantity","_type":"Quantity","_multiple":false,"_required":false,"_properties":[]},{"_name":"unitPrice","_type":"Money","_multiple":false,"_required":false,"_properties":[]},{"_name":"factor","_type":"decimal","_multiple":false,"_required":false,"_properties":[]},{"_name":"net","_type":"Money","_multiple":false,"_required":false,"_properties":[]},{"_name":"udi","_type":"Reference","_multiple":true,"_required":false,"_properties":[]},{"_name":"noteNumber","_type":"positiveInt","_multiple":true,"_required":false,"_properties":[]},{"_name":"adjudication","_type":"#ExplanationOfBenefit.item.adjudication","_multiple":true,"_required":false}]}]}]},{"_name":"addItem","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"itemSequence","_type":"positiveInt","_multiple":true,"_required":false,"_properties":[]},{"_name":"detailSequence","_type":"positiveInt","_multiple":true,"_required":false,"_properties":[]},{"_name":"subDetailSequence","_type":"positiveInt","_multiple":true,"_required":false,"_properties":[]},{"_name":"service","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/service-uscls","_valueSetStrength":"example"},{"_name":"modifier","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/claim-modifiers","_valueSetStrength":"example"},{"_name":"fee","_type":"Money","_multiple":false,"_required":false,"_properties":[]},{"_name":"noteNumber","_type":"positiveInt","_multiple":true,"_required":false,"_properties":[]},{"_name":"adjudication","_type":"#ExplanationOfBenefit.item.adjudication","_multiple":true,"_required":false}]},{"_name":"totalCost","_type":"Money","_multiple":false,"_required":false},{"_name":"unallocDeductable","_type":"Money","_multiple":false,"_required":false},{"_name":"totalBenefit","_type":"Money","_multiple":false,"_required":false},{"_name":"payment","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/ex-paymenttype","_valueSetStrength":"example"},{"_name":"adjustment","_type":"Money","_multiple":false,"_required":false,"_properties":[]},{"_name":"adjustmentReason","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/payment-adjustment-reason","_valueSetStrength":"example"},{"_name":"date","_type":"date","_multiple":false,"_required":false,"_properties":[]},{"_name":"amount","_type":"Money","_multiple":false,"_required":false,"_properties":[]},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"form","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/forms","_valueSetStrength":"example"},{"_name":"processNote","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"number","_type":"positiveInt","_multiple":false,"_required":false,"_properties":[]},{"_name":"type","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/note-type","_valueSetStrength":"required"},{"_name":"text","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"language","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"}]},{"_name":"benefitBalance","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"category","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/benefit-category","_valueSetStrength":"example"},{"_name":"subCategory","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/benefit-subcategory","_valueSetStrength":"example"},{"_name":"excluded","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"name","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"network","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/benefit-network","_valueSetStrength":"example"},{"_name":"unit","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/benefit-unit","_valueSetStrength":"example"},{"_name":"term","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/benefit-term","_valueSetStrength":"example"},{"_name":"financial","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/benefit-type","_valueSetStrength":"example"},{"_name":"allowedUnsignedInt","_choice":"allowed[x]","_type":"unsignedInt","_multiple":false,"_required":false},{"_name":"allowedString","_choice":"allowed[x]","_type":"string","_multiple":false,"_required":false},{"_name":"allowedMoney","_choice":"allowed[x]","_type":"Money","_multiple":false,"_required":false},{"_name":"usedUnsignedInt","_choice":"used[x]","_type":"unsignedInt","_multiple":false,"_required":false},{"_name":"usedMoney","_choice":"used[x]","_type":"Money","_multiple":false,"_required":false}]}]}]},"FamilyMemberHistory":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"instantiates","_type":"uri","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/history-status","_valueSetStrength":"required"},{"_name":"dataAbsentReason","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/history-absent-reason","_valueSetStrength":"example"},{"_name":"patient","_type":"Reference","_multiple":false,"_required":true},{"_name":"date","_type":"dateTime","_multiple":false,"_required":false},{"_name":"name","_type":"string","_multiple":false,"_required":false},{"_name":"relationship","_type":"CodeableConcept","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/v3-FamilyMember","_valueSetStrength":"example"},{"_name":"gender","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/administrative-gender","_valueSetStrength":"required"},{"_name":"bornPeriod","_choice":"born","_type":"Period","_multiple":false,"_required":false},{"_name":"bornDate","_choice":"born","_type":"date","_multiple":false,"_required":false},{"_name":"bornString","_choice":"born","_type":"string","_multiple":false,"_required":false},{"_name":"ageAge","_choice":"age","_type":"Age","_multiple":false,"_required":false},{"_name":"ageRange","_choice":"age","_type":"Range","_multiple":false,"_required":false},{"_name":"ageString","_choice":"age","_type":"string","_multiple":false,"_required":false},{"_name":"estimatedAge","_type":"boolean","_multiple":false,"_required":false},{"_name":"deceasedBoolean","_choice":"deceased","_type":"boolean","_multiple":false,"_required":false},{"_name":"deceasedAge","_choice":"deceased","_type":"Age","_multiple":false,"_required":false},{"_name":"deceasedRange","_choice":"deceased","_type":"Range","_multiple":false,"_required":false},{"_name":"deceasedDate","_choice":"deceased","_type":"date","_multiple":false,"_required":false},{"_name":"deceasedString","_choice":"deceased","_type":"string","_multiple":false,"_required":false},{"_name":"reasonCode","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/clinical-findings","_valueSetStrength":"example"},{"_name":"reasonReference","_type":"Reference","_multiple":true},{"_name":"note","_type":"Annotation","_multiple":true,"_required":false},{"_name":"condition","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/condition-code","_valueSetStrength":"example"},{"_name":"outcome","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/condition-outcome","_valueSetStrength":"example"},{"_name":"onsetAge","_choice":"onset[x]","_type":"Age","_multiple":false,"_required":false},{"_name":"onsetRange","_choice":"onset[x]","_type":"Range","_multiple":false,"_required":false},{"_name":"onsetPeriod","_choice":"onset[x]","_type":"Period","_multiple":false,"_required":false},{"_name":"onsetString","_choice":"onset[x]","_type":"string","_multiple":false,"_required":false},{"_name":"note","_type":"Annotation","_multiple":true,"_required":false,"_properties":[]}]}]},"Flag":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/flag-status","_valueSetStrength":"required"},{"_name":"category","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/flag-category","_valueSetStrength":"example"},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/flag-code","_valueSetStrength":"example"},{"_name":"subject","_type":"Reference","_multiple":false},{"_name":"period","_type":"Period","_multiple":false,"_required":false},{"_name":"encounter","_type":"Reference","_multiple":false,"_required":false},{"_name":"author","_type":"Reference","_multiple":false}]},"Goal":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/goal-status","_valueSetStrength":"required"},{"_name":"category","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/goal-category","_valueSetStrength":"example"},{"_name":"priority","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/goal-priority","_valueSetStrength":"preferred"},{"_name":"description","_type":"CodeableConcept","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/clinical-findings","_valueSetStrength":"example"},{"_name":"subject","_type":"Reference","_multiple":false},{"_name":"startDate","_choice":"start","_type":"date","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/goal-start-event","_valueSetStrength":"example"},{"_name":"startCodeableConcept","_choice":"start","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/goal-start-event","_valueSetStrength":"example"},{"_name":"target","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"measure","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/observation-codes","_valueSetStrength":"example"},{"_name":"detailQuantity","_choice":"detail[x]","_type":"Quantity","_multiple":false,"_required":false},{"_name":"detailRange","_choice":"detail[x]","_type":"Range","_multiple":false,"_required":false},{"_name":"detailCodeableConcept","_choice":"detail[x]","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"dueDate","_choice":"due[x]","_type":"date","_multiple":false,"_required":false},{"_name":"dueDuration","_choice":"due[x]","_type":"Duration","_multiple":false,"_required":false}]},{"_name":"statusDate","_type":"date","_multiple":false,"_required":false},{"_name":"statusReason","_type":"string","_multiple":false,"_required":false},{"_name":"expressedBy","_type":"Reference","_multiple":false},{"_name":"addresses","_type":"Reference","_multiple":true},{"_name":"note","_type":"Annotation","_multiple":true,"_required":false},{"_name":"outcomeCode","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/clinical-findings","_valueSetStrength":"example"},{"_name":"outcomeReference","_type":"Reference","_multiple":true,"_required":false}]},"GraphDefinition":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"url","_type":"uri","_multiple":false,"_required":false},{"_name":"version","_type":"string","_multiple":false,"_required":false},{"_name":"name","_type":"string","_multiple":false,"_required":true},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/publication-status","_valueSetStrength":"required"},{"_name":"experimental","_type":"boolean","_multiple":false,"_required":false},{"_name":"date","_type":"dateTime","_multiple":false,"_required":false},{"_name":"publisher","_type":"string","_multiple":false,"_required":false},{"_name":"contact","_type":"ContactDetail","_multiple":true,"_required":false},{"_name":"description","_type":"markdown","_multiple":false,"_required":false},{"_name":"useContext","_type":"UsageContext","_multiple":true,"_required":false},{"_name":"jurisdiction","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/jurisdiction","_valueSetStrength":"extensible"},{"_name":"purpose","_type":"markdown","_multiple":false,"_required":false},{"_name":"start","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/resource-types","_valueSetStrength":"required"},{"_name":"profile","_type":"uri","_multiple":false,"_required":false},{"_name":"link","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"path","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"sliceName","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"min","_type":"integer","_multiple":false,"_required":false,"_properties":[]},{"_name":"max","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"target","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/resource-types","_valueSetStrength":"required"},{"_name":"params","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"profile","_type":"uri","_multiple":false,"_required":false,"_properties":[]},{"_name":"compartment","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"use","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/graph-compartment-use","_valueSetStrength":"required"},{"_name":"code","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/compartment-type","_valueSetStrength":"required"},{"_name":"rule","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/graph-compartment-rule","_valueSetStrength":"required"},{"_name":"expression","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"link","_type":"#GraphDefinition.link","_multiple":true,"_required":false}]}]}]},"Group":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"active","_type":"boolean","_multiple":false,"_required":false},{"_name":"type","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/group-type","_valueSetStrength":"required"},{"_name":"actual","_type":"boolean","_multiple":false,"_required":true},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"name","_type":"string","_multiple":false,"_required":false},{"_name":"quantity","_type":"unsignedInt","_multiple":false,"_required":false},{"_name":"characteristic","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[]},{"_name":"valueCodeableConcept","_choice":"value[x]","_type":"CodeableConcept","_multiple":false,"_required":true},{"_name":"valueBoolean","_choice":"value[x]","_type":"boolean","_multiple":false,"_required":true},{"_name":"valueQuantity","_choice":"value[x]","_type":"Quantity","_multiple":false,"_required":true},{"_name":"valueRange","_choice":"value[x]","_type":"Range","_multiple":false,"_required":true},{"_name":"exclude","_type":"boolean","_multiple":false,"_required":true,"_properties":[]},{"_name":"period","_type":"Period","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"member","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"entity","_type":"Reference","_multiple":false,"_required":true},{"_name":"period","_type":"Period","_multiple":false,"_required":false,"_properties":[]},{"_name":"inactive","_type":"boolean","_multiple":false,"_required":false,"_properties":[]}]}]},"GuidanceResponse":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"requestId","_type":"id","_multiple":false,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"module","_type":"Reference","_multiple":false,"_required":true},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/guidance-response-status","_valueSetStrength":"required"},{"_name":"subject","_type":"Reference","_multiple":false},{"_name":"context","_type":"Reference","_multiple":false},{"_name":"occurrenceDateTime","_type":"dateTime","_multiple":false,"_required":false},{"_name":"performer","_type":"Reference","_multiple":false,"_required":false},{"_name":"reasonCodeableConcept","_choice":"reason","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"reasonReference","_choice":"reason","_type":"Reference","_multiple":false,"_required":false},{"_name":"note","_type":"Annotation","_multiple":true,"_required":false},{"_name":"evaluationMessage","_type":"Reference","_multiple":true,"_required":false},{"_name":"outputParameters","_type":"Reference","_multiple":false,"_required":false},{"_name":"result","_type":"Reference","_multiple":false},{"_name":"dataRequirement","_type":"DataRequirement","_multiple":true,"_required":false}]},"HealthcareService":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"active","_type":"boolean","_multiple":false,"_required":false},{"_name":"providedBy","_type":"Reference","_multiple":false,"_required":false},{"_name":"category","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/service-category","_valueSetStrength":"example"},{"_name":"type","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/service-type","_valueSetStrength":"example"},{"_name":"specialty","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/c80-practice-codes","_valueSetStrength":"preferred"},{"_name":"location","_type":"Reference","_multiple":true,"_required":false},{"_name":"name","_type":"string","_multiple":false,"_required":false},{"_name":"comment","_type":"string","_multiple":false,"_required":false},{"_name":"extraDetails","_type":"string","_multiple":false,"_required":false},{"_name":"photo","_type":"Attachment","_multiple":false,"_required":false},{"_name":"telecom","_type":"ContactPoint","_multiple":true,"_required":false},{"_name":"coverageArea","_type":"Reference","_multiple":true,"_required":false},{"_name":"serviceProvisionCode","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/service-provision-conditions","_valueSetStrength":"example"},{"_name":"eligibility","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"eligibilityNote","_type":"string","_multiple":false,"_required":false},{"_name":"programName","_type":"string","_multiple":true,"_required":false},{"_name":"characteristic","_type":"CodeableConcept","_multiple":true,"_required":false},{"_name":"referralMethod","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/service-referral-method","_valueSetStrength":"example"},{"_name":"appointmentRequired","_type":"boolean","_multiple":false,"_required":false},{"_name":"availableTime","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"daysOfWeek","_type":"code","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/days-of-week","_valueSetStrength":"required"},{"_name":"allDay","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"availableStartTime","_type":"time","_multiple":false,"_required":false,"_properties":[]},{"_name":"availableEndTime","_type":"time","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"notAvailable","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"description","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"during","_type":"Period","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"availabilityExceptions","_type":"string","_multiple":false,"_required":false},{"_name":"endpoint","_type":"Reference","_multiple":true,"_required":false}]},"ImagingStudy":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"uid","_type":"oid","_multiple":false,"_required":true},{"_name":"accession","_type":"Identifier","_multiple":false,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"availability","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/instance-availability","_valueSetStrength":"required"},{"_name":"modalityList","_type":"Coding","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/dicom-cid29","_valueSetStrength":"extensible"},{"_name":"subject","_type":"Reference","_multiple":false},{"_name":"context","_type":"Reference","_multiple":false},{"_name":"started","_type":"dateTime","_multiple":false,"_required":false},{"_name":"basedOn","_type":"Reference","_multiple":true},{"_name":"referrer","_type":"Reference","_multiple":false,"_required":false},{"_name":"interpreter","_type":"Reference","_multiple":true,"_required":false},{"_name":"endpoint","_type":"Reference","_multiple":true,"_required":false},{"_name":"numberOfSeries","_type":"unsignedInt","_multiple":false,"_required":false},{"_name":"numberOfInstances","_type":"unsignedInt","_multiple":false,"_required":false},{"_name":"procedureReference","_type":"Reference","_multiple":true,"_required":false},{"_name":"procedureCode","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/procedure-code","_valueSetStrength":"example"},{"_name":"reason","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/procedure-reason","_valueSetStrength":"example"},{"_name":"description","_type":"string","_multiple":false,"_required":false},{"_name":"series","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"uid","_type":"oid","_multiple":false,"_required":true,"_properties":[]},{"_name":"number","_type":"unsignedInt","_multiple":false,"_required":false,"_properties":[]},{"_name":"modality","_type":"Coding","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/dicom-cid29","_valueSetStrength":"extensible"},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"numberOfInstances","_type":"unsignedInt","_multiple":false,"_required":false,"_properties":[]},{"_name":"availability","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/instance-availability","_valueSetStrength":"required"},{"_name":"endpoint","_type":"Reference","_multiple":true,"_required":false,"_properties":[]},{"_name":"bodySite","_type":"Coding","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/body-site","_valueSetStrength":"example"},{"_name":"laterality","_type":"Coding","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/bodysite-laterality","_valueSetStrength":"example"},{"_name":"specimen","_type":"Reference","_multiple":true,"_required":false,"_properties":[]},{"_name":"started","_type":"dateTime","_multiple":false,"_required":false,"_properties":[]},{"_name":"performer","_type":"Reference","_multiple":true,"_required":false},{"_name":"instance","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"uid","_type":"oid","_multiple":false,"_required":true,"_properties":[]},{"_name":"number","_type":"unsignedInt","_multiple":false,"_required":false,"_properties":[]},{"_name":"sopClass","_type":"oid","_multiple":false,"_required":true,"_properties":[]},{"_name":"title","_type":"string","_multiple":false,"_required":false,"_properties":[]}]}]}]},"Immunization":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/immunization-status","_valueSetStrength":"required"},{"_name":"vaccineCode","_type":"CodeableConcept","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/vaccine-code","_valueSetStrength":"example"},{"_name":"patient","_type":"Reference","_multiple":false,"_required":true},{"_name":"encounter","_type":"Reference","_multiple":false,"_required":false},{"_name":"date","_type":"dateTime","_multiple":false,"_required":false},{"_name":"primarySource","_type":"boolean","_multiple":false,"_required":true},{"_name":"reportOrigin","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/immunization-origin","_valueSetStrength":"example"},{"_name":"location","_type":"Reference","_multiple":false,"_required":false},{"_name":"manufacturer","_type":"Reference","_multiple":false,"_required":false},{"_name":"lotNumber","_type":"string","_multiple":false,"_required":false},{"_name":"expirationDate","_type":"date","_multiple":false,"_required":false},{"_name":"site","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/immunization-site","_valueSetStrength":"example"},{"_name":"route","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/immunization-route","_valueSetStrength":"example"},{"_name":"doseQuantity","_type":"Quantity","_multiple":false,"_required":false},{"_name":"practitioner","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"role","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/immunization-role","_valueSetStrength":"extensible"},{"_name":"actor","_type":"Reference","_multiple":false,"_required":true,"_properties":[]}]},{"_name":"note","_type":"Annotation","_multiple":true,"_required":false},{"_name":"reason","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/immunization-reason","_valueSetStrength":"example"},{"_name":"education","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"documentType","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"reference","_type":"uri","_multiple":false,"_required":false,"_properties":[]},{"_name":"publicationDate","_type":"dateTime","_multiple":false,"_required":false,"_properties":[]},{"_name":"presentationDate","_type":"dateTime","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"programEligibility","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/immunization-program-eligibility","_valueSetStrength":"example"},{"_name":"fundingSource","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/immunization-funding-source","_valueSetStrength":"example"}]},"ImmunizationEvaluation":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/immunization-evaluation-status","_valueSetStrength":"required"},{"_name":"patient","_type":"Reference","_multiple":false,"_required":true},{"_name":"date","_type":"dateTime","_multiple":false,"_required":false},{"_name":"authority","_type":"Reference","_multiple":false,"_required":false},{"_name":"targetDisease","_type":"CodeableConcept","_multiple":true,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/immunization-evaluation-target-disease","_valueSetStrength":"example"},{"_name":"immunizationEvent","_type":"Reference","_multiple":false,"_required":true},{"_name":"doseStatus","_type":"CodeableConcept","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/immunization-evaluation-dose-status","_valueSetStrength":"example"},{"_name":"doseStatusReason","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/immunization-evaluation-dose-status-reason","_valueSetStrength":"example"},{"_name":"description","_type":"string","_multiple":false,"_required":false},{"_name":"series","_type":"string","_multiple":false,"_required":false},{"_name":"doseNumber","_type":"positiveInt","_multiple":false,"_required":false},{"_name":"seriesDoses","_type":"positiveInt","_multiple":false,"_required":false}]},"ImmunizationRecommendation":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"patient","_type":"Reference","_multiple":false,"_required":true},{"_name":"date","_type":"dateTime","_multiple":false,"_required":true},{"_name":"authority","_type":"Reference","_multiple":false,"_required":false},{"_name":"recommendation","_type":"BackboneElement","_multiple":true,"_required":true,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"vaccineCode","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/vaccine-code","_valueSetStrength":"example"},{"_name":"targetDisease","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/immunization-recommendation-target-disease","_valueSetStrength":"example"},{"_name":"contraindicatedVaccineCode","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/vaccine-code","_valueSetStrength":"example"},{"_name":"forecastStatus","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/immunization-recommendation-status","_valueSetStrength":"example"},{"_name":"forecastReason","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/immunization-recommendation-reason","_valueSetStrength":"example"},{"_name":"dateCriterion","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/immunization-recommendation-date-criterion","_valueSetStrength":"example"},{"_name":"value","_type":"dateTime","_multiple":false,"_required":true,"_properties":[]}]},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"series","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"doseNumber","_type":"positiveInt","_multiple":false,"_required":false,"_properties":[]},{"_name":"seriesDoses","_type":"positiveInt","_multiple":false,"_required":false,"_properties":[]},{"_name":"supportingImmunization","_type":"Reference","_multiple":true,"_required":false},{"_name":"supportingPatientInformation","_type":"Reference","_multiple":true,"_required":false,"_properties":[]}]}]},"ImplementationGuide":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"url","_type":"uri","_multiple":false,"_required":true},{"_name":"version","_type":"string","_multiple":false,"_required":false},{"_name":"name","_type":"string","_multiple":false,"_required":true},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/publication-status","_valueSetStrength":"required"},{"_name":"experimental","_type":"boolean","_multiple":false,"_required":false},{"_name":"date","_type":"dateTime","_multiple":false,"_required":false},{"_name":"publisher","_type":"string","_multiple":false,"_required":false},{"_name":"contact","_type":"ContactDetail","_multiple":true,"_required":false},{"_name":"description","_type":"markdown","_multiple":false,"_required":false},{"_name":"useContext","_type":"UsageContext","_multiple":true,"_required":false},{"_name":"jurisdiction","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/jurisdiction","_valueSetStrength":"extensible"},{"_name":"copyright","_type":"markdown","_multiple":false,"_required":false},{"_name":"fhirVersion","_type":"id","_multiple":false,"_required":false},{"_name":"dependency","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/guide-dependency-type","_valueSetStrength":"required"},{"_name":"uri","_type":"uri","_multiple":false,"_required":true,"_properties":[]}]},{"_name":"package","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"name","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"resource","_type":"BackboneElement","_multiple":true,"_required":true,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"example","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"name","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"acronym","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"sourceUri","_choice":"source[x]","_type":"uri","_multiple":false,"_required":true},{"_name":"sourceReference","_choice":"source[x]","_type":"Reference","_multiple":false,"_required":true},{"_name":"exampleFor","_type":"Reference","_multiple":false,"_required":false,"_properties":[]}]}]},{"_name":"global","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/resource-types","_valueSetStrength":"required"},{"_name":"profile","_type":"Reference","_multiple":false,"_required":true,"_properties":[]}]},{"_name":"binary","_type":"uri","_multiple":true,"_required":false},{"_name":"page","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"source","_type":"uri","_multiple":false,"_required":true,"_properties":[]},{"_name":"title","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"kind","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/guide-page-kind","_valueSetStrength":"required"},{"_name":"type","_type":"code","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/resource-types","_valueSetStrength":"required"},{"_name":"package","_type":"string","_multiple":true,"_required":false,"_properties":[]},{"_name":"format","_type":"code","_multiple":false,"_required":false,"_properties":[]},{"_name":"page","_type":"#ImplementationGuide.page","_multiple":true,"_required":false}]}]},"ImplementationGuideInput":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"url","_type":"uri","_multiple":false,"_required":true},{"_name":"version","_type":"string","_multiple":false,"_required":false},{"_name":"name","_type":"string","_multiple":false,"_required":true},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/publication-status","_valueSetStrength":"required"},{"_name":"experimental","_type":"boolean","_multiple":false,"_required":false},{"_name":"date","_type":"dateTime","_multiple":false,"_required":false},{"_name":"publisher","_type":"string","_multiple":false,"_required":false},{"_name":"contact","_type":"ContactDetail","_multiple":true,"_required":false},{"_name":"description","_type":"markdown","_multiple":false,"_required":false},{"_name":"useContext","_type":"UsageContext","_multiple":true,"_required":false},{"_name":"jurisdiction","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/jurisdiction","_valueSetStrength":"extensible"},{"_name":"copyright","_type":"markdown","_multiple":false,"_required":false},{"_name":"fhirVersion","_type":"id","_multiple":false,"_required":false},{"_name":"dependsOn","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"definition","_type":"Reference","_multiple":false,"_required":true,"_properties":[]},{"_name":"version","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"global","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/resource-types","_valueSetStrength":"required"},{"_name":"profile","_type":"Reference","_multiple":false,"_required":true,"_properties":[]}]},{"_name":"definition","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"package","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"name","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"resource","_type":"BackboneElement","_multiple":true,"_required":true,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"reference","_type":"Reference","_multiple":false,"_required":true,"_properties":[]},{"_name":"name","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"exampleBoolean","_choice":"example[x]","_type":"boolean","_multiple":false,"_required":false},{"_name":"exampleReference","_choice":"example[x]","_type":"Reference","_multiple":false,"_required":false},{"_name":"package","_type":"id","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"page","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"nameUri","_choice":"name[x]","_type":"uri","_multiple":false,"_required":true},{"_name":"nameReference","_choice":"name[x]","_type":"Reference","_multiple":false,"_required":true},{"_name":"title","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"page","_type":"#ImplementationGuideInput.definition.page","_multiple":true,"_required":false}]},{"_name":"parameter","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/guide-parameter-code","_valueSetStrength":"required"},{"_name":"value","_type":"string","_multiple":false,"_required":true,"_properties":[]}]},{"_name":"template","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"code","_multiple":false,"_required":true,"_properties":[]},{"_name":"source","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"scope","_type":"string","_multiple":false,"_required":false,"_properties":[]}]}]}]},"ImplementationGuideOutput":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"url","_type":"uri","_multiple":false,"_required":true},{"_name":"version","_type":"string","_multiple":false,"_required":false},{"_name":"name","_type":"string","_multiple":false,"_required":true},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/publication-status","_valueSetStrength":"required"},{"_name":"experimental","_type":"boolean","_multiple":false,"_required":false},{"_name":"date","_type":"dateTime","_multiple":false,"_required":false},{"_name":"publisher","_type":"string","_multiple":false,"_required":false},{"_name":"contact","_type":"ContactDetail","_multiple":true,"_required":false},{"_name":"description","_type":"markdown","_multiple":false,"_required":false},{"_name":"useContext","_type":"UsageContext","_multiple":true,"_required":false},{"_name":"jurisdiction","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/jurisdiction","_valueSetStrength":"extensible"},{"_name":"copyright","_type":"markdown","_multiple":false,"_required":false},{"_name":"fhirVersion","_type":"id","_multiple":false,"_required":false},{"_name":"dependsOn","_type":"Reference","_multiple":true,"_required":false},{"_name":"resource","_type":"BackboneElement","_multiple":true,"_required":true,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"reference","_type":"Reference","_multiple":false,"_required":true,"_properties":[]},{"_name":"exampleBoolean","_choice":"example[x]","_type":"boolean","_multiple":false,"_required":false},{"_name":"exampleReference","_choice":"example[x]","_type":"Reference","_multiple":false,"_required":false},{"_name":"relativePath","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"global","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/resource-types","_valueSetStrength":"required"},{"_name":"profile","_type":"Reference","_multiple":false,"_required":true,"_properties":[]}]},{"_name":"rendering","_type":"uri","_multiple":false,"_required":false},{"_name":"page","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"name","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"title","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"anchor","_type":"string","_multiple":true,"_required":false,"_properties":[]}]},{"_name":"image","_type":"string","_multiple":true,"_required":false},{"_name":"other","_type":"string","_multiple":true,"_required":false}]},"Invoice":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/invoice-status","_valueSetStrength":"required"},{"_name":"cancelledReason","_type":"string","_multiple":false,"_required":false},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"subject","_type":"Reference","_multiple":false},{"_name":"recipient","_type":"Reference","_multiple":false},{"_name":"date","_type":"dateTime","_multiple":false,"_required":false},{"_name":"participant","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"role","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"actor","_type":"Reference","_multiple":false,"_required":true}]},{"_name":"issuer","_type":"Reference","_multiple":false,"_required":false},{"_name":"account","_type":"Reference","_multiple":false,"_required":false},{"_name":"lineItem","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"sequence","_type":"positiveInt","_multiple":false,"_required":false,"_properties":[]},{"_name":"chargeItem","_type":"Reference","_multiple":false,"_required":true,"_properties":[]},{"_name":"priceComponent","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/invoice-priceComponentType","_valueSetStrength":"required"},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"factor","_type":"Money","_multiple":false,"_required":false,"_properties":[]},{"_name":"amount","_type":"decimal","_multiple":false,"_required":false,"_properties":[]}]}]},{"_name":"totalNet","_type":"Money","_multiple":false,"_required":false},{"_name":"totalGross","_type":"Money","_multiple":false,"_required":false},{"_name":"paymentTerms","_type":"markdown","_multiple":false,"_required":false},{"_name":"note","_type":"Annotation","_multiple":true,"_required":false}]},"ItemInstance":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"count","_type":"integer","_multiple":false,"_required":true},{"_name":"location","_type":"Reference","_multiple":false,"_required":false},{"_name":"subject","_type":"Reference","_multiple":false,"_required":false},{"_name":"manufactureDate","_type":"dateTime","_multiple":false,"_required":false},{"_name":"expiryDate","_type":"dateTime","_multiple":false,"_required":false},{"_name":"currentSWVersion","_type":"string","_multiple":false,"_required":false},{"_name":"lotNumber","_type":"string","_multiple":false,"_required":false},{"_name":"serialNumber","_type":"string","_multiple":false,"_required":false},{"_name":"carrierAIDC","_type":"string","_multiple":false,"_required":false},{"_name":"carrierHRF","_type":"string","_multiple":false,"_required":false}]},"Library":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"url","_type":"uri","_multiple":false,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"version","_type":"string","_multiple":false,"_required":false},{"_name":"name","_type":"string","_multiple":false,"_required":false},{"_name":"title","_type":"string","_multiple":false,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/publication-status","_valueSetStrength":"required"},{"_name":"experimental","_type":"boolean","_multiple":false,"_required":false},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/library-type","_valueSetStrength":"extensible"},{"_name":"date","_type":"dateTime","_multiple":false,"_required":false},{"_name":"publisher","_type":"string","_multiple":false,"_required":false},{"_name":"description","_type":"markdown","_multiple":false,"_required":false},{"_name":"purpose","_type":"markdown","_multiple":false,"_required":false},{"_name":"usage","_type":"string","_multiple":false,"_required":false},{"_name":"approvalDate","_type":"date","_multiple":false,"_required":false},{"_name":"lastReviewDate","_type":"date","_multiple":false,"_required":false},{"_name":"effectivePeriod","_type":"Period","_multiple":false,"_required":false},{"_name":"useContext","_type":"UsageContext","_multiple":true,"_required":false},{"_name":"jurisdiction","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/jurisdiction","_valueSetStrength":"extensible"},{"_name":"topic","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/definition-topic","_valueSetStrength":"example"},{"_name":"contributor","_type":"Contributor","_multiple":true,"_required":false},{"_name":"contact","_type":"ContactDetail","_multiple":true,"_required":false},{"_name":"copyright","_type":"markdown","_multiple":false,"_required":false},{"_name":"relatedArtifact","_type":"RelatedArtifact","_multiple":true,"_required":false},{"_name":"parameter","_type":"ParameterDefinition","_multiple":true,"_required":false},{"_name":"dataRequirement","_type":"DataRequirement","_multiple":true,"_required":false},{"_name":"content","_type":"Attachment","_multiple":true,"_required":false}]},"Linkage":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"active","_type":"boolean","_multiple":false,"_required":false},{"_name":"author","_type":"Reference","_multiple":false},{"_name":"item","_type":"BackboneElement","_multiple":true,"_required":true,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/linkage-type","_valueSetStrength":"required"},{"_name":"resource","_type":"Reference","_multiple":false,"_required":true,"_properties":[]}]}]},"List":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/list-status","_valueSetStrength":"required"},{"_name":"mode","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/list-mode","_valueSetStrength":"required"},{"_name":"title","_type":"string","_multiple":false,"_required":false},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/list-example-codes","_valueSetStrength":"example"},{"_name":"subject","_type":"Reference","_multiple":false},{"_name":"encounter","_type":"Reference","_multiple":false,"_required":false},{"_name":"date","_type":"dateTime","_multiple":false,"_required":false},{"_name":"source","_type":"Reference","_multiple":false},{"_name":"orderedBy","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/list-order","_valueSetStrength":"preferred"},{"_name":"note","_type":"Annotation","_multiple":true,"_required":false},{"_name":"entry","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"flag","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/list-item-flag","_valueSetStrength":"example"},{"_name":"deleted","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"date","_type":"dateTime","_multiple":false,"_required":false,"_properties":[]},{"_name":"item","_type":"Reference","_multiple":false,"_required":true,"_properties":[]}]},{"_name":"emptyReason","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/list-empty-reason","_valueSetStrength":"preferred"}]},"Location":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/location-status","_valueSetStrength":"required"},{"_name":"operationalStatus","_type":"Coding","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/v2-0116","_valueSetStrength":"preferred"},{"_name":"name","_type":"string","_multiple":false,"_required":false},{"_name":"alias","_type":"string","_multiple":true,"_required":false},{"_name":"description","_type":"string","_multiple":false,"_required":false},{"_name":"mode","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/location-mode","_valueSetStrength":"required"},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/v3-ServiceDeliveryLocationRoleType","_valueSetStrength":"extensible"},{"_name":"telecom","_type":"ContactPoint","_multiple":true,"_required":false},{"_name":"address","_type":"Address","_multiple":false,"_required":false},{"_name":"physicalType","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/location-physical-type","_valueSetStrength":"example"},{"_name":"position","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"longitude","_type":"decimal","_multiple":false,"_required":true,"_properties":[]},{"_name":"latitude","_type":"decimal","_multiple":false,"_required":true,"_properties":[]},{"_name":"altitude","_type":"decimal","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"managingOrganization","_type":"Reference","_multiple":false,"_required":false},{"_name":"partOf","_type":"Reference","_multiple":false,"_required":false},{"_name":"hoursOfOperation","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"daysOfWeek","_type":"code","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/days-of-week","_valueSetStrength":"required"},{"_name":"allDay","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"openingTime","_type":"time","_multiple":false,"_required":false,"_properties":[]},{"_name":"closingTime","_type":"time","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"availabilityExceptions","_type":"string","_multiple":false,"_required":false},{"_name":"endpoint","_type":"Reference","_multiple":true,"_required":false}]},"Measure":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"url","_type":"uri","_multiple":false,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"version","_type":"string","_multiple":false,"_required":false},{"_name":"name","_type":"string","_multiple":false,"_required":false},{"_name":"title","_type":"string","_multiple":false,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/publication-status","_valueSetStrength":"required"},{"_name":"experimental","_type":"boolean","_multiple":false,"_required":false},{"_name":"date","_type":"dateTime","_multiple":false,"_required":false},{"_name":"publisher","_type":"string","_multiple":false,"_required":false},{"_name":"description","_type":"markdown","_multiple":false,"_required":false},{"_name":"purpose","_type":"markdown","_multiple":false,"_required":false},{"_name":"usage","_type":"string","_multiple":false,"_required":false},{"_name":"approvalDate","_type":"date","_multiple":false,"_required":false},{"_name":"lastReviewDate","_type":"date","_multiple":false,"_required":false},{"_name":"effectivePeriod","_type":"Period","_multiple":false,"_required":false},{"_name":"useContext","_type":"UsageContext","_multiple":true,"_required":false},{"_name":"jurisdiction","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/jurisdiction","_valueSetStrength":"extensible"},{"_name":"subject","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/subject-type","_valueSetStrength":"extensible"},{"_name":"topic","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/definition-topic","_valueSetStrength":"example"},{"_name":"contributor","_type":"Contributor","_multiple":true,"_required":false},{"_name":"contact","_type":"ContactDetail","_multiple":true,"_required":false},{"_name":"copyright","_type":"markdown","_multiple":false,"_required":false},{"_name":"relatedArtifact","_type":"RelatedArtifact","_multiple":true,"_required":false},{"_name":"library","_type":"Reference","_multiple":true,"_required":false},{"_name":"disclaimer","_type":"markdown","_multiple":false,"_required":false},{"_name":"scoring","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/measure-scoring","_valueSetStrength":"extensible"},{"_name":"compositeScoring","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/composite-measure-scoring","_valueSetStrength":"extensible"},{"_name":"type","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/measure-type","_valueSetStrength":"extensible"},{"_name":"riskAdjustment","_type":"string","_multiple":false,"_required":false},{"_name":"rateAggregation","_type":"string","_multiple":false,"_required":false},{"_name":"rationale","_type":"markdown","_multiple":false,"_required":false},{"_name":"clinicalRecommendationStatement","_type":"markdown","_multiple":false,"_required":false},{"_name":"improvementNotation","_type":"string","_multiple":false,"_required":false},{"_name":"definition","_type":"markdown","_multiple":true,"_required":false},{"_name":"guidance","_type":"markdown","_multiple":false,"_required":false},{"_name":"set","_type":"string","_multiple":false,"_required":false},{"_name":"group","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"population","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/measure-population","_valueSetStrength":"extensible"},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"criteria","_type":"string","_multiple":false,"_required":true,"_properties":[]}]},{"_name":"stratifier","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"criteria","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"path","_type":"string","_multiple":false,"_required":false,"_properties":[]}]}]},{"_name":"supplementalData","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"usage","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/measure-data-usage","_valueSetStrength":"extensible"},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"criteria","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"path","_type":"string","_multiple":false,"_required":false,"_properties":[]}]}]},"MeasureReport":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/measure-report-status","_valueSetStrength":"required"},{"_name":"type","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/measure-report-type","_valueSetStrength":"required"},{"_name":"measure","_type":"Reference","_multiple":false,"_required":true},{"_name":"subject","_type":"Reference","_multiple":false},{"_name":"date","_type":"dateTime","_multiple":false,"_required":false},{"_name":"reportingOrganization","_type":"Reference","_multiple":false,"_required":false},{"_name":"period","_type":"Period","_multiple":false,"_required":true},{"_name":"group","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"population","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"count","_type":"integer","_multiple":false,"_required":false,"_properties":[]},{"_name":"subjects","_type":"Reference","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"measureScore","_type":"Quantity","_multiple":false,"_required":false,"_properties":[]},{"_name":"stratifier","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"stratum","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"value","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[]},{"_name":"population","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"count","_type":"integer","_multiple":false,"_required":false,"_properties":[]},{"_name":"subjects","_type":"Reference","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"measureScore","_type":"Quantity","_multiple":false,"_required":false,"_properties":[]}]}]}]},{"_name":"evaluatedResources","_type":"Reference","_multiple":false,"_required":false}]},"Media":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"basedOn","_type":"Reference","_multiple":true},{"_name":"partOf","_type":"Reference","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/media-status","_valueSetStrength":"required"},{"_name":"category","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/media-category","_valueSetStrength":"example"},{"_name":"modality","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/digital-media-subtype","_valueSetStrength":"example"},{"_name":"view","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/media-view","_valueSetStrength":"example"},{"_name":"subject","_type":"Reference","_multiple":false},{"_name":"context","_type":"Reference","_multiple":false},{"_name":"createdDateTime","_choice":"created","_type":"dateTime","_multiple":false,"_required":false},{"_name":"createdPeriod","_choice":"created","_type":"Period","_multiple":false,"_required":false},{"_name":"issued","_type":"instant","_multiple":false,"_required":false},{"_name":"operator","_type":"Reference","_multiple":false},{"_name":"reasonCode","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/procedure-reason","_valueSetStrength":"example"},{"_name":"bodySite","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/body-site","_valueSetStrength":"example"},{"_name":"deviceName","_type":"string","_multiple":false,"_required":false},{"_name":"device","_type":"Reference","_multiple":false},{"_name":"height","_type":"positiveInt","_multiple":false,"_required":false},{"_name":"width","_type":"positiveInt","_multiple":false,"_required":false},{"_name":"frames","_type":"positiveInt","_multiple":false,"_required":false},{"_name":"duration","_type":"decimal","_multiple":false,"_required":false},{"_name":"content","_type":"Attachment","_multiple":false,"_required":true},{"_name":"note","_type":"Annotation","_multiple":true,"_required":false}]},"Medication":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/medication-codes","_valueSetStrength":"example"},{"_name":"status","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/medication-status","_valueSetStrength":"required"},{"_name":"manufacturer","_type":"Reference","_multiple":false,"_required":false},{"_name":"form","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/medication-form-codes","_valueSetStrength":"example"},{"_name":"amount","_type":"Quantity","_multiple":false,"_required":false},{"_name":"ingredient","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"itemCodeableConcept","_choice":"item[x]","_type":"CodeableConcept","_multiple":false,"_required":true},{"_name":"itemReference","_choice":"item[x]","_type":"Reference","_multiple":false,"_required":true},{"_name":"itemReference","_choice":"item[x]","_type":"Reference","_multiple":false,"_required":true},{"_name":"isActive","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"amount","_type":"Ratio","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"batch","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"lotNumber","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"expirationDate","_type":"dateTime","_multiple":false,"_required":false,"_properties":[]}]}]},"MedicationAdministration":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"instantiates","_type":"uri","_multiple":true,"_required":false},{"_name":"partOf","_type":"Reference","_multiple":true},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/medication-admin-status","_valueSetStrength":"required"},{"_name":"category","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/medication-admin-category","_valueSetStrength":"preferred"},{"_name":"medicationCodeableConcept","_choice":"medication","_type":"CodeableConcept","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/medication-codes","_valueSetStrength":"example"},{"_name":"medicationReference","_choice":"medication","_type":"Reference","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/medication-codes","_valueSetStrength":"example"},{"_name":"subject","_type":"Reference","_multiple":false},{"_name":"context","_type":"Reference","_multiple":false},{"_name":"supportingInformation","_type":"Reference","_multiple":true,"_required":false},{"_name":"effectiveDateTime","_choice":"effective","_type":"dateTime","_multiple":false,"_required":true},{"_name":"effectivePeriod","_choice":"effective","_type":"Period","_multiple":false,"_required":true},{"_name":"performer","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"function","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/med-admin-perform-function","_valueSetStrength":"example"},{"_name":"actor","_type":"Reference","_multiple":false,"_required":true}]},{"_name":"statusReason","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/reason-medication-not-given-codes","_valueSetStrength":"example"},{"_name":"reasonCode","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/reason-medication-given-codes","_valueSetStrength":"example"},{"_name":"reasonReference","_type":"Reference","_multiple":true},{"_name":"request","_type":"Reference","_multiple":false,"_required":false},{"_name":"device","_type":"Reference","_multiple":true,"_required":false},{"_name":"note","_type":"Annotation","_multiple":true,"_required":false},{"_name":"dosage","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"text","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"site","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/approach-site-codes","_valueSetStrength":"example"},{"_name":"route","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/route-codes","_valueSetStrength":"example"},{"_name":"method","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/administration-method-codes","_valueSetStrength":"example"},{"_name":"dose","_type":"Quantity","_multiple":false,"_required":false,"_properties":[]},{"_name":"rateRatio","_choice":"rate[x]","_type":"Ratio","_multiple":false,"_required":false},{"_name":"rateQuantity","_choice":"rate[x]","_type":"Quantity","_multiple":false,"_required":false}]},{"_name":"eventHistory","_type":"Reference","_multiple":true,"_required":false}]},"MedicationDispense":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"partOf","_type":"Reference","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/medication-dispense-status","_valueSetStrength":"required"},{"_name":"category","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/medication-dispense-category","_valueSetStrength":"preferred"},{"_name":"medicationCodeableConcept","_choice":"medication","_type":"CodeableConcept","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/medication-codes","_valueSetStrength":"example"},{"_name":"medicationReference","_choice":"medication","_type":"Reference","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/medication-codes","_valueSetStrength":"example"},{"_name":"subject","_type":"Reference","_multiple":false},{"_name":"context","_type":"Reference","_multiple":false},{"_name":"supportingInformation","_type":"Reference","_multiple":true,"_required":false},{"_name":"performer","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"function","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/med-dispense-perform-function","_valueSetStrength":"example"},{"_name":"actor","_type":"Reference","_multiple":false,"_required":true}]},{"_name":"location","_type":"Reference","_multiple":false,"_required":false},{"_name":"authorizingPrescription","_type":"Reference","_multiple":true,"_required":false},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/v3-ActPharmacySupplyType","_valueSetStrength":"example"},{"_name":"quantity","_type":"Quantity","_multiple":false,"_required":false},{"_name":"daysSupply","_type":"Quantity","_multiple":false,"_required":false},{"_name":"whenPrepared","_type":"dateTime","_multiple":false,"_required":false},{"_name":"whenHandedOver","_type":"dateTime","_multiple":false,"_required":false},{"_name":"destination","_type":"Reference","_multiple":false,"_required":false},{"_name":"receiver","_type":"Reference","_multiple":true},{"_name":"note","_type":"Annotation","_multiple":true,"_required":false},{"_name":"dosageInstruction","_type":"Dosage","_multiple":true,"_required":false},{"_name":"substitution","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"wasSubstituted","_type":"boolean","_multiple":false,"_required":true,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/v3-ActSubstanceAdminSubstitutionCode","_valueSetStrength":"example"},{"_name":"reason","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/v3-SubstanceAdminSubstitutionReason","_valueSetStrength":"example"},{"_name":"responsibleParty","_type":"Reference","_multiple":true,"_required":false,"_properties":[]}]},{"_name":"detectedIssue","_type":"Reference","_multiple":true,"_required":false},{"_name":"statusReasonCodeableConcept","_choice":"statusReason","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/med-dispense-status-reason","_valueSetStrength":"example"},{"_name":"statusReasonReference","_choice":"statusReason","_type":"Reference","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/med-dispense-status-reason","_valueSetStrength":"example"},{"_name":"eventHistory","_type":"Reference","_multiple":true,"_required":false}]},"MedicationRequest":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/medication-request-status","_valueSetStrength":"required"},{"_name":"intent","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/medication-request-intent","_valueSetStrength":"required"},{"_name":"category","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/medication-request-category","_valueSetStrength":"example"},{"_name":"priority","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/request-priority","_valueSetStrength":"required"},{"_name":"medicationCodeableConcept","_choice":"medication","_type":"CodeableConcept","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/medication-codes","_valueSetStrength":"example"},{"_name":"medicationReference","_choice":"medication","_type":"Reference","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/medication-codes","_valueSetStrength":"example"},{"_name":"subject","_type":"Reference","_multiple":false},{"_name":"context","_type":"Reference","_multiple":false},{"_name":"supportingInformation","_type":"Reference","_multiple":true,"_required":false},{"_name":"authoredOn","_type":"dateTime","_multiple":false,"_required":false},{"_name":"requester","_type":"Reference","_multiple":false},{"_name":"performer","_type":"Reference","_multiple":false},{"_name":"performerType","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/performer-role","_valueSetStrength":"example"},{"_name":"recorder","_type":"Reference","_multiple":false,"_required":false},{"_name":"reasonCode","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/condition-code","_valueSetStrength":"example"},{"_name":"reasonReference","_type":"Reference","_multiple":true},{"_name":"instantiates","_type":"uri","_multiple":true,"_required":false},{"_name":"basedOn","_type":"Reference","_multiple":true},{"_name":"groupIdentifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"statusReason","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/med-request-status-reason","_valueSetStrength":"example"},{"_name":"insurance","_type":"Reference","_multiple":true},{"_name":"note","_type":"Annotation","_multiple":true,"_required":false},{"_name":"dosageInstruction","_type":"Dosage","_multiple":true,"_required":false},{"_name":"dispenseRequest","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"validityPeriod","_type":"Period","_multiple":false,"_required":false,"_properties":[]},{"_name":"numberOfRepeatsAllowed","_type":"unsignedInt","_multiple":false,"_required":false,"_properties":[]},{"_name":"quantity","_type":"Quantity","_multiple":false,"_required":false,"_properties":[]},{"_name":"expectedSupplyDuration","_type":"Duration","_multiple":false,"_required":false,"_properties":[]},{"_name":"performer","_type":"Reference","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"substitution","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"allowed","_type":"boolean","_multiple":false,"_required":true,"_properties":[]},{"_name":"reason","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/v3-SubstanceAdminSubstitutionReason","_valueSetStrength":"example"}]},{"_name":"priorPrescription","_type":"Reference","_multiple":false,"_required":false},{"_name":"detectedIssue","_type":"Reference","_multiple":true,"_required":false},{"_name":"eventHistory","_type":"Reference","_multiple":true,"_required":false}]},"MedicationStatement":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"basedOn","_type":"Reference","_multiple":true},{"_name":"partOf","_type":"Reference","_multiple":true},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/medication-statement-status","_valueSetStrength":"required"},{"_name":"statusReason","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/reason-medication-status-codes","_valueSetStrength":"example"},{"_name":"category","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/medication-statement-category","_valueSetStrength":"preferred"},{"_name":"medicationCodeableConcept","_choice":"medication","_type":"CodeableConcept","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/medication-codes","_valueSetStrength":"example"},{"_name":"medicationReference","_choice":"medication","_type":"Reference","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/medication-codes","_valueSetStrength":"example"},{"_name":"subject","_type":"Reference","_multiple":false},{"_name":"context","_type":"Reference","_multiple":false},{"_name":"effectiveDateTime","_choice":"effective","_type":"dateTime","_multiple":false,"_required":false},{"_name":"effectivePeriod","_choice":"effective","_type":"Period","_multiple":false,"_required":false},{"_name":"dateAsserted","_type":"dateTime","_multiple":false,"_required":false},{"_name":"informationSource","_type":"Reference","_multiple":false},{"_name":"derivedFrom","_type":"Reference","_multiple":true,"_required":false},{"_name":"reasonCode","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/condition-code","_valueSetStrength":"example"},{"_name":"reasonReference","_type":"Reference","_multiple":true},{"_name":"note","_type":"Annotation","_multiple":true,"_required":false},{"_name":"dosage","_type":"Dosage","_multiple":true,"_required":false}]},"MedicinalProduct":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":true},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"combinedPharmaceuticalDoseForm","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"additionalMonitoringIndicator","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"specialMeasures","_type":"string","_multiple":true,"_required":false},{"_name":"paediatricUseIndicator","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"orphanDesignationStatus","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"productClassification","_type":"CodeableConcept","_multiple":true,"_required":false},{"_name":"marketingAuthorization","_type":"Reference","_multiple":false,"_required":false},{"_name":"packagedMedicinalProduct","_type":"Reference","_multiple":true,"_required":false},{"_name":"pharmaceuticalProduct","_type":"Reference","_multiple":true,"_required":false},{"_name":"clinicalParticulars","_type":"Reference","_multiple":true,"_required":false},{"_name":"attachedDocument","_type":"Reference","_multiple":true,"_required":false},{"_name":"masterFile","_type":"Reference","_multiple":true,"_required":false},{"_name":"name","_type":"BackboneElement","_multiple":true,"_required":true,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"fullName","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"namePart","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"part","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"type","_type":"Coding","_multiple":false,"_required":true,"_properties":[]}]},{"_name":"countryLanguage","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"country","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[]},{"_name":"jurisdiction","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"language","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[]}]}]},{"_name":"crossReference","_type":"Identifier","_multiple":true,"_required":false},{"_name":"manufacturingBusinessOperation","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"operationType","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"authorisationReferenceNumber","_type":"Identifier","_multiple":false,"_required":false,"_properties":[]},{"_name":"effectiveDate","_type":"dateTime","_multiple":false,"_required":false,"_properties":[]},{"_name":"confidentialityIndicator","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"manufacturer","_type":"Reference","_multiple":true,"_required":false,"_properties":[]},{"_name":"regulator","_type":"Reference","_multiple":false,"_required":false,"_properties":[]}]}]},"MedicinalProductAuthorization":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"country","_type":"CodeableConcept","_multiple":true,"_required":true},{"_name":"legalStatusOfSupply","_type":"CodeableConcept","_multiple":false,"_required":true},{"_name":"status","_type":"CodeableConcept","_multiple":false,"_required":true},{"_name":"statusDate","_type":"dateTime","_multiple":false,"_required":true},{"_name":"restoreDate","_type":"dateTime","_multiple":false,"_required":false},{"_name":"validityPeriod","_type":"Period","_multiple":false,"_required":true},{"_name":"dataExclusivityPeriod","_type":"Period","_multiple":false,"_required":false},{"_name":"dateOfFirstAuthorization","_type":"dateTime","_multiple":false,"_required":false},{"_name":"internationalBirthDate","_type":"dateTime","_multiple":false,"_required":true},{"_name":"jurisdictionalAuthorization","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"country","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[]},{"_name":"jurisdiction","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"number","_type":"Identifier","_multiple":false,"_required":false,"_properties":[]},{"_name":"legalStatusOfSupply","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"holder","_type":"Reference","_multiple":false,"_required":true},{"_name":"regulator","_type":"Reference","_multiple":false,"_required":true},{"_name":"procedure","_type":"BackboneElement","_multiple":false,"_required":true,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"number","_type":"Identifier","_multiple":false,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[]},{"_name":"date","_type":"Period","_multiple":false,"_required":false,"_properties":[]},{"_name":"application","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"number","_type":"Identifier","_multiple":false,"_required":true,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[]},{"_name":"date","_type":"dateTime","_multiple":false,"_required":true,"_properties":[]}]}]},{"_name":"marketingStatus","_type":"MarketingStatus","_multiple":true,"_required":false}]},"MedicinalProductClinicals":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"undesirableEffects","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"symptomConditionEffect","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"classification","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"frequencyOfOccurrence","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"population","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"ageRange","_choice":"age[x]","_type":"Range","_multiple":false,"_required":false},{"_name":"ageCodeableConcept","_choice":"age[x]","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"gender","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"race","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"physiologicalCondition","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]}]}]},{"_name":"therapeuticIndication","_type":"BackboneElement","_multiple":true,"_required":true,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"diseaseSymptomProcedure","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"diseaseStatus","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"comorbidity","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[]},{"_name":"intendedEffect","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"duration","_type":"Quantity","_multiple":false,"_required":false,"_properties":[]},{"_name":"undesirableEffects","_type":"#MedicinalProductClinicals.undesirableEffects","_multiple":true,"_required":false},{"_name":"otherTherapy","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"therapyRelationshipType","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[]},{"_name":"medicationCodeableConcept","_choice":"medication[x]","_type":"CodeableConcept","_multiple":false,"_required":true},{"_name":"medicationReference","_choice":"medication[x]","_type":"Reference","_multiple":false,"_required":true},{"_name":"medicationReference","_choice":"medication[x]","_type":"Reference","_multiple":false,"_required":true},{"_name":"medicationReference","_choice":"medication[x]","_type":"Reference","_multiple":false,"_required":true},{"_name":"medicationReference","_choice":"medication[x]","_type":"Reference","_multiple":false,"_required":true}]},{"_name":"population","_type":"#MedicinalProductClinicals.undesirableEffects.population","_multiple":true,"_required":false}]},{"_name":"contraindication","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"disease","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"diseaseStatus","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"comorbidity","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[]},{"_name":"therapeuticIndication","_type":"#MedicinalProductClinicals.therapeuticIndication","_multiple":true,"_required":false},{"_name":"otherTherapy","_type":"#MedicinalProductClinicals.therapeuticIndication.otherTherapy","_multiple":true,"_required":false},{"_name":"population","_type":"#MedicinalProductClinicals.undesirableEffects.population","_multiple":true,"_required":false}]},{"_name":"interactions","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"interactant","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"effect","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"incidence","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"management","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]}]}]},"MedicinalProductDeviceSpec":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":true},{"_name":"tradeName","_type":"string","_multiple":false,"_required":false},{"_name":"quantity","_type":"Quantity","_multiple":false,"_required":false},{"_name":"listingNumber","_type":"string","_multiple":false,"_required":false},{"_name":"modelNumber","_type":"string","_multiple":false,"_required":false},{"_name":"sterilityIndicator","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"sterilisationRequirement","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"usage","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"nomenclature","_type":"CodeableConcept","_multiple":true,"_required":false},{"_name":"shelfLife","_type":"ProductShelfLife","_multiple":true,"_required":false},{"_name":"physicalCharacteristics","_type":"ProdCharacteristic","_multiple":false,"_required":false},{"_name":"otherCharacteristics","_type":"CodeableConcept","_multiple":true,"_required":false},{"_name":"batchIdentifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"manufacturer","_type":"Reference","_multiple":true,"_required":false},{"_name":"material","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"substance","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[]},{"_name":"alternate","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"allergenicIndicator","_type":"boolean","_multiple":false,"_required":false,"_properties":[]}]}]},"MedicinalProductIngredient":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"role","_type":"CodeableConcept","_multiple":false,"_required":true},{"_name":"allergenicIndicator","_type":"boolean","_multiple":false,"_required":false},{"_name":"manufacturer","_type":"Reference","_multiple":true,"_required":false},{"_name":"specifiedSubstance","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[]},{"_name":"group","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[]},{"_name":"confidentiality","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"strength","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"presentation","_type":"Ratio","_multiple":false,"_required":true,"_properties":[]},{"_name":"concentration","_type":"Ratio","_multiple":false,"_required":false,"_properties":[]},{"_name":"measurementPoint","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"country","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[]},{"_name":"referenceStrength","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"substance","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]}]}]}]},{"_name":"substance","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[]},{"_name":"strength","_type":"#MedicinalProductIngredient.specifiedSubstance.strength","_multiple":true,"_required":true}]}]},"MedicinalProductPackaged":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":true},{"_name":"description","_type":"string","_multiple":false,"_required":false},{"_name":"marketingStatus","_type":"MarketingStatus","_multiple":true,"_required":false},{"_name":"batchIdentifier","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"outerPackaging","_type":"Identifier","_multiple":false,"_required":true,"_properties":[]},{"_name":"immediatePackaging","_type":"Identifier","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"packageItem","_type":"BackboneElement","_multiple":true,"_required":true,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[]},{"_name":"quantity","_type":"Quantity","_multiple":false,"_required":true,"_properties":[]},{"_name":"material","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[]},{"_name":"alternateMaterial","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[]},{"_name":"manufacturer","_type":"Reference","_multiple":true,"_required":false,"_properties":[]},{"_name":"device","_type":"Reference","_multiple":true,"_required":false,"_properties":[]},{"_name":"manufacturedItem","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"manufacturedDoseForm","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[]},{"_name":"unitOfPresentation","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"quantity","_type":"Quantity","_multiple":false,"_required":true,"_properties":[]},{"_name":"xManufacturer","_type":"Reference","_multiple":true,"_required":false,"_properties":[]},{"_name":"ingredient","_type":"Reference","_multiple":true,"_required":false,"_properties":[]},{"_name":"physicalCharacteristics","_type":"ProdCharacteristic","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"otherCharacteristics","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[]},{"_name":"packageItem","_type":"#MedicinalProductPackaged.packageItem","_multiple":true,"_required":false},{"_name":"physicalCharacteristics","_type":"ProdCharacteristic","_multiple":false,"_required":false,"_properties":[]},{"_name":"shelfLifeStorage","_type":"ProductShelfLife","_multiple":true,"_required":false,"_properties":[]}]}]},"MedicinalProductPharmaceutical":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"administrableDoseForm","_type":"CodeableConcept","_multiple":false,"_required":true},{"_name":"unitOfPresentation","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"routeOfAdministration","_type":"CodeableConcept","_multiple":true,"_required":true},{"_name":"ingredient","_type":"Reference","_multiple":true,"_required":false},{"_name":"device","_type":"string","_multiple":true,"_required":false},{"_name":"characteristics","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[]},{"_name":"status","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]}]}]},"MessageDefinition":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"url","_type":"uri","_multiple":false,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"version","_type":"string","_multiple":false,"_required":false},{"_name":"name","_type":"string","_multiple":false,"_required":false},{"_name":"title","_type":"string","_multiple":false,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/publication-status","_valueSetStrength":"required"},{"_name":"experimental","_type":"boolean","_multiple":false,"_required":false},{"_name":"date","_type":"dateTime","_multiple":false,"_required":true},{"_name":"publisher","_type":"string","_multiple":false,"_required":false},{"_name":"contact","_type":"ContactDetail","_multiple":true,"_required":false},{"_name":"description","_type":"markdown","_multiple":false,"_required":false},{"_name":"useContext","_type":"UsageContext","_multiple":true,"_required":false},{"_name":"jurisdiction","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/jurisdiction","_valueSetStrength":"extensible"},{"_name":"purpose","_type":"markdown","_multiple":false,"_required":false},{"_name":"copyright","_type":"markdown","_multiple":false,"_required":false},{"_name":"base","_type":"Reference","_multiple":false,"_required":false},{"_name":"parent","_type":"Reference","_multiple":true},{"_name":"replaces","_type":"Reference","_multiple":true,"_required":false},{"_name":"eventCoding","_choice":"event","_type":"Coding","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/message-events","_valueSetStrength":"example"},{"_name":"eventUri","_choice":"event","_type":"uri","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/message-events","_valueSetStrength":"example"},{"_name":"category","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/message-significance-category","_valueSetStrength":"required"},{"_name":"focus","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/resource-types","_valueSetStrength":"required"},{"_name":"profile","_type":"Reference","_multiple":false,"_required":false,"_properties":[]},{"_name":"min","_type":"unsignedInt","_multiple":false,"_required":false,"_properties":[]},{"_name":"max","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"responseRequired","_type":"boolean","_multiple":false,"_required":false},{"_name":"allowedResponse","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"message","_type":"Reference","_multiple":false,"_required":true,"_properties":[]},{"_name":"situation","_type":"markdown","_multiple":false,"_required":false,"_properties":[]}]}]},"MessageHeader":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"eventCoding","_choice":"event","_type":"Coding","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/message-events","_valueSetStrength":"example"},{"_name":"eventUri","_choice":"event","_type":"uri","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/message-events","_valueSetStrength":"example"},{"_name":"destination","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"name","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"target","_type":"Reference","_multiple":false,"_required":false,"_properties":[]},{"_name":"endpoint","_type":"uri","_multiple":false,"_required":true,"_properties":[]},{"_name":"receiver","_type":"Reference","_multiple":false,"_required":false}]},{"_name":"sender","_type":"Reference","_multiple":false},{"_name":"enterer","_type":"Reference","_multiple":false,"_required":false},{"_name":"author","_type":"Reference","_multiple":false,"_required":false},{"_name":"source","_type":"BackboneElement","_multiple":false,"_required":true,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"name","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"software","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"version","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"contact","_type":"ContactPoint","_multiple":false,"_required":false,"_properties":[]},{"_name":"endpoint","_type":"uri","_multiple":false,"_required":true,"_properties":[]}]},{"_name":"responsible","_type":"Reference","_multiple":false},{"_name":"reason","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/message-reason-encounter","_valueSetStrength":"example"},{"_name":"response","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"identifier","_type":"id","_multiple":false,"_required":true,"_properties":[]},{"_name":"code","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/response-code","_valueSetStrength":"required"},{"_name":"details","_type":"Reference","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"focus","_type":"Reference","_multiple":true,"_required":false},{"_name":"definition","_type":"uri","_multiple":false,"_required":false}]},"NamingSystem":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"name","_type":"string","_multiple":false,"_required":true},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/publication-status","_valueSetStrength":"required"},{"_name":"kind","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/namingsystem-type","_valueSetStrength":"required"},{"_name":"date","_type":"dateTime","_multiple":false,"_required":true},{"_name":"publisher","_type":"string","_multiple":false,"_required":false},{"_name":"contact","_type":"ContactDetail","_multiple":true,"_required":false},{"_name":"responsible","_type":"string","_multiple":false,"_required":false},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/identifier-type","_valueSetStrength":"extensible"},{"_name":"description","_type":"markdown","_multiple":false,"_required":false},{"_name":"useContext","_type":"UsageContext","_multiple":true,"_required":false},{"_name":"jurisdiction","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/jurisdiction","_valueSetStrength":"extensible"},{"_name":"usage","_type":"string","_multiple":false,"_required":false},{"_name":"uniqueId","_type":"BackboneElement","_multiple":true,"_required":true,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/namingsystem-identifier-type","_valueSetStrength":"required"},{"_name":"value","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"preferred","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"comment","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"period","_type":"Period","_multiple":false,"_required":false,"_properties":[]}]}]},"NutritionOrder":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/request-status","_valueSetStrength":"required"},{"_name":"intent","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/request-intent","_valueSetStrength":"required"},{"_name":"patient","_type":"Reference","_multiple":false,"_required":true},{"_name":"encounter","_type":"Reference","_multiple":false,"_required":false},{"_name":"dateTime","_type":"dateTime","_multiple":false,"_required":true},{"_name":"orderer","_type":"Reference","_multiple":false},{"_name":"allergyIntolerance","_type":"Reference","_multiple":true,"_required":false},{"_name":"foodPreferenceModifier","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/encounter-diet","_valueSetStrength":"example"},{"_name":"excludeFoodModifier","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/food-type","_valueSetStrength":"example"},{"_name":"oralDiet","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/diet-type","_valueSetStrength":"example"},{"_name":"schedule","_type":"Timing","_multiple":true,"_required":false,"_properties":[]},{"_name":"nutrient","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifier","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/nutrient-code","_valueSetStrength":"example"},{"_name":"amount","_type":"Quantity","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"texture","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifier","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/texture-code","_valueSetStrength":"example"},{"_name":"foodType","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/modified-foodtype","_valueSetStrength":"example"}]},{"_name":"fluidConsistencyType","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/consistency-type","_valueSetStrength":"example"},{"_name":"instruction","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"supplement","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/supplement-type","_valueSetStrength":"example"},{"_name":"productName","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"schedule","_type":"Timing","_multiple":true,"_required":false,"_properties":[]},{"_name":"quantity","_type":"Quantity","_multiple":false,"_required":false,"_properties":[]},{"_name":"instruction","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"enteralFormula","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"baseFormulaType","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/entformula-type","_valueSetStrength":"example"},{"_name":"baseFormulaProductName","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"additiveType","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/entformula-additive","_valueSetStrength":"example"},{"_name":"additiveProductName","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"caloricDensity","_type":"Quantity","_multiple":false,"_required":false,"_properties":[]},{"_name":"routeofAdministration","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/enteral-route","_valueSetStrength":"extensible"},{"_name":"administration","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"schedule","_type":"Timing","_multiple":false,"_required":false,"_properties":[]},{"_name":"quantity","_type":"Quantity","_multiple":false,"_required":false,"_properties":[]},{"_name":"rateQuantity","_choice":"rate[x]","_type":"Quantity","_multiple":false,"_required":false},{"_name":"rateRatio","_choice":"rate[x]","_type":"Ratio","_multiple":false,"_required":false}]},{"_name":"maxVolumeToDeliver","_type":"Quantity","_multiple":false,"_required":false,"_properties":[]},{"_name":"administrationInstruction","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"note","_type":"Annotation","_multiple":true,"_required":false}]},"Observation":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"basedOn","_type":"Reference","_multiple":true},{"_name":"partOf","_type":"Reference","_multiple":true},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/observation-status","_valueSetStrength":"required"},{"_name":"category","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/observation-category","_valueSetStrength":"preferred"},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/observation-codes","_valueSetStrength":"example"},{"_name":"subject","_type":"Reference","_multiple":false},{"_name":"context","_type":"Reference","_multiple":false},{"_name":"effectiveDateTime","_choice":"effective","_type":"dateTime","_multiple":false,"_required":false},{"_name":"effectivePeriod","_choice":"effective","_type":"Period","_multiple":false,"_required":false},{"_name":"effectiveTiming","_choice":"effective","_type":"Timing","_multiple":false,"_required":false},{"_name":"issued","_type":"instant","_multiple":false,"_required":false},{"_name":"performer","_type":"Reference","_multiple":true},{"_name":"valueQuantity","_choice":"value","_type":"Quantity","_multiple":false,"_required":false},{"_name":"valueCodeableConcept","_choice":"value","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"valueString","_choice":"value","_type":"string","_multiple":false,"_required":false},{"_name":"valueBoolean","_choice":"value","_type":"boolean","_multiple":false,"_required":false},{"_name":"valueInteger","_choice":"value","_type":"integer","_multiple":false,"_required":false},{"_name":"valueRange","_choice":"value","_type":"Range","_multiple":false,"_required":false},{"_name":"valueRatio","_choice":"value","_type":"Ratio","_multiple":false,"_required":false},{"_name":"valueSampledData","_choice":"value","_type":"SampledData","_multiple":false,"_required":false},{"_name":"valueTime","_choice":"value","_type":"time","_multiple":false,"_required":false},{"_name":"valueDateTime","_choice":"value","_type":"dateTime","_multiple":false,"_required":false},{"_name":"valuePeriod","_choice":"value","_type":"Period","_multiple":false,"_required":false},{"_name":"dataAbsentReason","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/observation-valueabsentreason","_valueSetStrength":"extensible"},{"_name":"interpretation","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/observation-interpretation","_valueSetStrength":"extensible"},{"_name":"comment","_type":"string","_multiple":false,"_required":false},{"_name":"bodySite","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/body-site","_valueSetStrength":"example"},{"_name":"method","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/observation-methods","_valueSetStrength":"example"},{"_name":"specimen","_type":"Reference","_multiple":false,"_required":false},{"_name":"device","_type":"Reference","_multiple":false},{"_name":"referenceRange","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"low","_type":"Quantity","_multiple":false,"_required":false,"_properties":[]},{"_name":"high","_type":"Quantity","_multiple":false,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/referencerange-meaning","_valueSetStrength":"extensible"},{"_name":"appliesTo","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/referencerange-appliesto","_valueSetStrength":"example"},{"_name":"age","_type":"Range","_multiple":false,"_required":false,"_properties":[]},{"_name":"text","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"hasMember","_type":"Reference","_multiple":true},{"_name":"derivedFrom","_type":"Reference","_multiple":true},{"_name":"component","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/observation-codes","_valueSetStrength":"example"},{"_name":"valueQuantity","_choice":"value[x]","_type":"Quantity","_multiple":false,"_required":false},{"_name":"valueCodeableConcept","_choice":"value[x]","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"valueString","_choice":"value[x]","_type":"string","_multiple":false,"_required":false},{"_name":"valueBoolean","_choice":"value[x]","_type":"boolean","_multiple":false,"_required":false},{"_name":"valueInteger","_choice":"value[x]","_type":"integer","_multiple":false,"_required":false},{"_name":"valueRange","_choice":"value[x]","_type":"Range","_multiple":false,"_required":false},{"_name":"valueRatio","_choice":"value[x]","_type":"Ratio","_multiple":false,"_required":false},{"_name":"valueSampledData","_choice":"value[x]","_type":"SampledData","_multiple":false,"_required":false},{"_name":"valueTime","_choice":"value[x]","_type":"time","_multiple":false,"_required":false},{"_name":"valueDateTime","_choice":"value[x]","_type":"dateTime","_multiple":false,"_required":false},{"_name":"valuePeriod","_choice":"value[x]","_type":"Period","_multiple":false,"_required":false},{"_name":"dataAbsentReason","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/observation-valueabsentreason","_valueSetStrength":"extensible"},{"_name":"interpretation","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/observation-interpretation","_valueSetStrength":"extensible"},{"_name":"referenceRange","_type":"#Observation.referenceRange","_multiple":true,"_required":false}]}]},"ObservationDefinition":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"category","_type":"Coding","_multiple":false,"_required":false},{"_name":"code","_type":"Coding","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/observation-codes","_valueSetStrength":"example"},{"_name":"permittedDataType","_type":"Coding","_multiple":true,"_required":false},{"_name":"multipleResultsAllowed","_type":"boolean","_multiple":false,"_required":false},{"_name":"method","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/observation-methods","_valueSetStrength":"example"},{"_name":"preferredReportName","_type":"string","_multiple":false,"_required":false},{"_name":"quantitativeDetails","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"customaryUnit","_type":"Coding","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://unitsofmeasure.org/vs","_valueSetStrength":"extensible"},{"_name":"unit","_type":"Coding","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://unitsofmeasure.org/vs","_valueSetStrength":"extensible"},{"_name":"conversionFactor","_type":"decimal","_multiple":false,"_required":false,"_properties":[]},{"_name":"decimalPrecision","_type":"integer","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"qualifiedInterval","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"category","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/observation-category","_valueSetStrength":"preferred"},{"_name":"range","_type":"Range","_multiple":false,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/referencerange-meaning","_valueSetStrength":"extensible"},{"_name":"appliesTo","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/referencerange-appliesto","_valueSetStrength":"example"},{"_name":"age","_type":"Range","_multiple":false,"_required":false,"_properties":[]},{"_name":"gestationalAge","_type":"Range","_multiple":false,"_required":false,"_properties":[]},{"_name":"condition","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"validCodedValueSet","_type":"uri","_multiple":false,"_required":false},{"_name":"normalCodedValueSet","_type":"uri","_multiple":false,"_required":false},{"_name":"abnormalCodedValueSet","_type":"uri","_multiple":false,"_required":false},{"_name":"criticalCodedValueSet","_type":"uri","_multiple":false,"_required":false}]},"OccupationalData":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/publication-status","_valueSetStrength":"required"},{"_name":"subject","_type":"Reference","_multiple":false},{"_name":"date","_type":"dateTime","_multiple":false,"_required":false},{"_name":"author","_type":"Reference","_multiple":true},{"_name":"employmentStatus","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/employment-status-odh","_valueSetStrength":"example"},{"_name":"effectiveDateTime","_choice":"effective[x]","_type":"dateTime","_multiple":false,"_required":true},{"_name":"effectivePeriod","_choice":"effective[x]","_type":"Period","_multiple":false,"_required":true}]},{"_name":"retirementDate","_type":"dateTime","_multiple":true,"_required":false},{"_name":"combatZoneWork","_type":"Period","_multiple":true,"_required":false},{"_name":"usualWork","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"occupation","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/occupation-cdc-census-2010","_valueSetStrength":"example"},{"_name":"industry","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/industry-cdc-census-2010","_valueSetStrength":"example"},{"_name":"start","_type":"dateTime","_multiple":false,"_required":false,"_properties":[]},{"_name":"duration","_type":"Duration","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"pastOrPresentJob","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"occupation","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/occupation-cdc-census-2010","_valueSetStrength":"example"},{"_name":"industry","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/industry-cdc-census-2010","_valueSetStrength":"example"},{"_name":"effectiveDateTime","_choice":"effective[x]","_type":"dateTime","_multiple":false,"_required":false},{"_name":"effectivePeriod","_choice":"effective[x]","_type":"Period","_multiple":false,"_required":false},{"_name":"employer","_type":"Reference","_multiple":false,"_required":false,"_properties":[]},{"_name":"workClassification","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/work-classification-odh","_valueSetStrength":"example"},{"_name":"supervisoryLevel","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/supervisory-level-odh-us","_valueSetStrength":"example"},{"_name":"jobDuty","_type":"string","_multiple":true,"_required":false,"_properties":[]},{"_name":"occupationalHazard","_type":"string","_multiple":true,"_required":false,"_properties":[]},{"_name":"workSchedule","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/work-schedule-odh","_valueSetStrength":"example"},{"_name":"weeklyWorkDays","_type":"decimal","_multiple":false,"_required":false,"_properties":[]},{"_name":"dailyWorkHours","_type":"decimal","_multiple":false,"_required":false,"_properties":[]}]}]}]},"OperationDefinition":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"url","_type":"uri","_multiple":false,"_required":false},{"_name":"version","_type":"string","_multiple":false,"_required":false},{"_name":"name","_type":"string","_multiple":false,"_required":true},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/publication-status","_valueSetStrength":"required"},{"_name":"kind","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/operation-kind","_valueSetStrength":"required"},{"_name":"experimental","_type":"boolean","_multiple":false,"_required":false},{"_name":"date","_type":"dateTime","_multiple":false,"_required":false},{"_name":"publisher","_type":"string","_multiple":false,"_required":false},{"_name":"contact","_type":"ContactDetail","_multiple":true,"_required":false},{"_name":"description","_type":"markdown","_multiple":false,"_required":false},{"_name":"useContext","_type":"UsageContext","_multiple":true,"_required":false},{"_name":"jurisdiction","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/jurisdiction","_valueSetStrength":"extensible"},{"_name":"purpose","_type":"markdown","_multiple":false,"_required":false},{"_name":"affectsState","_type":"boolean","_multiple":false,"_required":false},{"_name":"code","_type":"code","_multiple":false,"_required":true},{"_name":"comment","_type":"markdown","_multiple":false,"_required":false},{"_name":"base","_type":"Reference","_multiple":false,"_required":false},{"_name":"resource","_type":"code","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/resource-types","_valueSetStrength":"required"},{"_name":"system","_type":"boolean","_multiple":false,"_required":true},{"_name":"type","_type":"boolean","_multiple":false,"_required":true},{"_name":"instance","_type":"boolean","_multiple":false,"_required":true},{"_name":"inputProfile","_type":"Reference","_multiple":false,"_required":false},{"_name":"outputProfile","_type":"Reference","_multiple":false,"_required":false},{"_name":"parameter","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"name","_type":"code","_multiple":false,"_required":true,"_properties":[]},{"_name":"use","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/operation-parameter-use","_valueSetStrength":"required"},{"_name":"min","_type":"integer","_multiple":false,"_required":true,"_properties":[]},{"_name":"max","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"documentation","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"type","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/all-types","_valueSetStrength":"required"},{"_name":"targetProfile","_type":"uri","_multiple":true,"_required":false,"_properties":[]},{"_name":"searchType","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/search-param-type","_valueSetStrength":"required"},{"_name":"binding","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"strength","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/binding-strength","_valueSetStrength":"required"},{"_name":"valueSetUri","_choice":"valueSet[x]","_type":"uri","_multiple":false,"_required":true},{"_name":"valueSetReference","_choice":"valueSet[x]","_type":"Reference","_multiple":false,"_required":true}]},{"_name":"part","_type":"#OperationDefinition.parameter","_multiple":true,"_required":false}]},{"_name":"overload","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"parameterName","_type":"string","_multiple":true,"_required":false,"_properties":[]},{"_name":"comment","_type":"string","_multiple":false,"_required":false,"_properties":[]}]}]},"OperationOutcome":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"issue","_type":"BackboneElement","_multiple":true,"_required":true,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"severity","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/issue-severity","_valueSetStrength":"required"},{"_name":"code","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/issue-type","_valueSetStrength":"required"},{"_name":"details","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/operation-outcome","_valueSetStrength":"example"},{"_name":"diagnostics","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"location","_type":"string","_multiple":true,"_required":false,"_properties":[]},{"_name":"expression","_type":"string","_multiple":true,"_required":false,"_properties":[]}]}]},"Organization":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"active","_type":"boolean","_multiple":false,"_required":false},{"_name":"type","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/organization-type","_valueSetStrength":"example"},{"_name":"name","_type":"string","_multiple":false,"_required":false},{"_name":"alias","_type":"string","_multiple":true,"_required":false},{"_name":"telecom","_type":"ContactPoint","_multiple":true,"_required":false},{"_name":"address","_type":"Address","_multiple":true,"_required":false},{"_name":"partOf","_type":"Reference","_multiple":false,"_required":false},{"_name":"contact","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"purpose","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/contactentity-type","_valueSetStrength":"extensible"},{"_name":"name","_type":"HumanName","_multiple":false,"_required":false,"_properties":[]},{"_name":"telecom","_type":"ContactPoint","_multiple":true,"_required":false,"_properties":[]},{"_name":"address","_type":"Address","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"endpoint","_type":"Reference","_multiple":true,"_required":false}]},"OrganizationRole":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"active","_type":"boolean","_multiple":false,"_required":false},{"_name":"period","_type":"Period","_multiple":false,"_required":false},{"_name":"organization","_type":"Reference","_multiple":false,"_required":false},{"_name":"participatingOrganization","_type":"Reference","_multiple":false,"_required":false},{"_name":"network","_type":"Reference","_multiple":true,"_required":false},{"_name":"code","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/organization-role","_valueSetStrength":"example"},{"_name":"specialty","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/c80-practice-codes","_valueSetStrength":"preferred"},{"_name":"location","_type":"Reference","_multiple":true,"_required":false},{"_name":"healthcareService","_type":"Reference","_multiple":true,"_required":false},{"_name":"telecom","_type":"ContactPoint","_multiple":true,"_required":false},{"_name":"availableTime","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"daysOfWeek","_type":"code","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/days-of-week","_valueSetStrength":"required"},{"_name":"allDay","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"availableStartTime","_type":"time","_multiple":false,"_required":false,"_properties":[]},{"_name":"availableEndTime","_type":"time","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"notAvailable","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"description","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"during","_type":"Period","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"availabilityExceptions","_type":"string","_multiple":false,"_required":false},{"_name":"endpoint","_type":"Reference","_multiple":true,"_required":false}]},"Parameters":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"parameter","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"name","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"valueBase64Binary","_choice":"value[x]","_type":"base64Binary","_multiple":false,"_required":false},{"_name":"valueBoolean","_choice":"value[x]","_type":"boolean","_multiple":false,"_required":false},{"_name":"valueCode","_choice":"value[x]","_type":"code","_multiple":false,"_required":false},{"_name":"valueDate","_choice":"value[x]","_type":"date","_multiple":false,"_required":false},{"_name":"valueDateTime","_choice":"value[x]","_type":"dateTime","_multiple":false,"_required":false},{"_name":"valueDecimal","_choice":"value[x]","_type":"decimal","_multiple":false,"_required":false},{"_name":"valueId","_choice":"value[x]","_type":"id","_multiple":false,"_required":false},{"_name":"valueInstant","_choice":"value[x]","_type":"instant","_multiple":false,"_required":false},{"_name":"valueInteger","_choice":"value[x]","_type":"integer","_multiple":false,"_required":false},{"_name":"valueMarkdown","_choice":"value[x]","_type":"markdown","_multiple":false,"_required":false},{"_name":"valueOid","_choice":"value[x]","_type":"oid","_multiple":false,"_required":false},{"_name":"valuePositiveInt","_choice":"value[x]","_type":"positiveInt","_multiple":false,"_required":false},{"_name":"valueString","_choice":"value[x]","_type":"string","_multiple":false,"_required":false},{"_name":"valueTime","_choice":"value[x]","_type":"time","_multiple":false,"_required":false},{"_name":"valueUnsignedInt","_choice":"value[x]","_type":"unsignedInt","_multiple":false,"_required":false},{"_name":"valueUri","_choice":"value[x]","_type":"uri","_multiple":false,"_required":false},{"_name":"valueAddress","_choice":"value[x]","_type":"Address","_multiple":false,"_required":false},{"_name":"valueAge","_choice":"value[x]","_type":"Age","_multiple":false,"_required":false},{"_name":"valueAnnotation","_choice":"value[x]","_type":"Annotation","_multiple":false,"_required":false},{"_name":"valueAttachment","_choice":"value[x]","_type":"Attachment","_multiple":false,"_required":false},{"_name":"valueCodeableConcept","_choice":"value[x]","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"valueCoding","_choice":"value[x]","_type":"Coding","_multiple":false,"_required":false},{"_name":"valueContactPoint","_choice":"value[x]","_type":"ContactPoint","_multiple":false,"_required":false},{"_name":"valueCount","_choice":"value[x]","_type":"Count","_multiple":false,"_required":false},{"_name":"valueDistance","_choice":"value[x]","_type":"Distance","_multiple":false,"_required":false},{"_name":"valueDuration","_choice":"value[x]","_type":"Duration","_multiple":false,"_required":false},{"_name":"valueHumanName","_choice":"value[x]","_type":"HumanName","_multiple":false,"_required":false},{"_name":"valueIdentifier","_choice":"value[x]","_type":"Identifier","_multiple":false,"_required":false},{"_name":"valueMoney","_choice":"value[x]","_type":"Money","_multiple":false,"_required":false},{"_name":"valuePeriod","_choice":"value[x]","_type":"Period","_multiple":false,"_required":false},{"_name":"valueQuantity","_choice":"value[x]","_type":"Quantity","_multiple":false,"_required":false},{"_name":"valueRange","_choice":"value[x]","_type":"Range","_multiple":false,"_required":false},{"_name":"valueRatio","_choice":"value[x]","_type":"Ratio","_multiple":false,"_required":false},{"_name":"valueReference","_choice":"value[x]","_type":"Reference","_multiple":false,"_required":false},{"_name":"valueSampledData","_choice":"value[x]","_type":"SampledData","_multiple":false,"_required":false},{"_name":"valueSignature","_choice":"value[x]","_type":"Signature","_multiple":false,"_required":false},{"_name":"valueTiming","_choice":"value[x]","_type":"Timing","_multiple":false,"_required":false},{"_name":"valueDosage","_choice":"value[x]","_type":"Dosage","_multiple":false,"_required":false},{"_name":"valueContactDetail","_choice":"value[x]","_type":"ContactDetail","_multiple":false,"_required":false},{"_name":"valueContributor","_choice":"value[x]","_type":"Contributor","_multiple":false,"_required":false},{"_name":"valueDataRequirement","_choice":"value[x]","_type":"DataRequirement","_multiple":false,"_required":false},{"_name":"valueParameterDefinition","_choice":"value[x]","_type":"ParameterDefinition","_multiple":false,"_required":false},{"_name":"valueRelatedArtifact","_choice":"value[x]","_type":"RelatedArtifact","_multiple":false,"_required":false},{"_name":"valueTriggerDefinition","_choice":"value[x]","_type":"TriggerDefinition","_multiple":false,"_required":false},{"_name":"valueUsageContext","_choice":"value[x]","_type":"UsageContext","_multiple":false,"_required":false},{"_name":"valueMeta","_choice":"value[x]","_type":"Meta","_multiple":false,"_required":false},{"_name":"resource","_type":"Resource","_multiple":false,"_required":false,"_properties":[]},{"_name":"part","_type":"#Parameters.parameter","_multiple":true,"_required":false}]}]},"Patient":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"active","_type":"boolean","_multiple":false,"_required":false},{"_name":"name","_type":"HumanName","_multiple":true,"_required":false},{"_name":"telecom","_type":"ContactPoint","_multiple":true,"_required":false},{"_name":"gender","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/administrative-gender","_valueSetStrength":"required"},{"_name":"birthDate","_type":"date","_multiple":false,"_required":false},{"_name":"deceasedBoolean","_choice":"deceased","_type":"boolean","_multiple":false,"_required":false},{"_name":"deceasedDateTime","_choice":"deceased","_type":"dateTime","_multiple":false,"_required":false},{"_name":"address","_type":"Address","_multiple":true,"_required":false},{"_name":"maritalStatus","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/marital-status","_valueSetStrength":"extensible"},{"_name":"multipleBirthBoolean","_choice":"multipleBirth","_type":"boolean","_multiple":false,"_required":false},{"_name":"multipleBirthInteger","_choice":"multipleBirth","_type":"integer","_multiple":false,"_required":false},{"_name":"photo","_type":"Attachment","_multiple":true,"_required":false},{"_name":"contact","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"relationship","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/v2-0131","_valueSetStrength":"extensible"},{"_name":"name","_type":"HumanName","_multiple":false,"_required":false,"_properties":[]},{"_name":"telecom","_type":"ContactPoint","_multiple":true,"_required":false,"_properties":[]},{"_name":"address","_type":"Address","_multiple":false,"_required":false,"_properties":[]},{"_name":"gender","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/administrative-gender","_valueSetStrength":"required"},{"_name":"organization","_type":"Reference","_multiple":false,"_required":false,"_properties":[]},{"_name":"period","_type":"Period","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"animal","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"species","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/animal-species","_valueSetStrength":"example"},{"_name":"breed","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/animal-breeds","_valueSetStrength":"example"},{"_name":"genderStatus","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/animal-genderstatus","_valueSetStrength":"example"}]},{"_name":"communication","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"language","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"preferred","_type":"boolean","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"generalPractitioner","_type":"Reference","_multiple":true},{"_name":"managingOrganization","_type":"Reference","_multiple":false,"_required":false},{"_name":"link","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"other","_type":"Reference","_multiple":false,"_required":true},{"_name":"type","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/link-type","_valueSetStrength":"required"}]}]},"PaymentNotice":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/fm-status","_valueSetStrength":"required"},{"_name":"request","_type":"Reference","_multiple":false,"_required":false},{"_name":"response","_type":"Reference","_multiple":false,"_required":false},{"_name":"statusDate","_type":"date","_multiple":false,"_required":false},{"_name":"created","_type":"dateTime","_multiple":false,"_required":false},{"_name":"target","_type":"Reference","_multiple":false,"_required":false},{"_name":"provider","_type":"Reference","_multiple":false,"_required":false},{"_name":"organization","_type":"Reference","_multiple":false,"_required":false},{"_name":"paymentStatus","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/payment-status","_valueSetStrength":"example"}]},"PaymentReconciliation":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/fm-status","_valueSetStrength":"required"},{"_name":"period","_type":"Period","_multiple":false,"_required":false},{"_name":"created","_type":"dateTime","_multiple":false,"_required":false},{"_name":"organization","_type":"Reference","_multiple":false,"_required":false},{"_name":"request","_type":"Reference","_multiple":false,"_required":false},{"_name":"outcome","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/remittance-outcome","_valueSetStrength":"required"},{"_name":"disposition","_type":"string","_multiple":false,"_required":false},{"_name":"requestProvider","_type":"Reference","_multiple":false,"_required":false},{"_name":"requestOrganization","_type":"Reference","_multiple":false,"_required":false},{"_name":"detail","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/payment-type","_valueSetStrength":"example"},{"_name":"request","_type":"Reference","_multiple":false,"_required":false,"_properties":[]},{"_name":"response","_type":"Reference","_multiple":false,"_required":false,"_properties":[]},{"_name":"submitter","_type":"Reference","_multiple":false,"_required":false,"_properties":[]},{"_name":"payee","_type":"Reference","_multiple":false,"_required":false,"_properties":[]},{"_name":"date","_type":"date","_multiple":false,"_required":false,"_properties":[]},{"_name":"amount","_type":"Money","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"form","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/forms","_valueSetStrength":"example"},{"_name":"total","_type":"Money","_multiple":false,"_required":false},{"_name":"processNote","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/note-type","_valueSetStrength":"required"},{"_name":"text","_type":"string","_multiple":false,"_required":false,"_properties":[]}]}]},"Person":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"name","_type":"HumanName","_multiple":true,"_required":false},{"_name":"telecom","_type":"ContactPoint","_multiple":true,"_required":false},{"_name":"gender","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/administrative-gender","_valueSetStrength":"required"},{"_name":"birthDate","_type":"date","_multiple":false,"_required":false},{"_name":"address","_type":"Address","_multiple":true,"_required":false},{"_name":"photo","_type":"Attachment","_multiple":false,"_required":false},{"_name":"managingOrganization","_type":"Reference","_multiple":false,"_required":false},{"_name":"active","_type":"boolean","_multiple":false,"_required":false},{"_name":"link","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"target","_type":"Reference","_multiple":false,"_required":true},{"_name":"assurance","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/identity-assuranceLevel","_valueSetStrength":"required"}]}]},"PlanDefinition":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"url","_type":"uri","_multiple":false,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"version","_type":"string","_multiple":false,"_required":false},{"_name":"name","_type":"string","_multiple":false,"_required":false},{"_name":"title","_type":"string","_multiple":false,"_required":false},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/plan-definition-type","_valueSetStrength":"extensible"},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/publication-status","_valueSetStrength":"required"},{"_name":"experimental","_type":"boolean","_multiple":false,"_required":false},{"_name":"date","_type":"dateTime","_multiple":false,"_required":false},{"_name":"publisher","_type":"string","_multiple":false,"_required":false},{"_name":"description","_type":"markdown","_multiple":false,"_required":false},{"_name":"purpose","_type":"markdown","_multiple":false,"_required":false},{"_name":"usage","_type":"string","_multiple":false,"_required":false},{"_name":"approvalDate","_type":"date","_multiple":false,"_required":false},{"_name":"lastReviewDate","_type":"date","_multiple":false,"_required":false},{"_name":"effectivePeriod","_type":"Period","_multiple":false,"_required":false},{"_name":"useContext","_type":"UsageContext","_multiple":true,"_required":false},{"_name":"jurisdiction","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/jurisdiction","_valueSetStrength":"extensible"},{"_name":"topic","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/definition-topic","_valueSetStrength":"example"},{"_name":"contributor","_type":"Contributor","_multiple":true,"_required":false},{"_name":"contact","_type":"ContactDetail","_multiple":true,"_required":false},{"_name":"copyright","_type":"markdown","_multiple":false,"_required":false},{"_name":"relatedArtifact","_type":"RelatedArtifact","_multiple":true,"_required":false},{"_name":"library","_type":"Reference","_multiple":true,"_required":false},{"_name":"goal","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"category","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/goal-category","_valueSetStrength":"example"},{"_name":"description","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/clinical-findings","_valueSetStrength":"example"},{"_name":"priority","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/goal-priority","_valueSetStrength":"preferred"},{"_name":"start","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/goal-start-event","_valueSetStrength":"example"},{"_name":"addresses","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/condition-code","_valueSetStrength":"example"},{"_name":"documentation","_type":"RelatedArtifact","_multiple":true,"_required":false,"_properties":[]},{"_name":"target","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"measure","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/observation-codes","_valueSetStrength":"example"},{"_name":"detailQuantity","_choice":"detail[x]","_type":"Quantity","_multiple":false,"_required":false},{"_name":"detailRange","_choice":"detail[x]","_type":"Range","_multiple":false,"_required":false},{"_name":"detailCodeableConcept","_choice":"detail[x]","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"due","_type":"Duration","_multiple":false,"_required":false,"_properties":[]}]}]},{"_name":"action","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"prefix","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"title","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"textEquivalent","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"code","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[]},{"_name":"reason","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[]},{"_name":"documentation","_type":"RelatedArtifact","_multiple":true,"_required":false,"_properties":[]},{"_name":"goalId","_type":"id","_multiple":true,"_required":false,"_properties":[]},{"_name":"triggerDefinition","_type":"TriggerDefinition","_multiple":true,"_required":false,"_properties":[]},{"_name":"condition","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"kind","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/action-condition-kind","_valueSetStrength":"required"},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"language","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"expression","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"input","_type":"DataRequirement","_multiple":true,"_required":false,"_properties":[]},{"_name":"output","_type":"DataRequirement","_multiple":true,"_required":false,"_properties":[]},{"_name":"relatedAction","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"actionId","_type":"id","_multiple":false,"_required":true,"_properties":[]},{"_name":"relationship","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/action-relationship-type","_valueSetStrength":"required"},{"_name":"offsetDuration","_choice":"offset[x]","_type":"Duration","_multiple":false,"_required":false},{"_name":"offsetRange","_choice":"offset[x]","_type":"Range","_multiple":false,"_required":false}]},{"_name":"timingDateTime","_choice":"timing[x]","_type":"dateTime","_multiple":false,"_required":false},{"_name":"timingAge","_choice":"timing[x]","_type":"Age","_multiple":false,"_required":false},{"_name":"timingPeriod","_choice":"timing[x]","_type":"Period","_multiple":false,"_required":false},{"_name":"timingDuration","_choice":"timing[x]","_type":"Duration","_multiple":false,"_required":false},{"_name":"timingRange","_choice":"timing[x]","_type":"Range","_multiple":false,"_required":false},{"_name":"timingTiming","_choice":"timing[x]","_type":"Timing","_multiple":false,"_required":false},{"_name":"participant","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/action-participant-type","_valueSetStrength":"required"},{"_name":"role","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/action-participant-role","_valueSetStrength":"example"}]},{"_name":"type","_type":"Coding","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/action-type","_valueSetStrength":"required"},{"_name":"groupingBehavior","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/action-grouping-behavior","_valueSetStrength":"required"},{"_name":"selectionBehavior","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/action-selection-behavior","_valueSetStrength":"required"},{"_name":"requiredBehavior","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/action-required-behavior","_valueSetStrength":"required"},{"_name":"precheckBehavior","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/action-precheck-behavior","_valueSetStrength":"required"},{"_name":"cardinalityBehavior","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/action-cardinality-behavior","_valueSetStrength":"required"},{"_name":"definition","_type":"Reference","_multiple":false,"_required":false},{"_name":"transform","_type":"Reference","_multiple":false,"_required":false,"_properties":[]},{"_name":"dynamicValue","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"path","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"language","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"expression","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"action","_type":"#PlanDefinition.action","_multiple":true,"_required":false}]}]},"Practitioner":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"active","_type":"boolean","_multiple":false,"_required":false},{"_name":"name","_type":"HumanName","_multiple":true,"_required":false},{"_name":"telecom","_type":"ContactPoint","_multiple":true,"_required":false},{"_name":"address","_type":"Address","_multiple":true,"_required":false},{"_name":"gender","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/administrative-gender","_valueSetStrength":"required"},{"_name":"birthDate","_type":"date","_multiple":false,"_required":false},{"_name":"photo","_type":"Attachment","_multiple":true,"_required":false},{"_name":"qualification","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/v2-2.7-0360","_valueSetStrength":"example"},{"_name":"period","_type":"Period","_multiple":false,"_required":false,"_properties":[]},{"_name":"issuer","_type":"Reference","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"communication","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"}]},"PractitionerRole":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"active","_type":"boolean","_multiple":false,"_required":false},{"_name":"period","_type":"Period","_multiple":false,"_required":false},{"_name":"practitioner","_type":"Reference","_multiple":false,"_required":false},{"_name":"organization","_type":"Reference","_multiple":false,"_required":false},{"_name":"code","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/practitioner-role","_valueSetStrength":"example"},{"_name":"specialty","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/c80-practice-codes","_valueSetStrength":"preferred"},{"_name":"location","_type":"Reference","_multiple":true,"_required":false},{"_name":"healthcareService","_type":"Reference","_multiple":true,"_required":false},{"_name":"telecom","_type":"ContactPoint","_multiple":true,"_required":false},{"_name":"availableTime","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"daysOfWeek","_type":"code","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/days-of-week","_valueSetStrength":"required"},{"_name":"allDay","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"availableStartTime","_type":"time","_multiple":false,"_required":false,"_properties":[]},{"_name":"availableEndTime","_type":"time","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"notAvailable","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"description","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"during","_type":"Period","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"availabilityExceptions","_type":"string","_multiple":false,"_required":false},{"_name":"endpoint","_type":"Reference","_multiple":true,"_required":false}]},"Procedure":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"instantiates","_type":"uri","_multiple":true,"_required":false},{"_name":"basedOn","_type":"Reference","_multiple":true},{"_name":"partOf","_type":"Reference","_multiple":true},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/event-status","_valueSetStrength":"required"},{"_name":"statusReason","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/procedure-not-performed-reason","_valueSetStrength":"example"},{"_name":"category","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/procedure-category","_valueSetStrength":"example"},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/procedure-code","_valueSetStrength":"example"},{"_name":"subject","_type":"Reference","_multiple":false},{"_name":"context","_type":"Reference","_multiple":false},{"_name":"performedDateTime","_choice":"performed","_type":"dateTime","_multiple":false,"_required":false},{"_name":"performedPeriod","_choice":"performed","_type":"Period","_multiple":false,"_required":false},{"_name":"performedString","_choice":"performed","_type":"string","_multiple":false,"_required":false},{"_name":"performedAge","_choice":"performed","_type":"Age","_multiple":false,"_required":false},{"_name":"performedRange","_choice":"performed","_type":"Range","_multiple":false,"_required":false},{"_name":"performer","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"role","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/performer-role","_valueSetStrength":"example"},{"_name":"actor","_type":"Reference","_multiple":false,"_required":true},{"_name":"onBehalfOf","_type":"Reference","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"location","_type":"Reference","_multiple":false,"_required":false},{"_name":"reasonCode","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/procedure-reason","_valueSetStrength":"example"},{"_name":"reasonReference","_type":"Reference","_multiple":true},{"_name":"bodySite","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/body-site","_valueSetStrength":"example"},{"_name":"outcome","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/procedure-outcome","_valueSetStrength":"example"},{"_name":"report","_type":"Reference","_multiple":true,"_required":false},{"_name":"complication","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/condition-code","_valueSetStrength":"example"},{"_name":"complicationDetail","_type":"Reference","_multiple":true,"_required":false},{"_name":"followUp","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/procedure-followup","_valueSetStrength":"example"},{"_name":"note","_type":"Annotation","_multiple":true,"_required":false},{"_name":"focalDevice","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"action","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/device-action","_valueSetStrength":"preferred"},{"_name":"manipulated","_type":"Reference","_multiple":false,"_required":true,"_properties":[]}]},{"_name":"usedReference","_type":"Reference","_multiple":true},{"_name":"usedCode","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/device-kind","_valueSetStrength":"example"}]},"ProcessRequest":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/fm-status","_valueSetStrength":"required"},{"_name":"action","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/actionlist","_valueSetStrength":"required"},{"_name":"target","_type":"Reference","_multiple":false,"_required":false},{"_name":"created","_type":"dateTime","_multiple":false,"_required":false},{"_name":"provider","_type":"Reference","_multiple":false,"_required":false},{"_name":"organization","_type":"Reference","_multiple":false,"_required":false},{"_name":"request","_type":"Reference","_multiple":false,"_required":false},{"_name":"response","_type":"Reference","_multiple":false,"_required":false},{"_name":"nullify","_type":"boolean","_multiple":false,"_required":false},{"_name":"reference","_type":"string","_multiple":false,"_required":false},{"_name":"item","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"sequenceLinkId","_type":"integer","_multiple":false,"_required":true,"_properties":[]}]},{"_name":"include","_type":"string","_multiple":true,"_required":false},{"_name":"exclude","_type":"string","_multiple":true,"_required":false},{"_name":"period","_type":"Period","_multiple":false,"_required":false}]},"ProcessResponse":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/fm-status","_valueSetStrength":"required"},{"_name":"created","_type":"dateTime","_multiple":false,"_required":false},{"_name":"organization","_type":"Reference","_multiple":false,"_required":false},{"_name":"request","_type":"Reference","_multiple":false,"_required":false},{"_name":"outcome","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/process-outcome","_valueSetStrength":"required"},{"_name":"disposition","_type":"string","_multiple":false,"_required":false},{"_name":"requestProvider","_type":"Reference","_multiple":false,"_required":false},{"_name":"requestOrganization","_type":"Reference","_multiple":false,"_required":false},{"_name":"form","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/forms","_valueSetStrength":"example"},{"_name":"processNote","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/note-type","_valueSetStrength":"required"},{"_name":"text","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"error","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/adjudication-error","_valueSetStrength":"example"},{"_name":"communicationRequest","_type":"Reference","_multiple":true,"_required":false}]},"ProductPlan":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/publication-status","_valueSetStrength":"required"},{"_name":"type","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/productplan-type","_valueSetStrength":"example"},{"_name":"name","_type":"string","_multiple":false,"_required":false},{"_name":"alias","_type":"string","_multiple":true,"_required":false},{"_name":"period","_type":"Period","_multiple":false,"_required":false},{"_name":"ownedBy","_type":"Reference","_multiple":false,"_required":false},{"_name":"administeredBy","_type":"Reference","_multiple":false,"_required":false},{"_name":"address","_type":"Address","_multiple":true,"_required":false},{"_name":"coverageArea","_type":"Reference","_multiple":false,"_required":false},{"_name":"contact","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"purpose","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/contactentity-type","_valueSetStrength":"extensible"},{"_name":"name","_type":"HumanName","_multiple":false,"_required":false,"_properties":[]},{"_name":"telecom","_type":"ContactPoint","_multiple":true,"_required":false,"_properties":[]},{"_name":"address","_type":"Address","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"coverage","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[]},{"_name":"benefit","_type":"BackboneElement","_multiple":true,"_required":true,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[]},{"_name":"item","_type":"BackboneElement","_multiple":true,"_required":true,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[]},{"_name":"benefitValue","_type":"Quantity","_multiple":false,"_required":false,"_properties":[]}]}]}]},{"_name":"plan","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"premium","_type":"Money","_multiple":false,"_required":false,"_properties":[]},{"_name":"category","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"benefit","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[]},{"_name":"cost","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[]},{"_name":"applicability","_type":"Coding","_multiple":true,"_required":false,"_properties":[]},{"_name":"qualifiers","_type":"string","_multiple":true,"_required":false,"_properties":[]},{"_name":"value","_type":"Quantity","_multiple":false,"_required":false,"_properties":[]}]}]}]}]},{"_name":"endpoint","_type":"Reference","_multiple":true,"_required":false}]},"Provenance":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"target","_type":"Reference","_multiple":true,"_required":true},{"_name":"occurredPeriod","_choice":"occurred","_type":"Period","_multiple":false,"_required":false},{"_name":"occurredDateTime","_choice":"occurred","_type":"dateTime","_multiple":false,"_required":false},{"_name":"recorded","_type":"instant","_multiple":false,"_required":true},{"_name":"policy","_type":"uri","_multiple":true,"_required":false},{"_name":"location","_type":"Reference","_multiple":false,"_required":false},{"_name":"reason","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/v3-PurposeOfUse","_valueSetStrength":"extensible"},{"_name":"activity","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/provenance-activity-type","_valueSetStrength":"extensible"},{"_name":"agent","_type":"BackboneElement","_multiple":true,"_required":true,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/participation-role-type","_valueSetStrength":"extensible"},{"_name":"role","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/security-role-type","_valueSetStrength":"example"},{"_name":"whoIdentifier","_choice":"who[x]","_type":"Identifier","_multiple":false,"_required":true},{"_name":"whoReference","_choice":"who[x]","_type":"Reference","_multiple":false,"_required":true},{"_name":"whoReference","_choice":"who[x]","_type":"Reference","_multiple":false,"_required":true},{"_name":"whoReference","_choice":"who[x]","_type":"Reference","_multiple":false,"_required":true},{"_name":"whoReference","_choice":"who[x]","_type":"Reference","_multiple":false,"_required":true},{"_name":"whoReference","_choice":"who[x]","_type":"Reference","_multiple":false,"_required":true},{"_name":"whoReference","_choice":"who[x]","_type":"Reference","_multiple":false,"_required":true},{"_name":"onBehalfOfIdentifier","_choice":"onBehalfOf[x]","_type":"Identifier","_multiple":false,"_required":false},{"_name":"onBehalfOfReference","_choice":"onBehalfOf[x]","_type":"Reference","_multiple":false,"_required":false},{"_name":"onBehalfOfReference","_choice":"onBehalfOf[x]","_type":"Reference","_multiple":false,"_required":false},{"_name":"onBehalfOfReference","_choice":"onBehalfOf[x]","_type":"Reference","_multiple":false,"_required":false},{"_name":"onBehalfOfReference","_choice":"onBehalfOf[x]","_type":"Reference","_multiple":false,"_required":false},{"_name":"onBehalfOfReference","_choice":"onBehalfOf[x]","_type":"Reference","_multiple":false,"_required":false},{"_name":"onBehalfOfReference","_choice":"onBehalfOf[x]","_type":"Reference","_multiple":false,"_required":false}]},{"_name":"entity","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"role","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/provenance-entity-role","_valueSetStrength":"required"},{"_name":"whatIdentifier","_choice":"what[x]","_type":"Identifier","_multiple":false,"_required":true},{"_name":"whatReference","_choice":"what[x]","_type":"Reference","_multiple":false,"_required":true},{"_name":"agent","_type":"#Provenance.agent","_multiple":true,"_required":false}]},{"_name":"signature","_type":"Signature","_multiple":true,"_required":false}]},"Questionnaire":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"url","_type":"uri","_multiple":false,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"version","_type":"string","_multiple":false,"_required":false},{"_name":"name","_type":"string","_multiple":false,"_required":false},{"_name":"title","_type":"string","_multiple":false,"_required":false},{"_name":"derivedFrom","_type":"uri","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/publication-status","_valueSetStrength":"required"},{"_name":"experimental","_type":"boolean","_multiple":false,"_required":false},{"_name":"subjectType","_type":"code","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/resource-types","_valueSetStrength":"required"},{"_name":"date","_type":"dateTime","_multiple":false,"_required":false},{"_name":"publisher","_type":"string","_multiple":false,"_required":false},{"_name":"contact","_type":"ContactDetail","_multiple":true,"_required":false},{"_name":"useContext","_type":"UsageContext","_multiple":true,"_required":false},{"_name":"jurisdiction","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/jurisdiction","_valueSetStrength":"extensible"},{"_name":"description","_type":"markdown","_multiple":false,"_required":false},{"_name":"purpose","_type":"markdown","_multiple":false,"_required":false},{"_name":"copyright","_type":"markdown","_multiple":false,"_required":false},{"_name":"approvalDate","_type":"date","_multiple":false,"_required":false},{"_name":"lastReviewDate","_type":"date","_multiple":false,"_required":false},{"_name":"effectivePeriod","_type":"Period","_multiple":false,"_required":false},{"_name":"code","_type":"Coding","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-questions","_valueSetStrength":"example"},{"_name":"item","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"linkId","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"definition","_type":"uri","_multiple":false,"_required":false,"_properties":[]},{"_name":"code","_type":"Coding","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-questions","_valueSetStrength":"example"},{"_name":"prefix","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"text","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"type","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/item-type","_valueSetStrength":"required"},{"_name":"enableWhen","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"question","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"hasAnswer","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"answerBoolean","_choice":"answer[x]","_type":"boolean","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"answerDecimal","_choice":"answer[x]","_type":"decimal","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"answerInteger","_choice":"answer[x]","_type":"integer","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"answerDate","_choice":"answer[x]","_type":"date","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"answerDateTime","_choice":"answer[x]","_type":"dateTime","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"answerTime","_choice":"answer[x]","_type":"time","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"answerString","_choice":"answer[x]","_type":"string","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"answerUri","_choice":"answer[x]","_type":"uri","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"answerAttachment","_choice":"answer[x]","_type":"Attachment","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"answerCoding","_choice":"answer[x]","_type":"Coding","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"answerQuantity","_choice":"answer[x]","_type":"Quantity","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"answerReference","_choice":"answer[x]","_type":"Reference","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"}]},{"_name":"required","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"repeats","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"readOnly","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"maxLength","_type":"integer","_multiple":false,"_required":false,"_properties":[]},{"_name":"options","_type":"Reference","_multiple":false,"_required":false,"_properties":[]},{"_name":"option","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"valueInteger","_choice":"value[x]","_type":"integer","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"valueDate","_choice":"value[x]","_type":"date","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"valueTime","_choice":"value[x]","_type":"time","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"valueString","_choice":"value[x]","_type":"string","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"valueCoding","_choice":"value[x]","_type":"Coding","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"initialSelected","_type":"boolean","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"initialBoolean","_choice":"initial[x]","_type":"boolean","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"initialDecimal","_choice":"initial[x]","_type":"decimal","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"initialInteger","_choice":"initial[x]","_type":"integer","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"initialDate","_choice":"initial[x]","_type":"date","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"initialDateTime","_choice":"initial[x]","_type":"dateTime","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"initialTime","_choice":"initial[x]","_type":"time","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"initialString","_choice":"initial[x]","_type":"string","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"initialUri","_choice":"initial[x]","_type":"uri","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"initialAttachment","_choice":"initial[x]","_type":"Attachment","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"initialCoding","_choice":"initial[x]","_type":"Coding","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"initialQuantity","_choice":"initial[x]","_type":"Quantity","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"initialReference","_choice":"initial[x]","_type":"Reference","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"item","_type":"#Questionnaire.item","_multiple":true,"_required":false}]}]},"QuestionnaireResponse":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"basedOn","_type":"Reference","_multiple":true},{"_name":"partOf","_type":"Reference","_multiple":true},{"_name":"questionnaire","_type":"Reference","_multiple":false,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers-status","_valueSetStrength":"required"},{"_name":"subject","_type":"Reference","_multiple":false,"_required":false},{"_name":"context","_type":"Reference","_multiple":false},{"_name":"authored","_type":"dateTime","_multiple":false,"_required":false},{"_name":"author","_type":"Reference","_multiple":false},{"_name":"source","_type":"Reference","_multiple":false},{"_name":"item","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"linkId","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"definition","_type":"uri","_multiple":false,"_required":false,"_properties":[]},{"_name":"text","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"subject","_type":"Reference","_multiple":false,"_required":false,"_properties":[]},{"_name":"answer","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"valueBoolean","_choice":"value[x]","_type":"boolean","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"valueDecimal","_choice":"value[x]","_type":"decimal","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"valueInteger","_choice":"value[x]","_type":"integer","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"valueDate","_choice":"value[x]","_type":"date","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"valueDateTime","_choice":"value[x]","_type":"dateTime","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"valueTime","_choice":"value[x]","_type":"time","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"valueString","_choice":"value[x]","_type":"string","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"valueUri","_choice":"value[x]","_type":"uri","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"valueAttachment","_choice":"value[x]","_type":"Attachment","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"valueCoding","_choice":"value[x]","_type":"Coding","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"valueQuantity","_choice":"value[x]","_type":"Quantity","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"valueReference","_choice":"value[x]","_type":"Reference","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/questionnaire-answers","_valueSetStrength":"example"},{"_name":"item","_type":"#QuestionnaireResponse.item","_multiple":true,"_required":false}]},{"_name":"item","_type":"#QuestionnaireResponse.item","_multiple":true,"_required":false}]}]},"RelatedPerson":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"active","_type":"boolean","_multiple":false,"_required":false},{"_name":"patient","_type":"Reference","_multiple":false,"_required":true},{"_name":"relationship","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/relatedperson-relationshiptype","_valueSetStrength":"preferred"},{"_name":"name","_type":"HumanName","_multiple":true,"_required":false},{"_name":"telecom","_type":"ContactPoint","_multiple":true,"_required":false},{"_name":"gender","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/administrative-gender","_valueSetStrength":"required"},{"_name":"birthDate","_type":"date","_multiple":false,"_required":false},{"_name":"address","_type":"Address","_multiple":true,"_required":false},{"_name":"photo","_type":"Attachment","_multiple":true,"_required":false},{"_name":"period","_type":"Period","_multiple":false,"_required":false}]},"RequestGroup":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"definition","_type":"Reference","_multiple":true,"_required":false},{"_name":"basedOn","_type":"Reference","_multiple":true,"_required":false},{"_name":"replaces","_type":"Reference","_multiple":true,"_required":false},{"_name":"groupIdentifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/request-status","_valueSetStrength":"required"},{"_name":"intent","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/request-intent","_valueSetStrength":"required"},{"_name":"priority","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/request-priority","_valueSetStrength":"required"},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"subject","_type":"Reference","_multiple":false},{"_name":"context","_type":"Reference","_multiple":false},{"_name":"authoredOn","_type":"dateTime","_multiple":false,"_required":false},{"_name":"author","_type":"Reference","_multiple":false},{"_name":"reasonCode","_type":"CodeableConcept","_multiple":true,"_required":false},{"_name":"reasonReference","_type":"Reference","_multiple":true,"_required":false},{"_name":"note","_type":"Annotation","_multiple":true,"_required":false},{"_name":"action","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"prefix","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"title","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"textEquivalent","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"code","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[]},{"_name":"documentation","_type":"RelatedArtifact","_multiple":true,"_required":false,"_properties":[]},{"_name":"condition","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"kind","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/action-condition-kind","_valueSetStrength":"required"},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"language","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"expression","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"relatedAction","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"actionId","_type":"id","_multiple":false,"_required":true,"_properties":[]},{"_name":"relationship","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/action-relationship-type","_valueSetStrength":"required"},{"_name":"offsetDuration","_choice":"offset[x]","_type":"Duration","_multiple":false,"_required":false},{"_name":"offsetRange","_choice":"offset[x]","_type":"Range","_multiple":false,"_required":false}]},{"_name":"timingDateTime","_choice":"timing[x]","_type":"dateTime","_multiple":false,"_required":false},{"_name":"timingAge","_choice":"timing[x]","_type":"Age","_multiple":false,"_required":false},{"_name":"timingPeriod","_choice":"timing[x]","_type":"Period","_multiple":false,"_required":false},{"_name":"timingDuration","_choice":"timing[x]","_type":"Duration","_multiple":false,"_required":false},{"_name":"timingRange","_choice":"timing[x]","_type":"Range","_multiple":false,"_required":false},{"_name":"timingTiming","_choice":"timing[x]","_type":"Timing","_multiple":false,"_required":false},{"_name":"participant","_type":"Reference","_multiple":true,"_required":false},{"_name":"type","_type":"Coding","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/action-type","_valueSetStrength":"extensible"},{"_name":"groupingBehavior","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/action-grouping-behavior","_valueSetStrength":"required"},{"_name":"selectionBehavior","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/action-selection-behavior","_valueSetStrength":"required"},{"_name":"requiredBehavior","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/action-required-behavior","_valueSetStrength":"required"},{"_name":"precheckBehavior","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/action-precheck-behavior","_valueSetStrength":"required"},{"_name":"cardinalityBehavior","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/action-cardinality-behavior","_valueSetStrength":"required"},{"_name":"resource","_type":"Reference","_multiple":false,"_required":false,"_properties":[]},{"_name":"action","_type":"#RequestGroup.action","_multiple":true,"_required":false}]}]},"ResearchStudy":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"title","_type":"string","_multiple":false,"_required":false},{"_name":"protocol","_type":"Reference","_multiple":true,"_required":false},{"_name":"partOf","_type":"Reference","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/research-study-status","_valueSetStrength":"required"},{"_name":"primaryPurposeType","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/research-study-prim-purp-type","_valueSetStrength":"extensible"},{"_name":"phase","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/research-study-phase","_valueSetStrength":"example"},{"_name":"category","_type":"CodeableConcept","_multiple":true,"_required":false},{"_name":"focus","_type":"CodeableConcept","_multiple":true,"_required":false},{"_name":"condition","_type":"Reference","_multiple":true,"_required":false},{"_name":"contact","_type":"ContactDetail","_multiple":true,"_required":false},{"_name":"relatedArtifact","_type":"RelatedArtifact","_multiple":true,"_required":false},{"_name":"keyword","_type":"CodeableConcept","_multiple":true,"_required":false},{"_name":"location","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/jurisdiction","_valueSetStrength":"extensible"},{"_name":"description","_type":"markdown","_multiple":false,"_required":false},{"_name":"enrollment","_type":"Reference","_multiple":true,"_required":false},{"_name":"period","_type":"Period","_multiple":false,"_required":false},{"_name":"sponsor","_type":"Reference","_multiple":false,"_required":false},{"_name":"principalInvestigator","_type":"Reference","_multiple":false,"_required":false},{"_name":"site","_type":"Reference","_multiple":true,"_required":false},{"_name":"reasonStopped","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/research-study-reason-stopped","_valueSetStrength":"example"},{"_name":"note","_type":"Annotation","_multiple":true,"_required":false},{"_name":"arm","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"name","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"objective","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"name","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/research-study-objective-type","_valueSetStrength":"preferred"}]}]},"ResearchSubject":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/research-subject-status","_valueSetStrength":"required"},{"_name":"period","_type":"Period","_multiple":false,"_required":false},{"_name":"study","_type":"Reference","_multiple":false,"_required":true},{"_name":"individual","_type":"Reference","_multiple":false,"_required":true},{"_name":"assignedArm","_type":"string","_multiple":false,"_required":false},{"_name":"actualArm","_type":"string","_multiple":false,"_required":false},{"_name":"consent","_type":"Reference","_multiple":false,"_required":false}]},"RiskAssessment":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"basedOn","_type":"Reference","_multiple":false,"_required":false},{"_name":"parent","_type":"Reference","_multiple":false,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/observation-status","_valueSetStrength":"required"},{"_name":"method","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"subject","_type":"Reference","_multiple":false},{"_name":"context","_type":"Reference","_multiple":false},{"_name":"occurrenceDateTime","_choice":"occurrence","_type":"dateTime","_multiple":false,"_required":false},{"_name":"occurrencePeriod","_choice":"occurrence","_type":"Period","_multiple":false,"_required":false},{"_name":"condition","_type":"Reference","_multiple":false,"_required":false},{"_name":"performer","_type":"Reference","_multiple":false},{"_name":"reasonCodeableConcept","_choice":"reason","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"reasonReference","_choice":"reason","_type":"Reference","_multiple":false,"_required":false},{"_name":"basis","_type":"Reference","_multiple":true,"_required":false},{"_name":"prediction","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"outcome","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[]},{"_name":"probabilityDecimal","_choice":"probability[x]","_type":"decimal","_multiple":false,"_required":false},{"_name":"probabilityRange","_choice":"probability[x]","_type":"Range","_multiple":false,"_required":false},{"_name":"qualitativeRisk","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/risk-probability","_valueSetStrength":"example"},{"_name":"relativeRisk","_type":"decimal","_multiple":false,"_required":false,"_properties":[]},{"_name":"whenPeriod","_choice":"when[x]","_type":"Period","_multiple":false,"_required":false},{"_name":"whenRange","_choice":"when[x]","_type":"Range","_multiple":false,"_required":false},{"_name":"rationale","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"mitigation","_type":"string","_multiple":false,"_required":false},{"_name":"comment","_type":"string","_multiple":false,"_required":false}]},"Schedule":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"active","_type":"boolean","_multiple":false,"_required":false},{"_name":"serviceCategory","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/service-category","_valueSetStrength":"example"},{"_name":"serviceType","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/service-type","_valueSetStrength":"example"},{"_name":"specialty","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/c80-practice-codes","_valueSetStrength":"preferred"},{"_name":"actor","_type":"Reference","_multiple":true},{"_name":"planningHorizon","_type":"Period","_multiple":false,"_required":false},{"_name":"comment","_type":"string","_multiple":false,"_required":false}]},"SearchParameter":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"url","_type":"uri","_multiple":false,"_required":true},{"_name":"version","_type":"string","_multiple":false,"_required":false},{"_name":"name","_type":"string","_multiple":false,"_required":true},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/publication-status","_valueSetStrength":"required"},{"_name":"experimental","_type":"boolean","_multiple":false,"_required":false},{"_name":"date","_type":"dateTime","_multiple":false,"_required":false},{"_name":"publisher","_type":"string","_multiple":false,"_required":false},{"_name":"contact","_type":"ContactDetail","_multiple":true,"_required":false},{"_name":"useContext","_type":"UsageContext","_multiple":true,"_required":false},{"_name":"jurisdiction","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/jurisdiction","_valueSetStrength":"extensible"},{"_name":"purpose","_type":"markdown","_multiple":false,"_required":false},{"_name":"code","_type":"code","_multiple":false,"_required":true},{"_name":"base","_type":"code","_multiple":true,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/resource-types","_valueSetStrength":"required"},{"_name":"type","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/search-param-type","_valueSetStrength":"required"},{"_name":"derivedFrom","_type":"uri","_multiple":false,"_required":false},{"_name":"description","_type":"markdown","_multiple":false,"_required":true},{"_name":"expression","_type":"string","_multiple":false,"_required":false},{"_name":"xpath","_type":"string","_multiple":false,"_required":false},{"_name":"xpathUsage","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/search-xpath-usage","_valueSetStrength":"required"},{"_name":"target","_type":"code","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/resource-types","_valueSetStrength":"required"},{"_name":"comparator","_type":"code","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/search-comparator","_valueSetStrength":"required"},{"_name":"modifier","_type":"code","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/search-modifier-code","_valueSetStrength":"required"},{"_name":"chain","_type":"string","_multiple":true,"_required":false},{"_name":"component","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"definition","_type":"Reference","_multiple":false,"_required":true,"_properties":[]},{"_name":"expression","_type":"string","_multiple":false,"_required":true,"_properties":[]}]}]},"Sequence":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"type","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/sequence-type","_valueSetStrength":"example"},{"_name":"coordinateSystem","_type":"integer","_multiple":false,"_required":true},{"_name":"patient","_type":"Reference","_multiple":false,"_required":false},{"_name":"specimen","_type":"Reference","_multiple":false,"_required":false},{"_name":"device","_type":"Reference","_multiple":false,"_required":false},{"_name":"performer","_type":"Reference","_multiple":false,"_required":false},{"_name":"quantity","_type":"Quantity","_multiple":false,"_required":false},{"_name":"referenceSeq","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"chromosome","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/chromosome-human","_valueSetStrength":"example"},{"_name":"genomeBuild","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"referenceSeqId","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/sequence-referenceSeq","_valueSetStrength":"example"},{"_name":"referenceSeqPointer","_type":"Reference","_multiple":false,"_required":false,"_properties":[]},{"_name":"referenceSeqString","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"strand","_type":"integer","_multiple":false,"_required":false,"_properties":[]},{"_name":"windowStart","_type":"integer","_multiple":false,"_required":true,"_properties":[]},{"_name":"windowEnd","_type":"integer","_multiple":false,"_required":true,"_properties":[]}]},{"_name":"variant","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"start","_type":"integer","_multiple":false,"_required":false,"_properties":[]},{"_name":"end","_type":"integer","_multiple":false,"_required":false,"_properties":[]},{"_name":"observedAllele","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"referenceAllele","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"cigar","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"variantPointer","_type":"Reference","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"observedSeq","_type":"string","_multiple":false,"_required":false},{"_name":"quality","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/quality-type","_valueSetStrength":"required"},{"_name":"standardSequence","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/sequence-quality-standardSequence","_valueSetStrength":"example"},{"_name":"start","_type":"integer","_multiple":false,"_required":false,"_properties":[]},{"_name":"end","_type":"integer","_multiple":false,"_required":false,"_properties":[]},{"_name":"score","_type":"Quantity","_multiple":false,"_required":false,"_properties":[]},{"_name":"method","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/sequence-quality-method","_valueSetStrength":"example"},{"_name":"truthTP","_type":"decimal","_multiple":false,"_required":false,"_properties":[]},{"_name":"queryTP","_type":"decimal","_multiple":false,"_required":false,"_properties":[]},{"_name":"truthFN","_type":"decimal","_multiple":false,"_required":false,"_properties":[]},{"_name":"queryFP","_type":"decimal","_multiple":false,"_required":false,"_properties":[]},{"_name":"gtFP","_type":"decimal","_multiple":false,"_required":false,"_properties":[]},{"_name":"precision","_type":"decimal","_multiple":false,"_required":false,"_properties":[]},{"_name":"recall","_type":"decimal","_multiple":false,"_required":false,"_properties":[]},{"_name":"fScore","_type":"decimal","_multiple":false,"_required":false,"_properties":[]},{"_name":"roc","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"score","_type":"integer","_multiple":true,"_required":false,"_properties":[]},{"_name":"numTP","_type":"integer","_multiple":true,"_required":false,"_properties":[]},{"_name":"numFP","_type":"integer","_multiple":true,"_required":false,"_properties":[]},{"_name":"numFN","_type":"integer","_multiple":true,"_required":false,"_properties":[]},{"_name":"precision","_type":"decimal","_multiple":true,"_required":false,"_properties":[]},{"_name":"sensitivity","_type":"decimal","_multiple":true,"_required":false,"_properties":[]},{"_name":"fMeasure","_type":"decimal","_multiple":true,"_required":false,"_properties":[]}]}]},{"_name":"readCoverage","_type":"integer","_multiple":false,"_required":false},{"_name":"repository","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/repository-type","_valueSetStrength":"required"},{"_name":"url","_type":"uri","_multiple":false,"_required":false,"_properties":[]},{"_name":"name","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"datasetId","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"variantsetId","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"readsetId","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"pointer","_type":"Reference","_multiple":true,"_required":false},{"_name":"structureVariant","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"precision","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"reportedaCGHRatio","_type":"decimal","_multiple":false,"_required":false,"_properties":[]},{"_name":"length","_type":"integer","_multiple":false,"_required":false,"_properties":[]},{"_name":"outer","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"start","_type":"integer","_multiple":false,"_required":false,"_properties":[]},{"_name":"end","_type":"integer","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"inner","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"start","_type":"integer","_multiple":false,"_required":false,"_properties":[]},{"_name":"end","_type":"integer","_multiple":false,"_required":false,"_properties":[]}]}]}]},"ServiceDefinition":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"url","_type":"uri","_multiple":false,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"version","_type":"string","_multiple":false,"_required":false},{"_name":"name","_type":"string","_multiple":false,"_required":false},{"_name":"title","_type":"string","_multiple":false,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/publication-status","_valueSetStrength":"required"},{"_name":"experimental","_type":"boolean","_multiple":false,"_required":false},{"_name":"date","_type":"dateTime","_multiple":false,"_required":false},{"_name":"publisher","_type":"string","_multiple":false,"_required":false},{"_name":"description","_type":"markdown","_multiple":false,"_required":false},{"_name":"purpose","_type":"markdown","_multiple":false,"_required":false},{"_name":"usage","_type":"string","_multiple":false,"_required":false},{"_name":"approvalDate","_type":"date","_multiple":false,"_required":false},{"_name":"lastReviewDate","_type":"date","_multiple":false,"_required":false},{"_name":"effectivePeriod","_type":"Period","_multiple":false,"_required":false},{"_name":"useContext","_type":"UsageContext","_multiple":true,"_required":false},{"_name":"jurisdiction","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/jurisdiction","_valueSetStrength":"extensible"},{"_name":"topic","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/definition-topic","_valueSetStrength":"example"},{"_name":"contributor","_type":"Contributor","_multiple":true,"_required":false},{"_name":"contact","_type":"ContactDetail","_multiple":true,"_required":false},{"_name":"copyright","_type":"markdown","_multiple":false,"_required":false},{"_name":"relatedArtifact","_type":"RelatedArtifact","_multiple":true,"_required":false},{"_name":"trigger","_type":"TriggerDefinition","_multiple":true,"_required":false},{"_name":"dataRequirement","_type":"DataRequirement","_multiple":true,"_required":false},{"_name":"operationDefinition","_type":"Reference","_multiple":false,"_required":false}]},"ServiceRequest":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"instantiates","_type":"uri","_multiple":true,"_required":false},{"_name":"basedOn","_type":"Reference","_multiple":true},{"_name":"replaces","_type":"Reference","_multiple":true,"_required":false},{"_name":"requisition","_type":"Identifier","_multiple":false,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/request-status","_valueSetStrength":"required"},{"_name":"intent","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/request-intent","_valueSetStrength":"required"},{"_name":"priority","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/request-priority","_valueSetStrength":"required"},{"_name":"doNotPerform","_type":"boolean","_multiple":false,"_required":false},{"_name":"category","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/servicerequest-category","_valueSetStrength":"example"},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/procedure-code","_valueSetStrength":"example"},{"_name":"orderDetail","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/servicerequest-orderdetail","_valueSetStrength":"example"},{"_name":"subject","_type":"Reference","_multiple":false},{"_name":"context","_type":"Reference","_multiple":false},{"_name":"occurrenceDateTime","_choice":"occurrence","_type":"dateTime","_multiple":false,"_required":false},{"_name":"occurrencePeriod","_choice":"occurrence","_type":"Period","_multiple":false,"_required":false},{"_name":"occurrenceTiming","_choice":"occurrence","_type":"Timing","_multiple":false,"_required":false},{"_name":"asNeededBoolean","_choice":"asNeeded","_type":"boolean","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/medication-as-needed-reason","_valueSetStrength":"example"},{"_name":"asNeededCodeableConcept","_choice":"asNeeded","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/medication-as-needed-reason","_valueSetStrength":"example"},{"_name":"authoredOn","_type":"dateTime","_multiple":false,"_required":false},{"_name":"requester","_type":"Reference","_multiple":false},{"_name":"performerType","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/participant-role","_valueSetStrength":"example"},{"_name":"performer","_type":"Reference","_multiple":false},{"_name":"reasonCode","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/procedure-reason","_valueSetStrength":"example"},{"_name":"reasonReference","_type":"Reference","_multiple":true},{"_name":"insurance","_type":"Reference","_multiple":true},{"_name":"supportingInfo","_type":"Reference","_multiple":true,"_required":false},{"_name":"specimen","_type":"Reference","_multiple":true,"_required":false},{"_name":"bodySite","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/body-site","_valueSetStrength":"example"},{"_name":"note","_type":"Annotation","_multiple":true,"_required":false},{"_name":"patientInstruction","_type":"string","_multiple":false,"_required":false},{"_name":"relevantHistory","_type":"Reference","_multiple":true,"_required":false}]},"Slot":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"serviceCategory","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/service-category","_valueSetStrength":"example"},{"_name":"serviceType","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/service-type","_valueSetStrength":"example"},{"_name":"specialty","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/c80-practice-codes","_valueSetStrength":"preferred"},{"_name":"appointmentType","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/v2-0276","_valueSetStrength":"preferred"},{"_name":"schedule","_type":"Reference","_multiple":false,"_required":true},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/slotstatus","_valueSetStrength":"required"},{"_name":"start","_type":"instant","_multiple":false,"_required":true},{"_name":"end","_type":"instant","_multiple":false,"_required":true},{"_name":"overbooked","_type":"boolean","_multiple":false,"_required":false},{"_name":"comment","_type":"string","_multiple":false,"_required":false}]},"Specimen":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"accessionIdentifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/specimen-status","_valueSetStrength":"required"},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/v2-0487","_valueSetStrength":"example"},{"_name":"subject","_type":"Reference","_multiple":false},{"_name":"receivedTime","_type":"dateTime","_multiple":false,"_required":false},{"_name":"parent","_type":"Reference","_multiple":true,"_required":false},{"_name":"request","_type":"Reference","_multiple":true,"_required":false},{"_name":"collection","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"collector","_type":"Reference","_multiple":false,"_required":false,"_properties":[]},{"_name":"collectedDateTime","_choice":"collected[x]","_type":"dateTime","_multiple":false,"_required":false},{"_name":"collectedPeriod","_choice":"collected[x]","_type":"Period","_multiple":false,"_required":false},{"_name":"quantity","_type":"Quantity","_multiple":false,"_required":false,"_properties":[]},{"_name":"method","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/specimen-collection-method","_valueSetStrength":"example"},{"_name":"bodySite","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/body-site","_valueSetStrength":"example"}]},{"_name":"processing","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"procedure","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/specimen-processing-procedure","_valueSetStrength":"example"},{"_name":"additive","_type":"Reference","_multiple":true,"_required":false,"_properties":[]},{"_name":"timeDateTime","_choice":"time[x]","_type":"dateTime","_multiple":false,"_required":false},{"_name":"timePeriod","_choice":"time[x]","_type":"Period","_multiple":false,"_required":false}]},{"_name":"container","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false,"_properties":[]},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/specimen-container-type","_valueSetStrength":"example"},{"_name":"capacity","_type":"Quantity","_multiple":false,"_required":false,"_properties":[]},{"_name":"specimenQuantity","_type":"Quantity","_multiple":false,"_required":false,"_properties":[]},{"_name":"additiveCodeableConcept","_choice":"additive[x]","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/v2-0371","_valueSetStrength":"example"},{"_name":"additiveReference","_choice":"additive[x]","_type":"Reference","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/v2-0371","_valueSetStrength":"example"}]},{"_name":"note","_type":"Annotation","_multiple":true,"_required":false}]},"SpecimenDefinition":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"typeCollected","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/v2-0487","_valueSetStrength":"example"},{"_name":"patientPreparation","_type":"string","_multiple":false,"_required":false},{"_name":"timeAspect","_type":"string","_multiple":false,"_required":false},{"_name":"collection","_type":"CodeableConcept","_multiple":true,"_required":false},{"_name":"specimenToLab","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"isDerived","_type":"boolean","_multiple":false,"_required":true,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/v2-0487","_valueSetStrength":"example"},{"_name":"preference","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/specimen-contained-preference","_valueSetStrength":"required"},{"_name":"containerMaterial","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"containerType","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/specimen-container-type","_valueSetStrength":"example"},{"_name":"containerCap","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/container-cap","_valueSetStrength":"example"},{"_name":"containerDescription","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"containerCapacity","_type":"Quantity","_multiple":false,"_required":false,"_properties":[]},{"_name":"containerMinimumVolume","_type":"Quantity","_multiple":false,"_required":false,"_properties":[]},{"_name":"containerAdditive","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"additiveCodeableConcept","_choice":"additive[x]","_type":"CodeableConcept","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/v2-0371","_valueSetStrength":"example"},{"_name":"additiveReference","_choice":"additive[x]","_type":"Reference","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/v2-0371","_valueSetStrength":"example"}]},{"_name":"containerPreparation","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"requirement","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"retentionTime","_type":"Duration","_multiple":false,"_required":false,"_properties":[]},{"_name":"rejectionCriterion","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/rejection-criteria","_valueSetStrength":"example"},{"_name":"handling","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"conditionSet","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/handling-condition","_valueSetStrength":"example"},{"_name":"tempRange","_type":"Range","_multiple":false,"_required":false,"_properties":[]},{"_name":"maxDuration","_type":"Duration","_multiple":false,"_required":false,"_properties":[]},{"_name":"lightExposure","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"instruction","_type":"string","_multiple":false,"_required":false,"_properties":[]}]}]}]},"StructureDefinition":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"url","_type":"uri","_multiple":false,"_required":true},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"version","_type":"string","_multiple":false,"_required":false},{"_name":"name","_type":"string","_multiple":false,"_required":true},{"_name":"title","_type":"string","_multiple":false,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/publication-status","_valueSetStrength":"required"},{"_name":"experimental","_type":"boolean","_multiple":false,"_required":false},{"_name":"date","_type":"dateTime","_multiple":false,"_required":false},{"_name":"publisher","_type":"string","_multiple":false,"_required":false},{"_name":"contact","_type":"ContactDetail","_multiple":true,"_required":false},{"_name":"description","_type":"markdown","_multiple":false,"_required":false},{"_name":"useContext","_type":"UsageContext","_multiple":true,"_required":false},{"_name":"jurisdiction","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/jurisdiction","_valueSetStrength":"extensible"},{"_name":"purpose","_type":"markdown","_multiple":false,"_required":false},{"_name":"copyright","_type":"markdown","_multiple":false,"_required":false},{"_name":"keyword","_type":"Coding","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/profile-code","_valueSetStrength":"example"},{"_name":"fhirVersion","_type":"id","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/fhir-versions","_valueSetStrength":"required"},{"_name":"mapping","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"identity","_type":"id","_multiple":false,"_required":true,"_properties":[]},{"_name":"uri","_type":"uri","_multiple":false,"_required":false,"_properties":[]},{"_name":"name","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"comment","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"kind","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/structure-definition-kind","_valueSetStrength":"required"},{"_name":"abstract","_type":"boolean","_multiple":false,"_required":true},{"_name":"contextType","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/extension-context","_valueSetStrength":"required"},{"_name":"context","_type":"string","_multiple":true,"_required":false},{"_name":"contextInvariant","_type":"string","_multiple":true,"_required":false},{"_name":"type","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/defined-types","_valueSetStrength":"extensible"},{"_name":"baseDefinition","_type":"uri","_multiple":false,"_required":false},{"_name":"derivation","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/type-derivation-rule","_valueSetStrength":"required"},{"_name":"snapshot","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"element","_type":"ElementDefinition","_multiple":true,"_required":true,"_properties":[]}]},{"_name":"differential","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"element","_type":"ElementDefinition","_multiple":true,"_required":true,"_properties":[]}]}]},"StructureMap":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"url","_type":"uri","_multiple":false,"_required":true},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"version","_type":"string","_multiple":false,"_required":false},{"_name":"name","_type":"string","_multiple":false,"_required":true},{"_name":"title","_type":"string","_multiple":false,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/publication-status","_valueSetStrength":"required"},{"_name":"experimental","_type":"boolean","_multiple":false,"_required":false},{"_name":"date","_type":"dateTime","_multiple":false,"_required":false},{"_name":"publisher","_type":"string","_multiple":false,"_required":false},{"_name":"contact","_type":"ContactDetail","_multiple":true,"_required":false},{"_name":"description","_type":"markdown","_multiple":false,"_required":false},{"_name":"useContext","_type":"UsageContext","_multiple":true,"_required":false},{"_name":"jurisdiction","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/jurisdiction","_valueSetStrength":"extensible"},{"_name":"purpose","_type":"markdown","_multiple":false,"_required":false},{"_name":"copyright","_type":"markdown","_multiple":false,"_required":false},{"_name":"structure","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"url","_type":"uri","_multiple":false,"_required":true,"_properties":[]},{"_name":"mode","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/map-model-mode","_valueSetStrength":"required"},{"_name":"alias","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"documentation","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"import","_type":"uri","_multiple":true,"_required":false},{"_name":"group","_type":"BackboneElement","_multiple":true,"_required":true,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"name","_type":"id","_multiple":false,"_required":true,"_properties":[]},{"_name":"extends","_type":"id","_multiple":false,"_required":false,"_properties":[]},{"_name":"typeMode","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/map-group-type-mode","_valueSetStrength":"required"},{"_name":"documentation","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"input","_type":"BackboneElement","_multiple":true,"_required":true,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"name","_type":"id","_multiple":false,"_required":true,"_properties":[]},{"_name":"type","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"mode","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/map-input-mode","_valueSetStrength":"required"},{"_name":"documentation","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"rule","_type":"BackboneElement","_multiple":true,"_required":true,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"name","_type":"id","_multiple":false,"_required":true,"_properties":[]},{"_name":"source","_type":"BackboneElement","_multiple":true,"_required":true,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"context","_type":"id","_multiple":false,"_required":true,"_properties":[]},{"_name":"min","_type":"integer","_multiple":false,"_required":false,"_properties":[]},{"_name":"max","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"type","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"defaultValueBase64Binary","_choice":"defaultValue[x]","_type":"base64Binary","_multiple":false,"_required":false},{"_name":"defaultValueBoolean","_choice":"defaultValue[x]","_type":"boolean","_multiple":false,"_required":false},{"_name":"defaultValueCode","_choice":"defaultValue[x]","_type":"code","_multiple":false,"_required":false},{"_name":"defaultValueDate","_choice":"defaultValue[x]","_type":"date","_multiple":false,"_required":false},{"_name":"defaultValueDateTime","_choice":"defaultValue[x]","_type":"dateTime","_multiple":false,"_required":false},{"_name":"defaultValueDecimal","_choice":"defaultValue[x]","_type":"decimal","_multiple":false,"_required":false},{"_name":"defaultValueId","_choice":"defaultValue[x]","_type":"id","_multiple":false,"_required":false},{"_name":"defaultValueInstant","_choice":"defaultValue[x]","_type":"instant","_multiple":false,"_required":false},{"_name":"defaultValueInteger","_choice":"defaultValue[x]","_type":"integer","_multiple":false,"_required":false},{"_name":"defaultValueMarkdown","_choice":"defaultValue[x]","_type":"markdown","_multiple":false,"_required":false},{"_name":"defaultValueOid","_choice":"defaultValue[x]","_type":"oid","_multiple":false,"_required":false},{"_name":"defaultValuePositiveInt","_choice":"defaultValue[x]","_type":"positiveInt","_multiple":false,"_required":false},{"_name":"defaultValueString","_choice":"defaultValue[x]","_type":"string","_multiple":false,"_required":false},{"_name":"defaultValueTime","_choice":"defaultValue[x]","_type":"time","_multiple":false,"_required":false},{"_name":"defaultValueUnsignedInt","_choice":"defaultValue[x]","_type":"unsignedInt","_multiple":false,"_required":false},{"_name":"defaultValueUri","_choice":"defaultValue[x]","_type":"uri","_multiple":false,"_required":false},{"_name":"defaultValueAddress","_choice":"defaultValue[x]","_type":"Address","_multiple":false,"_required":false},{"_name":"defaultValueAge","_choice":"defaultValue[x]","_type":"Age","_multiple":false,"_required":false},{"_name":"defaultValueAnnotation","_choice":"defaultValue[x]","_type":"Annotation","_multiple":false,"_required":false},{"_name":"defaultValueAttachment","_choice":"defaultValue[x]","_type":"Attachment","_multiple":false,"_required":false},{"_name":"defaultValueCodeableConcept","_choice":"defaultValue[x]","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"defaultValueCoding","_choice":"defaultValue[x]","_type":"Coding","_multiple":false,"_required":false},{"_name":"defaultValueContactPoint","_choice":"defaultValue[x]","_type":"ContactPoint","_multiple":false,"_required":false},{"_name":"defaultValueCount","_choice":"defaultValue[x]","_type":"Count","_multiple":false,"_required":false},{"_name":"defaultValueDistance","_choice":"defaultValue[x]","_type":"Distance","_multiple":false,"_required":false},{"_name":"defaultValueDuration","_choice":"defaultValue[x]","_type":"Duration","_multiple":false,"_required":false},{"_name":"defaultValueHumanName","_choice":"defaultValue[x]","_type":"HumanName","_multiple":false,"_required":false},{"_name":"defaultValueIdentifier","_choice":"defaultValue[x]","_type":"Identifier","_multiple":false,"_required":false},{"_name":"defaultValueMoney","_choice":"defaultValue[x]","_type":"Money","_multiple":false,"_required":false},{"_name":"defaultValuePeriod","_choice":"defaultValue[x]","_type":"Period","_multiple":false,"_required":false},{"_name":"defaultValueQuantity","_choice":"defaultValue[x]","_type":"Quantity","_multiple":false,"_required":false},{"_name":"defaultValueRange","_choice":"defaultValue[x]","_type":"Range","_multiple":false,"_required":false},{"_name":"defaultValueRatio","_choice":"defaultValue[x]","_type":"Ratio","_multiple":false,"_required":false},{"_name":"defaultValueReference","_choice":"defaultValue[x]","_type":"Reference","_multiple":false,"_required":false},{"_name":"defaultValueSampledData","_choice":"defaultValue[x]","_type":"SampledData","_multiple":false,"_required":false},{"_name":"defaultValueSignature","_choice":"defaultValue[x]","_type":"Signature","_multiple":false,"_required":false},{"_name":"defaultValueTiming","_choice":"defaultValue[x]","_type":"Timing","_multiple":false,"_required":false},{"_name":"defaultValueDosage","_choice":"defaultValue[x]","_type":"Dosage","_multiple":false,"_required":false},{"_name":"defaultValueContactDetail","_choice":"defaultValue[x]","_type":"ContactDetail","_multiple":false,"_required":false},{"_name":"defaultValueContributor","_choice":"defaultValue[x]","_type":"Contributor","_multiple":false,"_required":false},{"_name":"defaultValueDataRequirement","_choice":"defaultValue[x]","_type":"DataRequirement","_multiple":false,"_required":false},{"_name":"defaultValueParameterDefinition","_choice":"defaultValue[x]","_type":"ParameterDefinition","_multiple":false,"_required":false},{"_name":"defaultValueRelatedArtifact","_choice":"defaultValue[x]","_type":"RelatedArtifact","_multiple":false,"_required":false},{"_name":"defaultValueTriggerDefinition","_choice":"defaultValue[x]","_type":"TriggerDefinition","_multiple":false,"_required":false},{"_name":"defaultValueUsageContext","_choice":"defaultValue[x]","_type":"UsageContext","_multiple":false,"_required":false},{"_name":"defaultValueMeta","_choice":"defaultValue[x]","_type":"Meta","_multiple":false,"_required":false},{"_name":"element","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"listMode","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/map-source-list-mode","_valueSetStrength":"required"},{"_name":"variable","_type":"id","_multiple":false,"_required":false,"_properties":[]},{"_name":"condition","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"check","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"target","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"context","_type":"id","_multiple":false,"_required":false,"_properties":[]},{"_name":"contextType","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/map-context-type","_valueSetStrength":"required"},{"_name":"element","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"variable","_type":"id","_multiple":false,"_required":false,"_properties":[]},{"_name":"listMode","_type":"code","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/map-target-list-mode","_valueSetStrength":"required"},{"_name":"listRuleId","_type":"id","_multiple":false,"_required":false,"_properties":[]},{"_name":"transform","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/map-transform","_valueSetStrength":"required"},{"_name":"parameter","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"valueId","_choice":"value[x]","_type":"id","_multiple":false,"_required":true},{"_name":"valueString","_choice":"value[x]","_type":"string","_multiple":false,"_required":true},{"_name":"valueBoolean","_choice":"value[x]","_type":"boolean","_multiple":false,"_required":true},{"_name":"valueInteger","_choice":"value[x]","_type":"integer","_multiple":false,"_required":true},{"_name":"valueDecimal","_choice":"value[x]","_type":"decimal","_multiple":false,"_required":true}]}]},{"_name":"rule","_type":"#StructureMap.group.rule","_multiple":true,"_required":false},{"_name":"dependent","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"name","_type":"id","_multiple":false,"_required":true,"_properties":[]},{"_name":"variable","_type":"string","_multiple":true,"_required":true,"_properties":[]}]},{"_name":"documentation","_type":"string","_multiple":false,"_required":false,"_properties":[]}]}]}]},"Subscription":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/subscription-status","_valueSetStrength":"required"},{"_name":"contact","_type":"ContactPoint","_multiple":true,"_required":false},{"_name":"end","_type":"instant","_multiple":false,"_required":false},{"_name":"reason","_type":"string","_multiple":false,"_required":true},{"_name":"criteria","_type":"string","_multiple":false,"_required":true},{"_name":"error","_type":"string","_multiple":false,"_required":false},{"_name":"channel","_type":"BackboneElement","_multiple":false,"_required":true,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/subscription-channel-type","_valueSetStrength":"required"},{"_name":"endpoint","_type":"uri","_multiple":false,"_required":false,"_properties":[]},{"_name":"payload","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"header","_type":"string","_multiple":true,"_required":false,"_properties":[]}]},{"_name":"tag","_type":"Coding","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/subscription-tag","_valueSetStrength":"example"}]},"Substance":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/substance-status","_valueSetStrength":"required"},{"_name":"category","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/substance-category","_valueSetStrength":"extensible"},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/substance-code","_valueSetStrength":"example"},{"_name":"description","_type":"string","_multiple":false,"_required":false},{"_name":"instance","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false,"_properties":[]},{"_name":"expiry","_type":"dateTime","_multiple":false,"_required":false,"_properties":[]},{"_name":"quantity","_type":"Quantity","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"ingredient","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"quantity","_type":"Ratio","_multiple":false,"_required":false,"_properties":[]},{"_name":"substanceCodeableConcept","_choice":"substance[x]","_type":"CodeableConcept","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/substance-code","_valueSetStrength":"example"},{"_name":"substanceReference","_choice":"substance[x]","_type":"Reference","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/substance-code","_valueSetStrength":"example"}]}]},"SubstancePolymer":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"class","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"geometry","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"copolymerConnectivity","_type":"CodeableConcept","_multiple":true,"_required":false},{"_name":"modification","_type":"string","_multiple":true,"_required":false},{"_name":"monomerSet","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"ratioType","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"startingMaterial","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"material","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"isDefining","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"amount","_type":"SubstanceAmount","_multiple":false,"_required":false,"_properties":[]}]}]},{"_name":"repeat","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"numberOfUnits","_type":"integer","_multiple":false,"_required":false,"_properties":[]},{"_name":"averageMolecularFormula","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"repeatUnitAmountType","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"repeatUnit","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"orientationOfPolymerisation","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"repeatUnit","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"amount","_type":"SubstanceAmount","_multiple":false,"_required":false,"_properties":[]},{"_name":"degreeOfPolymerisation","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"degree","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"amount","_type":"SubstanceAmount","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"structuralRepresentation","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"representation","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"attachment","_type":"Attachment","_multiple":false,"_required":false,"_properties":[]}]}]}]}]},"SubstanceReferenceInformation":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"comment","_type":"string","_multiple":false,"_required":false},{"_name":"gene","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"geneSequenceOrigin","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"gene","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"source","_type":"Reference","_multiple":true,"_required":false,"_properties":[]}]},{"_name":"geneElement","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"element","_type":"Identifier","_multiple":false,"_required":false,"_properties":[]},{"_name":"source","_type":"Reference","_multiple":true,"_required":false,"_properties":[]}]},{"_name":"classification","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"domain","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"classification","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"subtype","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[]},{"_name":"source","_type":"Reference","_multiple":true,"_required":false,"_properties":[]}]},{"_name":"relationship","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"substanceReference","_choice":"substance[x]","_type":"Reference","_multiple":false,"_required":false},{"_name":"substanceCodeableConcept","_choice":"substance[x]","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"relationship","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"interaction","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"isDefining","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"amountQuantity","_choice":"amount[x]","_type":"Quantity","_multiple":false,"_required":false},{"_name":"amountRange","_choice":"amount[x]","_type":"Range","_multiple":false,"_required":false},{"_name":"amountString","_choice":"amount[x]","_type":"string","_multiple":false,"_required":false},{"_name":"amountType","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"amountText","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"source","_type":"Reference","_multiple":true,"_required":false,"_properties":[]}]},{"_name":"target","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"target","_type":"Identifier","_multiple":false,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"interaction","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"organism","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"organismType","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"source","_type":"Reference","_multiple":true,"_required":false,"_properties":[]},{"_name":"amountQuantity","_choice":"amount[x]","_type":"Quantity","_multiple":false,"_required":false},{"_name":"amountRange","_choice":"amount[x]","_type":"Range","_multiple":false,"_required":false},{"_name":"amountString","_choice":"amount[x]","_type":"string","_multiple":false,"_required":false},{"_name":"amountType","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]}]}]},"SubstanceSpecification":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"comment","_type":"string","_multiple":false,"_required":false},{"_name":"stoichiometric","_type":"boolean","_multiple":false,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"referenceSource","_type":"string","_multiple":true,"_required":false},{"_name":"moiety","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"role","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false,"_properties":[]},{"_name":"name","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"stereochemistry","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"opticalActivity","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"molecularFormula","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"amount","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"property","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"name","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"parameters","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"substanceId","_type":"Identifier","_multiple":false,"_required":false,"_properties":[]},{"_name":"substanceName","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"amount","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"referenceInformation","_type":"Reference","_multiple":false,"_required":false},{"_name":"structure","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"stereochemistry","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"opticalActivity","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"molecularFormula","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"molecularFormulaByMoiety","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"isotope","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"nuclideId","_type":"Identifier","_multiple":false,"_required":false,"_properties":[]},{"_name":"nuclideName","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"substitutionType","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"nuclideHalfLife","_type":"Quantity","_multiple":false,"_required":false,"_properties":[]},{"_name":"amount","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"molecularWeight","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"method","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"amount","_type":"string","_multiple":false,"_required":false,"_properties":[]}]}]},{"_name":"molecularWeight","_type":"#SubstanceSpecification.structure.isotope.molecularWeight","_multiple":false,"_required":false},{"_name":"referenceSource","_type":"Reference","_multiple":true,"_required":false,"_properties":[]},{"_name":"structuralRepresentation","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"representation","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"attachment","_type":"Attachment","_multiple":false,"_required":false,"_properties":[]}]}]},{"_name":"substanceCode","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"status","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"statusDate","_type":"dateTime","_multiple":false,"_required":false,"_properties":[]},{"_name":"comment","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"referenceSource","_type":"string","_multiple":true,"_required":false,"_properties":[]}]},{"_name":"substanceName","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"name","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"language","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[]},{"_name":"domain","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[]},{"_name":"jurisdiction","_type":"CodeableConcept","_multiple":true,"_required":false,"_properties":[]},{"_name":"officialName","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"authority","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"status","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"date","_type":"dateTime","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"referenceSource","_type":"string","_multiple":true,"_required":false,"_properties":[]}]},{"_name":"polymer","_type":"Reference","_multiple":false,"_required":false}]},"SupplyDelivery":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"basedOn","_type":"Reference","_multiple":true,"_required":false},{"_name":"partOf","_type":"Reference","_multiple":true},{"_name":"status","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/supplydelivery-status","_valueSetStrength":"required"},{"_name":"patient","_type":"Reference","_multiple":false,"_required":false},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/supplydelivery-type","_valueSetStrength":"required"},{"_name":"suppliedItem","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"quantity","_type":"Quantity","_multiple":false,"_required":false,"_properties":[]},{"_name":"itemCodeableConcept","_choice":"item[x]","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/supply-item","_valueSetStrength":"example"},{"_name":"itemReference","_choice":"item[x]","_type":"Reference","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/supply-item","_valueSetStrength":"example"},{"_name":"itemReference","_choice":"item[x]","_type":"Reference","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/supply-item","_valueSetStrength":"example"},{"_name":"itemReference","_choice":"item[x]","_type":"Reference","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/supply-item","_valueSetStrength":"example"}]},{"_name":"occurrenceDateTime","_choice":"occurrence","_type":"dateTime","_multiple":false,"_required":false},{"_name":"occurrencePeriod","_choice":"occurrence","_type":"Period","_multiple":false,"_required":false},{"_name":"occurrenceTiming","_choice":"occurrence","_type":"Timing","_multiple":false,"_required":false},{"_name":"supplier","_type":"Reference","_multiple":false},{"_name":"destination","_type":"Reference","_multiple":false,"_required":false},{"_name":"receiver","_type":"Reference","_multiple":true,"_required":false}]},"SupplyRequest":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/supplyrequest-status","_valueSetStrength":"required"},{"_name":"category","_type":"CodeableConcept","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/supplyrequest-kind","_valueSetStrength":"example"},{"_name":"priority","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/request-priority","_valueSetStrength":"required"},{"_name":"itemCodeableConcept","_choice":"item","_type":"CodeableConcept","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/supply-item","_valueSetStrength":"example"},{"_name":"itemReference","_choice":"item","_type":"Reference","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/supply-item","_valueSetStrength":"example"},{"_name":"itemReference","_choice":"item","_type":"Reference","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/supply-item","_valueSetStrength":"example"},{"_name":"itemReference","_choice":"item","_type":"Reference","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/supply-item","_valueSetStrength":"example"},{"_name":"quantity","_type":"Quantity","_multiple":false,"_required":true},{"_name":"parameter","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[]},{"_name":"valueCodeableConcept","_choice":"value[x]","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"valueQuantity","_choice":"value[x]","_type":"Quantity","_multiple":false,"_required":false},{"_name":"valueRange","_choice":"value[x]","_type":"Range","_multiple":false,"_required":false},{"_name":"valueBoolean","_choice":"value[x]","_type":"boolean","_multiple":false,"_required":false}]},{"_name":"occurrenceDateTime","_choice":"occurrence","_type":"dateTime","_multiple":false,"_required":false},{"_name":"occurrencePeriod","_choice":"occurrence","_type":"Period","_multiple":false,"_required":false},{"_name":"occurrenceTiming","_choice":"occurrence","_type":"Timing","_multiple":false,"_required":false},{"_name":"authoredOn","_type":"dateTime","_multiple":false,"_required":false},{"_name":"requester","_type":"Reference","_multiple":false},{"_name":"supplier","_type":"Reference","_multiple":true},{"_name":"reasonCode","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/supplyrequest-reason","_valueSetStrength":"example"},{"_name":"reasonReference","_type":"Reference","_multiple":true},{"_name":"deliverFrom","_type":"Reference","_multiple":false},{"_name":"deliverTo","_type":"Reference","_multiple":false}]},"Task":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"instantiatesUri","_choice":"instantiates","_type":"uri","_multiple":false,"_required":false},{"_name":"instantiatesReference","_choice":"instantiates","_type":"Reference","_multiple":false,"_required":false},{"_name":"basedOn","_type":"Reference","_multiple":true,"_required":false},{"_name":"groupIdentifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"partOf","_type":"Reference","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/task-status","_valueSetStrength":"required"},{"_name":"statusReason","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"businessStatus","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"intent","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/request-intent","_valueSetStrength":"required"},{"_name":"priority","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/request-priority","_valueSetStrength":"required"},{"_name":"code","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"description","_type":"string","_multiple":false,"_required":false},{"_name":"focus","_type":"Reference","_multiple":false,"_required":false},{"_name":"for","_type":"Reference","_multiple":false,"_required":false},{"_name":"context","_type":"Reference","_multiple":false},{"_name":"executionPeriod","_type":"Period","_multiple":false,"_required":false},{"_name":"authoredOn","_type":"dateTime","_multiple":false,"_required":false},{"_name":"lastModified","_type":"dateTime","_multiple":false,"_required":false},{"_name":"requester","_type":"Reference","_multiple":false},{"_name":"performerType","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/task-performer-type","_valueSetStrength":"preferred"},{"_name":"owner","_type":"Reference","_multiple":false},{"_name":"reasonCode","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"reasonReference","_type":"Reference","_multiple":false,"_required":false},{"_name":"note","_type":"Annotation","_multiple":true,"_required":false},{"_name":"relevantHistory","_type":"Reference","_multiple":true,"_required":false},{"_name":"restriction","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"repetitions","_type":"positiveInt","_multiple":false,"_required":false,"_properties":[]},{"_name":"period","_type":"Period","_multiple":false,"_required":false,"_properties":[]},{"_name":"recipient","_type":"Reference","_multiple":true,"_required":false}]},{"_name":"input","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[]},{"_name":"valueBase64Binary","_choice":"value[x]","_type":"base64Binary","_multiple":false,"_required":true},{"_name":"valueBoolean","_choice":"value[x]","_type":"boolean","_multiple":false,"_required":true},{"_name":"valueCode","_choice":"value[x]","_type":"code","_multiple":false,"_required":true},{"_name":"valueDate","_choice":"value[x]","_type":"date","_multiple":false,"_required":true},{"_name":"valueDateTime","_choice":"value[x]","_type":"dateTime","_multiple":false,"_required":true},{"_name":"valueDecimal","_choice":"value[x]","_type":"decimal","_multiple":false,"_required":true},{"_name":"valueId","_choice":"value[x]","_type":"id","_multiple":false,"_required":true},{"_name":"valueInstant","_choice":"value[x]","_type":"instant","_multiple":false,"_required":true},{"_name":"valueInteger","_choice":"value[x]","_type":"integer","_multiple":false,"_required":true},{"_name":"valueMarkdown","_choice":"value[x]","_type":"markdown","_multiple":false,"_required":true},{"_name":"valueOid","_choice":"value[x]","_type":"oid","_multiple":false,"_required":true},{"_name":"valuePositiveInt","_choice":"value[x]","_type":"positiveInt","_multiple":false,"_required":true},{"_name":"valueString","_choice":"value[x]","_type":"string","_multiple":false,"_required":true},{"_name":"valueTime","_choice":"value[x]","_type":"time","_multiple":false,"_required":true},{"_name":"valueUnsignedInt","_choice":"value[x]","_type":"unsignedInt","_multiple":false,"_required":true},{"_name":"valueUri","_choice":"value[x]","_type":"uri","_multiple":false,"_required":true},{"_name":"valueAddress","_choice":"value[x]","_type":"Address","_multiple":false,"_required":true},{"_name":"valueAge","_choice":"value[x]","_type":"Age","_multiple":false,"_required":true},{"_name":"valueAnnotation","_choice":"value[x]","_type":"Annotation","_multiple":false,"_required":true},{"_name":"valueAttachment","_choice":"value[x]","_type":"Attachment","_multiple":false,"_required":true},{"_name":"valueCodeableConcept","_choice":"value[x]","_type":"CodeableConcept","_multiple":false,"_required":true},{"_name":"valueCoding","_choice":"value[x]","_type":"Coding","_multiple":false,"_required":true},{"_name":"valueContactPoint","_choice":"value[x]","_type":"ContactPoint","_multiple":false,"_required":true},{"_name":"valueCount","_choice":"value[x]","_type":"Count","_multiple":false,"_required":true},{"_name":"valueDistance","_choice":"value[x]","_type":"Distance","_multiple":false,"_required":true},{"_name":"valueDuration","_choice":"value[x]","_type":"Duration","_multiple":false,"_required":true},{"_name":"valueHumanName","_choice":"value[x]","_type":"HumanName","_multiple":false,"_required":true},{"_name":"valueIdentifier","_choice":"value[x]","_type":"Identifier","_multiple":false,"_required":true},{"_name":"valueMoney","_choice":"value[x]","_type":"Money","_multiple":false,"_required":true},{"_name":"valuePeriod","_choice":"value[x]","_type":"Period","_multiple":false,"_required":true},{"_name":"valueQuantity","_choice":"value[x]","_type":"Quantity","_multiple":false,"_required":true},{"_name":"valueRange","_choice":"value[x]","_type":"Range","_multiple":false,"_required":true},{"_name":"valueRatio","_choice":"value[x]","_type":"Ratio","_multiple":false,"_required":true},{"_name":"valueReference","_choice":"value[x]","_type":"Reference","_multiple":false,"_required":true},{"_name":"valueSampledData","_choice":"value[x]","_type":"SampledData","_multiple":false,"_required":true},{"_name":"valueSignature","_choice":"value[x]","_type":"Signature","_multiple":false,"_required":true},{"_name":"valueTiming","_choice":"value[x]","_type":"Timing","_multiple":false,"_required":true},{"_name":"valueDosage","_choice":"value[x]","_type":"Dosage","_multiple":false,"_required":true},{"_name":"valueContactDetail","_choice":"value[x]","_type":"ContactDetail","_multiple":false,"_required":true},{"_name":"valueContributor","_choice":"value[x]","_type":"Contributor","_multiple":false,"_required":true},{"_name":"valueDataRequirement","_choice":"value[x]","_type":"DataRequirement","_multiple":false,"_required":true},{"_name":"valueParameterDefinition","_choice":"value[x]","_type":"ParameterDefinition","_multiple":false,"_required":true},{"_name":"valueRelatedArtifact","_choice":"value[x]","_type":"RelatedArtifact","_multiple":false,"_required":true},{"_name":"valueTriggerDefinition","_choice":"value[x]","_type":"TriggerDefinition","_multiple":false,"_required":true},{"_name":"valueUsageContext","_choice":"value[x]","_type":"UsageContext","_multiple":false,"_required":true},{"_name":"valueMeta","_choice":"value[x]","_type":"Meta","_multiple":false,"_required":true}]},{"_name":"output","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[]},{"_name":"valueBase64Binary","_choice":"value[x]","_type":"base64Binary","_multiple":false,"_required":true},{"_name":"valueBoolean","_choice":"value[x]","_type":"boolean","_multiple":false,"_required":true},{"_name":"valueCode","_choice":"value[x]","_type":"code","_multiple":false,"_required":true},{"_name":"valueDate","_choice":"value[x]","_type":"date","_multiple":false,"_required":true},{"_name":"valueDateTime","_choice":"value[x]","_type":"dateTime","_multiple":false,"_required":true},{"_name":"valueDecimal","_choice":"value[x]","_type":"decimal","_multiple":false,"_required":true},{"_name":"valueId","_choice":"value[x]","_type":"id","_multiple":false,"_required":true},{"_name":"valueInstant","_choice":"value[x]","_type":"instant","_multiple":false,"_required":true},{"_name":"valueInteger","_choice":"value[x]","_type":"integer","_multiple":false,"_required":true},{"_name":"valueMarkdown","_choice":"value[x]","_type":"markdown","_multiple":false,"_required":true},{"_name":"valueOid","_choice":"value[x]","_type":"oid","_multiple":false,"_required":true},{"_name":"valuePositiveInt","_choice":"value[x]","_type":"positiveInt","_multiple":false,"_required":true},{"_name":"valueString","_choice":"value[x]","_type":"string","_multiple":false,"_required":true},{"_name":"valueTime","_choice":"value[x]","_type":"time","_multiple":false,"_required":true},{"_name":"valueUnsignedInt","_choice":"value[x]","_type":"unsignedInt","_multiple":false,"_required":true},{"_name":"valueUri","_choice":"value[x]","_type":"uri","_multiple":false,"_required":true},{"_name":"valueAddress","_choice":"value[x]","_type":"Address","_multiple":false,"_required":true},{"_name":"valueAge","_choice":"value[x]","_type":"Age","_multiple":false,"_required":true},{"_name":"valueAnnotation","_choice":"value[x]","_type":"Annotation","_multiple":false,"_required":true},{"_name":"valueAttachment","_choice":"value[x]","_type":"Attachment","_multiple":false,"_required":true},{"_name":"valueCodeableConcept","_choice":"value[x]","_type":"CodeableConcept","_multiple":false,"_required":true},{"_name":"valueCoding","_choice":"value[x]","_type":"Coding","_multiple":false,"_required":true},{"_name":"valueContactPoint","_choice":"value[x]","_type":"ContactPoint","_multiple":false,"_required":true},{"_name":"valueCount","_choice":"value[x]","_type":"Count","_multiple":false,"_required":true},{"_name":"valueDistance","_choice":"value[x]","_type":"Distance","_multiple":false,"_required":true},{"_name":"valueDuration","_choice":"value[x]","_type":"Duration","_multiple":false,"_required":true},{"_name":"valueHumanName","_choice":"value[x]","_type":"HumanName","_multiple":false,"_required":true},{"_name":"valueIdentifier","_choice":"value[x]","_type":"Identifier","_multiple":false,"_required":true},{"_name":"valueMoney","_choice":"value[x]","_type":"Money","_multiple":false,"_required":true},{"_name":"valuePeriod","_choice":"value[x]","_type":"Period","_multiple":false,"_required":true},{"_name":"valueQuantity","_choice":"value[x]","_type":"Quantity","_multiple":false,"_required":true},{"_name":"valueRange","_choice":"value[x]","_type":"Range","_multiple":false,"_required":true},{"_name":"valueRatio","_choice":"value[x]","_type":"Ratio","_multiple":false,"_required":true},{"_name":"valueReference","_choice":"value[x]","_type":"Reference","_multiple":false,"_required":true},{"_name":"valueSampledData","_choice":"value[x]","_type":"SampledData","_multiple":false,"_required":true},{"_name":"valueSignature","_choice":"value[x]","_type":"Signature","_multiple":false,"_required":true},{"_name":"valueTiming","_choice":"value[x]","_type":"Timing","_multiple":false,"_required":true},{"_name":"valueDosage","_choice":"value[x]","_type":"Dosage","_multiple":false,"_required":true},{"_name":"valueContactDetail","_choice":"value[x]","_type":"ContactDetail","_multiple":false,"_required":true},{"_name":"valueContributor","_choice":"value[x]","_type":"Contributor","_multiple":false,"_required":true},{"_name":"valueDataRequirement","_choice":"value[x]","_type":"DataRequirement","_multiple":false,"_required":true},{"_name":"valueParameterDefinition","_choice":"value[x]","_type":"ParameterDefinition","_multiple":false,"_required":true},{"_name":"valueRelatedArtifact","_choice":"value[x]","_type":"RelatedArtifact","_multiple":false,"_required":true},{"_name":"valueTriggerDefinition","_choice":"value[x]","_type":"TriggerDefinition","_multiple":false,"_required":true},{"_name":"valueUsageContext","_choice":"value[x]","_type":"UsageContext","_multiple":false,"_required":true},{"_name":"valueMeta","_choice":"value[x]","_type":"Meta","_multiple":false,"_required":true}]}]},"TerminologyCapabilities":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"url","_type":"uri","_multiple":false,"_required":false},{"_name":"version","_type":"string","_multiple":false,"_required":false},{"_name":"name","_type":"string","_multiple":false,"_required":false},{"_name":"title","_type":"string","_multiple":false,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/publication-status","_valueSetStrength":"required"},{"_name":"experimental","_type":"boolean","_multiple":false,"_required":false},{"_name":"date","_type":"dateTime","_multiple":false,"_required":true},{"_name":"publisher","_type":"string","_multiple":false,"_required":false},{"_name":"contact","_type":"ContactDetail","_multiple":true,"_required":false},{"_name":"description","_type":"markdown","_multiple":false,"_required":false},{"_name":"useContext","_type":"UsageContext","_multiple":true,"_required":false},{"_name":"jurisdiction","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/jurisdiction","_valueSetStrength":"extensible"},{"_name":"purpose","_type":"markdown","_multiple":false,"_required":false},{"_name":"copyright","_type":"markdown","_multiple":false,"_required":false},{"_name":"lockedDate","_type":"boolean","_multiple":false,"_required":false},{"_name":"codeSystem","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"uri","_type":"uri","_multiple":false,"_required":false,"_properties":[]},{"_name":"version","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"isDefault","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"compositional","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"language","_type":"code","_multiple":true,"_required":false,"_properties":[]},{"_name":"filter","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"code","_multiple":false,"_required":true,"_properties":[]},{"_name":"op","_type":"code","_multiple":true,"_required":true,"_properties":[]}]},{"_name":"property","_type":"code","_multiple":true,"_required":false,"_properties":[]}]}]},{"_name":"expansion","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"hierarchical","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"paging","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"incomplete","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"definition","_type":"Reference","_multiple":false,"_required":false,"_properties":[]},{"_name":"profile","_type":"Reference","_multiple":true,"_required":false,"_properties":[]},{"_name":"textFilter","_type":"markdown","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"codeSearch","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/code-search-support","_valueSetStrength":"required"},{"_name":"validateCode","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"translations","_type":"boolean","_multiple":false,"_required":true,"_properties":[]}]},{"_name":"translation","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"needsMap","_type":"boolean","_multiple":false,"_required":true,"_properties":[]}]},{"_name":"closure","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"translation","_type":"boolean","_multiple":false,"_required":false,"_properties":[]}]}]},"TestReport":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"name","_type":"string","_multiple":false,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/report-status-codes","_valueSetStrength":"required"},{"_name":"testScript","_type":"Reference","_multiple":false,"_required":true},{"_name":"result","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/report-result-codes","_valueSetStrength":"required"},{"_name":"score","_type":"decimal","_multiple":false,"_required":false},{"_name":"tester","_type":"string","_multiple":false,"_required":false},{"_name":"issued","_type":"dateTime","_multiple":false,"_required":false},{"_name":"participant","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/report-participant-type","_valueSetStrength":"required"},{"_name":"uri","_type":"uri","_multiple":false,"_required":true,"_properties":[]},{"_name":"display","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"setup","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"action","_type":"BackboneElement","_multiple":true,"_required":true,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"operation","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"result","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/report-action-result-codes","_valueSetStrength":"required"},{"_name":"message","_type":"markdown","_multiple":false,"_required":false,"_properties":[]},{"_name":"detail","_type":"uri","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"assert","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"result","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/report-action-result-codes","_valueSetStrength":"required"},{"_name":"message","_type":"markdown","_multiple":false,"_required":false,"_properties":[]},{"_name":"detail","_type":"string","_multiple":false,"_required":false,"_properties":[]}]}]}]},{"_name":"test","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"name","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"action","_type":"BackboneElement","_multiple":true,"_required":true,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"operation","_type":"#TestReport.setup.action.operation","_multiple":false,"_required":false},{"_name":"assert","_type":"#TestReport.setup.action.assert","_multiple":false,"_required":false}]}]},{"_name":"teardown","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"action","_type":"BackboneElement","_multiple":true,"_required":true,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"operation","_type":"#TestReport.setup.action.operation","_multiple":false,"_required":true}]}]}]},"TestScript":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"url","_type":"uri","_multiple":false,"_required":true},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"version","_type":"string","_multiple":false,"_required":false},{"_name":"name","_type":"string","_multiple":false,"_required":true},{"_name":"title","_type":"string","_multiple":false,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/publication-status","_valueSetStrength":"required"},{"_name":"experimental","_type":"boolean","_multiple":false,"_required":false},{"_name":"date","_type":"dateTime","_multiple":false,"_required":false},{"_name":"publisher","_type":"string","_multiple":false,"_required":false},{"_name":"contact","_type":"ContactDetail","_multiple":true,"_required":false},{"_name":"description","_type":"markdown","_multiple":false,"_required":false},{"_name":"useContext","_type":"UsageContext","_multiple":true,"_required":false},{"_name":"jurisdiction","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/jurisdiction","_valueSetStrength":"extensible"},{"_name":"purpose","_type":"markdown","_multiple":false,"_required":false},{"_name":"copyright","_type":"markdown","_multiple":false,"_required":false},{"_name":"origin","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"index","_type":"integer","_multiple":false,"_required":true,"_properties":[]},{"_name":"profile","_type":"Coding","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/testscript-profile-origin-types","_valueSetStrength":"extensible"}]},{"_name":"destination","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"index","_type":"integer","_multiple":false,"_required":true,"_properties":[]},{"_name":"profile","_type":"Coding","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/testscript-profile-destination-types","_valueSetStrength":"extensible"}]},{"_name":"metadata","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"link","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"url","_type":"uri","_multiple":false,"_required":true,"_properties":[]},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"capability","_type":"BackboneElement","_multiple":true,"_required":true,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"required","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"validated","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"origin","_type":"integer","_multiple":true,"_required":false,"_properties":[]},{"_name":"destination","_type":"integer","_multiple":false,"_required":false,"_properties":[]},{"_name":"link","_type":"uri","_multiple":true,"_required":false,"_properties":[]},{"_name":"capabilities","_type":"Reference","_multiple":false,"_required":true,"_properties":[]}]}]},{"_name":"fixture","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"autocreate","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"autodelete","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"resource","_type":"Reference","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"profile","_type":"Reference","_multiple":true,"_required":false},{"_name":"variable","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"name","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"defaultValue","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"expression","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"headerField","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"hint","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"path","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"sourceId","_type":"id","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"rule","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"resource","_type":"Reference","_multiple":false,"_required":true,"_properties":[]},{"_name":"param","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"name","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"value","_type":"string","_multiple":false,"_required":false,"_properties":[]}]}]},{"_name":"ruleset","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"resource","_type":"Reference","_multiple":false,"_required":true,"_properties":[]},{"_name":"rule","_type":"BackboneElement","_multiple":true,"_required":true,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"ruleId","_type":"id","_multiple":false,"_required":true,"_properties":[]},{"_name":"param","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"name","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"value","_type":"string","_multiple":false,"_required":false,"_properties":[]}]}]}]},{"_name":"setup","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"action","_type":"BackboneElement","_multiple":true,"_required":true,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"operation","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"Coding","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/testscript-operation-codes","_valueSetStrength":"extensible"},{"_name":"resource","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/defined-types","_valueSetStrength":"required"},{"_name":"label","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"accept","_type":"code","_multiple":false,"_required":false,"_properties":[]},{"_name":"contentType","_type":"code","_multiple":false,"_required":false,"_properties":[]},{"_name":"destination","_type":"integer","_multiple":false,"_required":false,"_properties":[]},{"_name":"encodeRequestUrl","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"origin","_type":"integer","_multiple":false,"_required":false,"_properties":[]},{"_name":"params","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"requestHeader","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"field","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"value","_type":"string","_multiple":false,"_required":true,"_properties":[]}]},{"_name":"requestId","_type":"id","_multiple":false,"_required":false,"_properties":[]},{"_name":"responseId","_type":"id","_multiple":false,"_required":false,"_properties":[]},{"_name":"sourceId","_type":"id","_multiple":false,"_required":false,"_properties":[]},{"_name":"targetId","_type":"id","_multiple":false,"_required":false,"_properties":[]},{"_name":"url","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"assert","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"label","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"direction","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/assert-direction-codes","_valueSetStrength":"required"},{"_name":"compareToSourceId","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"compareToSourceExpression","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"compareToSourcePath","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"contentType","_type":"code","_multiple":false,"_required":false,"_properties":[]},{"_name":"expression","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"headerField","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"minimumId","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"navigationLinks","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"operator","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/assert-operator-codes","_valueSetStrength":"required"},{"_name":"path","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"requestMethod","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/http-operations","_valueSetStrength":"required"},{"_name":"requestURL","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"resource","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/defined-types","_valueSetStrength":"required"},{"_name":"response","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/assert-response-code-types","_valueSetStrength":"required"},{"_name":"responseCode","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"rule","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"ruleId","_type":"id","_multiple":false,"_required":true,"_properties":[]},{"_name":"param","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"name","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"value","_type":"string","_multiple":false,"_required":true,"_properties":[]}]}]},{"_name":"ruleset","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"rulesetId","_type":"id","_multiple":false,"_required":true,"_properties":[]},{"_name":"rule","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"ruleId","_type":"id","_multiple":false,"_required":true,"_properties":[]},{"_name":"param","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"name","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"value","_type":"string","_multiple":false,"_required":true,"_properties":[]}]}]}]},{"_name":"sourceId","_type":"id","_multiple":false,"_required":false,"_properties":[]},{"_name":"validateProfileId","_type":"id","_multiple":false,"_required":false,"_properties":[]},{"_name":"value","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"warningOnly","_type":"boolean","_multiple":false,"_required":false,"_properties":[]}]}]}]},{"_name":"test","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"name","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"description","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"action","_type":"BackboneElement","_multiple":true,"_required":true,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"operation","_type":"#TestScript.setup.action.operation","_multiple":false,"_required":false},{"_name":"assert","_type":"#TestScript.setup.action.assert","_multiple":false,"_required":false}]}]},{"_name":"teardown","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"action","_type":"BackboneElement","_multiple":true,"_required":true,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"operation","_type":"#TestScript.setup.action.operation","_multiple":false,"_required":true}]}]}]},"UserSession":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false},{"_name":"user","_type":"Reference","_multiple":false},{"_name":"status","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/usersession-status","_valueSetStrength":"required"},{"_name":"source","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/usersession-status-source","_valueSetStrength":"required"}]},{"_name":"workstation","_type":"Identifier","_multiple":false,"_required":false},{"_name":"focus","_type":"Reference","_multiple":true,"_required":false},{"_name":"created","_type":"instant","_multiple":false,"_required":false},{"_name":"expires","_type":"instant","_multiple":false,"_required":false},{"_name":"context","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"type","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"valueCodeableConcept","_choice":"value[x]","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"valueQuantity","_choice":"value[x]","_type":"Quantity","_multiple":false,"_required":false}]}]},"ValueSet":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"url","_type":"uri","_multiple":false,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"version","_type":"string","_multiple":false,"_required":false},{"_name":"name","_type":"string","_multiple":false,"_required":false},{"_name":"title","_type":"string","_multiple":false,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/publication-status","_valueSetStrength":"required"},{"_name":"experimental","_type":"boolean","_multiple":false,"_required":false},{"_name":"date","_type":"dateTime","_multiple":false,"_required":false},{"_name":"publisher","_type":"string","_multiple":false,"_required":false},{"_name":"contact","_type":"ContactDetail","_multiple":true,"_required":false},{"_name":"description","_type":"markdown","_multiple":false,"_required":false},{"_name":"useContext","_type":"UsageContext","_multiple":true,"_required":false},{"_name":"jurisdiction","_type":"CodeableConcept","_multiple":true,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/jurisdiction","_valueSetStrength":"extensible"},{"_name":"immutable","_type":"boolean","_multiple":false,"_required":false},{"_name":"purpose","_type":"markdown","_multiple":false,"_required":false},{"_name":"copyright","_type":"markdown","_multiple":false,"_required":false},{"_name":"extensible","_type":"boolean","_multiple":false,"_required":false},{"_name":"compose","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"lockedDate","_type":"date","_multiple":false,"_required":false,"_properties":[]},{"_name":"inactive","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"include","_type":"BackboneElement","_multiple":true,"_required":true,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"system","_type":"uri","_multiple":false,"_required":false,"_properties":[]},{"_name":"version","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"concept","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"code","_type":"code","_multiple":false,"_required":true,"_properties":[]},{"_name":"display","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"designation","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"use","_type":"Coding","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/designation-use","_valueSetStrength":"extensible"},{"_name":"value","_type":"string","_multiple":false,"_required":true,"_properties":[]}]}]},{"_name":"filter","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"property","_type":"code","_multiple":false,"_required":true,"_properties":[]},{"_name":"op","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/filter-operator","_valueSetStrength":"required"},{"_name":"value","_type":"code","_multiple":false,"_required":true,"_properties":[]}]},{"_name":"valueSet","_type":"uri","_multiple":true,"_required":false,"_properties":[]}]},{"_name":"exclude","_type":"#ValueSet.compose.include","_multiple":true,"_required":false}]},{"_name":"expansion","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"identifier","_type":"uri","_multiple":false,"_required":true,"_properties":[]},{"_name":"timestamp","_type":"dateTime","_multiple":false,"_required":true,"_properties":[]},{"_name":"total","_type":"integer","_multiple":false,"_required":false,"_properties":[]},{"_name":"offset","_type":"integer","_multiple":false,"_required":false,"_properties":[]},{"_name":"parameter","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"name","_type":"string","_multiple":false,"_required":true,"_properties":[]},{"_name":"valueString","_choice":"value[x]","_type":"string","_multiple":false,"_required":false},{"_name":"valueBoolean","_choice":"value[x]","_type":"boolean","_multiple":false,"_required":false},{"_name":"valueInteger","_choice":"value[x]","_type":"integer","_multiple":false,"_required":false},{"_name":"valueDecimal","_choice":"value[x]","_type":"decimal","_multiple":false,"_required":false},{"_name":"valueUri","_choice":"value[x]","_type":"uri","_multiple":false,"_required":false},{"_name":"valueCode","_choice":"value[x]","_type":"code","_multiple":false,"_required":false}]},{"_name":"contains","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"system","_type":"uri","_multiple":false,"_required":false,"_properties":[]},{"_name":"abstract","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"inactive","_type":"boolean","_multiple":false,"_required":false,"_properties":[]},{"_name":"version","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"code","_type":"code","_multiple":false,"_required":false,"_properties":[]},{"_name":"display","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"designation","_type":"#ValueSet.compose.include.concept.designation","_multiple":true,"_required":false},{"_name":"contains","_type":"#ValueSet.expansion.contains","_multiple":true,"_required":false}]}]}]},"VerificationResult":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"target","_type":"Reference","_multiple":true,"_required":false},{"_name":"targetLocation","_type":"string","_multiple":true,"_required":false},{"_name":"need","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/need","_valueSetStrength":"required"},{"_name":"status","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/status","_valueSetStrength":"required"},{"_name":"statusDate","_type":"dateTime","_multiple":false,"_required":true},{"_name":"validationType","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/validation-type","_valueSetStrength":"required"},{"_name":"validationProcess","_type":"CodeableConcept","_multiple":true,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/validation-process","_valueSetStrength":"example"},{"_name":"frequency","_type":"Timing","_multiple":false,"_required":false},{"_name":"lastPerformed","_type":"dateTime","_multiple":false,"_required":false},{"_name":"nextScheduled","_type":"date","_multiple":false,"_required":false},{"_name":"failureAction","_type":"code","_multiple":false,"_required":true,"_valueSet":"http://hl7.org/fhir/ValueSet/failure-action","_valueSetStrength":"required"},{"_name":"primarySource","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false,"_properties":[]},{"_name":"organization","_type":"Reference","_multiple":false,"_required":false,"_properties":[]},{"_name":"type","_type":"CodeableConcept","_multiple":true,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/primary-source-type","_valueSetStrength":"example"},{"_name":"validationProcess","_type":"CodeableConcept","_multiple":true,"_required":true,"_properties":[]},{"_name":"validationStatus","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/validation-status","_valueSetStrength":"required"},{"_name":"validationDate","_type":"dateTime","_multiple":false,"_required":false,"_properties":[]},{"_name":"canPushUpdates","_type":"code","_multiple":false,"_required":true,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/can-push-updates","_valueSetStrength":"required"},{"_name":"pushTypeAvailable","_type":"code","_multiple":true,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/push-type-available","_valueSetStrength":"required"}]},{"_name":"attestation","_type":"BackboneElement","_multiple":false,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"source","_type":"Reference","_multiple":false,"_required":true,"_properties":[]},{"_name":"organization","_type":"Reference","_multiple":false,"_required":true,"_properties":[]},{"_name":"method","_type":"CodeableConcept","_multiple":false,"_required":true,"_properties":[]},{"_name":"date","_type":"date","_multiple":false,"_required":true,"_properties":[]},{"_name":"sourceIdentityCertificate","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"proxyIdentityCertificate","_type":"string","_multiple":false,"_required":false,"_properties":[]}]},{"_name":"validator","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"identifier","_type":"Identifier","_multiple":false,"_required":false,"_properties":[]},{"_name":"organization","_type":"Reference","_multiple":false,"_required":true,"_properties":[]},{"_name":"identityCertificate","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"dateValidated","_type":"date","_multiple":false,"_required":true,"_properties":[]}]}]},"VisionPrescription":{"_type":"Resource","_properties":[{"_name":"id","_type":"id","_multiple":false,"_required":false},{"_name":"meta","_type":"Meta","_multiple":false,"_required":false},{"_name":"implicitRules","_type":"uri","_multiple":false,"_required":false},{"_name":"language","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/languages","_valueSetStrength":"extensible"},{"_name":"text","_type":"Narrative","_multiple":false,"_required":false},{"_name":"contained","_type":"Resource","_multiple":true,"_required":false},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false},{"_name":"identifier","_type":"Identifier","_multiple":true,"_required":false},{"_name":"status","_type":"code","_multiple":false,"_required":false,"_valueSet":"http://hl7.org/fhir/ValueSet/fm-status","_valueSetStrength":"required"},{"_name":"patient","_type":"Reference","_multiple":false,"_required":false},{"_name":"encounter","_type":"Reference","_multiple":false,"_required":false},{"_name":"dateWritten","_type":"dateTime","_multiple":false,"_required":false},{"_name":"prescriber","_type":"Reference","_multiple":false,"_required":false},{"_name":"reasonCodeableConcept","_choice":"reason","_type":"CodeableConcept","_multiple":false,"_required":false},{"_name":"reasonReference","_choice":"reason","_type":"Reference","_multiple":false,"_required":false},{"_name":"dispense","_type":"BackboneElement","_multiple":true,"_required":false,"_properties":[{"_name":"id","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"extension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"modifierExtension","_type":"Extension","_multiple":true,"_required":false,"_properties":[]},{"_name":"product","_type":"CodeableConcept","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/vision-product","_valueSetStrength":"example"},{"_name":"eye","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/vision-eye-codes","_valueSetStrength":"required"},{"_name":"sphere","_type":"decimal","_multiple":false,"_required":false,"_properties":[]},{"_name":"cylinder","_type":"decimal","_multiple":false,"_required":false,"_properties":[]},{"_name":"axis","_type":"integer","_multiple":false,"_required":false,"_properties":[]},{"_name":"prism","_type":"decimal","_multiple":false,"_required":false,"_properties":[]},{"_name":"base","_type":"code","_multiple":false,"_required":false,"_properties":[],"_valueSet":"http://hl7.org/fhir/ValueSet/vision-base-codes","_valueSetStrength":"required"},{"_name":"add","_type":"decimal","_multiple":false,"_required":false,"_properties":[]},{"_name":"power","_type":"decimal","_multiple":false,"_required":false,"_properties":[]},{"_name":"backCurve","_type":"decimal","_multiple":false,"_required":false,"_properties":[]},{"_name":"diameter","_type":"decimal","_multiple":false,"_required":false,"_properties":[]},{"_name":"duration","_type":"Quantity","_multiple":false,"_required":false,"_properties":[]},{"_name":"color","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"brand","_type":"string","_multiple":false,"_required":false,"_properties":[]},{"_name":"note","_type":"Annotation","_multiple":true,"_required":false,"_properties":[]}]}]}}

/***/ }),
/* 17 */
/***/ (function(module, exports) {


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/*jslint node:true */

var xml2js = __webpack_require__(19);
var xml2json = __webpack_require__(44);
var js2xml = __webpack_require__(26);
var json2xml = __webpack_require__(45);

module.exports = {
  xml2js: xml2js,
  xml2json: xml2json,
  js2xml: js2xml,
  json2xml: json2xml
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var sax = __webpack_require__(29);
var expat /*= require('node-expat');*/ = { on: function () { }, parse: function () { } };
var helper = __webpack_require__(14);
var isArray = __webpack_require__(25).isArray;

var options;
var pureJsParser = true;
var currentElement;

function validateOptions(userOptions) {
  options = helper.copyOptions(userOptions);
  helper.ensureFlagExists('ignoreDeclaration', options);
  helper.ensureFlagExists('ignoreInstruction', options);
  helper.ensureFlagExists('ignoreAttributes', options);
  helper.ensureFlagExists('ignoreText', options);
  helper.ensureFlagExists('ignoreComment', options);
  helper.ensureFlagExists('ignoreCdata', options);
  helper.ensureFlagExists('ignoreDoctype', options);
  helper.ensureFlagExists('compact', options);
  helper.ensureFlagExists('alwaysArray', options);
  helper.ensureFlagExists('alwaysChildren', options);
  helper.ensureFlagExists('addParent', options);
  helper.ensureFlagExists('trim', options);
  helper.ensureFlagExists('nativeType', options);
  helper.ensureFlagExists('sanitize', options);
  helper.ensureFlagExists('instructionHasAttributes', options);
  helper.ensureFlagExists('captureSpacesBetweenElements', options);
  helper.ensureKeyExists('declaration', options);
  helper.ensureKeyExists('instruction', options);
  helper.ensureKeyExists('attributes', options);
  helper.ensureKeyExists('text', options);
  helper.ensureKeyExists('comment', options);
  helper.ensureKeyExists('cdata', options);
  helper.ensureKeyExists('doctype', options);
  helper.ensureKeyExists('type', options);
  helper.ensureKeyExists('name', options);
  helper.ensureKeyExists('elements', options);
  helper.ensureKeyExists('parent', options);
  helper.checkFnExists('doctype', options);
  helper.checkFnExists('instruction', options);
  helper.checkFnExists('cdata', options);
  helper.checkFnExists('comment', options);
  helper.checkFnExists('text', options);
  helper.checkFnExists('instructionName', options);
  helper.checkFnExists('elementName', options);
  helper.checkFnExists('attributeName', options);
  helper.checkFnExists('attributeValue', options);
  helper.checkFnExists('attributes', options);
  return options;
}

function nativeType(value) {
  var nValue = Number(value);
  if (!isNaN(nValue)) {
    return nValue;
  }
  var bValue = value.toLowerCase();
  if (bValue === 'true') {
    return true;
  } else if (bValue === 'false') {
    return false;
  }
  return value;
}

function addField(type, value) {
  var key;
  if (options.compact) {
    if (!currentElement[options[type + 'Key']] && options.alwaysArray) {
      currentElement[options[type + 'Key']] = [];
    }
    if (currentElement[options[type + 'Key']] && !isArray(currentElement[options[type + 'Key']])) {
      currentElement[options[type + 'Key']] = [currentElement[options[type + 'Key']]];
    }
    if (type + 'Fn' in options && typeof value === 'string') {
      value = options[type + 'Fn'](value, currentElement);
    }
    if (type === 'instruction' && ('instructionFn' in options || 'instructionNameFn' in options)) {
      for (key in value) {
        if (value.hasOwnProperty(key)) {
          if ('instructionFn' in options) {
            value[key] = options.instructionFn(value[key], key, currentElement);
          } else {
            var temp = value[key];
            delete value[key];
            value[options.instructionNameFn(key, temp, currentElement)] = temp;
          }
        }
      }
    }
    if (isArray(currentElement[options[type + 'Key']])) {
      currentElement[options[type + 'Key']].push(value);
    } else {
      currentElement[options[type + 'Key']] = value;
    }
  } else {
    if (!currentElement[options.elementsKey]) {
      currentElement[options.elementsKey] = [];
    }
    var element = {};
    element[options.typeKey] = type;
    if (type === 'instruction') {
      for (key in value) {
        if (value.hasOwnProperty(key)) {
          break;
        }
      }
      element[options.nameKey] = 'instructionNameFn' in options ? options.instructionNameFn(key, value, currentElement) : key;
      if (options.instructionHasAttributes) {
        element[options.attributesKey] = value[key][options.attributesKey];
        if ('instructionFn' in options) {
          element[options.attributesKey] = options.instructionFn(element[options.attributesKey], key, currentElement);
        }
      } else {
        if ('instructionFn' in options) {
          value[key] = options.instructionFn(value[key], key, currentElement);
        }
        element[options.instructionKey] = value[key];
      }
    } else {
      if (type + 'Fn' in options) {
        value = options[type + 'Fn'](value, currentElement);
      }
      element[options[type + 'Key']] = value;
    }
    if (options.addParent) {
      element[options.parentKey] = currentElement;
    }
    currentElement[options.elementsKey].push(element);
  }
}

function manipulateAttributes(attributes) {
  if ('attributesFn' in options && attributes) {
    attributes = options.attributesFn(attributes, currentElement);
  }
  if ((options.trim || 'attributeValueFn' in options || 'attributeNameFn' in options) && attributes) {
    var key;
    for (key in attributes) {
      if (attributes.hasOwnProperty(key)) {
        if (options.trim) attributes[key] = attributes[key].trim();
        if ('attributeValueFn' in options) attributes[key] = options.attributeValueFn(attributes[key], key, currentElement);
        if ('attributeNameFn' in options) {
          var temp = attributes[key];
          delete attributes[key];
          attributes[options.attributeNameFn(key, attributes[key], currentElement)] = temp;
        }
      }
    }
  }
  return attributes;
}

function onInstruction(instruction) {
  var attributes = {};
  if (instruction.body && (instruction.name.toLowerCase() === 'xml' || options.instructionHasAttributes)) {
    var attrsRegExp = /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|(\w+))\s*/g;
    var match;
    while ((match = attrsRegExp.exec(instruction.body)) !== null) {
      attributes[match[1]] = match[2] || match[3] || match[4];
    }
    attributes = manipulateAttributes(attributes);
  }
  if (instruction.name.toLowerCase() === 'xml') {
    if (options.ignoreDeclaration) {
      return;
    }
    currentElement[options.declarationKey] = {};
    if (Object.keys(attributes).length) {
      currentElement[options.declarationKey][options.attributesKey] = attributes;
    }
    if (options.addParent) {
      currentElement[options.declarationKey][options.parentKey] = currentElement;
    }
  } else {
    if (options.ignoreInstruction) {
      return;
    }
    if (options.trim) {
      instruction.body = instruction.body.trim();
    }
    var value = {};
    if (options.instructionHasAttributes && Object.keys(attributes).length) {
      value[instruction.name] = {};
      value[instruction.name][options.attributesKey] = attributes;
    } else {
      value[instruction.name] = instruction.body;
    }
    addField('instruction', value);
  }
}

function onStartElement(name, attributes) {
  var element;
  if (typeof name === 'object') {
    attributes = name.attributes;
    name = name.name;
  }
  attributes = manipulateAttributes(attributes);
  if ('elementNameFn' in options) {
    name = options.elementNameFn(name, currentElement);
  }
  if (options.compact) {
    element = {};
    if (!options.ignoreAttributes && attributes && Object.keys(attributes).length) {
      element[options.attributesKey] = {};
      var key;
      for (key in attributes) {
        if (attributes.hasOwnProperty(key)) {
          element[options.attributesKey][key] = attributes[key];
        }
      }
    }
    if (!(name in currentElement) && options.alwaysArray) {
      currentElement[name] = [];
    }
    if (currentElement[name] && !isArray(currentElement[name])) {
      currentElement[name] = [currentElement[name]];
    }
    if (isArray(currentElement[name])) {
      currentElement[name].push(element);
    } else {
      currentElement[name] = element;
    }
  } else {
    if (!currentElement[options.elementsKey]) {
      currentElement[options.elementsKey] = [];
    }
    element = {};
    element[options.typeKey] = 'element';
    element[options.nameKey] = name;
    if (!options.ignoreAttributes && attributes && Object.keys(attributes).length) {
      element[options.attributesKey] = attributes;
    }
    if (options.alwaysChildren) {
      element[options.elementsKey] = [];
    }
    currentElement[options.elementsKey].push(element);
  }
  // if (options.addParent) {
    element[options.parentKey] = currentElement;
  // }
  currentElement = element;
}

function onText(text) {
  if (options.ignoreText) {
    return;
  }
  if (!text.trim() && !options.captureSpacesBetweenElements) {
    return;
  }
  if (options.trim) {
    text = text.trim();
  }
  if (options.nativeType) {
    text = nativeType(text);
  }
  if (options.sanitize) {
    text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  addField('text', text);
}

function onComment(comment) {
  if (options.ignoreComment) {
    return;
  }
  if (options.trim) {
    comment = comment.trim();
  }
  addField('comment', comment);
}

function onEndElement(name) {
  var parentElement = currentElement[options.parentKey];
  if (!options.addParent) {
    delete currentElement[options.parentKey];
  }
  currentElement = parentElement;
}

function onCdata(cdata) {
  if (options.ignoreCdata) {
    return;
  }
  if (options.trim) {
    cdata = cdata.trim();
  }
  addField('cdata', cdata);
}

function onDoctype(doctype) {
  if (options.ignoreDoctype) {
    return;
  }
  doctype = doctype.replace(/^ /, '');
  if (options.trim) {
    doctype = doctype.trim();
  }
  addField('doctype', doctype);
}

function onError(error) {
  error.note = error; //console.error(error);
}

module.exports = function (xml, userOptions) {

  var parser = pureJsParser ? sax.parser(true, {}) : parser = new expat.Parser('UTF-8');
  var result = {};
  currentElement = result;

  options = validateOptions(userOptions);

  if (pureJsParser) {
    parser.onopentag = onStartElement;
    parser.ontext = onText;
    parser.oncomment = onComment;
    parser.onclosetag = onEndElement;
    parser.onerror = onError;
    parser.oncdata = onCdata;
    parser.ondoctype = onDoctype;
    parser.onprocessinginstruction = onInstruction;
  } else {
    parser.on('startElement', onStartElement);
    parser.on('text', onText);
    parser.on('comment', onComment);
    parser.on('endElement', onEndElement);
    parser.on('error', onError);
    //parser.on('startCdata', onStartCdata);
    //parser.on('endCdata', onEndCdata);
    //parser.on('entityDecl', onEntityDecl);
  }

  if (pureJsParser) {
    parser.write(xml).close();
  } else {
    if (!parser.parse(xml)) {
      throw new Error('XML parsing error: ' + parser.getError());
    }
  }

  if (result[options.elementsKey]) {
    var temp = result[options.elementsKey];
    delete result[options.elementsKey];
    result[options.elementsKey] = temp;
    delete result.text;
  }

  return result;

};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



/*<replacement>*/

var processNextTick = __webpack_require__(7);
/*</replacement>*/

module.exports = Readable;

/*<replacement>*/
var isArray = __webpack_require__(20);
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = __webpack_require__(10).EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(22);
/*</replacement>*/

// TODO(bmeurer): Change this back to const once hole checks are
// properly optimized away early in Ignition+TurboFan.
/*<replacement>*/
var Buffer = __webpack_require__(8).Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*</replacement>*/

/*<replacement>*/
var util = __webpack_require__(3);
util.inherits = __webpack_require__(4);
/*</replacement>*/

/*<replacement>*/
var debugUtil = __webpack_require__(34);
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = __webpack_require__(35);
var destroyImpl = __webpack_require__(23);
var StringDecoder;

util.inherits(Readable, Stream);

var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') {
    return emitter.prependListener(event, fn);
  } else {
    // This is a hack to make sure that our error handler is attached before any
    // userland ones.  NEVER DO THIS. This is here only because this code needs
    // to continue to work with older versions of Node.js that do not include
    // the prependListener() method. The goal is to eventually remove this hack.
    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
  }
}

function ReadableState(options, stream) {
  Duplex = Duplex || __webpack_require__(0);

  options = options || {};

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // has it been destroyed
  this.destroyed = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = __webpack_require__(13).StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || __webpack_require__(0);

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined) {
      return false;
    }
    return this._readableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
  }
});

Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function (err, cb) {
  this.push(null);
  cb(err);
};

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;
      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }
      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  var state = stream._readableState;
  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit('error', er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        stream.emit('error', new Error('stream.push() after EOF'));
      } else {
        state.reading = false;
        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
    }
  }

  return needMoreData(state);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    stream.emit('data', chunk);
    stream.read(0);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

    if (state.needReadable) emitReadable(stream);
  }
  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;
  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = __webpack_require__(13).StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) processNextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    processNextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) processNextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');
    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = { hasUnpiped: false };

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, unpipeInfo);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this, unpipeInfo);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        processNextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    processNextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = self.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], self.emit.bind(self, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    processNextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(6)))

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10).EventEmitter;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*<replacement>*/

var processNextTick = __webpack_require__(7);
/*</replacement>*/

// undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
      processNextTick(emitErrorNT, this, err);
    }
    return;
  }

  // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks

  if (this._readableState) {
    this._readableState.destroyed = true;
  }

  // if this is a duplex stream mark the writable part as destroyed as well
  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      processNextTick(emitErrorNT, _this, err);
      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err);
    }
  });
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF

//
//
//
//
//