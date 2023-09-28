var stringCache: Record<string,string> = {};
var stringCount = 0;
var stringLength = 0;
var stringCard = 0;

export function intern(s: string): string {
  return s;
  stringCount += 1;
  if (stringCount % 100_000 == 0) {
    console.log(`string hits ${stringCount}`);
  }
  if (stringCache[s] == undefined || stringCache[s] == null) {
    stringCache[s] = s;
    stringLength += s.length;
    stringCard += 1;
    console.log(`stringCache ${stringCard} | ${stringLength}`);
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
