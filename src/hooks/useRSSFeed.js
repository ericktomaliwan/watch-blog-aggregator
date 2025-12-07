import { useState, useEffect } from 'react';
import { decodeHtmlEntities } from '../utils/htmlEntities';

const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

export function useRSSFeed(feedUrl) {
  const [feed, setFeed] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!feedUrl) return;

    const fetchFeed = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use CORS proxy to avoid CORS issues
        const response = await fetch(`${CORS_PROXY}${encodeURIComponent(feedUrl)}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch feed: ${response.status}`);
        }

        const xmlText = await response.text();
        
        // Parse XML manually since we can't use DOMParser in all environments
        const items = parseRSSFeed(xmlText);
        
        setFeed({
          title: extractTitle(xmlText),
          description: extractDescription(xmlText),
          items: items
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, [feedUrl]);

  return { feed, loading, error };
}

function parseRSSFeed(xmlText) {
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

  return items.slice(0, 10); // Limit to 10 items
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

function extractTitle(xmlText) {
  const titleMatch = xmlText.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (titleMatch) {
    return extractCDATA(titleMatch[1], 'title') || titleMatch[1].replace(/<[^>]*>/g, '').trim();
  }
  return 'RSS Feed';
}

function extractDescription(xmlText) {
  const descMatch = xmlText.match(/<description[^>]*>([\s\S]*?)<\/description>/i);
  if (descMatch) {
    return extractCDATA(descMatch[1], 'description') || descMatch[1].replace(/<[^>]*>/g, '').trim();
  }
  return '';
}
