var stringCache: Record<string,string>;
var stringCount = 0;

export function intern(s: string): string {
  stringCount += 1;
  if (stringCount % 100_000 == 0) {
    console.log(`string hits ${stringCount}`);
  }
  if (!stringCache[s]) {
    stringCache[s] = s;
    console.log(`stringCache ${stringCache.size}`);
  }
  return stringCache[s];
  /*
  return stringCache.get(s)!;
  if (!stringCache.has(s)) {
    stringCache.set(s, s);
    console.log(`stringCache ${stringCache.size}`);
  }
  return stringCache.get(s)!;
 */
}
