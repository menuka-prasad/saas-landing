import { SITE_CONFIG, DEFAULT_METADATA } from '@/config/site';

// Define the structure of the meta object from your content files
interface PageMetaData {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string; // Optional page-specific OG image
    noIndex?: boolean; // Optional flag for noindex
}

export function generateMetadata(meta: PageMetaData) {
    // Use page-specific values, fall back to defaults
    // const title = meta.title || DEFAULT_METADATA.title.default;
    const description = meta.description || DEFAULT_METADATA.description;
    const ogImage = meta.ogImage || SITE_CONFIG.defaultOgImage;

    // Construct the full title using the template if it's a child page
    const formattedTitle = meta.title
        ? DEFAULT_METADATA.title.template.replace('%s', meta.title)
        : DEFAULT_METADATA.title.default;

    return {
        title: formattedTitle,
        description,
        keywords: meta.keywords?.join(', '), // Convert array to string
        robots: meta.noIndex ? 'noindex, nofollow' : 'index, follow', // Optional noindex control

        // Use verification codes from site config
        verification: {
            google: SITE_CONFIG.verification.google,
            // Add other verification services as needed
            yandex: SITE_CONFIG.verification.yandex,
            bing: SITE_CONFIG.verification.bing,
        },

        // Open Graph
        openGraph: {
            title: formattedTitle,
            description,
            images: [ogImage],
            url: SITE_CONFIG.url, // You might want to pass page-specific URL too
            type: 'website',
            siteName: SITE_CONFIG.name,
        },

        // Twitter Card
        twitter: {
            card: 'summary_large_image',
            title: formattedTitle,
            description,
            images: [ogImage],
            creator: SITE_CONFIG.socialLinks.twitter, // Optional: add twitter handle to config
        },
    };
}