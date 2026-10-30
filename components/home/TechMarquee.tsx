const stack = [
  { name: "Next.js", slug: "nextdotjs" },
  { name: "React", slug: "react" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "Python", slug: "python" },
  { name: "FastAPI", slug: "fastapi" },
  { name: "LangChain", slug: "langchain" },
  { name: "OpenAI", slug: "openai" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "Flutter", slug: "flutter" },
  { name: "Firebase", slug: "firebase" },
  { name: "Docker", slug: "docker" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "Figma", slug: "figma" },
  { name: "n8n", slug: "n8n" },
];

export function TechMarquee() {
  const row = [...stack, ...stack];
  return (
    <section className="relative border-y border-border bg-ink/40 py-10">
      <p className="mb-7 text-center text-sm text-text-3">Built on a modern, proven stack</p>
      <div className="group mask-fade-x overflow-hidden">
        <ul className="flex w-max animate-marquee items-center gap-12 pr-12 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {row.map((t, i) => (
            <li key={`${t.slug}-${i}`} aria-hidden={i >= stack.length} className="flex items-center gap-3 text-text-2">
              <img
                src={`/icons/${t.slug}.svg`}
                alt=""
                width={22}
                height={22}
                loading="lazy"
                className="h-[22px] w-[22px] opacity-80"
              />
              <span className="whitespace-nowrap text-[15px] font-medium">{t.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
