export function getHeaderTitle({ duration, region, destinationSlug, styleSlug, collectionSlug, t }) {
  const cleanSlug = destinationSlug?.replace(/-fr$/, "")?.replace(/-/g, " ");

  const durationMap = {
    "7": "navbar.7days_vn_tour",
    "10": "navbar.10days_vn_tour",
    "12": "navbar.12days_vn_tour",
    "14": "navbar.2w_vn_tour",
    "21": "navbar.3w_vn_tour",
  };

  if (duration) return t(durationMap[duration]) || "";
  if (destinationSlug) return `${cleanSlug}`;
  if (styleSlug) return `${styleSlug.replace(/-/g, " ")}`;
  if (collectionSlug) return `${collectionSlug.replace(/-/g, " ")}`;
  if (region) return `${region}`;
  return t("all_tour");
}
