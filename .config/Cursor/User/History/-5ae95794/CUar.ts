function getAllLocalStorageValues(wildcard?: string) {
  const allValues: Record<string, unknown> = {};

  for (const key of Object.keys(localStorage)) {
    if (wildcard) {
      if (key.startsWith(wildcard)) {
        allValues[key] = localStorage.getItem(key);
      }
    } else {
      allValues[key] = localStorage.getItem(key);
    }
  }

  return allValues;
}

export { getAllLocalStorageValues };
