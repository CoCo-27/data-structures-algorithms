/*----------------------------------------------------------------------------*/
/* Typescript Utilies                                                         */
/*----------------------------------------------------------------------------*/

// Required<Type> - makes all props required

type Foo = {
  a?: string;
  b?: number;
  c?: boolean;
};

const foo: Required<Foo> = { a: "", b: 1, c: true }; // valid
const foo2: Required<Foo> = { a: "" }; // invalid

/*----------------------------------------------------------------------------*/

// Partial<Type> - create a new type that only allows properties from an existing type

type Bar = {
  a: string;
  b: number;
  c: boolean;
};

const bar: Partial<Bar> = {}; // valid
const bar2: Partial<Bar> = { a: "" }; // valid
const bar3: Partial<Bar> = { x: "" }; // invalid

/*----------------------------------------------------------------------------*/

// Readonly<Type> - properties can't be changed

const person: {
  readonly name: string;
  age: number;
} = {
  name: "Joe",
  age: 30,
};

person.name = "Sam"; // invalid
person.age = 18; // valid

// make ALL properties on a type `readonly` at once
const person2: Readonly<{
  name: string;
  age: number;
}> = {
  name: "Joe",
  age: 30,
};

person2.name = "Sam"; // invalid
person2.age = 18; // invalid

/*----------------------------------------------------------------------------*/

// Record<Key, Value> - create a new object type by composing 2 other types together for the keys and values

type CatName = "penny" | "leo";

interface CatInfo {
  age: number;
  breed: string;
}

// this object's keys must of of type `CatName` and values of type `CatInfo`
const cats: Record<CatName, CatInfo> = {
  penny: { age: 5, breed: "siamese" },
  leo: { age: 3, breed: "balanese" },
  lushy: { age: 10, breed: "mutt", color: "orange" }, // invalid, "lushy" isn't a valid key and "color" isn't a valid property
};

/*----------------------------------------------------------------------------*/

// Pick<Type, Keys> - create a new type by picking only the properties you want from another type

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "clean room",
  description: "", // invalid, description wasn't "picked"
  completed: false,
};

/*----------------------------------------------------------------------------*/

// Omit<Type, Keys> - create a new type by copying another type but removing the properties you don't want

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview2 = Omit<Todo, "completed">;

const todo2: TodoPreview2 = {
  title: "clean room",
  description: "",
  completed: false, // invalid, completed was "omitted"
};

/*----------------------------------------------------------------------------*/

// Using `keyof` we can make a new type out of the keys of an existing type

type User = {
  username: string;
  password: string;
  isAdmin: boolean;
};

type ValidUserKeys = keyof User; // "username" | "password" | "isAdmin"

let key: ValidUserKeys = "username"; // valid
let key2: ValidUserKeys = "age"; // invalid

/*----------------------------------------------------------------------------*/

// Using `keyof typeof` in combination we can make a new type out of the keys of an existing object

const user2 = {
  username: "James",
  password: "hello123",
  isAdmin: false,
};

type ValidUserKeys2 = keyof typeof user2; // "username" | "password" | "isAdmin"

let key3: ValidUserKeys = "username"; // valid
let key4: ValidUserKeys = "age"; // invalid

/*----------------------------------------------------------------------------*/

// ReturnType<typeof Function> - create a new type based on the return type of an existing function

function sayHello() {
  return {
    message: "hello there!",
    times: 2,
  };
}

type Greeting = ReturnType<typeof sayHello>; // Greeting = { message: string; times: number }

const foobar: Greeting = { message: "lol", times: 100 }; // valid
const foobar2: Greeting = { language: "eng", times: 100 }; // invalid, "language" isn't a valid property

/*----------------------------------------------------------------------------*/

// Parameters<typeof Function> - lets you create a new "tuple type" based on the arguments of an existing function

function sayHello2(greeting: string, times: number) {}

type Greeting2 = Parameters<typeof sayHello2>; // Greeting2 = [string, number]

const foobar3: Greeting2 = ["hello", 2]; // valid
const foobar4: Greeting2 = [false, 2]; // invalid

/*----------------------------------------------------------------------------*/

/*
  Self explanatory string helpers:
    Uppercase<StringType>
    Lowercase<StringType>
    Capitalize<StringType>
    Uncapitalize<StringType>
*/

const myObj = { username: "James" };
const myObj2 = { USERNAME: "James" };
const myObj3 = { Username: "James" };

const str: Uppercase<keyof typeof myObj> = "USERNAME"; // valid
const str2: Uppercase<keyof typeof myObj> = "username"; // invalid

const str3: Lowercase<keyof typeof myObj2> = "username"; // valid
const str4: Lowercase<keyof typeof myObj2> = "USERNAME"; // invalid

const str5: Capitalize<keyof typeof myObj> = "Username"; // valid
const str6: Capitalize<keyof typeof myObj> = "username"; // invalid

const str7: Uncapitalize<keyof typeof myObj3> = "username"; // valid
const str8: Uncapitalize<keyof typeof myObj3> = "Username"; // invalid
