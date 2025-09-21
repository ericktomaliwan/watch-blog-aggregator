import { useState } from 'react';
import { Heading, Subheading } from 'components/heading';
import { useRSSFeed } from '../../hooks/useRSSFeed';
import { RSSFeedGrid } from 'components/RSSFeedItem';

// Popular watch blog RSS feeds
const WATCH_FEEDS = [
  {
    name: 'Fratello Watches',
    url: 'https://www.fratellowatches.com/feed/',
    description: 'Independent watch journalism'
  },
  {
    name: 'Hodinkee',
    url: 'hodinkee.com/articles/rss.xml',
    description: 'The leading destination for luxury watches'
  },
  {
    name: 'Monochrome Watches',
    url: 'https://monochrome-watches.com/feed/',
    description: 'High-end watch reviews and news'
  }
];

export default function HomePage() {
  const [selectedFeed, setSelectedFeed] = useState(WATCH_FEEDS[0].url);
  const { feed, loading, error } = useRSSFeed(selectedFeed);

  return (
    <div className="space-y-8">
      <div>
        <Heading>Watch Blog Aggregator</Heading>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Stay updated with the latest watch news and reviews from top industry sources
        </p>
      </div>

      {/* Feed Selector */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg border border-gray-200 dark:border-zinc-700 p-6">
        <Subheading className="mb-4">Select a Watch Blog</Subheading>
        <div className="grid gap-3 md:grid-cols-3">
          {WATCH_FEEDS.map((feedOption) => (
            <button
              key={feedOption.url}
              onClick={() => setSelectedFeed(feedOption.url)}
              className={`p-4 rounded-lg border text-left transition-colors ${
                selectedFeed === feedOption.url
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700'
              }`}
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {feedOption.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {feedOption.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Feed Content */}
      <div>
        {feed && (
          <div className="mb-6">
            <Subheading>{feed.title}</Subheading>
            {feed.description && (
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {feed.description}
              </p>
            )}
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600 dark:text-gray-400">Loading articles...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-800 dark:text-red-200">
              Error loading feed: {error}
            </p>
          </div>
        )}

        {feed && !loading && !error && (
          <RSSFeedGrid items={feed.items} />
        )}
      </div>
    </div>
  );
}
