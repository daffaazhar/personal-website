type YouTubeEmbedProps = {
  title: string;
  videoId: string;
};

export function YouTubeEmbed({ title, videoId }: YouTubeEmbedProps) {
  return (
    <div className="project-video">
      <iframe
        className="project-video__frame"
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={title}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
