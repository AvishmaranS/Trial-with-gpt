'use client';

import { motion } from 'framer-motion';
import { slideUp } from '@/lib/animations';

export function RevealSection({ title, content }: { title: string; content: string }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      variants={slideUp}
      className="surface mb-8 p-8"
    >
      <h2 className="font-serif text-3xl">{title}</h2>
      <p className="mt-4 leading-relaxed text-textSecondary">{content}</p>
    </motion.section>
  );
}
