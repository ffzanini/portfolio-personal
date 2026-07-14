export const YOUTUBE_CHANNEL_ID = "UCVHgTgRK0M5kt2Gvi60b7Eg";

/** Uploads playlist = channel id with UC → UU */
export const YOUTUBE_UPLOADS_PLAYLIST_ID = `UU${YOUTUBE_CHANNEL_ID.slice(2)}`;

export const YOUTUBE_CHANNEL_URL = `https://www.youtube.com/channel/${YOUTUBE_CHANNEL_ID}`;

/** Always points at the channel's latest upload via uploads playlist */
export const YOUTUBE_LATEST_EMBED_SRC = `https://www.youtube-nocookie.com/embed?listType=playlist&list=${YOUTUBE_UPLOADS_PLAYLIST_ID}`;

export type YouTubeVideo = {
  id: string;
  title: string;
  publishedAt: string;
  thumbnail: string;
  url: string;
};

const ENTRY_RE =
  /<entry>([\s\S]*?)<\/entry>/g;
const VIDEO_ID_RE = /<yt:videoId>([^<]+)<\/yt:videoId>/;
const TITLE_RE = /<title>([^<]*)<\/title>/;
const PUBLISHED_RE = /<published>([^<]+)<\/published>/;

function decodeXml(value: string) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");
}

export async function fetchChannelVideos(
  limit = 9,
): Promise<YouTubeVideo[]> {
  try {
    const response = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`,
      {
        next: { revalidate: 3600 },
        headers: { Accept: "application/atom+xml" },
      },
    );

    if (!response.ok) return [];

    const xml = await response.text();
    const videos: YouTubeVideo[] = [];

    for (const match of xml.matchAll(ENTRY_RE)) {
      const entry = match[1] ?? "";
      const id = VIDEO_ID_RE.exec(entry)?.[1];
      const title = TITLE_RE.exec(entry)?.[1];
      const publishedAt = PUBLISHED_RE.exec(entry)?.[1];

      if (!id || !title || !publishedAt) continue;

      videos.push({
        id,
        title: decodeXml(title),
        publishedAt,
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        url: `https://www.youtube.com/watch?v=${id}`,
      });

      if (videos.length >= limit) break;
    }

    return videos;
  } catch {
    return [];
  }
}
