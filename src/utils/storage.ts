import { defaultLocale } from '@/constants';

export type Adapter = () => Storage;

export function localeAdapter() {
  return localStorage;
}

export function sessionAdapter() {
  return sessionStorage;
}

export const defaultAdapter: Adapter = sessionAdapter;

export const namespace = 'sxx.ff';

export enum Keys {
  Locale = 'locale',
  Wallet = 'wallet',
}

export function normalizeKey(key: string) {
  if (key.startsWith(namespace)) return key;

  return [namespace, key].join('.');
}

export function getItem<D = any>(key: string, adapter?: Adapter): D | null;
export function getItem<D = any>(
  key: string,
  defaultVal: D,
  adapter?: Adapter,
): D;
export function getItem<D = any>(
  key: string,
  defaultVal?: D,
  adapter = defaultAdapter,
) {
  const storage = adapter();
  const data = storage.getItem(normalizeKey(key));

  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {}

    return data;
  }

  return defaultVal ?? null;
}

export function setItem<D = any>(
  key: string,
  val: D,
  adapter = defaultAdapter,
) {
  adapter().setItem(normalizeKey(key), JSON.stringify(val));
}

export function removeItem(key: string, adapter = defaultAdapter) {
  adapter().removeItem(normalizeKey(key));
}

export function keys(adapter = defaultAdapter) {
  const storage = adapter();
  return Array.from(storage)
    .map((_, i) => storage.key(i)!)
    .filter((key) => key.startsWith(namespace));
}

export function clear(adapter = defaultAdapter) {
  for (const key of keys(adapter)) {
    removeItem(key, adapter);
  }
}

export function getWallet() {
  return getItem<API.Base>(Keys.Wallet);
}

export function setWallet(wallet: API.Base) {
  setItem(Keys.Wallet, wallet);
}

export function getLocale() {
  return getItem(Keys.Locale, defaultLocale, localeAdapter);
}

export function setLocale(locale: string) {
  setItem(Keys.Locale, locale, localeAdapter);
}
