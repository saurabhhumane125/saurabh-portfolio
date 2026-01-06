import { motion } from 'framer-motion';
import { FileDown, Play, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import portfolioImage from '@/assets/portfolio.png';

export default function Hero() {
  const handleScrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Content */}
      <div className="container-custom relative z-10 pt-20">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-16">
          {/* Text Content */}
          <div className="max-w-3xl flex-1">
          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-sm text-primary font-medium">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              AIML Engineering Student
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="text-foreground">Hi, I'm </span>
            <motion.span 
              className="text-[#22D3EE] inline-block"
              animate={{
                filter: [
                  'drop-shadow(0 0 10px rgba(34,211,238,0.3)) drop-shadow(0 0 20px rgba(34,211,238,0.2))',
                  'drop-shadow(0 0 20px rgba(34,211,238,0.5)) drop-shadow(0 0 40px rgba(34,211,238,0.3))',
                  'drop-shadow(0 0 10px rgba(34,211,238,0.3)) drop-shadow(0 0 20px rgba(34,211,238,0.2))'
                ]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              style={{ willChange: 'filter' }}
            >
              Saurabh
            </motion.span>
            <span className="text-foreground">.</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-light mb-6"
          >
            Aspiring AI/ML Engineer &{' '}
            <span className="text-foreground font-normal">Visual Storyteller</span>
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-muted-foreground mb-10 max-w-xl leading-relaxed"
          >
            AIML student at Pillai College of Engineering, passionate about building 
            intelligent systems. Also a cinematographer and Jt. Videography Head at CSIPCE, 
            blending technology with visual storytelling.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              variant="hero"
              size="lg"
              asChild
              className="group"
            >
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <FileDown className="w-4 h-4" />
                Download Resume
              </a>
            </Button>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-lg bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              <Button
                variant="hero-outline"
                size="lg"
                onClick={() => handleScrollTo('#projects')}
                className="relative group overflow-hidden"
              >
                <span className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Code2 className="w-4 h-4 relative z-10" />
                <span className="relative z-10">View Projects</span>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-lg bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              <Button
                variant="hero-outline"
                size="lg"
                onClick={() => handleScrollTo('#visuals')}
                className="relative group overflow-hidden"
              >
                <span className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Play className="w-4 h-4 relative z-10" />
                <span className="relative z-10">View Visual Work</span>
              </Button>
            </motion.div>
          </motion.div>
        </div>

          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-shrink-0"
          >
            <div className="relative">
              {/* Outer glow effect */}
              <div className="absolute inset-0 rounded-full bg-primary/30 blur-2xl scale-110 animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl scale-125" />
              
              {/* Profile image container */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-primary/50 shadow-[0_0_40px_rgba(34,211,238,0.3)]">
                <img
                  src={portfolioImage}
                  alt="Saurabh - AI/ML Engineer"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              
              {/* Animated ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/40"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.2, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
        >
          <div className="w-1 h-2 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
