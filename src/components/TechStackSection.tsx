import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code, Monitor, Server, Brain, Wrench, Smartphone } from 'lucide-react';

const techCategories = [
  {
    icon: Monitor,
    title: 'Frontend',
    items: ['HTML', 'CSS', 'JavaScript', 'React', 'React Native', 'Tailwind CSS'],
  },
  {
    icon: Server,
    title: 'Backend',
    items: ['Node.js', 'Express.js', 'REST APIs', 'Firebase (Authentication, Database, Storage)'],
  },
  {
    icon: Brain,
    title: 'AI / Applied AI',
    items: ['Python', 'Gemini API', 'OpenAI API', 'Prompt Engineering', 'Image & Text Analysis (API-based)'],
  },
  {
    icon: Smartphone,
    title: 'Mobile / Cross-Platform',
    items: ['Flutter (Dart)', 'UI & Layout Design', 'API Integration', 'Firebase Integration'],
  },
  {
    icon: Wrench,
    title: 'Tools & Platforms',
    items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Figma', 'Vercel', 'Cloudinary / Firebase Storage'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function TechStackSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="techstack" className="section-padding relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 neural-grid opacity-30" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-sm text-primary font-medium mb-4">
            <Code className="w-4 h-4" />
            Tech Stack
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Technologies and tools I use to build modern, scalable applications.
          </p>
        </motion.div>

        {/* Tech Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {techCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="glass rounded-xl p-6 card-3d group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <category.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <motion.span
                    key={item}
                    className="px-3 py-1.5 text-sm rounded-md bg-muted/50 text-muted-foreground relative overflow-hidden group/item cursor-default"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="absolute inset-0 bg-primary/20 blur-md opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    <span className="relative z-10 group-hover/item:text-primary transition-colors">{item}</span>
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
