import { RevealSection } from '@/components/RevealSection';

const sections = [
  {
    title: 'Introduction',
    content:
      'I build compositions in the spaces between silence and memory. This platform captures that intimate stage experience for listeners and learners.'
  },
  {
    title: 'Musical Background',
    content:
      'Rooted in classical discipline and modern cinematic harmony, my work blends piano storytelling with texture-led composition.'
  },
  {
    title: 'Experience',
    content:
      'From solo recitals to collaborative scores, each performance explores emotional restraint and intentional dynamics.'
  },
  {
    title: 'YouTube Journey',
    content:
      'YouTube became my digital concert hall—a place to share process, performance, and deeply personal experiments in sound.'
  }
];

export default function AboutPage() {
  return (
    <section>
      <h1 className="mb-10 font-serif text-5xl">About</h1>
      {sections.map((section) => (
        <RevealSection key={section.title} title={section.title} content={section.content} />
      ))}
    </section>
  );
}
