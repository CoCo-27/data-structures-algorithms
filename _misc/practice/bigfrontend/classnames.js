function classNames(...args) {
  const classes = [];

  flatDeep(args, Infinity).forEach((arg) => {
    if (["string", "number"].includes(typeof arg)) {
      return classes.push(arg);
    }

    if (typeof arg === "object" && arg !== null) {
      for (key in arg) {
        if (arg[key]) {
          classes.push(key);
        }
      }
    }
  });

  return classes.join(" ");
}

function flatDeep(arr, d = 1) {
  return d > 0
    ? arr.reduce(
        (acc, val) =>
          acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val),
        []
      )
    : arr.slice();
}
