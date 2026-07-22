import React from "react";
import { ArrowUpRight, Calendar } from "lucide-react";

export interface NewsCardProps {
  category: string;
  title: string;
  source: string;
  date: string;
  description: string;
  imageUrl?: string;
  linkUrl?: string;
}

export function NewsCard({
  category,
  title,
  source,
  date,
  description,
  imageUrl,
  linkUrl = "#",
}: NewsCardProps) {
  return (
    <a
      href={linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group cs-glow-card relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0F0A38]/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-[#191452] hover:shadow-2xl"
    >
      <div>
        {imageUrl && (
          <div className="mb-4 aspect-video w-full overflow-hidden rounded-xl bg-white/5">
            <img
              src={imageUrl}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              decoding="async"
              width="640"
              height="360"
            />
          </div>
        )}

        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-white/10 px-3 py-1 font-sans text-xs font-medium text-[#DAD7FF]">
            {category}
          </span>
          <span className="flex items-center gap-1 font-sans text-xs text-white/50">
            <Calendar className="h-3 w-3" />
            {date}
          </span>
        </div>

        <h3 className="mt-4 font-serif text-2xl font-medium leading-tight text-white group-hover:text-[#DAD7FF]">
          {title}
        </h3>

        <p className="mt-2 line-clamp-3 font-sans text-sm text-white/70">
          {description}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 font-sans text-xs text-white/60">
        <span className="font-semibold text-white/80">{source}</span>
        <span className="flex items-center gap-1 font-medium text-[#DAD7FF] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          Read Article
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </a>
  );
}
