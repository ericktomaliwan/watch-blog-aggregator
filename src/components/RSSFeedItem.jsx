import { Subheading } from 'components/heading';

export function RSSFeedItem({ item }) {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const stripHtml = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').trim();
  };

  const truncateText = (text, maxLength = 150) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <article className="bg-white dark:bg-zinc-800 rounded-lg border border-gray-200 dark:border-zinc-700 p-6 hover:shadow-md transition-shadow">
      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {item.title}
          </h3>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-2">
            {item.pubDate && (
              <span>{formatDate(item.pubDate)}</span>
            )}
            {item.link && (
              <>
                <span>•</span>
                <a 
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Read more
                </a>
              </>
            )}
          </div>
        </div>
        
        {item.description && (
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {truncateText(stripHtml(item.description))}
          </p>
        )}
      </div>
    </article>
  );
}

export function RSSFeedGrid({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No articles found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <RSSFeedItem key={item.guid || index} item={item} />
      ))}
    </div>
  );
}
