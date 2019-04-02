export const safe = obj => {
  return new Proxy(obj, {
    get: (target, name) => {
      if (Object.keys(target).includes(name)) {
        const result = target[name];

        return result instanceof Object ? safe(result) : result;
      }

      return safe({});
    },
  });
};
