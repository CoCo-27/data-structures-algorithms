// If you need to map alphabets to their corresponding index (zero based, - 96 for 1 based)
"a".charCodeAt() - 97; // 0
"z".charCodeAt() - 97; // 25

// If you need to repeat a string
"hello".repeat(3); // "hellohellohello"

// Starts and ends with, cleaner than `string[0]` and `string[string.length - 1]`
// works with multiple chars too
"hello".startsWith("h"); // true
"hello".endsWith("o"); // true

"hello".startsWith("he"); // true
"hello".endsWith("llo"); // true
