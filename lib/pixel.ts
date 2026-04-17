/* eslint-disable @typescript-eslint/no-explicit-any */
export const pixelEvent = (eventName: string, data?: Record<string, any>) => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", eventName, data);
  }
};

// Call this on product pages when the page loads
export const trackViewContent = (product: {
  name: string;
  sku: string;
  price: string;
  category: string;
  currency?: string;
}) => {
  pixelEvent("ViewContent", {
    content_name: product.name,
    content_ids: [product.sku],
    content_type: "product",
    value: parseFloat(product.price),
    currency: product.currency || "GHS",
    content_category: product.category,
  });
};

// Call this when someone clicks "Add to Cart"
export const trackAddToCart = (product: {
  name: string;
  sku: string;
  price: string;
  currency?: string;
}) => {
  pixelEvent("AddToCart", {
    content_name: product.name,
    content_ids: [product.sku],
    content_type: "product",
    value: parseFloat(product.price),
    currency: product.currency || "GHS",
  });
};

// Call this when checkout page loads
export const trackInitiateCheckout = (cart: {
  skus: string[];
  total: string;
  itemCount: number;
  currency?: string;
}) => {
  pixelEvent("InitiateCheckout", {
    content_ids: cart.skus,
    content_type: "product",
    value: parseFloat(cart.total),
    currency: cart.currency || "GHS",
    num_items: cart.itemCount,
  });
};

// Call this on order confirmation / thank you page
export const trackPurchase = (order: {
  skus: string[];
  total: string;
  itemCount: number;
  currency?: string;
}) => {
  pixelEvent("Purchase", {
    content_ids: order.skus,
    content_type: "product",
    value: parseFloat(order.total),
    currency: order.currency || "GHS",
    num_items: order.itemCount,
  });
};
