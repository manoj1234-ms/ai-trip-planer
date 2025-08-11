/**
 * Converts a YouTube URL to an embeddable format
 * @param youtubeUrl - The YouTube URL to convert
 * @returns The embeddable YouTube URL
 */
export function convertToEmbedUrl(youtubeUrl: string): string {
  // Extract video ID from various YouTube URL formats
  const videoIdMatch = youtubeUrl.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
  );
  
  if (!videoIdMatch) {
    throw new Error('Invalid YouTube URL format');
  }
  
  const videoId = videoIdMatch[1];
  return `https://www.youtube.com/embed/${videoId}`;
}

/**
 * Gets the high-quality thumbnail URL for a YouTube video
 * @param youtubeUrl - The YouTube URL
 * @returns The thumbnail URL
 */
export function getYouTubeThumbnail(youtubeUrl: string): string {
  const videoIdMatch = youtubeUrl.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
  );
  
  if (!videoIdMatch) {
    throw new Error('Invalid YouTube URL format');
  }
  
  const videoId = videoIdMatch[1];
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

// Example usage:
// const embedUrl = convertToEmbedUrl('https://youtu.be/0NMIZ-PTt8k');
// const thumbnailUrl = getYouTubeThumbnail('https://youtu.be/0NMIZ-PTt8k');
