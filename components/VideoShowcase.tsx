'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { hoverScale, slideUp } from '@/lib/animations';

type Video = { id: string; title: string; thumbnail: string };

export function VideoShowcase({ videos }: { videos: Video[] }) {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  return (
    <section className="space-y-8">
      {videos.map((video, index) => (
        <motion.article
          key={video.id}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideUp}
          transition={{ delay: index * 0.08 }}
          className="surface overflow-hidden"
          {...hoverScale}
        >
          <button className="block w-full text-left" onClick={() => setActiveVideo(video)}>
            <div className="relative aspect-video w-full">
              <Image src={video.thumbnail} alt={video.title} fill className="object-cover opacity-90" />
            </div>
            <h3 className="p-6 font-serif text-2xl">{video.title}</h3>
          </button>
        </motion.article>
      ))}

      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`}
                  title={activeVideo.title}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
