export const extractProductsList = (res) => {
  if (!res) return [];
  if (Array.isArray(res)) return res;

  if (Array.isArray(res?.product?.products)) return res.product.products;
  if (Array.isArray(res?.product?.results)) return res.product.results;
  if (Array.isArray(res?.products)) return res.products;
  if (Array.isArray(res?.product)) return res.product;
  if (Array.isArray(res?.data?.products)) return res.data.products;
  if (Array.isArray(res?.data?.product)) return res.data.product;
  if (Array.isArray(res?.data?.results)) return res.data.results;
  if (Array.isArray(res?.data)) return res.data;
  if (Array.isArray(res?.results)) return res.results;

  return [];
};

export const extractCategoriesList = (res) => {
  if (!res) return [];
  if (Array.isArray(res)) return res;

  if (Array.isArray(res?.category?.categories)) return res.category.categories;
  if (Array.isArray(res?.categories)) return res.categories;
  if (Array.isArray(res?.category)) return res.category;
  if (Array.isArray(res?.data?.categories)) return res.data.categories;
  if (Array.isArray(res?.data?.category)) return res.data.category;
  if (Array.isArray(res?.data)) return res.data;

  return [];
};

export const normalizeProduct = (item) => {
  if (!item) return null;

  const sellingPrice = Number(
    item?.salePrice ||
    item?.sellingPrice ||
    item?.price ||
    0
  );

  const originalPrice = Number(
    item?.originalPrice ||
    item?.mrp ||
    item?.price ||
    sellingPrice ||
    0
  );

  const discount =
    originalPrice > 0 && sellingPrice > 0 && originalPrice > sellingPrice
      ? Math.round(((originalPrice - sellingPrice) / originalPrice) * 100)
      : 0;

  let imagesList = [];
  if (Array.isArray(item?.images) && item.images.length > 0) {
    imagesList = item.images.map((img) =>
      typeof img === 'string' ? img : (img?.url || img?.image || img?.src || '')
    ).filter(Boolean);
  }

  if (imagesList.length === 0 && (item?.featuredImage || item?.image)) {
    const main = item?.featuredImage || item?.image;
    if (typeof main === 'string') imagesList = [main];
    else if (main?.url || main?.image) imagesList = [main.url || main.image];
  }

  if (imagesList.length === 0) {
    imagesList = ["/imges/productDetails/newIdea/1.png"];
  }

  // Cap at maximum 12 images
  imagesList = imagesList.slice(0, 12);

  return {
    ...item,
    _id: item?._id || item?.id,
    name: item?.name || item?.title || item?.productName || "Pure Organic Product",
    title: item?.title || item?.name || "Pure Organic Product",
    slug: item?.slug || item?._id,
    images: imagesList,
    image: imagesList[0],
    price: sellingPrice,
    salePrice: sellingPrice,
    sellingPrice: sellingPrice,
    mrp: originalPrice,
    originalPrice: originalPrice,
    discount,
  };
};
