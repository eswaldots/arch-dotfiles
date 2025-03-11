function getAllLocalStorageValues(wildcard?: string) {
  const allValues: Record<string, unknown> = {};

  for (const key of Object.keys(localStorage)) {
    allValues[key] = localStorage.getItem(wildcard ? `${wildcard}_${key}` : key);
  }

  return allValues;
}

export { getAllLocalStorageValues };
