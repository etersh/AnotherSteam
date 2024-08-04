const cache = {};
const cacheDuration = 60 * 60 * 1000; //milliseconds - 1 hour

export const getCachedData = (key) => {
  const cachedItem = cache[key];
  if (!cachedItem) {
    return null;
  }

  if (Date.now() > cachedItem.expiry) {
    delete cache[key];
    return null;
  }
  console.log('Got Cached Data');
  return cachedItem.data;
};

export const setCachedData = (key, data) => {
  cache[key] = {
    data,
    expiry: Date.now() + cacheDuration,
  };
  console.log('Cached');
};
