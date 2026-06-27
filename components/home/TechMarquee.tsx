export function TechMarquee() {
  const row1 = [
    { name: "React", url: "https://cdn.simpleicons.org/react/61DAFB" },
    { name: "Next.js", url: "https://cdn.simpleicons.org/nextdotjs/FFFFFF" },
    { name: "Node.js", url: "https://cdn.simpleicons.org/nodedotjs/5FA04E" },
    { name: "Python", url: "https://cdn.simpleicons.org/python/3776AB" },
    { name: "TypeScript", url: "https://cdn.simpleicons.org/typescript/3178C6" },
    { name: "PostgreSQL", url: "https://cdn.simpleicons.org/postgresql/4169E1" },
    { name: "MongoDB", url: "https://cdn.simpleicons.org/mongodb/47A248" },
    { name: "AWS", url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  ];

  const row2 = [
    { name: "Docker", url: "https://cdn.simpleicons.org/docker/2496ED" },
    { name: "Figma", url: "https://cdn.simpleicons.org/figma/F24E1E" },
    { name: "TailwindCSS", url: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
    { name: "FastAPI", url: "https://cdn.simpleicons.org/fastapi/009688" },
    { name: "Flutter", url: "https://cdn.simpleicons.org/flutter/02569B" },
    { name: "Firebase", url: "https://cdn.simpleicons.org/firebase/FFCA28" },
    { name: "GitHub", url: "https://cdn.simpleicons.org/github/FFFFFF" },
    { name: "n8n", url: "https://cdn.simpleicons.org/n8n/EA4B71" },
  ];

  const MarqueeRow = ({ items, reverse = false }: { items: typeof row1; reverse?: boolean }) => (
    <div className="flex overflow-hidden group w-full relative">
      <div
        className={`flex w-max items-center gap-16 pr-16 ${reverse ? "animate-marquee-reverse" : "animate-marquee"} group-hover:[animation-play-state:paused]`}
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center justify-center w-32 h-16 group/logo">
            <img
              src={item.url}
              alt={item.name}
              title={item.name}
              width={32}
              height={32}
              className="opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300 group-hover/logo:opacity-100 group-hover/logo:grayscale-0"
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="py-24 bg-bg overflow-hidden relative border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand mb-2">Tech Stack</p>
        <h2 className="text-3xl font-semibold text-white mb-2">Built with the best tools</h2>
        <p className="text-slate-400 text-sm">Modern, battle-tested technologies used across every project</p>
      </div>

      <div className="relative w-full max-w-[100vw] mx-auto flex flex-col gap-8">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg to-transparent z-10" />
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>
    </section>
  );
}
