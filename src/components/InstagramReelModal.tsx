import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Loader2, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InstagramReelModalProps {
  isOpen: boolean;
  onClose: () => void;
  reelUrl: string | null;
}

// Extract reel ID from Instagram URL
function extractReelId(url: string): string | null {
  const match = url.match(/\/reel\/([^/?]+)/);
  return match ? match[1] : null;
}

export default function InstagramReelModal({ isOpen, onClose, reelUrl }: InstagramReelModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Disable background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsLoading(true);
      setIframeLoaded(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, reelUrl]);

  const reelId = reelUrl ? extractReelId(reelUrl) : null;
  const embedUrl = reelId ? `https://www.instagram.com/reel/${reelId}/embed/` : null;

  const handleOpenInstagram = () => {
    if (reelUrl) {
      window.open(reelUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    setIframeLoaded(true);
  };

  return (
    <AnimatePresence>
      {isOpen && reelUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 hover:bg-primary/10"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </Button>

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md md:max-w-lg aspect-[9/16] max-h-[85vh] rounded-xl overflow-hidden shadow-2xl border border-border/50 bg-card"
            onClick={(e) => e.stopPropagation()}
          >
            {embedUrl && (
              <>
                {/* Loading state */}
                {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10 bg-card">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    <p className="text-muted-foreground">Loading reel...</p>
                  </div>
                )}
                
                {/* Instagram embed iframe */}
                <iframe
                  ref={iframeRef}
                  src={embedUrl}
                  className="w-full h-full bg-card"
                  frameBorder="0"
                  scrolling="no"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title="Instagram Reel"
                  onLoad={handleIframeLoad}
                />
                
                {/* Floating play on Instagram button - always visible after load */}
                {iframeLoaded && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleOpenInstagram}
                      className="gap-2 bg-background/90 backdrop-blur-sm hover:bg-background shadow-lg"
                    >
                      <Play className="w-4 h-4" />
                      Play on Instagram
                    </Button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
