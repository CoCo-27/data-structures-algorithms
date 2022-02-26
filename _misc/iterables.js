function isIterable(obj) {
  if (obj === null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === "function";
}

/*--------------------------------- Iterables ---------------------------------*/

items = [1, 2, 3];
items = new Set([1, 2, 3]); // also weakSet()
items = new Map([
  // also weakMap()
  ["name", "TK"],
  ["age", 33],
  ["gender", "male"],
]);

// works on ALL iterables
for (let item of items) {
  console.log(item);
}

// works on all iterables (except strings)
items.forEach((item) => {
  console.log(item);
});

// only works on arrays
// methods like filter/map/reduce, etc also work only on arrays...
for (let i = 0; i < items.length; i++) {
  console.log(items[i]);
}

// strings are weird, they are iterables
// but `forEach` doesn't work on them, but `for of` does
// `for in` also works but instead of the key you get the index
items = "Penny";

console.log(isIterable(items)); // true

// Non-iterables
items = {
  name: "TK",
  age: 33,
  gender: "male",
};

// can only use for in on non-iterables
for (let key in items) {
  console.log(key);
}

/*--------------------------------- Get iterator out of iterable ---------------------------------*/

items = [1, 2, 3];

iterator = items[Symbol.iterator]();

console.log(iterator); // Object [Array Iterator] {}

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }

// you need to call it 1 extra times to be able to tell that there are no more items left
console.log(iterator.next()); // { value: undefined, done: true }

/*--------------------------------- Use generator function to create iterable ---------------------------------*/

function* generator() {
  yield 1;
  yield 2;
  yield 3;
}

iterator = generator();

console.log(iterator); // Object [Generator] {}

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }

// one generator can yield from another
function* generator() {
  yield 1;

  yield* anotherGenerator(); // 2

  return "the end!"; // when you return from a generator that will be the last value

  yield 3; // will never be hit
}

function* anotherGenerator() {
  yield 2;
}

iterator = generator();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 'the end!', done: true }

/*--------------------------------- Practical example of iterator/generator usage ---------------------------------*/

function makeAjaxCall() {
  // ...
}

function request(url) {
  return new Promise(function (resolve, reject) {
    makeAjaxCall(url, function (error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

function* generator() {
  yield request("url1");
  yield request("url2");
}

iterator = generator();

console.log(iterator.next());
console.log(iterator.next()); // before making the request to url2, make sure the request to url1 has resolved
