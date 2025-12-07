import { useState, useMemo, useEffect } from 'react';
import { Heading, Subheading } from 'components/heading';
import { useRSSFeed } from '../../hooks/useRSSFeed';
import { RSSFeedGrid } from 'components/RSSFeedItem';
import { WATCH_FEEDS } from '../../data';
import { SEO } from '../../components/SEO';
import { decodeHtmlEntities } from '../../utils/htmlEntities';

const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

// Helper function to parse RSS feed items
function parseRSSFeedItems(xmlText) {
  const items = [];
  const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/gi;
  let match;

  while ((match = itemRegex.exec(xmlText)) !== null) {
    const itemXml = match[1];
    const item = {
      title: extractCDATA(itemXml, 'title'),
      description: extractCDATA(itemXml, 'description'),
      link: extractCDATA(itemXml, 'link'),
      pubDate: extractCDATA(itemXml, 'pubDate'),
      guid: extractCDATA(itemXml, 'guid')
    };
    
    if (item.title) {
      items.push(item);
    }
  }

  return items;
}

function extractCDATA(xml, tagName) {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const match = xml.match(regex);
  
  if (!match) return null;
  
  let content = match[1];
  
  // Remove CDATA wrapper if present
  if (content.includes('<![CDATA[')) {
    content = content.replace(/<!\[CDATA\[(.*?)\]\]>/gs, '$1');
  }
  
  // Decode HTML entities
  content = decodeHtmlEntities(content).trim();
  
  return content || null;
}

export default function HomePage() {
  const [selectedFeed, setSelectedFeed] = useState('all');
  const [allFeedsData, setAllFeedsData] = useState({ feeds: [], loading: false, error: null });
  const { feed, loading, error } = useRSSFeed(selectedFeed === 'all' ? null : selectedFeed);

  // Fetch all feeds when "All" is selected
  useEffect(() => {
    if (selectedFeed === 'all') {
      setAllFeedsData({ feeds: [], loading: true, error: null });
      
      const fetchAllFeeds = async () => {
        try {
          const feedPromises = WATCH_FEEDS.map(async (feedOption) => {
            try {
              const response = await fetch(`${CORS_PROXY}${encodeURIComponent(feedOption.url)}`);
              
              if (!response.ok) {
                throw new Error(`Failed to fetch ${feedOption.name}`);
              }
              
              const xmlText = await response.text();
              const items = parseRSSFeedItems(xmlText);
              
              return {
                feedName: feedOption.name,
                feedDescription: feedOption.description,
                firstItem: items[0] || null
              };
            } catch (err) {
              // Return null for failed feeds, but don't fail the entire operation
              return {
                feedName: feedOption.name,
                feedDescription: feedOption.description,
                firstItem: null
              };
            }
          });
          
          const results = await Promise.all(feedPromises);
          setAllFeedsData({ feeds: results.filter(r => r.firstItem !== null), loading: false, error: null });
        } catch (err) {
          setAllFeedsData({ feeds: [], loading: false, error: err.message });
        }
      };
      
      fetchAllFeeds();
    }
  }, [selectedFeed]);

  const seoData = useMemo(() => {
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const description = 'Stay updated with the latest watch news and reviews from top industry sources including Hodinkee, Fratello Watches, and Monochrome Watches.';
    
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Watch Blog Aggregator',
      description: description,
      url: siteUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/list/{search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    };

    return {
      title: 'Watch Blog Aggregator',
      description,
      canonicalUrl: siteUrl,
      structuredData,
    };
  }, []);

  return (
    <>
      <SEO
        title={seoData.title}
        description={seoData.description}
        canonicalUrl={seoData.canonicalUrl}
        structuredData={seoData.structuredData}
      />
      <main className="space-y-8" role="main">
      <div>
        <Heading>Watch Blog Aggregator</Heading>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Stay updated with the latest watch news and reviews from top industry sources
        </p>
      </div>

      {/* Feed Selector */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg border border-gray-200 dark:border-zinc-700 p-6">
        <Subheading className="mb-4">Select a Watch Blog</Subheading>
        <select
          value={selectedFeed}
          onChange={(e) => setSelectedFeed(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        >
          <option value="all">All - Latest from all blogs</option>
          {WATCH_FEEDS.map((feedOption) => (
            <option key={feedOption.url} value={feedOption.url}>
              {feedOption.name} - {feedOption.description}
            </option>
          ))}
        </select>
      </div>

      {/* Feed Content */}
      <div>
        {selectedFeed === 'all' ? (
          <>
            {allFeedsData.loading && (
              <div className="flex items-center justify-center py-12" role="status" aria-live="polite">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" aria-hidden="true"></div>
                <span className="ml-3 text-gray-600 dark:text-gray-400">Loading articles...</span>
              </div>
            )}

            {allFeedsData.error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4" role="alert">
                <p className="text-red-800 dark:text-red-200">
                  Error loading feeds: {allFeedsData.error}
                </p>
              </div>
            )}

            {!allFeedsData.loading && !allFeedsData.error && allFeedsData.feeds.length > 0 && (
              <>
                <div className="mb-6">
                  <Subheading>Latest from All Blogs</Subheading>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    First article from each watch blog
                  </p>
                </div>
                <RSSFeedGrid items={allFeedsData.feeds.map(f => f.firstItem)} />
              </>
            )}

            {!allFeedsData.loading && !allFeedsData.error && allFeedsData.feeds.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">No articles found</p>
              </div>
            )}
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
      </main>
    </>
  );
}