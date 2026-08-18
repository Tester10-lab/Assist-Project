/**
 * Returns the correct public asset path that works on both
 * localhost (dev) and GitHub Pages (production).
 * 
 * Vite sets import.meta.env.BASE_URL based on the `base` in vite.config.ts.
 * On localhost: "/"
 * On GitHub Pages: "/Assist-Project/"
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  // Remove leading slash from path to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
}
