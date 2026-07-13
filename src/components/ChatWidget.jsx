import { useEffect, useRef, useState } from 'react';
import { MessageSquare, X, Send, CalendarClock } from 'lucide-react';
import { getFallbackReply } from '../lib/chatFallback.js';

function encode(data) {
  return Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join('&');
}

const GREETING = {
  role: 'assistant',
  text: "Hi — I'm the Crude HR assistant. Ask me about services, who we work with, or the live demo, and I can set up a free 30-minute workflow review with Brittany.",
};

const QUICK_PROMPTS = [
  'What services do you offer?',
  'Who do you work with?',
  'Book an intro meeting',
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingStatus, setBookingStatus] = useState('idle');
  const [bookingForm, setBookingForm] = useState({ name: '', company: '', email: '', note: '' });
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, showBooking, bookingStatus, sending, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const askAssistant = async (history) => {
    const apiMessages = history
      .map((m) => ({ role: m.role, content: m.text }))
      .filter((m, i, arr) => arr.findIndex((x) => x.role === 'user') <= i); // drop leading assistant greeting
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: apiMessages }),
    });
    if (!res.ok) throw new Error(`chat api ${res.status}`);
    const data = await res.json();
    if (typeof data.reply !== 'string') throw new Error('bad reply');
    return data.reply;
  };

  const send = async (rawText) => {
    const text = rawText.trim();
    if (!text || sending) return;
    const history = [...messages, { role: 'user', text }];
    setMessages(history);
    setInput('');
    setSending(true);
    try {
      let reply = await askAssistant(history);
      let book = false;
      if (reply.includes('[BOOK]')) {
        book = true;
        reply = reply.replaceAll('[BOOK]', '').trim();
      }
      setMessages([...history, { role: 'assistant', text: reply }]);
      if (book) setShowBooking(true);
    } catch {
      const fallback = getFallbackReply(text);
      setMessages([...history, { role: 'assistant', text: fallback.text }]);
      if (fallback.book) setShowBooking(true);
    } finally {
      setSending(false);
    }
  };

  const updateBooking = (e) =>
    setBookingForm({ ...bookingForm, [e.target.name]: e.target.value });

  const submitBooking = async (e) => {
    e.preventDefault();
    setBookingStatus('sending');
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'meeting-request', ...bookingForm }),
      });
      setBookingStatus('done');
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `Got it, ${bookingForm.name.split(' ')[0]} — Brittany will reach out within one business day to set a time.`,
        },
      ]);
      setShowBooking(false);
    } catch {
      setBookingStatus('error');
    }
  };

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="btn-accent fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg shadow-black/40"
      >
        {open ? <X size={22} /> : <MessageSquare size={22} />}
      </button>

      {/* Panel */}
      {open && (
        <div
          className="fixed bottom-24 right-5 z-50 flex w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded border border-edge bg-charcoal shadow-2xl shadow-black/60"
          style={{ height: 'min(560px, calc(100vh - 8rem))' }}
        >
          <div className="border-b border-edge bg-steel/40 px-4 py-3">
            <div className="font-display text-lg font-bold uppercase tracking-wide">
              Crude HR Assistant
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted">
              Questions &amp; workflow review booking
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === 'user'
                    ? 'ml-8 rounded border border-accent/40 bg-accent/10 px-3 py-2 text-sm leading-relaxed text-body'
                    : 'mr-8 rounded border border-edge bg-navy px-3 py-2 text-sm leading-relaxed text-body'
                }
              >
                {m.text}
              </div>
            ))}

            {sending && (
              <div className="mr-8 rounded border border-edge bg-navy px-3 py-2 font-mono text-xs uppercase tracking-widest text-muted">
                Typing…
              </div>
            )}

            {messages.length === 1 && !sending && (
              <div className="flex flex-wrap gap-2">
                {QUICK_PROMPTS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    className="rounded border border-edge bg-steel/40 px-3 py-1.5 font-mono text-xs text-body transition-colors hover:border-accent"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {showBooking && bookingStatus !== 'done' && (
              <form
                name="meeting-request"
                method="POST"
                data-netlify="true"
                onSubmit={submitBooking}
                className="mr-4 grid gap-2 rounded border border-accent/40 bg-navy p-3"
              >
                <input type="hidden" name="form-name" value="meeting-request" />
                <div className="flex items-center gap-2">
                  <CalendarClock size={15} className="text-accent" />
                  <span className="font-mono text-xs font-semibold uppercase tracking-widest text-body">
                    Book your free review
                  </span>
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Name"
                  value={bookingForm.name}
                  onChange={updateBooking}
                  className="w-full border border-edge bg-charcoal px-3 py-2 text-sm text-body placeholder:text-muted/70 focus:border-accent focus:outline-none"
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  value={bookingForm.company}
                  onChange={updateBooking}
                  className="w-full border border-edge bg-charcoal px-3 py-2 text-sm text-body placeholder:text-muted/70 focus:border-accent focus:outline-none"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email"
                  value={bookingForm.email}
                  onChange={updateBooking}
                  className="w-full border border-edge bg-charcoal px-3 py-2 text-sm text-body placeholder:text-muted/70 focus:border-accent focus:outline-none"
                />
                <textarea
                  name="note"
                  rows={2}
                  placeholder="The process you want reviewed + preferred times"
                  value={bookingForm.note}
                  onChange={updateBooking}
                  className="w-full border border-edge bg-charcoal px-3 py-2 text-sm text-body placeholder:text-muted/70 focus:border-accent focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={bookingStatus === 'sending'}
                  className="btn-accent rounded px-4 py-2 font-mono text-xs font-semibold uppercase tracking-widest text-white disabled:opacity-60"
                >
                  {bookingStatus === 'sending' ? 'Sending…' : 'Request meeting'}
                </button>
                {bookingStatus === 'error' && (
                  <p className="text-xs text-accent">
                    Something went wrong — try again, or use the contact page.
                  </p>
                )}
              </form>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-edge bg-steel/40 px-3 py-3"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about services, booking…"
              aria-label="Chat message"
              className="min-w-0 flex-1 border border-edge bg-navy px-3 py-2 text-sm text-body placeholder:text-muted/70 focus:border-accent focus:outline-none"
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              aria-label="Send message"
              className="btn-accent flex h-9 w-9 shrink-0 items-center justify-center rounded text-white disabled:opacity-50"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
