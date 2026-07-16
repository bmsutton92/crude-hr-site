import { useParams, Link } from 'react-router-dom';
import { marked } from 'marked';
import { ArrowLeft } from 'lucide-react';
import { getPost } from '../lib/posts.js';
import CTASection from '../components/CTASection.jsx';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);

  if (!post) {
    return (
      <section className="py-24 text-center">
        <h1 className="font-display text-3xl font-bold uppercase">Post not found</h1>
        <Link to="/blog" className="mt-4 inline-block font-mono text-xs uppercase tracking-widest text-accent">
          ← Back to the blog
        </Link>
      </section>
    );
  }

  return (
    <>
      <article className="border-b border-edge py-16">
        <div className="mx-auto max-w-3xl px-5">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted hover:text-accent"
          >
            <ArrowLeft size={14} /> All posts
          </Link>
          <h1 className="mt-8 font-display text-4xl font-bold uppercase leading-tight tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-widest text-muted">
            <span className="text-accent">By {post.author}</span>
            {post.dateDisplay && (
              <>
                <span aria-hidden="true">/</span>
                <time dateTime={post.date}>Published {post.dateDisplay}</time>
              </>
            )}
          </div>
          <div
            className="prose-crude mt-10"
            dangerouslySetInnerHTML={{ __html: marked.parse(post.body) }}
          />
        </div>
      </article>
      <CTASection compact heading="Recognize your back office in this post?" />
    </>
  );
}
