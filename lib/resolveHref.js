export function resolveSiteHref(href, pathname = "/") {
  if (!href || typeof href !== "string") {
    return href;
  }

  if (href.startsWith("#")) {
    return pathname === "/" ? href : `/${href}`;
  }

  if (href.startsWith("./")) {
    return `/${href.slice(2)}`;
  }

  return href;
}
