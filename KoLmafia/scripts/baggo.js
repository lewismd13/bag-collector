/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 9292:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(1646);

module.exports = parent;

/***/ }),

/***/ 8469:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(9101);

__webpack_require__(8938);

var entryUnbind = __webpack_require__(7592);

module.exports = entryUnbind('Array', 'flat');

/***/ }),

/***/ 2580:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* unused reexport */ __webpack_require__(9791);

/***/ }),

/***/ 9791:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(9292);

module.exports = parent;

/***/ }),

/***/ 5618:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(1438);

var tryToString = __webpack_require__(1881);

var $TypeError = TypeError; // `Assert: IsCallable(argument) is true`

module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw $TypeError(tryToString(argument) + ' is not a function');
};

/***/ }),

/***/ 7331:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(7457);

var create = __webpack_require__(5131);

var defineProperty = (__webpack_require__(811).f);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype; // Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

if (ArrayPrototype[UNSCOPABLES] == undefined) {
  defineProperty(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
} // add a key to Array.prototype[@@unscopables]


module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

/***/ }),

/***/ 3739:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(2949);

var $String = String;
var $TypeError = TypeError; // `Assert: Type(argument) is Object`

module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw $TypeError($String(argument) + ' is not an object');
};

/***/ }),

/***/ 477:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIndexedObject = __webpack_require__(6211);

var toAbsoluteIndex = __webpack_require__(8786);

var lengthOfArrayLike = __webpack_require__(1563); // `Array.prototype.{ indexOf, includes }` methods implementation


var createMethod = function createMethod(IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value; // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check

    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++]; // eslint-disable-next-line no-self-compare -- NaN check

      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    }
    return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

/***/ }),

/***/ 5350:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isArray = __webpack_require__(1746);

var isConstructor = __webpack_require__(3579);

var isObject = __webpack_require__(2949);

var wellKnownSymbol = __webpack_require__(7457);

var SPECIES = wellKnownSymbol('species');
var $Array = Array; // a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate

module.exports = function (originalArray) {
  var C;

  if (isArray(originalArray)) {
    C = originalArray.constructor; // cross-realm fallback

    if (isConstructor(C) && (C === $Array || isArray(C.prototype))) C = undefined;else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  }

  return C === undefined ? $Array : C;
};

/***/ }),

/***/ 586:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arraySpeciesConstructor = __webpack_require__(5350); // `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate


module.exports = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};

/***/ }),

/***/ 6202:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(1824);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};

/***/ }),

/***/ 5830:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var TO_STRING_TAG_SUPPORT = __webpack_require__(4657);

var isCallable = __webpack_require__(1438);

var classofRaw = __webpack_require__(6202);

var wellKnownSymbol = __webpack_require__(7457);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object; // ES3 wrong here

var CORRECT_ARGUMENTS = classofRaw(function () {
  return arguments;
}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

var tryGet = function tryGet(it, key) {
  try {
    return it[key];
  } catch (error) {
    /* empty */
  }
}; // getting tag from ES6+ `Object.prototype.toString`


module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
  : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag // builtinTag case
  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
  : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};

/***/ }),

/***/ 3780:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hasOwn = __webpack_require__(6957);

var ownKeys = __webpack_require__(6813);

var getOwnPropertyDescriptorModule = __webpack_require__(9609);

var definePropertyModule = __webpack_require__(811);

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];

    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

/***/ }),

/***/ 4059:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(2171);

var definePropertyModule = __webpack_require__(811);

var createPropertyDescriptor = __webpack_require__(3300);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

/***/ }),

/***/ 3300:
/***/ ((module) => {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

/***/ }),

/***/ 812:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var toPropertyKey = __webpack_require__(1247);

var definePropertyModule = __webpack_require__(811);

var createPropertyDescriptor = __webpack_require__(3300);

module.exports = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));else object[propertyKey] = value;
};

/***/ }),

/***/ 6899:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(1438);

var definePropertyModule = __webpack_require__(811);

var makeBuiltIn = __webpack_require__(1221);

var defineGlobalProperty = __webpack_require__(9443);

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);

  if (options.global) {
    if (simple) O[key] = value;else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];else if (O[key]) simple = true;
    } catch (error) {
      /* empty */
    }

    if (simple) O[key] = value;else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  }

  return O;
};

/***/ }),

/***/ 9443:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(2328); // eslint-disable-next-line es-x/no-object-defineproperty -- safe


var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, {
      value: value,
      configurable: true,
      writable: true
    });
  } catch (error) {
    global[key] = value;
  }

  return value;
};

/***/ }),

/***/ 2171:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(8901); // Detect IE8's incomplete defineProperty implementation


module.exports = !fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, {
    get: function get() {
      return 7;
    }
  })[1] != 7;
});

/***/ }),

/***/ 4603:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(2328);

var isObject = __webpack_require__(2949);

var document = global.document; // typeof document.createElement is 'object' in old IE

var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};

/***/ }),

/***/ 4879:
/***/ ((module) => {

var $TypeError = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

module.exports = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
  return it;
};

/***/ }),

/***/ 5096:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(1575);

module.exports = getBuiltIn('navigator', 'userAgent') || '';

/***/ }),

/***/ 2912:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(2328);

var userAgent = __webpack_require__(5096);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.'); // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us

  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
} // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0


if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);

  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;

/***/ }),

/***/ 7592:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(2328);

var uncurryThis = __webpack_require__(1824);

module.exports = function (CONSTRUCTOR, METHOD) {
  return uncurryThis(global[CONSTRUCTOR].prototype[METHOD]);
};

/***/ }),

/***/ 393:
/***/ ((module) => {

// IE8- don't enum bug keys
module.exports = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

/***/ }),

/***/ 9004:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(2328);

var getOwnPropertyDescriptor = (__webpack_require__(9609).f);

var createNonEnumerableProperty = __webpack_require__(4059);

var defineBuiltIn = __webpack_require__(6899);

var defineGlobalProperty = __webpack_require__(9443);

var copyConstructorProperties = __webpack_require__(3780);

var isForced = __webpack_require__(2612);
/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/


module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;

  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }

  if (target) for (key in source) {
    sourceProperty = source[key];

    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];

    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    } // add a flag to not completely full polyfills


    if (options.sham || targetProperty && targetProperty.sham) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }

    defineBuiltIn(target, key, sourceProperty, options);
  }
};

/***/ }),

/***/ 8901:
/***/ ((module) => {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

/***/ }),

/***/ 8529:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isArray = __webpack_require__(1746);

var lengthOfArrayLike = __webpack_require__(1563);

var doesNotExceedSafeInteger = __webpack_require__(4879);

var bind = __webpack_require__(1871); // `FlattenIntoArray` abstract operation
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray


var flattenIntoArray = function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? bind(mapper, thisArg) : false;
  var element, elementLen;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      if (depth > 0 && isArray(element)) {
        elementLen = lengthOfArrayLike(element);
        targetIndex = flattenIntoArray(target, original, element, elementLen, targetIndex, depth - 1) - 1;
      } else {
        doesNotExceedSafeInteger(targetIndex + 1);
        target[targetIndex] = element;
      }

      targetIndex++;
    }

    sourceIndex++;
  }

  return targetIndex;
};

module.exports = flattenIntoArray;

/***/ }),

/***/ 1871:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(1824);

var aCallable = __webpack_require__(5618);

var NATIVE_BIND = __webpack_require__(708);

var bind = uncurryThis(uncurryThis.bind); // optional / simple context binding

module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function () {
    return fn.apply(that, arguments);
  };
};

/***/ }),

/***/ 708:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(8901);

module.exports = !fails(function () {
  // eslint-disable-next-line es-x/no-function-prototype-bind -- safe
  var test = function () {
    /* empty */
  }.bind(); // eslint-disable-next-line no-prototype-builtins -- safe


  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

/***/ }),

/***/ 8435:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_BIND = __webpack_require__(708);

var call = Function.prototype.call;
module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};

/***/ }),

/***/ 9411:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(2171);

var hasOwn = __webpack_require__(6957);

var FunctionPrototype = Function.prototype; // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe

var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;
var EXISTS = hasOwn(FunctionPrototype, 'name'); // additional protection from minified / mangled / dropped function names

var PROPER = EXISTS && function something() {
  /* empty */
}.name === 'something';

var CONFIGURABLE = EXISTS && (!DESCRIPTORS || DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable);
module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

/***/ }),

/***/ 1824:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_BIND = __webpack_require__(708);

var FunctionPrototype = Function.prototype;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;
var uncurryThis = NATIVE_BIND && bind.bind(call, call);
module.exports = NATIVE_BIND ? function (fn) {
  return fn && uncurryThis(fn);
} : function (fn) {
  return fn && function () {
    return call.apply(fn, arguments);
  };
};

/***/ }),

/***/ 1575:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(2328);

var isCallable = __webpack_require__(1438);

var aFunction = function aFunction(argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};

/***/ }),

/***/ 1072:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(5830);

var getMethod = __webpack_require__(2670);

var isNullOrUndefined = __webpack_require__(2294);

var Iterators = __webpack_require__(9759);

var wellKnownSymbol = __webpack_require__(7457);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (!isNullOrUndefined(it)) return getMethod(it, ITERATOR) || getMethod(it, '@@iterator') || Iterators[classof(it)];
};

/***/ }),

/***/ 8134:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(8435);

var aCallable = __webpack_require__(5618);

var anObject = __webpack_require__(3739);

var tryToString = __webpack_require__(1881);

var getIteratorMethod = __webpack_require__(1072);

var $TypeError = TypeError;

module.exports = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
  throw $TypeError(tryToString(argument) + ' is not iterable');
};

/***/ }),

/***/ 2670:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var aCallable = __webpack_require__(5618);

var isNullOrUndefined = __webpack_require__(2294); // `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod


module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};

/***/ }),

/***/ 2328:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var check = function check(it) {
  return it && it.Math == Math && it;
}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


module.exports = // eslint-disable-next-line es-x/no-global-this -- safe
check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
check(typeof self == 'object' && self) || check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) || // eslint-disable-next-line no-new-func -- fallback
function () {
  return this;
}() || Function('return this')();

/***/ }),

/***/ 6957:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(1824);

var toObject = __webpack_require__(6068);

var hasOwnProperty = uncurryThis({}.hasOwnProperty); // `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es-x/no-object-hasown -- safe

module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};

/***/ }),

/***/ 1055:
/***/ ((module) => {

module.exports = {};

/***/ }),

/***/ 4861:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(1575);

module.exports = getBuiltIn('document', 'documentElement');

/***/ }),

/***/ 2674:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(2171);

var fails = __webpack_require__(8901);

var createElement = __webpack_require__(4603); // Thanks to IE8 for its funny defineProperty


module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function get() {
      return 7;
    }
  }).a != 7;
});

/***/ }),

/***/ 8483:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(1824);

var fails = __webpack_require__(8901);

var classof = __webpack_require__(6202);

var $Object = Object;
var split = uncurryThis(''.split); // fallback for non-array-like ES3 and non-enumerable old V8 strings

module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : $Object(it);
} : $Object;

/***/ }),

/***/ 7599:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(1824);

var isCallable = __webpack_require__(1438);

var store = __webpack_require__(5153);

var functionToString = uncurryThis(Function.toString); // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;

/***/ }),

/***/ 4081:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_WEAK_MAP = __webpack_require__(1520);

var global = __webpack_require__(2328);

var uncurryThis = __webpack_require__(1824);

var isObject = __webpack_require__(2949);

var createNonEnumerableProperty = __webpack_require__(4059);

var hasOwn = __webpack_require__(6957);

var shared = __webpack_require__(5153);

var sharedKey = __webpack_require__(1449);

var hiddenKeys = __webpack_require__(1055);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function enforce(it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function getterFor(TYPE) {
  return function (it) {
    var state;

    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    }

    return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = uncurryThis(store.get);
  var wmhas = uncurryThis(store.has);
  var wmset = uncurryThis(store.set);

  set = function set(it, metadata) {
    if (wmhas(store, it)) throw TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };

  get = function get(it) {
    return wmget(store, it) || {};
  };

  has = function has(it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;

  set = function set(it, metadata) {
    if (hasOwn(it, STATE)) throw TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };

  get = function get(it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };

  has = function has(it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

/***/ }),

/***/ 8110:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(7457);

var Iterators = __webpack_require__(9759);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype; // check on default Array iterator

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

/***/ }),

/***/ 1746:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(6202); // `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es-x/no-array-isarray -- safe


module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) == 'Array';
};

/***/ }),

/***/ 1438:
/***/ ((module) => {

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = function (argument) {
  return typeof argument == 'function';
};

/***/ }),

/***/ 3579:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(1824);

var fails = __webpack_require__(8901);

var isCallable = __webpack_require__(1438);

var classof = __webpack_require__(5830);

var getBuiltIn = __webpack_require__(1575);

var inspectSource = __webpack_require__(7599);

var noop = function noop() {
  /* empty */
};

var empty = [];
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable(argument)) return false;

  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable(argument)) return false;

  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction':
      return false;
  }

  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true; // `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor

module.exports = !construct || fails(function () {
  var called;
  return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function () {
    called = true;
  }) || called;
}) ? isConstructorLegacy : isConstructorModern;

/***/ }),

/***/ 2612:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(8901);

var isCallable = __webpack_require__(1438);

var replacement = /#|\.prototype\./;

var isForced = function isForced(feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : isCallable(detection) ? fails(detection) : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';
module.exports = isForced;

/***/ }),

/***/ 2294:
/***/ ((module) => {

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};

/***/ }),

/***/ 2949:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(1438);

var documentAll = typeof document == 'object' && document.all; // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot

var SPECIAL_DOCUMENT_ALL = typeof documentAll == 'undefined' && documentAll !== undefined;
module.exports = SPECIAL_DOCUMENT_ALL ? function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it) || it === documentAll;
} : function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};

/***/ }),

/***/ 6719:
/***/ ((module) => {

module.exports = false;

/***/ }),

/***/ 5634:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(1575);

var isCallable = __webpack_require__(1438);

var isPrototypeOf = __webpack_require__(3547);

var USE_SYMBOL_AS_UID = __webpack_require__(4719);

var $Object = Object;
module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};

/***/ }),

/***/ 6449:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var bind = __webpack_require__(1871);

var call = __webpack_require__(8435);

var anObject = __webpack_require__(3739);

var tryToString = __webpack_require__(1881);

var isArrayIteratorMethod = __webpack_require__(8110);

var lengthOfArrayLike = __webpack_require__(1563);

var isPrototypeOf = __webpack_require__(3547);

var getIterator = __webpack_require__(8134);

var getIteratorMethod = __webpack_require__(1072);

var iteratorClose = __webpack_require__(6535);

var $TypeError = TypeError;

var Result = function Result(stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_RECORD = !!(options && options.IS_RECORD);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function stop(condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function callFn(value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    }

    return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_RECORD) {
    iterator = iterable.iterator;
  } else if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn) throw $TypeError(tryToString(iterable) + ' is not iterable'); // optimisation for array iterators

    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf(ResultPrototype, result)) return result;
      }

      return new Result(false);
    }

    iterator = getIterator(iterable, iterFn);
  }

  next = IS_RECORD ? iterable.next : iterator.next;

  while (!(step = call(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }

    if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
  }

  return new Result(false);
};

/***/ }),

/***/ 6535:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(8435);

var anObject = __webpack_require__(3739);

var getMethod = __webpack_require__(2670);

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);

  try {
    innerResult = getMethod(iterator, 'return');

    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }

    innerResult = call(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }

  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};

/***/ }),

/***/ 9759:
/***/ ((module) => {

module.exports = {};

/***/ }),

/***/ 1563:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toLength = __webpack_require__(588); // `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike


module.exports = function (obj) {
  return toLength(obj.length);
};

/***/ }),

/***/ 1221:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(8901);

var isCallable = __webpack_require__(1438);

var hasOwn = __webpack_require__(6957);

var DESCRIPTORS = __webpack_require__(2171);

var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(9411).CONFIGURABLE);

var inspectSource = __webpack_require__(7599);

var InternalStateModule = __webpack_require__(4081);

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get; // eslint-disable-next-line es-x/no-object-defineproperty -- safe

var defineProperty = Object.defineProperty;
var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () {
    /* empty */
  }, 'length', {
    value: 8
  }).length !== 8;
});
var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (String(name).slice(0, 7) === 'Symbol(') {
    name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
  }

  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;

  if (!hasOwn(value, 'name') || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
    if (DESCRIPTORS) defineProperty(value, 'name', {
      value: name,
      configurable: true
    });else value.name = name;
  }

  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', {
      value: options.arity
    });
  }

  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', {
        writable: false
      }); // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) {
    /* empty */
  }

  var state = enforceInternalState(value);

  if (!hasOwn(state, 'source')) {
    state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
  }

  return value;
}; // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required


Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');

/***/ }),

/***/ 988:
/***/ ((module) => {

var ceil = Math.ceil;
var floor = Math.floor; // `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es-x/no-math-trunc -- safe

module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};

/***/ }),

/***/ 5131:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(3739);

var definePropertiesModule = __webpack_require__(422);

var enumBugKeys = __webpack_require__(393);

var hiddenKeys = __webpack_require__(1055);

var html = __webpack_require__(4861);

var documentCreateElement = __webpack_require__(4603);

var sharedKey = __webpack_require__(1449);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function EmptyConstructor() {
  /* empty */
};

var scriptTag = function scriptTag(content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
}; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype


var NullProtoObjectViaActiveX = function NullProtoObjectViaActiveX(activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak

  return temp;
}; // Create object with fake `null` prototype: use iframe Object with cleared prototype


var NullProtoObjectViaIFrame = function NullProtoObjectViaIFrame() {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475

  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
}; // Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug


var activeXDocument;

var _NullProtoObject = function NullProtoObject() {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) {
    /* ignore */
  }

  _NullProtoObject = typeof document != 'undefined' ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) // old IE
  : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument); // WSH

  var length = enumBugKeys.length;

  while (length--) {
    delete _NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  }

  return _NullProtoObject();
};

hiddenKeys[IE_PROTO] = true; // `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es-x/no-object-create -- safe

module.exports = Object.create || function create(O, Properties) {
  var result;

  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

    result[IE_PROTO] = O;
  } else result = _NullProtoObject();

  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};

/***/ }),

/***/ 422:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(2171);

var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(882);

var definePropertyModule = __webpack_require__(811);

var anObject = __webpack_require__(3739);

var toIndexedObject = __webpack_require__(6211);

var objectKeys = __webpack_require__(669); // `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es-x/no-object-defineproperties -- safe


exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;

  while (length > index) {
    definePropertyModule.f(O, key = keys[index++], props[key]);
  }

  return O;
};

/***/ }),

/***/ 811:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(2171);

var IE8_DOM_DEFINE = __webpack_require__(2674);

var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(882);

var anObject = __webpack_require__(3739);

var toPropertyKey = __webpack_require__(1247);

var $TypeError = TypeError; // eslint-disable-next-line es-x/no-object-defineproperty -- safe

var $defineProperty = Object.defineProperty; // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe

var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable'; // `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty

exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);

  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);

    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  }

  return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) {
    /* empty */
  }
  if ('get' in Attributes || 'set' in Attributes) throw $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

/***/ }),

/***/ 9609:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(2171);

var call = __webpack_require__(8435);

var propertyIsEnumerableModule = __webpack_require__(7395);

var createPropertyDescriptor = __webpack_require__(3300);

var toIndexedObject = __webpack_require__(6211);

var toPropertyKey = __webpack_require__(1247);

var hasOwn = __webpack_require__(6957);

var IE8_DOM_DEFINE = __webpack_require__(2674); // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe


var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) {
    /* empty */
  }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};

/***/ }),

/***/ 5166:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(4085);

var enumBugKeys = __webpack_require__(393);

var hiddenKeys = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es-x/no-object-getownpropertynames -- safe

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

/***/ }),

/***/ 5863:
/***/ ((__unused_webpack_module, exports) => {

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;

/***/ }),

/***/ 3547:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(1824);

module.exports = uncurryThis({}.isPrototypeOf);

/***/ }),

/***/ 4085:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(1824);

var hasOwn = __webpack_require__(6957);

var toIndexedObject = __webpack_require__(6211);

var indexOf = (__webpack_require__(477).indexOf);

var hiddenKeys = __webpack_require__(1055);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;

  for (key in O) {
    !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  } // Don't enum bug & hidden keys


  while (names.length > i) {
    if (hasOwn(O, key = names[i++])) {
      ~indexOf(result, key) || push(result, key);
    }
  }

  return result;
};

/***/ }),

/***/ 669:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(4085);

var enumBugKeys = __webpack_require__(393); // `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es-x/no-object-keys -- safe


module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};

/***/ }),

/***/ 7395:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


var $propertyIsEnumerable = {}.propertyIsEnumerable; // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe

var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({
  1: 2
}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable

exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

/***/ }),

/***/ 8256:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(2171);

var uncurryThis = __webpack_require__(1824);

var objectKeys = __webpack_require__(669);

var toIndexedObject = __webpack_require__(6211);

var $propertyIsEnumerable = (__webpack_require__(7395).f);

var propertyIsEnumerable = uncurryThis($propertyIsEnumerable);
var push = uncurryThis([].push); // `Object.{ entries, values }` methods implementation

var createMethod = function createMethod(TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject(it);
    var keys = objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;

    while (length > i) {
      key = keys[i++];

      if (!DESCRIPTORS || propertyIsEnumerable(O, key)) {
        push(result, TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }

    return result;
  };
};

module.exports = {
  // `Object.entries` method
  // https://tc39.es/ecma262/#sec-object.entries
  entries: createMethod(true),
  // `Object.values` method
  // https://tc39.es/ecma262/#sec-object.values
  values: createMethod(false)
};

/***/ }),

/***/ 6482:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(8435);

var isCallable = __webpack_require__(1438);

var isObject = __webpack_require__(2949);

var $TypeError = TypeError; // `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive

module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw $TypeError("Can't convert object to primitive value");
};

/***/ }),

/***/ 6813:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(1575);

var uncurryThis = __webpack_require__(1824);

var getOwnPropertyNamesModule = __webpack_require__(5166);

var getOwnPropertySymbolsModule = __webpack_require__(5863);

var anObject = __webpack_require__(3739);

var concat = uncurryThis([].concat); // all object keys, includes non-enumerable and symbols

module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};

/***/ }),

/***/ 4682:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isNullOrUndefined = __webpack_require__(2294);

var $TypeError = TypeError; // `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible

module.exports = function (it) {
  if (isNullOrUndefined(it)) throw $TypeError("Can't call method on " + it);
  return it;
};

/***/ }),

/***/ 1449:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var shared = __webpack_require__(8849);

var uid = __webpack_require__(858);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

/***/ }),

/***/ 5153:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(2328);

var defineGlobalProperty = __webpack_require__(9443);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || defineGlobalProperty(SHARED, {});
module.exports = store;

/***/ }),

/***/ 8849:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var IS_PURE = __webpack_require__(6719);

var store = __webpack_require__(5153);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.25.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.25.1/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});

/***/ }),

/***/ 7825:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es-x/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(2912);

var fails = __webpack_require__(8901); // eslint-disable-next-line es-x/no-object-getownpropertysymbols -- required for testing


module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol(); // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances

  return !String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
  !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

/***/ }),

/***/ 8786:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIntegerOrInfinity = __webpack_require__(7278);

var max = Math.max;
var min = Math.min; // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

/***/ }),

/***/ 6211:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(8483);

var requireObjectCoercible = __webpack_require__(4682);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};

/***/ }),

/***/ 7278:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var trunc = __webpack_require__(988); // `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity


module.exports = function (argument) {
  var number = +argument; // eslint-disable-next-line no-self-compare -- NaN check

  return number !== number || number === 0 ? 0 : trunc(number);
};

/***/ }),

/***/ 588:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIntegerOrInfinity = __webpack_require__(7278);

var min = Math.min; // `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength

module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

/***/ }),

/***/ 6068:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var requireObjectCoercible = __webpack_require__(4682);

var $Object = Object; // `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject

module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};

/***/ }),

/***/ 4375:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(8435);

var isObject = __webpack_require__(2949);

var isSymbol = __webpack_require__(5634);

var getMethod = __webpack_require__(2670);

var ordinaryToPrimitive = __webpack_require__(6482);

var wellKnownSymbol = __webpack_require__(7457);

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive'); // `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive

module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;

  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw $TypeError("Can't convert object to primitive value");
  }

  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

/***/ }),

/***/ 1247:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPrimitive = __webpack_require__(4375);

var isSymbol = __webpack_require__(5634); // `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey


module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};

/***/ }),

/***/ 4657:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(7457);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};
test[TO_STRING_TAG] = 'z';
module.exports = String(test) === '[object z]';

/***/ }),

/***/ 1881:
/***/ ((module) => {

var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};

/***/ }),

/***/ 858:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(1824);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};

/***/ }),

/***/ 4719:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es-x/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(7825);

module.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == 'symbol';

/***/ }),

/***/ 882:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(2171);

var fails = __webpack_require__(8901); // V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334


module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () {
    /* empty */
  }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});

/***/ }),

/***/ 1520:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(2328);

var isCallable = __webpack_require__(1438);

var WeakMap = global.WeakMap;
module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));

/***/ }),

/***/ 7457:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(2328);

var shared = __webpack_require__(8849);

var hasOwn = __webpack_require__(6957);

var uid = __webpack_require__(858);

var NATIVE_SYMBOL = __webpack_require__(7825);

var USE_SYMBOL_AS_UID = __webpack_require__(4719);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var symbolFor = Symbol && Symbol['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;

    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  }

  return WellKnownSymbolsStore[name];
};

/***/ }),

/***/ 9101:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var $ = __webpack_require__(9004);

var flattenIntoArray = __webpack_require__(8529);

var toObject = __webpack_require__(6068);

var lengthOfArrayLike = __webpack_require__(1563);

var toIntegerOrInfinity = __webpack_require__(7278);

var arraySpeciesCreate = __webpack_require__(586); // `Array.prototype.flat` method
// https://tc39.es/ecma262/#sec-array.prototype.flat


$({
  target: 'Array',
  proto: true
}, {
  flat: function flat() {
    var depthArg = arguments.length ? arguments[0] : undefined;
    var O = toObject(this);
    var sourceLen = lengthOfArrayLike(O);
    var A = arraySpeciesCreate(O, 0);
    A.length = flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toIntegerOrInfinity(depthArg));
    return A;
  }
});

/***/ }),

/***/ 8938:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// this method was added to unscopables after implementation
// in popular engines, so it's moved to a separate module
var addToUnscopables = __webpack_require__(7331); // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables


addToUnscopables('flat');

/***/ }),

/***/ 4875:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(9004);

var $entries = (__webpack_require__(8256).entries); // `Object.entries` method
// https://tc39.es/ecma262/#sec-object.entries


$({
  target: 'Object',
  stat: true
}, {
  entries: function entries(O) {
    return $entries(O);
  }
});

/***/ }),

/***/ 8819:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(9004);

var iterate = __webpack_require__(6449);

var createProperty = __webpack_require__(812); // `Object.fromEntries` method
// https://github.com/tc39/proposal-object-from-entries


$({
  target: 'Object',
  stat: true
}, {
  fromEntries: function fromEntries(iterable) {
    var obj = {};
    iterate(iterable, function (k, v) {
      createProperty(obj, k, v);
    }, {
      AS_ENTRIES: true
    });
    return obj;
  }
});

/***/ }),

/***/ 2231:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(9004);

var $values = (__webpack_require__(8256).values); // `Object.values` method
// https://tc39.es/ecma262/#sec-object.values


$({
  target: 'Object',
  stat: true
}, {
  values: function values(O) {
    return $values(O);
  }
});

/***/ }),

/***/ 1646:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(8469);

module.exports = parent;

/***/ }),

/***/ 9940:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(3203),
    root = __webpack_require__(4362);
/* Built-in method references that are verified to be native. */


var DataView = getNative(root, 'DataView');
module.exports = DataView;

/***/ }),

/***/ 1979:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hashClear = __webpack_require__(9129),
    hashDelete = __webpack_require__(9047),
    hashGet = __webpack_require__(3486),
    hashHas = __webpack_require__(4786),
    hashSet = __webpack_require__(6444);
/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */


function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
} // Add methods to `Hash`.


Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
module.exports = Hash;

/***/ }),

/***/ 2768:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var listCacheClear = __webpack_require__(3708),
    listCacheDelete = __webpack_require__(6993),
    listCacheGet = __webpack_require__(286),
    listCacheHas = __webpack_require__(1678),
    listCacheSet = __webpack_require__(9743);
/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */


function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
} // Add methods to `ListCache`.


ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
module.exports = ListCache;

/***/ }),

/***/ 4804:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(3203),
    root = __webpack_require__(4362);
/* Built-in method references that are verified to be native. */


var Map = getNative(root, 'Map');
module.exports = Map;

/***/ }),

/***/ 8423:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var mapCacheClear = __webpack_require__(6977),
    mapCacheDelete = __webpack_require__(7474),
    mapCacheGet = __webpack_require__(727),
    mapCacheHas = __webpack_require__(3653),
    mapCacheSet = __webpack_require__(6140);
/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */


function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
} // Add methods to `MapCache`.


MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
module.exports = MapCache;

/***/ }),

/***/ 7114:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(3203),
    root = __webpack_require__(4362);
/* Built-in method references that are verified to be native. */


var Promise = getNative(root, 'Promise');
module.exports = Promise;

/***/ }),

/***/ 689:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(3203),
    root = __webpack_require__(4362);
/* Built-in method references that are verified to be native. */


var Set = getNative(root, 'Set');
module.exports = Set;

/***/ }),

/***/ 9832:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var MapCache = __webpack_require__(8423),
    setCacheAdd = __webpack_require__(9911),
    setCacheHas = __webpack_require__(7447);
/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */


function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;
  this.__data__ = new MapCache();

  while (++index < length) {
    this.add(values[index]);
  }
} // Add methods to `SetCache`.


SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;
module.exports = SetCache;

/***/ }),

/***/ 959:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ListCache = __webpack_require__(2768),
    stackClear = __webpack_require__(7553),
    stackDelete = __webpack_require__(6038),
    stackGet = __webpack_require__(2397),
    stackHas = __webpack_require__(2421),
    stackSet = __webpack_require__(2936);
/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */


function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
} // Add methods to `Stack`.


Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
module.exports = Stack;

/***/ }),

/***/ 2773:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(4362);
/** Built-in value references. */


var Symbol = root.Symbol;
module.exports = Symbol;

/***/ }),

/***/ 2496:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(4362);
/** Built-in value references. */


var Uint8Array = root.Uint8Array;
module.exports = Uint8Array;

/***/ }),

/***/ 5284:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(3203),
    root = __webpack_require__(4362);
/* Built-in method references that are verified to be native. */


var WeakMap = getNative(root, 'WeakMap');
module.exports = WeakMap;

/***/ }),

/***/ 6523:
/***/ ((module) => {

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];

    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }

  return result;
}

module.exports = arrayFilter;

/***/ }),

/***/ 8083:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseTimes = __webpack_require__(5094),
    isArguments = __webpack_require__(9246),
    isArray = __webpack_require__(3670),
    isBuffer = __webpack_require__(2343),
    isIndex = __webpack_require__(4782),
    isTypedArray = __webpack_require__(1589);
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */

function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && ( // Safari 9 has enumerable `arguments.length` in strict mode.
    key == 'length' || isBuff && (key == 'offset' || key == 'parent') || isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') || // Skip index properties.
    isIndex(key, length)))) {
      result.push(key);
    }
  }

  return result;
}

module.exports = arrayLikeKeys;

/***/ }),

/***/ 8421:
/***/ ((module) => {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }

  return array;
}

module.exports = arrayPush;

/***/ }),

/***/ 4481:
/***/ ((module) => {

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }

  return false;
}

module.exports = arraySome;

/***/ }),

/***/ 6213:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var eq = __webpack_require__(7950);
/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */


function assocIndexOf(array, key) {
  var length = array.length;

  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }

  return -1;
}

module.exports = assocIndexOf;

/***/ }),

/***/ 891:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayPush = __webpack_require__(8421),
    isArray = __webpack_require__(3670);
/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */


function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;

/***/ }),

/***/ 1185:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(2773),
    getRawTag = __webpack_require__(3888),
    objectToString = __webpack_require__(2299);
/** `Object#toString` result references. */


var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';
/** Built-in value references. */

var symToStringTag = Symbol ? Symbol.toStringTag : undefined;
/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */

function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }

  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}

module.exports = baseGetTag;

/***/ }),

/***/ 1075:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(1185),
    isObjectLike = __webpack_require__(4939);
/** `Object#toString` result references. */


var argsTag = '[object Arguments]';
/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */

function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;

/***/ }),

/***/ 9856:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsEqualDeep = __webpack_require__(1829),
    isObjectLike = __webpack_require__(4939);
/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */


function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }

  if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
    return value !== value && other !== other;
  }

  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

module.exports = baseIsEqual;

/***/ }),

/***/ 1829:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Stack = __webpack_require__(959),
    equalArrays = __webpack_require__(3426),
    equalByTag = __webpack_require__(1402),
    equalObjects = __webpack_require__(4572),
    getTag = __webpack_require__(2417),
    isArray = __webpack_require__(3670),
    isBuffer = __webpack_require__(2343),
    isTypedArray = __webpack_require__(1589);
/** Used to compose bitmasks for value comparisons. */


var COMPARE_PARTIAL_FLAG = 1;
/** `Object#toString` result references. */

var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';
/** Used for built-in method references. */

var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */

function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);
  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;
  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }

    objIsArr = true;
    objIsObj = false;
  }

  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack());
    return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }

  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new Stack());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }

  if (!isSameTag) {
    return false;
  }

  stack || (stack = new Stack());
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

module.exports = baseIsEqualDeep;

/***/ }),

/***/ 4106:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isFunction = __webpack_require__(3626),
    isMasked = __webpack_require__(9249),
    isObject = __webpack_require__(71),
    toSource = __webpack_require__(1214);
/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */


var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
/** Used to detect host constructors (Safari). */

var reIsHostCtor = /^\[object .+?Constructor\]$/;
/** Used for built-in method references. */

var funcProto = Function.prototype,
    objectProto = Object.prototype;
/** Used to resolve the decompiled source of functions. */

var funcToString = funcProto.toString;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/** Used to detect if a method is native. */

var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */

function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }

  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;

/***/ }),

/***/ 3638:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(1185),
    isLength = __webpack_require__(7100),
    isObjectLike = __webpack_require__(4939);
/** `Object#toString` result references. */


var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';
var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';
/** Used to identify `toStringTag` values of typed arrays. */

var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */

function baseIsTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;

/***/ }),

/***/ 7521:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isPrototype = __webpack_require__(2803),
    nativeKeys = __webpack_require__(3865);
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */

function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }

  var result = [];

  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }

  return result;
}

module.exports = baseKeys;

/***/ }),

/***/ 5094:
/***/ ((module) => {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }

  return result;
}

module.exports = baseTimes;

/***/ }),

/***/ 9081:
/***/ ((module) => {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function (value) {
    return func(value);
  };
}

module.exports = baseUnary;

/***/ }),

/***/ 3159:
/***/ ((module) => {

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

module.exports = cacheHas;

/***/ }),

/***/ 1741:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(4362);
/** Used to detect overreaching core-js shims. */


var coreJsData = root['__core-js_shared__'];
module.exports = coreJsData;

/***/ }),

/***/ 3426:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var SetCache = __webpack_require__(9832),
    arraySome = __webpack_require__(4481),
    cacheHas = __webpack_require__(3159);
/** Used to compose bitmasks for value comparisons. */


var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;
/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */

function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  } // Check that cyclic values are equal.


  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);

  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }

  var index = -1,
      result = true,
      seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined;
  stack.set(array, other);
  stack.set(other, array); // Ignore non-index properties.

  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
    }

    if (compared !== undefined) {
      if (compared) {
        continue;
      }

      result = false;
      break;
    } // Recursively compare arrays (susceptible to call stack limits).


    if (seen) {
      if (!arraySome(other, function (othValue, othIndex) {
        if (!cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }

  stack['delete'](array);
  stack['delete'](other);
  return result;
}

module.exports = equalArrays;

/***/ }),

/***/ 1402:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(2773),
    Uint8Array = __webpack_require__(2496),
    eq = __webpack_require__(7950),
    equalArrays = __webpack_require__(3426),
    mapToArray = __webpack_require__(8961),
    setToArray = __webpack_require__(6983);
/** Used to compose bitmasks for value comparisons. */


var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;
/** `Object#toString` result references. */

var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';
var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';
/** Used to convert symbols to primitives and strings. */

var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */

function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }

      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }

      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == other + '';

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      } // Assume cyclic values are equal.


      var stacked = stack.get(object);

      if (stacked) {
        return stacked == other;
      }

      bitmask |= COMPARE_UNORDERED_FLAG; // Recursively compare objects (susceptible to call stack limits).

      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }

  }

  return false;
}

module.exports = equalByTag;

/***/ }),

/***/ 4572:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getAllKeys = __webpack_require__(5788);
/** Used to compose bitmasks for value comparisons. */


var COMPARE_PARTIAL_FLAG = 1;
/** Used for built-in method references. */

var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */

function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }

  var index = objLength;

  while (index--) {
    var key = objProps[index];

    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  } // Check that cyclic values are equal.


  var objStacked = stack.get(object);
  var othStacked = stack.get(other);

  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }

  var result = true;
  stack.set(object, other);
  stack.set(other, object);
  var skipCtor = isPartial;

  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    } // Recursively compare objects (susceptible to call stack limits).


    if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }

    skipCtor || (skipCtor = key == 'constructor');
  }

  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor; // Non `Object` object instances with different constructors are not equal.

    if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }

  stack['delete'](object);
  stack['delete'](other);
  return result;
}

module.exports = equalObjects;

/***/ }),

/***/ 8556:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;
module.exports = freeGlobal;

/***/ }),

/***/ 5788:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetAllKeys = __webpack_require__(891),
    getSymbols = __webpack_require__(7976),
    keys = __webpack_require__(3225);
/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */


function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;

/***/ }),

/***/ 404:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isKeyable = __webpack_require__(4480);
/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */


function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}

module.exports = getMapData;

/***/ }),

/***/ 3203:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsNative = __webpack_require__(4106),
    getValue = __webpack_require__(7338);
/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */


function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;

/***/ }),

/***/ 3888:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(2773);
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString = objectProto.toString;
/** Built-in value references. */

var symToStringTag = Symbol ? Symbol.toStringTag : undefined;
/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */

function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);

  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }

  return result;
}

module.exports = getRawTag;

/***/ }),

/***/ 7976:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayFilter = __webpack_require__(6523),
    stubArray = __webpack_require__(4043);
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Built-in value references. */

var propertyIsEnumerable = objectProto.propertyIsEnumerable;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeGetSymbols = Object.getOwnPropertySymbols;
/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */

var getSymbols = !nativeGetSymbols ? stubArray : function (object) {
  if (object == null) {
    return [];
  }

  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function (symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
module.exports = getSymbols;

/***/ }),

/***/ 2417:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DataView = __webpack_require__(9940),
    Map = __webpack_require__(4804),
    Promise = __webpack_require__(7114),
    Set = __webpack_require__(689),
    WeakMap = __webpack_require__(5284),
    baseGetTag = __webpack_require__(1185),
    toSource = __webpack_require__(1214);
/** `Object#toString` result references. */


var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';
var dataViewTag = '[object DataView]';
/** Used to detect maps, sets, and weakmaps. */

var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);
/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */

var getTag = baseGetTag; // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.

if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
  getTag = function getTag(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag;

        case mapCtorString:
          return mapTag;

        case promiseCtorString:
          return promiseTag;

        case setCtorString:
          return setTag;

        case weakMapCtorString:
          return weakMapTag;
      }
    }

    return result;
  };
}

module.exports = getTag;

/***/ }),

/***/ 7338:
/***/ ((module) => {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;

/***/ }),

/***/ 9129:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var nativeCreate = __webpack_require__(6326);
/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */


function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;

/***/ }),

/***/ 9047:
/***/ ((module) => {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;

/***/ }),

/***/ 3486:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var nativeCreate = __webpack_require__(6326);
/** Used to stand-in for `undefined` hash values. */


var HASH_UNDEFINED = '__lodash_hash_undefined__';
/** Used for built-in method references. */

var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */

function hashGet(key) {
  var data = this.__data__;

  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }

  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;

/***/ }),

/***/ 4786:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var nativeCreate = __webpack_require__(6326);
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

module.exports = hashHas;

/***/ }),

/***/ 6444:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var nativeCreate = __webpack_require__(6326);
/** Used to stand-in for `undefined` hash values. */


var HASH_UNDEFINED = '__lodash_hash_undefined__';
/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */

function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;

/***/ }),

/***/ 4782:
/***/ ((module) => {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;
/** Used to detect unsigned integer values. */

var reIsUint = /^(?:0|[1-9]\d*)$/;
/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */

function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (type == 'number' || type != 'symbol' && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

/***/ }),

/***/ 4480:
/***/ ((module) => {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}

module.exports = isKeyable;

/***/ }),

/***/ 9249:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var coreJsData = __webpack_require__(1741);
/** Used to detect methods masquerading as native. */


var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();
/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */


function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}

module.exports = isMasked;

/***/ }),

/***/ 2803:
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;
/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */

function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;
  return value === proto;
}

module.exports = isPrototype;

/***/ }),

/***/ 3708:
/***/ ((module) => {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;

/***/ }),

/***/ 6993:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assocIndexOf = __webpack_require__(6213);
/** Used for built-in method references. */


var arrayProto = Array.prototype;
/** Built-in value references. */

var splice = arrayProto.splice;
/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }

  var lastIndex = data.length - 1;

  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }

  --this.size;
  return true;
}

module.exports = listCacheDelete;

/***/ }),

/***/ 286:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assocIndexOf = __webpack_require__(6213);
/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);
  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;

/***/ }),

/***/ 1678:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assocIndexOf = __webpack_require__(6213);
/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;

/***/ }),

/***/ 9743:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assocIndexOf = __webpack_require__(6213);
/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */


function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }

  return this;
}

module.exports = listCacheSet;

/***/ }),

/***/ 6977:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Hash = __webpack_require__(1979),
    ListCache = __webpack_require__(2768),
    Map = __webpack_require__(4804);
/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */


function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash(),
    'map': new (Map || ListCache)(),
    'string': new Hash()
  };
}

module.exports = mapCacheClear;

/***/ }),

/***/ 7474:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getMapData = __webpack_require__(404);
/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */


function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;

/***/ }),

/***/ 727:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getMapData = __webpack_require__(404);
/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;

/***/ }),

/***/ 3653:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getMapData = __webpack_require__(404);
/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;

/***/ }),

/***/ 6140:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getMapData = __webpack_require__(404);
/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */


function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;

/***/ }),

/***/ 8961:
/***/ ((module) => {

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);
  map.forEach(function (value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;

/***/ }),

/***/ 6326:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(3203);
/* Built-in method references that are verified to be native. */


var nativeCreate = getNative(Object, 'create');
module.exports = nativeCreate;

/***/ }),

/***/ 3865:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var overArg = __webpack_require__(5290);
/* Built-in method references for those with the same name as other `lodash` methods. */


var nativeKeys = overArg(Object.keys, Object);
module.exports = nativeKeys;

/***/ }),

/***/ 1985:
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var freeGlobal = __webpack_require__(8556);
/** Detect free variable `exports`. */


var freeExports =  true && exports && !exports.nodeType && exports;
/** Detect free variable `module`. */

var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;
/** Detect the popular CommonJS extension `module.exports`. */

var moduleExports = freeModule && freeModule.exports === freeExports;
/** Detect free variable `process` from Node.js. */

var freeProcess = moduleExports && freeGlobal.process;
/** Used to access faster Node.js helpers. */

var nodeUtil = function () {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    } // Legacy `process.binding('util')` for Node.js < 10.


    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}();

module.exports = nodeUtil;

/***/ }),

/***/ 2299:
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString = objectProto.toString;
/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */

function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

/***/ }),

/***/ 5290:
/***/ ((module) => {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;

/***/ }),

/***/ 4362:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var freeGlobal = __webpack_require__(8556);
/** Detect free variable `self`. */


var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */

var root = freeGlobal || freeSelf || Function('return this')();
module.exports = root;

/***/ }),

/***/ 9911:
/***/ ((module) => {

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';
/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */

function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);

  return this;
}

module.exports = setCacheAdd;

/***/ }),

/***/ 7447:
/***/ ((module) => {

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;

/***/ }),

/***/ 6983:
/***/ ((module) => {

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);
  set.forEach(function (value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;

/***/ }),

/***/ 7553:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ListCache = __webpack_require__(2768);
/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */


function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}

module.exports = stackClear;

/***/ }),

/***/ 6038:
/***/ ((module) => {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);
  this.size = data.size;
  return result;
}

module.exports = stackDelete;

/***/ }),

/***/ 2397:
/***/ ((module) => {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;

/***/ }),

/***/ 2421:
/***/ ((module) => {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;

/***/ }),

/***/ 2936:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ListCache = __webpack_require__(2768),
    Map = __webpack_require__(4804),
    MapCache = __webpack_require__(8423);
/** Used as the size to enable large array optimizations. */


var LARGE_ARRAY_SIZE = 200;
/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */

function stackSet(key, value) {
  var data = this.__data__;

  if (data instanceof ListCache) {
    var pairs = data.__data__;

    if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }

    data = this.__data__ = new MapCache(pairs);
  }

  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;

/***/ }),

/***/ 1214:
/***/ ((module) => {

/** Used for built-in method references. */
var funcProto = Function.prototype;
/** Used to resolve the decompiled source of functions. */

var funcToString = funcProto.toString;
/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */

function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}

    try {
      return func + '';
    } catch (e) {}
  }

  return '';
}

module.exports = toSource;

/***/ }),

/***/ 7950:
/***/ ((module) => {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || value !== value && other !== other;
}

module.exports = eq;

/***/ }),

/***/ 9246:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsArguments = __webpack_require__(1075),
    isObjectLike = __webpack_require__(4939);
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/** Built-in value references. */

var propertyIsEnumerable = objectProto.propertyIsEnumerable;
/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */

var isArguments = baseIsArguments(function () {
  return arguments;
}()) ? baseIsArguments : function (value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
};
module.exports = isArguments;

/***/ }),

/***/ 3670:
/***/ ((module) => {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;
module.exports = isArray;

/***/ }),

/***/ 6175:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isFunction = __webpack_require__(3626),
    isLength = __webpack_require__(7100);
/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */


function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;

/***/ }),

/***/ 2343:
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var root = __webpack_require__(4362),
    stubFalse = __webpack_require__(3444);
/** Detect free variable `exports`. */


var freeExports =  true && exports && !exports.nodeType && exports;
/** Detect free variable `module`. */

var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;
/** Detect the popular CommonJS extension `module.exports`. */

var moduleExports = freeModule && freeModule.exports === freeExports;
/** Built-in value references. */

var Buffer = moduleExports ? root.Buffer : undefined;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;
/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */

var isBuffer = nativeIsBuffer || stubFalse;
module.exports = isBuffer;

/***/ }),

/***/ 7120:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsEqual = __webpack_require__(9856);
/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */


function isEqual(value, other) {
  return baseIsEqual(value, other);
}

module.exports = isEqual;

/***/ }),

/***/ 3626:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(1185),
    isObject = __webpack_require__(71);
/** `Object#toString` result references. */


var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */

function isFunction(value) {
  if (!isObject(value)) {
    return false;
  } // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.


  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;

/***/ }),

/***/ 7100:
/***/ ((module) => {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;
/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */

function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

/***/ }),

/***/ 71:
/***/ ((module) => {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

/***/ }),

/***/ 4939:
/***/ ((module) => {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

/***/ }),

/***/ 1589:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsTypedArray = __webpack_require__(3638),
    baseUnary = __webpack_require__(9081),
    nodeUtil = __webpack_require__(1985);
/* Node.js helper references. */


var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */

var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
module.exports = isTypedArray;

/***/ }),

/***/ 3225:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeKeys = __webpack_require__(8083),
    baseKeys = __webpack_require__(7521),
    isArrayLike = __webpack_require__(6175);
/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */


function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;

/***/ }),

/***/ 4043:
/***/ ((module) => {

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;

/***/ }),

/***/ 3444:
/***/ ((module) => {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "adventures": () => (/* binding */ adventures),
  "args": () => (/* binding */ args),
  "main": () => (/* binding */ main),
  "turncount": () => (/* binding */ turncount),
  "turnsRemaining": () => (/* binding */ turnsRemaining)
});

;// CONCATENATED MODULE: external "kolmafia"
const external_kolmafia_namespaceObject = require("kolmafia");
// EXTERNAL MODULE: ./node_modules/libram/node_modules/core-js/modules/es.object.entries.js
var es_object_entries = __webpack_require__(4875);
// EXTERNAL MODULE: ./node_modules/libram/node_modules/core-js/modules/es.object.from-entries.js
var es_object_from_entries = __webpack_require__(8819);
;// CONCATENATED MODULE: ./node_modules/libram/dist/propertyTypes.js
/** THIS FILE IS AUTOMATICALLY GENERATED. See tools/parseDefaultProperties.ts for more information */
var booleanProperties = ["abortOnChoiceWhenNotInChoice", "addChatCommandLine", "addCreationQueue", "addStatusBarToFrames", "allowCloseableDesktopTabs", "allowNegativeTally", "allowNonMoodBurning", "allowSummonBurning", "autoHighlightOnFocus", "broadcastEvents", "cacheMallSearches", "chatBeep", "chatLinksUseRelay", "compactChessboard", "copyAsHTML", "customizedTabs", "debugBuy", "debugConsequences", "debugFoxtrotRemoval", "debugPathnames", "gapProtection", "gitInstallDependencies", "gitShowCommitMessages", "gitUpdateOnLogin", "greenScreenProtection", "guiUsesOneWindow", "hideServerDebugText", "logAcquiredItems", "logBattleAction", "logBrowserInteractions", "logChatMessages", "logChatRequests", "logCleanedHTML", "logDecoratedResponses", "logFamiliarActions", "logGainMessages", "logReadableHTML", "logPreferenceChange", "logMonsterHealth", "logReverseOrder", "logStatGains", "logStatusEffects", "logStatusOnLogin", "macroDebug", "macroLens", "mementoListActive", "mergeHobopolisChat", "printStackOnAbort", "proxySet", "relayAddSounds", "relayAddsCustomCombat", "relayAddsDiscoHelper", "relayAddsGraphicalCLI", "relayAddsQuickScripts", "relayAddsRestoreLinks", "relayAddsUpArrowLinks", "relayAddsUseLinks", "relayAddsWikiLinks", "relayAllowRemoteAccess", "relayBrowserOnly", "relayCacheUncacheable", "relayFormatsChatText", "relayHidesJunkMallItems", "relayMaintainsEffects", "relayMaintainsHealth", "relayMaintainsMana", "relayOverridesImages", "relayRunsAfterAdventureScript", "relayRunsBeforeBattleScript", "relayRunsBeforePVPScript", "relayScriptButtonFirst", "relayTextualizesEffects", "relayTrimsZapList", "relayUsesInlineLinks", "relayUsesIntegratedChat", "relayWarnOnRecoverFailure", "removeMalignantEffects", "saveSettingsOnSet", "sharePriceData", "showAllRequests", "showExceptionalRequests", "stealthLogin", "svnInstallDependencies", "svnShowCommitMessages", "svnUpdateOnLogin", "switchEquipmentForBuffs", "syncAfterSvnUpdate", "useChatToolbar", "useContactsFrame", "useDevProxyServer", "useDockIconBadge", "useHugglerChannel", "useImageCache", "useLastUserAgent", "useSystemTrayIcon", "useTabbedChatFrame", "useToolbars", "useCachedVolcanoMaps", "useZoneComboBox", "verboseSpeakeasy", "verboseFloundry", "wrapLongLines", "_gitUpdated", "_svnRepoFileFetched", "_svnUpdated", "antagonisticSnowmanKitAvailable", "arcadeGameHints", "armoryUnlocked", "autoForbidIgnoringStores", "autoCraft", "autoQuest", "autoEntangle", "autoGarish", "autoManaRestore", "autoFillMayoMinder", "autoPinkyRing", "autoPlantHardcore", "autoPlantSoftcore", "autoPotionID", "autoRepairBoxServants", "autoSatisfyWithCloset", "autoSatisfyWithCoinmasters", "autoSatisfyWithMall", "autoSatisfyWithNPCs", "autoSatisfyWithStash", "autoSatisfyWithStorage", "autoSetConditions", "autoSteal", "autoTuxedo", "backupCameraReverserEnabled", "badMoonEncounter01", "badMoonEncounter02", "badMoonEncounter03", "badMoonEncounter04", "badMoonEncounter05", "badMoonEncounter06", "badMoonEncounter07", "badMoonEncounter08", "badMoonEncounter09", "badMoonEncounter10", "badMoonEncounter11", "badMoonEncounter12", "badMoonEncounter13", "badMoonEncounter14", "badMoonEncounter15", "badMoonEncounter16", "badMoonEncounter17", "badMoonEncounter18", "badMoonEncounter19", "badMoonEncounter20", "badMoonEncounter21", "badMoonEncounter22", "badMoonEncounter23", "badMoonEncounter24", "badMoonEncounter25", "badMoonEncounter26", "badMoonEncounter27", "badMoonEncounter28", "badMoonEncounter29", "badMoonEncounter30", "badMoonEncounter31", "badMoonEncounter32", "badMoonEncounter33", "badMoonEncounter34", "badMoonEncounter35", "badMoonEncounter36", "badMoonEncounter37", "badMoonEncounter38", "badMoonEncounter39", "badMoonEncounter40", "badMoonEncounter41", "badMoonEncounter42", "badMoonEncounter43", "badMoonEncounter44", "badMoonEncounter45", "badMoonEncounter46", "badMoonEncounter47", "badMoonEncounter48", "barrelShrineUnlocked", "bigBrotherRescued", "blackBartsBootyAvailable", "bondAdv", "bondBeach", "bondBeat", "bondBooze", "bondBridge", "bondDesert", "bondDR", "bondDrunk1", "bondDrunk2", "bondHoney", "bondHP", "bondInit", "bondItem1", "bondItem2", "bondItem3", "bondJetpack", "bondMartiniDelivery", "bondMartiniPlus", "bondMartiniTurn", "bondMeat", "bondMox1", "bondMox2", "bondMPregen", "bondMus1", "bondMus2", "bondMys1", "bondMys2", "bondSpleen", "bondStat", "bondStat2", "bondStealth", "bondStealth2", "bondSymbols", "bondWar", "bondWeapon2", "bondWpn", "booPeakLit", "bootsCharged", "breakfastCompleted", "burrowgrubHiveUsed", "calzoneOfLegendEaten", "canteenUnlocked", "chaosButterflyThrown", "chatbotScriptExecuted", "chateauAvailable", "chatLiterate", "chatServesUpdates", "checkJackassHardcore", "checkJackassSoftcore", "clanAttacksEnabled", "coldAirportAlways", "considerShadowNoodles", "controlRoomUnlock", "concertVisited", "controlPanel1", "controlPanel2", "controlPanel3", "controlPanel4", "controlPanel5", "controlPanel6", "controlPanel7", "controlPanel8", "controlPanel9", "corralUnlocked", "dailyDungeonDone", "dampOldBootPurchased", "daycareOpen", "deepDishOfLegendEaten", "demonSummoned", "dinseyAudienceEngagement", "dinseyGarbagePirate", "dinseyRapidPassEnabled", "dinseyRollercoasterNext", "dinseySafetyProtocolsLoose", "doghouseBoarded", "dontStopForCounters", "drippingHallUnlocked", "drippyShieldUnlocked", "edUsedLash", "eldritchFissureAvailable", "eldritchHorrorAvailable", "essenceOfAnnoyanceAvailable", "essenceOfBearAvailable", "expressCardUsed", "falloutShelterChronoUsed", "falloutShelterCoolingTankUsed", "fireExtinguisherBatHoleUsed", "fireExtinguisherChasmUsed", "fireExtinguisherCyrptUsed", "fireExtinguisherDesertUsed", "fireExtinguisherHaremUsed", "fistTeachingsHaikuDungeon", "fistTeachingsPokerRoom", "fistTeachingsBarroomBrawl", "fistTeachingsConservatory", "fistTeachingsBatHole", "fistTeachingsFunHouse", "fistTeachingsMenagerie", "fistTeachingsSlums", "fistTeachingsFratHouse", "fistTeachingsRoad", "fistTeachingsNinjaSnowmen", "flickeringPixel1", "flickeringPixel2", "flickeringPixel3", "flickeringPixel4", "flickeringPixel5", "flickeringPixel6", "flickeringPixel7", "flickeringPixel8", "frAlways", "frCemetaryUnlocked", "friarsBlessingReceived", "frMountainsUnlocked", "frSwampUnlocked", "frVillageUnlocked", "frWoodUnlocked", "getawayCampsiteUnlocked", "ghostPencil1", "ghostPencil2", "ghostPencil3", "ghostPencil4", "ghostPencil5", "ghostPencil6", "ghostPencil7", "ghostPencil8", "ghostPencil9", "gingerAdvanceClockUnlocked", "gingerBlackmailAccomplished", "gingerbreadCityAvailable", "gingerExtraAdventures", "gingerNegativesDropped", "gingerSewersUnlocked", "gingerSubwayLineUnlocked", "gingerRetailUnlocked", "glitchItemAvailable", "grabCloversHardcore", "grabCloversSoftcore", "guideToSafariAvailable", "guyMadeOfBeesDefeated", "hallowienerDefiledNook", "hallowienerGuanoJunction", "hallowienerKnollGym", "hallowienerMadnessBakery", "hallowienerMiddleChamber", "hallowienerOvergrownLot", "hallowienerSkeletonStore", "hallowienerSmutOrcs", "hallowienerSonofaBeach", "hallowienerVolcoino", "hardcorePVPWarning", "harvestBatteriesHardcore", "harvestBatteriesSoftcore", "hasAutumnaton", "hasBartender", "hasChef", "hasCocktailKit", "hasCosmicBowlingBall", "hasDetectiveSchool", "hasMaydayContract", "hasOven", "hasRange", "hasShaker", "hasSushiMat", "haveBoxingDaydreamHardcore", "haveBoxingDaydreamSoftcore", "hermitHax0red", "holidayHalsBookAvailable", "horseryAvailable", "hotAirportAlways", "implementGlitchItem", "intenseCurrents", "itemBoughtPerAscension637", "itemBoughtPerAscension8266", "itemBoughtPerAscension10790", "itemBoughtPerAscension10794", "itemBoughtPerAscension10795", "itemBoughtPerCharacter6423", "itemBoughtPerCharacter6428", "itemBoughtPerCharacter6429", "kingLiberated", "lastPirateInsult1", "lastPirateInsult2", "lastPirateInsult3", "lastPirateInsult4", "lastPirateInsult5", "lastPirateInsult6", "lastPirateInsult7", "lastPirateInsult8", "lawOfAveragesAvailable", "leafletCompleted", "libraryCardUsed", "lockPicked", "logBastilleBattalionBattles", "loginRecoveryHardcore", "loginRecoverySoftcore", "lovebugsUnlocked", "loveTunnelAvailable", "lowerChamberUnlock", "madnessBakeryAvailable", "makePocketWishesHardcore", "makePocketWishesSoftcore", "manualOfNumberologyAvailable", "mappingMonsters", "mapToAnemoneMinePurchased", "mapToKokomoAvailable", "mapToMadnessReefPurchased", "mapToTheDiveBarPurchased", "mapToTheMarinaraTrenchPurchased", "mapToTheSkateParkPurchased", "maraisBeaverUnlock", "maraisCorpseUnlock", "maraisDarkUnlock", "maraisVillageUnlock", "maraisWildlifeUnlock", "maraisWizardUnlock", "maximizerAlwaysCurrent", "maximizerCreateOnHand", "maximizerCurrentMallPrices", "maximizerFoldables", "maximizerIncludeAll", "maximizerNoAdventures", "middleChamberUnlock", "milkOfMagnesiumActive", "moonTuned", "neverendingPartyAlways", "odeBuffbotCheck", "oilPeakLit", "oscusSodaUsed", "outrageousSombreroUsed", "overgrownLotAvailable", "ownsSpeakeasy", "pathedSummonsHardcore", "pathedSummonsSoftcore", "pizzaOfLegendEaten", "popularTartUnlocked", "potatoAlarmClockUsed", "prAlways", "prayedForGlamour", "prayedForProtection", "prayedForVigor", "primaryLabCheerCoreGrabbed", "pyramidBombUsed", "ROMOfOptimalityAvailable", "rageGlandVented", "readManualHardcore", "readManualSoftcore", "relayShowSpoilers", "relayShowWarnings", "rememberDesktopSize", "restUsingChateau", "restUsingCampAwayTent", "requireBoxServants", "requireSewerTestItems", "safePickpocket", "schoolOfHardKnocksDiplomaAvailable", "scriptCascadingMenus", "serverAddsCustomCombat", "SHAWARMAInitiativeUnlocked", "showForbiddenStores", "showGainsPerUnit", "showIgnoringStorePrices", "showNoSummonOnly", "showTurnFreeOnly", "skeletonStoreAvailable", "sleazeAirportAlways", "snojoAvailable", "sortByRoom", "spacegateAlways", "spacegateVaccine1", "spacegateVaccine2", "spacegateVaccine3", "spaceInvaderDefeated", "spelunkyHints", "spiceMelangeUsed", "spookyAirportAlways", "stenchAirportAlways", "stopForFixedWanderer", "stopForUltraRare", "styxPixieVisited", "suppressInappropriateNags", "suppressPowerPixellation", "suppressMallPriceCacheMessages", "telegraphOfficeAvailable", "telescopeLookedHigh", "timeTowerAvailable", "trackLightsOut", "uneffectWithHotTub", "universalSeasoningActive", "universalSeasoningAvailable", "useBookOfEverySkillHardcore", "useBookOfEverySkillSoftcore", "useCrimboToysHardcore", "useCrimboToysSoftcore", "verboseMaximizer", "visitLoungeHardcore", "visitLoungeSoftcore", "visitRumpusHardcore", "visitRumpusSoftcore", "voteAlways", "wildfireBarrelCaulked", "wildfireDusted", "wildfireFracked", "wildfirePumpGreased", "wildfireSprinkled", "yearbookCameraPending", "youRobotScavenged", "_affirmationCookieEaten", "_affirmationHateUsed", "_airFryerUsed", "_akgyxothUsed", "_alienAnimalMilkUsed", "_alienPlantPodUsed", "_allYearSucker", "_aprilShower", "_armyToddlerCast", "_authorsInkUsed", "_baconMachineUsed", "_bagOfCandy", "_bagOfCandyUsed", "_bagOTricksUsed", "_ballastTurtleUsed", "_ballInACupUsed", "_ballpit", "_barrelPrayer", "_bastilleLastBattleWon", "_beachCombing", "_bendHellUsed", "_blankoutUsed", "_bonersSummoned", "_bookOfEverySkillUsed", "_borrowedTimeUsed", "_bowleggedSwaggerUsed", "_bowlFullOfJellyUsed", "_boxOfHammersUsed", "_brainPreservationFluidUsed", "_brassDreadFlaskUsed", "_cameraUsed", "_canSeekBirds", "_carboLoaded", "_cargoPocketEmptied", "_ceciHatUsed", "_chateauDeskHarvested", "_chateauMonsterFought", "_chronerCrossUsed", "_chronerTriggerUsed", "_chubbyAndPlumpUsed", "_circleDrumUsed", "_clanFortuneBuffUsed", "_claraBellUsed", "_coalPaperweightUsed", "_cocoaDispenserUsed", "_cocktailShakerUsed", "_coldAirportToday", "_coldOne", "_communismUsed", "_confusingLEDClockUsed", "_controlPanelUsed", "_cookbookbatRecipeDrops", "_corruptedStardustUsed", "_cosmicSixPackConjured", "_crappyCameraUsed", "_creepyVoodooDollUsed", "_crimboTree", "_cursedKegUsed", "_cursedMicrowaveUsed", "_dailyDungeonMalwareUsed", "_darkChocolateHeart", "_daycareFights", "_daycareNap", "_daycareSpa", "_daycareToday", "_defectiveTokenChecked", "_defectiveTokenUsed", "_dinseyGarbageDisposed", "_discoKnife", "_distentionPillUsed", "_dnaHybrid", "_docClocksThymeCocktailDrunk", "_drippingHallDoor1", "_drippingHallDoor2", "_drippingHallDoor3", "_drippingHallDoor4", "_drippyCaviarUsed", "_drippyNuggetUsed", "_drippyPilsnerUsed", "_drippyPlumUsed", "_drippyWineUsed", "_eldritchHorrorEvoked", "_eldritchTentacleFought", "_entauntaunedToday", "_envyfishEggUsed", "_essentialTofuUsed", "_etchedHourglassUsed", "_eternalCarBatteryUsed", "_everfullGlassUsed", "_eyeAndATwistUsed", "_fancyChessSetUsed", "_falloutShelterSpaUsed", "_fancyHotDogEaten", "_farmerItemsCollected", "_favoriteBirdVisited", "_firedJokestersGun", "_fireExtinguisherRefilled", "_fireStartingKitUsed", "_fireworksShop", "_fireworksShopHatBought", "_fireworksShopEquipmentBought", "_fireworkUsed", "_fishyPipeUsed", "_floundryItemCreated", "_floundryItemUsed", "_freePillKeeperUsed", "_frToday", "_fudgeSporkUsed", "_garbageItemChanged", "_gingerBiggerAlligators", "_gingerbreadCityToday", "_gingerbreadClockAdvanced", "_gingerbreadClockVisited", "_gingerbreadColumnDestroyed", "_gingerbreadMobHitUsed", "_glennGoldenDiceUsed", "_glitchItemImplemented", "_gnollEyeUsed", "_governmentPerDiemUsed", "_grimBuff", "_guildManualUsed", "_guzzlrQuestAbandoned", "_hardKnocksDiplomaUsed", "_hippyMeatCollected", "_hobbyHorseUsed", "_holidayFunUsed", "_holoWristCrystal", "_hotAirportToday", "_hungerSauceUsed", "_hyperinflatedSealLungUsed", "_iceHotelRoomsRaided", "_iceSculptureUsed", "_incredibleSelfEsteemCast", "_infernoDiscoVisited", "_internetDailyDungeonMalwareBought", "_internetGallonOfMilkBought", "_internetPlusOneBought", "_internetPrintScreenButtonBought", "_internetViralVideoBought", "_interviewIsabella", "_interviewMasquerade", "_interviewVlad", "_inquisitorsUnidentifiableObjectUsed", "_ironicMoustache", "_jackassPlumberGame", "_jarlsCheeseSummoned", "_jarlsCreamSummoned", "_jarlsDoughSummoned", "_jarlsEggsSummoned", "_jarlsFruitSummoned", "_jarlsMeatSummoned", "_jarlsPotatoSummoned", "_jarlsVeggiesSummoned", "_jingleBellUsed", "_jukebox", "_kgbFlywheelCharged", "_kgbLeftDrawerUsed", "_kgbOpened", "_kgbRightDrawerUsed", "_kolConSixPackUsed", "_kolhsCutButNotDried", "_kolhsIsskayLikeAnAshtray", "_kolhsPoeticallyLicenced", "_kolhsSchoolSpirited", "_kudzuSaladEaten", "_lastCombatWon", "_latteBanishUsed", "_latteCopyUsed", "_latteDrinkUsed", "_legendaryBeat", "_licenseToChillUsed", "_lookingGlass", "_loveTunnelToday", "_loveTunnelUsed", "_luckyGoldRingVolcoino", "_lunchBreak", "_lupineHormonesUsed", "_lyleFavored", "_madLiquorDrunk", "_madTeaParty", "_mafiaMiddleFingerRingUsed", "_managerialManipulationUsed", "_mansquitoSerumUsed", "_maydayDropped", "_mayoDeviceRented", "_mayoTankSoaked", "_meatballMachineUsed", "_meatifyMatterUsed", "_milkOfMagnesiumUsed", "_mimeArmyShotglassUsed", "_missGravesVermouthDrunk", "_missileLauncherUsed", "_momFoodReceived", "_mrBurnsgerEaten", "_muffinOrderedToday", "_mushroomGardenVisited", "_neverendingPartyToday", "_newYouQuestCompleted", "_olympicSwimmingPool", "_olympicSwimmingPoolItemFound", "_overflowingGiftBasketUsed", "_partyHard", "_pastaAdditive", "_perfectFreezeUsed", "_perfectlyFairCoinUsed", "_petePartyThrown", "_peteRiotIncited", "_photocopyUsed", "_pickyTweezersUsed", "_pirateBellowUsed", "_pirateForkUsed", "_pixelOrbUsed", "_plumbersMushroomStewEaten", "_pneumaticityPotionUsed", "_pottedTeaTreeUsed", "_prToday", "_psychoJarFilled", "_psychoJarUsed", "_psychokineticHugUsed", "_rainStickUsed", "_redwoodRainStickUsed", "_requestSandwichSucceeded", "_rhinestonesAcquired", "_seaJellyHarvested", "_setOfJacksUsed", "_sewingKitUsed", "_sexChanged", "_shrubDecorated", "_silverDreadFlaskUsed", "_skateBuff1", "_skateBuff2", "_skateBuff3", "_skateBuff4", "_skateBuff5", "_sleazeAirportToday", "_sobrieTeaUsed", "_softwareGlitchTurnReceived", "_spacegateMurderbot", "_spacegateRuins", "_spacegateSpant", "_spacegateToday", "_spacegateVaccine", "_spaghettiBreakfast", "_spaghettiBreakfastEaten", "_spinmasterLatheVisited", "_spinningWheel", "_spookyAirportToday", "_stabonicScrollUsed", "_steelyEyedSquintUsed", "_stenchAirportToday", "_stinkyCheeseBanisherUsed", "_streamsCrossed", "_stuffedPocketwatchUsed", "_styxSprayUsed", "_summonAnnoyanceUsed", "_summonCarrotUsed", "_summonResortPassUsed", "_sweetToothUsed", "_syntheticDogHairPillUsed", "_tacoFlierUsed", "_telegraphOfficeToday", "_templeHiddenPower", "_tempuraAirUsed", "_thesisDelivered", "_timeSpinnerReplicatorUsed", "_toastSummoned", "_tonicDjinn", "_treasuryEliteMeatCollected", "_treasuryHaremMeatCollected", "_trivialAvocationsGame", "_tryptophanDartUsed", "_turtlePowerCast", "_twelveNightEnergyUsed", "_ultraMegaSourBallUsed", "_victorSpoilsUsed", "_villainLairCanLidUsed", "_villainLairColorChoiceUsed", "_villainLairDoorChoiceUsed", "_villainLairFirecrackerUsed", "_villainLairSymbologyChoiceUsed", "_villainLairWebUsed", "_vmaskBanisherUsed", "_voraciTeaUsed", "_volcanoItemRedeemed", "_volcanoSuperduperheatedMetal", "_voteToday", "_VYKEACafeteriaRaided", "_VYKEALoungeRaided", "_walfordQuestStartedToday", "_warbearBankUsed", "_warbearBreakfastMachineUsed", "_warbearGyrocopterUsed", "_warbearSodaMachineUsed", "_wildfireBarrelHarvested", "_witchessBuff", "_workshedItemUsed", "_zombieClover", "_preventScurvy", "lockedItem4637", "lockedItem4638", "lockedItem4639", "lockedItem4646", "lockedItem4647", "unknownRecipe3542", "unknownRecipe3543", "unknownRecipe3544", "unknownRecipe3545", "unknownRecipe3546", "unknownRecipe3547", "unknownRecipe3548", "unknownRecipe3749", "unknownRecipe3751", "unknownRecipe4172", "unknownRecipe4173", "unknownRecipe4174", "unknownRecipe5060", "unknownRecipe5061", "unknownRecipe5062", "unknownRecipe5063", "unknownRecipe5064", "unknownRecipe5066", "unknownRecipe5067", "unknownRecipe5069", "unknownRecipe5070", "unknownRecipe5072", "unknownRecipe5073", "unknownRecipe5670", "unknownRecipe5671", "unknownRecipe6501", "unknownRecipe6564", "unknownRecipe6565", "unknownRecipe6566", "unknownRecipe6567", "unknownRecipe6568", "unknownRecipe6569", "unknownRecipe6570", "unknownRecipe6571", "unknownRecipe6572", "unknownRecipe6573", "unknownRecipe6574", "unknownRecipe6575", "unknownRecipe6576", "unknownRecipe6577", "unknownRecipe6578", "unknownRecipe7752", "unknownRecipe7753", "unknownRecipe7754", "unknownRecipe7755", "unknownRecipe7756", "unknownRecipe7757", "unknownRecipe7758", "unknownRecipe10970", "unknownRecipe10971", "unknownRecipe10972", "unknownRecipe10973", "unknownRecipe10974", "unknownRecipe10975", "unknownRecipe10976", "unknownRecipe10977", "unknownRecipe10978", "unknownRecipe10988", "unknownRecipe10989", "unknownRecipe10990", "unknownRecipe10991", "unknownRecipe10992", "unknownRecipe11000"];
var numericProperties = ["coinMasterIndex", "dailyDeedsVersion", "defaultDropdown1", "defaultDropdown2", "defaultDropdownSplit", "defaultLimit", "fixedThreadPoolSize", "itemManagerIndex", "lastBuffRequestType", "lastGlobalCounterDay", "lastImageCacheClear", "previousUpdateRevision", "relayDelayForSVN", "relaySkillButtonCount", "scriptButtonPosition", "statusDropdown", "svnThreadPoolSize", "toolbarPosition", "_g9Effect", "addingScrolls", "affirmationCookiesEaten", "aminoAcidsUsed", "antagonisticSnowmanKitCost", "ascensionsToday", "autoAbortThreshold", "autoAntidote", "autoBuyPriceLimit", "autumnatonQuestTurn", "availableCandyCredits", "availableDimes", "availableFunPoints", "availableQuarters", "availableStoreCredits", "availableSwagger", "averageSwagger", "awolMedicine", "awolPointsBeanslinger", "awolPointsCowpuncher", "awolPointsSnakeoiler", "awolDeferredPointsBeanslinger", "awolDeferredPointsCowpuncher", "awolDeferredPointsSnakeoiler", "awolVenom", "bagOTricksCharges", "ballpitBonus", "bankedKarma", "bartenderTurnsUsed", "basementMallPrices", "basementSafetyMargin", "batmanFundsAvailable", "batmanBonusInitialFunds", "batmanTimeLeft", "bearSwagger", "beeCounter", "beGregariousCharges", "beGregariousFightsLeft", "birdformCold", "birdformHot", "birdformRoc", "birdformSleaze", "birdformSpooky", "birdformStench", "blackBartsBootyCost", "blackPuddingsDefeated", "blackForestProgress", "blankOutUsed", "bloodweiserDrunk", "bondPoints", "bondVillainsDefeated", "boneAbacusVictories", "booPeakProgress", "borisPoints", "breakableHandling", "breakableHandling1964", "breakableHandling9691", "breakableHandling9692", "breakableHandling9699", "breathitinCharges", "brodenBacteria", "brodenSprinkles", "buffBotMessageDisposal", "buffBotPhilanthropyType", "buffJimmyIngredients", "burnoutsDefeated", "burrowgrubSummonsRemaining", "camelSpit", "camerasUsed", "campAwayDecoration", "candyWitchTurnsUsed", "candyWitchCandyTotal", "carboLoading", "catBurglarBankHeists", "cellarLayout", "charitableDonations", "chasmBridgeProgress", "chefTurnsUsed", "chessboardsCleared", "chilledToTheBone", "cinderellaMinutesToMidnight", "cinderellaScore", "cocktailSummons", "commerceGhostCombats", "controlPanelOmega", "cornucopiasOpened", "cosmicBowlingBallReturnCombats", "cozyCounter6332", "cozyCounter6333", "cozyCounter6334", "craftingClay", "craftingLeather", "craftingStraw", "crimbo16BeardChakraCleanliness", "crimbo16BootsChakraCleanliness", "crimbo16BungChakraCleanliness", "crimbo16CrimboHatChakraCleanliness", "crimbo16GutsChakraCleanliness", "crimbo16HatChakraCleanliness", "crimbo16JellyChakraCleanliness", "crimbo16LiverChakraCleanliness", "crimbo16NippleChakraCleanliness", "crimbo16NoseChakraCleanliness", "crimbo16ReindeerChakraCleanliness", "crimbo16SackChakraCleanliness", "crimboTreeDays", "cubelingProgress", "currentExtremity", "currentHedgeMazeRoom", "currentMojoFilters", "currentNunneryMeat", "currentPortalEnergy", "cursedMagnifyingGlassCount", "cyrptAlcoveEvilness", "cyrptCrannyEvilness", "cyrptNicheEvilness", "cyrptNookEvilness", "cyrptTotalEvilness", "darkGyfftePoints", "daycareEquipment", "daycareInstructors", "daycareLastScavenge", "daycareToddlers", "dbNemesisSkill1", "dbNemesisSkill2", "dbNemesisSkill3", "desertExploration", "desktopHeight", "desktopWidth", "dinseyFilthLevel", "dinseyFunProgress", "dinseyNastyBearsDefeated", "dinseySocialJusticeIProgress", "dinseySocialJusticeIIProgress", "dinseyTouristsFed", "dinseyToxicMultiplier", "doctorBagQuestLights", "doctorBagUpgrades", "dreadScroll1", "dreadScroll2", "dreadScroll3", "dreadScroll4", "dreadScroll5", "dreadScroll6", "dreadScroll7", "dreadScroll8", "dripAdventuresSinceAscension", "drippingHallAdventuresSinceAscension", "drippingTreesAdventuresSinceAscension", "drippyBatsUnlocked", "drippyJuice", "drippyOrbsClaimed", "drunkenSwagger", "edDefeatAbort", "edPoints", "eldritchTentaclesFought", "electricKoolAidEaten", "encountersUntilDMTChoice", "encountersUntilNEPChoice", "ensorceleeLevel", "entauntaunedColdRes", "essenceOfAnnoyanceCost", "essenceOfBearCost", "extraRolloverAdventures", "falloutShelterLevel", "familiarSweat", "fingernailsClipped", "fistSkillsKnown", "flyeredML", "fossilB", "fossilD", "fossilN", "fossilP", "fossilS", "fossilW", "fratboysDefeated", "frenchGuardTurtlesFreed", "funGuyMansionKills", "garbageChampagneCharge", "garbageFireProgress", "garbageShirtCharge", "garbageTreeCharge", "garlandUpgrades", "gingerDigCount", "gingerLawChoice", "gingerMuscleChoice", "gingerTrainScheduleStudies", "gladiatorBallMovesKnown", "gladiatorBladeMovesKnown", "gladiatorNetMovesKnown", "glitchItemCost", "glitchItemImplementationCount", "glitchItemImplementationLevel", "glitchSwagger", "gloverPoints", "gnasirProgress", "goldenMrAccessories", "gongPath", "gooseDronesRemaining", "goreCollected", "gourdItemCount", "greyYouPoints", "grimoire1Summons", "grimoire2Summons", "grimoire3Summons", "grimstoneCharge", "guardTurtlesFreed", "guideToSafariCost", "guyMadeOfBeesCount", "guzzlrBronzeDeliveries", "guzzlrDeliveryProgress", "guzzlrGoldDeliveries", "guzzlrPlatinumDeliveries", "haciendaLayout", "hallowiener8BitRealm", "hallowienerCoinspiracy", "hareMillisecondsSaved", "heavyRainsStartingThunder", "heavyRainsStartingRain", "heavyRainsStartingLightning", "heroDonationBoris", "heroDonationJarlsberg", "heroDonationSneakyPete", "hiddenApartmentProgress", "hiddenBowlingAlleyProgress", "hiddenHospitalProgress", "hiddenOfficeProgress", "hiddenTavernUnlock", "highTopPumped", "hippiesDefeated", "holidayHalsBookCost", "holidaySwagger", "homemadeRobotUpgrades", "homebodylCharges", "hpAutoRecovery", "hpAutoRecoveryTarget", "iceSwagger", "jarlsbergPoints", "jungCharge", "junglePuns", "knownAscensions", "kolhsTotalSchoolSpirited", "lastAnticheeseDay", "lastArcadeAscension", "lastBadMoonReset", "lastBangPotionReset", "lastBattlefieldReset", "lastBeardBuff", "lastBreakfast", "lastCartographyBooPeak", "lastCartographyCastleTop", "lastCartographyDarkNeck", "lastCartographyDefiledNook", "lastCartographyFratHouse", "lastCartographyFratHouseVerge", "lastCartographyGuanoJunction", "lastCartographyHauntedBilliards", "lastCartographyHippyCampVerge", "lastCartographyZeppelinProtesters", "lastCastleGroundUnlock", "lastCastleTopUnlock", "lastCellarReset", "lastChanceThreshold", "lastChasmReset", "lastColosseumRoundWon", "lastCouncilVisit", "lastCounterDay", "lastDesertUnlock", "lastDispensaryOpen", "lastDMTDuplication", "lastDwarfFactoryReset", "lastEVHelmetValue", "lastEVHelmetReset", "lastEmptiedStorage", "lastFilthClearance", "lastGoofballBuy", "lastGuildStoreOpen", "lastGuyMadeOfBeesReset", "lastFratboyCall", "lastFriarCeremonyAscension", "lastFriarElbowNC", "lastFriarHeartNC", "lastFriarNeckNC", "lastHippyCall", "lastIslandUnlock", "lastKeyotronUse", "lastKingLiberation", "lastLightsOutTurn", "lastMushroomPlot", "lastMiningReset", "lastNemesisReset", "lastPaperStripReset", "lastPirateEphemeraReset", "lastPirateInsultReset", "lastPlusSignUnlock", "lastQuartetAscension", "lastQuartetRequest", "lastSecondFloorUnlock", "lastSkateParkReset", "lastStillBeatingSpleen", "lastTavernAscension", "lastTavernSquare", "lastTelescopeReset", "lastTempleAdventures", "lastTempleButtonsUnlock", "lastTempleUnlock", "lastThingWithNoNameDefeated", "lastTowelAscension", "lastTr4pz0rQuest", "lastVioletFogMap", "lastVoteMonsterTurn", "lastWartDinseyDefeated", "lastWuTangDefeated", "lastYearbookCameraAscension", "lastZapperWand", "lastZapperWandExplosionDay", "lawOfAveragesCost", "libramSummons", "lightsOutAutomation", "louvreDesiredGoal", "louvreGoal", "lovebugsAridDesert", "lovebugsBeachBuck", "lovebugsBooze", "lovebugsChroner", "lovebugsCoinspiracy", "lovebugsCyrpt", "lovebugsFreddy", "lovebugsFunFunds", "lovebugsHoboNickel", "lovebugsItemDrop", "lovebugsMeat", "lovebugsMeatDrop", "lovebugsMoxie", "lovebugsMuscle", "lovebugsMysticality", "lovebugsOilPeak", "lovebugsOrcChasm", "lovebugsPowder", "lovebugsWalmart", "lttQuestDifficulty", "lttQuestStageCount", "manaBurnSummonThreshold", "manaBurningThreshold", "manaBurningTrigger", "manorDrawerCount", "manualOfNumberologyCost", "mapToKokomoCost", "masksUnlocked", "maximizerMRUSize", "maximizerCombinationLimit", "maximizerEquipmentLevel", "maximizerEquipmentScope", "maximizerMaxPrice", "maximizerPriceLevel", "maxManaBurn", "mayflyExperience", "mayoLevel", "meansuckerPrice", "merkinVocabularyMastery", "miniAdvClass", "miniMartinisDrunk", "moleTunnelLevel", "mothershipProgress", "mpAutoRecovery", "mpAutoRecoveryTarget", "munchiesPillsUsed", "mushroomGardenCropLevel", "nextParanormalActivity", "nextQuantumFamiliarOwnerId", "nextQuantumFamiliarTurn", "noobPoints", "noobDeferredPoints", "noodleSummons", "nsContestants1", "nsContestants2", "nsContestants3", "nuclearAutumnPoints", "numericSwagger", "nunsVisits", "oilPeakProgress", "optimalSwagger", "optimisticCandleProgress", "palindomeDudesDefeated", "parasolUsed", "pendingMapReflections", "pirateSwagger", "plantingDay", "plumberBadgeCost", "plumberCostumeCost", "plumberPoints", "poolSharkCount", "poolSkill", "primaryLabGooIntensity", "prismaticSummons", "procrastinatorLanguageFluency", "promptAboutCrafting", "puzzleChampBonus", "pyramidPosition", "rockinRobinProgress", "ROMOfOptimalityCost", "quantumPoints", "reagentSummons", "reanimatorArms", "reanimatorLegs", "reanimatorSkulls", "reanimatorWeirdParts", "reanimatorWings", "recentLocations", "redSnapperProgress", "relayPort", "relocatePygmyJanitor", "relocatePygmyLawyer", "rumpelstiltskinTurnsUsed", "rumpelstiltskinKidsRescued", "safariSwagger", "sausageGrinderUnits", "schoolOfHardKnocksDiplomaCost", "schoolSwagger", "scrapbookCharges", "scriptMRULength", "seaodesFound", "SeasoningSwagger", "sexChanges", "shenInitiationDay", "shockingLickCharges", "singleFamiliarRun", "skillBurn3", "skillBurn90", "skillBurn153", "skillBurn154", "skillBurn155", "skillBurn1019", "skillBurn5017", "skillBurn6014", "skillBurn6015", "skillBurn6016", "skillBurn6020", "skillBurn6021", "skillBurn6022", "skillBurn6023", "skillBurn6024", "skillBurn6026", "skillBurn6028", "skillBurn7323", "skillBurn14008", "skillBurn14028", "skillBurn14038", "skillBurn15011", "skillBurn15028", "skillBurn17005", "skillBurn22034", "skillBurn22035", "skillBurn23301", "skillBurn23302", "skillBurn23303", "skillBurn23304", "skillBurn23305", "skillBurn23306", "skillLevel46", "skillLevel47", "skillLevel48", "skillLevel117", "skillLevel118", "skillLevel121", "skillLevel128", "skillLevel134", "skillLevel144", "skillLevel180", "skillLevel188", "skillLevel7254", "slimelingFullness", "slimelingStacksDropped", "slimelingStacksDue", "smoresEaten", "smutOrcNoncombatProgress", "sneakyPetePoints", "snojoMoxieWins", "snojoMuscleWins", "snojoMysticalityWins", "sourceAgentsDefeated", "sourceEnlightenment", "sourceInterval", "sourcePoints", "sourceTerminalGram", "sourceTerminalPram", "sourceTerminalSpam", "spaceBabyLanguageFluency", "spacePirateLanguageFluency", "spelunkyNextNoncombat", "spelunkySacrifices", "spelunkyWinCount", "spookyPuttyCopiesMade", "statbotUses", "sugarCounter4178", "sugarCounter4179", "sugarCounter4180", "sugarCounter4181", "sugarCounter4182", "sugarCounter4183", "sugarCounter4191", "summonAnnoyanceCost", "sweat", "tacoDanCocktailSauce", "tacoDanFishMeat", "tavernLayout", "telescopeUpgrades", "tempuraSummons", "timeSpinnerMedals", "timesRested", "tomeSummons", "totalCharitableDonations", "turtleBlessingTurns", "twinPeakProgress", "twoCRSPoints", "unicornHornInflation", "universalSeasoningCost", "usable1HWeapons", "usable1xAccs", "usable2HWeapons", "usable3HWeapons", "usableAccessories", "usableHats", "usableOffhands", "usableOther", "usablePants", "usableShirts", "valueOfAdventure", "valueOfInventory", "valueOfStill", "valueOfTome", "vintnerCharge", "vintnerWineLevel", "violetFogGoal", "walfordBucketProgress", "warehouseProgress", "welcomeBackAdv", "wolfPigsEvicted", "wolfTurnsUsed", "writingDesksDefeated", "xoSkeleltonXProgress", "xoSkeleltonOProgress", "yearbookCameraAscensions", "yearbookCameraUpgrades", "youRobotBody", "youRobotBottom", "youRobotLeft", "youRobotPoints", "youRobotRight", "youRobotTop", "zeppelinProtestors", "zigguratLianas", "zombiePoints", "_absintheDrops", "_abstractionDropsCrown", "_aguaDrops", "_xenomorphCharge", "_ancestralRecallCasts", "_antihangoverBonus", "_astralDrops", "_autumnatonQuests", "_backUpUses", "_badlyRomanticArrows", "_badgerCharge", "_balefulHowlUses", "_banderRunaways", "_bastilleCheese", "_bastilleGames", "_bastilleGameTurn", "_bastilleLastCheese", "_beanCannonUses", "_bearHugs", "_beerLensDrops", "_bellydancerPickpockets", "_benettonsCasts", "_birdsSoughtToday", "_boomBoxFights", "_boomBoxSongsLeft", "_bootStomps", "_boxingGloveArrows", "_brickoEyeSummons", "_brickoFights", "_campAwayCloudBuffs", "_campAwaySmileBuffs", "_candySummons", "_captainHagnkUsed", "_carnieCandyDrops", "_carrotNoseDrops", "_catBurglarCharge", "_catBurglarHeistsComplete", "_cheerleaderSteam", "_chestXRayUsed", "_chipBags", "_chocolateCigarsUsed", "_chocolateSculpturesUsed", "_chocolatesUsed", "_chronolithActivations", "_chronolithNextCost", "_clanFortuneConsultUses", "_clipartSummons", "_coldMedicineConsults", "_coldMedicineEquipmentTaken", "_companionshipCasts", "_cookbookbatCrafting", "_cosmicBowlingSkillsUsed", "_crimbo21ColdResistance", "_dailySpecialPrice", "_daycareGymScavenges", "_daycareRecruits", "_deckCardsDrawn", "_deluxeKlawSummons", "_demandSandwich", "_detectiveCasesCompleted", "_disavowed", "_dnaPotionsMade", "_donhosCasts", "_dreamJarDrops", "_drunkPygmyBanishes", "_edDefeats", "_edLashCount", "_elronsCasts", "_enamorangs", "_energyCollected", "_expertCornerCutterUsed", "_favorRareSummons", "_feastUsed", "_feelinTheRhythm", "_feelPrideUsed", "_feelExcitementUsed", "_feelHatredUsed", "_feelLonelyUsed", "_feelNervousUsed", "_feelEnvyUsed", "_feelDisappointedUsed", "_feelSuperiorUsed", "_feelLostUsed", "_feelNostalgicUsed", "_feelPeacefulUsed", "_fingertrapArrows", "_fireExtinguisherCharge", "_fragrantHerbsUsed", "_freeBeachWalksUsed", "_frButtonsPressed", "_fudgeWaspFights", "_gapBuffs", "_garbageFireDropsCrown", "_genieFightsUsed", "_genieWishesUsed", "_gibbererAdv", "_gibbererCharge", "_gingerbreadCityTurns", "_glarkCableUses", "_glitchMonsterFights", "_gnomeAdv", "_godLobsterFights", "_goldenMoneyCharge", "_gongDrops", "_gothKidCharge", "_gothKidFights", "_grimBrotherCharge", "_grimFairyTaleDrops", "_grimFairyTaleDropsCrown", "_grimoireConfiscatorSummons", "_grimoireGeekySummons", "_grimstoneMaskDrops", "_grimstoneMaskDropsCrown", "_grooseCharge", "_grooseDrops", "_guzzlrDeliveries", "_guzzlrGoldDeliveries", "_guzzlrPlatinumDeliveries", "_hareAdv", "_hareCharge", "_highTopPumps", "_hipsterAdv", "_hoardedCandyDropsCrown", "_hoboUnderlingSummons", "_holoWristDrops", "_holoWristProgress", "_hotAshesDrops", "_hotJellyUses", "_hotTubSoaks", "_humanMuskUses", "_iceballUses", "_inigosCasts", "_jerksHealthMagazinesUsed", "_jiggleCheese", "_jiggleCream", "_jiggleLife", "_jiggleSteak", "_jitbCharge", "_juneCleaverFightsLeft", "_juneCleaverEncounters", "_juneCleaverStench", "_juneCleaverSpooky", "_juneCleaverSleaze", "_juneCleaverHot", "_juneCleaverCold", "_juneCleaverSkips", "_jungDrops", "_kgbClicksUsed", "_kgbDispenserUses", "_kgbTranquilizerDartUses", "_klawSummons", "_kloopCharge", "_kloopDrops", "_kolhsAdventures", "_kolhsSavedByTheBell", "_lastDailyDungeonRoom", "_lastSausageMonsterTurn", "_lastZomboEye", "_latteRefillsUsed", "_leafblowerML", "_legionJackhammerCrafting", "_llamaCharge", "_longConUsed", "_lovebugsBeachBuck", "_lovebugsChroner", "_lovebugsCoinspiracy", "_lovebugsFreddy", "_lovebugsFunFunds", "_lovebugsHoboNickel", "_lovebugsWalmart", "_loveChocolatesUsed", "_lynyrdSnareUses", "_machineTunnelsAdv", "_macrometeoriteUses", "_mafiaThumbRingAdvs", "_mayflowerDrops", "_mayflySummons", "_mediumSiphons", "_meteoriteAdesUsed", "_meteorShowerUses", "_micrometeoriteUses", "_miniMartiniDrops", "_monstersMapped", "_mushroomGardenFights", "_nanorhinoCharge", "_navelRunaways", "_neverendingPartyFreeTurns", "_newYouQuestSharpensDone", "_newYouQuestSharpensToDo", "_nextColdMedicineConsult", "_nextQuantumAlignment", "_nightmareFuelCharges", "_noobSkillCount", "_nuclearStockpileUsed", "_oilExtracted", "_olfactionsUsed", "_speakeasyFreeFights", "_optimisticCandleDropsCrown", "_oreDropsCrown", "_otoscopeUsed", "_oysterEggsFound", "_pantsgivingBanish", "_pantsgivingCount", "_pantsgivingCrumbs", "_pantsgivingFullness", "_pasteDrops", "_peteJukeboxFixed", "_peteJumpedShark", "_petePeeledOut", "_pieDrops", "_piePartsCount", "_pixieCharge", "_pocketProfessorLectures", "_poisonArrows", "_pokeGrowFertilizerDrops", "_poolGames", "_powderedGoldDrops", "_powderedMadnessUses", "_powerfulGloveBatteryPowerUsed", "_powerPillDrops", "_powerPillUses", "_precisionCasts", "_radlibSummons", "_raindohCopiesMade", "_rapidPrototypingUsed", "_raveStealCount", "_reflexHammerUsed", "_resolutionAdv", "_resolutionRareSummons", "_riftletAdv", "_roboDrops", "_rogueProgramCharge", "_romanticFightsLeft", "_saberForceMonsterCount", "_saberForceUses", "_saberMod", "_saltGrainsConsumed", "_sandwormCharge", "_saplingsPlanted", "_sausageFights", "_sausagesEaten", "_sausagesMade", "_sealFigurineUses", "_sealScreeches", "_sealsSummoned", "_shatteringPunchUsed", "_shortOrderCookCharge", "_shrubCharge", "_sloppyDinerBeachBucks", "_smilesOfMrA", "_smithsnessSummons", "_snojoFreeFights", "_snojoParts", "_snokebombUsed", "_snowconeSummons", "_snowglobeDrops", "_snowSuitCount", "_sourceTerminalDigitizeMonsterCount", "_sourceTerminalDigitizeUses", "_sourceTerminalDuplicateUses", "_sourceTerminalEnhanceUses", "_sourceTerminalExtrudes", "_sourceTerminalPortscanUses", "_spaceFurDropsCrown", "_spacegatePlanetIndex", "_spacegateTurnsLeft", "_spaceJellyfishDrops", "_speakeasyDrinksDrunk", "_spelunkerCharges", "_spelunkingTalesDrops", "_spikolodonSpikeUses", "_spookyJellyUses", "_stackLumpsUses", "_steamCardDrops", "_stickerSummons", "_stinkyCheeseCount", "_stressBallSqueezes", "_sugarSummons", "_sweatOutSomeBoozeUsed", "_taffyRareSummons", "_taffyYellowSummons", "_thanksgettingFoodsEaten", "_thingfinderCasts", "_thinknerdPackageDrops", "_thorsPliersCrafting", "_timeHelmetAdv", "_timeSpinnerMinutesUsed", "_tokenDrops", "_transponderDrops", "_turkeyBlastersUsed", "_turkeyBooze", "_turkeyMuscle", "_turkeyMyst", "_turkeyMoxie", "_unaccompaniedMinerUsed", "_unconsciousCollectiveCharge", "_universalSeasoningsUsed", "_universeCalculated", "_universeImploded", "_usedReplicaBatoomerang", "_vampyreCloakeFormUses", "_villainLairProgress", "_vitachocCapsulesUsed", "_vmaskAdv", "_voidFreeFights", "_volcanoItem1", "_volcanoItem2", "_volcanoItem3", "_volcanoItemCount1", "_volcanoItemCount2", "_volcanoItemCount3", "_voteFreeFights", "_VYKEACompanionLevel", "_warbearAutoAnvilCrafting", "_whiteRiceDrops", "_witchessFights", "_xoHugsUsed", "_yellowPixelDropsCrown", "_zapCount", "_zombieSmashPocketsUsed"];
var monsterProperties = ["beGregariousMonster", "cameraMonster", "chateauMonster", "clumsinessGroveBoss", "crappyCameraMonster", "crudeMonster", "enamorangMonster", "envyfishMonster", "glacierOfJerksBoss", "iceSculptureMonster", "lastCopyableMonster", "longConMonster", "maelstromOfLoversBoss", "makeFriendsMonster", "merkinLockkeyMonster", "nosyNoseMonster", "olfactedMonster", "photocopyMonster", "rainDohMonster", "romanticTarget", "screencappedMonster", "spookyPuttyMonster", "stenchCursedMonster", "superficiallyInterestedMonster", "waxMonster", "yearbookCameraTarget", "_gallapagosMonster", "_jiggleCreamedMonster", "_latteMonster", "_nanorhinoBanishedMonster", "_newYouQuestMonster", "_relativityMonster", "_saberForceMonster", "_sourceTerminalDigitizeMonster", "_voteMonster"];
var locationProperties = ["autumnatonQuestLocation", "currentJunkyardLocation", "doctorBagQuestLocation", "ghostLocation", "guzzlrQuestLocation", "nextSpookyravenElizabethRoom", "nextSpookyravenStephenRoom", "sourceOracleTarget", "_floundryBassLocation", "_floundryCarpLocation", "_floundryCodLocation", "_floundryHatchetfishLocation", "_floundryTroutLocation", "_floundryTunaLocation"];
var stringProperties = ["autoLogin", "browserBookmarks", "chatFontSize", "combatHotkey0", "combatHotkey1", "combatHotkey2", "combatHotkey3", "combatHotkey4", "combatHotkey5", "combatHotkey6", "combatHotkey7", "combatHotkey8", "combatHotkey9", "commandLineNamespace", "dailyDeedsOptions", "defaultBorderColor", "displayName", "externalEditor", "getBreakfast", "headerStates", "highlightList", "http.proxyHost", "http.proxyPassword", "http.proxyPort", "http.proxyUser", "https.proxyHost", "https.proxyPassword", "https.proxyPort", "https.proxyUser", "initialDesktop", "initialFrames", "lastRelayUpdate", "lastUserAgent", "lastUsername", "logPreferenceChangeFilter", "loginScript", "loginServerName", "loginWindowLogo", "logoutScript", "previousNotifyList", "previousUpdateVersion", "saveState", "saveStateActive", "scriptList", "swingLookAndFeel", "userAgent", "afterAdventureScript", "autoOlfact", "autoPutty", "autumnatonUpgrades", "backupCameraMode", "banishedMonsters", "banishingShoutMonsters", "batmanStats", "batmanZone", "batmanUpgrades", "battleAction", "beachHeadsUnlocked", "beforePVPScript", "betweenBattleScript", "boomBoxSong", "breakfastAlways", "breakfastHardcore", "breakfastSoftcore", "buffBotCasting", "buyScript", "cargoPocketsEmptied", "cargoPocketScraps", "chatbotScript", "chatPlayerScript", "choiceAdventureScript", "chosenTrip", "clanFortuneReply1", "clanFortuneReply2", "clanFortuneReply3", "clanFortuneWord1", "clanFortuneWord2", "clanFortuneWord3", "commerceGhostItem", "counterScript", "copperheadClubHazard", "crimbotChassis", "crimbotArm", "crimbotPropulsion", "crystalBallPredictions", "csServicesPerformed", "currentAstralTrip", "currentDistillateMods", "currentEasyBountyItem", "currentHardBountyItem", "currentHippyStore", "currentJunkyardTool", "currentLlamaForm", "currentMood", "currentPVPSeason", "currentPvpVictories", "currentSpecialBountyItem", "customCombatScript", "cyrusAdjectives", "defaultFlowerLossMessage", "defaultFlowerWinMessage", "demonName1", "demonName2", "demonName3", "demonName4", "demonName5", "demonName6", "demonName7", "demonName8", "demonName9", "demonName10", "demonName11", "demonName12", "demonName13", "dinseyGatorStenchDamage", "dinseyRollercoasterStats", "doctorBagQuestItem", "dolphinItem", "duckAreasCleared", "duckAreasSelected", "edPiece", "enamorangMonsterTurn", "ensorcelee", "EVEDirections", "extraCosmeticModifiers", "familiarScript", "forbiddenStores", "gameProBossSpecialPower", "gooseReprocessed", "grimoireSkillsHardcore", "grimoireSkillsSoftcore", "grimstoneMaskPath", "guzzlrQuestClient", "guzzlrQuestBooze", "guzzlrQuestTier", "harvestGardenHardcore", "harvestGardenSoftcore", "hpAutoRecoveryItems", "invalidBuffMessage", "jickSwordModifier", "juneCleaverQueue", "kingLiberatedScript", "lassoTraining", "lastAdventure", "lastBangPotion819", "lastBangPotion820", "lastBangPotion821", "lastBangPotion822", "lastBangPotion823", "lastBangPotion824", "lastBangPotion825", "lastBangPotion826", "lastBangPotion827", "lastChanceBurn", "lastChessboard", "lastCombatEnvironments", "lastDwarfDiceRolls", "lastDwarfDigitRunes", "lastDwarfEquipmentRunes", "lastDwarfFactoryItem118", "lastDwarfFactoryItem119", "lastDwarfFactoryItem120", "lastDwarfFactoryItem360", "lastDwarfFactoryItem361", "lastDwarfFactoryItem362", "lastDwarfFactoryItem363", "lastDwarfFactoryItem364", "lastDwarfFactoryItem365", "lastDwarfFactoryItem910", "lastDwarfFactoryItem3199", "lastDwarfOfficeItem3208", "lastDwarfOfficeItem3209", "lastDwarfOfficeItem3210", "lastDwarfOfficeItem3211", "lastDwarfOfficeItem3212", "lastDwarfOfficeItem3213", "lastDwarfOfficeItem3214", "lastDwarfOreRunes", "lastDwarfHopper1", "lastDwarfHopper2", "lastDwarfHopper3", "lastDwarfHopper4", "lastEncounter", "lastMacroError", "lastMessageId", "lastPaperStrip3144", "lastPaperStrip4138", "lastPaperStrip4139", "lastPaperStrip4140", "lastPaperStrip4141", "lastPaperStrip4142", "lastPaperStrip4143", "lastPaperStrip4144", "lastPirateEphemera", "lastPorkoBoard", "lastPorkoPayouts", "lastPorkoExpected", "lastSlimeVial3885", "lastSlimeVial3886", "lastSlimeVial3887", "lastSlimeVial3888", "lastSlimeVial3889", "lastSlimeVial3890", "lastSlimeVial3891", "lastSlimeVial3892", "lastSlimeVial3893", "lastSlimeVial3894", "lastSlimeVial3895", "lastSlimeVial3896", "latteModifier", "latteUnlocks", "libramSkillsHardcore", "libramSkillsSoftcore", "louvreOverride", "lovePotion", "lttQuestName", "maximizerList", "maximizerMRUList", "mayoInMouth", "mayoMinderSetting", "merkinQuestPath", "mineLayout1", "mineLayout2", "mineLayout3", "mineLayout4", "mineLayout5", "mineLayout6", "mpAutoRecoveryItems", "muffinOnOrder", "nextAdventure", "nextDistillateMods", "nextQuantumFamiliarName", "nextQuantumFamiliarOwner", "nsChallenge2", "nsChallenge3", "nsChallenge4", "nsChallenge5", "nsTowerDoorKeysUsed", "oceanAction", "oceanDestination", "parkaMode", "pastaThrall1", "pastaThrall2", "pastaThrall3", "pastaThrall4", "pastaThrall5", "pastaThrall6", "pastaThrall7", "pastaThrall8", "peteMotorbikeTires", "peteMotorbikeGasTank", "peteMotorbikeHeadlight", "peteMotorbikeCowling", "peteMotorbikeMuffler", "peteMotorbikeSeat", "pieStuffing", "plantingDate", "plantingLength", "plantingScript", "plumberCostumeWorn", "pokefamBoosts", "postAscensionScript", "preAscensionScript", "retroCapeSuperhero", "retroCapeWashingInstructions", "questClumsinessGrove", "questDoctorBag", "questECoBucket", "questESlAudit", "questESlBacteria", "questESlCheeseburger", "questESlCocktail", "questESlDebt", "questESlFish", "questESlMushStash", "questESlSalt", "questESlSprinkles", "questESpEVE", "questESpJunglePun", "questESpGore", "questESpClipper", "questESpFakeMedium", "questESpSerum", "questESpSmokes", "questESpOutOfOrder", "questEStFishTrash", "questEStGiveMeFuel", "questEStNastyBears", "questEStSocialJusticeI", "questEStSocialJusticeII", "questEStSuperLuber", "questEStWorkWithFood", "questEStZippityDooDah", "questEUNewYou", "questF01Primordial", "questF02Hyboria", "questF03Future", "questF04Elves", "questF05Clancy", "questG01Meatcar", "questG02Whitecastle", "questG03Ego", "questG04Nemesis", "questG05Dark", "questG06Delivery", "questG07Myst", "questG08Moxie", "questG09Muscle", "questGlacierOfJerks", "questGuzzlr", "questI01Scapegoat", "questI02Beat", "questL02Larva", "questL03Rat", "questL04Bat", "questL05Goblin", "questL06Friar", "questL07Cyrptic", "questL08Trapper", "questL09Topping", "questL10Garbage", "questL11MacGuffin", "questL11Black", "questL11Business", "questL11Curses", "questL11Desert", "questL11Doctor", "questL11Manor", "questL11Palindome", "questL11Pyramid", "questL11Ron", "questL11Shen", "questL11Spare", "questL11Worship", "questL12War", "questL12HippyFrat", "questL13Final", "questL13Warehouse", "questLTTQuestByWire", "questM01Untinker", "questM02Artist", "questM03Bugbear", "questM05Toot", "questM06Gourd", "questM07Hammer", "questM08Baker", "questM09Rocks", "questM10Azazel", "questM11Postal", "questM12Pirate", "questM13Escape", "questM14Bounty", "questM15Lol", "questM16Temple", "questM17Babies", "questM18Swamp", "questM19Hippy", "questM20Necklace", "questM21Dance", "questM22Shirt", "questM23Meatsmith", "questM24Doc", "questM25Armorer", "questM26Oracle", "questMaelstromOfLovers", "questPAGhost", "questS01OldGuy", "questS02Monkees", "raveCombo1", "raveCombo2", "raveCombo3", "raveCombo4", "raveCombo5", "raveCombo6", "recoveryScript", "relayCounters", "royalty", "scriptMRUList", "seahorseName", "shenQuestItem", "shrubGarland", "shrubGifts", "shrubLights", "shrubTopper", "sideDefeated", "sidequestArenaCompleted", "sidequestFarmCompleted", "sidequestJunkyardCompleted", "sidequestLighthouseCompleted", "sidequestNunsCompleted", "sidequestOrchardCompleted", "skateParkStatus", "snowsuit", "sourceTerminalChips", "sourceTerminalEducate1", "sourceTerminalEducate2", "sourceTerminalEnquiry", "sourceTerminalEducateKnown", "sourceTerminalEnhanceKnown", "sourceTerminalEnquiryKnown", "sourceTerminalExtrudeKnown", "spadingData", "spadingScript", "speakeasyName", "spelunkyStatus", "spelunkyUpgrades", "spookyravenRecipeUsed", "stationaryButton1", "stationaryButton2", "stationaryButton3", "stationaryButton4", "stationaryButton5", "streamCrossDefaultTarget", "sweetSynthesisBlacklist", "telescope1", "telescope2", "telescope3", "telescope4", "telescope5", "testudinalTeachings", "textColors", "thanksMessage", "tomeSkillsHardcore", "tomeSkillsSoftcore", "trackVoteMonster", "trapperOre", "umbrellaState", "umdLastObtained", "vintnerWineEffect", "vintnerWineName", "vintnerWineType", "violetFogLayout", "volcanoMaze1", "volcanoMaze2", "volcanoMaze3", "volcanoMaze4", "volcanoMaze5", "walfordBucketItem", "warProgress", "watchedPreferences", "workteaClue", "yourFavoriteBird", "yourFavoriteBirdMods", "youRobotCPUUpgrades", "_bastilleBoosts", "_bastilleChoice1", "_bastilleChoice2", "_bastilleChoice3", "_bastilleCurrentStyles", "_bastilleEnemyCastle", "_bastilleEnemyName", "_bastilleLastBattleResults", "_bastilleLastEncounter", "_bastilleStats", "_beachHeadsUsed", "_beachLayout", "_beachMinutes", "_birdOfTheDay", "_birdOfTheDayMods", "_bittycar", "_campAwaySmileBuffSign", "_cloudTalkMessage", "_cloudTalkSmoker", "_coatOfPaintModifier", "_dailySpecial", "_deckCardsSeen", "_feastedFamiliars", "_floristPlantsUsed", "_frAreasUnlocked", "_frHoursLeft", "_frMonstersKilled", "_horsery", "_horseryCrazyMox", "_horseryCrazyMus", "_horseryCrazyMys", "_horseryCrazyName", "_horseryCurrentName", "_horseryDarkName", "_horseryNormalName", "_horseryPaleName", "_jickJarAvailable", "_jiggleCheesedMonsters", "_lastCombatStarted", "_LastPirateRealmIsland", "_locketMonstersFought", "_mummeryMods", "_mummeryUses", "_newYouQuestSkill", "_noHatModifier", "_pantogramModifier", "_pottedPowerPlant", "_questESp", "_questPartyFair", "_questPartyFairProgress", "_questPartyFairQuest", "_roboDrinks", "_roninStoragePulls", "_spacegateAnimalLife", "_spacegateCoordinates", "_spacegateGear", "_spacegateHazards", "_spacegateIntelligentLife", "_spacegatePlanetName", "_spacegatePlantLife", "_stolenAccordions", "_tempRelayCounters", "_timeSpinnerFoodAvailable", "_unknownEasyBountyItem", "_unknownHardBountyItem", "_unknownSpecialBountyItem", "_untakenEasyBountyItem", "_untakenHardBountyItem", "_untakenSpecialBountyItem", "_userMods", "_villainLairColor", "_villainLairKey", "_voteLocal1", "_voteLocal2", "_voteLocal3", "_voteLocal4", "_voteMonster1", "_voteMonster2", "_voteModifier", "_VYKEACompanionType", "_VYKEACompanionRune", "_VYKEACompanionName"];
var numericOrStringProperties = ["statusEngineering", "statusGalley", "statusMedbay", "statusMorgue", "statusNavigation", "statusScienceLab", "statusSonar", "statusSpecialOps", "statusWasteProcessing", "choiceAdventure2", "choiceAdventure3", "choiceAdventure4", "choiceAdventure5", "choiceAdventure6", "choiceAdventure7", "choiceAdventure8", "choiceAdventure9", "choiceAdventure10", "choiceAdventure11", "choiceAdventure12", "choiceAdventure14", "choiceAdventure15", "choiceAdventure16", "choiceAdventure17", "choiceAdventure18", "choiceAdventure19", "choiceAdventure20", "choiceAdventure21", "choiceAdventure22", "choiceAdventure23", "choiceAdventure24", "choiceAdventure25", "choiceAdventure26", "choiceAdventure27", "choiceAdventure28", "choiceAdventure29", "choiceAdventure40", "choiceAdventure41", "choiceAdventure42", "choiceAdventure45", "choiceAdventure46", "choiceAdventure47", "choiceAdventure71", "choiceAdventure72", "choiceAdventure73", "choiceAdventure74", "choiceAdventure75", "choiceAdventure76", "choiceAdventure77", "choiceAdventure86", "choiceAdventure87", "choiceAdventure88", "choiceAdventure89", "choiceAdventure90", "choiceAdventure91", "choiceAdventure105", "choiceAdventure106", "choiceAdventure107", "choiceAdventure108", "choiceAdventure109", "choiceAdventure110", "choiceAdventure111", "choiceAdventure112", "choiceAdventure113", "choiceAdventure114", "choiceAdventure115", "choiceAdventure116", "choiceAdventure117", "choiceAdventure118", "choiceAdventure120", "choiceAdventure123", "choiceAdventure125", "choiceAdventure126", "choiceAdventure127", "choiceAdventure129", "choiceAdventure131", "choiceAdventure132", "choiceAdventure135", "choiceAdventure136", "choiceAdventure137", "choiceAdventure138", "choiceAdventure139", "choiceAdventure140", "choiceAdventure141", "choiceAdventure142", "choiceAdventure143", "choiceAdventure144", "choiceAdventure145", "choiceAdventure146", "choiceAdventure147", "choiceAdventure148", "choiceAdventure149", "choiceAdventure151", "choiceAdventure152", "choiceAdventure153", "choiceAdventure154", "choiceAdventure155", "choiceAdventure156", "choiceAdventure157", "choiceAdventure158", "choiceAdventure159", "choiceAdventure160", "choiceAdventure161", "choiceAdventure162", "choiceAdventure163", "choiceAdventure164", "choiceAdventure165", "choiceAdventure166", "choiceAdventure167", "choiceAdventure168", "choiceAdventure169", "choiceAdventure170", "choiceAdventure171", "choiceAdventure172", "choiceAdventure177", "choiceAdventure178", "choiceAdventure180", "choiceAdventure181", "choiceAdventure182", "choiceAdventure184", "choiceAdventure185", "choiceAdventure186", "choiceAdventure187", "choiceAdventure188", "choiceAdventure189", "choiceAdventure191", "choiceAdventure197", "choiceAdventure198", "choiceAdventure199", "choiceAdventure200", "choiceAdventure201", "choiceAdventure202", "choiceAdventure203", "choiceAdventure204", "choiceAdventure205", "choiceAdventure206", "choiceAdventure207", "choiceAdventure208", "choiceAdventure211", "choiceAdventure212", "choiceAdventure213", "choiceAdventure214", "choiceAdventure215", "choiceAdventure216", "choiceAdventure217", "choiceAdventure218", "choiceAdventure219", "choiceAdventure220", "choiceAdventure221", "choiceAdventure222", "choiceAdventure223", "choiceAdventure224", "choiceAdventure225", "choiceAdventure230", "choiceAdventure272", "choiceAdventure273", "choiceAdventure276", "choiceAdventure277", "choiceAdventure278", "choiceAdventure279", "choiceAdventure280", "choiceAdventure281", "choiceAdventure282", "choiceAdventure283", "choiceAdventure284", "choiceAdventure285", "choiceAdventure286", "choiceAdventure287", "choiceAdventure288", "choiceAdventure289", "choiceAdventure290", "choiceAdventure291", "choiceAdventure292", "choiceAdventure293", "choiceAdventure294", "choiceAdventure295", "choiceAdventure296", "choiceAdventure297", "choiceAdventure298", "choiceAdventure299", "choiceAdventure302", "choiceAdventure303", "choiceAdventure304", "choiceAdventure305", "choiceAdventure306", "choiceAdventure307", "choiceAdventure308", "choiceAdventure309", "choiceAdventure310", "choiceAdventure311", "choiceAdventure317", "choiceAdventure318", "choiceAdventure319", "choiceAdventure320", "choiceAdventure321", "choiceAdventure322", "choiceAdventure326", "choiceAdventure327", "choiceAdventure328", "choiceAdventure329", "choiceAdventure330", "choiceAdventure331", "choiceAdventure332", "choiceAdventure333", "choiceAdventure334", "choiceAdventure335", "choiceAdventure336", "choiceAdventure337", "choiceAdventure338", "choiceAdventure339", "choiceAdventure340", "choiceAdventure341", "choiceAdventure342", "choiceAdventure343", "choiceAdventure344", "choiceAdventure345", "choiceAdventure346", "choiceAdventure347", "choiceAdventure348", "choiceAdventure349", "choiceAdventure350", "choiceAdventure351", "choiceAdventure352", "choiceAdventure353", "choiceAdventure354", "choiceAdventure355", "choiceAdventure356", "choiceAdventure357", "choiceAdventure358", "choiceAdventure360", "choiceAdventure361", "choiceAdventure362", "choiceAdventure363", "choiceAdventure364", "choiceAdventure365", "choiceAdventure366", "choiceAdventure367", "choiceAdventure372", "choiceAdventure376", "choiceAdventure387", "choiceAdventure388", "choiceAdventure389", "choiceAdventure390", "choiceAdventure391", "choiceAdventure392", "choiceAdventure393", "choiceAdventure395", "choiceAdventure396", "choiceAdventure397", "choiceAdventure398", "choiceAdventure399", "choiceAdventure400", "choiceAdventure401", "choiceAdventure402", "choiceAdventure403", "choiceAdventure423", "choiceAdventure424", "choiceAdventure425", "choiceAdventure426", "choiceAdventure427", "choiceAdventure428", "choiceAdventure429", "choiceAdventure430", "choiceAdventure431", "choiceAdventure432", "choiceAdventure433", "choiceAdventure435", "choiceAdventure438", "choiceAdventure439", "choiceAdventure442", "choiceAdventure444", "choiceAdventure445", "choiceAdventure446", "choiceAdventure447", "choiceAdventure448", "choiceAdventure449", "choiceAdventure451", "choiceAdventure452", "choiceAdventure453", "choiceAdventure454", "choiceAdventure455", "choiceAdventure456", "choiceAdventure457", "choiceAdventure458", "choiceAdventure460", "choiceAdventure461", "choiceAdventure462", "choiceAdventure463", "choiceAdventure464", "choiceAdventure465", "choiceAdventure467", "choiceAdventure468", "choiceAdventure469", "choiceAdventure470", "choiceAdventure471", "choiceAdventure472", "choiceAdventure473", "choiceAdventure474", "choiceAdventure475", "choiceAdventure477", "choiceAdventure478", "choiceAdventure480", "choiceAdventure483", "choiceAdventure484", "choiceAdventure485", "choiceAdventure486", "choiceAdventure488", "choiceAdventure489", "choiceAdventure490", "choiceAdventure491", "choiceAdventure496", "choiceAdventure497", "choiceAdventure502", "choiceAdventure503", "choiceAdventure504", "choiceAdventure505", "choiceAdventure506", "choiceAdventure507", "choiceAdventure509", "choiceAdventure510", "choiceAdventure511", "choiceAdventure512", "choiceAdventure513", "choiceAdventure514", "choiceAdventure515", "choiceAdventure517", "choiceAdventure518", "choiceAdventure519", "choiceAdventure521", "choiceAdventure522", "choiceAdventure523", "choiceAdventure527", "choiceAdventure528", "choiceAdventure529", "choiceAdventure530", "choiceAdventure531", "choiceAdventure532", "choiceAdventure533", "choiceAdventure534", "choiceAdventure535", "choiceAdventure536", "choiceAdventure538", "choiceAdventure539", "choiceAdventure542", "choiceAdventure543", "choiceAdventure544", "choiceAdventure546", "choiceAdventure548", "choiceAdventure549", "choiceAdventure550", "choiceAdventure551", "choiceAdventure552", "choiceAdventure553", "choiceAdventure554", "choiceAdventure556", "choiceAdventure557", "choiceAdventure558", "choiceAdventure559", "choiceAdventure560", "choiceAdventure561", "choiceAdventure562", "choiceAdventure563", "choiceAdventure564", "choiceAdventure565", "choiceAdventure566", "choiceAdventure567", "choiceAdventure568", "choiceAdventure569", "choiceAdventure571", "choiceAdventure572", "choiceAdventure573", "choiceAdventure574", "choiceAdventure575", "choiceAdventure576", "choiceAdventure577", "choiceAdventure578", "choiceAdventure579", "choiceAdventure581", "choiceAdventure582", "choiceAdventure583", "choiceAdventure584", "choiceAdventure594", "choiceAdventure595", "choiceAdventure596", "choiceAdventure597", "choiceAdventure598", "choiceAdventure599", "choiceAdventure600", "choiceAdventure603", "choiceAdventure604", "choiceAdventure616", "choiceAdventure634", "choiceAdventure640", "choiceAdventure654", "choiceAdventure655", "choiceAdventure656", "choiceAdventure657", "choiceAdventure658", "choiceAdventure664", "choiceAdventure669", "choiceAdventure670", "choiceAdventure671", "choiceAdventure672", "choiceAdventure673", "choiceAdventure674", "choiceAdventure675", "choiceAdventure676", "choiceAdventure677", "choiceAdventure678", "choiceAdventure679", "choiceAdventure681", "choiceAdventure683", "choiceAdventure684", "choiceAdventure685", "choiceAdventure686", "choiceAdventure687", "choiceAdventure688", "choiceAdventure689", "choiceAdventure690", "choiceAdventure691", "choiceAdventure692", "choiceAdventure693", "choiceAdventure694", "choiceAdventure695", "choiceAdventure696", "choiceAdventure697", "choiceAdventure698", "choiceAdventure700", "choiceAdventure701", "choiceAdventure705", "choiceAdventure706", "choiceAdventure707", "choiceAdventure708", "choiceAdventure709", "choiceAdventure710", "choiceAdventure711", "choiceAdventure712", "choiceAdventure713", "choiceAdventure714", "choiceAdventure715", "choiceAdventure716", "choiceAdventure717", "choiceAdventure721", "choiceAdventure725", "choiceAdventure729", "choiceAdventure733", "choiceAdventure737", "choiceAdventure741", "choiceAdventure745", "choiceAdventure749", "choiceAdventure753", "choiceAdventure771", "choiceAdventure778", "choiceAdventure780", "choiceAdventure781", "choiceAdventure783", "choiceAdventure784", "choiceAdventure785", "choiceAdventure786", "choiceAdventure787", "choiceAdventure788", "choiceAdventure789", "choiceAdventure791", "choiceAdventure793", "choiceAdventure794", "choiceAdventure795", "choiceAdventure796", "choiceAdventure797", "choiceAdventure803", "choiceAdventure805", "choiceAdventure808", "choiceAdventure809", "choiceAdventure813", "choiceAdventure815", "choiceAdventure830", "choiceAdventure832", "choiceAdventure833", "choiceAdventure834", "choiceAdventure835", "choiceAdventure837", "choiceAdventure838", "choiceAdventure839", "choiceAdventure840", "choiceAdventure841", "choiceAdventure842", "choiceAdventure851", "choiceAdventure852", "choiceAdventure853", "choiceAdventure854", "choiceAdventure855", "choiceAdventure856", "choiceAdventure857", "choiceAdventure858", "choiceAdventure866", "choiceAdventure873", "choiceAdventure875", "choiceAdventure876", "choiceAdventure877", "choiceAdventure878", "choiceAdventure879", "choiceAdventure880", "choiceAdventure881", "choiceAdventure882", "choiceAdventure888", "choiceAdventure889", "choiceAdventure918", "choiceAdventure919", "choiceAdventure920", "choiceAdventure921", "choiceAdventure923", "choiceAdventure924", "choiceAdventure925", "choiceAdventure926", "choiceAdventure927", "choiceAdventure928", "choiceAdventure929", "choiceAdventure930", "choiceAdventure931", "choiceAdventure932", "choiceAdventure940", "choiceAdventure941", "choiceAdventure942", "choiceAdventure943", "choiceAdventure944", "choiceAdventure945", "choiceAdventure946", "choiceAdventure950", "choiceAdventure955", "choiceAdventure957", "choiceAdventure958", "choiceAdventure959", "choiceAdventure960", "choiceAdventure961", "choiceAdventure962", "choiceAdventure963", "choiceAdventure964", "choiceAdventure965", "choiceAdventure966", "choiceAdventure970", "choiceAdventure973", "choiceAdventure974", "choiceAdventure975", "choiceAdventure976", "choiceAdventure977", "choiceAdventure979", "choiceAdventure980", "choiceAdventure981", "choiceAdventure982", "choiceAdventure983", "choiceAdventure988", "choiceAdventure989", "choiceAdventure993", "choiceAdventure998", "choiceAdventure1000", "choiceAdventure1003", "choiceAdventure1005", "choiceAdventure1006", "choiceAdventure1007", "choiceAdventure1008", "choiceAdventure1009", "choiceAdventure1010", "choiceAdventure1011", "choiceAdventure1012", "choiceAdventure1013", "choiceAdventure1015", "choiceAdventure1016", "choiceAdventure1017", "choiceAdventure1018", "choiceAdventure1019", "choiceAdventure1020", "choiceAdventure1021", "choiceAdventure1022", "choiceAdventure1023", "choiceAdventure1026", "choiceAdventure1027", "choiceAdventure1028", "choiceAdventure1029", "choiceAdventure1030", "choiceAdventure1031", "choiceAdventure1032", "choiceAdventure1033", "choiceAdventure1034", "choiceAdventure1035", "choiceAdventure1036", "choiceAdventure1037", "choiceAdventure1038", "choiceAdventure1039", "choiceAdventure1040", "choiceAdventure1041", "choiceAdventure1042", "choiceAdventure1044", "choiceAdventure1045", "choiceAdventure1046", "choiceAdventure1048", "choiceAdventure1051", "choiceAdventure1052", "choiceAdventure1053", "choiceAdventure1054", "choiceAdventure1055", "choiceAdventure1056", "choiceAdventure1057", "choiceAdventure1059", "choiceAdventure1060", "choiceAdventure1061", "choiceAdventure1062", "choiceAdventure1065", "choiceAdventure1067", "choiceAdventure1068", "choiceAdventure1069", "choiceAdventure1070", "choiceAdventure1071", "choiceAdventure1073", "choiceAdventure1077", "choiceAdventure1080", "choiceAdventure1081", "choiceAdventure1082", "choiceAdventure1083", "choiceAdventure1084", "choiceAdventure1085", "choiceAdventure1091", "choiceAdventure1094", "choiceAdventure1095", "choiceAdventure1096", "choiceAdventure1097", "choiceAdventure1102", "choiceAdventure1106", "choiceAdventure1107", "choiceAdventure1108", "choiceAdventure1110", "choiceAdventure1114", "choiceAdventure1115", "choiceAdventure1116", "choiceAdventure1118", "choiceAdventure1119", "choiceAdventure1120", "choiceAdventure1121", "choiceAdventure1122", "choiceAdventure1123", "choiceAdventure1171", "choiceAdventure1172", "choiceAdventure1173", "choiceAdventure1174", "choiceAdventure1175", "choiceAdventure1193", "choiceAdventure1195", "choiceAdventure1196", "choiceAdventure1197", "choiceAdventure1198", "choiceAdventure1199", "choiceAdventure1202", "choiceAdventure1203", "choiceAdventure1204", "choiceAdventure1205", "choiceAdventure1206", "choiceAdventure1207", "choiceAdventure1208", "choiceAdventure1209", "choiceAdventure1210", "choiceAdventure1211", "choiceAdventure1212", "choiceAdventure1213", "choiceAdventure1214", "choiceAdventure1215", "choiceAdventure1219", "choiceAdventure1222", "choiceAdventure1223", "choiceAdventure1224", "choiceAdventure1225", "choiceAdventure1226", "choiceAdventure1227", "choiceAdventure1228", "choiceAdventure1229", "choiceAdventure1236", "choiceAdventure1237", "choiceAdventure1238", "choiceAdventure1239", "choiceAdventure1240", "choiceAdventure1241", "choiceAdventure1242", "choiceAdventure1243", "choiceAdventure1244", "choiceAdventure1245", "choiceAdventure1246", "choiceAdventure1247", "choiceAdventure1248", "choiceAdventure1249", "choiceAdventure1250", "choiceAdventure1251", "choiceAdventure1252", "choiceAdventure1253", "choiceAdventure1254", "choiceAdventure1255", "choiceAdventure1256", "choiceAdventure1266", "choiceAdventure1280", "choiceAdventure1281", "choiceAdventure1282", "choiceAdventure1283", "choiceAdventure1284", "choiceAdventure1285", "choiceAdventure1286", "choiceAdventure1287", "choiceAdventure1288", "choiceAdventure1289", "choiceAdventure1290", "choiceAdventure1291", "choiceAdventure1292", "choiceAdventure1293", "choiceAdventure1294", "choiceAdventure1295", "choiceAdventure1296", "choiceAdventure1297", "choiceAdventure1298", "choiceAdventure1299", "choiceAdventure1300", "choiceAdventure1301", "choiceAdventure1302", "choiceAdventure1303", "choiceAdventure1304", "choiceAdventure1305", "choiceAdventure1307", "choiceAdventure1310", "choiceAdventure1312", "choiceAdventure1313", "choiceAdventure1314", "choiceAdventure1315", "choiceAdventure1316", "choiceAdventure1317", "choiceAdventure1318", "choiceAdventure1319", "choiceAdventure1321", "choiceAdventure1322", "choiceAdventure1323", "choiceAdventure1324", "choiceAdventure1325", "choiceAdventure1326", "choiceAdventure1327", "choiceAdventure1328", "choiceAdventure1332", "choiceAdventure1333", "choiceAdventure1335", "choiceAdventure1340", "choiceAdventure1341", "choiceAdventure1345", "choiceAdventure1389", "choiceAdventure1392", "choiceAdventure1397", "choiceAdventure1399", "choiceAdventure1405", "choiceAdventure1411", "choiceAdventure1415", "choiceAdventure1427", "choiceAdventure1428", "choiceAdventure1429", "choiceAdventure1430", "choiceAdventure1431", "choiceAdventure1432", "choiceAdventure1433", "choiceAdventure1434", "choiceAdventure1436", "choiceAdventure1460", "choiceAdventure1461", "choiceAdventure1467", "choiceAdventure1468", "choiceAdventure1469", "choiceAdventure1470", "choiceAdventure1471", "choiceAdventure1472", "choiceAdventure1473", "choiceAdventure1474", "choiceAdventure1475"];
var familiarProperties = ["commaFamiliar", "nextQuantumFamiliar", "stillsuitFamiliar"];
var statProperties = ["nsChallenge1", "snojoSetting"];
var phylumProperties = ["dnaSyringe", "locketPhylum", "redSnapperPhylum"];
;// CONCATENATED MODULE: ./node_modules/libram/dist/propertyTyping.js

var booleanPropertiesSet = new Set(booleanProperties);
var numericPropertiesSet = new Set(numericProperties);
var numericOrStringPropertiesSet = new Set(numericOrStringProperties);
var stringPropertiesSet = new Set(stringProperties);
var locationPropertiesSet = new Set(locationProperties);
var monsterPropertiesSet = new Set(monsterProperties);
var familiarPropertiesSet = new Set(familiarProperties);
var statPropertiesSet = new Set(statProperties);
var phylumPropertiesSet = new Set(phylumProperties);
function isBooleanProperty(property) {
  return booleanPropertiesSet.has(property);
}
function isNumericProperty(property) {
  return numericPropertiesSet.has(property);
}
function isNumericOrStringProperty(property) {
  return numericOrStringPropertiesSet.has(property);
}
function isStringProperty(property) {
  return stringPropertiesSet.has(property);
}
function isLocationProperty(property) {
  return locationPropertiesSet.has(property);
}
function isMonsterProperty(property) {
  return monsterPropertiesSet.has(property);
}
function isFamiliarProperty(property) {
  return familiarPropertiesSet.has(property);
}
function isStatProperty(property) {
  return statPropertiesSet.has(property);
}
function isPhylumProperty(property) {
  return phylumPropertiesSet.has(property);
}
;// CONCATENATED MODULE: ./node_modules/libram/dist/property.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var createPropertyGetter = transform => (property, default_) => {
  var value = (0,external_kolmafia_namespaceObject.getProperty)(property);

  if (default_ !== undefined && value === "") {
    return default_;
  }

  return transform(value, property);
};

var createMafiaClassPropertyGetter = (Type, toType) => createPropertyGetter(value => {
  if (value === "") return null;
  var v = toType(value);
  return v === Type.none ? null : v;
});

var getString = createPropertyGetter(value => value);
var getCommaSeparated = createPropertyGetter(value => value.split(/, ?/));
var getBoolean = createPropertyGetter(value => value === "true");
var getNumber = createPropertyGetter(value => Number(value));
var getBounty = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Bounty, external_kolmafia_namespaceObject.toBounty);
var getClass = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Class, external_kolmafia_namespaceObject.toClass);
var getCoinmaster = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Coinmaster, external_kolmafia_namespaceObject.toCoinmaster);
var getEffect = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Effect, external_kolmafia_namespaceObject.toEffect);
var getElement = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Element, external_kolmafia_namespaceObject.toElement);
var getFamiliar = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Familiar, external_kolmafia_namespaceObject.toFamiliar);
var getItem = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Item, external_kolmafia_namespaceObject.toItem);
var getLocation = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Location, external_kolmafia_namespaceObject.toLocation);
var getMonster = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Monster, external_kolmafia_namespaceObject.toMonster);
var getPhylum = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Phylum, external_kolmafia_namespaceObject.toPhylum);
var getServant = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Servant, external_kolmafia_namespaceObject.toServant);
var getSkill = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Skill, external_kolmafia_namespaceObject.toSkill);
var getSlot = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Slot, external_kolmafia_namespaceObject.toSlot);
var getStat = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Stat, external_kolmafia_namespaceObject.toStat);
var getThrall = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Thrall, external_kolmafia_namespaceObject.toThrall);
function property_get(property, _default) {
  var value = getString(property); // Handle known properties.

  if (isBooleanProperty(property)) {
    var _getBoolean;

    return (_getBoolean = getBoolean(property, _default)) !== null && _getBoolean !== void 0 ? _getBoolean : false;
  } else if (isNumericProperty(property)) {
    var _getNumber;

    return (_getNumber = getNumber(property, _default)) !== null && _getNumber !== void 0 ? _getNumber : 0;
  } else if (isNumericOrStringProperty(property)) {
    return value.match(/^\d+$/) ? parseInt(value) : value;
  } else if (isLocationProperty(property)) {
    return getLocation(property, _default);
  } else if (isMonsterProperty(property)) {
    return getMonster(property, _default);
  } else if (isFamiliarProperty(property)) {
    return getFamiliar(property, _default);
  } else if (isStatProperty(property)) {
    return getStat(property, _default);
  } else if (isPhylumProperty(property)) {
    return getPhylum(property, _default);
  } else if (isStringProperty(property)) {
    return value;
  } // Not a KnownProperty from here on out.


  if (_default instanceof external_kolmafia_namespaceObject.Location) {
    return getLocation(property, _default);
  } else if (_default instanceof external_kolmafia_namespaceObject.Monster) {
    return getMonster(property, _default);
  } else if (_default instanceof external_kolmafia_namespaceObject.Familiar) {
    return getFamiliar(property, _default);
  } else if (_default instanceof external_kolmafia_namespaceObject.Stat) {
    return getStat(property, _default);
  } else if (_default instanceof external_kolmafia_namespaceObject.Phylum) {
    return getPhylum(property, _default);
  } else if (typeof _default === "boolean") {
    return value === "true" ? true : value === "false" ? false : _default;
  } else if (typeof _default === "number") {
    return value === "" ? _default : parseInt(value);
  } else if (value === "") {
    return _default === undefined ? "" : _default;
  } else {
    return value;
  }
} // eslint-disable-next-line @typescript-eslint/no-explicit-any

function _set(property, value) {
  var stringValue = value === null ? "" : value.toString();
  (0,external_kolmafia_namespaceObject.setProperty)(property, stringValue);
}


function setProperties(properties) {
  for (var _i = 0, _Object$entries = Object.entries(properties); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        prop = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    _set(prop, value);
  }
}
function withProperties(properties, callback) {
  var propertiesBackup = Object.fromEntries(Object.entries(properties).map(_ref => {
    var _ref2 = _slicedToArray(_ref, 1),
        prop = _ref2[0];

    return [prop, property_get(prop)];
  }));
  setProperties(properties);

  try {
    callback();
  } finally {
    setProperties(propertiesBackup);
  }
}
function withProperty(property, value, callback) {
  withProperties(_defineProperty({}, property, value), callback);
}
function withChoices(choices, callback) {
  var properties = Object.fromEntries(Object.entries(choices).map(_ref3 => {
    var _ref4 = _slicedToArray(_ref3, 2),
        choice = _ref4[0],
        option = _ref4[1];

    return ["choiceAdventure".concat(choice), option];
  }));
  withProperties(properties, callback);
}
function withChoice(choice, value, callback) {
  withChoices(_defineProperty({}, choice, value), callback);
}
var PropertiesManager = /*#__PURE__*/function () {
  function PropertiesManager() {
    _classCallCheck(this, PropertiesManager);

    _defineProperty(this, "properties", {});
  }

  _createClass(PropertiesManager, [{
    key: "storedValues",
    get: function get() {
      return this.properties;
    }
    /**
     * Sets a collection of properties to the given values, storing the old values.
     * @param propertiesToSet A Properties object, keyed by property name.
     */

  }, {
    key: "set",
    value: function set(propertiesToSet) {
      for (var _i2 = 0, _Object$entries2 = Object.entries(propertiesToSet); _i2 < _Object$entries2.length; _i2++) {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
            propertyName = _Object$entries2$_i[0],
            propertyValue = _Object$entries2$_i[1];

        if (this.properties[propertyName] === undefined) {
          this.properties[propertyName] = property_get(propertyName);
        }

        _set(propertyName, propertyValue);
      }
    }
    /**
     * Sets a collection of choice adventure properties to the given values, storing the old values.
     * @param choicesToSet An object keyed by choice adventure number.
     */

  }, {
    key: "setChoices",
    value: function setChoices(choicesToSet) {
      this.set(Object.fromEntries(Object.entries(choicesToSet).map(_ref5 => {
        var _ref6 = _slicedToArray(_ref5, 2),
            choiceNumber = _ref6[0],
            choiceValue = _ref6[1];

        return ["choiceAdventure".concat(choiceNumber), choiceValue];
      })));
    }
    /**
     * Sets a single choice adventure property to the given value, storing the old value.
     * @param choiceToSet The number of the choice adventure to set the property for.
     * @param value The value to assign to that choice adventure.
     */

  }, {
    key: "setChoice",
    value: function setChoice(choiceToSet, value) {
      this.setChoices(_defineProperty({}, choiceToSet, value));
    }
    /**
     * Resets the given properties to their original stored value. Does not delete entries from the manager.
     * @param properties Collection of properties to reset.
     */

  }, {
    key: "reset",
    value: function reset() {
      for (var _len = arguments.length, properties = new Array(_len), _key = 0; _key < _len; _key++) {
        properties[_key] = arguments[_key];
      }

      for (var _i3 = 0, _properties = properties; _i3 < _properties.length; _i3++) {
        var property = _properties[_i3];
        var value = this.properties[property];

        if (value) {
          _set(property, value);
        }
      }
    }
    /**
     * Iterates over all stored values, setting each property back to its original stored value. Does not delete entries from the manager.
     */

  }, {
    key: "resetAll",
    value: function resetAll() {
      setProperties(this.properties);
    }
    /**
     * Stops storing the original values of inputted properties.
     * @param properties Properties for the manager to forget.
     */

  }, {
    key: "clear",
    value: function clear() {
      for (var _len2 = arguments.length, properties = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        properties[_key2] = arguments[_key2];
      }

      for (var _i4 = 0, _properties2 = properties; _i4 < _properties2.length; _i4++) {
        var property = _properties2[_i4];

        if (this.properties[property]) {
          delete this.properties[property];
        }
      }
    }
    /**
     * Clears all properties.
     */

  }, {
    key: "clearAll",
    value: function clearAll() {
      this.properties = {};
    }
    /**
     * Increases a numeric property to the given value if necessary.
     * @param property The numeric property we want to potentially raise.
     * @param value The minimum value we want that property to have.
     * @returns Whether we needed to change the property.
     */

  }, {
    key: "setMinimumValue",
    value: function setMinimumValue(property, value) {
      if (property_get(property, 0) < value) {
        this.set(_defineProperty({}, property, value));
        return true;
      }

      return false;
    }
    /**
     * Decrease a numeric property to the given value if necessary.
     * @param property The numeric property we want to potentially lower.
     * @param value The maximum value we want that property to have.
     * @returns Whether we needed to change the property.
     */

  }, {
    key: "setMaximumValue",
    value: function setMaximumValue(property, value) {
      if (property_get(property, 0) > value) {
        this.set(_defineProperty({}, property, value));
        return true;
      }

      return false;
    }
    /**
     * Creates a new PropertiesManager with identical stored values to this one.
     * @returns A new PropertiesManager, with identical stored values to this one.
     */

  }, {
    key: "clone",
    value: function clone() {
      var newGuy = new PropertiesManager();
      newGuy.properties = this.storedValues;
      return newGuy;
    }
    /**
     * Clamps a numeric property, modulating it up or down to fit within a specified range
     * @param property The numeric property to clamp
     * @param min The lower bound for what we want the property to be allowed to be.
     * @param max The upper bound for what we want the property to be allowed to be.
     * @returns Whether we ended up changing the property or not.
     */

  }, {
    key: "clamp",
    value: function clamp(property, min, max) {
      if (max < min) return false;
      var start = property_get(property);
      this.setMinimumValue(property, min);
      this.setMaximumValue(property, max);
      return start !== property_get(property);
    }
    /**
     * Determines whether this PropertiesManager has identical stored values to another.
     * @param other The PropertiesManager to compare to this one.
     * @returns Whether their StoredValues are identical.
     */

  }, {
    key: "equals",
    value: function equals(other) {
      var thisProps = Object.entries(this.storedValues);
      var otherProps = new Map(Object.entries(other.storedValues));
      if (thisProps.length !== otherProps.size) return false;

      for (var _i5 = 0, _thisProps = thisProps; _i5 < _thisProps.length; _i5++) {
        var _thisProps$_i = _slicedToArray(_thisProps[_i5], 2),
            propertyName = _thisProps$_i[0],
            propertyValue = _thisProps$_i[1];

        if (otherProps.get(propertyName) === propertyValue) return false;
      }

      return true;
    }
    /**
     * Merges a PropertiesManager onto this one, letting the input win in the event that both PropertiesManagers have a value stored.
     * @param other The PropertiesManager to be merged onto this one.
     * @returns A new PropertiesManager with stored values from both its parents.
     */

  }, {
    key: "merge",
    value: function merge(other) {
      var newGuy = new PropertiesManager();
      newGuy.properties = _objectSpread(_objectSpread({}, this.properties), other.properties);
      return newGuy;
    }
    /**
     * Merges an arbitrary collection of PropertiesManagers, letting the rightmost PropertiesManager win in the event of verlap.
     * @param mergees The PropertiesManagers to merge together.
     * @returns A PropertiesManager that is just an amalgam of all the constituents.
     */

  }], [{
    key: "merge",
    value: function merge() {
      for (var _len3 = arguments.length, mergees = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        mergees[_key3] = arguments[_key3];
      }

      if (mergees.length === 0) return new PropertiesManager();
      return mergees.reduce((a, b) => a.merge(b));
    }
  }]);

  return PropertiesManager;
}();
;// CONCATENATED MODULE: ./node_modules/grimoire-kolmafia/dist/args.js
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = args_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function args_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return args_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return args_arrayLikeToArray(o, minLen); }

function args_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function args_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function args_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { args_ownKeys(Object(source), true).forEach(function (key) { args_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { args_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function args_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function args_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function args_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function args_createClass(Constructor, protoProps, staticProps) { if (protoProps) args_defineProperties(Constructor.prototype, protoProps); if (staticProps) args_defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable @typescript-eslint/no-explicit-any */


var Args = /*#__PURE__*/function () {
  function Args() {
    args_classCallCheck(this, Args);
  }

  args_createClass(Args, null, [{
    key: "custom",
    value: function custom(spec, _parser, valueHelpName) {
      var _a, _b;

      var raw_options = (_a = spec.options) === null || _a === void 0 ? void 0 : _a.map(option => option[0]); // Check that the default value actually appears in the options.

      if ("default" in spec && raw_options) {
        if (!raw_options.includes(spec.default)) {
          throw "Invalid default value ".concat(spec.default);
        }
      }

      return args_objectSpread(args_objectSpread({}, spec), {}, {
        valueHelpName: valueHelpName,
        parser: value => {
          var parsed_value = _parser(value);

          if (parsed_value === undefined || parsed_value instanceof ParseError) return parsed_value;

          if (raw_options) {
            if (!raw_options.includes(parsed_value)) {
              return new ParseError("received ".concat(value, " which was not in the allowed options"));
            }
          }

          return parsed_value;
        },
        options: (_b = spec.options) === null || _b === void 0 ? void 0 : _b.map(a => ["".concat(a[0]), a[1]])
      });
    }
  }, {
    key: "arrayFromArg",
    value: function arrayFromArg(spec, argFromSpec) {
      var _a, _b, _c; // First, construct a non-array version of this argument.
      // We do this by calling argFromSpec in order to extract the parser and
      // valueHelpName (to make it easier to define the functions below).
      //
      // The default argument of an ArraySpec is of type T[], which causes
      // problems, so we must remove it.


      var spec_without_default = args_objectSpread({}, spec); // Avoid "the operand of a 'delete' operator must be optional"


      if ("default" in spec_without_default) delete spec_without_default["default"];
      var arg = argFromSpec.call(this, spec_without_default); // Next, check that all default values actually appear in the options.

      var raw_options = (_a = spec.options) === null || _a === void 0 ? void 0 : _a.map(option => option[0]);

      if ("default" in spec && raw_options) {
        var _iterator = _createForOfIteratorHelper(spec.default),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var default_entry = _step.value;
            if (!raw_options.includes(default_entry)) throw "Invalid default value ".concat(spec.default);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      var separator = (_b = spec.separator) !== null && _b !== void 0 ? _b : ",";

      var arrayParser = value => {
        // Split the array
        var values = value.split(separator);
        if (!spec.noTrim) values = values.map(v => v.trim()); // Parse all values, return the first error found if any

        var result = values.map(v => arg.parser(v));
        var error = result.find(v => v instanceof ParseError);
        if (error) return error;
        var failure_index = result.indexOf(undefined);
        if (failure_index !== -1) return new ParseError("components expected ".concat(arg.parser.name, "$ but could not parse ").concat(values[failure_index])); // Otherwise, all values are good

        return result;
      };

      return args_objectSpread(args_objectSpread({}, spec), {}, {
        valueHelpName: "".concat(arg.valueHelpName).concat(separator, " ").concat(arg.valueHelpName).concat(separator, " ..."),
        parser: arrayParser,
        options: (_c = spec.options) === null || _c === void 0 ? void 0 : _c.map(a => ["".concat(a[0]), a[1]])
      });
    }
  }, {
    key: "string",
    value: function string(spec) {
      return this.custom(spec, value => value, "TEXT");
    }
  }, {
    key: "strings",
    value: function strings(spec) {
      return this.arrayFromArg(spec, this.string);
    }
  }, {
    key: "number",
    value: function number(spec) {
      return this.custom(spec, value => isNaN(Number(value)) ? undefined : Number(value), "NUMBER");
    }
  }, {
    key: "numbers",
    value: function numbers(spec) {
      return this.arrayFromArg(spec, this.number);
    }
  }, {
    key: "boolean",
    value: function boolean(spec) {
      return this.custom(spec, value => {
        if (value.toLowerCase() === "true") return true;
        if (value.toLowerCase() === "false") return false;
        return undefined;
      }, "BOOLEAN");
    }
  }, {
    key: "booleans",
    value: function booleans(spec) {
      return this.arrayFromArg(spec, this.boolean);
    }
  }, {
    key: "flag",
    value: function flag(spec) {
      return this.custom(spec, value => {
        if (value.toLowerCase() === "true") return true;
        if (value.toLowerCase() === "false") return false;
        return undefined;
      }, "FLAG");
    }
  }, {
    key: "class",
    value: function _class(spec) {
      return this.custom(spec, value => {
        var match = external_kolmafia_namespaceObject.Class.get(value); // Class.get does fuzzy matching:
        //  e.g. Class.get("sc") returns disco bandit.
        // To avoid this foot-gun, only return exact matches or id lookups.

        if (match.toString().toUpperCase() === value.toString().toUpperCase()) return match;
        if (!isNaN(Number(value))) return match;
        return undefined;
      }, "CLASS");
    }
  }, {
    key: "classes",
    value: function classes(spec) {
      return this.arrayFromArg(spec, this.class);
    }
  }, {
    key: "effect",
    value: function effect(spec) {
      return this.custom(spec, external_kolmafia_namespaceObject.Effect.get, "EFFECT");
    }
  }, {
    key: "effects",
    value: function effects(spec) {
      return this.arrayFromArg(spec, this.effect);
    }
  }, {
    key: "familiar",
    value: function familiar(spec) {
      return this.custom(spec, external_kolmafia_namespaceObject.Familiar.get, "FAMILIAR");
    }
  }, {
    key: "familiars",
    value: function familiars(spec) {
      return this.arrayFromArg(spec, this.familiar);
    }
  }, {
    key: "item",
    value: function item(spec) {
      return this.custom(spec, external_kolmafia_namespaceObject.Item.get, "ITEM");
    }
  }, {
    key: "items",
    value: function items(spec) {
      return this.arrayFromArg(spec, this.item);
    }
  }, {
    key: "location",
    value: function location(spec) {
      return this.custom(spec, external_kolmafia_namespaceObject.Location.get, "LOCATION");
    }
  }, {
    key: "locations",
    value: function locations(spec) {
      return this.arrayFromArg(spec, this.location);
    }
  }, {
    key: "monster",
    value: function monster(spec) {
      return this.custom(spec, external_kolmafia_namespaceObject.Monster.get, "MONSTER");
    }
  }, {
    key: "monsters",
    value: function monsters(spec) {
      return this.arrayFromArg(spec, this.monster);
    }
  }, {
    key: "path",
    value: function path(spec) {
      return this.custom(spec, external_kolmafia_namespaceObject.Path.get, "PATH");
    }
  }, {
    key: "paths",
    value: function paths(spec) {
      return this.arrayFromArg(spec, this.path);
    }
  }, {
    key: "skill",
    value: function skill(spec) {
      return this.custom(spec, external_kolmafia_namespaceObject.Skill.get, "SKILL");
    }
  }, {
    key: "skills",
    value: function skills(spec) {
      return this.arrayFromArg(spec, this.skill);
    }
    /**
     * Create a group of arguments that will be printed separately in the help.
     *
     * Note that keys in the group must still be globally distinct.
     *
     * @param groupName The display name for the group in help.
     * @param args A JS object specifying the script arguments. Its values should
     *    be {@link Arg} objects (created by Args.string, Args.number, or others)
     *    or groups of arguments (created by Args.group).
     */

  }, {
    key: "group",
    value: function group(groupName, args) {
      return {
        name: groupName,
        args: args
      };
    }
    /**
     * Create a set of input arguments for a script.
     * @param scriptName Prefix for property names; often the name of the script.
     * @param scriptHelp Brief description of this script, for the help message.
     * @param args A JS object specifying the script arguments. Its values should
     *    be {@link Arg} objects (created by Args.string, Args.number, or others)
     *    or groups of arguments (created by Args.group).
     * @param options Config options for the args and arg parser.
     * @returns An object which can hold parsed argument values. The keys of this
     *    object are identical to the keys in 'args'.
     */

  }, {
    key: "create",
    value: function create(scriptName, scriptHelp, args, options) {
      var _objectSpread2;

      _traverse(args, (keySpec, key) => {
        if (key === "help" || keySpec.key === "help") throw "help is a reserved argument name";
      });

      var argsWithHelp = args_objectSpread(args_objectSpread({}, args), {}, {
        help: this.flag({
          help: "Show this message and exit.",
          setting: ""
        })
      }); // Create an object to hold argument results, with a default value for
      // each argument.


      var res = args_objectSpread(args_objectSpread({}, _loadDefaultValues(argsWithHelp)), {}, (_objectSpread2 = {}, args_defineProperty(_objectSpread2, specSymbol, argsWithHelp), args_defineProperty(_objectSpread2, scriptSymbol, scriptName), args_defineProperty(_objectSpread2, scriptHelpSymbol, scriptHelp), args_defineProperty(_objectSpread2, optionsSymbol, options !== null && options !== void 0 ? options : {}), _objectSpread2));

      var metadata = Args.getMetadata(res); // Parse values from settings.

      metadata.traverseAndMaybeSet(res, (keySpec, key) => {
        var _a, _b;

        var setting = (_a = keySpec.setting) !== null && _a !== void 0 ? _a : "".concat(scriptName, "_").concat((_b = keySpec.key) !== null && _b !== void 0 ? _b : key);
        if (setting === "") return undefined; // no setting

        var value_str = property_get(setting, "");
        if (value_str === "") return undefined; // no setting

        return parseAndValidate(keySpec, "Setting ".concat(setting), value_str);
      });

      if (options === null || options === void 0 ? void 0 : options.positionalArgs) {
        var keys = [];
        metadata.traverse((keySpec, key) => {
          var _a;

          keys.push((_a = keySpec.key) !== null && _a !== void 0 ? _a : key);
        });

        var _iterator2 = _createForOfIteratorHelper(options.positionalArgs),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var arg = _step2.value;
            if (!keys.includes(arg)) throw "Unknown key for positional arg: ".concat(arg);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }

      return res;
    }
    /**
     * Parse the command line input into the provided script arguments.
     * @param args An object to hold the parsed argument values, from Args.create(*).
     * @param command The command line input.
     */

  }, {
    key: "fill",
    value: function fill(args, command) {
      var _a;

      if (command === undefined || command === "") return;
      var metadata = Args.getMetadata(args); // Load the list of keys and flags from the arg spec

      var keys = new Set();
      var flags = new Set();
      metadata.traverse((keySpec, key) => {
        var _a;

        var name = (_a = keySpec.key) !== null && _a !== void 0 ? _a : key;
        if (flags.has(name) || keys.has(name)) throw "Duplicate arg key ".concat(name, " is not allowed");
        if (keySpec.valueHelpName === "FLAG") flags.add(name);else keys.add(name);
      }); // Parse new argments from the command line

      var parsed = new CommandParser(command, keys, flags, (_a = metadata.options.positionalArgs) !== null && _a !== void 0 ? _a : []).parse();
      metadata.traverseAndMaybeSet(args, (keySpec, key) => {
        var _a;

        var argKey = (_a = keySpec.key) !== null && _a !== void 0 ? _a : key;
        var value_str = parsed.get(argKey);
        if (value_str === undefined) return undefined; // no setting

        return parseAndValidate(keySpec, "Argument ".concat(argKey), value_str);
      });
    }
    /**
     * Parse command line input into a new set of script arguments.
     * @param scriptName Prefix to use in property names; typically the name of the script.
     * @param scriptHelp Brief description of this script, for the help message.
     * @param spec An object specifying the script arguments.
     * @param command The command line input.
     * @param options Config options for the args and arg parser.
     */

  }, {
    key: "parse",
    value: function parse(scriptName, scriptHelp, spec, command, options) {
      var args = this.create(scriptName, scriptHelp, spec, options);
      this.fill(args, command);
      return args;
    }
    /**
     * Print a description of the script arguments to the CLI.
     *
     * First, all top-level argument descriptions are printed in the order they
     * were defined. Afterwards, descriptions for groups of arguments are printed
     * in the order they were defined.
     *
     * @param args An object of parsed arguments, from Args.create(*).
     * @param maxOptionsToDisplay If given, do not list more than this many options for each arg.
     */

  }, {
    key: "showHelp",
    value: function showHelp(args, maxOptionsToDisplay) {
      var _a;

      var metadata = Args.getMetadata(args);
      (0,external_kolmafia_namespaceObject.printHtml)("".concat(metadata.scriptHelp));
      (0,external_kolmafia_namespaceObject.printHtml)("");
      (0,external_kolmafia_namespaceObject.printHtml)("<b>".concat((_a = metadata.options.defaultGroupName) !== null && _a !== void 0 ? _a : "Options", ":</b>"));
      metadata.traverse((arg, key) => {
        var _a, _b, _c, _d, _e;

        if (arg.hidden) return;
        var nameText = "<font color='blue'>".concat((_a = arg.key) !== null && _a !== void 0 ? _a : key, "</font>");
        var valueText = arg.valueHelpName === "FLAG" ? "" : "<font color='purple'>".concat(arg.valueHelpName, "</font>");
        var helpText = (_b = arg.help) !== null && _b !== void 0 ? _b : "";
        var defaultText = "default" in arg ? "<font color='#888888'>[default: ".concat(arg.default, "]</font>") : "";
        var settingText = arg.setting === "" ? "" : "<font color='#888888'>[setting: ".concat((_c = arg.setting) !== null && _c !== void 0 ? _c : "".concat(metadata.scriptName, "_").concat((_d = arg.key) !== null && _d !== void 0 ? _d : key), "]</font>");
        (0,external_kolmafia_namespaceObject.printHtml)("&nbsp;&nbsp;".concat([nameText, valueText, "-", helpText, defaultText, settingText].join(" ")));
        var valueOptions = (_e = arg.options) !== null && _e !== void 0 ? _e : [];

        if (valueOptions.length < (maxOptionsToDisplay !== null && maxOptionsToDisplay !== void 0 ? maxOptionsToDisplay : Number.MAX_VALUE)) {
          var _iterator3 = _createForOfIteratorHelper(valueOptions),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var option = _step3.value;

              if (option.length === 1) {
                (0,external_kolmafia_namespaceObject.printHtml)("&nbsp;&nbsp;&nbsp;&nbsp;<font color='blue'>".concat(nameText, "</font> ").concat(option[0]));
              } else {
                (0,external_kolmafia_namespaceObject.printHtml)("&nbsp;&nbsp;&nbsp;&nbsp;<font color='blue'>".concat(nameText, "</font> ").concat(option[0], " - ").concat(option[1]));
              }
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }
      }, group => {
        (0,external_kolmafia_namespaceObject.printHtml)("");
        (0,external_kolmafia_namespaceObject.printHtml)("<b>".concat(group.name, ":</b>"));
      });
    }
    /**
     * Load the metadata information for a set of arguments. Only for advanced usage.
     *
     * @param args A JS object specifying the script arguments. Its values should
     *    be {@link Arg} objects (created by Args.string, Args.number, or others)
     *    or groups of arguments (created by Args.group).
     * @returns A class containing metadata information.
     */

  }, {
    key: "getMetadata",
    value: function getMetadata(args) {
      return new WrappedArgMetadata(args);
    }
  }]);

  return Args;
}();
var ParseError = function ParseError(message) {
  args_classCallCheck(this, ParseError);

  this.message = message;
};
/**
 * Metadata for the parsed arguments.
 *
 * This information is hidden within the parsed argument object so that it
 * is invisible to the user but available to fill(*) and showHelp(*).
 */

var specSymbol = Symbol("spec");
var scriptSymbol = Symbol("script");
var scriptHelpSymbol = Symbol("scriptHelp");
var optionsSymbol = Symbol("options");
/**
 * Parse a string into a value for a given argument, throwing if the parsing fails.
 * @param arg An argument that takes values in T.
 * @param source A description of where this value came from, for the error message.
 * @param value The value to parse.
 * @returns the parsed value.
 */

function parseAndValidate(arg, source, value) {
  var parsed_value;

  try {
    parsed_value = arg.parser(value);
  } catch (_a) {
    parsed_value = undefined;
  }

  if (parsed_value === undefined) throw "".concat(source, " expected ").concat(arg.parser.name, "$ but could not parse ").concat(value);
  if (parsed_value instanceof ParseError) throw "".concat(source, " ").concat(parsed_value.message);
  return parsed_value;
}
/**
 * A class that reveals the hidden metadata and specs for arguments.
 *
 * Only for advanced usage.
 */


var WrappedArgMetadata = /*#__PURE__*/function () {
  function WrappedArgMetadata(args) {
    args_classCallCheck(this, WrappedArgMetadata);

    this.spec = args[specSymbol];
    this.scriptName = args[scriptSymbol];
    this.scriptHelp = args[scriptHelpSymbol];
    this.options = args[optionsSymbol];
  }
  /**
   * Create a parsed args object from this spec using all default values.
   */


  args_createClass(WrappedArgMetadata, [{
    key: "loadDefaultValues",
    value: function loadDefaultValues() {
      return _loadDefaultValues(this.spec);
    }
    /**
     * Traverse the spec and possibly generate a value for each argument.
     *
     * @param result The object to hold the resulting argument values, typically
     *    the result of loadDefaultValues().
     * @param setTo A function to generate an argument value from each arg spec.
     *    If this function returns undefined, then the argument value is unchanged.
     */

  }, {
    key: "traverseAndMaybeSet",
    value: function traverseAndMaybeSet(result, setTo) {
      return _traverseAndMaybeSet(this.spec, result, setTo);
    }
    /**
     * Traverse the spec and call a method for each argument.
     *
     * @param process A function to call at each arg spec.
     */

  }, {
    key: "traverse",
    value: function traverse(process, onGroup) {
      return _traverse(this.spec, process, onGroup);
    }
  }]);

  return WrappedArgMetadata;
}();
/**
 * Create a parsed args object from a spec using all default values.
 *
 * @param spec The spec for all arguments.
 */


function _loadDefaultValues(spec) {
  var result = {};

  for (var k in spec) {
    var argSpec = spec[k];

    if ("args" in argSpec) {
      result[k] = _loadDefaultValues(argSpec.args);
    } else {
      if ("default" in argSpec) result[k] = argSpec.default;else result[k] = undefined;
    }
  }

  return result;
}
/**
 * Traverse the spec and possibly generate a value for each argument.
 *
 * @param spec The spec for all arguments.
 * @param result The object to hold the resulting argument values.
 * @param setTo A function to generate an argument value from each arg spec.
 *    If this function returns undefined, then the argument value is unchanged.
 */


function _traverseAndMaybeSet(spec, result, setTo) {
  var groups = [];

  for (var k in spec) {
    var argSpec = spec[k];

    if ("args" in argSpec) {
      groups.push([argSpec, k]);
    } else {
      var value = setTo(argSpec, k);
      if (value === undefined) continue;
      result[k] = value;
    }
  }

  for (var _i = 0, _groups = groups; _i < _groups.length; _i++) {
    var group_and_key = _groups[_i];

    _traverseAndMaybeSet(group_and_key[0].args, result[group_and_key[1]], setTo);
  }
}
/**
 * Traverse the spec and possibly generate a value for each argument.
 *
 * @param spec The spec for all arguments.
 * @param process A function to call at each arg spec.
 */


function _traverse(spec, process, onGroup) {
  var groups = [];

  for (var k in spec) {
    var argSpec = spec[k];

    if ("args" in argSpec) {
      groups.push([argSpec, k]);
    } else {
      process(argSpec, k);
    }
  }

  for (var _i2 = 0, _groups2 = groups; _i2 < _groups2.length; _i2++) {
    var group_and_key = _groups2[_i2];
    onGroup === null || onGroup === void 0 ? void 0 : onGroup(group_and_key[0], group_and_key[1]);

    _traverse(group_and_key[0].args, process, onGroup);
  }
}
/**
 * A parser to extract key/value pairs from a command line input.
 * @member command The command line input.
 * @member keys The set of valid keys that can appear.
 * @member flags The set of valid flags that can appear.
 * @member index An internal marker for the progress of the parser over the input.
 */


var CommandParser = /*#__PURE__*/function () {
  function CommandParser(command, keys, flags, positionalArgs) {
    args_classCallCheck(this, CommandParser);

    this.command = command;
    this.index = 0;
    this.keys = keys;
    this.flags = flags;
    this.positionalArgs = positionalArgs;
    this.positionalArgsParsed = 0;
  }
  /**
   * Perform the parsing of (key, value) pairs.
   * @returns The set of extracted (key, value) pairs.
   */


  args_createClass(CommandParser, [{
    key: "parse",
    value: function parse() {
      var _a, _b, _c, _d;

      this.index = 0; // reset the parser

      var result = new Map();

      while (!this.finished()) {
        // A flag F may appear as !F to be parsed as false.
        var parsing_negative_flag = false;

        if (this.peek() === "!") {
          parsing_negative_flag = true;
          this.consume(["!"]);
        }

        var startIndex = this.index;
        var key = this.parseKey();

        if (result.has(key)) {
          throw "Duplicate key ".concat(key, " (first set to ").concat((_a = result.get(key)) !== null && _a !== void 0 ? _a : "", ")");
        }

        if (this.flags.has(key)) {
          // The key corresponds to a flag.
          // Parse [key] as true and ![key] as false.
          result.set(key, parsing_negative_flag ? "false" : "true");
          if (this.peek() === "=") throw "Flag ".concat(key, " cannot be assigned a value");
          if (!this.finished()) this.consume([" "]);
          this.prevUnquotedKey = undefined;
        } else if (this.keys.has(key)) {
          // Parse [key]=[value] or [key] [value]
          this.consume(["=", " "]);
          var value = this.parseValue();
          if (["'", '"'].includes((_b = this.prev()) !== null && _b !== void 0 ? _b : "")) this.prevUnquotedKey = undefined;else this.prevUnquotedKey = key;
          if (!this.finished()) this.consume([" "]);
          result.set(key, value);
        } else if (this.positionalArgsParsed < this.positionalArgs.length && this.peek() !== "=") {
          // Parse [value] as the next positional arg
          var positionalKey = this.positionalArgs[this.positionalArgsParsed];
          this.positionalArgsParsed++;
          this.index = startIndex; // back up to reparse the key as a value

          var _value = this.parseValue();

          if (["'", '"'].includes((_c = this.prev()) !== null && _c !== void 0 ? _c : "")) this.prevUnquotedKey = undefined;else this.prevUnquotedKey = key;
          if (!this.finished()) this.consume([" "]);
          if (result.has(positionalKey)) throw "Cannot assign ".concat(_value, " to ").concat(positionalKey, " (positionally) since ").concat(positionalKey, " was already set to ").concat((_d = result.get(positionalKey)) !== null && _d !== void 0 ? _d : "");
          result.set(positionalKey, _value);
        } else {
          // Key not found; include a better error message if it is possible for quotes to have been missed
          if (this.prevUnquotedKey && this.peek() !== "=") throw "Unknown argument: ".concat(key, " (if this should have been parsed as part of ").concat(this.prevUnquotedKey, ", you should surround the entire value in quotes)");else throw "Unknown argument: ".concat(key);
        }
      }

      return result;
    }
    /**
     * @returns True if the entire command has been parsed.
     */

  }, {
    key: "finished",
    value: function finished() {
      return this.index >= this.command.length;
    }
    /**
     * @returns The next character to parse, if it exists.
     */

  }, {
    key: "peek",
    value: function peek() {
      if (this.index >= this.command.length) return undefined;
      return this.command.charAt(this.index);
    }
    /**
     * @returns The character just parsed, if it exists.
     */

  }, {
    key: "prev",
    value: function prev() {
      if (this.index <= 0) return undefined;
      if (this.index >= this.command.length + 1) return undefined;
      return this.command.charAt(this.index - 1);
    }
    /**
     * Advance the internal marker over the next expected character.
     * Throws an error on unexpected characters.
     *
     * @param allowed Characters that are expected.
     */

  }, {
    key: "consume",
    value: function consume(allowed) {
      var _a;

      if (this.finished()) throw "Expected ".concat(allowed);

      if (allowed.includes((_a = this.peek()) !== null && _a !== void 0 ? _a : "")) {
        this.index += 1;
      }
    }
    /**
     * Find the next occurance of one of the provided characters, or the end of
     * the string if the characters never appear again.
     *
     * @param searchValue The characters to locate.
     */

  }, {
    key: "findNext",
    value: function findNext(searchValue) {
      var result = this.command.length;

      var _iterator4 = _createForOfIteratorHelper(searchValue),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var value = _step4.value;
          var index = this.command.indexOf(value, this.index);
          if (index !== -1 && index < result) result = index;
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      return result;
    }
    /**
     * Starting from the internal marker, parse a single key.
     * This also advances the internal marker.
     *
     * @returns The next key.
     */

  }, {
    key: "parseKey",
    value: function parseKey() {
      var keyEnd = this.findNext(["=", " "]);
      var key = this.command.substring(this.index, keyEnd);
      this.index = keyEnd;
      return key;
    }
    /**
     * Starting from the internal marker, parse a single value.
     * This also advances the internal marker.
     *
     * Values are a single word or enclosed in matching quotes, i.e. one of:
     *    "[^"]*"
     *    '[^']*"
     *    [^'"][^ ]*
     *
     * @returns The next value.
     */

  }, {
    key: "parseValue",
    value: function parseValue() {
      var _a, _b;

      var valueEnder = " ";
      var quotes = ["'", '"'];

      if (quotes.includes((_a = this.peek()) !== null && _a !== void 0 ? _a : "")) {
        valueEnder = (_b = this.peek()) !== null && _b !== void 0 ? _b : ""; // The value is everything until the next quote

        this.consume([valueEnder]); // Consume opening quote
      }

      var valueEnd = this.findNext([valueEnder]);
      var value = this.command.substring(this.index, valueEnd);

      if (valueEnder !== " " && valueEnd === this.command.length) {
        throw "No closing ".concat(valueEnder, " found for ").concat(valueEnder).concat(value);
      } // Consume the value (and closing quote)


      this.index = valueEnd;
      if (valueEnder !== " ") this.consume([valueEnder]);
      return value;
    }
  }]);

  return CommandParser;
}();
// EXTERNAL MODULE: ./node_modules/libram/node_modules/core-js/features/array/flat.js
var flat = __webpack_require__(2580);
;// CONCATENATED MODULE: ./node_modules/libram/dist/utils.js
function utils_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = utils_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function utils_slicedToArray(arr, i) { return utils_arrayWithHoles(arr) || utils_iterableToArrayLimit(arr, i) || utils_unsupportedIterableToArray(arr, i) || utils_nonIterableRest(); }

function utils_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function utils_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function utils_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || utils_unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function utils_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return utils_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return utils_arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return utils_arrayLikeToArray(arr); }

function utils_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function notNull(value) {
  return value !== null;
}
function parseNumber(n) {
  return Number.parseInt(n.replace(/,/g, ""));
}
/**
 * Clamp a number between lower and upper bounds.
 *
 * @param n Number to clamp.
 * @param min Lower bound.
 * @param max Upper bound.
 */

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}
/**
 * Split an {@param array} into {@param chunkSize} sized chunks
 *
 * @param array Array to split
 * @param chunkSize Size of chunk
 */

function chunk(array, chunkSize) {
  var result = [];

  for (var i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }

  return result;
}
function arrayToCountedMap(array) {
  if (!Array.isArray(array)) return array;
  var map = new Map();
  array.forEach(item => {
    map.set(item, (map.get(item) || 0) + 1);
  });
  return map;
}
function countedMapToArray(map) {
  var _ref;

  return (_ref = []).concat.apply(_ref, _toConsumableArray(_toConsumableArray(map).map(_ref2 => {
    var _ref3 = utils_slicedToArray(_ref2, 2),
        item = _ref3[0],
        quantity = _ref3[1];

    return Array(quantity).fill(item);
  })));
}
function countedMapToString(map) {
  return _toConsumableArray(map).map(_ref4 => {
    var _ref5 = utils_slicedToArray(_ref4, 2),
        item = _ref5[0],
        quantity = _ref5[1];

    return "".concat(quantity, " x ").concat(item);
  }).join(", ");
}
/**
 * Sum an array of numbers.
 * @param addends Addends to sum.
 * @param mappingFunction function to turn elements into numbers
 */

function sum(addends, mappingFunction) {
  return addends.reduce((subtotal, element) => subtotal + mappingFunction(element), 0);
}
function sumNumbers(addends) {
  return sum(addends, x => x);
}
/**
 * Checks if a given item is in a readonly array, acting as a typeguard.
 * @param item Needle
 * @param array Readonly array haystack
 * @returns Whether the item is in the array, and narrows the type of the item.
 */

function arrayContains(item, array) {
  return array.includes(item);
}
/**
 * Checks if two arrays contain the same elements in the same quantity.
 * @param a First array for comparison
 * @param b Second array for comparison
 * @returns Whether the two arrays are equal, irrespective of order.
 */

function setEqual(a, b) {
  var sortedA = _toConsumableArray(a).sort();

  var sortedB = _toConsumableArray(b).sort();

  return a.length === b.length && sortedA.every((item, index) => item === sortedB[index]);
}
/**
 * Reverses keys and values for a given map
 * @param map Map to invert
 */

function invertMap(map) {
  var returnValue = new Map();

  var _iterator = utils_createForOfIteratorHelper(map),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = utils_slicedToArray(_step.value, 2),
          key = _step$value[0],
          value = _step$value[1];

      returnValue.set(value, key);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return returnValue;
}
/**
 * Creates a Type Guard function for a string union type defined via an array as const.
 */

function createStringUnionTypeGuardFunction(array) {
  return function (x) {
    return array.includes(x);
  };
}
/**
 * Splits a string by commas while also respecting escaping commas with a backslash
 * @param str String to split
 * @returns List of tokens
 */

function splitByCommasWithEscapes(str) {
  var returnValue = [];
  var ignoreNext = false;
  var currentString = "";

  var _iterator2 = utils_createForOfIteratorHelper(str.split("")),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var char = _step2.value;

      if (char === "\\") {
        ignoreNext = true;
      } else {
        if (char == "," && !ignoreNext) {
          returnValue.push(currentString.trim());
          currentString = "";
        } else {
          currentString += char;
        }

        ignoreNext = false;
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  returnValue.push(currentString.trim());
  return returnValue;
}
;// CONCATENATED MODULE: ./node_modules/libram/dist/template-string.js



var concatTemplateString = function concatTemplateString(literals) {
  for (var _len = arguments.length, placeholders = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    placeholders[_key - 1] = arguments[_key];
  }

  return literals.raw.reduce((acc, literal, i) => {
    var _placeholders$i;

    return acc + literal + ((_placeholders$i = placeholders[i]) !== null && _placeholders$i !== void 0 ? _placeholders$i : "");
  }, "");
};

var createSingleConstant = Type => {
  var tagFunction = function tagFunction(literals) {
    for (var _len2 = arguments.length, placeholders = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      placeholders[_key2 - 1] = arguments[_key2];
    }

    var input = concatTemplateString.apply(void 0, [literals].concat(placeholders));
    return Type.get(input);
  };

  tagFunction.none = Type.none;
  return tagFunction;
};

var createPluralConstant = Type => function (literals) {
  for (var _len3 = arguments.length, placeholders = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    placeholders[_key3 - 1] = arguments[_key3];
  }

  var input = concatTemplateString.apply(void 0, [literals].concat(placeholders));

  if (input === "") {
    return Type.all();
  }

  return Type.get(splitByCommasWithEscapes(input));
};
/**
 * A Bounty specified by name.
 *
 * @category In-game constant
 */


var $bounty = createSingleConstant(external_kolmafia_namespaceObject.Bounty);
/**
 * A list of Bounties specified by a comma-separated list of names.
 * For a list of all possible Bounties, leave the template string blank.
 *
 * @category In-game constant
 */

var $bounties = createPluralConstant(external_kolmafia_namespaceObject.Bounty);
/**
 * A Class specified by name.
 *
 * @category In-game constant
 */

var $class = createSingleConstant(external_kolmafia_namespaceObject.Class);
/**
 * A list of Classes specified by a comma-separated list of names.
 * For a list of all possible Classes, leave the template string blank.
 *
 * @category In-game constant
 */

var $classes = createPluralConstant(external_kolmafia_namespaceObject.Class);
/**
 * A Coinmaster specified by name.
 *
 * @category In-game constant
 */

var $coinmaster = createSingleConstant(external_kolmafia_namespaceObject.Coinmaster);
/**
 * A list of Coinmasters specified by a comma-separated list of names.
 * For a list of all possible Coinmasters, leave the template string blank.
 *
 * @category In-game constant
 */

var $coinmasters = createPluralConstant(external_kolmafia_namespaceObject.Coinmaster);
/**
 * An Effect specified by name.
 *
 * @category In-game constant
 */

var $effect = createSingleConstant(external_kolmafia_namespaceObject.Effect);
/**
 * A list of Effects specified by a comma-separated list of names.
 * For a list of all possible Effects, leave the template string blank.
 *
 * @category In-game constant
 */

var $effects = createPluralConstant(external_kolmafia_namespaceObject.Effect);
/**
 * An Element specified by name.
 *
 * @category In-game constant
 */

var $element = createSingleConstant(external_kolmafia_namespaceObject.Element);
/**
 * A list of Elements specified by a comma-separated list of names.
 * For a list of all possible Elements, leave the template string blank.
 *
 * @category In-game constant
 */

var $elements = createPluralConstant(external_kolmafia_namespaceObject.Element);
/**
 * A Familiar specified by name.
 *
 * @category In-game constant
 */

var template_string_$familiar = createSingleConstant(external_kolmafia_namespaceObject.Familiar);
/**
 * A list of Familiars specified by a comma-separated list of names.
 * For a list of all possible Familiars, leave the template string blank.
 *
 * @category In-game constant
 */

var $familiars = createPluralConstant(external_kolmafia_namespaceObject.Familiar);
/**
 * An Item specified by name.
 *
 * @category In-game constant
 */

var template_string_$item = createSingleConstant(external_kolmafia_namespaceObject.Item);
/**
 * A list of Items specified by a comma-separated list of names.
 * For a list of all possible Items, leave the template string blank.
 *
 * @category In-game constant
 */

var template_string_$items = createPluralConstant(external_kolmafia_namespaceObject.Item);
/**
 * A Location specified by name.
 *
 * @category In-game constant
 */

var $location = createSingleConstant(external_kolmafia_namespaceObject.Location);
/**
 * A list of Locations specified by a comma-separated list of names.
 * For a list of all possible Locations, leave the template string blank.
 *
 * @category In-game constant
 */

var $locations = createPluralConstant(external_kolmafia_namespaceObject.Location);
/**
 * A Monster specified by name.
 *
 * @category In-game constant
 */

var $monster = createSingleConstant(external_kolmafia_namespaceObject.Monster);
/**
 * A list of Monsters specified by a comma-separated list of names.
 * For a list of all possible Monsters, leave the template string blank.
 *
 * @category In-game constant
 */

var $monsters = createPluralConstant(external_kolmafia_namespaceObject.Monster);
/**
 * A Phylum specified by name.
 *
 * @category In-game constant
 */

var $phylum = createSingleConstant(external_kolmafia_namespaceObject.Phylum);
/**
 * A list of Phyla specified by a comma-separated list of names.
 * For a list of all possible Phyla, leave the template string blank.
 *
 * @category In-game constant
 */

var $phyla = createPluralConstant(external_kolmafia_namespaceObject.Phylum);
/**
 * A Servant specified by name.
 *
 * @category In-game constant
 */

var $servant = createSingleConstant(external_kolmafia_namespaceObject.Servant);
/**
 * A list of Servants specified by a comma-separated list of names.
 * For a list of all possible Servants, leave the template string blank.
 *
 * @category In-game constant
 */

var $servants = createPluralConstant(external_kolmafia_namespaceObject.Servant);
/**
 * A Skill specified by name.
 *
 * @category In-game constant
 */

var $skill = createSingleConstant(external_kolmafia_namespaceObject.Skill);
/**
 * A list of Skills specified by a comma-separated list of names.
 * For a list of all possible Skills, leave the template string blank.
 *
 * @category In-game constant
 */

var $skills = createPluralConstant(external_kolmafia_namespaceObject.Skill);
/**
 * A Slot specified by name.
 *
 * @category In-game constant
 */

var $slot = createSingleConstant(external_kolmafia_namespaceObject.Slot);
/**
 * A list of Slots specified by a comma-separated list of names.
 * For a list of all possible Slots, leave the template string blank.
 *
 * @category In-game constant
 */

var $slots = createPluralConstant(external_kolmafia_namespaceObject.Slot);
/**
 * A Stat specified by name.
 *
 * @category In-game constant
 */

var $stat = createSingleConstant(external_kolmafia_namespaceObject.Stat);
/**
 * A list of Stats specified by a comma-separated list of names.
 * For a list of all possible Stats, leave the template string blank.
 *
 * @category In-game constant
 */

var $stats = createPluralConstant(external_kolmafia_namespaceObject.Stat);
/**
 * A Thrall specified by name.
 *
 * @category In-game constant
 */

var $thrall = createSingleConstant(external_kolmafia_namespaceObject.Thrall);
/**
 * A list of Thralls specified by a comma-separated list of names.
 * For a list of all possible Thralls, leave the template string blank.
 *
 * @category In-game constant
 */

var $thralls = createPluralConstant(external_kolmafia_namespaceObject.Thrall);
/**
 * A Path specified by name.
 *
 * @category In-game constant
 */

var $path = createSingleConstant(external_kolmafia_namespaceObject.Path);
/**
 * A list of Paths specified by a comma-separated list of names.
 * For a list of all possible Paths, leave the template string blank.
 *
 * @category In-game constant
 */

var $paths = createPluralConstant(external_kolmafia_namespaceObject.Path);
;// CONCATENATED MODULE: ./node_modules/libram/dist/lib.js
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30, _templateObject31, _templateObject32, _templateObject33, _templateObject34;

function lib_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function lib_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = lib_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function lib_slicedToArray(arr, i) { return lib_arrayWithHoles(arr) || lib_iterableToArrayLimit(arr, i) || lib_unsupportedIterableToArray(arr, i) || lib_nonIterableRest(); }

function lib_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function lib_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return lib_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return lib_arrayLikeToArray(o, minLen); }

function lib_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function lib_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function lib_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/** @module GeneralLibrary */






/**
 * Returns the current maximum Accordion Thief songs the player can have in their head
 *
 * @category General
 */

function getSongLimit() {
  return 3 + (booleanModifier("Four Songs") ? 1 : 0) + numericModifier("Additional Song");
}
/**
 * Return whether the Skill or Effect provided is an Accordion Thief song
 *
 * @category General
 * @param skillOrEffect The Skill or Effect
 */

function isSong(skillOrEffect) {
  if (skillOrEffect instanceof external_kolmafia_namespaceObject.Effect && skillOrEffect.attributes.includes("song")) {
    return true;
  } else {
    var skill = skillOrEffect instanceof external_kolmafia_namespaceObject.Effect ? (0,external_kolmafia_namespaceObject.toSkill)(skillOrEffect) : skillOrEffect;
    return skill.class === $class(_templateObject || (_templateObject = _taggedTemplateLiteral(["Accordion Thief"]))) && skill.buff;
  }
}
/**
 * List all active Effects
 *
 * @category General
 */

function getActiveEffects() {
  return Object.keys((0,external_kolmafia_namespaceObject.myEffects)()).map(e => external_kolmafia_namespaceObject.Effect.get(e));
}
/**
 * List currently active Accordion Thief songs
 *
 * @category General
 */

function getActiveSongs() {
  return getActiveEffects().filter(isSong);
}
/**
 * List number of active Accordion Thief songs
 *
 * @category General
 */

function getSongCount() {
  return getActiveSongs().length;
}
/**
 * Returns true if the player can remember another Accordion Thief song
 *
 * @category General
 * @param quantity Number of songs to test the space for
 */

function canRememberSong() {
  var quantity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  return getSongLimit() - getSongCount() >= quantity;
}
/**
 * Return the locations in which the given monster can be encountered naturally
 *
 * @category General
 * @param monster Monster to find
 */

function getMonsterLocations(monster) {
  return Location.all().filter(location => monster.name in appearanceRates(location));
}
/**
 * Return the player's remaining liver space
 *
 * @category General
 */

function getRemainingLiver() {
  return inebrietyLimit() - myInebriety();
}
/**
 * Return the player's remaining stomach space
 *
 * @category General
 */

function getRemainingStomach() {
  return fullnessLimit() - myFullness();
}
/**
 * Return the player's remaining spleen space
 *
 * @category General
 */

function getRemainingSpleen() {
  return spleenLimit() - mySpleenUse();
}
/**
 * Return whether the player "has" any entity which one could feasibly "have".
 *
 * @category General
 * @param thing Thing to check
 * @param quantity Number to check that the player has
 */

function have(thing) {
  var quantity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if (thing instanceof external_kolmafia_namespaceObject.Effect) {
    return (0,external_kolmafia_namespaceObject.haveEffect)(thing) >= quantity;
  }

  if (thing instanceof external_kolmafia_namespaceObject.Familiar) {
    return (0,external_kolmafia_namespaceObject.haveFamiliar)(thing);
  }

  if (thing instanceof external_kolmafia_namespaceObject.Item) {
    return (0,external_kolmafia_namespaceObject.availableAmount)(thing) >= quantity;
  }

  if (thing instanceof external_kolmafia_namespaceObject.Servant) {
    return (0,external_kolmafia_namespaceObject.haveServant)(thing);
  }

  if (thing instanceof external_kolmafia_namespaceObject.Skill) {
    return (0,external_kolmafia_namespaceObject.haveSkill)(thing);
  }

  if (thing instanceof external_kolmafia_namespaceObject.Thrall) {
    var thrall = (0,external_kolmafia_namespaceObject.myThrall)();
    return thrall.id === thing.id && thrall.level >= quantity;
  }

  return false;
}
/**
 * Return whether an item is in the player's campground
 *
 * @category General
 * @param item The item mafia uses to represent the campground item
 */

function haveInCampground(item) {
  return Object.keys((0,external_kolmafia_namespaceObject.getCampground)()).map(i => external_kolmafia_namespaceObject.Item.get(i)).includes(item);
}
var Wanderer;

(function (Wanderer) {
  Wanderer["Digitize"] = "Digitize Monster";
  Wanderer["Enamorang"] = "Enamorang Monster";
  Wanderer["Familiar"] = "Familiar";
  Wanderer["Holiday"] = "Holiday Monster";
  Wanderer["Kramco"] = "Kramco";
  Wanderer["Nemesis"] = "Nemesis Assassin";
  Wanderer["Portscan"] = "portscan.edu";
  Wanderer["Romantic"] = "Romantic Monster";
  Wanderer["Vote"] = "Vote Monster";
})(Wanderer || (Wanderer = {}));

var deterministicWanderers = [Wanderer.Digitize, Wanderer.Portscan];
/**
 * Return whether the player has the queried counter
 *
 * @category General
 */

function haveCounter(counterName) {
  var minTurns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var maxTurns = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
  return getCounters(counterName, minTurns, maxTurns) === counterName;
}
/**
 * Return whether the player has the queried wandering counter
 *
 * @category Wanderers
 */

function haveWandererCounter(wanderer) {
  if (deterministicWanderers.includes(wanderer)) {
    return haveCounter(wanderer);
  }

  var begin = wanderer + " window begin";
  var end = wanderer + " window end";
  return haveCounter(begin) || haveCounter(end);
}
/**
 * Returns whether the player will encounter a vote wanderer on the next turn,
 * providing an "I Voted!" sticker is equipped.
 *
 * @category Wanderers
 */

function isVoteWandererNow() {
  return totalTurnsPlayed() % 11 === 1 && get("lastVoteMonsterTurn") < totalTurnsPlayed();
}
/**
 * Tells us whether we can expect a given wanderer now. Behaves differently
 * for different types of wanderer.
 *
 * - For deterministic wanderers, return whether the player will encounter
 *   the queried wanderer on the next turn
 *
 * - For variable wanderers (window), return whether the player is within
 *   an encounter window for the queried wanderer
 *
 * - For variable wanderers (chance per turn), returns true unless the player
 *   has exhausted the number of wanderers possible
 *
 * @category Wanderers
 * @param wanderer Wanderer to check
 */

function isWandererNow(wanderer) {
  if (deterministicWanderers.includes(wanderer)) {
    return haveCounter(wanderer, 0, 0);
  }

  if (wanderer === Wanderer.Kramco) {
    return true;
  }

  if (wanderer === Wanderer.Vote) {
    return isVoteWandererNow();
  }

  if (wanderer === Wanderer.Familiar) {
    return get("_hipsterAdv") < 7;
  }

  var begin = wanderer + " window begin";
  var end = wanderer + " window end";
  return !haveCounter(begin, 1) && haveCounter(end);
}
/**
 * Returns the float chance the player will encounter a sausage goblin on the
 * next turn, providing the Kramco Sausage-o-Matic is equipped.
 *
 * @category Wanderers
 */

function getKramcoWandererChance() {
  var fights = get("_sausageFights");
  var lastFight = get("_lastSausageMonsterTurn");
  var totalTurns = totalTurnsPlayed();

  if (fights < 1) {
    return lastFight === totalTurns && myTurncount() < 1 ? 0.5 : 1.0;
  }

  var turnsSinceLastFight = totalTurns - lastFight;
  return Math.min(1.0, (turnsSinceLastFight + 1) / (5 + fights * 3 + Math.pow(Math.max(0, fights - 5), 3)));
}
/**
 * Returns the float chance the player will encounter an Artistic Goth Kid or
 * Mini-Hipster wanderer on the next turn, providing a familiar is equipped.
 *
 * NOTE: You must complete one combat with the Artistic Goth Kid before you
 * can encounter any wanderers. Consequently,ƒ the first combat with the
 * Artist Goth Kid is effectively 0% chance to encounter a wanderer.
 *
 * @category Wanderers
 */

function getFamiliarWandererChance() {
  var totalFights = get("_hipsterAdv");
  var probability = [0.5, 0.4, 0.3, 0.2];

  if (totalFights < 4) {
    return probability[totalFights];
  }

  return totalFights > 7 ? 0.0 : 0.1;
}
/**
 * Returns the float chance the player will encounter the queried wanderer
 * on the next turn.
 *
 * @category Wanderers
 * @param wanderer Wanderer to check
 */

function getWandererChance(wanderer) {
  if (deterministicWanderers.includes(wanderer)) {
    return haveCounter(wanderer, 0, 0) ? 1.0 : 0.0;
  }

  if (wanderer === Wanderer.Kramco) {
    getKramcoWandererChance();
  }

  if (wanderer === Wanderer.Vote) {
    return isVoteWandererNow() ? 1.0 : 0.0;
  }

  if (wanderer === Wanderer.Familiar) {
    getFamiliarWandererChance();
  }

  var begin = wanderer + " window begin";
  var end = wanderer + " window end";

  if (haveCounter(begin, 1, 100)) {
    return 0.0;
  }

  var counters = get("relayCounters");
  var re = new RegExp("(\\d+):" + end);
  var matches = counters.match(re);

  if (matches && matches.length === 2) {
    var window = Number.parseInt(matches[1]) - myTurncount();
    return 1.0 / window;
  }

  return 0.0;
}
/**
 * Returns true if the player's current familiar is equal to the one supplied
 *
 * @category General
 * @param familiar Familiar to check
 */

function isCurrentFamiliar(familiar) {
  return myFamiliar() === familiar;
}
/**
 * Returns the fold group (if any) of which the given item is a part
 *
 * @category General
 * @param item Item that is part of the required fold group
 */

function getFoldGroup(item) {
  return Object.entries((0,external_kolmafia_namespaceObject.getRelated)(item, "fold")).sort((_ref, _ref2) => {
    var _ref3 = lib_slicedToArray(_ref, 2),
        a = _ref3[1];

    var _ref4 = lib_slicedToArray(_ref2, 2),
        b = _ref4[1];

    return a - b;
  }).map(_ref5 => {
    var _ref6 = lib_slicedToArray(_ref5, 1),
        i = _ref6[0];

    return external_kolmafia_namespaceObject.Item.get(i);
  });
}
/**
 * Returns the zap group (if any) of which the given item is a part
 *
 * @category General
 * @param item Item that is part of the required zap group
 */

function getZapGroup(item) {
  return Object.keys(getRelated(item, "zap")).map(i => Item.get(i));
}
/**
 * Get a map of banished monsters keyed by what banished them
 *
 * @category General
 */

function getBanishedMonsters() {
  var banishes = chunk(property_get("banishedMonsters").split(":"), 3);
  var result = new Map();

  var _iterator = lib_createForOfIteratorHelper(banishes),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = lib_slicedToArray(_step.value, 2),
          foe = _step$value[0],
          banisher = _step$value[1];

      if (foe === undefined || banisher === undefined) break; // toItem doesn"t error if the item doesn"t exist, so we have to use that.

      var banisherItem = (0,external_kolmafia_namespaceObject.toItem)(banisher);

      if (banisher.toLowerCase() === "saber force") {
        result.set($skill(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["Use the Force"]))), external_kolmafia_namespaceObject.Monster.get(foe));
      } else if (banisher.toLowerCase() === "nanorhino") {
        result.set($skill(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["Unleash Nanites"]))), external_kolmafia_namespaceObject.Monster.get(foe));
      } else if ([external_kolmafia_namespaceObject.Item.none, external_kolmafia_namespaceObject.Item.get("training scroll:  Snokebomb"), external_kolmafia_namespaceObject.Item.get("tomayohawk-style reflex hammer"), null].includes(banisherItem)) {
        if (external_kolmafia_namespaceObject.Skill.get(banisher) === $skill.none) {
          break;
        } else {
          result.set(external_kolmafia_namespaceObject.Skill.get(banisher), external_kolmafia_namespaceObject.Monster.get(foe));
        }
      } else {
        result.set(banisherItem, external_kolmafia_namespaceObject.Monster.get(foe));
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return result;
}
/**
 * Returns true if the item is usable
 *
 * This function will be an ongoing work in progress
 *
 * @param item Item to check
 */

function canUse(item) {
  var path = myPath();

  if (path !== Path.get("Nuclear Autumn")) {
    if ($items(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["Shrieking Weasel holo-record, Power-Guy 2000 holo-record, Lucky Strikes holo-record, EMD holo-record, Superdrifter holo-record, The Pigs holo-record, Drunk Uncles holo-record"]))).includes(item)) {
      return false;
    }
  }

  if (path === Path.get("G-Lover")) {
    if (!item.name.toLowerCase().includes("g")) return false;
  }

  if (path === Path.get("Bees Hate You")) {
    if (item.name.toLowerCase().includes("b")) return false;
  }

  return true;
}
/**
 * Turn KoLmafia `none`s to JavaScript `null`s
 *
 * @param thing Thing that can have a mafia "none" value
 */

function noneToNull(thing) {
  if (thing instanceof Effect) {
    return thing === Effect.none ? null : thing;
  }

  if (thing instanceof Familiar) {
    return thing === Familiar.none ? null : thing;
  }

  if (thing instanceof Item) {
    return thing === Item.none ? null : thing;
  }

  return thing;
}
/**
 * Return the average value from the sort of range that KoLmafia encodes as a string
 *
 * @param range KoLmafia-style range string
 */

function getAverage(range) {
  var _range$match;

  if (range.indexOf("-") < 0) return Number(range);

  var _ref7 = (_range$match = range.match(/(-?[0-9]+)-(-?[0-9]+)/)) !== null && _range$match !== void 0 ? _range$match : ["0", "0", "0"],
      _ref8 = lib_slicedToArray(_ref7, 3),
      lower = _ref8[1],
      upper = _ref8[2];

  return (Number(lower) + Number(upper)) / 2;
}
/**
 * Return average adventures expected from consuming an item
 *
 * If item is not a consumable, will just return "0".
 *
 * @param item Consumable item
 */

function getAverageAdventures(item) {
  return getAverage(item.adventures);
}
/**
 * Remove an effect
 *
 * @category General
 * @param effect Effect to remove
 */

function uneffect(effect) {
  return (0,external_kolmafia_namespaceObject.cliExecute)("uneffect ".concat(effect.name));
}
/**
 * Get both the name and id of a player from either their name or id
 *
 * @param idOrName Id or name of player
 * @returns Object containing id and name of player
 */

function getPlayerFromIdOrName(idOrName) {
  var id = typeof idOrName === "number" ? idOrName : parseInt(getPlayerId(idOrName));
  return {
    name: getPlayerName(id),
    id: id
  };
}
/**
 * Return the step as a number for a given quest property.
 *
 * @param questName Name of quest property to check.
 */

function questStep(questName) {
  var stringStep = get(questName);
  if (stringStep === "unstarted") return -1;else if (stringStep === "started") return 0;else if (stringStep === "finished" || stringStep === "") return 999;else {
    if (stringStep.substring(0, 4) !== "step") {
      throw new Error("Quest state parsing error.");
    }

    return parseInt(stringStep.substring(4), 10);
  }
}
var EnsureError = /*#__PURE__*/function (_Error) {
  _inherits(EnsureError, _Error);

  var _super = _createSuper(EnsureError);

  function EnsureError(cause, reason) {
    var _this;

    lib_classCallCheck(this, EnsureError);

    _this = _super.call(this, "Failed to ensure ".concat(cause.name, "!").concat(reason ? " ".concat(reason) : ""));
    _this.name = "Ensure Error";
    return _this;
  }

  return EnsureError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Tries to get an effect using the default method
 * @param ef effect to try to get
 * @param turns turns to aim for; default of 1
 *
 * @throws {EnsureError} Throws an error if the effect cannot be guaranteed
 */

function ensureEffect(ef) {
  var turns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if ((0,external_kolmafia_namespaceObject.haveEffect)(ef) < turns) {
    if (ef.default === null) {
      throw new EnsureError(ef, "No default action");
    }

    if (!(0,external_kolmafia_namespaceObject.cliExecute)(ef.default) || (0,external_kolmafia_namespaceObject.haveEffect)(ef) === 0) {
      throw new EnsureError(ef);
    }
  }
}
var valueMap = new Map();
var MALL_VALUE_MODIFIER = 0.9;
/**
 * Returns the average value--based on mallprice and autosell--of a collection of items
 * @param items items whose value you care about
 */

function getSaleValue() {
  for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++) {
    items[_key] = arguments[_key];
  }

  return items.map(item => {
    if (valueMap.has(item)) return valueMap.get(item) || 0;

    if (item.discardable) {
      valueMap.set(item, mallPrice(item) > Math.max(2 * autosellPrice(item), 100) ? MALL_VALUE_MODIFIER * mallPrice(item) : autosellPrice(item));
    } else {
      valueMap.set(item, mallPrice(item) > 100 ? MALL_VALUE_MODIFIER * mallPrice(item) : 0);
    }

    return valueMap.get(item) || 0;
  }).reduce((s, price) => s + price, 0) / items.length;
}
var Environment = {
  Outdoor: "outdoor",
  Indoor: "indoor",
  Underground: "underground",
  Underwater: "underwater"
};
/**
 * Returns the weight-coefficient of any leprechaunning that this familiar may find itself doing
 * Assumes the familiar is nude and thus fails for hatrack & pantsrack
 * For the Mutant Cactus Bud, returns the efficacy-multiplier instead
 * @param familiar The familiar whose leprechaun multiplier you're interested in
 */

function findLeprechaunMultiplier(familiar) {
  if (familiar === $familiar(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["Mutant Cactus Bud"])))) {
    return numericModifier(familiar, "Leprechaun Effectiveness", 1, $item.none);
  }

  if (familiar === $familiar(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["Reanimated Reanimator"])))) return 0;
  var meatBonus = numericModifier(familiar, "Meat Drop", 1, $item.none);
  if (meatBonus === 0) return 0;
  return Math.pow(Math.sqrt(meatBonus / 2 + 55 / 4 + 3) - Math.sqrt(55) / 2, 2);
}
/**
 * Returns the weight-coefficient of any baby gravy fairying that this familiar may find itself doing
 * Assumes the familiar is nude and thus fails for hatrack & pantsrack
 * For the Mutant Fire Ant, returns the efficacy-multiplier instead
 * @param familiar The familiar whose fairy multiplier you're interested in
 */

function findFairyMultiplier(familiar) {
  if (familiar === template_string_$familiar(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["Mutant Fire Ant"])))) {
    return (0,external_kolmafia_namespaceObject.numericModifier)(familiar, "Fairy Effectiveness", 1, template_string_$item.none);
  }

  if (familiar === template_string_$familiar(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["Reanimated Reanimator"])))) return 0;
  var itemBonus = (0,external_kolmafia_namespaceObject.numericModifier)(familiar, "Item Drop", 1, template_string_$item.none);
  if (itemBonus === 0) return 0;
  return Math.pow(Math.sqrt(itemBonus + 55 / 4 + 3) - Math.sqrt(55) / 2, 2);
}
var holidayWanderers = new Map([["El Dia De Los Muertos Borrachos", $monsters(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["Novia Cad\xE1ver, Novio Cad\xE1ver, Padre Cad\xE1ver, Persona Inocente Cad\xE1ver"])))], ["Feast of Boris", $monsters(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["Candied Yam Golem, Malevolent Tofurkey, Possessed Can of Cranberry Sauce, Stuffing Golem"])))], ["Talk Like a Pirate Day", $monsters(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["ambulatory pirate, migratory pirate, peripatetic pirate"])))]]);
function getTodaysHolidayWanderers() {
  return (0,external_kolmafia_namespaceObject.holiday)().split("/").map(holiday => {
    var _holidayWanderers$get;

    return (_holidayWanderers$get = holidayWanderers.get(holiday)) !== null && _holidayWanderers$get !== void 0 ? _holidayWanderers$get : [];
  }).flat();
}
/**
 * Determines & returns whether or not we can safely call visitUrl(), based on whether we're in a fight, multi-fight, choice, etc
 */

function canVisitUrl() {
  return !(currentRound() || inMultiFight() || choiceFollowsFight() || handlingChoice());
}
/**
 * Calculate damage taken from a specific element after factoring in resistance
 * @param baseDamage
 * @param element
 * @returns damage after factoring in resistances
 */

function damageTakenByElement(baseDamage, element) {
  if (baseDamage < 0) return 1;
  var res = elementalResistance(element);
  return Math.max(1, Math.ceil(baseDamage - baseDamage * res / 100));
}
var telescopeStats = new Map([["standing around flexing their muscles and using grip exercisers", $stat(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["Muscle"])))], ["sitting around playing chess and solving complicated-looking logic puzzles", $stat(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["Mysticality"])))], ["all wearing sunglasses and dancing", $stat(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["Moxie"])))]]);
var telescopeElements = new Map([["people, all of whom appear to be on fire", $element(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["hot"])))], ["people, surrounded by a cloud of eldritch mist", $element(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["spooky"])))], ["greasy-looking people furtively skulking around", $element(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["sleaze"])))], ["people, surrounded by garbage and clouds of flies", $element(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["stench"])))], ["people, clustered around a group of igloos", $element(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["cold"])))]]);
var hedgeTrap1 = new Map([["smoldering bushes on the outskirts of a hedge maze", $element(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["hot"])))], ["creepy-looking black bushes on the outskirts of a hedge maze", $element(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["spooky"])))], ["purplish, greasy-looking hedges", $element(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["sleaze"])))], ["nasty-looking, dripping green bushes on the outskirts of a hedge maze", $element(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["stench"])))], ["frost-rimed bushes on the outskirts of a hedge maze", $element(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["cold"])))]]);
var hedgeTrap2 = new Map([["smoke rising from deeper within the maze", $element(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["hot"])))], ["a miasma of eldritch vapors rising from deeper within the maze", $element(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["spooky"])))], ["a greasy purple cloud hanging over the center of the maze", $element(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["sleaze"])))], ["a cloud of green gas hovering over the maze", $element(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral(["stench"])))], ["wintry mists rising from deeper within the maze", $element(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["cold"])))]]);
var hedgeTrap3 = new Map([["with lava slowly oozing out of it", $element(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["hot"])))], ["surrounded by creepy black mist", $element(_templateObject31 || (_templateObject31 = _taggedTemplateLiteral(["spooky"])))], ["that occasionally vomits out a greasy ball of hair", $element(_templateObject32 || (_templateObject32 = _taggedTemplateLiteral(["sleaze"])))], ["disgorging a really surprising amount of sewage", $element(_templateObject33 || (_templateObject33 = _taggedTemplateLiteral(["stench"])))], ["occasionally disgorging a bunch of ice cubes", $element(_templateObject34 || (_templateObject34 = _taggedTemplateLiteral(["cold"])))]]);
/**
 * @returns An object with all information the telescope gives you about the sorceress's contests and maze
 */

function telescope() {
  return {
    statContest: telescopeStats.get(get("telescope1")),
    elementContest: telescopeElements.get(get("telescope2")),
    hedge1: hedgeTrap1.get(get("telescope3")),
    hedge2: hedgeTrap2.get(get("telescope4")),
    hedge3: hedgeTrap3.get(get("telescope5"))
  };
}
;// CONCATENATED MODULE: ./node_modules/libram/dist/combat.js
var combat_templateObject, combat_templateObject2;

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = combat_getPrototypeOf(object); if (object === null) break; } return object; }

function combat_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = combat_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function combat_toConsumableArray(arr) { return combat_arrayWithoutHoles(arr) || combat_iterableToArray(arr) || combat_unsupportedIterableToArray(arr) || combat_nonIterableSpread(); }

function combat_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function combat_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return combat_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return combat_arrayLikeToArray(o, minLen); }

function combat_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function combat_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return combat_arrayLikeToArray(arr); }

function combat_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function combat_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function combat_createClass(Constructor, protoProps, staticProps) { if (protoProps) combat_defineProperties(Constructor.prototype, protoProps); if (staticProps) combat_defineProperties(Constructor, staticProps); return Constructor; }

function combat_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function combat_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function combat_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) combat_setPrototypeOf(subClass, superClass); }

function combat_createSuper(Derived) { var hasNativeReflectConstruct = combat_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = combat_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = combat_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return combat_possibleConstructorReturn(this, result); }; }

function combat_possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return combat_assertThisInitialized(self); }

function combat_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function combat_wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; combat_wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !combat_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return combat_construct(Class, arguments, combat_getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return combat_setPrototypeOf(Wrapper, Class); }; return combat_wrapNativeSuper(Class); }

function combat_construct(Parent, args, Class) { if (combat_isNativeReflectConstruct()) { combat_construct = Reflect.construct; } else { combat_construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) combat_setPrototypeOf(instance, Class.prototype); return instance; }; } return combat_construct.apply(null, arguments); }

function combat_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function combat_isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function combat_setPrototypeOf(o, p) { combat_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return combat_setPrototypeOf(o, p); }

function combat_getPrototypeOf(o) { combat_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return combat_getPrototypeOf(o); }

function combat_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var MACRO_NAME = "Script Autoattack Macro";
/**
 * Get the KoL native ID of the macro with name name.
 *
 * @category Combat
 * @returns {number} The macro ID.
 */

function getMacroId() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : MACRO_NAME;
  var macroMatches = (0,external_kolmafia_namespaceObject.xpath)((0,external_kolmafia_namespaceObject.visitUrl)("account_combatmacros.php"), "//select[@name=\"macroid\"]/option[text()=\"".concat(name, "\"]/@value"));

  if (macroMatches.length === 0) {
    (0,external_kolmafia_namespaceObject.visitUrl)("account_combatmacros.php?action=new");
    var newMacroText = (0,external_kolmafia_namespaceObject.visitUrl)("account_combatmacros.php?macroid=0&name=".concat(name, "&macrotext=abort&action=save"));
    return parseInt((0,external_kolmafia_namespaceObject.xpath)(newMacroText, "//input[@name=".concat(name, "]/@value"))[0], 10);
  } else {
    return parseInt(macroMatches[0], 10);
  }
}

function itemOrNameToItem(itemOrName) {
  return typeof itemOrName === "string" ? external_kolmafia_namespaceObject.Item.get(itemOrName) : itemOrName;
}

var substringCombatItems = template_string_$items(combat_templateObject || (combat_templateObject = combat_taggedTemplateLiteral(["spider web, really sticky spider web, dictionary, NG, Cloaca-Cola, yo-yo, top, ball, kite, yo, red potion, blue potion, adder, red button, pile of sand, mushroom, deluxe mushroom"])));
var substringCombatSkills = $skills(combat_templateObject2 || (combat_templateObject2 = combat_taggedTemplateLiteral(["Shoot, Thrust-Smack, Headbutt, Toss, Sing, Disarm, LIGHT, BURN, Extract, Meteor Shower, Cleave, Boil, Slice, Rainbow"])));

function itemOrItemsBallsMacroName(itemOrItems) {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.map(itemOrItemsBallsMacroName).join(", ");
  } else {
    var item = itemOrNameToItem(itemOrItems);
    return !substringCombatItems.includes(item) ? item.name : (0,external_kolmafia_namespaceObject.toInt)(item).toString();
  }
}

function itemOrItemsBallsMacroPredicate(itemOrItems) {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.map(itemOrItemsBallsMacroPredicate).join(" && ");
  } else {
    return "hascombatitem ".concat(itemOrItems);
  }
}

function skillOrNameToSkill(skillOrName) {
  if (typeof skillOrName === "string") {
    return external_kolmafia_namespaceObject.Skill.get(skillOrName);
  } else {
    return skillOrName;
  }
}

function skillBallsMacroName(skillOrName) {
  var skill = skillOrNameToSkill(skillOrName);
  return skill.name.match(/^[A-Za-z ]+$/) && !substringCombatSkills.includes(skill) ? skill.name : (0,external_kolmafia_namespaceObject.toInt)(skill);
}

var InvalidMacroError = /*#__PURE__*/function (_Error) {
  combat_inherits(InvalidMacroError, _Error);

  var _super = combat_createSuper(InvalidMacroError);

  function InvalidMacroError() {
    combat_classCallCheck(this, InvalidMacroError);

    return _super.apply(this, arguments);
  }

  return InvalidMacroError;
}( /*#__PURE__*/combat_wrapNativeSuper(Error));
/**
 * BALLS macro builder for direct submission to KoL.
 * Create a new macro with `new Macro()` and add steps using the instance methods.
 * Uses a fluent interface, so each step returns the object for easy chaining of steps.
 * Each method is also defined as a static method that creates a new Macro with only that step.
 * For example, you can do `Macro.skill('Saucestorm').attack()`.
 */

var Macro = /*#__PURE__*/function () {
  function Macro() {
    combat_classCallCheck(this, Macro);

    combat_defineProperty(this, "components", []);

    combat_defineProperty(this, "name", MACRO_NAME);
  }

  combat_createClass(Macro, [{
    key: "toString",
    value:
    /**
     * Convert macro to string.
     */
    function toString() {
      return (this.components.join(";") + ";").replace(/;;+/g, ";");
    }
    /**
     * Gives your macro a new name to be used when saving an autoattack.
     * @param name The name to be used when saving as an autoattack.
     * @returns The previous name assigned to this macro.
     */

  }, {
    key: "rename",
    value: function rename(name) {
      var returnValue = this.name;
      this.name = name;
      return returnValue;
    }
    /**
     * Save a macro to a Mafia property for use in a consult script.
     */

  }, {
    key: "save",
    value: function save() {
      _set(Macro.SAVED_MACRO_PROPERTY, this.toString());
    }
    /**
     * Load a saved macro from the Mafia property.
     */

  }, {
    key: "step",
    value:
    /**
     * Statefully add one or several steps to a macro.
     * @param nextSteps The steps to add to the macro.
     * @returns {Macro} This object itself.
     */
    function step() {
      var _ref, _this$components;

      for (var _len = arguments.length, nextSteps = new Array(_len), _key = 0; _key < _len; _key++) {
        nextSteps[_key] = arguments[_key];
      }

      var nextStepsStrings = (_ref = []).concat.apply(_ref, combat_toConsumableArray(nextSteps.map(x => x instanceof Macro ? x.components : [x])));

      (_this$components = this.components).push.apply(_this$components, combat_toConsumableArray(nextStepsStrings.filter(s => s.length > 0)));

      return this;
    }
    /**
     * Statefully add one or several steps to a macro.
     * @param nextSteps The steps to add to the macro.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "submit",
    value:
    /**
     * Submit the built macro to KoL. Only works inside combat.
     */
    function submit() {
      var final = this.toString();
      return (0,external_kolmafia_namespaceObject.visitUrl)("fight.php?action=macro&macrotext=".concat((0,external_kolmafia_namespaceObject.urlEncode)(final)), true, true);
    }
    /**
     * Set this macro as a KoL native autoattack.
     */

  }, {
    key: "setAutoAttack",
    value: function setAutoAttack() {
      var id = Macro.cachedMacroIds.get(this.name);

      if (id === undefined) {
        id = getMacroId(this.name);
        Macro.cachedMacroIds.set(this.name, id);
      }

      if ((0,external_kolmafia_namespaceObject.getAutoAttack)() === 99000000 + id && this.toString() === Macro.cachedAutoAttacks.get(this.name)) {
        // This macro is already set. Don"t make the server request.
        return;
      }

      (0,external_kolmafia_namespaceObject.visitUrl)("account_combatmacros.php?macroid=".concat(id, "&name=").concat((0,external_kolmafia_namespaceObject.urlEncode)(this.name), "&macrotext=").concat((0,external_kolmafia_namespaceObject.urlEncode)(this.toString()), "&action=save"), true, true);
      (0,external_kolmafia_namespaceObject.visitUrl)("account.php?am=1&action=autoattack&value=".concat(99000000 + id, "&ajax=1"));
      Macro.cachedAutoAttacks.set(this.name, this.toString());
    }
    /**
     * Renames the macro, then sets it as an autoattack.
     * @param name The name to save the macro under as an autoattack.
     */

  }, {
    key: "setAutoAttackAs",
    value: function setAutoAttackAs(name) {
      this.name = name;
      this.setAutoAttack();
    }
    /**
     * Clear all cached autoattacks, and delete all stored macros server-side.
     */

  }, {
    key: "abort",
    value:
    /**
     * Add an "abort" step to this macro.
     * @returns {Macro} This object itself.
     */
    function abort() {
      return this.step("abort");
    }
    /**
     * Create a new macro with an "abort" step.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "runaway",
    value:
    /**
     * Add a "runaway" step to this macro.
     * @returns {Macro} This object itself.
     */
    function runaway() {
      return this.step("runaway");
    }
    /**
     * Create a new macro with an "runaway" step.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "if_",
    value:
    /**
     * Add an "if" statement to this macro.
     * @param condition The BALLS condition for the if statement.
     * @param ifTrue Continuation if the condition is true.
     * @returns {Macro} This object itself.
     */
    function if_(condition, ifTrue) {
      return this.step("if ".concat(Macro.makeBALLSPredicate(condition))).step(ifTrue).step("endif");
    }
    /**
     * Create a new macro with an "if" statement.
     * @param condition The BALLS condition for the if statement.
     * @param ifTrue Continuation if the condition is true.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "ifNot",
    value:
    /**
     * Add an "if" statement to this macro, inverting the condition.
     * @param condition The BALLS condition for the if statement.
     * @param ifTrue Continuation if the condition is true.
     * @returns {Macro} This object itself.
     */
    function ifNot(condition, ifTrue) {
      return this.step("if !(".concat(Macro.makeBALLSPredicate(condition), ")")).step(ifTrue).step("endif");
    }
    /**
     * Create a new macro with an "if" statement, inverting the condition.
     * @param condition The BALLS condition for the if statement.
     * @param ifTrue Continuation if the condition is true.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "while_",
    value:
    /**
     * Add a "while" statement to this macro.
     * @param condition The BALLS condition for the if statement.
     * @param contents Loop to repeat while the condition is true.
     * @returns {Macro} This object itself.
     */
    function while_(condition, contents) {
      return this.step("while ".concat(condition)).step(contents).step("endwhile");
    }
    /**
     * Create a new macro with a "while" statement.
     * @param condition The BALLS condition for the if statement.
     * @param contents Loop to repeat while the condition is true.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "externalIf",
    value:
    /**
     * Conditionally add a step to a macro based on a condition evaluated at the time of building the macro.
     * @param condition The JS condition.
     * @param ifTrue Continuation to add if the condition is true.
     * @param ifFalse Optional input to turn this into an if...else statement.
     * @returns {Macro} This object itself.
     */
    function externalIf(condition, ifTrue, ifFalse) {
      if (condition) return this.step(ifTrue);else if (ifFalse) return this.step(ifFalse);else return this;
    }
    /**
     * Create a new macro with a condition evaluated at the time of building the macro.
     * @param condition The JS condition.
     * @param ifTrue Continuation to add if the condition is true.
     * @param ifFalse Optional input to turn this into an if...else statement.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "repeat",
    value:
    /**
     * Add a repeat step to the macro.
     * @returns {Macro} This object itself.
     */
    function repeat() {
      return this.step("repeat");
    }
    /**
     * Add one or more skill cast steps to the macro.
     * @param skills Skills to cast.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "skill",
    value: function skill() {
      for (var _len2 = arguments.length, skills = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        skills[_key2] = arguments[_key2];
      }

      return this.step.apply(this, combat_toConsumableArray(skills.map(skill => {
        return "skill ".concat(skillBallsMacroName(skill));
      })));
    }
    /**
     * Create a new macro with one or more skill cast steps.
     * @param skills Skills to cast.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "trySkill",
    value:
    /**
     * Add one or more skill cast steps to the macro, where each step checks if you have the skill first.
     * @param skills Skills to try casting.
     * @returns {Macro} This object itself.
     */
    function trySkill() {
      for (var _len3 = arguments.length, skills = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        skills[_key3] = arguments[_key3];
      }

      return this.step.apply(this, combat_toConsumableArray(skills.map(skill => {
        return Macro.if_("hasskill ".concat(skillBallsMacroName(skill)), Macro.skill(skill));
      })));
    }
    /**
     * Create a new macro with one or more skill cast steps, where each step checks if you have the skill first.
     * @param skills Skills to try casting.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "trySkillRepeat",
    value:
    /**
     * Add one or more skill-cast-and-repeat steps to the macro, where each step checks if you have the skill first.
     * @param skills Skills to try repeatedly casting.
     * @returns {Macro} This object itself.
     */
    function trySkillRepeat() {
      for (var _len4 = arguments.length, skills = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        skills[_key4] = arguments[_key4];
      }

      return this.step.apply(this, combat_toConsumableArray(skills.map(skill => {
        return Macro.if_("hasskill ".concat(skillBallsMacroName(skill)), Macro.skill(skill).repeat());
      })));
    }
    /**
     * Create a new macro with one or more skill-cast-and-repeat steps, where each step checks if you have the skill first.
     * @param skills Skills to try repeatedly casting.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "item",
    value:
    /**
     * Add one or more item steps to the macro.
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */
    function item() {
      for (var _len5 = arguments.length, items = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        items[_key5] = arguments[_key5];
      }

      return this.step.apply(this, combat_toConsumableArray(items.map(itemOrItems => {
        return "use ".concat(itemOrItemsBallsMacroName(itemOrItems));
      })));
    }
    /**
     * Create a new macro with one or more item steps.
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "tryItem",
    value:
    /**
     * Add one or more item steps to the macro, where each step checks to see if you have the item first.
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */
    function tryItem() {
      for (var _len6 = arguments.length, items = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        items[_key6] = arguments[_key6];
      }

      return this.step.apply(this, combat_toConsumableArray(items.map(item => {
        return Macro.if_(itemOrItemsBallsMacroPredicate(item), "use ".concat(itemOrItemsBallsMacroName(item)));
      })));
    }
    /**
     * Create a new macro with one or more item steps, where each step checks to see if you have the item first.
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "attack",
    value:
    /**
     * Add an attack step to the macro.
     * @returns {Macro} This object itself.
     */
    function attack() {
      return this.step("attack");
    }
    /**
     * Create a new macro with an attack step.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "ifHolidayWanderer",
    value:
    /**
     * Create an if_ statement based on what holiday of loathing it currently is. On non-holidays, returns the original macro, unmutated.
     * @param macro The macro to place in the if_ statement
     */
    function ifHolidayWanderer(macro) {
      var todaysWanderers = getTodaysHolidayWanderers();
      if (todaysWanderers.length === 0) return this;
      return this.if_(todaysWanderers.map(monster => "monsterid ".concat(monster.id)).join(" || "), macro);
    }
    /**
     * Create a new macro starting with an ifHolidayWanderer step.
     * @param macro The macro to place inside the if_ statement
     */

  }, {
    key: "ifNotHolidayWanderer",
    value:
    /**
     * Create an if_ statement based on what holiday of loathing it currently is. On non-holidays, returns the original macro, with the input macro appended.
     * @param macro The macro to place in the if_ statement.
     */
    function ifNotHolidayWanderer(macro) {
      var todaysWanderers = getTodaysHolidayWanderers();
      if (todaysWanderers.length === 0) return this.step(macro);
      return this.if_(todaysWanderers.map(monster => "!monsterid ".concat(monster.id)).join(" && "), macro);
    }
    /**
     * Create a new macro starting with an ifNotHolidayWanderer step.
     * @param macro The macro to place inside the if_ statement
     */

  }], [{
    key: "load",
    value: function load() {
      var _this;

      return (_this = new this()).step.apply(_this, combat_toConsumableArray(property_get(Macro.SAVED_MACRO_PROPERTY).split(";")));
    }
    /**
     * Clear the saved macro in the Mafia property.
     */

  }, {
    key: "clearSaved",
    value: function clearSaved() {
      (0,external_kolmafia_namespaceObject.removeProperty)(Macro.SAVED_MACRO_PROPERTY);
    }
  }, {
    key: "step",
    value: function step() {
      var _this2;

      return (_this2 = new this()).step.apply(_this2, arguments);
    }
  }, {
    key: "clearAutoAttackMacros",
    value: function clearAutoAttackMacros() {
      var _iterator = combat_createForOfIteratorHelper(Macro.cachedAutoAttacks.keys()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _Macro$cachedMacroIds;

          var name = _step.value;
          var id = (_Macro$cachedMacroIds = Macro.cachedMacroIds.get(name)) !== null && _Macro$cachedMacroIds !== void 0 ? _Macro$cachedMacroIds : getMacroId(name);
          (0,external_kolmafia_namespaceObject.visitUrl)("account_combatmacros.php?macroid=".concat(id, "&action=edit&what=Delete&confirm=1"));
          Macro.cachedAutoAttacks.delete(name);
          Macro.cachedMacroIds.delete(name);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "abort",
    value: function abort() {
      return new this().abort();
    }
  }, {
    key: "runaway",
    value: function runaway() {
      return new this().runaway();
    }
  }, {
    key: "makeBALLSPredicate",
    value: function makeBALLSPredicate(condition) {
      var ballsCondition = "";

      if (condition instanceof external_kolmafia_namespaceObject.Monster) {
        ballsCondition = "monsterid ".concat(condition.id);
      } else if (condition instanceof Array) {
        ballsCondition = condition.map(mon => "monsterid ".concat(mon.id)).join(" || ");
        ballsCondition = "(".concat(ballsCondition, ")");
      } else if (condition instanceof external_kolmafia_namespaceObject.Effect) {
        ballsCondition = "haseffect ".concat((0,external_kolmafia_namespaceObject.toInt)(condition));
      } else if (condition instanceof external_kolmafia_namespaceObject.Skill) {
        ballsCondition = "hasskill ".concat(skillBallsMacroName(condition));
      } else if (condition instanceof external_kolmafia_namespaceObject.Item) {
        if (!condition.combat) {
          throw new InvalidMacroError("Item ".concat(condition, " cannot be made a valid BALLS predicate (it is not combat-usable)"));
        }

        ballsCondition = "hascombatitem ".concat(itemOrItemsBallsMacroName(condition));
      } else if (condition instanceof external_kolmafia_namespaceObject.Location) {
        var snarfblat = condition.id;

        if (snarfblat < 1) {
          throw new InvalidMacroError("Location ".concat(condition, " cannot be made a valid BALLS predicate (it has no location id)"));
        }

        ballsCondition = "snarfblat ".concat(snarfblat);
      } else if (condition instanceof external_kolmafia_namespaceObject.Class) {
        if ((0,external_kolmafia_namespaceObject.toInt)(condition) > 6) {
          throw new InvalidMacroError("Class ".concat(condition, " cannot be made a valid BALLS predicate (it is not a standard class)"));
        }

        ballsCondition = condition.toString().replaceAll(" ", "").toLowerCase();
      } else if (condition instanceof external_kolmafia_namespaceObject.Stat) {
        ballsCondition = "".concat(condition.toString().toLowerCase(), "class");
      } else {
        ballsCondition = condition;
      }

      return ballsCondition;
    }
  }, {
    key: "if_",
    value: function if_(condition, ifTrue) {
      return new this().if_(condition, ifTrue);
    }
  }, {
    key: "ifNot",
    value: function ifNot(condition, ifTrue) {
      return new this().ifNot(condition, ifTrue);
    }
  }, {
    key: "while_",
    value: function while_(condition, contents) {
      return new this().while_(condition, contents);
    }
  }, {
    key: "externalIf",
    value: function externalIf(condition, ifTrue, ifFalse) {
      return new this().externalIf(condition, ifTrue, ifFalse);
    }
  }, {
    key: "skill",
    value: function skill() {
      var _this3;

      return (_this3 = new this()).skill.apply(_this3, arguments);
    }
  }, {
    key: "trySkill",
    value: function trySkill() {
      var _this4;

      return (_this4 = new this()).trySkill.apply(_this4, arguments);
    }
  }, {
    key: "trySkillRepeat",
    value: function trySkillRepeat() {
      var _this5;

      return (_this5 = new this()).trySkillRepeat.apply(_this5, arguments);
    }
  }, {
    key: "item",
    value: function item() {
      var _this6;

      return (_this6 = new this()).item.apply(_this6, arguments);
    }
  }, {
    key: "tryItem",
    value: function tryItem() {
      var _this7;

      return (_this7 = new this()).tryItem.apply(_this7, arguments);
    }
  }, {
    key: "attack",
    value: function attack() {
      return new this().attack();
    }
  }, {
    key: "ifHolidayWanderer",
    value: function ifHolidayWanderer(macro) {
      return new this().ifHolidayWanderer(macro);
    }
  }, {
    key: "ifNotHolidayWanderer",
    value: function ifNotHolidayWanderer(macro) {
      return new this().ifNotHolidayWanderer(macro);
    }
  }]);

  return Macro;
}();
/**
 * Adventure in a location and handle all combats with a given macro.
 * To use this function you will need to create a consult script that runs Macro.load().submit() and a CCS that calls that consult script.
 * See examples/consult.ts for an example.
 *
 * @category Combat
 * @param loc Location to adventure in.
 * @param macro Macro to execute.
 */

combat_defineProperty(Macro, "SAVED_MACRO_PROPERTY", "libram_savedMacro");

combat_defineProperty(Macro, "cachedMacroIds", new Map());

combat_defineProperty(Macro, "cachedAutoAttacks", new Map());

function adventureMacro(loc, macro) {
  macro.save();
  setAutoAttack(0);

  try {
    adv1(loc, 0, "");

    while (inMultiFight()) {
      runCombat();
    }

    if (choiceFollowsFight()) visitUrl("choice.php");
  } finally {
    Macro.clearSaved();
  }
}
/**
 * Adventure in a location and handle all combats with a given autoattack and manual macro.
 * To use the nextMacro parameter you will need to create a consult script that runs Macro.load().submit() and a CCS that calls that consult script.
 * See examples/consult.ts for an example.
 *
 * @category Combat
 * @param loc Location to adventure in.
 * @param autoMacro Macro to execute via KoL autoattack.
 * @param nextMacro Macro to execute manually after autoattack completes.
 */

function adventureMacroAuto(loc, autoMacro) {
  var _nextMacro;

  var nextMacro = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  nextMacro = (_nextMacro = nextMacro) !== null && _nextMacro !== void 0 ? _nextMacro : Macro.abort();
  autoMacro.setAutoAttack();
  nextMacro.save();

  try {
    adv1(loc, 0, "");

    while (inMultiFight()) {
      runCombat();
    }

    if (choiceFollowsFight()) visitUrl("choice.php");
  } finally {
    Macro.clearSaved();
  }
}
var StrictMacro = /*#__PURE__*/(/* unused pure expression or super */ null && (function (_Macro) {
  combat_inherits(StrictMacro, _Macro);

  var _super2 = combat_createSuper(StrictMacro);

  function StrictMacro() {
    combat_classCallCheck(this, StrictMacro);

    return _super2.apply(this, arguments);
  }

  combat_createClass(StrictMacro, [{
    key: "skill",
    value:
    /**
     * Add one or more skill cast steps to the macro.
     * @param skills Skills to cast.
     * @returns {StrictMacro} This object itself.
     */
    function skill() {
      var _get2;

      for (var _len7 = arguments.length, skills = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        skills[_key7] = arguments[_key7];
      }

      return (_get2 = _get(combat_getPrototypeOf(StrictMacro.prototype), "skill", this)).call.apply(_get2, [this].concat(skills));
    }
    /**
     * Create a new macro with one or more skill cast steps.
     * @param skills Skills to cast.
     * @returns {StrictMacro} This object itself.
     */

  }, {
    key: "item",
    value:
    /**
     * Add one or more item steps to the macro.
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */
    function item() {
      var _get3;

      for (var _len8 = arguments.length, items = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        items[_key8] = arguments[_key8];
      }

      return (_get3 = _get(combat_getPrototypeOf(StrictMacro.prototype), "item", this)).call.apply(_get3, [this].concat(items));
    }
    /**
     * Create a new macro with one or more item steps.
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */

  }, {
    key: "trySkill",
    value:
    /**
     * Add one or more skill cast steps to the macro, where each step checks if you have the skill first.
     * @param skills Skills to try casting.
     * @returns {StrictMacro} This object itself.
     */
    function trySkill() {
      var _get4;

      for (var _len9 = arguments.length, skills = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        skills[_key9] = arguments[_key9];
      }

      return (_get4 = _get(combat_getPrototypeOf(StrictMacro.prototype), "trySkill", this)).call.apply(_get4, [this].concat(skills));
    }
    /**
     * Create a new macro with one or more skill cast steps, where each step checks if you have the skill first.
     * @param skills Skills to try casting.
     * @returns {StrictMacro} This object itself.
     */

  }, {
    key: "tryItem",
    value:
    /**
     * Add one or more item steps to the macro, where each step checks to see if you have the item first.
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */
    function tryItem() {
      var _get5;

      for (var _len10 = arguments.length, items = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        items[_key10] = arguments[_key10];
      }

      return (_get5 = _get(combat_getPrototypeOf(StrictMacro.prototype), "tryItem", this)).call.apply(_get5, [this].concat(items));
    }
    /**
     * Create a new macro with one or more item steps, where each step checks to see if you have the item first.
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */

  }, {
    key: "trySkillRepeat",
    value:
    /**
     * Add one or more skill-cast-and-repeat steps to the macro, where each step checks if you have the skill first.
     * @param skills Skills to try repeatedly casting.
     * @returns {StrictMacro} This object itself.
     */
    function trySkillRepeat() {
      var _get6;

      for (var _len11 = arguments.length, skills = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
        skills[_key11] = arguments[_key11];
      }

      return (_get6 = _get(combat_getPrototypeOf(StrictMacro.prototype), "trySkillRepeat", this)).call.apply(_get6, [this].concat(skills));
    }
    /**
     * Create a new macro with one or more skill-cast-and-repeat steps, where each step checks if you have the skill first.
     * @param skills Skills to try repeatedly casting.
     * @returns {StrictMacro} This object itself.
     */

  }], [{
    key: "skill",
    value: function skill() {
      var _this8;

      return (_this8 = new this()).skill.apply(_this8, arguments);
    }
  }, {
    key: "item",
    value: function item() {
      var _this9;

      return (_this9 = new this()).item.apply(_this9, arguments);
    }
  }, {
    key: "trySkill",
    value: function trySkill() {
      var _this10;

      return (_this10 = new this()).trySkill.apply(_this10, arguments);
    }
  }, {
    key: "tryItem",
    value: function tryItem() {
      var _this11;

      return (_this11 = new this()).tryItem.apply(_this11, arguments);
    }
  }, {
    key: "trySkillRepeat",
    value: function trySkillRepeat() {
      var _this12;

      return (_this12 = new this()).trySkillRepeat.apply(_this12, arguments);
    }
  }]);

  return StrictMacro;
}(Macro)));
;// CONCATENATED MODULE: ./node_modules/grimoire-kolmafia/dist/combat.js
function dist_combat_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) dist_combat_setPrototypeOf(subClass, superClass); }

function dist_combat_setPrototypeOf(o, p) { dist_combat_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return dist_combat_setPrototypeOf(o, p); }

function dist_combat_createSuper(Derived) { var hasNativeReflectConstruct = dist_combat_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = dist_combat_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = dist_combat_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return dist_combat_possibleConstructorReturn(this, result); }; }

function dist_combat_possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return dist_combat_assertThisInitialized(self); }

function dist_combat_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function dist_combat_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function dist_combat_getPrototypeOf(o) { dist_combat_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return dist_combat_getPrototypeOf(o); }

function dist_combat_toConsumableArray(arr) { return dist_combat_arrayWithoutHoles(arr) || dist_combat_iterableToArray(arr) || dist_combat_unsupportedIterableToArray(arr) || dist_combat_nonIterableSpread(); }

function dist_combat_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function dist_combat_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function dist_combat_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return dist_combat_arrayLikeToArray(arr); }

function dist_combat_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = dist_combat_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function dist_combat_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return dist_combat_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return dist_combat_arrayLikeToArray(o, minLen); }

function dist_combat_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function dist_combat_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function dist_combat_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function dist_combat_createClass(Constructor, protoProps, staticProps) { if (protoProps) dist_combat_defineProperties(Constructor.prototype, protoProps); if (staticProps) dist_combat_defineProperties(Constructor, staticProps); return Constructor; }




function undelay(macro) {
  if (macro instanceof Macro) return macro;else return macro();
}
/**
 * The strategy to use for combat for a task, which indicates what to do
 * for each monster.
 *
 * There are two ways to specify in a task what to do for a given monster:
 *   1. Provide a macro directly through .macro(macro, ...monsters)
 *   2. Provide an action through .action(action, ...monsters)
 *
 * An action is a strategy for dealing with a monster that is not fully
 * defined in the task. The possible actions are set with the type parameter A.
 * Actions should typically end the fight.
 *
 * For example, a task may want to banish a monster but not necessarily know or
 * care which banisher is used. Instead, it is best for the engine to determine
 * which banisher to use on the monster. To facilitate this, "banish" can be
 * defined as an action, e.g. with CombatStrategy<"banish">;
 *
 * Each action can be resolved by the engine by:
 *   1. Providing a default macro for the action through ActionDefaults<A>,
 *      which can be done through combat_defaults in Engine options, or
 *   2. Providing a CombatResource for the action through CombatResources<A>.
 *      This is typically done in Engine.customize() by checking if a given
 *      action is requested by the task with combat.can(.), and then providing
 *      an appropriate resource with resources.provide(.).
 *
 * A monster may have both a macro and an action defined, and a macro or action
 * can be specified to be done on all monsters. The order of combat is then:
 * 1. The macro(s) given in .startingMacro().
 * 2. The monster-specific macro(s) from .macro().
 * 3. The general macro(s) from .macro().
 * 4. The monster-specific action from .action().
 * 5. The general action from .action().
 *
 * If an autoattack is set with .autoattack(), the order of the autoattack is:
 * 1. The monster-specific macro(s) from .autoattack().
 * 2. The general macro(s) from .autoattack().
 */


var CombatStrategy = /*#__PURE__*/function () {
  function CombatStrategy() {
    dist_combat_classCallCheck(this, CombatStrategy);

    this.macros = new Map();
    this.autoattacks = new Map();
    this.actions = new Map();
    this.ccs_entries = new Map();
  }
  /**
   * Add a macro to perform for this monster. If multiple macros are given
   * for the same monster, they are concatinated.
   *
   * @param macro The macro to perform.
   * @param monsters Which monsters to use the macro on. If not given, add the
   *  macro as a general macro.
   * @param prepend If true, add the macro before all previous macros for
   *    the same monster. If false, add after all previous macros.
   * @returns this
   */


  dist_combat_createClass(CombatStrategy, [{
    key: "macro",
    value: function macro(_macro, monsters, prepend) {
      var _a, _b;

      if (monsters === undefined) {
        if (this.default_macro === undefined) this.default_macro = [];
        if (prepend) this.default_macro.unshift(_macro);else this.default_macro.push(_macro);
      } else {
        if (monsters instanceof external_kolmafia_namespaceObject.Monster) monsters = [monsters];

        var _iterator = dist_combat_createForOfIteratorHelper(monsters),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var monster = _step.value;
            if (!this.macros.has(monster)) this.macros.set(monster, []);
            if (prepend) (_a = this.macros.get(monster)) === null || _a === void 0 ? void 0 : _a.unshift(_macro);else (_b = this.macros.get(monster)) === null || _b === void 0 ? void 0 : _b.push(_macro);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      return this;
    }
    /**
     * Add a macro to perform as an autoattack for this monster. If multiple
     * macros are given for the same monster, they are concatinated.
     *
     * @param macro The macro to perform as autoattack.
     * @param monsters Which monsters to use the macro on. If not given, add the
     *  macro as a general macro.
     * @param prepend If true, add the macro before all previous autoattack
     *    macros for the same monster. If false, add after all previous macros.
     * @returns this
     */

  }, {
    key: "autoattack",
    value: function autoattack(macro, monsters, prepend) {
      var _a, _b;

      if (monsters === undefined) {
        if (this.default_autoattack === undefined) this.default_autoattack = [];
        if (prepend) this.default_autoattack.unshift(macro);else this.default_autoattack.push(macro);
      } else {
        if (monsters instanceof external_kolmafia_namespaceObject.Monster) monsters = [monsters];

        var _iterator2 = dist_combat_createForOfIteratorHelper(monsters),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var monster = _step2.value;
            if (!this.autoattacks.has(monster)) this.autoattacks.set(monster, []);
            if (prepend) (_a = this.autoattacks.get(monster)) === null || _a === void 0 ? void 0 : _a.unshift(macro);else (_b = this.autoattacks.get(monster)) === null || _b === void 0 ? void 0 : _b.push(macro);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }

      return this;
    }
    /**
     * Add a macro to perform at the start of combat.
     * @param macro The macro to perform.
     * @param prepend If true, add the macro before all previous starting
     *    macros. If false, add after all previous starting macros.
     * @returns this
     */

  }, {
    key: "startingMacro",
    value: function startingMacro(macro, prepend) {
      if (this.starting_macro === undefined) this.starting_macro = [];
      if (prepend) this.starting_macro.unshift(macro);else this.starting_macro.push(macro);
      return this;
    }
    /**
     * Add an action to perform for this monster. Only one action can be set for
     * each monster; any previous actions are overwritten.
     *
     * @param action The action to perform.
     * @param monsters Which monsters to use the action on. If not given, set the
     *  action as the general action for all monsters.
     * @returns this
     */

  }, {
    key: "action",
    value: function action(_action, monsters) {
      if (monsters === undefined) {
        this.default_action = _action;
      } else if (monsters instanceof external_kolmafia_namespaceObject.Monster) {
        this.actions.set(monsters, _action);
      } else {
        var _iterator3 = dist_combat_createForOfIteratorHelper(monsters),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var monster = _step3.value;
            this.actions.set(monster, _action);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }

      return this;
    }
    /**
     * Add a separate entry in the grimoire-generated CCS file for the specified
     * monster. If multiple entries are given for the same monster, they are
     * concatinated.
     *
     * This should typically be only used rarely, on monsters for which KoL does
     * not support macros in combat (e.g. rampaging adding machine).
     *
     * @param entry The entry to add for the given monster.
     * @param monsters Which monsters to add the entry to.
     * @param prepend If true, add the entry before all previous entries. If
     *   false, add after all previous entries.
     */

  }, {
    key: "ccs",
    value: function ccs(entry, monsters, prepend) {
      var _a, _b;

      if (monsters instanceof external_kolmafia_namespaceObject.Monster) monsters = [monsters];

      var _iterator4 = dist_combat_createForOfIteratorHelper(monsters),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var monster = _step4.value;
          if (!this.ccs_entries.has(monster)) this.ccs_entries.set(monster, []);
          if (prepend) (_a = this.ccs_entries.get(monster)) === null || _a === void 0 ? void 0 : _a.unshift(entry);else (_b = this.ccs_entries.get(monster)) === null || _b === void 0 ? void 0 : _b.push(entry);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      return this;
    }
    /**
     * Check if the provided action was requested for any monsters, or for the
     * general action.
     */

  }, {
    key: "can",
    value: function can(action) {
      if (action === this.default_action) return true;
      return Array.from(this.actions.values()).includes(action);
    }
    /**
     * Return the general action (if it exists).
     */

  }, {
    key: "getDefaultAction",
    value: function getDefaultAction() {
      return this.default_action;
    }
    /**
     * Return all monsters where the provided action was requested.
     */

  }, {
    key: "where",
    value: function where(action) {
      return Array.from(this.actions.keys()).filter(key => this.actions.get(key) === action);
    }
    /**
     * Return the requested action (if it exists) for the provided monster.
     */

  }, {
    key: "currentStrategy",
    value: function currentStrategy(monster) {
      var _a;

      return (_a = this.actions.get(monster)) !== null && _a !== void 0 ? _a : this.default_action;
    }
    /**
     * Perform a deep copy of this combat strategy.
     */

  }, {
    key: "clone",
    value: function clone() {
      var result = new CombatStrategy();
      if (this.starting_macro) result.starting_macro = dist_combat_toConsumableArray(this.starting_macro);
      if (this.default_macro) result.default_macro = dist_combat_toConsumableArray(this.default_macro);

      var _iterator5 = dist_combat_createForOfIteratorHelper(this.macros),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var pair = _step5.value;
          result.macros.set(pair[0], dist_combat_toConsumableArray(pair[1]));
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      if (this.default_autoattack) result.default_autoattack = dist_combat_toConsumableArray(this.default_autoattack);

      var _iterator6 = dist_combat_createForOfIteratorHelper(this.autoattacks),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var _pair = _step6.value;
          result.autoattacks.set(_pair[0], dist_combat_toConsumableArray(_pair[1]));
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }

      result.default_action = this.default_action;

      var _iterator7 = dist_combat_createForOfIteratorHelper(this.actions),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var _pair2 = _step7.value;
          result.actions.set(_pair2[0], _pair2[1]);
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }

      var _iterator8 = dist_combat_createForOfIteratorHelper(this.ccs_entries),
          _step8;

      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var _pair3 = _step8.value;
          result.ccs_entries.set(_pair3[0], dist_combat_toConsumableArray(_pair3[1]));
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }

      return result;
    }
    /**
     * Compile this combat strategy into a complete macro.
     *
     * @param resources The resources to use to fulfil actions.
     * @param defaults Macros to perform for each action without a resource.
     * @param location The adventuring location, if known.
     * @returns The compiled macro.
     */

  }, {
    key: "compile",
    value: function compile(resources, defaults, location) {
      var _a, _b;

      var result = new Macro(); // If there is macro precursor, do it now

      if (this.starting_macro) {
        result.step.apply(result, dist_combat_toConsumableArray(this.starting_macro.map(undelay)));
      } // Perform any monster-specific macros (these may or may not end the fight)


      var monster_macros = new CompressedMacro();
      this.macros.forEach((value, key) => {
        var _Macro;

        monster_macros.add(key, (_Macro = new Macro()).step.apply(_Macro, dist_combat_toConsumableArray(value.map(undelay))));
      });
      result.step(monster_macros.compile()); // Perform the non-monster specific macro

      if (this.default_macro) result.step.apply(result, dist_combat_toConsumableArray(this.default_macro.map(undelay))); // Perform any monster-specific actions (these should end the fight)

      var monster_actions = new CompressedMacro();
      this.actions.forEach((action, key) => {
        var _a, _b;

        var macro = (_a = resources.getMacro(action)) !== null && _a !== void 0 ? _a : (_b = defaults === null || defaults === void 0 ? void 0 : defaults[action]) === null || _b === void 0 ? void 0 : _b.call(defaults, key);
        if (macro) monster_actions.add(key, new Macro().step(macro));
      });
      result.step(monster_actions.compile()); // Perform the non-monster specific action (these should end the fight)

      if (this.default_action) {
        var macro = (_a = resources.getMacro(this.default_action)) !== null && _a !== void 0 ? _a : (_b = defaults === null || defaults === void 0 ? void 0 : defaults[this.default_action]) === null || _b === void 0 ? void 0 : _b.call(defaults, location);
        if (macro) result.step(macro);
      }

      return result;
    }
    /**
     * Compile the autoattack of this combat strategy into a complete macro.
     *
     * @returns The compiled autoattack macro.
     */

  }, {
    key: "compileAutoattack",
    value: function compileAutoattack() {
      var result = new Macro(); // Perform any monster-specific autoattacks (these may or may not end the fight)

      var monster_macros = new CompressedMacro();
      this.autoattacks.forEach((value, key) => {
        var _Macro2;

        monster_macros.add(key, (_Macro2 = new Macro()).step.apply(_Macro2, dist_combat_toConsumableArray(value.map(undelay))));
      });
      result.step(monster_macros.compile()); // Perform the non-monster specific macro

      if (this.default_autoattack) result.step.apply(result, dist_combat_toConsumableArray(this.default_autoattack.map(undelay)));
      return result;
    }
    /**
     * Compile the CCS entries of this combat strategy into a single array.
     *
     * @returns The lines of a CCS file, not including the [default] macro.
     */

  }, {
    key: "compileCcs",
    value: function compileCcs() {
      var result = [];

      var _iterator9 = dist_combat_createForOfIteratorHelper(this.ccs_entries),
          _step9;

      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var ccs_entry = _step9.value;
          result.push.apply(result, ["[".concat(ccs_entry[0].name, "]")].concat(dist_combat_toConsumableArray(ccs_entry[1])));
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }

      return result;
    }
    /**
     * For advanced users, this method will generate a fluent API for requesting
     * actions. That is, it allows you to do
     *   combat.banish(monster1).kill(monster2)
     * instead of
     *   combat.action("banish", monster1).action("kill", monster2)
     *
     * Example usage:
     *   const myActions = ["kill", "banish"] as const;
     *   class MyCombatStrategy extends CombatStrategy.withActions(myActions) {}
     *
     *   const foo: MyCombatStrategy = new MyCombatStrategy();
     *   const bar: MyCombatStrategy = foo.banish($monster`crate`).kill($monster`tumbleweed`);
     */

  }], [{
    key: "withActions",
    value: function withActions(actions) {
      var CombatStrategyWithActions = /*#__PURE__*/function (_this) {
        dist_combat_inherits(CombatStrategyWithActions, _this);

        var _super = dist_combat_createSuper(CombatStrategyWithActions);

        function CombatStrategyWithActions() {
          dist_combat_classCallCheck(this, CombatStrategyWithActions);

          return _super.apply(this, arguments);
        }

        return CombatStrategyWithActions;
      }(this); // eslint-disable-next-line @typescript-eslint/no-explicit-any


      var proto = CombatStrategyWithActions.prototype;

      var _iterator10 = dist_combat_createForOfIteratorHelper(actions),
          _step10;

      try {
        var _loop = function _loop() {
          var action = _step10.value;

          proto[action] = function (monsters) {
            return this.action(action, monsters);
          };
        };

        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
          _loop();
        } // eslint-disable-next-line @typescript-eslint/no-explicit-any

      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }

      return CombatStrategyWithActions;
    }
  }]);

  return CombatStrategy;
}();
/**
 * A class to build a macro that combines if statements (keyed on monster) with
 * identical body into a single if statement, to avoid the 37-action limit.
 * Ex: [if x; A; if y; B; if z; A;] will turn into [if x || z; A; if y; B]
 */

var CompressedMacro = /*#__PURE__*/function () {
  function CompressedMacro() {
    dist_combat_classCallCheck(this, CompressedMacro);

    this.components = new Map();
  }
  /**
   * Set the macro for a given monster (replacing any previous macros).
   */


  dist_combat_createClass(CompressedMacro, [{
    key: "add",
    value: function add(monster, macro) {
      var _a;

      var macro_text = macro.toString();
      if (macro_text.length === 0) return;
      if (!this.components.has(macro_text)) this.components.set(macro_text, [monster]);else (_a = this.components.get(macro_text)) === null || _a === void 0 ? void 0 : _a.push(monster);
    }
    /**
     * Compile the compressed form of the macro.
     */

  }, {
    key: "compile",
    value: function compile() {
      var result = new Macro();
      this.components.forEach((monsters, macro) => {
        var condition = monsters.map(mon => "monsterid ".concat(mon.id)).join(" || ");
        result.if_(condition, macro);
      });
      return result;
    }
  }]);

  return CompressedMacro;
}();
/**
 * A class for providing resources to fulfil combat actions.
 */


var CombatResources = /*#__PURE__*/function () {
  function CombatResources() {
    dist_combat_classCallCheck(this, CombatResources);

    this.resources = new Map();
  }
  /**
   * Use the provided resource to fulfil the provided action.
   * (If the resource is undefined, this does nothing).
   */


  dist_combat_createClass(CombatResources, [{
    key: "provide",
    value: function provide(action, resource) {
      if (resource === undefined) return;
      this.resources.set(action, resource);
    }
    /**
     * Return true if the provided action has a resource provided.
     */

  }, {
    key: "has",
    value: function has(action) {
      return this.resources.has(action);
    }
    /**
     * Return all provided combat resources.
     */

  }, {
    key: "all",
    value: function all() {
      return Array.from(this.resources.values());
    }
    /**
     * Get the macro provided by the resource for this action, or undefined if
     * no resource was provided.
     */

  }, {
    key: "getMacro",
    value: function getMacro(action) {
      var resource = this.resources.get(action);
      if (resource === undefined) return undefined;
      if (resource.do instanceof external_kolmafia_namespaceObject.Item) return new Macro().item(resource.do);
      if (resource.do instanceof external_kolmafia_namespaceObject.Skill) return new Macro().skill(resource.do);
      return resource.do;
    }
  }]);

  return CombatResources;
}();
;// CONCATENATED MODULE: ./node_modules/libram/dist/logger.js
function logger_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function logger_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function logger_createClass(Constructor, protoProps, staticProps) { if (protoProps) logger_defineProperties(Constructor.prototype, protoProps); if (staticProps) logger_defineProperties(Constructor, staticProps); return Constructor; }

function logger_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var defaultHandlers = {
  info: message => (0,external_kolmafia_namespaceObject.printHtml)("<b>[Libram]</b> ".concat(message)),
  warning: message => (0,external_kolmafia_namespaceObject.printHtml)("<span style=\"background: orange; color: white;\"><b>[Libram]</b> ".concat(message, "</span>")),
  error: _error => (0,external_kolmafia_namespaceObject.printHtml)("<span style=\"background: red; color: white;\"><b>[Libram]</b> ".concat(_error.toString(), "</span>"))
};

var Logger = /*#__PURE__*/function () {
  function Logger() {
    logger_classCallCheck(this, Logger);

    logger_defineProperty(this, "handlers", defaultHandlers);
  }

  logger_createClass(Logger, [{
    key: "setHandler",
    value: // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function setHandler(level, callback) {
      this.handlers[level] = callback;
    } // eslint-disable-next-line @typescript-eslint/no-explicit-any

  }, {
    key: "log",
    value: function log(level, message) {
      this.handlers[level](message);
    }
  }, {
    key: "info",
    value: function info(message) {
      this.log("info", message);
    }
  }, {
    key: "warning",
    value: function warning(message) {
      this.log("warning", message);
    }
  }, {
    key: "error",
    value: function error(message) {
      this.log("error", message);
    }
  }]);

  return Logger;
}();

/* harmony default export */ const logger = (new Logger());
;// CONCATENATED MODULE: ./node_modules/libram/dist/maximize.js
var maximize_templateObject, maximize_templateObject2, maximize_templateObject3, maximize_templateObject4, maximize_templateObject5, maximize_templateObject6, maximize_templateObject7, maximize_templateObject8, maximize_templateObject9, maximize_templateObject10, maximize_templateObject11, maximize_templateObject12, maximize_templateObject13, maximize_templateObject14, maximize_templateObject15, maximize_templateObject16, maximize_templateObject17, maximize_templateObject18, maximize_templateObject19, maximize_templateObject20, maximize_templateObject21, maximize_templateObject22, maximize_templateObject23, maximize_templateObject24, maximize_templateObject25, maximize_templateObject26, maximize_templateObject27, maximize_templateObject28, maximize_templateObject29, maximize_templateObject30, maximize_templateObject31, maximize_templateObject32, maximize_templateObject33, maximize_templateObject34, _templateObject35, _templateObject36, _templateObject37, _templateObject38, _templateObject39, _templateObject40, _templateObject41, _templateObject42, _templateObject43, _templateObject44, _templateObject45, _templateObject46, _templateObject47, _templateObject48;

function maximize_slicedToArray(arr, i) { return maximize_arrayWithHoles(arr) || maximize_iterableToArrayLimit(arr, i) || maximize_unsupportedIterableToArray(arr, i) || maximize_nonIterableRest(); }

function maximize_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function maximize_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function maximize_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function maximize_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function maximize_createClass(Constructor, protoProps, staticProps) { if (protoProps) maximize_defineProperties(Constructor.prototype, protoProps); if (staticProps) maximize_defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function maximize_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function maximize_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = maximize_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function maximize_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function maximize_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function maximize_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { maximize_ownKeys(Object(source), true).forEach(function (key) { maximize_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { maximize_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function maximize_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function maximize_toConsumableArray(arr) { return maximize_arrayWithoutHoles(arr) || maximize_iterableToArray(arr) || maximize_unsupportedIterableToArray(arr) || maximize_nonIterableSpread(); }

function maximize_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function maximize_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return maximize_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return maximize_arrayLikeToArray(o, minLen); }

function maximize_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function maximize_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return maximize_arrayLikeToArray(arr); }

function maximize_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





/**
 * Merges a Partial<MaximizeOptions> onto a MaximizeOptions. We merge via overriding for all boolean properties and for onlySlot, and concat all other array properties.
 * @param defaultOptions MaximizeOptions to use as a "base."
 * @param addendums Options to attempt to merge onto defaultOptions.
 */

function mergeMaximizeOptions(defaultOptions, addendums) {
  var _addendums$updateOnFa, _addendums$updateOnCa, _addendums$useOutfitC, _addendums$forceEquip, _addendums$preventEqu, _addendums$bonusEquip, _addendums$onlySlot, _addendums$preventSlo, _addendums$forceUpdat, _addendums$modes;

  return {
    updateOnFamiliarChange: (_addendums$updateOnFa = addendums.updateOnFamiliarChange) !== null && _addendums$updateOnFa !== void 0 ? _addendums$updateOnFa : defaultOptions.updateOnFamiliarChange,
    updateOnCanEquipChanged: (_addendums$updateOnCa = addendums.updateOnCanEquipChanged) !== null && _addendums$updateOnCa !== void 0 ? _addendums$updateOnCa : defaultOptions.updateOnCanEquipChanged,
    useOutfitCaching: (_addendums$useOutfitC = addendums.useOutfitCaching) !== null && _addendums$useOutfitC !== void 0 ? _addendums$useOutfitC : defaultOptions.useOutfitCaching,
    forceEquip: [].concat(maximize_toConsumableArray(defaultOptions.forceEquip), maximize_toConsumableArray((_addendums$forceEquip = addendums.forceEquip) !== null && _addendums$forceEquip !== void 0 ? _addendums$forceEquip : [])),
    preventEquip: [].concat(maximize_toConsumableArray(defaultOptions.preventEquip), maximize_toConsumableArray((_addendums$preventEqu = addendums.preventEquip) !== null && _addendums$preventEqu !== void 0 ? _addendums$preventEqu : [])).filter(item => {
      var _addendums$forceEquip2;

      return !defaultOptions.forceEquip.includes(item) && !((_addendums$forceEquip2 = addendums.forceEquip) !== null && _addendums$forceEquip2 !== void 0 && _addendums$forceEquip2.includes(item));
    }),
    bonusEquip: new Map([].concat(maximize_toConsumableArray(defaultOptions.bonusEquip), maximize_toConsumableArray((_addendums$bonusEquip = addendums.bonusEquip) !== null && _addendums$bonusEquip !== void 0 ? _addendums$bonusEquip : []))),
    onlySlot: (_addendums$onlySlot = addendums.onlySlot) !== null && _addendums$onlySlot !== void 0 ? _addendums$onlySlot : defaultOptions.onlySlot,
    preventSlot: [].concat(maximize_toConsumableArray(defaultOptions.preventSlot), maximize_toConsumableArray((_addendums$preventSlo = addendums.preventSlot) !== null && _addendums$preventSlo !== void 0 ? _addendums$preventSlo : [])),
    forceUpdate: (_addendums$forceUpdat = addendums.forceUpdate) !== null && _addendums$forceUpdat !== void 0 ? _addendums$forceUpdat : defaultOptions.forceUpdate,
    modes: maximize_objectSpread(maximize_objectSpread({}, defaultOptions.modes), (_addendums$modes = addendums.modes) !== null && _addendums$modes !== void 0 ? _addendums$modes : {})
  };
}

var defaultMaximizeOptions = {
  updateOnFamiliarChange: true,
  updateOnCanEquipChanged: true,
  useOutfitCaching: true,
  forceEquip: [],
  preventEquip: [],
  bonusEquip: new Map(),
  onlySlot: [],
  preventSlot: [],
  forceUpdate: false,
  modes: {}
};
/**
 *
 * @param options Default options for each maximizer run.
 * @param options.updateOnFamiliarChange Re-run the maximizer if familiar has changed. Default true.
 * @param options.updateOnCanEquipChanged Re-run the maximizer if stats have changed what can be equipped. Default true.
 * @param options.forceEquip Equipment to force-equip ("equip X").
 * @param options.preventEquip Equipment to prevent equipping ("-equip X").
 * @param options.bonusEquip Equipment to apply a bonus to ("200 bonus X").
 */

function setDefaultMaximizeOptions(options) {
  Object.assign(defaultMaximizeOptions, options);
}
var modeableCommands = ["backupcamera", "umbrella", "snowsuit", "edpiece", "retrocape", "parka"];
var modeableItems = {
  backupcamera: template_string_$item(maximize_templateObject || (maximize_templateObject = maximize_taggedTemplateLiteral(["backup camera"]))),
  umbrella: template_string_$item(maximize_templateObject2 || (maximize_templateObject2 = maximize_taggedTemplateLiteral(["unbreakable umbrella"]))),
  snowsuit: template_string_$item(maximize_templateObject3 || (maximize_templateObject3 = maximize_taggedTemplateLiteral(["Snow Suit"]))),
  edpiece: template_string_$item(maximize_templateObject4 || (maximize_templateObject4 = maximize_taggedTemplateLiteral(["The Crown of Ed the Undying"]))),
  retrocape: template_string_$item(maximize_templateObject5 || (maximize_templateObject5 = maximize_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"]))),
  parka: template_string_$item(maximize_templateObject6 || (maximize_templateObject6 = maximize_taggedTemplateLiteral(["Jurassic Parka"])))
};
var modeableState = {
  backupcamera: () => (0,external_kolmafia_namespaceObject.getProperty)("backupCameraMode"),
  umbrella: () => (0,external_kolmafia_namespaceObject.getProperty)("umbrellaState"),
  snowsuit: () => (0,external_kolmafia_namespaceObject.getProperty)("snowsuit"),
  edpiece: () => (0,external_kolmafia_namespaceObject.getProperty)("edPiece"),
  retrocape: () => (0,external_kolmafia_namespaceObject.getProperty)("retroCapeSuperhero") + " " + (0,external_kolmafia_namespaceObject.getProperty)("retroCapeWashingInstructions"),
  parka: () => (0,external_kolmafia_namespaceObject.getProperty)("parkaMode")
};
function getCurrentModes() {
  var modes = {};

  var _iterator = maximize_createForOfIteratorHelper(modeableCommands),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var key = _step.value;

      if ((0,external_kolmafia_namespaceObject.haveEquipped)(modeableItems[key])) {
        modes[key] = modeableState[key]();
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return modes;
}
function applyModes(modes) {
  var _iterator2 = maximize_createForOfIteratorHelper(modeableCommands),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var command = _step2.value;

      if ((0,external_kolmafia_namespaceObject.haveEquipped)(modeableItems[command]) && modes[command] !== undefined) {
        if (modeableState[command]() !== modes[command]) {
          (0,external_kolmafia_namespaceObject.cliExecute)(command + " " + modes[command]);
        }
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
} // Subset of slots that are valid for caching.

var cachedSlots = $slots(maximize_templateObject7 || (maximize_templateObject7 = maximize_taggedTemplateLiteral(["hat, weapon, off-hand, back, shirt, pants, acc1, acc2, acc3, familiar"])));

var CacheEntry = function CacheEntry(equipment, rider, familiar, canEquipItemCount, modes) {
  maximize_classCallCheck(this, CacheEntry);

  maximize_defineProperty(this, "equipment", void 0);

  maximize_defineProperty(this, "rider", void 0);

  maximize_defineProperty(this, "familiar", void 0);

  maximize_defineProperty(this, "canEquipItemCount", void 0);

  maximize_defineProperty(this, "modes", void 0);

  this.equipment = equipment;
  this.rider = rider;
  this.familiar = familiar;
  this.canEquipItemCount = canEquipItemCount;
  this.modes = modes;
};

var _outfitSlots = /*#__PURE__*/new WeakMap();

var _useHistory = /*#__PURE__*/new WeakMap();

var _maxSize = /*#__PURE__*/new WeakMap();

var OutfitLRUCache = /*#__PURE__*/function () {
  // Current outfits allocated
  // Array of indices into #outfitSlots in order of use. Most recent at the front.
  function OutfitLRUCache(maxSize) {
    maximize_classCallCheck(this, OutfitLRUCache);

    _outfitSlots.set(this, {
      writable: true,
      value: []
    });

    _useHistory.set(this, {
      writable: true,
      value: []
    });

    _maxSize.set(this, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _maxSize, maxSize);
  }

  maximize_createClass(OutfitLRUCache, [{
    key: "checkConsistent",
    value: function checkConsistent() {
      if (_classPrivateFieldGet(this, _useHistory).length !== _classPrivateFieldGet(this, _outfitSlots).length || !maximize_toConsumableArray(_classPrivateFieldGet(this, _useHistory)).sort().every((value, index) => value === index)) {
        throw new Error("Outfit cache consistency failed.");
      }
    }
  }, {
    key: "promote",
    value: function promote(index) {
      _classPrivateFieldSet(this, _useHistory, [index].concat(maximize_toConsumableArray(_classPrivateFieldGet(this, _useHistory).filter(i => i !== index))));

      this.checkConsistent();
    }
  }, {
    key: "get",
    value: function get(key) {
      var index = _classPrivateFieldGet(this, _outfitSlots).indexOf(key);

      if (index < 0) return undefined;
      this.promote(index);
      return "".concat(OutfitLRUCache.OUTFIT_PREFIX, " ").concat(index);
    }
  }, {
    key: "insert",
    value: function insert(key) {
      var lastUseIndex = undefined;

      if (_classPrivateFieldGet(this, _outfitSlots).length >= _classPrivateFieldGet(this, _maxSize)) {
        lastUseIndex = _classPrivateFieldGet(this, _useHistory).pop();

        if (lastUseIndex === undefined) {
          throw new Error("Outfit cache consistency failed.");
        }

        _classPrivateFieldGet(this, _useHistory).splice(0, 0, lastUseIndex);

        _classPrivateFieldGet(this, _outfitSlots)[lastUseIndex] = key;
        this.checkConsistent();
        return "".concat(OutfitLRUCache.OUTFIT_PREFIX, " ").concat(lastUseIndex);
      } else {
        var index = _classPrivateFieldGet(this, _outfitSlots).push(key) - 1;

        _classPrivateFieldGet(this, _useHistory).splice(0, 0, index);

        this.checkConsistent();
        return "".concat(OutfitLRUCache.OUTFIT_PREFIX, " ").concat(index);
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      _classPrivateFieldSet(this, _outfitSlots, []);

      _classPrivateFieldSet(this, _useHistory, []);
    }
  }]);

  return OutfitLRUCache;
}();
/**
 * Save current equipment as KoL-native outfit.
 * @param name Name of new outfit.
 */


maximize_defineProperty(OutfitLRUCache, "OUTFIT_PREFIX", "Script Outfit");

function saveOutfit(name) {
  (0,external_kolmafia_namespaceObject.cliExecute)("outfit save ".concat(name));
} // Objective cache entries.


var cachedObjectives = {}; // Outfit cache entries. Keep 6 by default to avoid cluttering list.

var outfitCache = new OutfitLRUCache(6); // Cache to prevent rescanning all items unnecessarily

var cachedStats = [0, 0, 0];
var cachedCanEquipItemCount = 0;
/**
 * Count the number of unique items that can be equipped.
 * @returns The count of unique items.
 */

function canEquipItemCount() {
  var stats = $stats(maximize_templateObject8 || (maximize_templateObject8 = maximize_taggedTemplateLiteral(["Muscle, Mysticality, Moxie"]))).map(stat => Math.min((0,external_kolmafia_namespaceObject.myBasestat)(stat), 300));

  if (stats.every((value, index) => value === cachedStats[index])) {
    return cachedCanEquipItemCount;
  }

  cachedStats = stats;
  cachedCanEquipItemCount = external_kolmafia_namespaceObject.Item.all().filter(item => (0,external_kolmafia_namespaceObject.canEquip)(item)).length;
  return cachedCanEquipItemCount;
}
/**
 * Checks the objective cache for a valid entry.
 * @param cacheKey The cache key to check.
 * @param updateOnFamiliarChange Ignore cache if familiar has changed.
 * @param updateOnCanEquipChanged Ignore cache if stats have changed what can be equipped.
 * @returns A valid CacheEntry or null.
 */


function checkCache(cacheKey, options) {
  var entry = cachedObjectives[cacheKey];

  if (!entry) {
    return null;
  }

  if (options.updateOnFamiliarChange && (0,external_kolmafia_namespaceObject.myFamiliar)() !== entry.familiar) {
    logger.warning("Equipment found in maximize cache but familiar is different.");
    return null;
  }

  if (options.updateOnCanEquipChanged && entry.canEquipItemCount !== canEquipItemCount()) {
    logger.warning("Equipment found in maximize cache but equippable item list is out of date.");
    return null;
  }

  return entry;
}
/**
 * Applies equipment that was found in the cache.
 * @param entry The CacheEntry to apply
 */


function applyCached(entry, options) {
  var outfitName = options.useOutfitCaching ? outfitCache.get(entry) : undefined;

  if (outfitName) {
    if (!(0,external_kolmafia_namespaceObject.isWearingOutfit)(outfitName)) {
      (0,external_kolmafia_namespaceObject.outfit)(outfitName);
    }

    var familiarEquip = entry.equipment.get($slot(maximize_templateObject9 || (maximize_templateObject9 = maximize_taggedTemplateLiteral(["familiar"]))));
    if (familiarEquip) (0,external_kolmafia_namespaceObject.equip)($slot(maximize_templateObject10 || (maximize_templateObject10 = maximize_taggedTemplateLiteral(["familiar"]))), familiarEquip);
  } else {
    var _iterator3 = maximize_createForOfIteratorHelper(entry.equipment),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var _step3$value = maximize_slicedToArray(_step3.value, 2),
            slot = _step3$value[0],
            item = _step3$value[1];

        if ((0,external_kolmafia_namespaceObject.equippedItem)(slot) !== item && (0,external_kolmafia_namespaceObject.availableAmount)(item) > 0) {
          (0,external_kolmafia_namespaceObject.equip)(slot, item);
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    if (verifyCached(entry) && options.useOutfitCaching) {
      var _outfitName = outfitCache.insert(entry);

      logger.info("Saving equipment to outfit ".concat(_outfitName, "."));
      saveOutfit(_outfitName);
    }
  }

  if ((0,external_kolmafia_namespaceObject.equippedAmount)(template_string_$item(maximize_templateObject11 || (maximize_templateObject11 = maximize_taggedTemplateLiteral(["Crown of Thrones"])))) > 0 && entry.rider.get(template_string_$item(maximize_templateObject12 || (maximize_templateObject12 = maximize_taggedTemplateLiteral(["Crown of Thrones"]))))) {
    (0,external_kolmafia_namespaceObject.enthroneFamiliar)(entry.rider.get(template_string_$item(maximize_templateObject13 || (maximize_templateObject13 = maximize_taggedTemplateLiteral(["Crown of Thrones"])))) || template_string_$familiar.none);
  }

  if ((0,external_kolmafia_namespaceObject.equippedAmount)(template_string_$item(maximize_templateObject14 || (maximize_templateObject14 = maximize_taggedTemplateLiteral(["Buddy Bjorn"])))) > 0 && entry.rider.get(template_string_$item(maximize_templateObject15 || (maximize_templateObject15 = maximize_taggedTemplateLiteral(["Buddy Bjorn"]))))) {
    (0,external_kolmafia_namespaceObject.bjornifyFamiliar)(entry.rider.get(template_string_$item(maximize_templateObject16 || (maximize_templateObject16 = maximize_taggedTemplateLiteral(["Buddy Bjorn"])))) || template_string_$familiar.none);
  }

  applyModes(maximize_objectSpread(maximize_objectSpread({}, entry.modes), options.modes));
}

var slotStructure = [$slots(maximize_templateObject17 || (maximize_templateObject17 = maximize_taggedTemplateLiteral(["hat"]))), $slots(maximize_templateObject18 || (maximize_templateObject18 = maximize_taggedTemplateLiteral(["back"]))), $slots(maximize_templateObject19 || (maximize_templateObject19 = maximize_taggedTemplateLiteral(["shirt"]))), $slots(maximize_templateObject20 || (maximize_templateObject20 = maximize_taggedTemplateLiteral(["weapon, off-hand"]))), $slots(maximize_templateObject21 || (maximize_templateObject21 = maximize_taggedTemplateLiteral(["pants"]))), $slots(maximize_templateObject22 || (maximize_templateObject22 = maximize_taggedTemplateLiteral(["acc1, acc2, acc3"]))), $slots(maximize_templateObject23 || (maximize_templateObject23 = maximize_taggedTemplateLiteral(["familiar"])))];
/**
 * Verifies that a CacheEntry was applied successfully.
 * @param entry The CacheEntry to verify
 * @returns If all desired equipment was appliedn in the correct slots.
 */

function verifyCached(entry) {
  var success = true;

  var _iterator4 = maximize_createForOfIteratorHelper(slotStructure),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var slotGroup = _step4.value;
      var desiredSlots = slotGroup.map(slot => {
        var _entry$equipment$get;

        return [slot, (_entry$equipment$get = entry.equipment.get(slot)) !== null && _entry$equipment$get !== void 0 ? _entry$equipment$get : null];
      }).filter(_ref => {
        var _ref2 = maximize_slicedToArray(_ref, 2),
            item = _ref2[1];

        return item !== null;
      });
      var desiredSet = desiredSlots.map(_ref3 => {
        var _ref4 = maximize_slicedToArray(_ref3, 2),
            item = _ref4[1];

        return item;
      });
      var equippedSet = desiredSlots.map(_ref5 => {
        var _ref6 = maximize_slicedToArray(_ref5, 1),
            slot = _ref6[0];

        return (0,external_kolmafia_namespaceObject.equippedItem)(slot);
      });

      if (!setEqual(desiredSet, equippedSet)) {
        logger.warning("Failed to apply cached ".concat(desiredSet.join(", "), " in ").concat(slotGroup.join(", "), "."));
        success = false;
      }
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }

  if ((0,external_kolmafia_namespaceObject.equippedAmount)(template_string_$item(maximize_templateObject24 || (maximize_templateObject24 = maximize_taggedTemplateLiteral(["Crown of Thrones"])))) > 0 && entry.rider.get(template_string_$item(maximize_templateObject25 || (maximize_templateObject25 = maximize_taggedTemplateLiteral(["Crown of Thrones"]))))) {
    if (entry.rider.get(template_string_$item(maximize_templateObject26 || (maximize_templateObject26 = maximize_taggedTemplateLiteral(["Crown of Thrones"])))) !== (0,external_kolmafia_namespaceObject.myEnthronedFamiliar)()) {
      logger.warning("Failed to apply ".concat(entry.rider.get(template_string_$item(maximize_templateObject27 || (maximize_templateObject27 = maximize_taggedTemplateLiteral(["Crown of Thrones"])))), " in ").concat(template_string_$item(maximize_templateObject28 || (maximize_templateObject28 = maximize_taggedTemplateLiteral(["Crown of Thrones"]))), "."));
      success = false;
    }
  }

  if ((0,external_kolmafia_namespaceObject.equippedAmount)(template_string_$item(maximize_templateObject29 || (maximize_templateObject29 = maximize_taggedTemplateLiteral(["Buddy Bjorn"])))) > 0 && entry.rider.get(template_string_$item(maximize_templateObject30 || (maximize_templateObject30 = maximize_taggedTemplateLiteral(["Buddy Bjorn"]))))) {
    if (entry.rider.get(template_string_$item(maximize_templateObject31 || (maximize_templateObject31 = maximize_taggedTemplateLiteral(["Buddy Bjorn"])))) !== (0,external_kolmafia_namespaceObject.myBjornedFamiliar)()) {
      logger.warning("Failed to apply".concat(entry.rider.get(template_string_$item(maximize_templateObject32 || (maximize_templateObject32 = maximize_taggedTemplateLiteral(["Buddy Bjorn"])))), " in ").concat(template_string_$item(maximize_templateObject33 || (maximize_templateObject33 = maximize_taggedTemplateLiteral(["Buddy Bjorn"]))), "."));
      success = false;
    }
  }

  return success;
}
/**
 * Save current equipment to the objective cache.
 * @param cacheKey The cache key to save.
 */


function saveCached(cacheKey, options) {
  var equipment = new Map();
  var rider = new Map();

  var _iterator5 = maximize_createForOfIteratorHelper(cachedSlots),
      _step5;

  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var _slot2 = _step5.value;
      equipment.set(_slot2, (0,external_kolmafia_namespaceObject.equippedItem)(_slot2));
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }

  if ((0,external_kolmafia_namespaceObject.equippedAmount)(template_string_$item(maximize_templateObject34 || (maximize_templateObject34 = maximize_taggedTemplateLiteral(["card sleeve"])))) > 0) {
    equipment.set($slot(_templateObject35 || (_templateObject35 = maximize_taggedTemplateLiteral(["card-sleeve"]))), (0,external_kolmafia_namespaceObject.equippedItem)($slot(_templateObject36 || (_templateObject36 = maximize_taggedTemplateLiteral(["card-sleeve"])))));
  }

  if ((0,external_kolmafia_namespaceObject.equippedAmount)(template_string_$item(_templateObject37 || (_templateObject37 = maximize_taggedTemplateLiteral(["Crown of Thrones"])))) > 0) {
    rider.set(template_string_$item(_templateObject38 || (_templateObject38 = maximize_taggedTemplateLiteral(["Crown of Thrones"]))), (0,external_kolmafia_namespaceObject.myEnthronedFamiliar)());
  }

  if ((0,external_kolmafia_namespaceObject.equippedAmount)(template_string_$item(_templateObject39 || (_templateObject39 = maximize_taggedTemplateLiteral(["Buddy Bjorn"])))) > 0) {
    rider.set(template_string_$item(_templateObject40 || (_templateObject40 = maximize_taggedTemplateLiteral(["Buddy Bjorn"]))), (0,external_kolmafia_namespaceObject.myBjornedFamiliar)());
  }

  if (options.preventSlot && options.preventSlot.length > 0) {
    var _iterator6 = maximize_createForOfIteratorHelper(options.preventSlot),
        _step6;

    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var slot = _step6.value;
        equipment.delete(slot);
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }

    if (options.preventSlot.includes($slot(_templateObject41 || (_templateObject41 = maximize_taggedTemplateLiteral(["buddy-bjorn"]))))) {
      rider.delete(template_string_$item(_templateObject42 || (_templateObject42 = maximize_taggedTemplateLiteral(["Buddy Bjorn"]))));
    }

    if (options.preventSlot.includes($slot(_templateObject43 || (_templateObject43 = maximize_taggedTemplateLiteral(["crown-of-thrones"]))))) {
      rider.delete(template_string_$item(_templateObject44 || (_templateObject44 = maximize_taggedTemplateLiteral(["Crown of Thrones"]))));
    }
  }

  if (options.onlySlot && options.onlySlot.length > 0) {
    var _iterator7 = maximize_createForOfIteratorHelper(external_kolmafia_namespaceObject.Slot.all()),
        _step7;

    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
        var _slot = _step7.value;

        if (!options.onlySlot.includes(_slot)) {
          equipment.delete(_slot);
        }
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }

    if (!options.onlySlot.includes($slot(_templateObject45 || (_templateObject45 = maximize_taggedTemplateLiteral(["buddy-bjorn"]))))) {
      rider.delete(template_string_$item(_templateObject46 || (_templateObject46 = maximize_taggedTemplateLiteral(["Buddy Bjorn"]))));
    }

    if (!options.onlySlot.includes($slot(_templateObject47 || (_templateObject47 = maximize_taggedTemplateLiteral(["crown-of-thrones"]))))) {
      rider.delete(template_string_$item(_templateObject48 || (_templateObject48 = maximize_taggedTemplateLiteral(["Crown of Thrones"]))));
    }
  }

  var entry = new CacheEntry(equipment, rider, (0,external_kolmafia_namespaceObject.myFamiliar)(), canEquipItemCount(), maximize_objectSpread(maximize_objectSpread({}, getCurrentModes()), options.modes));
  cachedObjectives[cacheKey] = entry;

  if (options.useOutfitCaching) {
    var outfitName = outfitCache.insert(entry);
    logger.info("Saving equipment to outfit ".concat(outfitName, "."));
    saveOutfit(outfitName);
  }
}
/**
 * Run the maximizer, but only if the objective and certain pieces of game state haven't changed since it was last run.
 * @param objectives Objectives to maximize for.
 * @param options Options for this run of the maximizer.
 * @param options.updateOnFamiliarChange Re-run the maximizer if familiar has changed. Default true.
 * @param options.updateOnCanEquipChanged Re-run the maximizer if stats have changed what can be equipped. Default true.
 * @param options.forceEquip Equipment to force-equip ("equip X").
 * @param options.preventEquip Equipment to prevent equipping ("-equip X").
 * @param options.bonusEquip Equipment to apply a bonus to ("200 bonus X").
 * @returns Whether the maximize call succeeded.
 */


function maximizeCached(objectives) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fullOptions = mergeMaximizeOptions(defaultMaximizeOptions, options);
  var forceEquip = fullOptions.forceEquip,
      preventEquip = fullOptions.preventEquip,
      bonusEquip = fullOptions.bonusEquip,
      onlySlot = fullOptions.onlySlot,
      preventSlot = fullOptions.preventSlot,
      forceUpdate = fullOptions.forceUpdate; // Sort each group in objective to ensure consistent ordering in string

  var objective = maximize_toConsumableArray(new Set([].concat(maximize_toConsumableArray(objectives.sort()), maximize_toConsumableArray(forceEquip.map(item => "equip ".concat(item)).sort()), maximize_toConsumableArray(preventEquip.map(item => "-equip ".concat(item)).sort()), maximize_toConsumableArray(onlySlot.map(slot => "".concat(slot)).sort()), maximize_toConsumableArray(preventSlot.map(slot => "-".concat(slot)).sort()), maximize_toConsumableArray(Array.from(bonusEquip.entries()).filter(_ref7 => {
    var _ref8 = maximize_slicedToArray(_ref7, 2),
        bonus = _ref8[1];

    return bonus !== 0;
  }).map(_ref9 => {
    var _ref10 = maximize_slicedToArray(_ref9, 2),
        item = _ref10[0],
        bonus = _ref10[1];

    return "".concat(Math.round(bonus * 100) / 100, " bonus ").concat(item);
  }).sort())))).join(", "); // Items equipped in slots not touched by the maximizer must be in the cache key


  var untouchedSlots = cachedSlots.filter(slot => preventSlot.includes(slot) || onlySlot.length > 0 && !onlySlot.includes(slot));
  var cacheKey = [objective].concat(maximize_toConsumableArray(untouchedSlots.map(slot => "".concat(slot, ":").concat((0,external_kolmafia_namespaceObject.equippedItem)(slot))).sort())).join("; ");
  var cacheEntry = checkCache(cacheKey, fullOptions);

  if (cacheEntry && !forceUpdate) {
    logger.info("Equipment found in maximize cache, equipping...");
    applyCached(cacheEntry, fullOptions);

    if (verifyCached(cacheEntry)) {
      logger.info("Equipped cached ".concat(cacheKey));
      return true;
    }

    logger.warning("Maximize cache application failed, maximizing...");
  }

  var result = (0,external_kolmafia_namespaceObject.maximize)(objective, false);
  saveCached(cacheKey, fullOptions);
  return result;
}

var _maximizeParameters = /*#__PURE__*/new WeakMap();

var _maximizeOptions = /*#__PURE__*/new WeakMap();

var Requirement = /*#__PURE__*/function () {
  /**
   * A convenient way of combining maximization parameters and options
   * @param maximizeParameters Parameters you're attempting to maximize
   * @param maximizeOptions Object potentially containing forceEquips, bonusEquips, preventEquips, and preventSlots
   */
  function Requirement(maximizeParameters, maximizeOptions) {
    maximize_classCallCheck(this, Requirement);

    _maximizeParameters.set(this, {
      writable: true,
      value: void 0
    });

    _maximizeOptions.set(this, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _maximizeParameters, maximizeParameters);

    _classPrivateFieldSet(this, _maximizeOptions, maximizeOptions);
  }

  maximize_createClass(Requirement, [{
    key: "maximizeParameters",
    get: function get() {
      return _classPrivateFieldGet(this, _maximizeParameters);
    }
  }, {
    key: "maximizeOptions",
    get: function get() {
      return _classPrivateFieldGet(this, _maximizeOptions);
    }
    /**
     * Merges two requirements, concanating relevant arrays. Typically used in static form.
     * @param other Requirement to merge with.
     */

  }, {
    key: "merge",
    value: function merge(other) {
      var _optionsA$forceEquip, _other$maximizeOption, _optionsA$preventEqui, _other$maximizeOption3, _optionsA$bonusEquip$, _optionsA$bonusEquip, _optionsB$bonusEquip$, _optionsB$bonusEquip, _optionsA$onlySlot, _optionsB$onlySlot, _optionsA$preventSlot, _optionsB$preventSlot;

      var optionsA = this.maximizeOptions;
      var optionsB = other.maximizeOptions;
      return new Requirement([].concat(maximize_toConsumableArray(this.maximizeParameters), maximize_toConsumableArray(other.maximizeParameters)), {
        updateOnFamiliarChange: optionsA.updateOnFamiliarChange || other.maximizeOptions.updateOnFamiliarChange,
        updateOnCanEquipChanged: optionsA.updateOnCanEquipChanged || other.maximizeOptions.updateOnCanEquipChanged,
        forceEquip: [].concat(maximize_toConsumableArray((_optionsA$forceEquip = optionsA.forceEquip) !== null && _optionsA$forceEquip !== void 0 ? _optionsA$forceEquip : []), maximize_toConsumableArray((_other$maximizeOption = other.maximizeOptions.forceEquip) !== null && _other$maximizeOption !== void 0 ? _other$maximizeOption : [])).filter(x => {
          var _other$maximizeOption2;

          return !((_other$maximizeOption2 = other.maximizeOptions.preventEquip) !== null && _other$maximizeOption2 !== void 0 && _other$maximizeOption2.includes(x));
        }),
        preventEquip: [].concat(maximize_toConsumableArray((_optionsA$preventEqui = optionsA.preventEquip) !== null && _optionsA$preventEqui !== void 0 ? _optionsA$preventEqui : []), maximize_toConsumableArray((_other$maximizeOption3 = other.maximizeOptions.preventEquip) !== null && _other$maximizeOption3 !== void 0 ? _other$maximizeOption3 : [])).filter(x => {
          var _other$maximizeOption4;

          return !((_other$maximizeOption4 = other.maximizeOptions.forceEquip) !== null && _other$maximizeOption4 !== void 0 && _other$maximizeOption4.includes(x));
        }),
        bonusEquip: new Map([].concat(maximize_toConsumableArray((_optionsA$bonusEquip$ = (_optionsA$bonusEquip = optionsA.bonusEquip) === null || _optionsA$bonusEquip === void 0 ? void 0 : _optionsA$bonusEquip.entries()) !== null && _optionsA$bonusEquip$ !== void 0 ? _optionsA$bonusEquip$ : []), maximize_toConsumableArray((_optionsB$bonusEquip$ = (_optionsB$bonusEquip = optionsB.bonusEquip) === null || _optionsB$bonusEquip === void 0 ? void 0 : _optionsB$bonusEquip.entries()) !== null && _optionsB$bonusEquip$ !== void 0 ? _optionsB$bonusEquip$ : []))),
        onlySlot: [].concat(maximize_toConsumableArray((_optionsA$onlySlot = optionsA.onlySlot) !== null && _optionsA$onlySlot !== void 0 ? _optionsA$onlySlot : []), maximize_toConsumableArray((_optionsB$onlySlot = optionsB.onlySlot) !== null && _optionsB$onlySlot !== void 0 ? _optionsB$onlySlot : [])),
        preventSlot: [].concat(maximize_toConsumableArray((_optionsA$preventSlot = optionsA.preventSlot) !== null && _optionsA$preventSlot !== void 0 ? _optionsA$preventSlot : []), maximize_toConsumableArray((_optionsB$preventSlot = optionsB.preventSlot) !== null && _optionsB$preventSlot !== void 0 ? _optionsB$preventSlot : [])),
        forceUpdate: optionsA.forceUpdate || optionsB.forceUpdate
      });
    }
    /**
     * Merges a set of requirements together, starting with an empty requirement.
     * @param allRequirements Requirements to merge
     */

  }, {
    key: "maximize",
    value:
    /**
     * Runs maximizeCached, using the maximizeParameters and maximizeOptions contained by this requirement.
     * @returns Whether the maximize call succeeded.
     */
    function maximize() {
      return maximizeCached(this.maximizeParameters, this.maximizeOptions);
    }
    /**
     * Merges requirements, and then runs maximizeCached on the combined requirement.
     * @param requirements Requirements to maximize on
     */

  }], [{
    key: "merge",
    value: function merge(allRequirements) {
      return allRequirements.reduce((x, y) => x.merge(y), new Requirement([], {}));
    }
  }, {
    key: "maximize",
    value: function maximize() {
      for (var _len = arguments.length, requirements = new Array(_len), _key = 0; _key < _len; _key++) {
        requirements[_key] = arguments[_key];
      }

      Requirement.merge(requirements).maximize();
    }
  }]);

  return Requirement;
}();
/**
 * Clear all outfits cached by the maximizer.
 */

function clearMaximizerCache() {
  outfitCache.clear();

  for (var member in cachedObjectives) {
    delete cachedObjectives[member];
  }
}
;// CONCATENATED MODULE: ./node_modules/grimoire-kolmafia/dist/outfit.js
var outfit_templateObject, outfit_templateObject2, outfit_templateObject3, outfit_templateObject4, outfit_templateObject5, outfit_templateObject6, outfit_templateObject7, outfit_templateObject8, outfit_templateObject9, outfit_templateObject10, outfit_templateObject11, outfit_templateObject12, outfit_templateObject13, outfit_templateObject14, outfit_templateObject15, outfit_templateObject16, outfit_templateObject17, outfit_templateObject18, outfit_templateObject19, outfit_templateObject20, outfit_templateObject21, outfit_templateObject22, outfit_templateObject23, outfit_templateObject24, outfit_templateObject25, outfit_templateObject26, outfit_templateObject27, outfit_templateObject28, outfit_templateObject29, outfit_templateObject30;

function outfit_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function outfit_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { outfit_ownKeys(Object(source), true).forEach(function (key) { outfit_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { outfit_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function outfit_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function outfit_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = outfit_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function outfit_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function outfit_toConsumableArray(arr) { return outfit_arrayWithoutHoles(arr) || outfit_iterableToArray(arr) || outfit_unsupportedIterableToArray(arr) || outfit_nonIterableSpread(); }

function outfit_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function outfit_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return outfit_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return outfit_arrayLikeToArray(o, minLen); }

function outfit_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function outfit_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return outfit_arrayLikeToArray(arr); }

function outfit_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function outfit_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function outfit_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function outfit_createClass(Constructor, protoProps, staticProps) { if (protoProps) outfit_defineProperties(Constructor.prototype, protoProps); if (staticProps) outfit_defineProperties(Constructor, staticProps); return Constructor; }



var outfitSlots = ["hat", "back", "weapon", "offhand", "shirt", "pants", "acc1", "acc2", "acc3", "famequip"];

var weaponHands = i => i ? (0,external_kolmafia_namespaceObject.weaponHands)(i) : 0;

var outfit_modeableCommands = ["backupcamera", "umbrella", "snowsuit", "edpiece", "retrocape", "parka"];
var Outfit = /*#__PURE__*/function () {
  function Outfit() {
    outfit_classCallCheck(this, Outfit);

    this.equips = new Map();
    this.modes = {};
    this.skipDefaults = false;
    this.modifier = "";
    this.avoid = [];
  }
  /**
   * Check how many of an item is equipped on the outfit.
   */


  outfit_createClass(Outfit, [{
    key: "equippedAmount",
    value: function equippedAmount(item) {
      return outfit_toConsumableArray(this.equips.values()).filter(i => i === item).length;
    }
  }, {
    key: "isAvailable",
    value: function isAvailable(item) {
      var _a;

      if ((_a = this.avoid) === null || _a === void 0 ? void 0 : _a.includes(item)) return false;
      if (!have(item, this.equippedAmount(item) + 1)) return false;
      if ((0,external_kolmafia_namespaceObject.booleanModifier)(item, "Single Equip") && this.equippedAmount(item) > 0) return false;
      return true;
    }
    /**
     * Check whether an item is equipped on the outfit, optionally in a specific slot.
     */

  }, {
    key: "haveEquipped",
    value: function haveEquipped(item, slot) {
      if (slot === undefined) return this.equippedAmount(item) > 0;
      return this.equips.get(slot) === item;
    }
  }, {
    key: "equipItemNone",
    value: function equipItemNone(item, slot) {
      if (item !== template_string_$item.none) return false;
      if (slot === undefined) return true;
      if (this.equips.has(slot)) return false;
      this.equips.set(slot, item);
      return true;
    }
  }, {
    key: "equipNonAccessory",
    value: function equipNonAccessory(item, slot) {
      if ($slots(outfit_templateObject || (outfit_templateObject = outfit_taggedTemplateLiteral(["acc1, acc2, acc3"]))).includes((0,external_kolmafia_namespaceObject.toSlot)(item))) return false;
      if (slot !== undefined && slot !== (0,external_kolmafia_namespaceObject.toSlot)(item)) return false;
      if (this.equips.has((0,external_kolmafia_namespaceObject.toSlot)(item))) return false;

      switch ((0,external_kolmafia_namespaceObject.toSlot)(item)) {
        case $slot(outfit_templateObject2 || (outfit_templateObject2 = outfit_taggedTemplateLiteral(["off-hand"]))):
          if (this.equips.has($slot(outfit_templateObject3 || (outfit_templateObject3 = outfit_taggedTemplateLiteral(["weapon"])))) && weaponHands(this.equips.get($slot(outfit_templateObject4 || (outfit_templateObject4 = outfit_taggedTemplateLiteral(["weapon"]))))) !== 1) {
            return false;
          }

          break;

        case $slot(outfit_templateObject5 || (outfit_templateObject5 = outfit_taggedTemplateLiteral(["familiar"]))):
          if (this.familiar !== undefined && !(0,external_kolmafia_namespaceObject.canEquip)(this.familiar, item)) return false;
      }

      if ((0,external_kolmafia_namespaceObject.toSlot)(item) !== $slot(outfit_templateObject6 || (outfit_templateObject6 = outfit_taggedTemplateLiteral(["familiar"]))) && !(0,external_kolmafia_namespaceObject.canEquip)(item)) return false;
      this.equips.set((0,external_kolmafia_namespaceObject.toSlot)(item), item);
      return true;
    }
  }, {
    key: "equipAccessory",
    value: function equipAccessory(item, slot) {
      if (![undefined].concat(outfit_toConsumableArray($slots(outfit_templateObject7 || (outfit_templateObject7 = outfit_taggedTemplateLiteral(["acc1, acc2, acc3"]))))).includes(slot)) return false;
      if ((0,external_kolmafia_namespaceObject.toSlot)(item) !== $slot(outfit_templateObject8 || (outfit_templateObject8 = outfit_taggedTemplateLiteral(["acc1"])))) return false;
      if (!(0,external_kolmafia_namespaceObject.canEquip)(item)) return false;

      if (slot === undefined) {
        // We don't care which of the accessory slots we equip in
        var empty = $slots(outfit_templateObject9 || (outfit_templateObject9 = outfit_taggedTemplateLiteral(["acc1, acc2, acc3"]))).find(s => !this.equips.has(s));
        if (empty === undefined) return false;
        this.equips.set(empty, item);
      } else {
        if (this.equips.has(slot)) return false;
        this.equips.set(slot, item);
      }

      return true;
    }
  }, {
    key: "equipUsingDualWield",
    value: function equipUsingDualWield(item, slot) {
      if (![undefined, $slot(outfit_templateObject10 || (outfit_templateObject10 = outfit_taggedTemplateLiteral(["off-hand"])))].includes(slot)) return false;
      if ((0,external_kolmafia_namespaceObject.toSlot)(item) !== $slot(outfit_templateObject11 || (outfit_templateObject11 = outfit_taggedTemplateLiteral(["weapon"])))) return false;

      if (this.equips.has($slot(outfit_templateObject12 || (outfit_templateObject12 = outfit_taggedTemplateLiteral(["weapon"])))) && weaponHands(this.equips.get($slot(outfit_templateObject13 || (outfit_templateObject13 = outfit_taggedTemplateLiteral(["weapon"]))))) !== 1) {
        return false;
      }

      if (this.equips.has($slot(outfit_templateObject14 || (outfit_templateObject14 = outfit_taggedTemplateLiteral(["off-hand"]))))) return false;
      if (!have($skill(outfit_templateObject15 || (outfit_templateObject15 = outfit_taggedTemplateLiteral(["Double-Fisted Skull Smashing"]))))) return false;
      if (weaponHands(item) !== 1) return false;
      if (!(0,external_kolmafia_namespaceObject.canEquip)(item)) return false;
      this.equips.set($slot(outfit_templateObject16 || (outfit_templateObject16 = outfit_taggedTemplateLiteral(["off-hand"]))), item);
      return true;
    }
  }, {
    key: "getHoldingFamiliar",
    value: function getHoldingFamiliar(item) {
      switch ((0,external_kolmafia_namespaceObject.toSlot)(item)) {
        case $slot(outfit_templateObject17 || (outfit_templateObject17 = outfit_taggedTemplateLiteral(["weapon"]))):
          return template_string_$familiar(outfit_templateObject18 || (outfit_templateObject18 = outfit_taggedTemplateLiteral(["Disembodied Hand"])));

        case $slot(outfit_templateObject19 || (outfit_templateObject19 = outfit_taggedTemplateLiteral(["off-hand"]))):
          return template_string_$familiar(outfit_templateObject20 || (outfit_templateObject20 = outfit_taggedTemplateLiteral(["Left-Hand Man"])));

        default:
          return undefined;
      }
    }
  }, {
    key: "equipUsingFamiliar",
    value: function equipUsingFamiliar(item, slot) {
      if (![undefined, $slot(outfit_templateObject21 || (outfit_templateObject21 = outfit_taggedTemplateLiteral(["familiar"])))].includes(slot)) return false;
      if (this.equips.has($slot(outfit_templateObject22 || (outfit_templateObject22 = outfit_taggedTemplateLiteral(["familiar"]))))) return false;
      if ((0,external_kolmafia_namespaceObject.booleanModifier)(item, "Single Equip")) return false;
      var familiar = this.getHoldingFamiliar(item);
      if (familiar === undefined || !this.equip(familiar)) return false;
      this.equips.set($slot(outfit_templateObject23 || (outfit_templateObject23 = outfit_taggedTemplateLiteral(["familiar"]))), item);
      return true;
    }
  }, {
    key: "equipItem",
    value: function equipItem(item, slot) {
      return this.haveEquipped(item, slot) || this.equipItemNone(item, slot) || this.isAvailable(item) && (this.equipNonAccessory(item, slot) || this.equipAccessory(item, slot) || this.equipUsingDualWield(item, slot) || this.equipUsingFamiliar(item, slot));
    }
  }, {
    key: "equipFamiliar",
    value: function equipFamiliar(familiar) {
      if (familiar === this.familiar) return true;
      if (this.familiar !== undefined) return false;
      if (familiar !== template_string_$familiar.none && !have(familiar)) return false;
      var item = this.equips.get($slot(outfit_templateObject24 || (outfit_templateObject24 = outfit_taggedTemplateLiteral(["familiar"]))));
      if (item !== undefined && item !== template_string_$item.none && !(0,external_kolmafia_namespaceObject.canEquip)(familiar, item)) return false;
      this.familiar = familiar;
      return true;
    }
  }, {
    key: "equipSpec",
    value: function equipSpec(spec) {
      var _this$avoid;

      var _a, _b, _c, _d;

      var succeeded = true;

      var _iterator = outfit_createForOfIteratorHelper(outfitSlots),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var slotName = _step.value;
          var slot = (_a = new Map([["famequip", $slot(outfit_templateObject25 || (outfit_templateObject25 = outfit_taggedTemplateLiteral(["familiar"])))], ["offhand", $slot(outfit_templateObject26 || (outfit_templateObject26 = outfit_taggedTemplateLiteral(["off-hand"])))]]).get(slotName)) !== null && _a !== void 0 ? _a : (0,external_kolmafia_namespaceObject.toSlot)(slotName);
          var itemOrItems = spec[slotName];
          if (itemOrItems !== undefined && !this.equip(itemOrItems, slot)) succeeded = false;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var _iterator2 = outfit_createForOfIteratorHelper((_b = spec === null || spec === void 0 ? void 0 : spec.equip) !== null && _b !== void 0 ? _b : []),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var item = _step2.value;
          if (!this.equip(item)) succeeded = false;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      if ((spec === null || spec === void 0 ? void 0 : spec.familiar) !== undefined) {
        if (!this.equip(spec.familiar)) succeeded = false;
      }

      (_this$avoid = this.avoid).push.apply(_this$avoid, outfit_toConsumableArray((_c = spec === null || spec === void 0 ? void 0 : spec.avoid) !== null && _c !== void 0 ? _c : []));

      this.skipDefaults = this.skipDefaults || ((_d = spec.skipDefaults) !== null && _d !== void 0 ? _d : false);

      if (spec.modifier) {
        this.modifier = this.modifier + (this.modifier ? ", " : "") + spec.modifier;
      }

      if (spec.modes) {
        if (!this.setModes(spec.modes)) {
          succeeded = false;
        }
      }

      return succeeded;
    }
    /**
     * Equip the first thing that can be equipped to the outfit.
     *
     * @param things The things to equip.
     * @param slot The slot to equip them.
     * @returns True if one of the things is equipped, and false otherwise.
     */

  }, {
    key: "equipFirst",
    value: function equipFirst(things, slot) {
      return things.some(val => this.equip(val, slot));
    }
    /**
     * Equip a thing to the outfit.
     *
     * If no slot is given, then the thing will be equipped wherever possible
     * (possibly using dual-wielding, any of the accessory slots, or as
     * familiar equipment). If it is impossible to add this thing anywhere to
     * the outfit, this function will return false.
     *
     * If a slot is given, the item will be equipped only in that slot. If the
     * slot is filled with a different item, this function will return false.
     *
     * If the thing is already equipped in the provided slot, or if no slot is
     * given and the thing is already equipped in any slot, this function will
     * return true and not change the outfit.
     *
     * @param thing The thing or things to equip.
     * @param slot The slot to equip them.
     * @returns True if the thing was sucessfully equipped, and false otherwise.
     */

  }, {
    key: "equip",
    value: function equip(thing, slot) {
      if (Array.isArray(thing)) {
        if (slot !== undefined) return this.equipFirst(thing, slot);
        return thing.every(val => this.equip(val));
      }

      if (thing instanceof external_kolmafia_namespaceObject.Item) return this.equipItem(thing, slot);
      if (thing instanceof external_kolmafia_namespaceObject.Familiar) return this.equipFamiliar(thing);
      if (thing instanceof Outfit) return this.equipSpec(thing.spec());
      return this.equipSpec(thing);
    }
    /**
     * Set the provided modes for items that may be equipped in the outfit.
     *
     * This function does *not* equip items for the set modes; they must be
     * equipped separately.
     *
     * If a mode is already set for an item that is different from the provided
     * mode, this function will return false and not change the mode for that
     * item. (But other modes might still be changed if they are compatible.)
     *
     * Note that the superhero and instuctions of a retrocape can be set
     * independently (`undefined` is treated as "don't care").
     *
     * @param modes Modes to set in this outfit.
     * @returns True if all modes were sucessfully set, and false otherwise.
     */

  }, {
    key: "setModes",
    value: function setModes(modes) {
      var _a, _b;

      var compatible = true; // Check if the new modes are compatible with existing modes

      var _iterator3 = outfit_createForOfIteratorHelper(outfit_modeableCommands),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var mode = _step3.value;
          if (mode === "retrocape") continue; // checked below

          if (this.modes[mode] && modes[mode] && this.modes[mode] !== modes[mode]) {
            compatible = false;
          }
        } // Check if retrocape modes are compatible
        // (Parts that are undefined are compatible with everything)

      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      if (this.modes["retrocape"] && modes["retrocape"]) {
        if (this.modes["retrocape"][0] && modes["retrocape"][0] && this.modes["retrocape"][0] !== modes["retrocape"][0]) {
          compatible = false;
        }

        if (this.modes["retrocape"][1] && modes["retrocape"][1] && this.modes["retrocape"][1] !== modes["retrocape"][1]) {
          compatible = false;
        }

        this.modes["retrocape"][0] = (_a = this.modes["retrocape"][0]) !== null && _a !== void 0 ? _a : modes["retrocape"][0];
        this.modes["retrocape"][1] = (_b = this.modes["retrocape"][1]) !== null && _b !== void 0 ? _b : modes["retrocape"][1];
      }

      this.modes = outfit_objectSpread(outfit_objectSpread({}, modes), this.modes);
      return compatible;
    }
    /**
     * Check if it is possible to equip a thing to this outfit using .equip().
     *
     * This does not change the current outfit.
     *
     * @param thing The thing to equip.
     * @param slot The slot to equip them.
     * @returns True if this thing can be equipped.
     */

  }, {
    key: "canEquip",
    value: function canEquip(thing, slot) {
      var outfit = this.clone();
      return outfit.equip(thing, slot);
    }
    /**
     * Equip this outfit.
     * @param extraOptions Passed to any maximizer calls made.
     */

  }, {
    key: "dress",
    value: function dress(extraOptions) {
      if (this.familiar) (0,external_kolmafia_namespaceObject.useFamiliar)(this.familiar);
      var targetEquipment = Array.from(this.equips.values());
      var usedSlots = new Set(); // First, we equip non-accessory equipment.

      var nonaccessorySlots = $slots(outfit_templateObject27 || (outfit_templateObject27 = outfit_taggedTemplateLiteral(["weapon, off-hand, hat, back, shirt, pants, familiar, buddy-bjorn, crown-of-thrones"]))); // We must manually remove equipment that we want to use in a different
      // slot than where it is currently equipped, to avoid a mafia issue.
      // Order is anchored here to prevent DFSS shenanigans

      var _iterator4 = outfit_createForOfIteratorHelper(nonaccessorySlots),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var slot = _step4.value;
          if (targetEquipment.includes((0,external_kolmafia_namespaceObject.equippedItem)(slot)) && this.equips.get(slot) !== (0,external_kolmafia_namespaceObject.equippedItem)(slot) || this.avoid.includes((0,external_kolmafia_namespaceObject.equippedItem)(slot))) (0,external_kolmafia_namespaceObject.equip)(slot, template_string_$item.none);
        } // Then we equip all the non-accessory equipment.

      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      var _iterator5 = outfit_createForOfIteratorHelper(nonaccessorySlots),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var _slot = _step5.value;
          var equipment = this.equips.get(_slot);

          if (equipment) {
            (0,external_kolmafia_namespaceObject.equip)(_slot, equipment);
            usedSlots.add(_slot);
          }
        } // Next, we equip accessories

      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      var accessorySlots = $slots(outfit_templateObject28 || (outfit_templateObject28 = outfit_taggedTemplateLiteral(["acc1, acc2, acc3"])));
      var accessoryEquips = accessorySlots.map(slot => this.equips.get(slot)).filter(item => item !== undefined); // To plan how to equip accessories, first check which accessories are
      // already equipped in some accessory slot. There is no need to move them,
      // since KoL doesn't care what order accessories are equipped in.

      var missingAccessories = []; // accessories that are not already equipped

      var _iterator6 = outfit_createForOfIteratorHelper(accessoryEquips),
          _step6;

      try {
        var _loop = function _loop() {
          var accessory = _step6.value;
          var alreadyEquipped = accessorySlots.find(slot => !usedSlots.has(slot) && (0,external_kolmafia_namespaceObject.equippedItem)(slot) === accessory);

          if (alreadyEquipped) {
            usedSlots.add(alreadyEquipped);
          } else {
            missingAccessories.push(accessory);
          }
        };

        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          _loop();
        } // Then, for all accessories that are not currently equipped, use the first
        // open slot to place them.

      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }

      for (var _i = 0, _missingAccessories = missingAccessories; _i < _missingAccessories.length; _i++) {
        var accessory = _missingAccessories[_i];
        var unusedSlot = accessorySlots.find(slot => !usedSlots.has(slot));

        if (unusedSlot === undefined) {
          // This should only occur if there is a bug in .dress()
          throw "No accessory slots remaining";
        }

        (0,external_kolmafia_namespaceObject.equip)(unusedSlot, accessory);
        usedSlots.add(unusedSlot);
      } // Remaining slots are filled by the maximizer


      var modes = convertToLibramModes(this.modes);

      if (this.modifier) {
        var allRequirements = [new Requirement([this.modifier], {
          preventSlot: outfit_toConsumableArray(usedSlots),
          preventEquip: this.avoid,
          modes: modes
        })];
        if (extraOptions) allRequirements.push(new Requirement([], extraOptions));

        if (!Requirement.merge(allRequirements).maximize()) {
          throw "Unable to maximize ".concat(this.modifier);
        }

        (0,external_kolmafia_namespaceObject.logprint)("Maximize: ".concat(this.modifier));
      } // Set the modes of any equipped items.


      applyModes(modes); // Verify that all equipment was indeed equipped

      if (this.familiar !== undefined && (0,external_kolmafia_namespaceObject.myFamiliar)() !== this.familiar) throw "Failed to fully dress (expected: familiar ".concat(this.familiar, ")");

      var _iterator7 = outfit_createForOfIteratorHelper(nonaccessorySlots),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var _slot2 = _step7.value;

          if (this.equips.has(_slot2) && (0,external_kolmafia_namespaceObject.equippedItem)(_slot2) !== this.equips.get(_slot2)) {
            throw "Failed to fully dress (expected: ".concat(_slot2, " ").concat(this.equips.get(_slot2), ")");
          }
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }

      var _iterator8 = outfit_createForOfIteratorHelper(accessoryEquips),
          _step8;

      try {
        var _loop2 = function _loop2() {
          var accessory = _step8.value;

          if ((0,external_kolmafia_namespaceObject.equippedAmount)(accessory) < accessoryEquips.filter(acc => acc === accessory).length) {
            throw "Failed to fully dress (expected: acc ".concat(accessory, ")");
          }
        };

        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          _loop2();
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
    }
    /**
     * Build an Outfit identical to this outfit.
     */

  }, {
    key: "clone",
    value: function clone() {
      var result = new Outfit();
      result.equips = new Map(this.equips);
      result.skipDefaults = this.skipDefaults;
      result.familiar = this.familiar;
      result.modifier = this.modifier;
      result.avoid = outfit_toConsumableArray(this.avoid);
      result.modes = outfit_objectSpread({}, this.modes);
      return result;
    }
    /**
     * Build an OutfitSpec identical to this outfit.
     */

  }, {
    key: "spec",
    value: function spec() {
      var _a;

      var result = {
        modifier: this.modifier,
        familiar: this.familiar,
        avoid: outfit_toConsumableArray(this.avoid),
        skipDefaults: this.skipDefaults,
        modes: outfit_objectSpread({}, this.modes)
      }; // Add all equipment forced in a particular slot

      var _iterator9 = outfit_createForOfIteratorHelper(outfitSlots),
          _step9;

      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var slotName = _step9.value;
          result[slotName] = this.equips.get((_a = new Map([["famequip", $slot(outfit_templateObject29 || (outfit_templateObject29 = outfit_taggedTemplateLiteral(["familiar"])))], ["offhand", $slot(outfit_templateObject30 || (outfit_templateObject30 = outfit_taggedTemplateLiteral(["off-hand"])))]]).get(slotName)) !== null && _a !== void 0 ? _a : (0,external_kolmafia_namespaceObject.toSlot)(slotName));
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }

      return result;
    }
  }]);

  return Outfit;
}();
/**
 * Get the modes of this outfit in a type compatible with Libram.
 *
 * This conversion is needed since we store the retrocape modes
 * internally as an array, but libram uses a string.
 *
 * @returns The modes equipped to this outfit.
 */

function convertToLibramModes(modes) {
  var _a;

  return {
    backupcamera: modes["backupcamera"],
    umbrella: modes["umbrella"],
    snowsuit: modes["snowsuit"],
    edpiece: modes["edpiece"],
    retrocape: (_a = modes["retrocape"]) === null || _a === void 0 ? void 0 : _a.filter(s => s !== undefined).join(" "),
    parka: modes["parka"]
  };
}
/**
 * Get the current modes of all items.
 *
 * @returns The current mode settings for all items, equipped or not.
 */

function outfit_getCurrentModes() {
  return {
    backupcamera: getMode("backupCameraMode", ["ml", "meat", "init"]),
    umbrella: getMode("umbrellaState", ["broken", "forward-facing", "bucket style", "pitchfork style", "constantly twirling", "cocoon"]),
    snowsuit: getMode("snowsuit", ["eyebrows", "smirk", "nose", "goatee", "hat"]),
    edpiece: getMode("edPiece", ["bear", "owl", "puma", "hyena", "mouse", "weasel", "fish"]),
    retrocape: [getMode("retroCapeSuperhero", ["vampire", "heck", "robot"]), getMode("retroCapeWashingInstructions", ["hold", "thrill", "kiss", "kill"])],
    parka: getMode("parkaMode", ["kachungasaur", "dilophosaur", "ghostasaurus", "spikolodon", "pterodactyl"])
  };
}
/**
 * Get the current value for a mode in a type-safe way.
 *
 * @param property The mafia property for the mode.
 * @param options A typed list of options for the mode.
 * @returns The mode if the property value matched a valid option, or undefined.
 */

function getMode(property, options) {
  var val = property_get(property, "");
  return options.find(s => s === val); // .includes has type issues
}
;// CONCATENATED MODULE: ./node_modules/grimoire-kolmafia/dist/engine.js
var engine_templateObject;

function engine_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function engine_toConsumableArray(arr) { return engine_arrayWithoutHoles(arr) || engine_iterableToArray(arr) || engine_unsupportedIterableToArray(arr) || engine_nonIterableSpread(); }

function engine_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function engine_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function engine_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return engine_arrayLikeToArray(arr); }

function engine_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = engine_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function engine_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return engine_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return engine_arrayLikeToArray(o, minLen); }

function engine_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function engine_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function engine_createClass(Constructor, protoProps, staticProps) { if (protoProps) engine_defineProperties(Constructor.prototype, protoProps); if (staticProps) engine_defineProperties(Constructor, staticProps); return Constructor; }

function engine_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





var EngineOptions = function EngineOptions() {
  engine_classCallCheck(this, EngineOptions);
};
var grimoireCCS = "grimoire_macro";
var Engine = /*#__PURE__*/function () {
  /**
   * Create the engine.
   * @param tasks A list of tasks for looking up task dependencies.
   * @param options Basic configuration of the engine.
   */
  function Engine(tasks, options) {
    engine_classCallCheck(this, Engine);

    this.attempts = {};
    this.propertyManager = new PropertiesManager();
    this.tasks_by_name = new Map();
    this.cachedCcsContents = "";
    this.tasks = tasks;
    this.options = options !== null && options !== void 0 ? options : {};

    var _iterator = engine_createForOfIteratorHelper(tasks),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var task = _step.value;
        this.tasks_by_name.set(task.name, task);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    this.initPropertiesManager(this.propertyManager);
  }
  /**
   * Determine the next task to perform.
   * By default, this is the first task in the task list that is available.
   * @returns The next task to perform, or undefined if no tasks are available.
   */


  engine_createClass(Engine, [{
    key: "getNextTask",
    value: function getNextTask() {
      return this.tasks.find(task => this.available(task));
    }
    /**
     * Continually get the next task and execute it.
     * @param actions If given, only perform up to this many tasks.
     */

  }, {
    key: "run",
    value: function run(actions) {
      for (var i = 0; i < (actions !== null && actions !== void 0 ? actions : Infinity); i++) {
        var task = this.getNextTask();
        if (!task) return;
        this.execute(task);
      }
    }
    /**
     * Close the engine and reset all properties.
     * After this has been called, this object should not be used.
     */

  }, {
    key: "destruct",
    value: function destruct() {
      this.propertyManager.resetAll();
      (0,external_kolmafia_namespaceObject.setAutoAttack)(0);
    }
    /**
     * Check if the given task is available at this moment.
     * @returns true if all dependencies are complete and the task is ready.
     *  Note that dependencies are not checked transitively. That is, if
     *  A depends on B which depends on C, then A is ready if B is complete
     *  (regardless of if C is complete or not).
     */

  }, {
    key: "available",
    value: function available(task) {
      var _a;

      var _iterator2 = engine_createForOfIteratorHelper((_a = task.after) !== null && _a !== void 0 ? _a : []),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var after = _step2.value;
          var after_task = this.tasks_by_name.get(after);
          if (after_task === undefined) throw "Unknown task dependency ".concat(after, " on ").concat(task.name);
          if (!after_task.completed()) return false;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      if (task.ready && !task.ready()) return false;
      if (task.completed()) return false;
      return true;
    }
    /**
     * Perform all steps to execute the provided task.
     * This is the main entry point for the Engine.
     * @param task The current executing task.
     */

  }, {
    key: "execute",
    value: function execute(task) {
      var _a, _b, _c, _d, _e;

      (0,external_kolmafia_namespaceObject.print)("");
      (0,external_kolmafia_namespaceObject.print)("Executing ".concat(task.name), "blue"); // Determine the proper postcondition for after the task executes.

      var postcondition = (_b = (_a = task.limit) === null || _a === void 0 ? void 0 : _a.guard) === null || _b === void 0 ? void 0 : _b.call(_a); // Acquire any items and effects first, possibly for later execution steps.

      this.acquireItems(task);
      this.acquireEffects(task); // Prepare the outfit, with resources.

      var task_combat = (_d = (_c = task.combat) === null || _c === void 0 ? void 0 : _c.clone()) !== null && _d !== void 0 ? _d : new CombatStrategy();
      var outfit = this.createOutfit(task);
      var task_resources = new CombatResources();
      this.customize(task, outfit, task_combat, task_resources);
      this.dress(task, outfit); // Prepare combat and choices

      this.setCombat(task, task_combat, task_resources);
      this.setChoices(task, this.propertyManager); // Actually perform the task

      var _iterator3 = engine_createForOfIteratorHelper(task_resources.all()),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var resource = _step3.value;
          (_e = resource.prepare) === null || _e === void 0 ? void 0 : _e.call(resource);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      this.prepare(task);
      this.do(task);

      while (this.shouldRepeatAdv(task)) {
        _set("lastEncounter", "");
        this.do(task);
      }

      this.post(task); // Mark that we tried the task, and apply limits

      this.markAttempt(task);
      this.checkLimits(task, postcondition);
    }
    /**
     * Acquire all items for the task.
     * @param task The current executing task.
     */

  }, {
    key: "acquireItems",
    value: function acquireItems(task) {
      var _a;

      var acquire = task.acquire instanceof Function ? task.acquire() : task.acquire;

      var _iterator4 = engine_createForOfIteratorHelper(acquire || []),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var to_get = _step4.value;
          var num_needed = (_a = to_get.num) !== null && _a !== void 0 ? _a : 1;
          var num_have = (0,external_kolmafia_namespaceObject.itemAmount)(to_get.item) + (0,external_kolmafia_namespaceObject.equippedAmount)(to_get.item);
          if (num_needed <= num_have) continue;
          if (to_get.useful !== undefined && !to_get.useful()) continue;

          if (to_get.get) {
            to_get.get();
          } else if (to_get.price !== undefined) {
            (0,external_kolmafia_namespaceObject.buy)(to_get.item, num_needed - num_have, to_get.price);
          } else if (Object.keys((0,external_kolmafia_namespaceObject.getRelated)(to_get.item, "fold")).length > 0) {
            (0,external_kolmafia_namespaceObject.cliExecute)("fold ".concat(to_get.item));
          } else {
            (0,external_kolmafia_namespaceObject.retrieveItem)(to_get.item, num_needed);
          }

          if ((0,external_kolmafia_namespaceObject.itemAmount)(to_get.item) + (0,external_kolmafia_namespaceObject.equippedAmount)(to_get.item) < num_needed && !to_get.optional) {
            throw "Task ".concat(task.name, " was unable to acquire ").concat(num_needed, " ").concat(to_get.item);
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
    /**
     * Acquire all effects for the task.
     * @param task The current executing task.
     */

  }, {
    key: "acquireEffects",
    value: function acquireEffects(task) {
      var _a;

      var effects = typeof task.effects === "function" ? task.effects() : (_a = task.effects) !== null && _a !== void 0 ? _a : [];
      var songs = effects.filter(effect => isSong(effect));
      if (songs.length > maxSongs()) throw "Too many AT songs";
      var extraSongs = Object.keys((0,external_kolmafia_namespaceObject.myEffects)()).map(effectName => (0,external_kolmafia_namespaceObject.toEffect)(effectName)).filter(effect => isSong(effect) && !songs.includes(effect));

      while (songs.length + extraSongs.length > maxSongs()) {
        var toRemove = extraSongs.pop();

        if (toRemove === undefined) {
          break;
        } else {
          uneffect(toRemove);
        }
      }

      var _iterator5 = engine_createForOfIteratorHelper(effects),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var effect = _step5.value;
          ensureEffect(effect);
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    }
    /**
     * Create an outfit for the task with all required equipment.
     * @param task The current executing task.
     */

  }, {
    key: "createOutfit",
    value: function createOutfit(task) {
      var spec = typeof task.outfit === "function" ? task.outfit() : task.outfit;
      if (spec instanceof Outfit) return spec.clone();
      var outfit = new Outfit();

      if (spec !== undefined) {
        if (!outfit.equip(spec)) {
          throw "Unable to equip all items for ".concat(task.name);
        }
      }

      return outfit;
    }
    /**
     * Equip the outfit for the task.
     * @param task The current executing task.
     * @param outfit The outfit for the task, possibly augmented by the engine.
     */

  }, {
    key: "dress",
    value: function dress(task, outfit) {
      if (task.do instanceof external_kolmafia_namespaceObject.Location) (0,external_kolmafia_namespaceObject.setLocation)(task.do);
      outfit.dress();
    }
    /* eslint-disable @typescript-eslint/no-unused-vars */

    /**
     * Perform any engine-specific customization for the outfit and combat plan.
     *
     * This is a natural method to override in order to:
     *   * Enable the use of any resources in the outfit or combat (e.g., allocate banishers).
     *   * Equip a default outfit.
     *   * Determine additional monster macros at a global level (e.g., use flyers).
     * @param task The current executing task.
     * @param outfit The outfit for the task.
     * @param combat The combat strategy so far for the task.
     * @param resources The combat resources assigned so far for the task.
     */

  }, {
    key: "customize",
    value: function customize(task, outfit, combat, resources) {// do nothing by default
    }
    /* eslint-enable @typescript-eslint/no-unused-vars */

    /**
     * Set the choice settings for the task.
     * @param task The current executing task.
     * @param manager The property manager to use.
     */

  }, {
    key: "setChoices",
    value: function setChoices(task, manager) {
      var choices = {};

      for (var choice_id_str in task.choices) {
        var choice_id = parseInt(choice_id_str);
        var choice = task.choices[choice_id];
        if (typeof choice === "number") choices[choice_id] = choice;else choices[choice_id] = choice();
      }

      manager.setChoices(choices);
    }
    /**
     * Save the combat macro for this task.
     * @param task The current executing task.
     * @param task_combat The completed combat strategy far for the task.
     * @param task_resources The combat resources assigned for the task.
     */

  }, {
    key: "setCombat",
    value: function setCombat(task, task_combat, task_resources) {
      var _a; // Save regular combat macro


      var macro = task_combat.compile(task_resources, (_a = this.options) === null || _a === void 0 ? void 0 : _a.combat_defaults, task.do instanceof external_kolmafia_namespaceObject.Location ? task.do : undefined);
      macro.save();

      if (!this.options.ccs) {
        // Use the macro through a CCS file
        var otherCCSEntries = task_combat.compileCcs();
        var ccsContents = ["[default]", "\"".concat(macro.toString(), "\"")].concat(engine_toConsumableArray(otherCCSEntries)).join("\n"); // Log Macro + other CCS

        (0,external_kolmafia_namespaceObject.logprint)("CCS: ".concat(ccsContents.replace("\n", "\\n ")));

        if (ccsContents !== this.cachedCcsContents) {
          (0,external_kolmafia_namespaceObject.writeCcs)(ccsContents, grimoireCCS);
          (0,external_kolmafia_namespaceObject.cliExecute)("ccs ".concat(grimoireCCS)); // force Mafia to reparse the ccs

          this.cachedCcsContents = ccsContents;
        }
      } // Save autoattack combat macro


      var autoattack = task_combat.compileAutoattack();

      if (autoattack.toString().length > 1) {
        (0,external_kolmafia_namespaceObject.logprint)("Autoattack macro: ".concat(autoattack.toString()));
        autoattack.setAutoAttack();
      } else {
        (0,external_kolmafia_namespaceObject.setAutoAttack)(0);
      }
    }
    /**
     * Do any task-specific preparation.
     * @param task The current executing task.
     */

  }, {
    key: "prepare",
    value: function prepare(task) {
      var _a;

      (_a = task.prepare) === null || _a === void 0 ? void 0 : _a.call(task);
    }
    /**
     * Actually perform the task.
     * @param task The current executing task.
     */

  }, {
    key: "do",
    value: function _do(task) {
      if (typeof task.do === "function") {
        task.do();
      } else {
        (0,external_kolmafia_namespaceObject.adv1)(task.do, 0, "");
      }

      (0,external_kolmafia_namespaceObject.runCombat)();

      while ((0,external_kolmafia_namespaceObject.inMultiFight)()) {
        (0,external_kolmafia_namespaceObject.runCombat)();
      }

      if ((0,external_kolmafia_namespaceObject.choiceFollowsFight)()) (0,external_kolmafia_namespaceObject.runChoice)(-1);
    }
    /**
     * Check if the task.do should be immediately repeated without any prep.
     *
     * By default, this is only used to repeat a task if we hit one of:
     *   1. Halloweener dog noncombats,
     *   2. June cleaver noncombats, or
     *   3. Lil' Doctor™ bag noncombt.
     * @param task The current executing task.
     * @returns True if the task should be immediately repeated.
     */

  }, {
    key: "shouldRepeatAdv",
    value: function shouldRepeatAdv(task) {
      return task.do instanceof external_kolmafia_namespaceObject.Location && lastEncounterWasWanderingNC();
    }
    /**
     * Do any task-specific wrapup activities.
     * @param task The current executing task.
     */

  }, {
    key: "post",
    value: function post(task) {
      var _a;

      (_a = task.post) === null || _a === void 0 ? void 0 : _a.call(task);
    }
    /**
     * Mark that an attempt was made on the current task.
     * @param task The current executing task.
     */

  }, {
    key: "markAttempt",
    value: function markAttempt(task) {
      if (!(task.name in this.attempts)) this.attempts[task.name] = 0;
      this.attempts[task.name]++;
    }
    /**
     * Check if the task has passed any of its internal limits.
     * @param task The task to check.
     * @throws An error if any of the internal limits have been passed.
     */

  }, {
    key: "checkLimits",
    value: function checkLimits(task, postcondition) {
      var _a;

      if (!task.limit) return;
      var failureMessage = task.limit.message ? " ".concat(task.limit.message) : "";

      if (!task.completed()) {
        if (task.limit.tries && this.attempts[task.name] >= task.limit.tries) throw "Task ".concat(task.name, " did not complete within ").concat(task.limit.tries, " attempts. Please check what went wrong.").concat(failureMessage);
        if (task.limit.soft && this.attempts[task.name] >= task.limit.soft) throw "Task ".concat(task.name, " did not complete within ").concat(task.limit.soft, " attempts. Please check what went wrong (you may just be unlucky).").concat(failureMessage);
        if (task.limit.turns && task.do instanceof external_kolmafia_namespaceObject.Location && task.do.turnsSpent >= task.limit.turns) throw "Task ".concat(task.name, " did not complete within ").concat(task.limit.turns, " turns. Please check what went wrong.").concat(failureMessage);
        if (task.limit.unready && ((_a = task.ready) === null || _a === void 0 ? void 0 : _a.call(task))) throw "Task ".concat(task.name, " is still ready, but it should not be. Please check what went wrong.").concat(failureMessage);
      }

      if (postcondition && !postcondition()) {
        throw "Task ".concat(task.name, " failed its guard. Please check what went wrong.").concat(failureMessage);
      }
    }
    /**
     * Initialize properties for the script.
     * @param manager The properties manager to use.
     */

  }, {
    key: "initPropertiesManager",
    value: function initPropertiesManager(manager) {
      var _a; // Properties adapted from garbo


      manager.set({
        logPreferenceChange: true,
        logPreferenceChangeFilter: engine_toConsumableArray(new Set([].concat(engine_toConsumableArray(property_get("logPreferenceChangeFilter").split(",")), ["libram_savedMacro", "maximizerMRUList", "testudinalTeachings", "_lastCombatStarted"]))).sort().filter(a => a).join(","),
        battleAction: "custom combat script",
        autoSatisfyWithMall: true,
        autoSatisfyWithNPCs: true,
        autoSatisfyWithCoinmasters: true,
        autoSatisfyWithStash: false,
        dontStopForCounters: true,
        maximizerFoldables: true,
        hpAutoRecovery: "-0.05",
        hpAutoRecoveryTarget: "0.0",
        mpAutoRecovery: "-0.05",
        mpAutoRecoveryTarget: "0.0",
        afterAdventureScript: "",
        betweenBattleScript: "",
        choiceAdventureScript: "",
        familiarScript: "",
        currentMood: "apathetic",
        autoTuxedo: true,
        autoPinkyRing: true,
        autoGarish: true,
        allowNonMoodBurning: false,
        allowSummonBurning: true,
        libramSkillsSoftcore: "none"
      });

      if (this.options.ccs !== "") {
        if (this.options.ccs === undefined && (0,external_kolmafia_namespaceObject.readCcs)(grimoireCCS) === "") {
          // Write a simple CCS so we can switch to it
          (0,external_kolmafia_namespaceObject.writeCcs)("[ default ]\nabort", grimoireCCS);
        }

        manager.set({
          customCombatScript: (_a = this.options.ccs) !== null && _a !== void 0 ? _a : grimoireCCS
        });
      }
    }
  }]);

  return Engine;
}();
function maxSongs() {
  return have($skill(engine_templateObject || (engine_templateObject = engine_taggedTemplateLiteral(["Mariachi Memory"])))) ? 4 : 3;
}
var wanderingNCs = new Set(["Wooof! Wooooooof!", "Playing Fetch*", "A Pound of Cure", "Aunts not Ants", "Bath Time", "Beware of Aligator", "Delicious Sprouts", "Hypnotic Master", "Lost and Found", "Poetic Justice", "Summer Days", "Teacher's Pet"]);
/**
 * Return true if the last adv was one of:
 *   1. Halloweener dog noncombats,
 *   2. June cleaver noncombats, or
 *   3. Lil' Doctor™ bag noncombt.
 */

function lastEncounterWasWanderingNC() {
  return wanderingNCs.has(property_get("lastEncounter"));
}
;// CONCATENATED MODULE: ./node_modules/grimoire-kolmafia/dist/route.js
function route_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function route_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { route_ownKeys(Object(source), true).forEach(function (key) { route_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { route_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function route_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function route_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = route_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function route_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return route_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return route_arrayLikeToArray(o, minLen); }

function route_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Extract a list of tasks from the provided quests.
 *
 * Each task name is prepended with the quest name ("Quest Name/Task Name").
 * The quest-local names referred to in task.after are updated appropriately.
 * The task completion condition is updated to include the quest completion.
 *
 * Tasks are returned in-order: all tasks from the first quest, then all tasks
 * from the second quest, etc.
 *
 * @param quests The list of quests. This method does not modify the quest
 *    objects or their tasks.
 * @param implicitAfter If true, each task with task.after = undefined will
 *    have a dependency added on the previous task in the list.
 * @returns A list of tasks from the input quests (with updated properties).
 */
function getTasks(quests) {
  var implicitAfter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var _a, _b;

  var result = [];

  var _iterator = route_createForOfIteratorHelper(quests),
      _step;

  try {
    var _loop = function _loop() {
      var quest = _step.value;
      var questCompleted = quest.completed;

      var _iterator3 = route_createForOfIteratorHelper(quest.tasks),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _task2 = _step3.value;

          // Include quest name in task names and dependencies (unless dependency quest is given)
          var renamedTask = route_objectSpread({}, _task2);

          renamedTask.name = "".concat(quest.name, "/").concat(_task2.name);
          renamedTask.after = (_a = _task2.after) === null || _a === void 0 ? void 0 : _a.map(after => after.includes("/") ? after : "".concat(quest.name, "/").concat(after)); // Include previous task as a dependency

          if (implicitAfter && _task2.after === undefined && result.length > 0) renamedTask.after = [result[result.length - 1].name]; // Include quest completion in task completion

          if (questCompleted !== undefined) {
            (function () {
              var taskCompleted = _task2.completed;

              renamedTask.completed = () => questCompleted() || taskCompleted();
            })();
          }

          result.push(renamedTask);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    } // Verify the dependency names of all tasks

  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var names = new Set();

  for (var _i = 0, _result = result; _i < _result.length; _i++) {
    var task = _result[_i];
    names.add(task.name);
  }

  for (var _i2 = 0, _result2 = result; _i2 < _result2.length; _i2++) {
    var _task = _result2[_i2];

    var _iterator2 = route_createForOfIteratorHelper((_b = _task.after) !== null && _b !== void 0 ? _b : []),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var after = _step2.value;

        if (!names.has(after)) {
          throw "Unknown task dependency ".concat(after, " of ").concat(_task.name);
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }

  return result;
}
function orderByRoute(tasks, routing, ignore_missing_tasks) {
  var priorities = new Map();

  var _iterator4 = route_createForOfIteratorHelper(tasks),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var task = _step4.value;
      priorities.set(task.name, [1000, task]);
    } // Prioritize the routing list of tasks first

  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }

  function setPriorityRecursive(task, priority) {
    var _a;

    var old_priority = priorities.get(task);

    if (old_priority === undefined) {
      if (ignore_missing_tasks) return;
      throw "Unknown routing task ".concat(task);
    }

    if (old_priority[0] <= priority) return;
    priorities.set(task, [priority, old_priority[1]]);

    var _iterator5 = route_createForOfIteratorHelper((_a = old_priority[1].after) !== null && _a !== void 0 ? _a : []),
        _step5;

    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var requirement = _step5.value;
        setPriorityRecursive(requirement, priority - 0.01);
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
  }

  for (var i = 0; i < routing.length; i++) {
    setPriorityRecursive(routing[i], i);
  } // Sort all tasks by priority.
  // Since this sort is stable, we default to earlier tasks.


  var result = tasks.slice();
  result.sort((a, b) => (priorities.get(a.name) || [1000])[0] - (priorities.get(b.name) || [1000])[0]);
  return result;
}
;// CONCATENATED MODULE: ./node_modules/grimoire-kolmafia/dist/index.js







;// CONCATENATED MODULE: ./src/engine/combat.ts
var engine_combat_templateObject, engine_combat_templateObject2, combat_templateObject3, combat_templateObject4, combat_templateObject5, combat_templateObject6, combat_templateObject7;

function engine_combat_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function engine_combat_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function engine_combat_createClass(Constructor, protoProps, staticProps) { if (protoProps) engine_combat_defineProperties(Constructor.prototype, protoProps); if (staticProps) engine_combat_defineProperties(Constructor, staticProps); return Constructor; }

function engine_combat_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function engine_combat_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) engine_combat_setPrototypeOf(subClass, superClass); }

function engine_combat_setPrototypeOf(o, p) { engine_combat_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return engine_combat_setPrototypeOf(o, p); }

function engine_combat_createSuper(Derived) { var hasNativeReflectConstruct = engine_combat_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = engine_combat_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = engine_combat_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return engine_combat_possibleConstructorReturn(this, result); }; }

function engine_combat_possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return engine_combat_assertThisInitialized(self); }

function engine_combat_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function engine_combat_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function engine_combat_getPrototypeOf(o) { engine_combat_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return engine_combat_getPrototypeOf(o); }

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */


var myActions = ["kill", "banish"];
var combat_CombatStrategy = /*#__PURE__*/function (_BaseCombatStrategy$w) {
  engine_combat_inherits(CombatStrategy, _BaseCombatStrategy$w);

  var _super = engine_combat_createSuper(CombatStrategy);

  function CombatStrategy() {
    engine_combat_classCallCheck(this, CombatStrategy);

    return _super.apply(this, arguments);
  }

  return CombatStrategy;
}(CombatStrategy.withActions(myActions));
var MyActionDefaults = /*#__PURE__*/function () {
  function MyActionDefaults() {
    engine_combat_classCallCheck(this, MyActionDefaults);
  }

  engine_combat_createClass(MyActionDefaults, [{
    key: "kill",
    value: function kill() {
      return this.delevel().trySkill($skill(engine_combat_templateObject || (engine_combat_templateObject = engine_combat_taggedTemplateLiteral(["Sing Along"])))).trySkill($skill(engine_combat_templateObject2 || (engine_combat_templateObject2 = engine_combat_taggedTemplateLiteral(["Bowl Straight Up"])))).attack().repeat();
    }
  }, {
    key: "banish",
    value: function banish() {
      return Macro.runaway(); // If no resource provided
    }
  }, {
    key: "delevel",
    value: function delevel() {
      return Macro.trySkill($skill(combat_templateObject3 || (combat_templateObject3 = engine_combat_taggedTemplateLiteral(["Micrometeorite"])))).tryItem(template_string_$item(combat_templateObject4 || (combat_templateObject4 = engine_combat_taggedTemplateLiteral(["Rain-Doh indigo cup"])))).trySkill($skill(combat_templateObject5 || (combat_templateObject5 = engine_combat_taggedTemplateLiteral(["Summon Love Mosquito"])))).tryItem(template_string_$item(combat_templateObject6 || (combat_templateObject6 = engine_combat_taggedTemplateLiteral(["Time-Spinner"])))).tryItem(template_string_$item(combat_templateObject7 || (combat_templateObject7 = engine_combat_taggedTemplateLiteral(["HOA citation pad"]))));
    }
  }]);

  return MyActionDefaults;
}();
;// CONCATENATED MODULE: ./src/engine/outfit.ts
var engine_outfit_templateObject, engine_outfit_templateObject2;

function engine_outfit_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function engine_outfit_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = engine_outfit_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function engine_outfit_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return engine_outfit_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return engine_outfit_arrayLikeToArray(o, minLen); }

function engine_outfit_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




function equipFirst(outfit, resources) {
  var _iterator = engine_outfit_createForOfIteratorHelper(resources),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _resource$equip, _resource$equip2;

      var resource = _step.value;
      if (!resource.available()) continue;
      if (!outfit.canEquip((_resource$equip = resource.equip) !== null && _resource$equip !== void 0 ? _resource$equip : [])) continue;
      if (!outfit.equip((_resource$equip2 = resource.equip) !== null && _resource$equip2 !== void 0 ? _resource$equip2 : [])) continue;
      return resource;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return undefined;
}
function fromCurrent() {
  var outfit = new Outfit();
  outfit.equip((0,external_kolmafia_namespaceObject.myFamiliar)());

  var _iterator2 = engine_outfit_createForOfIteratorHelper(outfitSlots),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _Map$get;

      var slotName = _step2.value;
      var slot = (_Map$get = new Map([["famequip", $slot(engine_outfit_templateObject || (engine_outfit_templateObject = engine_outfit_taggedTemplateLiteral(["familiar"])))], ["offhand", $slot(engine_outfit_templateObject2 || (engine_outfit_templateObject2 = engine_outfit_taggedTemplateLiteral(["off-hand"])))]]).get(slotName)) !== null && _Map$get !== void 0 ? _Map$get : (0,external_kolmafia_namespaceObject.toSlot)(slotName);
      outfit.equip((0,external_kolmafia_namespaceObject.equippedItem)(slot), slot);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  outfit.setModes(outfit_getCurrentModes());
  return outfit;
}
// EXTERNAL MODULE: ./node_modules/libram/node_modules/core-js/modules/es.object.values.js
var es_object_values = __webpack_require__(2231);
;// CONCATENATED MODULE: ./node_modules/libram/dist/resources/2017/AsdonMartin.js
var AsdonMartin_templateObject, AsdonMartin_templateObject2, AsdonMartin_templateObject3, AsdonMartin_templateObject4, AsdonMartin_templateObject5, AsdonMartin_templateObject6, AsdonMartin_templateObject7, AsdonMartin_templateObject8, AsdonMartin_templateObject9, AsdonMartin_templateObject10, AsdonMartin_templateObject11, AsdonMartin_templateObject12, AsdonMartin_templateObject13;

function AsdonMartin_slicedToArray(arr, i) { return AsdonMartin_arrayWithHoles(arr) || AsdonMartin_iterableToArrayLimit(arr, i) || AsdonMartin_unsupportedIterableToArray(arr, i) || AsdonMartin_nonIterableRest(); }

function AsdonMartin_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function AsdonMartin_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return AsdonMartin_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return AsdonMartin_arrayLikeToArray(o, minLen); }

function AsdonMartin_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function AsdonMartin_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function AsdonMartin_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function AsdonMartin_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }






var PriceAge;

(function (PriceAge) {
  PriceAge[PriceAge["HISTORICAL"] = 0] = "HISTORICAL";
  PriceAge[PriceAge["RECENT"] = 1] = "RECENT";
  PriceAge[PriceAge["TODAY"] = 2] = "TODAY";
})(PriceAge || (PriceAge = {}));
/**
 * Returns whether or not we have the Asdon installed in the workshed at present.
 */


function installed() {
  return (0,external_kolmafia_namespaceObject.getWorkshed)() === template_string_$item(AsdonMartin_templateObject || (AsdonMartin_templateObject = AsdonMartin_taggedTemplateLiteral(["Asdon Martin keyfob"])));
}
/**
 * Returns true if we have the Asdon or if it's installed.
 */

function AsdonMartin_have() {
  return installed() || haveItem($item(AsdonMartin_templateObject2 || (AsdonMartin_templateObject2 = AsdonMartin_taggedTemplateLiteral(["Asdon Martin keyfob"]))));
}
var fuelSkiplist = template_string_$items(AsdonMartin_templateObject3 || (AsdonMartin_templateObject3 = AsdonMartin_taggedTemplateLiteral(["cup of \"tea\", thermos of \"whiskey\", Lucky Lindy, Bee's Knees, Sockdollager, Ish Kabibble, Hot Socks, Phonus Balonus, Flivver, Sloppy Jalopy, glass of \"milk\""])));

function priceTooOld(item) {
  return (0,external_kolmafia_namespaceObject.historicalPrice)(item) === 0 || (0,external_kolmafia_namespaceObject.historicalAge)(item) >= 7;
} // Return mall max if historicalPrice returns -1.


function historicalPriceOrMax(item) {
  var historical = (0,external_kolmafia_namespaceObject.historicalPrice)(item);
  return historical < 0 ? 999999999 : historical;
} // Return mall max if mallPrice returns -1.


function mallPriceOrMax(item) {
  var mall = (0,external_kolmafia_namespaceObject.mallPrice)(item);
  return mall < 0 ? 999999999 : mall;
}

function price(item, priceAge) {
  switch (priceAge) {
    case PriceAge.HISTORICAL:
      {
        var historical = historicalPriceOrMax(item);
        return historical === 0 ? mallPriceOrMax(item) : historical;
      }

    case PriceAge.RECENT:
      return priceTooOld(item) ? mallPriceOrMax(item) : historicalPriceOrMax(item);

    case PriceAge.TODAY:
      return mallPriceOrMax(item);
  }
}

function inventoryItems() {
  return external_kolmafia_namespaceObject.Item.all().filter(isFuelItem).filter(item => have(item) && [100, (0,external_kolmafia_namespaceObject.autosellPrice)(item)].includes(price(item, PriceAge.RECENT)));
} // Efficiency in meat per fuel.


function calculateFuelUnitCost(it) {
  var priceAge = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : PriceAge.RECENT;
  var units = getAverageAdventures(it);
  return price(it, priceAge) / units;
}

function isFuelItem(it) {
  return !(0,external_kolmafia_namespaceObject.isNpcItem)(it) && it.fullness + it.inebriety > 0 && getAverageAdventures(it) > 0 && it.tradeable && it.discardable && !fuelSkiplist.includes(it);
}

function getBestFuels() {
  // Three stages.
  // 1. Filter to reasonable items using historical cost (within 5x of historical best).
  var allFuel = external_kolmafia_namespaceObject.Item.all().filter(isFuelItem);

  if (allFuel.filter(item => (0,external_kolmafia_namespaceObject.historicalPrice)(item) === 0).length > 100) {
    (0,external_kolmafia_namespaceObject.mallPrices)("food");
    (0,external_kolmafia_namespaceObject.mallPrices)("booze");
  }

  var keyHistorical = item => calculateFuelUnitCost(item, PriceAge.HISTORICAL);

  allFuel.sort((x, y) => keyHistorical(x) - keyHistorical(y));
  var bestUnitCost = keyHistorical(allFuel[0]);
  var firstBadIndex = allFuel.findIndex(item => keyHistorical(item) > 5 * bestUnitCost);
  var potentialFuel = firstBadIndex > 0 ? allFuel.slice(0, firstBadIndex) : allFuel; // 2. Filter to top 10 candidates using prices at most a week old.

  if (potentialFuel.filter(item => priceTooOld(item)).length > 100) {
    (0,external_kolmafia_namespaceObject.mallPrices)("food");
    (0,external_kolmafia_namespaceObject.mallPrices)("booze");
  }

  var key1 = item => -getAverageAdventures(item);

  var key2 = item => calculateFuelUnitCost(item, PriceAge.RECENT);

  potentialFuel.sort((x, y) => key1(x) - key1(y));
  potentialFuel.sort((x, y) => key2(x) - key2(y)); // 3. Find result using precise price for those top candidates.

  var candidates = potentialFuel.slice(0, 10);

  var key3 = item => calculateFuelUnitCost(item, PriceAge.TODAY);

  candidates.sort((x, y) => key3(x) - key3(y));

  if (calculateFuelUnitCost(candidates[0], PriceAge.TODAY) > 100) {
    throw new Error("Could not identify any fuel with efficiency better than 100 meat per fuel. " + "This means something went wrong.");
  }

  return candidates;
}
/**
 * Fuel your Asdon Martin with a given quantity of a given item
 * @param it Item to fuel with.
 * @param quantity Number of items to fuel with.
 * @returns Whether we succeeded at fueling with the given items.
 */


function insertFuel(it) {
  var quantity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var result = (0,external_kolmafia_namespaceObject.visitUrl)("campground.php?action=fuelconvertor&pwd&qty=".concat(quantity, "&iid=").concat((0,external_kolmafia_namespaceObject.toInt)(it), "&go=Convert%21"));
  return result.includes("The display updates with a");
}
/**
 * Fill your Asdon Martin to the given fuel level in the cheapest way possible
 * @param targetUnits Fuel level to attempt to reach.
 * @returns Whether we succeeded at filling to the target fuel level.
 */

function fillTo(targetUnits) {
  if (!installed()) return false;

  while ((0,external_kolmafia_namespaceObject.getFuel)() < targetUnits) {
    // if in Hardcore/ronin, skip the price calculation and just use soda bread
    var _ref = (0,external_kolmafia_namespaceObject.canInteract)() ? getBestFuels() : [template_string_$item(AsdonMartin_templateObject4 || (AsdonMartin_templateObject4 = AsdonMartin_taggedTemplateLiteral(["loaf of soda bread"]))), undefined],
        _ref2 = AsdonMartin_slicedToArray(_ref, 2),
        bestFuel = _ref2[0],
        secondBest = _ref2[1];

    var count = Math.ceil(targetUnits / getAverageAdventures(bestFuel));
    var ceiling = undefined;

    if (secondBest) {
      var efficiencyOfSecondBest = (0,external_kolmafia_namespaceObject.mallPrice)(secondBest) / getAverageAdventures(secondBest);
      ceiling = Math.ceil(efficiencyOfSecondBest * getAverageAdventures(bestFuel));
    }

    if (!(0,external_kolmafia_namespaceObject.canInteract)()) (0,external_kolmafia_namespaceObject.retrieveItem)(count, bestFuel);else ceiling ? (0,external_kolmafia_namespaceObject.buy)(count, bestFuel, ceiling) : (0,external_kolmafia_namespaceObject.buy)(count, bestFuel);

    if (!insertFuel(bestFuel, Math.min((0,external_kolmafia_namespaceObject.itemAmount)(bestFuel), count))) {
      throw new Error("Failed to fuel Asdon Martin.");
    }
  }

  return (0,external_kolmafia_namespaceObject.getFuel)() >= targetUnits;
}

function fillWithBestInventoryItem(targetUnits) {
  var options = inventoryItems().sort((a, b) => getAverageAdventures(b) / (0,external_kolmafia_namespaceObject.autosellPrice)(b) - getAverageAdventures(a) / (0,external_kolmafia_namespaceObject.autosellPrice)(a));
  if (options.length === 0) return false;
  var best = options[0];
  if ((0,external_kolmafia_namespaceObject.autosellPrice)(best) / getAverageAdventures(best) > 100) return false;
  var amountToUse = clamp(Math.ceil(targetUnits / getAverageAdventures(best)), 0, (0,external_kolmafia_namespaceObject.itemAmount)(best));
  return insertFuel(best, amountToUse);
}
/**
 * Fill your Asdon Martin by prioritizing mallmin items in your inventory. Default to the behavior of fillTo.
 * @param targetUnits Fuel level to attempt to reach.
 * @returns Whether we succeeded at filling to the target fuel level.
 */


function fillWithInventoryTo(targetUnits) {
  if (!installed()) return false;
  var continueFuelingFromInventory = true;

  while ((0,external_kolmafia_namespaceObject.getFuel)() < targetUnits && continueFuelingFromInventory) {
    continueFuelingFromInventory && (continueFuelingFromInventory = fillWithBestInventoryItem(targetUnits));
  }

  return fillTo(targetUnits);
}
/**
 * Object consisting of the various Asdon driving styles
 */

var Driving = {
  Obnoxiously: $effect(AsdonMartin_templateObject5 || (AsdonMartin_templateObject5 = AsdonMartin_taggedTemplateLiteral(["Driving Obnoxiously"]))),
  Stealthily: $effect(AsdonMartin_templateObject6 || (AsdonMartin_templateObject6 = AsdonMartin_taggedTemplateLiteral(["Driving Stealthily"]))),
  Wastefully: $effect(AsdonMartin_templateObject7 || (AsdonMartin_templateObject7 = AsdonMartin_taggedTemplateLiteral(["Driving Wastefully"]))),
  Safely: $effect(AsdonMartin_templateObject8 || (AsdonMartin_templateObject8 = AsdonMartin_taggedTemplateLiteral(["Driving Safely"]))),
  Recklessly: $effect(AsdonMartin_templateObject9 || (AsdonMartin_templateObject9 = AsdonMartin_taggedTemplateLiteral(["Driving Recklessly"]))),
  Intimidatingly: $effect(AsdonMartin_templateObject10 || (AsdonMartin_templateObject10 = AsdonMartin_taggedTemplateLiteral(["Driving Intimidatingly"]))),
  Quickly: $effect(AsdonMartin_templateObject11 || (AsdonMartin_templateObject11 = AsdonMartin_taggedTemplateLiteral(["Driving Quickly"]))),
  Observantly: $effect(AsdonMartin_templateObject12 || (AsdonMartin_templateObject12 = AsdonMartin_taggedTemplateLiteral(["Driving Observantly"]))),
  Waterproofly: $effect(AsdonMartin_templateObject13 || (AsdonMartin_templateObject13 = AsdonMartin_taggedTemplateLiteral(["Driving Waterproofly"])))
};
/**
 * Attempt to drive with a particular style for a particular number of turns.
 * @param style The driving style to use.
 * @param turns The number of turns to attempt to get.
 * @param preferInventory Whether we should preferentially value items currently in our inventory.
 * @returns Whether we have at least as many turns as requested of said driving style.
 */

function drive(style) {
  var turns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var preferInventory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (!Object.values(Driving).includes(style)) return false;
  if (!installed()) return false;
  if ((0,external_kolmafia_namespaceObject.haveEffect)(style) >= turns) return true;
  var fuelNeeded = 37 * Math.ceil((turns - (0,external_kolmafia_namespaceObject.haveEffect)(style)) / 30);
  (preferInventory ? fillWithInventoryTo : fillTo)(fuelNeeded);

  while ((0,external_kolmafia_namespaceObject.getFuel)() >= 37 && (0,external_kolmafia_namespaceObject.haveEffect)(style) < turns) {
    (0,external_kolmafia_namespaceObject.cliExecute)("asdonmartin drive ".concat(style.name.replace("Driving ", "")));
  }

  return (0,external_kolmafia_namespaceObject.haveEffect)(style) >= turns;
}
;// CONCATENATED MODULE: ./src/lib.ts
var lib_templateObject;

function lib_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function src_lib_slicedToArray(arr, i) { return src_lib_arrayWithHoles(arr) || src_lib_iterableToArrayLimit(arr, i) || src_lib_unsupportedIterableToArray(arr, i) || src_lib_nonIterableRest(); }

function src_lib_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function src_lib_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function src_lib_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function src_lib_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = src_lib_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function src_lib_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return src_lib_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return src_lib_arrayLikeToArray(o, minLen); }

function src_lib_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



function debug(message, color) {
  if (color) {
    (0,external_kolmafia_namespaceObject.print)(message, color);
  } else {
    (0,external_kolmafia_namespaceObject.print)(message);
  }
}
function formatAmountOfItem(amount, item) {
  return "".concat(formatNumber(amount), " ").concat(amount === 1 ? item : item.plural);
}
function formatNumber(x) {
  var str = x.toString();
  if (str.includes(".")) return x.toFixed(2);
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function acquire(quantity, item, maxPrice) {
  debug("Trying to acquire ".concat(formatAmountOfItem(quantity, item), "; max price ").concat(formatNumber(maxPrice)), "green");
  var startAmount = (0,external_kolmafia_namespaceObject.itemAmount)(item);
  withProperty("autoBuyPriceLimit", maxPrice, () => (0,external_kolmafia_namespaceObject.retrieveItem)(item, quantity));
  return (0,external_kolmafia_namespaceObject.itemAmount)(item) - startAmount;
}
function printOutfit(outfit) {
  var _iterator = src_lib_createForOfIteratorHelper(outfit.equips),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = src_lib_slicedToArray(_step.value, 2),
          slot = _step$value[0],
          item = _step$value[1];

      print("* ".concat(slot, ": ").concat(item));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  print("* ".concat(outfit.familiar));
}
/**
 * Find the best element of an array, where "best" is defined by some given criteria. Taken from garbage-collector.
 * @param array The array to traverse and find the best element of.
 * @param optimizer Either a key on the objects we're looking at that corresponds to numerical values, or a function for mapping these objects to numbers. Essentially, some way of assigning value to the elements of the array.
 * @param reverse Make this true to find the worst element of the array, and false to find the best. Defaults to false.
 */

function maxBy(array, optimizer) {
  var reverse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (typeof optimizer === "function") {
    return maxBy(array.map(key => ({
      key: key,
      value: optimizer(key)
    })), "value", reverse).key;
  } else {
    return array.reduce((a, b) => a[optimizer] > b[optimizer] !== reverse ? a : b);
  }
}
function ronin() {
  return !(0,external_kolmafia_namespaceObject.canInteract)();
}
function gyou() {
  return (0,external_kolmafia_namespaceObject.myPath)() === $path(lib_templateObject || (lib_templateObject = lib_taggedTemplateLiteral(["Grey You"])));
}
function canPull(item) {
  var pulls = property_get("_roninStoragePulls").split(",");
  return ronin() && pulls.length < 20 && !pulls.includes("".concat((0,external_kolmafia_namespaceObject.toInt)(item)));
}
;// CONCATENATED MODULE: ./src/engine/resources.ts
var resources_templateObject, resources_templateObject2, resources_templateObject3, resources_templateObject4, resources_templateObject5, resources_templateObject6, resources_templateObject7, resources_templateObject8, resources_templateObject9, resources_templateObject10, resources_templateObject11, resources_templateObject12, resources_templateObject13, resources_templateObject14, resources_templateObject15, resources_templateObject16, resources_templateObject17, resources_templateObject18, resources_templateObject19, resources_templateObject20;

function resources_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




var banishSources = [{
  name: "System Sweep",
  available: () => have($skill(resources_templateObject || (resources_templateObject = resources_taggedTemplateLiteral(["System Sweep"])))),
  do: $skill(resources_templateObject2 || (resources_templateObject2 = resources_taggedTemplateLiteral(["System Sweep"])))
}, {
  name: "Human Musk",
  available: () => true,
  prepare: () => (0,external_kolmafia_namespaceObject.retrieveItem)(template_string_$item(resources_templateObject3 || (resources_templateObject3 = resources_taggedTemplateLiteral(["human musk"])))),
  do: template_string_$item(resources_templateObject4 || (resources_templateObject4 = resources_taggedTemplateLiteral(["human musk"])))
}, {
  name: "Ice House",
  available: () => (0,external_kolmafia_namespaceObject.retrievePrice)(template_string_$item(resources_templateObject5 || (resources_templateObject5 = resources_taggedTemplateLiteral(["ice house"])))) < 50000,
  prepare: () => (0,external_kolmafia_namespaceObject.retrieveItem)(template_string_$item(resources_templateObject6 || (resources_templateObject6 = resources_taggedTemplateLiteral(["ice house"])))),
  do: template_string_$item(resources_templateObject7 || (resources_templateObject7 = resources_taggedTemplateLiteral(["ice house"])))
}, {
  name: "Asdon Martin",
  available: () => {
    // From libram
    if (!installed()) return false;
    var banishes = property_get("banishedMonsters").split(":");
    var bumperIndex = banishes.map(string => string.toLowerCase()).indexOf("spring-loaded front bumper");
    if (bumperIndex === -1) return true;
    return (0,external_kolmafia_namespaceObject.myTurncount)() - parseInt(banishes[bumperIndex + 1]) > 30;
  },
  prepare: () => fillTo(50),
  do: $skill(resources_templateObject8 || (resources_templateObject8 = resources_taggedTemplateLiteral(["Asdon Martin: Spring-Loaded Front Bumper"])))
}, {
  name: "Tryptophan Dart",
  available: () => (0,external_kolmafia_namespaceObject.retrievePrice)(template_string_$item(resources_templateObject9 || (resources_templateObject9 = resources_taggedTemplateLiteral(["tryptophan dart"])))) < 100000,
  prepare: () => (0,external_kolmafia_namespaceObject.retrieveItem)(template_string_$item(resources_templateObject10 || (resources_templateObject10 = resources_taggedTemplateLiteral(["tryptophan dart"])))),
  do: template_string_$item(resources_templateObject11 || (resources_templateObject11 = resources_taggedTemplateLiteral(["tryptophan dart"])))
}, {
  name: "Tennis Ball",
  available: () => (0,external_kolmafia_namespaceObject.retrievePrice)(template_string_$item(resources_templateObject12 || (resources_templateObject12 = resources_taggedTemplateLiteral(["tennis ball"])))) < 15000,
  prepare: () => (0,external_kolmafia_namespaceObject.retrieveItem)(template_string_$item(resources_templateObject13 || (resources_templateObject13 = resources_taggedTemplateLiteral(["tennis ball"])))),
  do: template_string_$item(resources_templateObject14 || (resources_templateObject14 = resources_taggedTemplateLiteral(["tennis ball"])))
}, {
  name: "Cosmic Bowling Ball",
  available: () => have(template_string_$item(resources_templateObject15 || (resources_templateObject15 = resources_taggedTemplateLiteral(["cosmic bowling ball"])))),
  do: $skill(resources_templateObject16 || (resources_templateObject16 = resources_taggedTemplateLiteral(["Bowl a Curveball"])))
}];
function unusedBanishes(to_banish) {
  var used_banishes = new Set();
  var already_banished = new Map(Array.from(getBanishedMonsters(), entry => [entry[1], entry[0]])); // Record monsters that still need to be banished, and the banishes used

  to_banish.forEach(monster => {
    var banished_with = already_banished.get(monster);

    if (banished_with === undefined) {
      to_banish.push(monster);
    } else {
      used_banishes.add(banished_with); // Map strange banish tracking to our resources

      if (banished_with === template_string_$item(resources_templateObject17 || (resources_templateObject17 = resources_taggedTemplateLiteral(["training scroll:  Snokebomb"])))) used_banishes.add($skill(resources_templateObject18 || (resources_templateObject18 = resources_taggedTemplateLiteral(["Snokebomb"]))));
      if (banished_with === template_string_$item(resources_templateObject19 || (resources_templateObject19 = resources_taggedTemplateLiteral(["tomayohawk-style reflex hammer"])))) used_banishes.add($skill(resources_templateObject20 || (resources_templateObject20 = resources_taggedTemplateLiteral(["Reflex Hammer"]))));
    }
  });
  if (to_banish.length === 0) return []; // All monsters banished.

  debug("Banish targets: ".concat(to_banish.join(", ")));
  debug("Banishes used: ".concat(Array.from(used_banishes).join(", ")));
  return banishSources.filter(banish => banish.available() && !used_banishes.has(banish.do));
}
;// CONCATENATED MODULE: ./src/engine/engine.ts
var engine_engine_templateObject, engine_templateObject2, engine_templateObject3, engine_templateObject4, engine_templateObject5, engine_templateObject6;

function engine_engine_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = engine_engine_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function engine_engine_toConsumableArray(arr) { return engine_engine_arrayWithoutHoles(arr) || engine_engine_iterableToArray(arr) || engine_engine_unsupportedIterableToArray(arr) || engine_engine_nonIterableSpread(); }

function engine_engine_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function engine_engine_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return engine_engine_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return engine_engine_arrayLikeToArray(o, minLen); }

function engine_engine_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function engine_engine_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return engine_engine_arrayLikeToArray(arr); }

function engine_engine_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function engine_engine_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function engine_engine_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function engine_engine_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function engine_engine_createClass(Constructor, protoProps, staticProps) { if (protoProps) engine_engine_defineProperties(Constructor.prototype, protoProps); if (staticProps) engine_engine_defineProperties(Constructor, staticProps); return Constructor; }

function engine_get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { engine_get = Reflect.get; } else { engine_get = function _get(target, property, receiver) { var base = engine_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return engine_get(target, property, receiver || target); }

function engine_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = engine_getPrototypeOf(object); if (object === null) break; } return object; }

function engine_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) engine_setPrototypeOf(subClass, superClass); }

function engine_setPrototypeOf(o, p) { engine_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return engine_setPrototypeOf(o, p); }

function engine_createSuper(Derived) { var hasNativeReflectConstruct = engine_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = engine_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = engine_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return engine_possibleConstructorReturn(this, result); }; }

function engine_possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return engine_assertThisInitialized(self); }

function engine_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function engine_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function engine_getPrototypeOf(o) { engine_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return engine_getPrototypeOf(o); }

function engine_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var engine_grimoireCCS = "grimoire_macro";
var engine_Engine = /*#__PURE__*/function (_BaseEngine) {
  engine_inherits(Engine, _BaseEngine);

  var _super = engine_createSuper(Engine);

  function Engine(tasks) {
    var _this;

    engine_engine_classCallCheck(this, Engine);

    _this = _super.call(this, tasks, {
      combat_defaults: new MyActionDefaults()
    });

    engine_defineProperty(engine_assertThisInitialized(_this), "cachedCss", "");

    return _this;
  }

  engine_engine_createClass(Engine, [{
    key: "execute",
    value: function execute(task) {
      var beaten_turns = (0,external_kolmafia_namespaceObject.haveEffect)($effect(engine_engine_templateObject || (engine_engine_templateObject = engine_engine_taggedTemplateLiteral(["Beaten Up"]))));
      var start_advs = (0,external_kolmafia_namespaceObject.myAdventures)();

      engine_get(engine_getPrototypeOf(Engine.prototype), "execute", this).call(this, task); // Crash if we unexpectedly lost the fight


      if (have($effect(engine_templateObject2 || (engine_templateObject2 = engine_engine_taggedTemplateLiteral(["Beaten Up"])))) && (0,external_kolmafia_namespaceObject.haveEffect)($effect(engine_templateObject3 || (engine_templateObject3 = engine_engine_taggedTemplateLiteral(["Beaten Up"])))) <= 3) {
        // Poetic Justice gives 5
        if ((0,external_kolmafia_namespaceObject.haveEffect)($effect(engine_templateObject4 || (engine_templateObject4 = engine_engine_taggedTemplateLiteral(["Beaten Up"])))) > beaten_turns || (0,external_kolmafia_namespaceObject.haveEffect)($effect(engine_templateObject5 || (engine_templateObject5 = engine_engine_taggedTemplateLiteral(["Beaten Up"])))) === beaten_turns && (0,external_kolmafia_namespaceObject.myAdventures)() < start_advs // Turns of beaten-up was constant but adventures went down, so we lost fight while already beaten up
        ) throw "Fight was lost (debug info: ".concat(beaten_turns, " => ").concat((0,external_kolmafia_namespaceObject.haveEffect)($effect(engine_templateObject6 || (engine_templateObject6 = engine_engine_taggedTemplateLiteral(["Beaten Up"])))), ", (").concat(start_advs, " => ").concat((0,external_kolmafia_namespaceObject.myAdventures)(), "); stop.");
      }
    }
  }, {
    key: "setCombat",
    value: function setCombat(task, task_combat, task_resources) {
      var _this$options;

      // Save regular combat macro
      var macro = task_combat.compile(task_resources, (_this$options = this.options) === null || _this$options === void 0 ? void 0 : _this$options.combat_defaults, task.do instanceof external_kolmafia_namespaceObject.Location ? task.do : undefined);

      if (macro.toString() !== this.cachedCss) {
        // Use the macro through a CCS file
        this.cachedCss = macro.toString();
        (0,external_kolmafia_namespaceObject.writeCcs)("[ default ]\n\"".concat(macro.toString(), "\""), engine_grimoireCCS);
        (0,external_kolmafia_namespaceObject.cliExecute)("ccs ".concat(engine_grimoireCCS)); // force Mafia to reparse the ccs
      } // Save autoattack combat macro


      var autoattack = task_combat.compileAutoattack().step(macro);

      if (autoattack.toString().length > 1) {
        autoattack.save();
        autoattack.setAutoAttack();
      } else {
        (0,external_kolmafia_namespaceObject.setAutoAttack)(0);
      }
    }
  }, {
    key: "customize",
    value: function customize(task, outfit, combat, resources) {
      // Set up a banish if needed
      var banishSources = unusedBanishes(combat.where("banish"));
      if (combat.can("banish")) resources.provide("banish", equipFirst(outfit, banishSources));

      var alreadyBanished = engine_engine_toConsumableArray(getBanishedMonsters().values());

      var _iterator = engine_engine_createForOfIteratorHelper(alreadyBanished),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var monster = _step.value;
          var strategy = combat.currentStrategy(monster);
          if (strategy === "banish") combat.macro(Macro.runaway(), monster);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "initPropertiesManager",
    value: function initPropertiesManager(manager) {
      // Properties adapted from garbo
      manager.set({
        logPreferenceChange: true,
        logPreferenceChangeFilter: engine_engine_toConsumableArray(new Set([].concat(engine_engine_toConsumableArray(property_get("logPreferenceChangeFilter").split(",")), ["libram_savedMacro", "maximizerMRUList", "testudinalTeachings", "_lastCombatStarted"]))).sort().filter(a => a).join(","),
        battleAction: "custom combat script",
        autoSatisfyWithMall: true,
        autoSatisfyWithNPCs: true,
        autoSatisfyWithCoinmasters: true,
        autoSatisfyWithStash: false,
        dontStopForCounters: true,
        maximizerFoldables: true,
        afterAdventureScript: "",
        betweenBattleScript: "",
        choiceAdventureScript: "",
        familiarScript: "",
        currentMood: "apathetic",
        autoTuxedo: true,
        autoPinkyRing: true,
        autoGarish: true,
        allowNonMoodBurning: false,
        allowSummonBurning: true,
        libramSkillsSoftcore: "none"
      });

      if (this.options.ccs !== "") {
        var _this$options$ccs;

        if (this.options.ccs === undefined && (0,external_kolmafia_namespaceObject.readCcs)(engine_grimoireCCS) === "") {
          // Write a simple CCS so we can switch to it
          (0,external_kolmafia_namespaceObject.writeCcs)("[ default ]\nabort", engine_grimoireCCS);
        }

        manager.set({
          customCombatScript: (_this$options$ccs = this.options.ccs) !== null && _this$options$ccs !== void 0 ? _this$options$ccs : engine_grimoireCCS
        });
      }
    }
  }, {
    key: "destruct",
    value: function destruct() {
      engine_get(engine_getPrototypeOf(Engine.prototype), "destruct", this).call(this);

      (0,external_kolmafia_namespaceObject.setAutoAttack)(0);
    }
  }]);

  return Engine;
}(Engine);
;// CONCATENATED MODULE: ./node_modules/libram/dist/resources/2012/ReagnimatedGnome.js
var ReagnimatedGnome_templateObject, ReagnimatedGnome_templateObject2, ReagnimatedGnome_templateObject3, ReagnimatedGnome_templateObject4, ReagnimatedGnome_templateObject5, ReagnimatedGnome_templateObject6;

function ReagnimatedGnome_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




function ReagnimatedGnome_have() {
  return have(template_string_$familiar(ReagnimatedGnome_templateObject || (ReagnimatedGnome_templateObject = ReagnimatedGnome_taggedTemplateLiteral(["Reagnimated Gnome"]))));
}
var bodyParts = {
  ears: template_string_$item(ReagnimatedGnome_templateObject2 || (ReagnimatedGnome_templateObject2 = ReagnimatedGnome_taggedTemplateLiteral(["gnomish swimmer's ears"]))),
  lung: template_string_$item(ReagnimatedGnome_templateObject3 || (ReagnimatedGnome_templateObject3 = ReagnimatedGnome_taggedTemplateLiteral(["gnomish coal miner's lung"]))),
  elbow: template_string_$item(ReagnimatedGnome_templateObject4 || (ReagnimatedGnome_templateObject4 = ReagnimatedGnome_taggedTemplateLiteral(["gnomish tennis elbow"]))),
  kgnee: template_string_$item(ReagnimatedGnome_templateObject5 || (ReagnimatedGnome_templateObject5 = ReagnimatedGnome_taggedTemplateLiteral(["gnomish housemaid's kgnee"]))),
  foot: template_string_$item(ReagnimatedGnome_templateObject6 || (ReagnimatedGnome_templateObject6 = ReagnimatedGnome_taggedTemplateLiteral(["gnomish athlete's foot"])))
};
function chosenParts() {
  return Object.values(bodyParts).filter(part => have(part));
}
function choosePart(part) {
  if (!ReagnimatedGnome_have()) return false;
  if (have(bodyParts[part])) return true;
  (0,external_kolmafia_namespaceObject.visitUrl)("arena.php");
  (0,external_kolmafia_namespaceObject.runChoice)(4);
  return chosenParts().includes(bodyParts[part]);
}
function expectedAdvsPerCombat(weight) {
  return Math.min(0.01 + weight / 1000 * 0.99, 1);
}
;// CONCATENATED MODULE: ./node_modules/libram/dist/modifierTypes.js
// THIS FILE IS AUTOMATICALLY GENERATED. See tools/parseModifiers.ts for more information
var booleanModifiers = ["Softcore Only", "Single Equip", "Never Fumble", "Weakens Monster", "Free Pull", "Variable", "Nonstackable Watch", "Cold Immunity", "Hot Immunity", "Sleaze Immunity", "Spooky Immunity", "Stench Immunity", "Cold Vulnerability", "Hot Vulnerability", "Sleaze Vulnerability", "Spooky Vulnerability", "Stench Vulnerability", "Moxie Controls MP", "Moxie May Control MP", "Four Songs", "Adventure Underwater", "Underwater Familiar", "Generic", "Unarmed", "No Pull", "Lasts Until Rollover", "Attacks Can't Miss", "Pirate", "Breakable", "Drops Items", "Drops Meat"];
var classModifiers = ["Class"];
var numericModifiers = ["Familiar Weight", "Monster Level", "Combat Rate", "Initiative", "Experience", "Item Drop", "Meat Drop", "Damage Absorption", "Damage Reduction", "Cold Resistance", "Hot Resistance", "Sleaze Resistance", "Spooky Resistance", "Stench Resistance", "Mana Cost", "Moxie", "Moxie Percent", "Muscle", "Muscle Percent", "Mysticality", "Mysticality Percent", "Maximum HP", "Maximum HP Percent", "Maximum MP", "Maximum MP Percent", "Weapon Damage", "Ranged Damage", "Spell Damage", "Spell Damage Percent", "Cold Damage", "Hot Damage", "Sleaze Damage", "Spooky Damage", "Stench Damage", "Cold Spell Damage", "Hot Spell Damage", "Sleaze Spell Damage", "Spooky Spell Damage", "Stench Spell Damage", "Underwater Combat Rate", "Fumble", "HP Regen Min", "HP Regen Max", "MP Regen Min", "MP Regen Max", "Adventures", "Familiar Weight Percent", "Weapon Damage Percent", "Ranged Damage Percent", "Stackable Mana Cost", "Hobo Power", "Base Resting HP", "Resting HP Percent", "Bonus Resting HP", "Base Resting MP", "Resting MP Percent", "Bonus Resting MP", "Critical Hit Percent", "PvP Fights", "Volleyball", "Sombrero", "Leprechaun", "Fairy", "Meat Drop Penalty", "Hidden Familiar Weight", "Item Drop Penalty", "Initiative Penalty", "Food Drop", "Booze Drop", "Hat Drop", "Weapon Drop", "Offhand Drop", "Shirt Drop", "Pants Drop", "Accessory Drop", "Volleyball Effectiveness", "Sombrero Effectiveness", "Leprechaun Effectiveness", "Fairy Effectiveness", "Familiar Weight Cap", "Slime Resistance", "Slime Hates It", "Spell Critical Percent", "Muscle Experience", "Mysticality Experience", "Moxie Experience", "Effect Duration", "Candy Drop", "DB Combat Damage", "Sombrero Bonus", "Familiar Experience", "Sporadic Meat Drop", "Sporadic Item Drop", "Meat Bonus", "Pickpocket Chance", "Combat Mana Cost", "Muscle Experience Percent", "Mysticality Experience Percent", "Moxie Experience Percent", "Minstrel Level", "Muscle Limit", "Mysticality Limit", "Moxie Limit", "Song Duration", "Prismatic Damage", "Smithsness", "Supercold Resistance", "Reduce Enemy Defense", "Pool Skill", "Surgeonosity", "Familiar Damage", "Gear Drop", "Maximum Hooch", "Water Level", "Crimbot Outfit Power", "Familiar Tuning Muscle", "Familiar Tuning Mysticality", "Familiar Tuning Moxie", "Random Monster Modifiers", "Luck", "Othello Skill", "Disco Style", "Rollover Effect Duration", "Sixgun Damage", "Fishing Skill", "Additional Song", "Sprinkle Drop", "Absorb Adventures", "Absorb Stats", "Rubee Drop", "Kruegerand Drop", "WarBear Armor Penetration", "Clowniness", "Maximum PP", "Plumber Power", "Drippy Damage", "Drippy Resistance", "Energy", "Scrap", "Familiar Action Bonus", "Water"];
var effectModifiers = ["Effect", "Rollover Effect"];
var monsterModifiers = ["Avatar"];
var skillModifiers = ["Skill"];
var statModifiers = ["Plumber Stat"];
var stringModifiers = ["Intrinsic Effect", "Equalize", "Wiki Name", "Modifiers", "Outfit", "Stat Tuning", "Equips On", "Familiar Effect", "Jiggle", "Equalize Muscle", "Equalize Mysticality", "Equalize Moxie", "Floor Buffed Muscle", "Floor Buffed Mysticality", "Floor Buffed Moxie"];
;// CONCATENATED MODULE: ./node_modules/libram/dist/modifier.js
function modifier_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function modifier_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { modifier_ownKeys(Object(source), true).forEach(function (key) { modifier_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { modifier_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function modifier_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





function modifier_get(name, subject) {
  if (arrayContains(name, booleanModifiers)) {
    return subject === undefined ? (0,external_kolmafia_namespaceObject.booleanModifier)(name) : (0,external_kolmafia_namespaceObject.booleanModifier)(subject, name);
  }

  if (arrayContains(name, classModifiers)) {
    return (0,external_kolmafia_namespaceObject.classModifier)(subject, name);
  }

  if (arrayContains(name, effectModifiers)) {
    return (0,external_kolmafia_namespaceObject.effectModifier)(subject, name);
  }

  if (arrayContains(name, monsterModifiers)) {
    return (0,external_kolmafia_namespaceObject.monsterModifier)(subject, name);
  }

  if (arrayContains(name, numericModifiers)) {
    return subject === undefined ? (0,external_kolmafia_namespaceObject.numericModifier)(name) : (0,external_kolmafia_namespaceObject.numericModifier)(subject, name);
  }

  if (arrayContains(name, skillModifiers)) {
    return (0,external_kolmafia_namespaceObject.skillModifier)(subject, name);
  }

  if (arrayContains(name, stringModifiers)) {
    return subject === undefined ? (0,external_kolmafia_namespaceObject.stringModifier)(name) : (0,external_kolmafia_namespaceObject.stringModifier)(subject, name);
  }

  if (arrayContains(name, statModifiers)) {
    return (0,external_kolmafia_namespaceObject.statModifier)(subject, name);
  }
}
/**
 * Merge two Modifiers objects into one, summing all numeric modifiers, ||ing all boolean modifiers, and otherwise letting the second object overwrite the first.
 * @param modifiers1 Modifiers objects to be merged onto.
 * @param modifiers2 Modifiers object to merge.
 * @returns A single Modifiers object obtained by merging.
 */

function pairwiseMerge(modifiers1, modifiers2) {
  var returnValue = modifier_objectSpread(modifier_objectSpread({}, modifiers1), modifiers2);

  for (var modifier in modifiers1) {
    if (Array.from(Object.values(modifiers2)).includes(modifier)) {
      if (arrayContains(modifier, numericModifiers)) {
        var _modifiers1$modifier, _modifiers2$modifier;

        returnValue[modifier] = ((_modifiers1$modifier = modifiers1[modifier]) !== null && _modifiers1$modifier !== void 0 ? _modifiers1$modifier : 0) + ((_modifiers2$modifier = modifiers2[modifier]) !== null && _modifiers2$modifier !== void 0 ? _modifiers2$modifier : 0);
      }

      if (arrayContains(modifier, booleanModifiers)) {
        var _modifiers1$modifier2, _modifiers2$modifier2;

        returnValue[modifier] = ((_modifiers1$modifier2 = modifiers1[modifier]) !== null && _modifiers1$modifier2 !== void 0 ? _modifiers1$modifier2 : false) || ((_modifiers2$modifier2 = modifiers2[modifier]) !== null && _modifiers2$modifier2 !== void 0 ? _modifiers2$modifier2 : false);
      }
    }
  }

  return returnValue;
}
/**
 * Merge arbitrarily many Modifiers objects into one, summing all numeric modifiers, and ||ing all boolean modifiers.
 * @param modifierss Modifiers objects to be merged together.
 * @returns A single Modifiers object obtained by merging.
 */


function mergeModifiers() {
  for (var _len = arguments.length, modifierss = new Array(_len), _key = 0; _key < _len; _key++) {
    modifierss[_key] = arguments[_key];
  }

  return modifierss.reduce((a, b) => pairwiseMerge(a, b), {});
}
;// CONCATENATED MODULE: ./src/calculator.ts
var calculator_templateObject, calculator_templateObject2, calculator_templateObject3, calculator_templateObject4, calculator_templateObject5, calculator_templateObject6, calculator_templateObject7;

function calculator_toConsumableArray(arr) { return calculator_arrayWithoutHoles(arr) || calculator_iterableToArray(arr) || calculator_unsupportedIterableToArray(arr) || calculator_nonIterableSpread(); }

function calculator_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function calculator_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return calculator_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return calculator_arrayLikeToArray(o, minLen); }

function calculator_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function calculator_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return calculator_arrayLikeToArray(arr); }

function calculator_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function calculator_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function calculator_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function calculator_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function calculator_createClass(Constructor, protoProps, staticProps) { if (protoProps) calculator_defineProperties(Constructor.prototype, protoProps); if (staticProps) calculator_defineProperties(Constructor, staticProps); return Constructor; }

function calculator_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var Calculator = /*#__PURE__*/function () {
  /**
   * Create the calculator.
   * @param outfit Outfit to use for evaluating combat results. The modifier values from items equipped to the outfit are not taken into account.
   * @param famWeight Value of familiar weight modifier.
   * @param itemDrop Value of item drop modifier.
   */
  function Calculator(outfit, famWeight, itemDrop) {
    calculator_classCallCheck(this, Calculator);

    calculator_defineProperty(this, "outfit", void 0);

    calculator_defineProperty(this, "famWeight", void 0);

    calculator_defineProperty(this, "itemDrop", void 0);

    this.outfit = outfit;
    this.famWeight = famWeight;
    this.itemDrop = itemDrop;
  }
  /**
   * @returns Whether the outfit has the ability to pickpocket.
   */


  calculator_createClass(Calculator, [{
    key: "canPickpocket",
    value: function canPickpocket() {
      return $classes(calculator_templateObject || (calculator_templateObject = calculator_taggedTemplateLiteral(["Disco Bandit, Accordion Thief"]))).includes((0,external_kolmafia_namespaceObject.myClass)()) || [template_string_$item(calculator_templateObject2 || (calculator_templateObject2 = calculator_taggedTemplateLiteral(["mime army infiltration glove"]))), template_string_$item(calculator_templateObject3 || (calculator_templateObject3 = calculator_taggedTemplateLiteral(["tiny black hole"])))].some(item => this.outfit.haveEquipped(item));
    }
    /**
     * @returns Whether the outfit has the ability to use navel runaways.
     */

  }, {
    key: "canNavelRunaway",
    value: function canNavelRunaway() {
      return [template_string_$item(calculator_templateObject4 || (calculator_templateObject4 = calculator_taggedTemplateLiteral(["Greatest American Pants"]))), template_string_$item(calculator_templateObject5 || (calculator_templateObject5 = calculator_taggedTemplateLiteral(["navel ring of navel gazing"])))].some(item => this.outfit.haveEquipped(item));
    }
    /**
     * @returns The total item bonus from item drop modifier and a fairy-like familiar.
     */

  }, {
    key: "itemBonus",
    value: function itemBonus() {
      var _this$outfit$familiar;

      var fairyMult = findFairyMultiplier((_this$outfit$familiar = this.outfit.familiar) !== null && _this$outfit$familiar !== void 0 ? _this$outfit$familiar : external_kolmafia_namespaceObject.Familiar.none);
      var fairyBonus = Math.max(Math.sqrt(55 * fairyMult * this.famWeight) + fairyMult * this.famWeight - 3, 0);
      return this.itemDrop + fairyBonus;
    }
    /**
     * @returns The expected number of adventures gained from a turn-taking combat.
     */

  }, {
    key: "advsGainedPerTurnTakingCombat",
    value: function advsGainedPerTurnTakingCombat() {
      var gnome = this.outfit.haveEquipped(template_string_$item(calculator_templateObject6 || (calculator_templateObject6 = calculator_taggedTemplateLiteral(["gnomish housemaid's kgnee"])))) ? expectedAdvsPerCombat(this.famWeight) : 0;
      var ring = this.outfit.haveEquipped(template_string_$item(calculator_templateObject7 || (calculator_templateObject7 = calculator_taggedTemplateLiteral(["mafia thumb ring"])))) ? 0.04 : 0;
      return gnome + ring;
    }
    /**
     * @returns The expected number of duffel bags or van keys gained per net adventure spent.
     */

  }, {
    key: "bagsGainedPerAdv",
    value: function bagsGainedPerAdv() {
      var pickpocketChance = this.canPickpocket() ? 0.25 : 0;
      var runawayChance = this.canNavelRunaway() ? 0.2 : 0;
      var a = this.advsGainedPerTurnTakingCombat(); // bags obtained from combat with a burnout or jock

      var b = pickpocketChance / (1 - (runawayChance + (1 - runawayChance) * a)) + (1 - pickpocketChance) * Math.min(0.05 * (1 + this.itemBonus() / 100), 1) / (1 - a);
      return 6 / 7 * b + 1 / 7 * (2 / 5 * b + 3 / 5 * (runawayChance + (1 - runawayChance) * a) * b);
    }
    /**
     * @returns The value, in meat, of one unit of the familiar weight and item drop modifiers.
     */

  }, {
    key: "unitValue",
    value: function unitValue() {
      return {
        famWeight: (new Calculator(this.outfit, this.famWeight + 1, this.itemDrop).bagsGainedPerAdv() - this.bagsGainedPerAdv()) * args.bagvalue,
        itemDrop: (new Calculator(this.outfit, this.famWeight, this.itemDrop + 1).bagsGainedPerAdv() - this.bagsGainedPerAdv()) * args.bagvalue
      };
    }
  }], [{
    key: "baseline",
    value:
    /**
     * Create a calculator instance using what are considered "baseline" values: passives, buffs, outfit equips, and base familiar weight.
     * @param outfit The outfit to use. If not specified, this will use an outfit created from the current character state.
     * @returns A calculator instance that includes the modifier values of baseline sources.
     */
    function baseline(outfit) {
      var _outfit;

      outfit = (_outfit = outfit) !== null && _outfit !== void 0 ? _outfit : fromCurrent();
      var passives = external_kolmafia_namespaceObject.Skill.all().filter(skill => have(skill) && skill.passive);
      var buffs = external_kolmafia_namespaceObject.Skill.all().filter(skill => have(skill) && skill.buff && (0,external_kolmafia_namespaceObject.toEffect)(skill) !== external_kolmafia_namespaceObject.Effect.none).map(skill => (0,external_kolmafia_namespaceObject.toEffect)(skill));

      var equips = calculator_toConsumableArray(outfit.equips.values());

      var sources = [].concat(calculator_toConsumableArray(passives), calculator_toConsumableArray(buffs), calculator_toConsumableArray(equips));
      var famWeight = sources.reduce((a, b) => a + modifier_get("Familiar Weight", b), 0) + (outfit.familiar ? (0,external_kolmafia_namespaceObject.familiarWeight)(outfit.familiar) : 0);
      var itemDrop = sources.reduce((a, b) => a + modifier_get("Item Drop", b), 0);
      return new Calculator(outfit, famWeight, itemDrop);
    }
  }]);

  return Calculator;
}();
;// CONCATENATED MODULE: ./node_modules/libram/dist/resources/2013/Florist.js
function Florist_toConsumableArray(arr) { return Florist_arrayWithoutHoles(arr) || Florist_iterableToArray(arr) || Florist_unsupportedIterableToArray(arr) || Florist_nonIterableSpread(); }

function Florist_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function Florist_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return Florist_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Florist_arrayLikeToArray(o, minLen); }

function Florist_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function Florist_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return Florist_arrayLikeToArray(arr); }

function Florist_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function Florist_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Florist_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Florist_createClass(Constructor, protoProps, staticProps) { if (protoProps) Florist_defineProperties(Constructor.prototype, protoProps); if (staticProps) Florist_defineProperties(Constructor, staticProps); return Constructor; }

function Florist_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var Flower = /*#__PURE__*/function () {
  function Flower(name, id, environment, modifier) {
    var territorial = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    Florist_classCallCheck(this, Flower);

    Florist_defineProperty(this, "name", void 0);

    Florist_defineProperty(this, "id", void 0);

    Florist_defineProperty(this, "environment", void 0);

    Florist_defineProperty(this, "modifier", void 0);

    Florist_defineProperty(this, "territorial", void 0);

    this.name = name;
    this.id = id;
    this.environment = environment;
    this.modifier = modifier;
    this.territorial = territorial;
  }

  Florist_createClass(Flower, [{
    key: "isPlantedHere",
    value: function isPlantedHere() {
      var _Flower$plantNamesInZ;

      var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0,external_kolmafia_namespaceObject.myLocation)();
      var plantedHere = (_Flower$plantNamesInZ = Flower.plantNamesInZone(location)) === null || _Flower$plantNamesInZ === void 0 ? void 0 : _Flower$plantNamesInZ.includes(this.name);
      return plantedHere !== undefined && plantedHere;
    }
  }, {
    key: "available",
    value: function available() {
      var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0,external_kolmafia_namespaceObject.myLocation)();
      return this.environment === location.environment && !property_get("_floristPlantsUsed").includes(this.name) && !this.isPlantedHere(location);
    }
  }, {
    key: "dig",
    value: function dig() {
      if (!this.isPlantedHere()) return false;
      var flowers = Flower.plantNamesInZone();
      if (!flowers[2]) return false;
      var plantNumber = flowers.indexOf(this.name);
      Flower.visit();
      (0,external_kolmafia_namespaceObject.runChoice)(2, "plnti=".concat(plantNumber));
      return !this.isPlantedHere();
    }
  }, {
    key: "plant",
    value: function plant() {
      if (this.isPlantedHere()) return true;
      if (isFull()) return false;
      Flower.visit();
      (0,external_kolmafia_namespaceObject.runChoice)(1, "plant=".concat(this.id));
      return this.isPlantedHere();
    }
  }], [{
    key: "visit",
    value: function visit() {
      (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=forestvillage&action=fv_friar");
    }
  }, {
    key: "plantNamesInZone",
    value: function plantNamesInZone() {
      var _getFloristPlants$loc;

      var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0,external_kolmafia_namespaceObject.myLocation)();
      return (_getFloristPlants$loc = (0,external_kolmafia_namespaceObject.getFloristPlants)()[location.toString()]) !== null && _getFloristPlants$loc !== void 0 ? _getFloristPlants$loc : [];
    }
  }, {
    key: "plantsInZone",
    value: function plantsInZone() {
      var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0,external_kolmafia_namespaceObject.myLocation)();
      return this.plantNamesInZone(location).map(flowerName => toFlower(flowerName)).filter(flower => flower !== undefined);
    }
  }, {
    key: "modifiersInZone",
    value: function modifiersInZone() {
      var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0,external_kolmafia_namespaceObject.myLocation)();
      var plants = this.plantsInZone(location);
      if (!plants) return {};
      var modifiers = plants.map(plant => plant.modifier).map(modifier => typeof modifier === "string" ? {} : modifier);
      return mergeModifiers.apply(void 0, Florist_toConsumableArray(modifiers));
    }
  }]);

  return Flower;
}();

function Florist_have() {
  return (0,external_kolmafia_namespaceObject.floristAvailable)();
}

function toFlower(name) {
  return Florist_all.find(flower => name === flower.name);
}

function flowersIn(location) {
  var returnValue = [];
  Flower.plantNamesInZone(location).map(toFlower).forEach(flower => {
    if (flower) returnValue.push(flower);
  });
  return returnValue;
}
function flowersAvailableFor() {
  var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : myLocation();
  return Florist_all.filter(flower => flower.available(location));
}
function isFull() {
  var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0,external_kolmafia_namespaceObject.myLocation)();
  return flowersIn(location).length === 3;
}
var RabidDogwood = new Flower("Rabid Dogwood", 1, "outdoor", {
  "Monster Level": 30
}, true);
var Rutabeggar = new Flower("Rutabeggar", 2, "outdoor", {
  "Item Drop": 25
}, true);
var RadishRadish = new Flower("Rad-ish Radish", 3, "outdoor", {
  "Moxie Experience": 5
}, true);
var Artichoker = new Flower("Artichoker", 4, "outdoor", "Delevels Enemy");
var SmokeRa = new Flower("Smoke-ra", 5, "outdoor", "Blocks Attacks");
var SkunkCabbage = new Flower("Skunk Cabbage", 6, "outdoor", {
  "Stench Damage": 12.5
});
var DeadlyCinnamon = new Flower("Deadly Cinnamon", 7, "outdoor", {
  "Hot Damage": 12.5
});
var CeleryStalker = new Flower("Celery Stalker", 8, "outdoor", {
  "Spooky Damage": 12.5
});
var LettuceSpray = new Flower("Lettus Spray", 9, "outdoor", {
  "HP Regen Min": 10,
  "HP Regen Max": 29
});
var SeltzerWatercress = new Flower("Seltzer Watercress", 10, "outdoor", {
  "MP Regen Min": 5,
  "MP Regen Max": 15
});
var WarLily = new Flower("War Lily", 11, "indoor", {
  "Monster Level": 30
}, true);
var StealingMagnolia = new Flower("Stealing Magnolia", 12, "indoor", {
  "Item Drop": 25
}, true);
var CannedSpinach = new Flower("Canned Spinach", 13, "indoor", {
  "Muscle Experience": 5
}, true);
var Impatiens = new Flower("Impatiens", 14, "indoor", {
  Initiative: 25
});
var SpiderPlant = new Flower("Spider Plant", 15, "indoor", "Poison");
var RedFern = new Flower("Red Fern", 16, "indoor", "Delevels Enemy");
var BamBoo = new Flower("BamBOO!", 17, "indoor", {
  "Spooky Damage": 12.5
});
var ArcticMoss = new Flower("Arctic Moss", 18, "indoor", {
  "Cold Damage": 12.5
});
var AloeGuvnor = new Flower("Aloe Guv'nor", 19, "indoor", {
  "HP Regen Min": 10,
  "HP Regen Max": 30
});
var PitcherPlant = new Flower("Pitcher Plant", 20, "indoor", {
  "MP Regen Min": 5,
  "MP Regen Max": 15
});
var BlusteryPuffball = new Flower("Blustery Puffball", 21, "underground", {
  "Monster Level": 30
}, true);
var HornOfPlenty = new Flower("Horn of Plenty", 22, "underground", {
  "Item Drop": 25
}, true);
var WizardsWig = new Flower("Wizard's Wig", 23, "underground", {
  "Mysticality Experience": 5
}, true);
var ShuffleTruffle = new Flower("Shuffle Truffle", 24, "underground", {
  Initiative: 25
});
var DisLichen = new Flower("Dis Lichen", 25, "underground", "Delevels Enemy");
var LooseMorels = new Flower("Loose Morels", 26, "underground", {
  "Sleaze Damage": 12.5
});
var FoulToadstool = new Flower("Foul Toadstool", 27, "underground", {
  "Stench Damage": 12.5
});
var Chillterelle = new Flower("Chillterelle", 28, "underground", {
  "Cold Damage": 12.5
});
var Portlybella = new Flower("Portlybella", 29, "underground", {
  "HP Regen Min": 10,
  "HP Regen Max": 30
});
var MaxHeadshroom = new Flower("Max Headshroom", 30, "underground", {
  "MP Regen Min": 5,
  "MP Regen Max": 15
});
var Spankton = new Flower("Spankton", 31, "underwater", "Delevels Enemy", true);
var Kelptomaniac = new Flower("Kelptomaniac", 32, "underwater", {
  "Item Drop": 40
}, true);
var Crookweed = new Flower("Crookweed", 33, "underwater", {
  "Meat Drop": 60
}, true);
var ElectricEelgrass = new Flower("Electric Eelgrass", 34, "underwater", "Blocks Attacks");
var Duckweed = new Flower("Duckweed", 35, "underwater", "Blocks Attacks");
var OrcaOrchid = new Flower("Orca Orchid", 36, "underwater", {
  "Weapon Damage": 12.5
});
var Sargassum = new Flower("Sargassum", 37, "underwater", {
  "Stench Damage": 12.5
});
var SubSeaRose = new Flower("Sub-Sea Rose", 38, "underwater", {
  "Cold Damage": 12.5
});
var Snori = new Flower("Snori", 39, "underwater", {
  "HP Regen Min": 20,
  "HP Regen Max": 30,
  "MP Regen Min": 10,
  "MP Regen Max": 20
});
var UpSeaDaisy = new Flower("Up Sea Daisy", 40, "underwater", {
  Experience: 30
});
var Florist_all = Object.freeze([RabidDogwood, Rutabeggar, RadishRadish, Artichoker, SmokeRa, SkunkCabbage, DeadlyCinnamon, CeleryStalker, LettuceSpray, SeltzerWatercress, WarLily, StealingMagnolia, CannedSpinach, Impatiens, SpiderPlant, RedFern, BamBoo, ArcticMoss, AloeGuvnor, PitcherPlant, BlusteryPuffball, HornOfPlenty, WizardsWig, ShuffleTruffle, DisLichen, LooseMorels, FoulToadstool, Chillterelle, Portlybella, MaxHeadshroom, Spankton, Kelptomaniac, Crookweed, ElectricEelgrass, Duckweed, OrcaOrchid, Sargassum, SubSeaRose, Snori, UpSeaDaisy]);
;// CONCATENATED MODULE: ./node_modules/libram/dist/resources/2022/AutumnAton.js


var item = external_kolmafia_namespaceObject.Item.get("autumn-aton");
/**
 * Is the autumn-aton currently in your inventory, available to deploy?
 */

function available() {
  return (0,external_kolmafia_namespaceObject.availableAmount)(item) > 0;
}
/**
 * Do you own the autumn-aton?
 */

function AutumnAton_have() {
  return get("hasAutumnaton") || available();
}

function checkLocations(html) {
  return (0,external_kolmafia_namespaceObject.xpath)(html, '//select[@name="heythereprogrammer"]//option[position()>1]/text()').map(name => (0,external_kolmafia_namespaceObject.toLocation)(name));
}

var use = () => (0,external_kolmafia_namespaceObject.visitUrl)("inv_use.php?pwd&whichitem=10954");
/**
 * @returns The current location the autumn-aton is questing in; null if it is not on a quest.
 */


function currentlyIn() {
  return property_get("autumnatonQuestLocation");
}
/**
 * Deploy the autumn-aton to a location of your choosing.
 * @param target A location to send the autumn-aton to, or a prioritized list of locations to send it to, or a function to pick which location to send it to.
 * @param upgrade Should we apply any upgrades we see available?
 * @returns Where we ended up sending the autumn-aton; null if we didn't send it off.
 */

function sendTo(target) {
  var upgrade = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  if (!available()) return null;
  var pageHtml = use();
  if (upgrade && (0,external_kolmafia_namespaceObject.availableChoiceOptions)()[1]) (0,external_kolmafia_namespaceObject.runChoice)(1);
  var locationsAvailable = checkLocations(pageHtml);
  var location = target instanceof external_kolmafia_namespaceObject.Location ? target : Array.isArray(target) ? target.find(l => locationsAvailable.includes(l)) : target(locationsAvailable);
  if (!location) return null;
  if (!locationsAvailable.includes(location)) return null;
  (0,external_kolmafia_namespaceObject.runChoice)(2, "heythereprogrammer=".concat(location.id));
  if ((0,external_kolmafia_namespaceObject.handlingChoice)()) (0,external_kolmafia_namespaceObject.visitUrl)("main.php");
  return location;
}
/**
 * Install any available upgrades for the autumn-aton.
 * @returns Whether there were any upgrades to install.
 */

function upgrade() {
  use();
  var canUpgrade = availableChoiceOptions()[1] !== undefined;
  if (canUpgrade) runChoice(1);
  visitUrl("main.php");
  return canUpgrade;
}
/**
 * @returns A list of all locations you can send your autumn-aton to right now. Empty if you are unable to send it anywhere.
 */

function availableLocations() {
  if (!available()) return [];
  var pageHtml = use();
  visitUrl("main.php");
  return checkLocations(pageHtml);
}
/**
 * The mafia names for the autumn-aton upgrades
 */

var possibleUpgrades = (/* unused pure expression or super */ null && (["leftarm1", "leftleg1", "rightarm1", "rightleg1", "base_blackhat", "cowcatcher", "periscope", "radardish", "dualexhaust"]));
/**
 * @returns An array containing the upgrades that you currently have on your autumn-aton.
 */

function currentUpgrades() {
  return get("autumnatonUpgrades").split(",");
}
/**
 * @returns The number of turns remaining in your current autumn-aton quest. This number may be negative for any number of reasons.
 */

function turnsLeft() {
  return get("autumnatonQuestTurn") - totalTurnsPlayed();
}
/**
 * @returns The number of turns we expect your next autumn-aton quest to take.
 */

function turnsForQuest() {
  return 11 * Math.max(1, get("_autumnatonQuests") - currentUpgrades().filter(u => u.includes("leg")).length);
}
/**
 * @returns The current visual acuity level of your autumn-aton as determined by the current upgrade-state.
 */

function visualAcuity() {
  var visualUpgrades = ["periscope", "radardish"];
  return 1 + currentUpgrades().filter(u => visualUpgrades.includes(u)).length;
}
/**
 * @returns The number of items from a zone we expect the autumn-aton to steal based on the current upgrade-state. It may not succeed in stealing every item it can.
 */

function zoneItems() {
  return 3 + currentUpgrades().filter(u => u.includes("arm")).length;
}
/**
 * @returns The number of seasonal items we expect the autumn-aton to return with given its current upgrade-state.
 */

function seasonalItems() {
  return currentUpgrades().includes("cowcatcher") ? 2 : 1;
}
;// CONCATENATED MODULE: ./src/outfit.ts
var src_outfit_templateObject, src_outfit_templateObject2, src_outfit_templateObject3, src_outfit_templateObject4, src_outfit_templateObject5, src_outfit_templateObject6, src_outfit_templateObject7, src_outfit_templateObject8, src_outfit_templateObject9, src_outfit_templateObject10, src_outfit_templateObject11, src_outfit_templateObject12, src_outfit_templateObject13, src_outfit_templateObject14, src_outfit_templateObject15, src_outfit_templateObject16, src_outfit_templateObject17, src_outfit_templateObject18;

function src_outfit_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }







function isSober() {
  return (0,external_kolmafia_namespaceObject.myInebriety)() <= (0,external_kolmafia_namespaceObject.inebrietyLimit)() - Number((0,external_kolmafia_namespaceObject.myFamiliar)() === template_string_$familiar(src_outfit_templateObject || (src_outfit_templateObject = src_outfit_taggedTemplateLiteral(["Stooper"]))));
}
function chooseFamiliar() {
  if (args.familiar !== undefined) return args.familiar;

  if (chosenParts().includes(template_string_$item(src_outfit_templateObject2 || (src_outfit_templateObject2 = src_outfit_taggedTemplateLiteral(["gnomish housemaid's kgnee"]))))) {
    return template_string_$familiar(src_outfit_templateObject3 || (src_outfit_templateObject3 = src_outfit_taggedTemplateLiteral(["Reagnimated Gnome"])));
  }

  var viableFairies = external_kolmafia_namespaceObject.Familiar.all().filter(f => have(f) && findFairyMultiplier(f) && f !== template_string_$familiar(src_outfit_templateObject4 || (src_outfit_templateObject4 = src_outfit_taggedTemplateLiteral(["Steam-Powered Cheerleader"]))) && !f.physicalDamage && !f.elementalDamage);
  var bestFairy = maxBy(viableFairies, findFairyMultiplier);
  return bestFairy;
}
function chooseOutfit() {
  var outfit = new Outfit();

  if (!isSober() && !outfit.equip(template_string_$item(src_outfit_templateObject5 || (src_outfit_templateObject5 = src_outfit_taggedTemplateLiteral(["Drunkula's wineglass"]))))) {
    throw "Unable to add Drunkula's wineglass to our outfit";
  }

  outfit.equip(chooseFamiliar());
  outfit.equip(template_string_$item(src_outfit_templateObject6 || (src_outfit_templateObject6 = src_outfit_taggedTemplateLiteral(["gnomish housemaid's kgnee"]))));

  if (args.outfit) {
    outfit.equip((0,external_kolmafia_namespaceObject.outfitPieces)(args.outfit));
    return outfit;
  }

  if (!$classes(src_outfit_templateObject7 || (src_outfit_templateObject7 = src_outfit_taggedTemplateLiteral(["Disco Bandit, Accordion Thief"]))).includes((0,external_kolmafia_namespaceObject.myClass)())) {
    outfit.equipFirst(template_string_$items(src_outfit_templateObject8 || (src_outfit_templateObject8 = src_outfit_taggedTemplateLiteral(["mime army infiltration glove, tiny black hole"]))));
  }

  outfit.equipFirst(template_string_$items(src_outfit_templateObject9 || (src_outfit_templateObject9 = src_outfit_taggedTemplateLiteral(["Greatest American Pants, navel ring of navel gazing"]))));

  if (!have($effect(src_outfit_templateObject10 || (src_outfit_templateObject10 = src_outfit_taggedTemplateLiteral(["Everything Looks Yellow"]))))) {
    outfit.equip(template_string_$item(src_outfit_templateObject11 || (src_outfit_templateObject11 = src_outfit_taggedTemplateLiteral(["Jurassic Parka"]))));
    outfit.setModes({
      parka: "dilophosaur"
    });
  }

  if (property_get("questPAGhost") === "unstarted" && property_get("nextParanormalActivity") <= (0,external_kolmafia_namespaceObject.totalTurnsPlayed)() && isSober()) {
    outfit.equip(template_string_$item(src_outfit_templateObject12 || (src_outfit_templateObject12 = src_outfit_taggedTemplateLiteral(["protonic accelerator pack"]))));
  }

  outfit.equip([template_string_$item(src_outfit_templateObject13 || (src_outfit_templateObject13 = src_outfit_taggedTemplateLiteral(["June cleaver"]))), template_string_$item(src_outfit_templateObject14 || (src_outfit_templateObject14 = src_outfit_taggedTemplateLiteral(["Fourth of May Cosplay Saber"])))], $slot(src_outfit_templateObject15 || (src_outfit_templateObject15 = src_outfit_taggedTemplateLiteral(["weapon"]))));
  outfit.equip(template_string_$item(src_outfit_templateObject16 || (src_outfit_templateObject16 = src_outfit_taggedTemplateLiteral(["carnivorous potted plant"]))));
  outfit.equip(template_string_$item(src_outfit_templateObject17 || (src_outfit_templateObject17 = src_outfit_taggedTemplateLiteral(["mafia thumb ring"]))));
  outfit.setModes({
    parka: "ghostasaurus"
  });
  var unitValue = Calculator.baseline(outfit).unitValue(); // Estimate value of modifiers

  outfit.equip({
    modifier: "".concat(unitValue.famWeight, "familiar weight ").concat(unitValue.itemDrop, "item drop"),
    avoid: [template_string_$item(src_outfit_templateObject18 || (src_outfit_templateObject18 = src_outfit_taggedTemplateLiteral(["time-twitching toolbelt"])))]
  });
  return outfit;
}
;// CONCATENATED MODULE: ./src/potions.ts
var potions_templateObject, potions_templateObject2, potions_templateObject3, potions_templateObject4, potions_templateObject5, potions_templateObject6, potions_templateObject7;

function potions_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function potions_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function potions_createClass(Constructor, protoProps, staticProps) { if (protoProps) potions_defineProperties(Constructor.prototype, protoProps); if (staticProps) potions_defineProperties(Constructor, staticProps); return Constructor; }

function potions_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function potions_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = potions_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function potions_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return potions_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return potions_arrayLikeToArray(o, minLen); }

function potions_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function potions_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }






var blacklist = [template_string_$item(potions_templateObject || (potions_templateObject = potions_taggedTemplateLiteral(["bottle of bubbles"])))];
var mutuallyExclusiveEffects = [$effects(potions_templateObject2 || (potions_templateObject2 = potions_taggedTemplateLiteral(["Blue Tongue, Green Tongue, Orange Tongue, Purple Tongue, Red Tongue, Black Tongue"]))), $effects(potions_templateObject3 || (potions_templateObject3 = potions_taggedTemplateLiteral(["Cupcake of Choice, The Cupcake of Wrath, Shiny Happy Cupcake, Your Cupcake Senses Are Tingling, Tiny Bubbles in the Cupcake"]))), $effects(potions_templateObject4 || (potions_templateObject4 = potions_taggedTemplateLiteral(["Broken Heart, Fiery Heart, Cold Hearted, Sweet Heart, Withered Heart, Lustful Heart"])))];
function getMutuallyExclusiveEffectsOf(effect) {
  var _iterator = potions_createForOfIteratorHelper(mutuallyExclusiveEffects),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var effectGroup = _step.value;

      if (effectGroup.includes(effect)) {
        return effectGroup.filter(ef => ef !== effect);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return [];
}
var Potion = /*#__PURE__*/function () {
  function Potion(item) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    potions_classCallCheck(this, Potion);

    potions_defineProperty(this, "item", void 0);

    potions_defineProperty(this, "overrideItemDrop", void 0);

    potions_defineProperty(this, "overrideEffectDuration", void 0);

    this.item = item;
    this.overrideItemDrop = options.itemDrop;
    this.overrideEffectDuration = options.effectDuration;
  }

  potions_createClass(Potion, [{
    key: "effect",
    value: function effect() {
      return (0,external_kolmafia_namespaceObject.effectModifier)(this.item, "Effect");
    }
  }, {
    key: "effectDuration",
    value: function effectDuration() {
      var _this$overrideEffectD;

      return (_this$overrideEffectD = this.overrideEffectDuration) !== null && _this$overrideEffectD !== void 0 ? _this$overrideEffectD : modifier_get("Effect Duration", this.item);
    }
  }, {
    key: "familiarWeight",
    value: function familiarWeight() {
      return modifier_get("Familiar Weight", this.effect());
    }
  }, {
    key: "itemDrop",
    value: function itemDrop() {
      var _this$overrideItemDro;

      (0,external_kolmafia_namespaceObject.setLocation)($location(potions_templateObject5 || (potions_templateObject5 = potions_taggedTemplateLiteral(["none"]))));
      return (_this$overrideItemDro = this.overrideItemDrop) !== null && _this$overrideItemDro !== void 0 ? _this$overrideItemDro : modifier_get("Item Drop", this.effect());
    }
  }, {
    key: "gross",
    value: function gross(unitValue, maxTurns) {
      var duration = Math.max(this.effectDuration(), maxTurns !== null && maxTurns !== void 0 ? maxTurns : 0);
      return (unitValue.famWeight * this.familiarWeight() + unitValue.itemDrop * this.itemDrop()) * duration;
    }
  }, {
    key: "price",
    value: function price() {
      return (0,external_kolmafia_namespaceObject.mallPrice)(this.item);
    }
  }, {
    key: "net",
    value: function net(unitValue) {
      return this.gross(unitValue) - this.price();
    }
  }]);

  return Potion;
}();
function farmingPotions() {
  return external_kolmafia_namespaceObject.Item.all().filter(item => item.tradeable && !blacklist.includes(item) && (0,external_kolmafia_namespaceObject.itemType)(item) === "potion").map(item => new Potion(item)).filter(potion => potion.familiarWeight() > 0 || potion.itemDrop() > 0);
}
function potionSetup(outfit) {
  var unitValue = Calculator.baseline(outfit).unitValue();
  var excludedEffects = new Set(getActiveEffects().map(effect => getMutuallyExclusiveEffectsOf(effect)).flat());
  var profitablePotions = farmingPotions().filter(potion => potion.net(unitValue) > 0).sort((a, b) => b.net(unitValue) - a.net(unitValue));

  var _iterator2 = potions_createForOfIteratorHelper(profitablePotions),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var potion = _step2.value;
      var effect = potion.effect();
      if (excludedEffects.has(effect)) continue;
      var desiredAmount = (turnsRemaining() - (0,external_kolmafia_namespaceObject.haveEffect)(effect)) / potion.effectDuration();
      var overageProfitable = desiredAmount % 1 * potion.gross(unitValue) - potion.price() > 0;
      var acquireAmount = Math.floor(desiredAmount) + (overageProfitable ? 1 : 0);
      if (acquireAmount <= 0) continue;
      acquire(acquireAmount, potion.item, potion.gross(unitValue));
      var useAmount = Math.min(acquireAmount, (0,external_kolmafia_namespaceObject.itemAmount)(potion.item));
      debug("Using ".concat(formatAmountOfItem(useAmount, potion.item)));
      (0,external_kolmafia_namespaceObject.use)(useAmount, potion.item);

      if (have(effect)) {
        var _iterator3 = potions_createForOfIteratorHelper(getMutuallyExclusiveEffectsOf(effect)),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var excluded = _step3.value;
            excludedEffects.add(excluded);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}
function bubbleVision() {
  if (!(0,external_kolmafia_namespaceObject.canInteract)() || have($effect(potions_templateObject6 || (potions_templateObject6 = potions_taggedTemplateLiteral(["Bubble Vision"]))))) return;
  var item = template_string_$item(potions_templateObject7 || (potions_templateObject7 = potions_taggedTemplateLiteral(["bottle of bubbles"])));
  var turns = Math.min(turnsRemaining(), modifier_get("Effect Duration", item));
  var averageItemDrop = turns / 2 * (2 + (turns - 1)); // Sum of arithmetic sequence where a = d = 1

  var potion = new Potion(item, {
    itemDrop: averageItemDrop,
    effectDuration: turns
  });
  var unitValue = Calculator.baseline().unitValue();

  if (potion.net(unitValue) > 0) {
    acquire(1, potion.item, potion.gross(unitValue));
    debug("Using ".concat(formatAmountOfItem(1, potion.item)));
    (0,external_kolmafia_namespaceObject.use)(1, potion.item);
  }
}
;// CONCATENATED MODULE: ./src/tasks/baggo.ts
var baggo_templateObject, baggo_templateObject2, baggo_templateObject3, baggo_templateObject4, baggo_templateObject5, baggo_templateObject6, baggo_templateObject7, baggo_templateObject8, baggo_templateObject9, baggo_templateObject10, baggo_templateObject11, baggo_templateObject12, baggo_templateObject13, baggo_templateObject14, baggo_templateObject15, baggo_templateObject16, baggo_templateObject17, baggo_templateObject18, baggo_templateObject19, baggo_templateObject20, baggo_templateObject21, baggo_templateObject22, baggo_templateObject23, baggo_templateObject24, baggo_templateObject25, baggo_templateObject26, baggo_templateObject27, baggo_templateObject28, baggo_templateObject29, baggo_templateObject30, baggo_templateObject31, baggo_templateObject32, baggo_templateObject33, baggo_templateObject34, baggo_templateObject35, baggo_templateObject36;

function baggo_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function baggo_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { baggo_ownKeys(Object(source), true).forEach(function (key) { baggo_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { baggo_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function baggo_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function baggo_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }








var floristFlowers = [StealingMagnolia, AloeGuvnor, PitcherPlant];
var potionsCompleted = false;
function BaggoQuest() {
  return {
    name: "Baggo",
    tasks: [{
      name: "Closet Massagers",
      completed: () => (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(baggo_templateObject || (baggo_templateObject = baggo_taggedTemplateLiteral(["personal massager"])))) === 0,
      do: () => (0,external_kolmafia_namespaceObject.putCloset)((0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(baggo_templateObject2 || (baggo_templateObject2 = baggo_taggedTemplateLiteral(["personal massager"])))), template_string_$item(baggo_templateObject3 || (baggo_templateObject3 = baggo_taggedTemplateLiteral(["personal massager"])))),
      limit: {
        tries: 1
      }
    }, {
      name: "Spice Ghost",
      ready: () => (0,external_kolmafia_namespaceObject.myClass)() === $class(baggo_templateObject4 || (baggo_templateObject4 = baggo_taggedTemplateLiteral(["Pastamancer"]))) && have($skill(baggo_templateObject5 || (baggo_templateObject5 = baggo_taggedTemplateLiteral(["Bind Spice Ghost"])))),
      completed: () => (0,external_kolmafia_namespaceObject.myThrall)() === $thrall(baggo_templateObject6 || (baggo_templateObject6 = baggo_taggedTemplateLiteral(["Spice Ghost"]))),
      do: () => (0,external_kolmafia_namespaceObject.useSkill)($skill(baggo_templateObject7 || (baggo_templateObject7 = baggo_taggedTemplateLiteral(["Bind Spice Ghost"])))),
      limit: {
        tries: 1
      }
    }, {
      name: "Florist Friar",
      ready: () => Florist_have() && (0,external_kolmafia_namespaceObject.myLocation)() === $location(baggo_templateObject8 || (baggo_templateObject8 = baggo_taggedTemplateLiteral(["The Neverending Party"]))),
      completed: () => isFull() || floristFlowers.every(flower => !flower.available()),
      do: () => floristFlowers.forEach(flower => flower.plant()),
      limit: {
        tries: 1
      }
    }, {
      name: "Autumn-Aton",
      ready: () => available(),
      completed: () => currentlyIn() !== null,
      do: () => sendTo($location(baggo_templateObject9 || (baggo_templateObject9 = baggo_taggedTemplateLiteral(["The Neverending Party"]))))
    }, {
      name: "Cold Medicine Cabinet",
      ready: () => (0,external_kolmafia_namespaceObject.getWorkshed)() === template_string_$item(baggo_templateObject10 || (baggo_templateObject10 = baggo_taggedTemplateLiteral(["cold medicine cabinet"]))) && property_get("_nextColdMedicineConsult") <= (0,external_kolmafia_namespaceObject.totalTurnsPlayed)() && (0,external_kolmafia_namespaceObject.expectedColdMedicineCabinet)()["pill"] === template_string_$item(baggo_templateObject11 || (baggo_templateObject11 = baggo_taggedTemplateLiteral(["Extrovermectin\u2122"]))),
      completed: () => property_get("_coldMedicineConsults") >= 5,
      do: () => {
        (0,external_kolmafia_namespaceObject.visitUrl)("campground.php?action=workshed");
        (0,external_kolmafia_namespaceObject.runChoice)(5);
      },
      limit: {
        tries: 5
      }
    }, {
      name: "Party Fair",
      completed: () => property_get("_questPartyFair") !== "unstarted",
      do: () => {
        (0,external_kolmafia_namespaceObject.visitUrl)((0,external_kolmafia_namespaceObject.toUrl)($location(baggo_templateObject12 || (baggo_templateObject12 = baggo_taggedTemplateLiteral(["The Neverending Party"])))));
        if (["food", "booze"].includes(property_get("_questPartyFairQuest"))) (0,external_kolmafia_namespaceObject.runChoice)(1);else (0,external_kolmafia_namespaceObject.runChoice)(2);
      },
      limit: {
        tries: 1
      }
    }, {
      name: "Proton Ghost",
      ready: () => have(template_string_$item(baggo_templateObject13 || (baggo_templateObject13 = baggo_taggedTemplateLiteral(["protonic accelerator pack"])))) && (0,external_kolmafia_namespaceObject.canAdventure)(property_get("ghostLocation", external_kolmafia_namespaceObject.Location.none)),
      completed: () => property_get("questPAGhost") === "unstarted",
      do: () => {
        var location = property_get("ghostLocation");

        if (location) {
          (0,external_kolmafia_namespaceObject.adv1)(location, 0, "");
        } else {
          throw "Could not determine ghost location";
        }
      },
      outfit: () => {
        return baggo_objectSpread(baggo_objectSpread({}, chooseOutfit().spec()), {}, {
          back: template_string_$item(baggo_templateObject14 || (baggo_templateObject14 = baggo_taggedTemplateLiteral(["protonic accelerator pack"])))
        });
      },
      combat: new combat_CombatStrategy().macro(Macro.trySkill($skill(baggo_templateObject15 || (baggo_templateObject15 = baggo_taggedTemplateLiteral(["Sing Along"])))).trySkill($skill(baggo_templateObject16 || (baggo_templateObject16 = baggo_taggedTemplateLiteral(["Summon Love Gnats"])))).trySkill($skill(baggo_templateObject17 || (baggo_templateObject17 = baggo_taggedTemplateLiteral(["Shoot Ghost"])))).trySkill($skill(baggo_templateObject18 || (baggo_templateObject18 = baggo_taggedTemplateLiteral(["Shoot Ghost"])))).trySkill($skill(baggo_templateObject19 || (baggo_templateObject19 = baggo_taggedTemplateLiteral(["Shoot Ghost"])))).trySkill($skill(baggo_templateObject20 || (baggo_templateObject20 = baggo_taggedTemplateLiteral(["Trap Ghost"])))))
    }, {
      name: "Potions",
      completed: () => !(0,external_kolmafia_namespaceObject.canInteract)() || potionsCompleted,
      do: potionSetup,
      post: () => {
        potionsCompleted = true;
      },
      outfit: chooseOutfit
    }, {
      name: "Collect Bags",
      after: ["Dailies/Kgnee", "Party Fair", "Potions"],
      completed: () => turnsRemaining() <= 0,
      prepare: bubbleVision,
      do: $location(baggo_templateObject21 || (baggo_templateObject21 = baggo_taggedTemplateLiteral(["The Neverending Party"]))),
      outfit: chooseOutfit,
      effects: [$skill(baggo_templateObject22 || (baggo_templateObject22 = baggo_taggedTemplateLiteral(["Blood Bond"]))), $skill(baggo_templateObject23 || (baggo_templateObject23 = baggo_taggedTemplateLiteral(["Leash of Linguini"]))), $skill(baggo_templateObject24 || (baggo_templateObject24 = baggo_taggedTemplateLiteral(["Empathy of the Newt"]))), $skill(baggo_templateObject25 || (baggo_templateObject25 = baggo_taggedTemplateLiteral(["The Spirit of Taking"]))), $skill(baggo_templateObject26 || (baggo_templateObject26 = baggo_taggedTemplateLiteral(["Fat Leon's Phat Loot Lyric"]))), $skill(baggo_templateObject27 || (baggo_templateObject27 = baggo_taggedTemplateLiteral(["Singer's Faithful Ocelot"]))), $skill(baggo_templateObject28 || (baggo_templateObject28 = baggo_taggedTemplateLiteral(["Astral Shell"]))), $skill(baggo_templateObject29 || (baggo_templateObject29 = baggo_taggedTemplateLiteral(["Ghostly Shell"])))].filter(skill => have(skill)).map(skill => (0,external_kolmafia_namespaceObject.toEffect)(skill)),
      choices: {
        1324: 5
      },
      combat: new combat_CombatStrategy().banish($monsters(baggo_templateObject30 || (baggo_templateObject30 = baggo_taggedTemplateLiteral(["biker, party girl, \"plain\" girl"])))).autoattack(Macro.externalIf(!gyou(), Macro.if_("!hppercentbelow 75", Macro.step("pickpocket")), Macro.step("pickpocket")).if_("match \"unremarkable duffel bag\" || match \"van key\"", Macro.runaway()) // TODO only runaway if we have a navel runaway, consider tatters/GOTOs
      .trySkill($skill(baggo_templateObject31 || (baggo_templateObject31 = baggo_taggedTemplateLiteral(["Spit jurassic acid"])))).trySkill($skill(baggo_templateObject32 || (baggo_templateObject32 = baggo_taggedTemplateLiteral(["Summon Love Gnats"])))).if_("!hppercentbelow 75 && !mpbelow 40", Macro.trySkill($skill(baggo_templateObject33 || (baggo_templateObject33 = baggo_taggedTemplateLiteral(["Double Nanovision"])))).trySkill($skill(baggo_templateObject34 || (baggo_templateObject34 = baggo_taggedTemplateLiteral(["Double Nanovision"]))))), $monsters(baggo_templateObject35 || (baggo_templateObject35 = baggo_taggedTemplateLiteral(["burnout, jock"])))).autoattack(() => {
        return args.olfact !== "none" ? Macro.if_(external_kolmafia_namespaceObject.Monster.get(args.olfact), Macro.trySkill($skill(baggo_templateObject36 || (baggo_templateObject36 = baggo_taggedTemplateLiteral(["Transcendent Olfaction"]))))) : new Macro();
      }).kill()
    }]
  };
}
// EXTERNAL MODULE: ./node_modules/lodash/isEqual.js
var isEqual = __webpack_require__(7120);
var isEqual_default = /*#__PURE__*/__webpack_require__.n(isEqual);
;// CONCATENATED MODULE: ./node_modules/libram/dist/Copier.js
function Copier_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Copier_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Copier = function Copier(couldCopy, prepare, canCopy, copiedMonster, fightCopy) {
  Copier_classCallCheck(this, Copier);

  Copier_defineProperty(this, "couldCopy", void 0);

  Copier_defineProperty(this, "prepare", void 0);

  Copier_defineProperty(this, "canCopy", void 0);

  Copier_defineProperty(this, "copiedMonster", void 0);

  Copier_defineProperty(this, "fightCopy", null);

  this.couldCopy = couldCopy;
  this.prepare = prepare;
  this.canCopy = canCopy;
  this.copiedMonster = copiedMonster;
  if (fightCopy) this.fightCopy = fightCopy;
};
;// CONCATENATED MODULE: ./node_modules/libram/dist/resources/2016/SourceTerminal.js
var SourceTerminal_templateObject, SourceTerminal_templateObject2, SourceTerminal_templateObject3, SourceTerminal_templateObject4, SourceTerminal_templateObject5, SourceTerminal_templateObject6, SourceTerminal_templateObject7, SourceTerminal_templateObject8, SourceTerminal_templateObject9, SourceTerminal_templateObject10, SourceTerminal_templateObject11, SourceTerminal_templateObject12, SourceTerminal_templateObject13, SourceTerminal_templateObject14, SourceTerminal_templateObject15, SourceTerminal_templateObject16, SourceTerminal_templateObject17, SourceTerminal_templateObject18, SourceTerminal_templateObject19, SourceTerminal_templateObject20, SourceTerminal_templateObject21, SourceTerminal_templateObject22, SourceTerminal_templateObject23, SourceTerminal_templateObject24, SourceTerminal_templateObject25, SourceTerminal_templateObject26, SourceTerminal_templateObject27;

function SourceTerminal_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = SourceTerminal_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function SourceTerminal_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return SourceTerminal_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return SourceTerminal_arrayLikeToArray(o, minLen); }

function SourceTerminal_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function SourceTerminal_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }








var SourceTerminal_item = template_string_$item(SourceTerminal_templateObject || (SourceTerminal_templateObject = SourceTerminal_taggedTemplateLiteral(["Source terminal"])));
function SourceTerminal_have() {
  return haveInCampground(SourceTerminal_item);
}
/**
 * Buffs that can be acquired from Enhance
 *
 * - Items: +30% Item Drop
 * - Meat: +60% Meat Drop
 * - Init: +50% Initiative
 * - Critical: +10% chance of Critical Hit, +10% chance of Spell Critical Hit
 * - Damage: +5 Prismatic Damage
 * - Substats: +3 Stats Per Fight
 */

var Buffs = {
  Items: $effect(SourceTerminal_templateObject2 || (SourceTerminal_templateObject2 = SourceTerminal_taggedTemplateLiteral(["items.enh"]))),
  Meat: $effect(SourceTerminal_templateObject3 || (SourceTerminal_templateObject3 = SourceTerminal_taggedTemplateLiteral(["meat.enh"]))),
  Init: $effect(SourceTerminal_templateObject4 || (SourceTerminal_templateObject4 = SourceTerminal_taggedTemplateLiteral(["init.enh"]))),
  Critical: $effect(SourceTerminal_templateObject5 || (SourceTerminal_templateObject5 = SourceTerminal_taggedTemplateLiteral(["critical.enh"]))),
  Damage: $effect(SourceTerminal_templateObject6 || (SourceTerminal_templateObject6 = SourceTerminal_taggedTemplateLiteral(["damage.enh"]))),
  Substats: $effect(SourceTerminal_templateObject7 || (SourceTerminal_templateObject7 = SourceTerminal_taggedTemplateLiteral(["substats.enh"])))
};
/**
 * Acquire a buff from the Source Terminal
 * @param buff The buff to acquire
 * @see Buffs
 */

function enhance(buff) {
  if (!Object.values(Buffs).includes(buff)) {
    return false;
  }

  return (0,external_kolmafia_namespaceObject.cliExecute)("terminal enhance ".concat(buff.name));
}
/**
 * Rollover buffs that can be acquired from Enquiry
 */

var RolloverBuffs = {
  /** +5 Familiar Weight */
  Familiar: $effect(SourceTerminal_templateObject8 || (SourceTerminal_templateObject8 = SourceTerminal_taggedTemplateLiteral(["familiar.enq"]))),

  /** +25 ML */
  Monsters: $effect(SourceTerminal_templateObject9 || (SourceTerminal_templateObject9 = SourceTerminal_taggedTemplateLiteral(["monsters.enq"]))),

  /** +5 Prismatic Resistance */
  Protect: $effect(SourceTerminal_templateObject10 || (SourceTerminal_templateObject10 = SourceTerminal_taggedTemplateLiteral(["protect.enq"]))),

  /** +100% Muscle, +100% Mysticality, +100% Moxie */
  Stats: $effect(SourceTerminal_templateObject11 || (SourceTerminal_templateObject11 = SourceTerminal_taggedTemplateLiteral(["stats.enq"])))
};
/**
 * Acquire a buff from the Source Terminal
 * @param buff The buff to acquire
 * @see RolloverBuffs
 */

function enquiry(rolloverBuff) {
  if (!Object.values(RolloverBuffs).includes(rolloverBuff)) {
    return false;
  }

  return cliExecute("terminal enquiry ".concat(rolloverBuff.name));
}
/**
 * Skills that can be acquired from Enhance
 */

var Skills = {
  /** Collect Source essence from enemies once per combat */
  Extract: $skill(SourceTerminal_templateObject12 || (SourceTerminal_templateObject12 = SourceTerminal_taggedTemplateLiteral(["Extract"]))),

  /** Stagger and create a wandering monster 1-3 times per day */
  Digitize: $skill(SourceTerminal_templateObject13 || (SourceTerminal_templateObject13 = SourceTerminal_taggedTemplateLiteral(["Digitize"]))),

  /** Stagger and deal 25% of enemy HP in damage once per combat */
  Compress: $skill(SourceTerminal_templateObject14 || (SourceTerminal_templateObject14 = SourceTerminal_taggedTemplateLiteral(["Compress"]))),

  /** Double monster's HP, attack, defence, attacks per round and item drops once per fight and once per day (five in The Source) */
  Duplicate: $skill(SourceTerminal_templateObject15 || (SourceTerminal_templateObject15 = SourceTerminal_taggedTemplateLiteral(["Duplicate"]))),

  /** Causes government agent/Source Agent wanderer next turn once per combat and three times per day */
  Portscan: $skill(SourceTerminal_templateObject16 || (SourceTerminal_templateObject16 = SourceTerminal_taggedTemplateLiteral(["Portscan"]))),

  /** Increase Max MP by 100% and recover 1000 MP once per combat with a 30 turn cooldown */
  Turbo: $skill(SourceTerminal_templateObject17 || (SourceTerminal_templateObject17 = SourceTerminal_taggedTemplateLiteral(["Turbo"])))
};
/**
 * Make a skill available.
 * The Source Terminal can give the player access to two skills at any time
 * @param skill Skill to learn
 * @see Skills
 */

function educate(skills) {
  var skillsArray = Array.isArray(skills) ? skills.slice(0, 2) : [skills];
  if (isEqual_default()(skillsArray, getSkills())) return true;

  var _iterator = SourceTerminal_createForOfIteratorHelper(skillsArray),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var skill = _step.value;
      if (!Object.values(Skills).includes(skill)) return false;
      (0,external_kolmafia_namespaceObject.cliExecute)("terminal educate ".concat(skill.name.toLowerCase(), ".edu"));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return true;
}
/**
 * Return the Skills currently available from Source Terminal
 */

function getSkills() {
  return ["sourceTerminalEducate1", "sourceTerminalEducate2"].map(p => property_get(p)).filter(s => s !== "").map(s => external_kolmafia_namespaceObject.Skill.get(s.slice(0, -4)));
}
function isCurrentSkill(skills) {
  var currentSkills = getSkills();
  var skillsArray = Array.isArray(skills) ? skills.slice(0, 2) : [skills];
  return skillsArray.every(skill => currentSkills.includes(skill));
}
/**
 * Items that can be generated by the Source Terminal
 */

var Items = new Map([[template_string_$item(SourceTerminal_templateObject18 || (SourceTerminal_templateObject18 = SourceTerminal_taggedTemplateLiteral(["browser cookie"]))), "food.ext"], [template_string_$item(SourceTerminal_templateObject19 || (SourceTerminal_templateObject19 = SourceTerminal_taggedTemplateLiteral(["hacked gibson"]))), "booze.ext"], [template_string_$item(SourceTerminal_templateObject20 || (SourceTerminal_templateObject20 = SourceTerminal_taggedTemplateLiteral(["Source shades"]))), "goggles.ext"], [template_string_$item(SourceTerminal_templateObject21 || (SourceTerminal_templateObject21 = SourceTerminal_taggedTemplateLiteral(["Source terminal GRAM chip"]))), "gram.ext"], [template_string_$item(SourceTerminal_templateObject22 || (SourceTerminal_templateObject22 = SourceTerminal_taggedTemplateLiteral(["Source terminal PRAM chip"]))), "pram.ext"], [template_string_$item(SourceTerminal_templateObject23 || (SourceTerminal_templateObject23 = SourceTerminal_taggedTemplateLiteral(["Source terminal SPAM chip"]))), "spam.ext"], [template_string_$item(SourceTerminal_templateObject24 || (SourceTerminal_templateObject24 = SourceTerminal_taggedTemplateLiteral(["Source terminal CRAM chip"]))), "cram.ext"], [template_string_$item(SourceTerminal_templateObject25 || (SourceTerminal_templateObject25 = SourceTerminal_taggedTemplateLiteral(["Source terminal DRAM chip"]))), "dram.ext"], [template_string_$item(SourceTerminal_templateObject26 || (SourceTerminal_templateObject26 = SourceTerminal_taggedTemplateLiteral(["Source terminal TRAM chip"]))), "tram.ext"], [template_string_$item(SourceTerminal_templateObject27 || (SourceTerminal_templateObject27 = SourceTerminal_taggedTemplateLiteral(["software bug"]))), "familiar.ext"]]);
/**
 * Collect an item from the Source Terminal (up to three times a day)
 * @param item Item to collect
 * @see Items
 */

function extrude(item) {
  var fileName = Items.get(item);
  if (!fileName) return false;
  return cliExecute("terminal extrude ".concat(fileName));
}
/**
 * Return chips currently installed to player's Source Terminal
 */

function getChips() {
  return property_get("sourceTerminalChips").split(",");
}
/**
 * Return number of times digitize was cast today
 */

function getDigitizeUses() {
  return property_get("_sourceTerminalDigitizeUses");
}
/**
 * Return Monster that is currently digitized, else null
 */

function getDigitizeMonster() {
  return property_get("_sourceTerminalDigitizeMonster");
}
/**
 * Return number of digitized monsters encountered since it was last cast
 */

function getDigitizeMonsterCount() {
  return get("_sourceTerminalDigitizeMonsterCount");
}
/**
 * Return maximum number of digitizes player can cast
 */

function getMaximumDigitizeUses() {
  var chips = getChips();
  return 1 + (chips.includes("TRAM") ? 1 : 0) + (chips.includes("TRIGRAM") ? 1 : 0);
}
/**
 * Returns the current day's number of remaining digitize uses
 */

function getDigitizeUsesRemaining() {
  return getMaximumDigitizeUses() - getDigitizeUses();
}
/**
 * Returns whether the player could theoretically cast Digitize
 */

function couldDigitize() {
  return getDigitizeUses() < getMaximumDigitizeUses();
}
function prepareDigitize() {
  if (!isCurrentSkill(Skills.Digitize)) {
    return educate(Skills.Digitize);
  }

  return true;
}
/**
 * Returns whether the player can cast Digitize immediately
 * This only considers whether the player has learned the skill
 * and has sufficient daily casts remaining, not whether they have sufficient MP
 */

function canDigitize() {
  return couldDigitize() && getSkills().includes(Skills.Digitize);
}
var Digitize = new Copier(() => couldDigitize(), () => prepareDigitize(), () => canDigitize(), () => getDigitizeMonster());
/**
 * Return number of times duplicate was cast today
 */

function getDuplicateUses() {
  return get("_sourceTerminalDuplicateUses");
}
/**
 * Return number of times enhance was cast today
 */

function getEnhanceUses() {
  return property_get("_sourceTerminalEnhanceUses");
}
/**
 * Return number of times portscan was cast today
 */

function getPortscanUses() {
  return get("_sourceTerminalPortscanUses");
}
/**
 * Returns maximum number of times duplicate can be used
 */

function maximumDuplicateUses() {
  return myPath() === Path.get("The Source") ? 5 : 1;
}
/**
 * Returns number of remaining times duplicate can be used today
 */

function duplicateUsesRemaining() {
  return maximumDuplicateUses() - getDuplicateUses();
}
/**
 * Return number of times enhance can be used per day
 */

function maximumEnhanceUses() {
  return 1 + getChips().filter(chip => ["CRAM", "SCRAM"].includes(chip)).length;
}
/**
 * Returns number of remaining times enahce can be used today
 */

function enhanceUsesRemaining() {
  return maximumEnhanceUses() - getEnhanceUses();
}
/**
 * Returns expected duration of an enhance buff
 */

function enhanceBuffDuration() {
  return 25 + get("sourceTerminalPram") * 5 + (getChips().includes("INGRAM") ? 25 : 0);
}
/**
 * Returns expected duration of an enquiry buff
 */

function enquiryBuffDuration() {
  return 50 + 10 * get("sourceTerminalGram") + (getChips().includes("DIAGRAM") ? 50 : 0);
}
;// CONCATENATED MODULE: ./node_modules/libram/dist/resources/2018/SongBoom.js
var SongBoom_templateObject;

function SongBoom_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var SongBoom_item = template_string_$item(SongBoom_templateObject || (SongBoom_templateObject = SongBoom_taggedTemplateLiteral(["SongBoom\u2122 BoomBox"])));
function SongBoom_have() {
  return have(SongBoom_item);
}
var keywords = {
  "Eye of the Giger": "spooky",
  "Food Vibrations": "food",
  "Remainin' Alive": "dr",
  "These Fists Were Made for Punchin'": "damage",
  "Total Eclipse of Your Meat": "meat"
};
var songBoomSongs = new Set(Object.keys(keywords));
/**
 * Current song.
 */

function song() {
  var stored = property_get("boomBoxSong");
  return songBoomSongs.has(stored) ? stored : null;
}
/**
 * Song changes left today.
 */

function songChangesLeft() {
  return property_get("_boomBoxSongsLeft");
}
/**
 * Change the song.
 * @param newSong Song to change to.
 */

function setSong(newSong) {
  if (song() !== newSong) {
    if (songChangesLeft() === 0) throw new Error("Out of song changes!");
    (0,external_kolmafia_namespaceObject.cliExecute)("boombox ".concat(newSong ? keywords[newSong] : "none"));
    return true;
  } else {
    return false;
  }
}
/**
 * Progress to next song drop (e.g. gathered meat-clip).
 */

function dropProgress() {
  return get("_boomBoxFights");
}
;// CONCATENATED MODULE: ./src/tasks/dailies.ts
var dailies_templateObject, dailies_templateObject2, dailies_templateObject3, dailies_templateObject4, dailies_templateObject5, dailies_templateObject6, dailies_templateObject7, dailies_templateObject8, dailies_templateObject9, dailies_templateObject10, dailies_templateObject11, dailies_templateObject12, dailies_templateObject13, dailies_templateObject14, dailies_templateObject15, dailies_templateObject16, dailies_templateObject17, dailies_templateObject18, dailies_templateObject19, dailies_templateObject20, dailies_templateObject21, dailies_templateObject22, dailies_templateObject23, dailies_templateObject24, dailies_templateObject25, dailies_templateObject26, dailies_templateObject27, dailies_templateObject28, dailies_templateObject29, dailies_templateObject30, dailies_templateObject31, dailies_templateObject32, dailies_templateObject33;

function dailies_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function dailies_toConsumableArray(arr) { return dailies_arrayWithoutHoles(arr) || dailies_iterableToArray(arr) || dailies_unsupportedIterableToArray(arr) || dailies_nonIterableSpread(); }

function dailies_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function dailies_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return dailies_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return dailies_arrayLikeToArray(o, minLen); }

function dailies_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function dailies_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return dailies_arrayLikeToArray(arr); }

function dailies_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }







function pull(item) {
  return {
    name: "Pull ".concat(item),
    ready: () => canPull(item) && ((0,external_kolmafia_namespaceObject.toSlot)(item) === external_kolmafia_namespaceObject.Slot.none || (0,external_kolmafia_namespaceObject.canEquip)(item)) && (0,external_kolmafia_namespaceObject.storageAmount)(item) >= 1,
    completed: () => !canPull(item),
    do: () => (0,external_kolmafia_namespaceObject.cliExecute)("pull ".concat(item))
  };
}

function buyPull(item, price) {
  if (item.tradeable && ronin()) {
    return [{
      name: "Buy ".concat(item, " to pull"),
      ready: () => canPull(item) && ((0,external_kolmafia_namespaceObject.toSlot)(item) === external_kolmafia_namespaceObject.Slot.none || (0,external_kolmafia_namespaceObject.canEquip)(item)) && (0,external_kolmafia_namespaceObject.mallPrice)(item) <= price,
      completed: () => (0,external_kolmafia_namespaceObject.storageAmount)(item) >= 1,
      do: () => (0,external_kolmafia_namespaceObject.buyUsingStorage)(item, 1, price)
    }, pull(item)];
  } else {
    return [pull(item)];
  }
}

function DailiesQuest() {
  return {
    name: "Dailies",
    tasks: [{
      name: "Pool Table",
      ready: () => template_string_$item(dailies_templateObject || (dailies_templateObject = dailies_taggedTemplateLiteral(["Clan pool table"]))).name in (0,external_kolmafia_namespaceObject.getClanLounge)(),
      completed: () => property_get("_poolGames") >= 3,
      do: () => (0,external_kolmafia_namespaceObject.cliExecute)("pool stylish"),
      limit: {
        tries: 3
      }
    }, {
      name: "Kgnee",
      ready: () => have(template_string_$familiar(dailies_templateObject2 || (dailies_templateObject2 = dailies_taggedTemplateLiteral(["Reagnimated Gnome"])))),
      completed: () => have(template_string_$item(dailies_templateObject3 || (dailies_templateObject3 = dailies_taggedTemplateLiteral(["gnomish housemaid's kgnee"])))),
      do: () => choosePart("kgnee"),
      outfit: {
        familiar: template_string_$familiar(dailies_templateObject4 || (dailies_templateObject4 = dailies_taggedTemplateLiteral(["Reagnimated Gnome"])))
      },
      limit: {
        tries: 1
      }
    }, {
      name: "Source Terminal Enhance",
      ready: () => SourceTerminal_have(),
      completed: () => getEnhanceUses() >= 3,
      do: () => enhance($effect(dailies_templateObject5 || (dailies_templateObject5 = dailies_taggedTemplateLiteral(["items.enh"])))),
      limit: {
        tries: 3
      }
    }, {
      name: "Kremlin's Greatest Briefcase Buff",
      ready: () => have(template_string_$item(dailies_templateObject6 || (dailies_templateObject6 = dailies_taggedTemplateLiteral(["Kremlin's Greatest Briefcase"])))),
      completed: () => property_get("_kgbClicksUsed") >= 22,
      do: () => (0,external_kolmafia_namespaceObject.cliExecute)("Briefcase buff item"),
      limit: {
        tries: 8
      }
    }, {
      name: "Asdon Martin Fuel",
      ready: () => gyou() && ronin() && !["Mongoose", "Wallaby", "Vole"].includes((0,external_kolmafia_namespaceObject.mySign)()),
      completed: () => have($effect(dailies_templateObject7 || (dailies_templateObject7 = dailies_taggedTemplateLiteral(["Driving Observantly"]))), turnsRemaining()) || have(template_string_$item(dailies_templateObject8 || (dailies_templateObject8 = dailies_taggedTemplateLiteral(["loaf of soda bread"]))), 100),
      do: () => (0,external_kolmafia_namespaceObject.retrieveItem)(5, template_string_$item(dailies_templateObject9 || (dailies_templateObject9 = dailies_taggedTemplateLiteral(["all-purpose flower"])))) && (0,external_kolmafia_namespaceObject.use)(5, template_string_$item(dailies_templateObject10 || (dailies_templateObject10 = dailies_taggedTemplateLiteral(["all-purpose flower"])))) && (0,external_kolmafia_namespaceObject.retrieveItem)((0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(dailies_templateObject11 || (dailies_templateObject11 = dailies_taggedTemplateLiteral(["wad of dough"])))), template_string_$item(dailies_templateObject12 || (dailies_templateObject12 = dailies_taggedTemplateLiteral(["loaf of soda bread"]))))
    }, {
      name: "Asdon Martin",
      ready: () => installed(),
      completed: () => have($effect(dailies_templateObject13 || (dailies_templateObject13 = dailies_taggedTemplateLiteral(["Driving Observantly"]))), turnsRemaining()),
      do: () => drive($effect(dailies_templateObject14 || (dailies_templateObject14 = dailies_taggedTemplateLiteral(["Driving Observantly"]))), turnsRemaining())
    }, {
      name: "Horsery",
      ready: () => property_get("horseryAvailable"),
      completed: () => property_get("_horsery") === "dark horse",
      do: () => (0,external_kolmafia_namespaceObject.cliExecute)("horsery dark"),
      limit: {
        tries: 1
      }
    }, {
      name: "Mummery Item",
      ready: () => have(template_string_$item(dailies_templateObject15 || (dailies_templateObject15 = dailies_taggedTemplateLiteral(["mumming trunk"])))),
      completed: () => property_get("_mummeryMods").includes("Item Drop"),
      do: () => (0,external_kolmafia_namespaceObject.cliExecute)("mummery item"),
      outfit: {
        familiar: chooseFamiliar()
      },
      limit: {
        tries: 1
      }
    }, {
      name: "Clan Fortune",
      ready: () => template_string_$item(dailies_templateObject16 || (dailies_templateObject16 = dailies_taggedTemplateLiteral(["Clan Carnival Game"]))).name in (0,external_kolmafia_namespaceObject.getClanLounge)(),
      completed: () => property_get("_clanFortuneBuffUsed"),
      do: () => (0,external_kolmafia_namespaceObject.cliExecute)("fortune buff item")
    }, {
      name: "SongBoom",
      ready: () => SongBoom_have() && songChangesLeft() > 0,
      completed: () => song() === "Food Vibrations",
      do: () => setSong("Food Vibrations"),
      limit: {
        tries: 1
      }
    }, {
      name: "Cosplay Saber",
      ready: () => have(template_string_$item(dailies_templateObject17 || (dailies_templateObject17 = dailies_taggedTemplateLiteral(["Fourth of May Cosplay Saber"])))),
      completed: () => property_get("_saberMod") !== 0,
      do: () => (0,external_kolmafia_namespaceObject.cliExecute)("saber familiar"),
      limit: {
        tries: 1
      }
    }, {
      name: "Bird Calendar",
      ready: () => have(template_string_$item(dailies_templateObject18 || (dailies_templateObject18 = dailies_taggedTemplateLiteral(["Bird-a-Day calendar"])))),
      completed: () => have($skill(dailies_templateObject19 || (dailies_templateObject19 = dailies_taggedTemplateLiteral(["Seek out a Bird"])))),
      do: () => (0,external_kolmafia_namespaceObject.use)(1, template_string_$item(dailies_templateObject20 || (dailies_templateObject20 = dailies_taggedTemplateLiteral(["Bird-a-Day calendar"])))),
      limit: {
        tries: 1
      }
    }, {
      name: "Daily Bird",
      after: ["Bird Calendar"],
      ready: () => modifier_get("Item Drop", $effect(dailies_templateObject21 || (dailies_templateObject21 = dailies_taggedTemplateLiteral(["Blessing of the Bird"])))) > 0 || modifier_get("Familiar Weight", $effect(dailies_templateObject22 || (dailies_templateObject22 = dailies_taggedTemplateLiteral(["Blessing of the Bird"])))) > 0,
      completed: () => property_get("_birdsSoughtToday") >= 6,
      do: () => (0,external_kolmafia_namespaceObject.useSkill)($skill(dailies_templateObject23 || (dailies_templateObject23 = dailies_taggedTemplateLiteral(["Seek out a Bird"]))), 6 - property_get("_birdsSoughtToday"))
    }, {
      name: "Favorite Bird",
      after: ["Bird Calendar"],
      ready: () => have($skill(dailies_templateObject24 || (dailies_templateObject24 = dailies_taggedTemplateLiteral(["Visit your Favorite Bird"])))) && (modifier_get("Item Drop", $effect(dailies_templateObject25 || (dailies_templateObject25 = dailies_taggedTemplateLiteral(["Blessing of your favorite Bird"])))) > 0 || modifier_get("Familiar Weight", $effect(dailies_templateObject26 || (dailies_templateObject26 = dailies_taggedTemplateLiteral(["Blessing of your favorite Bird"])))) > 0),
      completed: () => property_get("_favoriteBirdVisited"),
      do: () => (0,external_kolmafia_namespaceObject.useSkill)($skill(dailies_templateObject27 || (dailies_templateObject27 = dailies_taggedTemplateLiteral(["Visit your Favorite Bird"]))))
    }].concat(dailies_toConsumableArray(buyPull(template_string_$item(dailies_templateObject28 || (dailies_templateObject28 = dailies_taggedTemplateLiteral(["human musk"]))), 15000)), dailies_toConsumableArray(buyPull(template_string_$item(dailies_templateObject29 || (dailies_templateObject29 = dailies_taggedTemplateLiteral(["ice house"]))), 50000)), [pull(template_string_$item(dailies_templateObject30 || (dailies_templateObject30 = dailies_taggedTemplateLiteral(["mime army infiltration glove"])))), {
      name: "Craft Tiny Black Hole",
      ready: () => !have(template_string_$item(dailies_templateObject31 || (dailies_templateObject31 = dailies_taggedTemplateLiteral(["mime army infiltration glove"])))),
      do: () => (0,external_kolmafia_namespaceObject.retrieveItem)(template_string_$item(dailies_templateObject32 || (dailies_templateObject32 = dailies_taggedTemplateLiteral(["tiny black hole"])))),
      completed: () => have(template_string_$item(dailies_templateObject33 || (dailies_templateObject33 = dailies_taggedTemplateLiteral(["tiny black hole"])))),
      limit: {
        tries: 1
      }
    }])
  };
}
;// CONCATENATED MODULE: ./node_modules/libram/dist/session.js
var session_templateObject, session_templateObject2, session_templateObject3, session_templateObject4, session_templateObject5, session_templateObject6, session_templateObject7, session_templateObject8, session_templateObject9, session_templateObject10, session_templateObject11, session_templateObject12, session_templateObject13, session_templateObject14, session_templateObject15, session_templateObject16, session_templateObject17, session_templateObject18, session_templateObject19, session_templateObject20, session_templateObject21, session_templateObject22, session_templateObject23, session_templateObject24, session_templateObject25, session_templateObject26, session_templateObject27, session_templateObject28, session_templateObject29, session_templateObject30;

function session_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function session_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function session_createClass(Constructor, protoProps, staticProps) { if (protoProps) session_defineProperties(Constructor.prototype, protoProps); if (staticProps) session_defineProperties(Constructor, staticProps); return Constructor; }

function session_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function session_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = session_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function session_slicedToArray(arr, i) { return session_arrayWithHoles(arr) || session_iterableToArrayLimit(arr, i) || session_unsupportedIterableToArray(arr, i) || session_nonIterableRest(); }

function session_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function session_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function session_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function session_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function session_toConsumableArray(arr) { return session_arrayWithoutHoles(arr) || session_iterableToArray(arr) || session_unsupportedIterableToArray(arr) || session_nonIterableSpread(); }

function session_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function session_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return session_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return session_arrayLikeToArray(o, minLen); }

function session_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function session_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return session_arrayLikeToArray(arr); }

function session_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





/**
 * Return a mapping of the session items, mapping foldable items to a single of their forms
 * @returns the item session results, with foldables mapped to a single of their folding forms
 */

function mySessionItemsWrapper() {
  var manyToOne = (primary, mapped) => mapped.map(target => [target, primary]);

  var foldable = item => manyToOne(item, getFoldGroup(item));

  var itemMappings = new Map([].concat(session_toConsumableArray(foldable(template_string_$item(session_templateObject || (session_templateObject = session_taggedTemplateLiteral(["liar's pants"]))))), session_toConsumableArray(foldable(template_string_$item(session_templateObject2 || (session_templateObject2 = session_taggedTemplateLiteral(["ice pick"]))))), session_toConsumableArray(manyToOne(template_string_$item(session_templateObject3 || (session_templateObject3 = session_taggedTemplateLiteral(["Spooky Putty sheet"]))), [template_string_$item(session_templateObject4 || (session_templateObject4 = session_taggedTemplateLiteral(["Spooky Putty monster"])))].concat(session_toConsumableArray(getFoldGroup(template_string_$item(session_templateObject5 || (session_templateObject5 = session_taggedTemplateLiteral(["Spooky Putty sheet"])))))))), session_toConsumableArray(foldable(template_string_$item(session_templateObject6 || (session_templateObject6 = session_taggedTemplateLiteral(["stinky cheese sword"]))))), session_toConsumableArray(foldable(template_string_$item(session_templateObject7 || (session_templateObject7 = session_taggedTemplateLiteral(["naughty paper shuriken"]))))), session_toConsumableArray(foldable(template_string_$item(session_templateObject8 || (session_templateObject8 = session_taggedTemplateLiteral(["Loathing Legion knife"]))))), session_toConsumableArray(foldable(template_string_$item(session_templateObject9 || (session_templateObject9 = session_taggedTemplateLiteral(["deceased crimbo tree"]))))), session_toConsumableArray(foldable(template_string_$item(session_templateObject10 || (session_templateObject10 = session_taggedTemplateLiteral(["makeshift turban"]))))), session_toConsumableArray(foldable(template_string_$item(session_templateObject11 || (session_templateObject11 = session_taggedTemplateLiteral(["turtle wax shield"]))))), session_toConsumableArray(foldable(template_string_$item(session_templateObject12 || (session_templateObject12 = session_taggedTemplateLiteral(["metallic foil bow"]))))), session_toConsumableArray(foldable(template_string_$item(session_templateObject13 || (session_templateObject13 = session_taggedTemplateLiteral(["ironic moustache"]))))), session_toConsumableArray(foldable(template_string_$item(session_templateObject14 || (session_templateObject14 = session_taggedTemplateLiteral(["bugged balaclava"]))))), session_toConsumableArray(foldable(template_string_$item(session_templateObject15 || (session_templateObject15 = session_taggedTemplateLiteral(["toggle switch (Bartend)"]))))), session_toConsumableArray(foldable(template_string_$item(session_templateObject16 || (session_templateObject16 = session_taggedTemplateLiteral(["mushroom cap"]))))), session_toConsumableArray(manyToOne(template_string_$item(session_templateObject17 || (session_templateObject17 = session_taggedTemplateLiteral(["can of Rain-Doh"]))), template_string_$items(session_templateObject18 || (session_templateObject18 = session_taggedTemplateLiteral(["empty Rain-Doh can"]))))), session_toConsumableArray(manyToOne(template_string_$item(session_templateObject19 || (session_templateObject19 = session_taggedTemplateLiteral(["meteorite fragment"]))), template_string_$items(session_templateObject20 || (session_templateObject20 = session_taggedTemplateLiteral(["meteorite earring, meteorite necklace, meteorite ring"]))))), session_toConsumableArray(manyToOne(template_string_$item(session_templateObject21 || (session_templateObject21 = session_taggedTemplateLiteral(["Sneaky Pete's leather jacket"]))), template_string_$items(session_templateObject22 || (session_templateObject22 = session_taggedTemplateLiteral(["Sneaky Pete's leather jacket (collar popped)"]))))), session_toConsumableArray(manyToOne(template_string_$item(session_templateObject23 || (session_templateObject23 = session_taggedTemplateLiteral(["Boris's Helm"]))), template_string_$items(session_templateObject24 || (session_templateObject24 = session_taggedTemplateLiteral(["Boris's Helm (askew)"]))))), session_toConsumableArray(manyToOne(template_string_$item(session_templateObject25 || (session_templateObject25 = session_taggedTemplateLiteral(["Jarlsberg's pan"]))), template_string_$items(session_templateObject26 || (session_templateObject26 = session_taggedTemplateLiteral(["Jarlsberg's pan (Cosmic portal mode)"]))))), session_toConsumableArray(manyToOne(template_string_$item(session_templateObject27 || (session_templateObject27 = session_taggedTemplateLiteral(["tiny plastic sword"]))), template_string_$items(session_templateObject28 || (session_templateObject28 = session_taggedTemplateLiteral(["grogtini, bodyslam, dirty martini, vesper, cherry bomb, sangria del diablo"]))))), session_toConsumableArray(manyToOne(template_string_$item(session_templateObject29 || (session_templateObject29 = session_taggedTemplateLiteral(["earthenware muffin tin"]))), template_string_$items(session_templateObject30 || (session_templateObject30 = session_taggedTemplateLiteral(["blueberry muffin, bran muffin, chocolate chip muffin"])))))));
  var inventory = new Map();

  for (var _i = 0, _Object$entries = Object.entries((0,external_kolmafia_namespaceObject.mySessionItems)()); _i < _Object$entries.length; _i++) {
    var _itemMappings$get, _inventory$get;

    var _Object$entries$_i = session_slicedToArray(_Object$entries[_i], 2),
        itemStr = _Object$entries$_i[0],
        quantity = _Object$entries$_i[1];

    var item = (0,external_kolmafia_namespaceObject.toItem)(itemStr);
    var mappedItem = (_itemMappings$get = itemMappings.get(item)) !== null && _itemMappings$get !== void 0 ? _itemMappings$get : item;
    inventory.set(mappedItem, quantity + ((_inventory$get = inventory.get(mappedItem)) !== null && _inventory$get !== void 0 ? _inventory$get : 0));
  }

  return inventory;
}
/**
 * Performa a binary element-wise operation on two inventories
 * @param a The LHS inventory to perform the operation on
 * @param b The RHS inventory to perform the operation on
 * @param op an operator to compute between the sets
 * @param commutative if true use the value of b for any items not in a. if false, ignore values not in a
 * @returns a new map representing the combined inventories
 */


function inventoryOperation(a, b, op, commutative) {
  // return every entry that is in a and not in b
  var difference = new Map();

  var _iterator = session_createForOfIteratorHelper(a.entries()),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _b$get;

      var _step$value = session_slicedToArray(_step.value, 2),
          _item = _step$value[0],
          _quantity = _step$value[1];

      var combinedQuantity = op(_quantity, (_b$get = b.get(_item)) !== null && _b$get !== void 0 ? _b$get : 0);
      difference.set(_item, combinedQuantity);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  if (commutative) {
    var _iterator2 = session_createForOfIteratorHelper(b.entries()),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _step2$value = session_slicedToArray(_step2.value, 2),
            item = _step2$value[0],
            quantity = _step2$value[1];

        if (!a.has(item)) {
          difference.set(item, quantity);
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }

  var diffEntries = session_toConsumableArray(difference.entries());

  return new Map(diffEntries.filter(value => value[1] !== 0));
}
/**
 * A wrapper around tracking items and meat gained from this session
 * Smartly handles foldables being added/removed based on their state
 * Provides operations to add sessions and subtract Sessions so you can isolate the value of each Session using a baseline
 * @member meat the raw meat associated with this Session
 * @member items a map representing the items gained/lost during this Session
 */


var Session = /*#__PURE__*/function () {
  /**
   * Construct a new session
   * @param meat the amount of meat associated with this session
   * @param items the items associated with this session
   */
  function Session(meat, items) {
    session_classCallCheck(this, Session);

    session_defineProperty(this, "meat", void 0);

    session_defineProperty(this, "items", void 0);

    this.meat = meat;
    this.items = items;
  }
  /**
   * Register session results that do not get tracked natively
   * @param target either the Item or a string saying "meat" of what quantity to modify
   * @param quantity How much to modify the tracked amount by
   */


  session_createClass(Session, [{
    key: "register",
    value: function register(target, quantity) {
      if (target === "meat") {
        this.meat += quantity;
      } else {
        var _this$items$get;

        this.items.set(target, ((_this$items$get = this.items.get(target)) !== null && _this$items$get !== void 0 ? _this$items$get : 0) + quantity);
      }
    }
    /**
     * Value this session
     * @param itemValue a function that, when given an item, will give a meat value of the item
     * @returns ItemResult with the full value of this session given the input function
     */

  }, {
    key: "value",
    value: function value(itemValue) {
      // TODO: add garbo specific pricing (sugar equipment for synth, etc.)
      var meat = Math.floor(this.meat);

      var itemDetails = session_toConsumableArray(this.items.entries()).map(_ref => {
        var _ref2 = session_slicedToArray(_ref, 2),
            item = _ref2[0],
            quantity = _ref2[1];

        return {
          item: item,
          quantity: quantity,
          value: itemValue(item) * quantity
        };
      });

      var items = Math.floor(sumNumbers(itemDetails.map(detail => detail.value)));
      return {
        meat: meat,
        items: items,
        total: meat + items,
        itemDetails: itemDetails
      };
    }
    /**
     * Subtract the contents of another session from this one, removing any items that have a resulting quantity of 0
     *  (this will ignore elements in b but not in a)
     * @param other the session from which to pull values to remove from this session
     * @returns a new session representing the difference between this session and the other session
     */

  }, {
    key: "diff",
    value: function diff(other) {
      return new Session(this.meat - other.meat, inventoryOperation(this.items, other.items, (a, b) => a - b, false));
    }
    /**
     * Subtract the contents of snasphot b from session a, removing any items that have a resulting quantity of 0
     *  (this will ignore elements in b but not in a)
     * @param a the session from which to subtract elements
     * @param b the session from which to add elements
     * @returns a new session representing the difference between a and b
     */

  }, {
    key: "add",
    value:
    /**
     * Generate a new session combining multiple sessions together
     * @param other the session from which to add elements to this set
     * @returns a new session representing the addition of other to this
     */
    function add(other) {
      return new Session(this.meat + other.meat, inventoryOperation(this.items, other.items, (a, b) => a + b, true));
    }
    /**
     * Combine the contents of sessions
     * @param sessions the set of sessions to combine together
     * @returns a new session representing the difference between a and b
     */

  }, {
    key: "toFile",
    value:
    /**
     * Export this session to a file in the data/ directory. Conventionally this file should end in ".json"
     * @param filename The file into which to export
     */
    function toFile(filename) {
      var val = {
        meat: this.meat,
        items: Object.fromEntries(this.items)
      };
      (0,external_kolmafia_namespaceObject.bufferToFile)(JSON.stringify(val), Session.getFilepath(filename));
    }
    /**
     * Import a session from a file in the data/ directory. Conventionally the file should end in ".json"
     * @param filename The file from which to import
     * @returns the session represented by the file
     */

  }], [{
    key: "diff",
    value: function diff(a, b) {
      return a.diff(b);
    }
  }, {
    key: "add",
    value: function add() {
      for (var _len = arguments.length, sessions = new Array(_len), _key = 0; _key < _len; _key++) {
        sessions[_key] = arguments[_key];
      }

      return sessions.reduce((previousSession, currentSession) => previousSession.add(currentSession));
    }
  }, {
    key: "getFilepath",
    value: function getFilepath(filename) {
      return filename.endsWith(".json") ? filename : "snapshots/".concat((0,external_kolmafia_namespaceObject.myName)(), "/").concat((0,external_kolmafia_namespaceObject.todayToString)(), "_").concat(filename, ".json");
    }
  }, {
    key: "fromFile",
    value: function fromFile(filename) {
      var fileValue = (0,external_kolmafia_namespaceObject.fileToBuffer)(Session.getFilepath(filename)); // fileToBuffer returns empty string for files that don't exist

      if (fileValue.length > 0) {
        var val = JSON.parse(fileValue);
        var parsedItems = Object.entries(val.items).map(_ref3 => {
          var _ref4 = session_slicedToArray(_ref3, 2),
              itemStr = _ref4[0],
              quantity = _ref4[1];

          return [(0,external_kolmafia_namespaceObject.toItem)(itemStr), quantity];
        });
        return new Session(val.meat, new Map(parsedItems));
      } else {
        // if the file does not exist, return an empty session
        return new Session(0, new Map());
      }
    }
  }, {
    key: "current",
    value: function current() {
      return new Session((0,external_kolmafia_namespaceObject.mySessionMeat)(), mySessionItemsWrapper());
    }
  }]);

  return Session;
}();
;// CONCATENATED MODULE: ./src/session.ts
var src_session_templateObject, src_session_templateObject2;

function src_session_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function src_session_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = src_session_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function src_session_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return src_session_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return src_session_arrayLikeToArray(o, minLen); }

function src_session_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





var dailyProperties = ["bags", "keys", "adventures", "turns", "meat", "runs"];
function trackDaily(property) {
  var current = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  if (property_get("baggo_day", "") !== (0,external_kolmafia_namespaceObject.todayToString)()) {
    var _iterator = src_session_createForOfIteratorHelper(dailyProperties),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _dailyProperty = _step.value;
        _set("baggo_".concat(_dailyProperty), 0);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    _set("baggo_day", (0,external_kolmafia_namespaceObject.todayToString)());
  }

  var dailyProperty = "baggo_".concat(property);
  var total = property_get(dailyProperty, 0) + current;
  (0,external_kolmafia_namespaceObject.print)("set(".concat(dailyProperty, ", ").concat(total, ")"));
  _set(dailyProperty, total);
  return {
    current: current,
    total: total
  };
}
var sessionStart = Session.current();
var initialRuns = property_get("_navelRunaways");

function printResults(results, attr) {
  var bags = results.bags,
      keys = results.keys,
      meat = results.meat,
      adventures = results.adventures,
      turns = results.turns,
      runs = results.runs;
  var mpa = Math.round(((bags[attr] + keys[attr]) * args.bagvalue + meat[attr]) / turns[attr]);
  (0,external_kolmafia_namespaceObject.print)("Across ".concat(formatNumber(turns[attr]), " you generated"));
  (0,external_kolmafia_namespaceObject.print)("* ".concat(formatNumber(bags[attr]), " duffel bags"), "blue");
  (0,external_kolmafia_namespaceObject.print)("* ".concat(formatNumber(keys[attr]), " van keys"), "blue");
  (0,external_kolmafia_namespaceObject.print)("* ".concat(formatNumber(adventures[attr]), " advs"), "blue");
  (0,external_kolmafia_namespaceObject.print)("* ".concat(formatNumber(runs[attr]), " GAP/Navel runs"), "blue");
  (0,external_kolmafia_namespaceObject.print)("* ".concat(formatNumber(meat[attr]), " meat"), "blue");
  (0,external_kolmafia_namespaceObject.print)("That's ".concat(formatNumber(mpa), " MPA!"), "blue");
}

function startTracking() {
  sessionStart = Session.current();
  initialRuns = property_get("_navelRunaways");
}
function endTracking() {
  var _sessionResults$items, _sessionResults$items2;

  var sessionResults = Session.current().diff(sessionStart);
  var runs = property_get("_navelRunaways") - initialRuns;
  var turns = (0,external_kolmafia_namespaceObject.myTurncount)() - turncount;
  var dailyResults = {
    bags: trackDaily("bags", (_sessionResults$items = sessionResults.items.get(template_string_$item(src_session_templateObject || (src_session_templateObject = src_session_taggedTemplateLiteral(["unremarkable duffel bag"]))))) !== null && _sessionResults$items !== void 0 ? _sessionResults$items : 0),
    keys: trackDaily("keys", (_sessionResults$items2 = sessionResults.items.get(template_string_$item(src_session_templateObject2 || (src_session_templateObject2 = src_session_taggedTemplateLiteral(["van key"]))))) !== null && _sessionResults$items2 !== void 0 ? _sessionResults$items2 : 0),
    turns: trackDaily("turns", turns),
    adventures: trackDaily("adventures", turns - (adventures - (0,external_kolmafia_namespaceObject.myAdventures)())),
    meat: trackDaily("meat", sessionResults.meat),
    runs: trackDaily("runs", runs)
  };
  (0,external_kolmafia_namespaceObject.print)("This run of baggo:", "blue");
  printResults(dailyResults, "current");
  (0,external_kolmafia_namespaceObject.print)("So far today:", "blue");
  printResults(dailyResults, "total");
}
;// CONCATENATED MODULE: ./src/main.ts







var args = Args.create("baggo", "A script for farming duffel bags and van keys.", {
  turns: Args.number({
    help: "Number of turns to run (use negative numbers for the number of turns remaining).",
    default: Infinity
  }),
  bagvalue: Args.number({
    help: "Value of a single duffel bag or van key.",
    default: 20000
  }),
  olfact: Args.string({
    help: "Which monster to olfact.",
    options: [["none", "Do no olfact."], ["burnout", "Drops van key (food)."], ["jock", "Drops duffel bag (booze)."]],
    default: "none"
  }),
  buff: Args.flag({
    help: "Only buff up, do not spend any adventures.",
    default: false
  }),
  outfit: Args.string({
    help: "Name of the outfit whose pieces to equip when farming. If not given, an outfit will be automatically selected"
  }),
  familiar: Args.familiar({
    help: "Familiar to use when farming. If not given, a familiar will be automatically selected."
  })
});
var adventures = (0,external_kolmafia_namespaceObject.myAdventures)();
var turncount = (0,external_kolmafia_namespaceObject.myTurncount)();
function turnsRemaining() {
  if (args.turns === 0) return 0;

  if (isFinite(args.turns) && args.turns > 0) {
    var spent = (0,external_kolmafia_namespaceObject.myTurncount)() - turncount;
    return Math.min(args.turns - spent, (0,external_kolmafia_namespaceObject.myAdventures)());
  }

  var spend = (0,external_kolmafia_namespaceObject.myAdventures)() + Math.min(0, args.turns);
  return Math.round(spend / (1 - Calculator.baseline().advsGainedPerTurnTakingCombat()));
}
function main(command) {
  Args.fill(args, command);

  if (args.help) {
    Args.showHelp(args);
    return;
  }

  var tasks = getTasks([DailiesQuest(), BaggoQuest()]);
  var engine = new engine_Engine(tasks);
  startTracking();

  try {
    engine.run();
  } finally {
    engine.destruct();
    endTracking();
  }
}
})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;