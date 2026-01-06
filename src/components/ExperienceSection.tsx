import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Film, Camera, Brain, ChevronRight } from 'lucide-react';

const experiences = [
  {
    icon: Film,
    title: 'Jt. Videography Head',
    organization: 'CSIPCE (Computer Society of India - PCE)',
    period: 'Current',
    color: 'primary',
    responsibilities: [
      'Led videography for college events and tech festivals',
      'Coordinated a team of videographers and editors',
      'Managed pre-production planning through post-production delivery',
      'Established streamlined workflow for content creation',
    ],
  },
  {
    icon: Camera,
    title: 'Freelance Cinematographer & Photographer',
    organization: 'Self-employed',
    period: 'Ongoing',
    color: 'secondary',
    responsibilities: [
      'Shot and edited event videos and photos for clients',
      'Collaborated with clients to understand vision and deliver content',
      'Managed end-to-end project delivery and client communication',
      'Built portfolio of diverse visual content',
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="section-padding relative bg-card/30">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-sm text-primary font-medium mb-4">
            <Briefcase className="w-4 h-4" />
            Experience
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Roles & <span className="gradient-text">Responsibilities</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Leadership experience and creative work that shapes my approach to 
            technology and teamwork.
          </p>
        </motion.div>

        {/* Experience Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid gap-6 max-w-4xl mx-auto"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              variants={itemVariants}
              className={`glass rounded-2xl p-6 md:p-8 card-3d relative overflow-hidden ${
                exp.color === 'muted' ? 'opacity-75' : ''
              }`}
            >
              {/* Accent border */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                exp.color === 'primary' ? 'bg-primary' : 
                exp.color === 'secondary' ? 'bg-secondary' : 'bg-muted-foreground'
              }`} />

              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${
                  exp.color === 'primary' ? 'bg-primary/10' : 
                  exp.color === 'secondary' ? 'bg-secondary/10' : 'bg-muted'
                }`}>
                  <exp.icon className={`w-7 h-7 ${
                    exp.color === 'primary' ? 'text-primary' : 
                    exp.color === 'secondary' ? 'text-secondary' : 'text-muted-foreground'
                  }`} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{exp.title}</h3>
                      <p className="text-muted-foreground">{exp.organization}</p>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      exp.color === 'primary' ? 'bg-primary/10 text-primary border border-primary/30' : 
                      exp.color === 'secondary' ? 'bg-secondary/10 text-secondary border border-secondary/30' : 
                      'bg-muted text-muted-foreground border border-border'
                    }`}>
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground">
                        <ChevronRight className={`w-4 h-4 mt-1 shrink-0 ${
                          exp.color === 'primary' ? 'text-primary' : 
                          exp.color === 'secondary' ? 'text-secondary' : 'text-muted-foreground'
                        }`} />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
