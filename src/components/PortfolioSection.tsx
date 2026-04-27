import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

const visualProjects = [
  { id: 1, url: 'https://player.vimeo.com/video/1165995105?h=15e21dc6dc', ratio: '16/9' },
  { id: 2, url: 'https://player.vimeo.com/video/1153960232?h=0e89f3bd41', ratio: '16/9' },
  { id: 3, url: 'https://player.vimeo.com/video/1186915669?h=ec2b467d83', ratio: '16/9' },
  { id: 4, url: 'https://player.vimeo.com/video/1152867925?h=c2a5b7b929', ratio: '16/9' },
  { id: 5, url: 'https://player.vimeo.com/video/1152866745?h=94a4f3808f', ratio: '426/190' },
  { id: 6, url: 'https://player.vimeo.com/video/1152865784?h=9ed5390116', ratio: '426/182' },
];

// ── Video Card with smart thumbnail overlay ────────────────────────────────────
// Vimeo thumbnail stays on top until the video is actually playing.
// No loading spinner is ever visible — thumbnail covers it seamlessly.
const VideoCard = ({
  project,
  index,
}: {
  project: typeof visualProjects[0];
  index: number;
}) => {
  const iframeRef   = useRef<HTMLIFrameElement>(null);
  const cardRef     = useRef<HTMLDivElement>(null);
  // inView: true when card is within 300px of viewport — triggers lazy loading
  const inView      = useInView(cardRef as React.RefObject<Element>, { once: true, margin: '300px' });
  // videoReady: true once Vimeo fires its first 'play' event via postMessage
  const [videoReady, setVideoReady] = useState(false);
  // isPlaying: tracks hover play/pause state
  const [isPlaying, setIsPlaying]   = useState(false);
  // thumbUrl: securely fetches latest thumbnail instead of using cached fallback
  const [thumbUrl, setThumbUrl]     = useState<string>('');

  // ── Fetch the highest-quality thumbnail via Vimeo oEmbed API ──────────────
  // oEmbed lets you request a specific width — Vimeo returns the largest
  // size it has available (up to 1920px). The v2 API only gives _640 by default.
  // Private videos need their hash passed in the URL parameter too.
  useEffect(() => {
    if (!inView) return; // ← only fetches when card enters viewport
    const videoId = project.url.match(/video\/(\d+)/)?.[1];
    const hash    = project.url.match(/[?&]h=([a-f0-9]+)/)?.[1];
    if (!videoId) return;

    // Build the vimeo.com URL (with hash if private)
    const vimeoPageUrl = hash
      ? `https://vimeo.com/${videoId}/${hash}`
      : `https://vimeo.com/${videoId}`;

    // oEmbed endpoint: width=1920 asks Vimeo for the highest-res thumbnail
    fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(vimeoPageUrl)}&width=1920`)
      .then(res => res.json())
      .then(data => {
        if (data?.thumbnail_url) {
          setThumbUrl(data.thumbnail_url);
        }
      })
      .catch(() => {}); // gracefully ignore network errors
  }, [project.url, inView]);


  // ── Listen for Vimeo postMessage events ─────────────────────────────────────
  // Vimeo sends { event: 'play' } etc. when playback state changes.
  // We use this to know the video has buffered enough to show — then we
  // fade the thumbnail out so the video is revealed cleanly.
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (!e.data) return;
      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        // Only react to events from this specific iframe's player
        if (!iframeRef.current) return;
        const iframeSrc = iframeRef.current.src;
        const videoId = project.url.match(/video\/(\d+)/)?.[1];
        if (!videoId || !iframeSrc.includes(videoId)) return;

        if (data.event === 'play') {
          // First play event = video is streaming & visible — safe to hide thumb
          setVideoReady(true);
          setIsPlaying(true);
        }
        if (data.event === 'pause') {
          setIsPlaying(false);
        }
      } catch {
        // non-JSON message — ignore
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [project.url]);

  // ── Register this iframe with Vimeo's postMessage API ─────────────────────
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const onLoad = () => {
      iframe.contentWindow?.postMessage(JSON.stringify({ method: 'addEventListener', value: 'play'  }), '*');
      iframe.contentWindow?.postMessage(JSON.stringify({ method: 'addEventListener', value: 'pause' }), '*');
    };
    iframe.addEventListener('load', onLoad);
    return () => iframe.removeEventListener('load', onLoad);
  }, []);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const iframe = e.currentTarget.nextElementSibling as HTMLIFrameElement;
    iframe?.contentWindow?.postMessage(JSON.stringify({ method: 'play' }), '*');
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const iframe = e.currentTarget.nextElementSibling as HTMLIFrameElement;
    if (!iframe?.contentWindow) return;
    iframe.contentWindow.postMessage(JSON.stringify({ method: 'pause' }), '*');
    iframe.contentWindow.postMessage(JSON.stringify({ method: 'setCurrentTime', value: 0 }), '*');
    // Reset thumbnail overlay so next hover shows thumb → video again
    setVideoReady(false);
    setIsPlaying(false);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const iframe = e.currentTarget.nextElementSibling as HTMLIFrameElement;
    if (!iframe) return;
    iframe.style.pointerEvents = 'auto';
    iframe.style.transform = 'scale(1)';

    const onFullscreenChange = () => {
      if (!document.fullscreenElement && !(document as any).webkitFullscreenElement) {
        iframe.style.pointerEvents = 'none';
        iframe.style.transform = 'scale(1.12)';
        iframe.contentWindow?.postMessage(JSON.stringify({ method: 'pause' }), '*');
        iframe.contentWindow?.postMessage(JSON.stringify({ method: 'setVolume', value: 0 }), '*');
        // Reset thumb so next hover is clean
        setVideoReady(false);
        document.removeEventListener('fullscreenchange', onFullscreenChange);
        document.removeEventListener('webkitfullscreenchange', onFullscreenChange);
      }
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', onFullscreenChange);

    iframe.contentWindow?.postMessage(JSON.stringify({ method: 'setVolume', value: 1 }), '*');

    if (iframe.requestFullscreen) {
      iframe.requestFullscreen().catch(() => {});
    } else if ((iframe as any).webkitRequestFullscreen) {
      (iframe as any).webkitRequestFullscreen();
    }
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full rounded-xl mx-auto overflow-hidden"
      style={{ aspectRatio: project.ratio || '16/9', background: '#111' }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* ── INVISIBLE INTERACTION OVERLAY ── */}
      <div
        className="absolute inset-0 z-20 cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      />

      {/* ── VIMEO IFRAME ── deferred until card is near viewport */}
      <iframe
        ref={iframeRef}
        title={`vimeo-player-${project.id}`}
        src={inView ? `${project.url}&api=1&muted=1&autopause=0&title=0&byline=0&portrait=0&badge=0` : ''}
        className="absolute inset-0 w-full h-full"
        style={{
          pointerEvents:   'none',
          transform:       'scale(1.12)',
          transformOrigin: 'center center',
          transition:      'transform 0.2s ease-out',
        }}
        loading="lazy"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        allowFullScreen
      />

      {/* ── MOBILE TAP BADGE — hidden on desktop (md+) ── */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 md:hidden pointer-events-none">
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.15)',
          color: '#fff', fontSize: 11, fontFamily: "'Space Mono', monospace",
          letterSpacing: '0.15em', padding: '6px 12px', borderRadius: 999,
        }}>
          ▶ TAP TO PLAY
        </span>
      </div>

      {/* ── THUMBNAIL OVERLAY ──────────────────────────────────────────────────
          Sits above the iframe. Fades out ONLY after Vimeo fires its first
          'play' postMessage event, meaning video is actually playing.
          This completely hides the Vimeo loading spinner at all times.        */}
      <div
        style={{
          position:      'absolute',
          inset:          0,
          zIndex:         10,
          transition:    'opacity 0.4s ease',
          opacity:        videoReady ? 0 : 1,
          pointerEvents: 'none',
          overflow:      'hidden',
        }}
      >
        {/* ── SHIMMER SKELETON — visible while Vimeo API fetch is in-flight ── */}
        <div
          style={{
            position:   'absolute',
            inset:       0,
            background: 'linear-gradient(110deg, #111 25%, #1e1e1e 50%, #111 75%)',
            backgroundSize: '200% 100%',
            animation:  thumbUrl ? 'none' : 'portfolio-shimmer 1.4s ease-in-out infinite',
            opacity:    thumbUrl ? 0 : 1,
            transition: 'opacity 0.3s ease',
          }}
        />

        {/* ── REAL THUMBNAIL — crossfades in once the URL resolves ── */}
        <img
          src={thumbUrl || ''}
          alt="Video thumbnail"
          style={{
            position:   'absolute',
            inset:       0,
            width:       '100%',
            height:      '100%',
            objectFit:  'cover',
            display:    'block',
            opacity:    thumbUrl ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
          onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }}
        />

        {/* Dark editorial tint */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.18)' }} />
      </div>
    </motion.div>
  );
};

// ── Section ────────────────────────────────────────────────────────────────────
const PortfolioSection = () => {
  const sectionRef  = useRef<HTMLElement>(null);
  const isInView    = useInView(sectionRef, { once: true, margin: '-10%' });
  const [visibleCount, setVisibleCount] = useState(4);

  return (
    <section
      id="portfolio"
      data-section="3"
      data-bg="#FFFFFF"
      ref={sectionRef}
      className="py-20 sm:py-28 md:py-36 relative"
      style={{ backgroundColor: '#FFFFFF', color: '#111111' }}
    >
      <div className="w-full px-4 sm:px-8 lg:px-16" style={{ maxWidth: '1800px', margin: '0 auto' }}>
        <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="font-heading animate-text-rainbow mb-4" style={{ fontSize: 'clamp(5rem,14vw,200px)', lineHeight: 0.85, textShadow: '4px 4px 0px rgba(0,0,0,1)' }}>MY WORK.</h2>
        </motion.div>
      </div>

      <div
        className="w-full px-4 sm:px-8 lg:px-16 mx-auto"
        style={{ maxWidth: '1700px', display: 'flex', flexDirection: 'column', gap: 64, paddingTop: 64, paddingBottom: 48 }}
      >
        {visualProjects.slice(0, visibleCount).map((p, i) => (
          <VideoCard key={p.id} project={p} index={i} />
        ))}

        {visibleCount < visualProjects.length && (
          <motion.div
            className="flex justify-center mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => setVisibleCount(visualProjects.length)}
              className="btn-3d btn-3d-yellow px-14 py-6 font-heading tracking-widest flex items-center justify-center cursor-pointer"
              style={{ fontSize: '1.5rem' }}
            >
              VIEW MORE
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
