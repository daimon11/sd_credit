type ClassValue = string | number | boolean | undefined | null | { [key: string]: boolean } | ClassValue[];

export default function classnames(...classes: ClassValue[]): string {
  return classes
    .filter(Boolean)
    .map((cls) => {
      if (typeof cls === 'string' || typeof cls === 'number') {
        return String(cls);
      }
      if (Array.isArray(cls)) {
        return classnames(...cls);
      }
      if (typeof cls === 'object' && cls !== null) {
        return Object.entries(cls)
          .filter(([, value]) => Boolean(value))
          .map(([key]) => key)
          .join(' ');
      }
      return '';
    })
    .filter(Boolean)
    .join(' ');
}
