export function getCanonicalUrl(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://denaro.com";
  return `${baseUrl}${path}`;
}

export function getOpenGraphImage(path = "/og-default.jpg") {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://denaro.com";
  return `${baseUrl}${path}`;
}