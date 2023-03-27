export const storageSave = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

// Function used to read data from session storage.
export const storageRead = (key) => {
  const data = sessionStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return null;
};
