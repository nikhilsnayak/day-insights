import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isObject(obj: any): obj is Object {
  return obj !== null && typeof obj === 'object';
}

export function isDate(obj: any): obj is Date {
  return obj instanceof Date;
}

export function deepEqual(obj1: any, obj2: any): boolean {
  if (isDate(obj1) && isDate(obj2)) {
    return obj1.getTime() === obj2.getTime();
  }

  if (isObject(obj1) && isObject(obj2)) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (!deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }

    return true;
  }

  return obj1 === obj2;
}

export function toTitleCase(str: string) {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
