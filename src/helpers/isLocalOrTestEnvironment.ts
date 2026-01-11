export function isDevOrTestHost(hostname: string): boolean {
  return (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname.includes('.test.') ||
    hostname.includes('.dev.')
  );
}
