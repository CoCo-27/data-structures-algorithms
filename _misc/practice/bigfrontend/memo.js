function memo(func, resolver) {
  const cache = {};

  return function (...arguments) {
    const key = resolver
      ? resolver.apply(this, arguments)
      : arguments.join("_");

    if (cache[key]) return cache[key];

    const result = func.apply(this, arguments);

    cache[key] = result;

    return result;
  };
}
