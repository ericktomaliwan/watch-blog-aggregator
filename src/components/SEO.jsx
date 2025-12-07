import { useEffect } from 'react';

/**
 * SEO Component for managing meta tags, Open Graph, and structured data
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} props.description - Meta description
 * @param {string} props.canonicalUrl - Canonical URL
 * @param {string} props.ogImage - Open Graph image URL
 * @param {string} props.ogType - Open Graph type (default: 'website')
 * @param {Object} props.structuredData - JSON-LD structured data object
 */
export function SEO({
  title,
  description,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  structuredData,
}) {
  const siteName = 'Watch Blog Aggregator';
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const fullCanonicalUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : '');

  useEffect(() => {
    // Update or create meta tags
    const updateMetaTag = (name, content, attribute = 'name') => {
      if (!content) return;
      
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update title
    if (title) {
      document.title = fullTitle;
    }

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('robots', 'index, follow');

    // Open Graph tags
    updateMetaTag('og:title', fullTitle, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:type', ogType, 'property');
    updateMetaTag('og:url', fullCanonicalUrl, 'property');
    updateMetaTag('og:site_name', siteName, 'property');
    if (ogImage) {
      updateMetaTag('og:image', ogImage, 'property');
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description);
    if (ogImage) {
      updateMetaTag('twitter:image', ogImage);
    }

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullCanonicalUrl);

    // Structured Data (JSON-LD)
    let structuredDataScript = document.querySelector('script[type="application/ld+json"]');
    if (structuredData) {
      if (!structuredDataScript) {
        structuredDataScript = document.createElement('script');
        structuredDataScript.setAttribute('type', 'application/ld+json');
        document.head.appendChild(structuredDataScript);
      }
      structuredDataScript.textContent = JSON.stringify(structuredData);
    } else if (structuredDataScript) {
      structuredDataScript.remove();
    }

    // Cleanup function
    return () => {
      // Note: We don't remove meta tags on cleanup to avoid flickering
      // The next page will update them anyway
    };
  }, [title, description, canonicalUrl, ogImage, ogType, structuredData, fullTitle, fullCanonicalUrl]);

  return null; // This component doesn't render anything
}

