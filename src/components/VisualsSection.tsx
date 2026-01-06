import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Camera, Play, Film, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InstagramReelModal from './InstagramReelModal';

// Import thumbnails
import featuredShowreelImg from '@/assets/visuals/featured_showreel.jpg';
import cinematicShot1 from '@/assets/visuals/cinematic_shot_1.jpg';
import cinematicShot2 from '@/assets/visuals/cinematic_shot_2.jpg';
import cinematicShot3 from '@/assets/visuals/cinematic_shot_3.jpg';
import cinematicShot4 from '@/assets/visuals/cinematic_shot_4.jpg';
import cinematicShot5 from '@/assets/visuals/cinematic_shot_5.jpg';
import cinematicShot6 from '@/assets/visuals/cinematic_shot_6.jpg';

// Gallery items with reel URLs
const galleryItems = [
  { id: 1, thumbnail: cinematicShot1, alt: 'Cinematic shot 1', reelUrl: 'https://www.instagram.com/reel/DTDRvNajJt9/' },
  { id: 2, thumbnail: cinematicShot2, alt: 'Cinematic shot 2', reelUrl: 'https://www.instagram.com/reel/DTDWV0QjO-z/' },
  { id: 3, thumbnail: cinematicShot3, alt: 'Cinematic shot 3', reelUrl: 'https://www.instagram.com/reel/DTDSinsDJ5I/' },
  { id: 4, thumbnail: cinematicShot4, alt: 'Cinematic shot 4', reelUrl: 'https://www.instagram.com/reel/DTDWkeDDFMR/' },
  { id: 5, thumbnail: cinematicShot5, alt: 'Cinematic shot 5', reelUrl: 'https://www.instagram.com/reel/DTDSGtrDKWn/' },
  { id: 6, thumbnail: cinematicShot6, alt: 'Cinematic shot 6', reelUrl: 'https://www.instagram.com/reel/DTDTJGyjFJe/' },
];

const featuredShowreel = {
  thumbnail: featuredShowreelImg,
  alt: 'Featured Showreel',
  reelUrl: 'https://www.instagram.com/reel/DTDROnMjPbm/',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function VisualsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedReel, setSelectedReel] = useState<string | null>(null);

  return (
    <section id="visuals" className="section-padding relative bg-card/30">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />

      <div className="container-custom relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-sm text-primary font-medium mb-4">
            <Camera className="w-4 h-4" />
            Visual Work
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Cinematography & <span className="gradient-text">Photography</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            As a cinematographer, photographer, and Jt. Videography Head at CSIPCE,
            I blend technical expertise with creative vision to tell compelling visual stories.
          </p>
        </motion.div>

        {/* Role Highlights */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          <motion.div variants={itemVariants} className="glass rounded-xl p-6 card-3d">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Film className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Jt. Videography Head</h3>
                <p className="text-sm text-muted-foreground">CSIPCE Committee</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              Leading event videography, coordinating shoots, and managing a team of 
              videographers and editors for college events and festivals.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="glass rounded-xl p-6 card-3d">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Freelance Work</h3>
                <p className="text-sm text-muted-foreground">Cinematographer & Photographer</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              Capturing moments through lenses, from event coverage to creative 
              shoots, delivering polished content to clients.
            </p>
          </motion.div>
        </motion.div>

        {/* Showreel Card */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="glass rounded-2xl p-8 mb-16 relative overflow-hidden group cursor-pointer"
          onClick={() => setSelectedReel(featuredShowreel.reelUrl)}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-3">Featured Showreel</h3>
              <p className="text-muted-foreground mb-6">
                A compilation of my best cinematography work, featuring event coverage, 
                creative projects, and visual storytelling.
              </p>
              <Button 
                variant="hero" 
                size="lg" 
                className="group/btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedReel(featuredShowreel.reelUrl);
                }}
              >
                <Play className="w-5 h-5" />
                Play Showreel
              </Button>
            </div>
            
            {/* Video thumbnail */}
            <div className="w-full md:w-80 h-48 rounded-xl bg-muted/50 flex items-center justify-center border border-border/50 overflow-hidden relative">
              <img 
                src={featuredShowreel.thumbnail} 
                alt={featuredShowreel.alt}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center glow-cyan hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-primary-foreground ml-1" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Gallery */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h3 variants={itemVariants} className="text-xl font-semibold mb-6 text-center">
            Gallery
          </motion.h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => setSelectedReel(item.reelUrl)}
              >
                <img
                  src={item.thumbnail}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/50 rounded-xl transition-colors duration-300" />
                
                {/* Play icon overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center glow-cyan">
                    <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Instagram Reel Modal */}
      <InstagramReelModal
        isOpen={!!selectedReel}
        onClose={() => setSelectedReel(null)}
        reelUrl={selectedReel}
      />
    </section>
  );
}
