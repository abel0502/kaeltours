'use client';

interface VideoEmbedProps {
  youtubeId?: string;
  vimeoId?: string;
  autoplay?: boolean;
  controls?: boolean;
}

export function VideoEmbed({
  youtubeId,
  vimeoId,
  autoplay = false,
  controls = true,
}: VideoEmbedProps) {
  if (!youtubeId && !vimeoId) {
    return null;
  }

  const src = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}?autoplay=${autoplay ? 1 : 0}&rel=0&controls=${controls ? 1 : 0}`
    : `https://player.vimeo.com/video/${vimeoId}?autoplay=${autoplay ? 1 : 0}&controls=${controls ? 1 : 0}`;

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden">
      <iframe
        src={src}
        title="Tour Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
        loading="lazy"
      />
    </div>
  );
}
