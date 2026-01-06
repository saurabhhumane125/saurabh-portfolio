import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { User, Code2, Camera, Users, Brain } from 'lucide-react';

const journeySteps = [
  {
    icon: Code2,
    title: 'Started Programming',
    description: 'Began learning web development fundamentals - HTML, CSS, JavaScript, and React.',
    color: 'primary',
  },
  {
    icon: Camera,
    title: 'Discovered Visual Storytelling',
    description: 'Developed passion for cinematography and photography, started taking freelance projects.',
    color: 'secondary',
  },
  {
    icon: Users,
    title: 'Became Jt.Videography Head',
    description: 'Took on leadership role at CSIPCE, managing event videography and coordinating teams.',
    color: 'primary',
  },
  {
    icon: Brain,
    title: 'Diving into AI/ML',
    description: 'Currently focused on AI/ML fundamentals, planning to build intelligent systems and deploy them as web apps.',
    color: 'secondary',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

export default function JourneySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="journey" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 neural-grid opacity-20" />
      

      <div className="container-custom relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-sm text-primary font-medium mb-4">
            <User className="w-4 h-4" />
            About Me
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            An AIML engineering student at Pillai College of Engineering, on a mission to 
            combine the power of artificial intelligence with creative visual storytelling.
          </p>
        </motion.div>

        {/* About Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl p-8 mb-16 max-w-3xl mx-auto"
        >
          <p className="text-lg text-muted-foreground leading-relaxed">
            My journey into technology began with curiosity about how things work — from websites 
            to intelligent systems. While exploring programming, I discovered my parallel passion for 
            cinematography and photography. Today, I see these skills as complementary: the attention 
            to detail and storytelling mindset from visual work enhances my approach to building AI solutions. 
            As Videography Head at CSIPCE, I've learned to lead teams and manage projects — skills that 
            translate directly to handling complex AI/ML projects.
          </p>
        </motion.div>


        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative max-w-3xl mx-auto"
        >
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-primary/30 md:-translate-x-px" />

          {journeySteps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={itemVariants}
              className={`relative flex items-start gap-6 mb-12 last:mb-0 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Icon */}
              <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.color === 'primary' ? 'bg-primary glow-cyan-sm' : 'bg-secondary glow-indigo'
                }`}>
                  <step.icon className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>

              {/* Horizontal connector line from card to center */}
              <div 
                className={`hidden md:block absolute top-4 h-px w-8 ${
                  step.color === 'primary' ? 'bg-primary' : 'bg-secondary'
                } ${
                  index % 2 === 0 
                    ? 'right-1/2 mr-4' 
                    : 'left-1/2 ml-4'
                }`}
              />

              {/* Content */}
              <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:pl-8'
              }`}>
                <div className="glass rounded-xl p-6 card-3d">
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>

              {/* Spacer for desktop */}
              <div className="hidden md:block md:w-[calc(50%-2rem)]" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
