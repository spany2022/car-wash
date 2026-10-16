type LoaderArgs = { src: string; width: number; quality?: number };

export default function imageLoader({ src, width, quality }: LoaderArgs) {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 72));
    return url.toString();
  }
  // Local assets in /public: let the browser fetch the original file.
  return `${src}${src.includes("?") ? "&" : "?"}w=${width}`;
}
