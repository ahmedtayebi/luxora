'use client'

import { motion } from 'framer-motion'

/* ─── Step data ─────────────────────────────────────────────────── */
interface Step {
    number: string
    title: string
    desc: string
    icon: React.ReactNode
}

const steps: Step[] = [
    {
        number: '٠١',
        title: 'اختر عطرك',
        desc: 'تصفح مجموعتنا واختر العطر الذي يعبر عنك',
        icon: (
            <svg viewBox="0 0 48 48" fill="none" stroke="#C9A84C" strokeWidth="1.5" className="w-7 h-7">
                {/* Perfume bottle */}
                <rect x="16" y="18" width="16" height="24" rx="2" />
                <rect x="19" y="10" width="10" height="8" rx="1" />
                <rect x="21" y="6" width="6" height="4" rx="1" fill="rgba(201,168,76,0.3)" stroke="none" />
                <line x1="20" y1="28" x2="28" y2="28" strokeOpacity="0.3" />
                <line x1="20" y1="34" x2="28" y2="34" strokeOpacity="0.3" />
            </svg>
        ),
    },
    {
        number: '٠٢',
        title: 'أكمل نموذج الطلب',
        desc: 'أدخل اسمك ورقم هاتفك واختر ولايتك',
        icon: (
            <svg viewBox="0 0 48 48" fill="none" stroke="#C9A84C" strokeWidth="1.5" className="w-7 h-7">
                {/* Form / clipboard */}
                <rect x="10" y="6" width="28" height="36" rx="2" />
                <rect x="18" y="3" width="12" height="6" rx="1" />
                <line x1="16" y1="17" x2="32" y2="17" />
                <line x1="16" y1="23" x2="28" y2="23" />
                <line x1="16" y1="29" x2="32" y2="29" />
                <line x1="16" y1="35" x2="24" y2="35" />
            </svg>
        ),
    },
    {
        number: '٠٣',
        title: 'نؤكد طلبك',
        desc: 'سيتصل بك فريقنا خلال ٢٤ ساعة لتأكيد الطلب',
        icon: (
            <svg viewBox="0 0 48 48" fill="none" stroke="#C9A84C" strokeWidth="1.5" className="w-7 h-7">
                {/* Phone / call */}
                <path d="M14 8c0 18 8 26 26 26" />
                <path d="M14 8c-2 0-6 2-6 6s2 4 4 4" />
                <path d="M40 34c0 2-2 6-6 6s-4-2-4-4" />
                <circle cx="36" cy="12" r="3" strokeOpacity="0.4" />
                <circle cx="36" cy="12" r="6" strokeOpacity="0.2" strokeDasharray="3 3" />
            </svg>
        ),
    },
    {
        number: '٠٤',
        title: 'نوصل إليك',
        desc: 'توصيل آمن وسريع إلى باب منزلك في جميع الولايات',
        icon: (
            <svg viewBox="0 0 48 48" fill="none" stroke="#C9A84C" strokeWidth="1.5" className="w-7 h-7">
                {/* Gift box */}
                <rect x="8" y="18" width="32" height="22" rx="1" />
                <rect x="6" y="12" width="36" height="8" rx="1" />
                <line x1="24" y1="12" x2="24" y2="40" />
                <path d="M24 12c-2-4-8-6-10-4s0 6 4 6" />
                <path d="M24 12c2-4 8-6 10-4s0 6-4 6" />
            </svg>
        ),
    },
]

/* ─── Animation variants ────────────────────────────────────────── */
const cardVariant = (delay: number) => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
})

