/** A file in `public/`, with the site's base path (GitHub Pages serves the app under /Wedding-Planner). */
export function assetPath(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/${path.replace(/^\//, "")}`;
}

/** Joshua & Janel's photo: the full one for Home, a small one for the rail. */
export const COUPLE_PHOTO = {
  large: "couple/joshua-janel.webp",
  small: "couple/joshua-janel-small.webp",
  alt: "Joshua and Janel in front of a wall of wooden bookshelves, smiling",
} as const;
