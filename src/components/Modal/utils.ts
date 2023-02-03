export const isStr = (v: unknown): v is string => typeof v === 'string';

export const isDef = <T>(v: T | null | undefined): v is T => v !== null && v !== undefined;
