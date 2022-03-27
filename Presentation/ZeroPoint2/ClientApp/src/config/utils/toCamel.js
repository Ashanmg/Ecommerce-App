export function toCamel(obj) {
  if (obj instanceof Array)
    return obj.map((value) => {
      let modifiedValue = value;
      if (typeof value === 'object') {
        modifiedValue = toCamel(value);
      }
      return modifiedValue;
    });

  const newO = {};
  let modifiedValue;

  // eslint-disable-next-line no-restricted-syntax
  for (const origKey in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(origKey)) {
      const newKey = (
        origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey
      ).toString();
      modifiedValue = obj[origKey];
      if (
        modifiedValue instanceof Array ||
        (modifiedValue !== null && modifiedValue.constructor === Object)
      ) {
        modifiedValue = toCamel(modifiedValue);
      }
      newO[newKey] = modifiedValue;
    }
  }
  return newO;
}
