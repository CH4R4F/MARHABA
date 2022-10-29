export function saveItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
