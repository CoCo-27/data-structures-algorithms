// Sets:

// When using a hash map to solve string problems you can use a Set instead of the usual object if you only need to
// store keys and not values, to build the hashMap you don't need to loop this will work just fine:
const hashMap = new Set("hello"); // Set(4) { 'h', 'e', 'l', 'o' }

hashMap.has("h"); // true

// Arrays by index:

// We built an array with a size of 26 and default values of 0
// we loop through some string and increment or decrement the value at the ith index as needed
const alphabet = new Array(26).fill(0);

alphabet["a".charCodeAt(0)]++;
alphabet["b".charCodeAt(0)]--;
