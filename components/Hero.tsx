'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/lib/animations';

export function Hero() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center text-center">
      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mb-8 h-24 w-24 rounded-full border border-white/20" />
      <motion.h1
        initial="hidden"
        animate="visible"
        variants={slideUp}
        transition={{ delay: 0.2 }}
        className="font-serif text-5xl leading-tight md:text-7xl"
      >
        Avishmaran Pradhan
      </motion.h1>
      <motion.p initial="hidden" animate="visible" variants={slideUp} transition={{ delay: 0.4 }} className="mt-5 text-lg text-textSecondary">
        Composer · Pianist · Creator
      </motion.p>
      <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.6 }} className="mt-10 flex gap-4">
        <Link href="/about" className="rounded-full border border-white/20 px-6 py-3 transition hover:bg-white/10">
          Enter
        </Link>
        <Link href="/music" className="rounded-full bg-white/10 px-6 py-3 transition hover:bg-white/20">
          View Music
        </Link>
      </motion.div>
    </section>
  );
}
