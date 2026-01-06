import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Brain, Zap, Shield, Gamepad2, Timer, Trophy, Lock, Server, FileText } from 'lucide-react';
import atscorePreview from '@/assets/atscore-preview.png';
import neonrunPreview from '@/assets/neonrun-preview.png';
import pdfutilsPreview from '@/assets/pdfutils-preview.png';

const projects = [
  {
    title: 'ATScore',
    description: 'AI-powered ATS Resume Analyzer that helps job seekers optimize their resumes for Applicant Tracking Systems. Upload your resume, paste the job description, and get instant feedback on keyword matching and optimization suggestions.',
    tags: ['AI/ML', 'NLP', 'React', 'Full-Stack'],
    features: [
      { icon: Brain, text: 'AI-powered keyword extraction' },
      { icon: Zap, text: 'Instant results in seconds' },
      { icon: Shield, text: 'Privacy-first - data never stored' },
    ],
    link: 'https://atscore.vercel.app',
    image: atscorePreview,
  },
  {
    title: 'PDF Utils',
    description: 'A privacy-first PDF toolkit that allows users to perform common PDF operations directly in the browser without uploading files to external servers. Merge, split, and manipulate PDFs with complete data privacy.',
    tags: ['React', 'Privacy', 'Vercel', 'Client-side'],
    features: [
      { icon: Lock, text: 'Local processing - files stay on device' },
      { icon: Server, text: 'Zero upload - no server file handling' },
      { icon: FileText, text: 'Auto-cleanup when tab closes' },
    ],
    link: 'https://mypdfutil.vercel.app',
    image: pdfutilsPreview,
  },
  {
    title: 'Neon Run',
    description: 'A fast-paced endless runner game with neon aesthetics. One button, infinite attempts. Jump over obstacles as the speed increases every 10 seconds. How far can you go?',
    tags: ['Game', 'JavaScript', 'Canvas', 'Web'],
    features: [
      { icon: Gamepad2, text: 'One-button gameplay' },
      { icon: Timer, text: 'Progressive difficulty' },
      { icon: Trophy, text: 'High score tracking' },
    ],
    link: 'https://auto-jump-blast.vercel.app',
    image: neonrunPreview,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Projects
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              What I've Built
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Real-world applications combining AI/ML with practical web development
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="space-y-12">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
              >
                <div className="relative rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-all duration-500">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative p-8 md:p-10">
                    <div className="flex flex-col lg:flex-row gap-8">
                      {/* Content */}
                      <div className="flex-1 space-y-6">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                              {project.title}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {project.tags.map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 p-3 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group/link"
                          >
                            <ExternalLink className="w-5 h-5 group-hover/link:rotate-12 transition-transform" />
                          </a>
                        </div>

                        <p className="text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>

                        {/* Features */}
                        <div className="grid sm:grid-cols-3 gap-4">
                          {project.features.map((feature, featureIndex) => (
                            <div
                              key={featureIndex}
                              className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/30"
                            >
                              <feature.icon className="w-5 h-5 text-primary flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">
                                {feature.text}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* CTA */}
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all duration-300 hover:gap-3"
                        >
                          View Live Project
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>

                      {/* Preview Image */}
                      {project.image && (
                        <div className="lg:w-[400px] flex-shrink-0">
                          <div className="relative rounded-xl overflow-hidden border border-border/30 bg-background/50 shadow-lg">
                            <img
                              src={project.image}
                              alt={`${project.title} preview`}
                              className="w-full h-auto object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
