import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function BlogCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="flex h-full flex-col border border-edge bg-steel/40 p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-accent/60"
    >
      <div className="font-mono text-[11px] uppercase tracking-widest text-muted">
        {post.dateDisplay || post.date}
        {post.author ? <span className="text-muted/70"> · {post.author}</span> : null}
      </div>
      <h3 className="mt-2 font-display text-xl font-semibold uppercase leading-snug tracking-wide text-body">
        {post.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
      <span className="mt-auto inline-flex items-center gap-1 pt-4 font-mono text-xs uppercase tracking-widest text-accent">
        Read post <ArrowRight size={13} />
      </span>
    </Link>
  );
}
