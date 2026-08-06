import { Signal, Wifi, BatteryFull } from 'lucide-react';
import dashboardShot from '../assets/demo-phone-dashboard.webp';
import detailShot from '../assets/demo-phone-detail.webp';

// A single iPhone-style device frame wrapping a demo app screenshot, with a
// faux iOS status bar and dynamic island so the captures read as a live phone.
function Phone({ src, alt, className = '', priority = false }) {
  return (
    <div className={`select-none ${className}`}>
      <div className="rounded-[2.3rem] bg-gradient-to-b from-steel via-charcoal to-navy p-[3px] shadow-2xl shadow-black/70 ring-1 ring-white/5">
        <div className="rounded-[2.1rem] bg-black p-[5px]">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-zinc-950">
            {/* Faux status bar */}
            <div className="relative z-10 flex items-center justify-between bg-zinc-950 px-5 pb-1 pt-2 text-[9px] font-semibold text-zinc-200">
              <span className="tracking-tight">9:41</span>
              <span className="flex items-center gap-1 text-zinc-300">
                <Signal size={9} />
                <Wifi size={9} />
                <BatteryFull size={11} />
              </span>
            </div>
            {/* Dynamic island */}
            <div className="pointer-events-none absolute left-1/2 top-[7px] z-20 h-[15px] w-[52px] -translate-x-1/2 rounded-full bg-black" />
            <img
              src={src}
              alt={alt}
              loading={priority ? 'eager' : 'lazy'}
              className="block w-full"
            />
            {/* Subtle screen sheen */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Two overlapping phones — an angled screen behind, an upright screen in
// front — showing the live field-ticketing demo (dashboard + approved ticket).
export default function DemoPhones() {
  return (
    <div className="relative mx-auto h-[520px] w-[330px]">
      {/* Ambient accent glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl" />

      {/* Back / angled phone — approved ticket detail */}
      <Phone
        src={detailShot}
        alt="Crude HR demo: approved field ticket detail with bonus payout"
        className="absolute left-0 top-14 w-[186px] -rotate-[13deg]"
      />

      {/* Front / upright phone — live ticket dashboard */}
      <Phone
        src={dashboardShot}
        alt="Crude HR demo: live field-ticket dashboard and pipeline"
        priority
        className="absolute right-0 top-0 z-20 w-[208px] rotate-[3deg]"
      />
    </div>
  );
}
