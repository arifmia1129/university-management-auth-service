const pick = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Partial<T> => {
  const paginationOptions: Partial<T> = {};

  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      paginationOptions[key] = obj[key];
    }
  }

  return paginationOptions;
};

export default pick;
