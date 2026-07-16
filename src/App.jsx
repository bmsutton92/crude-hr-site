import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import ChatWidget from './components/ChatWidget.jsx';
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import Portfolio from './pages/Portfolio.jsx';
import Blog from './pages/Blog.jsx';
import BlogPost from './pages/BlogPost.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Pricing from './pages/Pricing.jsx';
import { applyHead } from './lib/head.js';

const Demo = lazy(() => import('./pages/Demo.jsx'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Keep the document head (title, meta, canonical, OG, JSON-LD) in sync during
// client-side navigation. The initial HTML is prerendered with the correct
// head; this handles subsequent SPA route changes.
function HeadSync() {
  const { pathname } = useLocation();
  useEffect(() => {
    applyHead(pathname);
  }, [pathname]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const isDemo = pathname === '/demo';

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <HeadSync />
      <Nav />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route
            path="/demo"
            element={
              <Suspense
                fallback={
                  <div className="flex min-h-[50vh] items-center justify-center font-mono text-xs uppercase tracking-widest text-muted">
                    Loading demo…
                  </div>
                }
              >
                <Demo />
              </Suspense>
            }
          />
        </Routes>
      </main>
      {!isDemo && <Footer />}
      {!isDemo && <ChatWidget />}
    </div>
  );
}
