import { VideoShowcase } from '@/components/VideoShowcase';

const videos = [
  { id: 'dQw4w9WgXcQ', title: 'Nocturne in Quiet Light', thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' },
  { id: '3fumBcKC6RE', title: 'Improvisation: Rain and Glass', thumbnail: 'https://i.ytimg.com/vi/3fumBcKC6RE/maxresdefault.jpg' },
  { id: 'J---aiyznGQ', title: 'Studio Session: Midnight Etude', thumbnail: 'https://i.ytimg.com/vi/J---aiyznGQ/maxresdefault.jpg' }
];

export const metadata = {
  title: 'Music Showcase',
  description: 'Cinematic piano performances and compositions.'
};

export default function MusicPage() {
  return (
    <section>
      <h1 className="mb-10 font-serif text-5xl">Music Showcase</h1>
      <VideoShowcase videos={videos} />
    </section>
  );
}
