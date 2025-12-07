import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { Heading, Subheading } from 'components/heading';
import { useRSSFeed } from '../../../../hooks/useRSSFeed';
import { RSSFeedGrid } from 'components/RSSFeedItem';
import { WATCH_FEEDS } from '../../../../data';
import { SEO } from '../../../../components/SEO';
import { decodeHtmlEntities } from '../../../../utils/htmlEntities';

export default function ListPage() {
  const { id } = useParams();
  const feedIndex = parseInt(id, 10);
  const selectedFeed = WATCH_FEEDS[feedIndex];
  const { feed, loading, error } = useRSSFeed(selectedFeed?.url);

  // Generate SEO metadata
  const seoData = useMemo(() => {
    if (!selectedFeed) return null;

    const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const canonicalUrl = `${siteUrl}/list/${id}`;
    const pageTitle = feed?.title || selectedFeed.name;
    const pageDescription = feed?.description || selectedFeed.description || `Latest articles from ${selectedFeed.name}`;

    // Create structured data for the feed
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      publisher: {
        '@type': 'Organization',
        name: 'Watch Blog Aggregator',
        url: siteUrl,
      },
      mainEntity: {
        '@type': 'ItemList',
        name: `${selectedFeed.name} Articles`,
        description: `Latest articles from ${selectedFeed.name}`,
        itemListElement: feed?.items?.slice(0, 10).map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Article',
            headline: item.title,
            description: item.description?.substring(0, 200) || '',
            url: item.link,
            datePublished: item.pubDate || undefined,
          },
        })) || [],
      },
    };

    return {
      title: pageTitle,
      description: pageDescription,
      canonicalUrl,
      structuredData,
    };
  }, [selectedFeed, feed, id]);

  if (!selectedFeed) {
    return (
      <>
        <SEO
          title="Feed Not Found"
          description="The selected feed could not be found."
        />
        <main className="space-y-8" role="main">
          <article>
            <header>
              <Heading>Feed Not Found</Heading>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                The selected feed could not be found.
              </p>
            </header>
          </article>
        </main>
      </>
    );
  }

  return (
    <>
      {seoData && (
        <SEO
          title={seoData.title}
          description={seoData.description}
          canonicalUrl={seoData.canonicalUrl}
          ogType="website"
          structuredData={seoData.structuredData}
        />
      )}
      <main className="space-y-8" role="main">
        <article itemScope itemType="https://schema.org/CollectionPage">
          <header>
            <Heading itemProp="name">{selectedFeed.name}</Heading>
            <p className="text-gray-600 dark:text-gray-400 mt-2" itemProp="description">
              {selectedFeed.description}
            </p>
          </header>

          {/* Feed Content */}
          <section>
            {feed && (
              <div className="mb-6">
                <Subheading>{decodeHtmlEntities(feed.title)}</Subheading>
                {feed.description && (
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {decodeHtmlEntities(feed.description)}
                  </p>
                )}
              </div>
            )}

            {loading && (
              <div className="flex items-center justify-center py-12" role="status" aria-live="polite">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" aria-hidden="true"></div>
                <span className="ml-3 text-gray-600 dark:text-gray-400">Loading articles...</span>
              </div>
            )}

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4" role="alert">
                <p className="text-red-800 dark:text-red-200">
                  Error loading feed: {error}
                </p>
              </div>
            )}

            {feed && !loading && !error && (
              <RSSFeedGrid items={feed.items} />
            )}
          </section>
        </article>
      </main>
    </>
  );
}
