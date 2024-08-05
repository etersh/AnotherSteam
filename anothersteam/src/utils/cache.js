// const cache = {};
// const cacheDuration = 60 * 60 * 1000; //milliseconds - 1 hour

// export const getCachedData = (key) => {
//   const cachedItem = cache[key];
//   if (!cachedItem) {
//     console.log(`[CACHE MISS] No cache found for key: ${key}`);
//     return null;
//   }

//   if (Date.now() > cachedItem.expiry) {
//     console.log(`[CACHE EXPIRED] Cache expired for key: ${key}`);
//     delete cache[key];
//     return null;
//   }
//   console.log(`[CACHE HIT] Got cache for key: ${key}`);
//   return cachedItem.data;
// };

// export const setCachedData = (key, data) => {
//   console.log(`[CACHE SET] Setting cache for key: ${key}`);
//   cache[key] = {
//     data,
//     expiry: Date.now() + cacheDuration,
//   };
// };
