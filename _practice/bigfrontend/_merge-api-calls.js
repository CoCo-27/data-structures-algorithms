const cache = new Map();

async function getAPIWithMerging(path, config) {
  const key = `${path}_${JSON.stringify(config)}`;
  const time = Date.now();

  if (!cache.has(key) || cache.get(key).time - time > 1000) {
    const response = await getAPI(path, config);

    if (cache.size === 5) {
      const firstKey = cache.entries().next().value[0];
      cache.delete(firstKey);
    }

    cache.set(key, { time, response });

    return response;
  }

  return cache.get(key).response;
}

getAPIWithMerging.clearCache = () => {
  cache.clear();
};