export default function HowToOrder() {
    return (
        <section
            id="how-to-order"
            className="py-20 sm:py-28 px-4 sm:px-6 relative"
            style={{
                background: 'linear-gradient(180deg, #070707 0%, #0A0805 50%, #070707 100%)',
            }}
        >
            <div className="max-w-7xl mx-auto">
                {/* ── Header ──────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-16 sm:mb-20"
                >
                    <div className="flex items-center justify-center gap-4 mb-5">
                        <span className="block w-16 h-px bg-gradient-to-r from-transparent to-gold/40" />
                        <span className="font-body text-[11px] tracking-[0.5em] text-gold">
                            — طريقة الطلب —
                        </span>
                        <span className="block w-16 h-px bg-gradient-to-l from-transparent to-gold/40" />
                    </div>
                    <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-ivory leading-tight">
                        بكل سهولة وأناقة
                    </h2>
                    <p className="font-body text-sm sm:text-[15px] text-mist mt-4 px-4">
                        نوصل إلى جميع ولايات الجزائر الـ ٥٨
                    </p>
                </motion.div>

                {/* ── Steps timeline ──────────────────────────────────── */}
                <div className="relative">
                    {/* Desktop dashed connecting line — hidden on mobile */}
                    <div
                        className="hidden lg:block absolute top-[56px] right-[14%] left-[14%] z-0 pointer-events-none"
                        style={{ borderTop: '1px dashed rgba(201,168,76,0.2)' }}
                    />

                    {/* Animated traveling dot (desktop only) */}
                    <motion.div
                        className="hidden lg:block absolute top-[53px] z-[1] w-[6px] h-[6px] rounded-full bg-gold shadow-[0_0_8px_rgba(201,168,76,0.5)]"
                        style={{ right: '14%' }}
                        animate={{ right: ['14%', '86%'] }}
                        transition={{ duration: 3, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
                    />

                    {/* Mobile vertical line — on the left side (RTL: right) */}
                    <div
                        className="lg:hidden absolute top-0 bottom-0 right-[28px] w-px z-0"
                        style={{ borderRight: '1px dashed rgba(201,168,76,0.15)' }}
                    />

                    {/* Steps grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-[2]">
                        {steps.map((step, i) => (
                            <motion.div
                                key={step.number}
                                variants={cardVariant(i * 0.15)}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-80px' }}
                            >
                                {/* Mobile: flex-row layout for better UX */}
                                <div
                                    className="group relative bg-obsidian-card border border-[rgba(201,168,76,0.1)]
                           rounded-[2px]
                           hover:border-gold/30
                           hover:shadow-[0_16px_40px_rgba(0,0,0,0.5),0_0_20px_rgba(201,168,76,0.06)]
                           transition-all duration-500
                           /* Mobile: flex-row with circle + text */
                           flex flex-row items-start gap-4 p-5 pr-5
                           /* On large screens: centered column layout */
                           lg:flex-col lg:items-center lg:p-8 lg:text-center"
                                >
                                    {/* Step number circle — mobile */}
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                             border border-gold/30
                             lg:hidden"
                                        style={{
                                            background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
                                        }}
                                    >
                                        <span className="font-display text-sm text-gold">{step.number}</span>
                                    </div>

                                    {/* Icon wrapper — desktop only */}
                                    <div
                                        className="hidden lg:flex w-16 h-16 rounded-full items-center justify-center mb-5
                             border border-gold-subtle transition-colors duration-500
                             group-hover:border-gold/40"
                                        style={{
                                            background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)',
                                        }}
                                    >
                                        {step.icon}
                                    </div>

                                    {/* Text content */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-display text-[20px] sm:text-[22px] text-ivory mb-1 group-hover:text-gold transition-colors duration-300">
                                            {step.title}
                                        </h3>
                                        <p className="font-body text-[13px] text-mist leading-[1.8]">
                                            {step.desc}
                                        </p>
                                    </div>

                                    {/* Background number decoration — desktop */}
                                    <span
                                        className="hidden lg:block absolute top-4 right-4 font-display text-[64px] leading-none pointer-events-none select-none"
                                        style={{ color: 'rgba(201,168,76,0.05)' }}
                                        aria-hidden="true"
                                    >
                                        {step.number}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ── Bottom banner ───────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    className="mt-12 sm:mt-16 rounded-[2px] border border-obsidian-border px-6 sm:px-8 py-6"
                    style={{ backgroundColor: '#0F0F0F' }}
                >
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        {/* Guarantee 1 */}
                        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 flex-1 justify-center text-center sm:text-right">
                            <svg viewBox="0 0 32 32" fill="none" stroke="#C9A84C" strokeWidth="1.2" className="w-8 h-8 flex-shrink-0">
                                <path d="M16 3L4 8v8c0 7.5 5.1 14.5 12 16 6.9-1.5 12-8.5 12-16V8L16 3z" />
                                <path d="M11 16l3 3 7-7" strokeWidth="1.5" />
                            </svg>
                            <span className="font-display text-[17px] sm:text-[20px] text-ivory">
                                توصيل مضمون لـ ٥٨ ولاية
                            </span>
                        </div>

                        {/* Divider — desktop only */}
                        <div className="hidden sm:block w-px h-10 bg-gold/15 flex-shrink-0" />

                        {/* Guarantee 2 */}
                        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 flex-1 justify-center text-center sm:text-right">
                            <svg viewBox="0 0 32 32" fill="none" stroke="#C9A84C" strokeWidth="1.2" className="w-8 h-8 flex-shrink-0">
                                <circle cx="16" cy="16" r="12" />
                                <path d="M16 9v8l5 3" strokeWidth="1.5" />
                            </svg>
                            <span className="font-display text-[17px] sm:text-[20px] text-ivory">
                                تأكيد خلال ٢٤ ساعة
                            </span>
                        </div>

                        {/* Divider — desktop only */}
                        <div className="hidden sm:block w-px h-10 bg-gold/15 flex-shrink-0" />

                        {/* Guarantee 3 */}
                        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 flex-1 justify-center text-center sm:text-right">
                            <svg viewBox="0 0 32 32" fill="none" stroke="#C9A84C" strokeWidth="1.2" className="w-8 h-8 flex-shrink-0">
                                <rect x="6" y="12" width="20" height="14" rx="1" />
                                <rect x="4" y="8" width="24" height="5" rx="1" />
                                <line x1="16" y1="8" x2="16" y2="26" />
                                <path d="M16 8c-1.5-3-5-4-6.5-3s-.5 4 2.5 4" />
                                <path d="M16 8c1.5-3 5-4 6.5-3s.5 4-2.5 4" />
                            </svg>
                            <span className="font-display text-[17px] sm:text-[20px] text-ivory">
                                تغليف فاخر مجاني
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
