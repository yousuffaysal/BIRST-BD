import React from 'react';
import { Helmet } from 'react-helmet-async';
import { defaultSEO } from '../../config/seoConfig';

/**
 * SEO Component
 * Manages meta tags, Open Graph, Twitter Cards, and structured data
 * 
 * @param {string} title - Page title
 * @param {string} description - Page description
 * @param {string} keywords - Page keywords
 * @param {string} image - OG image URL
 * @param {string} path - Current page path
 * @param {object} structuredData - JSON-LD structured data
 * @param {string} type - OG type (website, article, etc.)
 */
export default function SEO({
    title,
    description,
    keywords,
    image,
    path = '',
    structuredData,
    type = 'website',
}) {
    const seo = {
        title: title || defaultSEO.defaultTitle,
        description: description || defaultSEO.defaultDescription,
        keywords: keywords || defaultSEO.defaultKeywords,
        image: image || defaultSEO.defaultImage,
        url: `${defaultSEO.siteUrl}${path}`,
    };

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{seo.title}</title>
            <meta name="description" content={seo.description} />
            <meta name="keywords" content={seo.keywords} />
            <link rel="canonical" href={seo.url} />

            {/* Open Graph Tags */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={seo.url} />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:image" content={seo.image} />
            <meta property="og:site_name" content={defaultSEO.siteName} />
            <meta property="og:locale" content={defaultSEO.locale} />

            {/* Twitter Card Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={defaultSEO.twitterHandle} />
            <meta name="twitter:title" content={seo.title} />
            <meta name="twitter:description" content={seo.description} />
            <meta name="twitter:image" content={seo.image} />

            {/* Additional Meta */}
            <meta name="author" content={defaultSEO.siteName} />
            <meta name="robots" content="index, follow" />
            <meta name="language" content={defaultSEO.language} />

            {/* Structured Data (JSON-LD) */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    );
}
