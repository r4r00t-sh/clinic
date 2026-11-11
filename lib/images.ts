/**
 * Resolve a local /public image path.
 * Paths should be like `images/...` (leading slash optional).
 */
export function img(src: string): string {
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  return src.startsWith("/") ? src : `/${src}`;
}
