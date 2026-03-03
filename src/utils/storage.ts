const PREFIX = 'italian_learn_';

export function getItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // localStorage full or unavailable — silently fail
  }
}

export function removeItem(key: string): void {
  try {
    localStorage.removeItem(PREFIX + key);
  } catch {
    // silently fail
  }
}
