export const cleanMediaUrl = (url) => {
  if (!url || typeof url !== "string") return "";
  const trimmed = url.trim();
  if (!trimmed || trimmed === "null" || trimmed === "undefined" || trimmed === "#") return "";
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("data:")) {
    return trimmed;
  }
  const backendHost = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v2").replace(/\/api\/v2\/?$/, "");
  const cleanPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return `${backendHost}${cleanPath}`;
};

export const getMediaUrl = (media, size = "thumb") => {
  if (!media) return "";

  if (typeof media === "string") return cleanMediaUrl(media);

  if (Array.isArray(media)) {
    return getMediaUrl(media[0], size);
  }

  const thumbUrl =
    media.thumb ||
    media.thumbnail ||
    media.small ||
    media.cover ||
    media.poster;

  const mediumUrl =
    media.medium ||
    media.mediumUrl ||
    media.optimized ||
    thumbUrl;

  const largeUrl =
    media.large ||
    media.original ||
    media.url ||
    media.image ||
    media.path ||
    media.src ||
    mediumUrl ||
    thumbUrl;

  const rawUrl = thumbUrl || mediumUrl || largeUrl || "";
  return cleanMediaUrl(rawUrl);
};

export const getProductThumb = (product) => {
  return (
    getMediaUrl(product?.thumbnail, "thumb") ||
    getMediaUrl(product?.featuredImage, "thumb") ||
    getMediaUrl(product?.image1, "thumb") ||
    getMediaUrl(product?.image, "thumb") ||
    getMediaUrl(product?.images?.[0], "thumb") ||
    ""
  );
};

export const getProductMedium = (product) => {
  return (
    getMediaUrl(product?.mediumImage, "medium") ||
    getMediaUrl(product?.featuredImage, "medium") ||
    getMediaUrl(product?.image1, "medium") ||
    getMediaUrl(product?.image, "medium") ||
    getMediaUrl(product?.images?.[0], "medium") ||
    getProductThumb(product)
  );
};
