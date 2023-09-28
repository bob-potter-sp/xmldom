var stringCache: Map<string,string> = new Map();
var stringCount = 0;

export function intern(s: string): string {
  stringCount += 1;
  if (stringCount % 100_000 == 0) {
    console.log(`string hits ${stringCount}`);
  }
  if (!stringCache.has(s)) {
    stringCache.set(s, s);
    console.log(`stringCache ${stringCache.size}`);
  }
  return stringCache.get(s)!;
}
