'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'

/* ─── Animated counter ──────────────────────────────────────────── */
function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })
    const count = useMotionValue(0)
    const rounded = useTransform(count, (v) => Math.round(v))

    useEffect(() => {
        if (!inView) return
        const controls = animate(count, to, { duration: 2, ease: 'easeOut' })
        return controls.stop
    }, [inView, count, to])

    return (
        <span ref={ref}>
            <motion.span>{rounded}</motion.span>
            {suffix}
        </span>
    )
}

/* ─── Gradient text helper ──────────────────────────────────────── */
const goldGradientStyle = {
    background: 'linear-gradient(135deg, #8B6914 20%, #E8C96A 50%, #8B6914 80%)',
    WebkitBackgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    backgroundClip: 'text' as const,
}

/* ─── Marquee text ──────────────────────────────────────────────── */
const marqueeText =
    'عود هندي · ورد الطائف · زعفران فارسي · عنبر طبيعي · صندل ميسور · مسك أبيض · أيرس فلورنسا · بيرغموت إيطالي · '

export default function Story() {
    return (
        <section id="story" className="bg-obsidian py-20 sm:py-32">

            {/* ════════════════════════════════════════════════════════
          PART 1 — Cinematic Quote Block
      ════════════════════════════════════════════════════════ */}
            <div
                className="relative text-center py-16 sm:py-24 px-6 sm:px-10 overflow-hidden"
                style={{
                    background:
                        'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)',
                }}
            >
                {/* Giant decorative Arabic quote mark — smaller on mobile */}
                <span
                    aria-hidden="true"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display
                     leading-none pointer-events-none select-none"
                    style={{ fontSize: 'clamp(120px, 30vw, 200px)', color: 'rgba(201,168,76,0.05)' }}
                >
                    "
                </span>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 max-w-4xl mx-auto"
                >
                    {/* Thin gold line above */}
                    <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-10" />

                    {/* Quote */}
                    <blockquote
                        className="font-display italic text-ivory leading-snug"
                        style={{ fontSize: 'clamp(22px, 4vw, 48px)' }}
                    >
                        لم نصنع عطراً — نحن نصنع ذكريات لا تُنسى
                    </blockquote>

                    {/* Attribution */}
                    <p className="font-body text-[12px] tracking-[0.4em] text-mist mt-8">
                        مؤسس لوكسورا  
                    </p>
                </motion.div>
            </div>

            {/* ════════════════════════════════════════════════════════
          PART 2 — Brand Heritage Split Layout
      ════════════════════════════════════════════════════════ */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* ── Text column — order-1 (always first on mobile) ──── */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="order-1"
                    >
                        {/* Section label */}
                        <div className="flex items-center gap-4 mb-6">
                            <span className="block w-16 h-px bg-gradient-to-r from-transparent to-gold/40" />
                            <span className="font-body text-[11px] tracking-[0.5em] text-gold">
                                — قصتنا —
                            </span>
                        </div>

                        {/* Heading */}
                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ivory leading-tight mb-8">
                            وُلدت من شغف
                            <br />
                            <span style={goldGradientStyle}>لا حدود له</span>
                        </h2>

                        {/* Body paragraphs */}
                        <p className="font-body text-sm sm:text-[15px] text-mist leading-[1.9] mb-6">
                            في قلب الجزائر، ولدت لوكسورا لتكون جسراً يربط بين أصالة الأرض وعالم العطور الحديثة. رؤيتنا ليست مجرد ابتكار روائح، بل صياغة هويات عطرية فريدة تحاكي شخصية الإنسان الجزائري المعاصر: الطموح، المتجذر، والأنيق دوماً.
                        </p>
                        <p className="font-body text-sm sm:text-[15px] text-mist leading-[1.9]">
                            اليوم، تعتمد لوكسورا على أكثر من 120 مادة خام نادرة 
                        </p>

                        {/* Gold divider */}
                        <div className="w-16 h-px bg-gradient-to-r from-gold/50 to-transparent my-8" />

                        {/* Stats row — 3 cols on all sizes, but smaller text on mobile */}
                        <div className="grid grid-cols-3 gap-2">
                            {/* Stat 1 */}
                            <div className="flex flex-col items-center text-center">
                                <span
                                    className="font-display text-3xl sm:text-4xl lg:text-5xl leading-none"
                                    style={goldGradientStyle}
                                >
                                    <CountUp to={9} suffix="+" />
                                </span>
                                <span className="font-body text-[10px] sm:text-xs text-mist mt-2 tracking-wide">
                                    سنة خبرة
                                </span>
                            </div>

                            {/* Divider — hidden on mobile */}
                            <div className="hidden sm:block w-px h-10 bg-gold/20 flex-shrink-0 mx-auto mt-3" />
                            {/* Mobile: empty spacer to keep grid aligned */}
                            <div className="sm:hidden" />

                            {/* Stat 2 */}
                            <div className="flex flex-col items-center text-center">
                                <span
                                    className="font-display text-3xl sm:text-4xl lg:text-5xl leading-none"
                                    style={goldGradientStyle}
                                >
                                    <CountUp to={43} />
                                </span>
                                <span className="font-body text-[10px] sm:text-xs text-mist mt-2 tracking-wide">
                                    عطراً حصرياً
                                </span>
                            </div>

                            {/* Divider — hidden on mobile */}
                            <div className="hidden sm:block w-px h-10 bg-gold/20 flex-shrink-0 mx-auto mt-3" />
                            {/* Mobile: empty spacer */}
                            <div className="sm:hidden" />

                            {/* Stat 3 */}
                            {/* <div className="flex flex-col items-center text-center">
                                <span
                                    className="font-display text-3xl sm:text-4xl lg:text-5xl leading-none"
                                    style={goldGradientStyle}
                                >
                                    <CountUp to={12} />
                                </span>
                                <span className="font-body text-[10px] sm:text-xs text-mist mt-2 tracking-wide">
                                    دولة حول العالم
                                </span>
                            </div> */}
                        </div>
                    </motion.div>

                    {/* ── SVG column — order-2 (below text on mobile) ───────── */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        className="flex flex-col items-center gap-6 order-2 opacity-60 lg:opacity-100"
                    >
                        {/* Decorative SVG — smaller on mobile */}
                        <div className="relative w-[260px] h-[260px] lg:w-[400px] lg:h-[400px] max-w-full mx-auto">
                            <svg
                                viewBox="0 0 400 400"
                                fill="none"
                                className="w-full h-full animate-[spin_30s_linear_infinite]"
                            >
                                {/* Outer square rotated 45deg */}
                                <rect
                                    x="60"
                                    y="60"
                                    width="280"
                                    height="280"
                                    stroke="#C9A84C"
                                    strokeOpacity="0.20"
                                    strokeWidth="0.8"
                                    fill="none"
                                    transform="rotate(45 200 200)"
                                />
                                {/* Inner circle 1 */}
                                <circle cx="200" cy="200" r="120" stroke="#C9A84C" strokeOpacity="0.15" strokeWidth="0.6" />
                                {/* Inner circle 2 */}
                                <circle cx="200" cy="200" r="80" stroke="#C9A84C" strokeOpacity="0.10" strokeWidth="0.6" />
                                {/* Diagonal lines from corners of square to circle */}
                                <line x1="200" y1="60" x2="200" y2="120" stroke="#C9A84C" strokeOpacity="0.08" strokeWidth="0.6" />
                                <line x1="340" y1="200" x2="280" y2="200" stroke="#C9A84C" strokeOpacity="0.08" strokeWidth="0.6" />
                                <line x1="200" y1="340" x2="200" y2="280" stroke="#C9A84C" strokeOpacity="0.08" strokeWidth="0.6" />
                                <line x1="60" y1="200" x2="120" y2="200" stroke="#C9A84C" strokeOpacity="0.08" strokeWidth="0.6" />
                                {/* Center diamond */}
                                <polygon
                                    points="200,180 220,200 200,220 180,200"
                                    stroke="#C9A84C"
                                    strokeOpacity="0.30"
                                    strokeWidth="0.8"
                                    fill="rgba(201,168,76,0.05)"
                                />
                            </svg>
                        </div>

                        {/* Decorative brand text */}
                        <span
                            className="font-body text-[11px] tracking-[0.8em] text-mist"
                            style={{ opacity: 0.3 }}
                        >
                            LUXORA
                        </span>
                    </motion.div>
                </div>
            </div>

            {/* ════════════════════════════════════════════════════════
          PART 3 — Full-width scrolling marquee
      ════════════════════════════════════════════════════════ */}
            <div
                className="border-y py-12 sm:py-16 overflow-hidden"
                style={{
                    backgroundColor: '#0F0F0F',
                    borderColor: 'rgba(201,168,76,0.12)',
                }}
            >
                {/* Inject keyframe once via a style tag */}
                <style>{`
          @keyframes marqueeRTL {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-track {
            display: flex;
            width: max-content;
            animation: marqueeRTL 12s linear infinite;
          }
          @media (min-width: 640px) {
            .marquee-track {
              animation-duration: 20s;
            }
          }
        `}</style>

                <div className="marquee-track" aria-hidden="true">
                    {/* Repeat twice for seamless loop */}
                    {[0, 1].map((n) => (
                        <span
                            key={n}
                            className="font-body text-xs sm:text-[13px] tracking-[0.4em] whitespace-nowrap px-8"
                            style={{ color: 'rgba(201,168,76,0.50)' }}
                        >
                            {marqueeText}
                        </span>
                    ))}
                </div>
            </div>

        </section>
    )
}
