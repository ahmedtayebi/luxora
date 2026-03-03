'use client'

import { motion } from 'framer-motion'

/* ─── Perfume data ──────────────────────────────────────────────── */
interface Perfume {
    id: number
    name: string
    collection: string
    description: string
    notes: string[]
    price: string
    accent: string
    bottleColor: string
}

const perfumes: readonly Perfume[] = [
    {
        id: 1,
        name: 'ليلة أبدية',
        collection: 'المجموعة السوداء',
        description: 'عمق غامض من العود الهندي والورد الأسود والعنبر',
        notes: ['عود هندي', 'ورد أسود', 'عنبر'],
        price: '8,500',
        accent: '#C9A84C',
        bottleColor: 'from-yellow-900 to-amber-950',
    },
    {
        id: 2,
        name: 'ضوء ذهبي',
        collection: 'المجموعة الذهبية',
        description: 'إشراق الياسمين والزعفران الفارسي مع الصندل',
        notes: ['ياسمين', 'زعفران', 'صندل'],
        price: '9,200',
        accent: '#E8C96A',
        bottleColor: 'from-amber-700 to-yellow-800',
    },
    {
        id: 3,
        name: 'روح باريس',
        collection: 'المجموعة الكلاسيكية',
        description: 'أناقة باريسية بنفسجية الأيرس والأرز والمسك',
        notes: ['أيرس', 'أرز', 'مسك أبيض'],
        price: '7,800',
        accent: '#D4B8E0',
        bottleColor: 'from-purple-900 to-slate-900',
    },
    {
        id: 4,
        name: 'صحراء حمراء',
        collection: 'المجموعة الشرقية',
        description: 'حرارة القرفة والفيتيفر والجلد الفاخر',
        notes: ['قرفة', 'فيتيفر', 'جلد'],
        price: '8,900',
        accent: '#C0724A',
        bottleColor: 'from-red-950 to-stone-900',
    },
    {
        id: 5,
        name: 'فجر البحر',
        collection: 'المجموعة الزرقاء',
        description: 'نسيم البحر مع النيرولي والشاي الأبيض النادر',
        notes: ['ملح بحري', 'نيرولي', 'شاي أبيض'],
        price: '7,200',
        accent: '#6AAFD4',
        bottleColor: 'from-blue-950 to-cyan-950',
    },
    {
        id: 6,
        name: 'حرير أبيض',
        collection: 'المجموعة البيضاء',
        description: 'نعومة الأيرس والمسك مع نضارة البيرغموت',
        notes: ['أيرس', 'مسك', 'بيرغموت'],
        price: '7,500',
        accent: '#E8E0D0',
        bottleColor: 'from-stone-700 to-stone-900',
    },
] as const

/* ─── Inline SVG perfume bottle ─────────────────────────────────── */
function BottleSVG({ accent }: { accent: string }) {
    return (
        <svg
            viewBox="0 0 60 130"
            fill="none"
            className="w-[48px] h-[104px] sm:w-[60px] sm:h-[130px] transition-transform duration-500 group-hover:scale-105"
        >
            {/* Cap */}
            <rect x="20" y="0" width="20" height="12" rx="2" fill={accent} fillOpacity="0.4" />
            {/* Neck */}
            <rect x="22" y="12" width="16" height="24" rx="1" stroke={accent} strokeOpacity="0.7" strokeWidth="1" fill="none" />
            {/* Body */}
            <rect x="15" y="36" width="30" height="80" rx="2" stroke={accent} strokeOpacity="0.7" strokeWidth="1" fill="none" />
            {/* Decorative horizontal lines on body */}
            <line x1="18" y1="56" x2="42" y2="56" stroke={accent} strokeOpacity="0.3" strokeWidth="0.5" />
            <line x1="18" y1="96" x2="42" y2="96" stroke={accent} strokeOpacity="0.3" strokeWidth="0.5" />
            {/* Center vertical line with diamond */}
            <line x1="30" y1="60" x2="30" y2="90" stroke={accent} strokeOpacity="0.25" strokeWidth="0.5" />
            <polygon points="30,92 33,96 30,100 27,96" stroke={accent} strokeOpacity="0.5" strokeWidth="0.5" fill="none" />
        </svg>
    )
}

/* ─── Animation variants ────────────────────────────────────────── */
const headerVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
}

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
}

/* ─── Component ─────────────────────────────────────────────────── */
export default function Collection() {
    return (
        <section id="collection" className="py-20 sm:py-32 px-4 sm:px-6 relative">
            <div className="max-w-7xl mx-auto">
                {/* ── Section Header ───────────────────────────────────── */}
                <motion.div
                    variants={headerVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="text-center mb-12 sm:mb-20"
                >
                    {/* Label with decorative lines */}
                    <div className="flex items-center justify-center gap-4 mb-5">
                        <span className="block w-16 h-px bg-gradient-to-r from-transparent to-gold/40" />
                        <span className="font-body text-[11px] tracking-[0.5em] text-gold">
                            — مجموعتنا الحصرية —
                        </span>
                        <span className="block w-16 h-px bg-gradient-to-l from-transparent to-gold/40" />
                    </div>

                    {/* Title */}
                    <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ivory leading-tight max-w-[90vw] mx-auto">
                        عطور تحكي قصة
                    </h2>

                    {/* Subtitle */}
                    <p className="font-body text-sm sm:text-base text-mist mt-4 max-w-lg mx-auto leading-[1.8] px-4">
                        كل عطر رحلة فريدة من المواد الخام الأكثر ندرةً في العالم
                    </p>
                </motion.div>

                {/* ── Cards Grid ───────────────────────────────────────── */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
                >
                    {perfumes.map((p) => (
                        <motion.div
                            key={p.id}
                            variants={cardVariants}
                            className="group relative flex flex-col w-full max-w-sm mx-auto sm:max-w-none rounded-[2px] overflow-hidden
                         bg-obsidian-card border border-obsidian-border
                         transition-all duration-[400ms] ease-out cursor-pointer
                         hover:-translate-y-1.5 hover:border-gold/40
                         hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_30px_rgba(201,168,76,0.08)]"
                        >
                            {/* ── Card top: bottle visual ────────────────────── */}
                            <div
                                className={`relative h-48 sm:h-52 bg-gradient-to-b ${p.bottleColor} flex items-center justify-center`}
                            >
                                {/* Radial accent glow */}
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background: `radial-gradient(circle at 50% 60%, ${p.accent}0D 0%, transparent 70%)`,
                                    }}
                                />
                                <BottleSVG accent={p.accent} />
                            </div>

                            {/* ── Card bottom: info ──────────────────────────── */}
                            <div className="flex flex-col flex-1 p-5 sm:p-6">
                                {/* Collection */}
                                <span
                                    className="font-body text-[10px] tracking-[0.4em] mb-2 opacity-70"
                                    style={{ color: p.accent }}
                                >
                                    {p.collection}
                                </span>

                                {/* Name */}
                                <h3 className="font-display text-2xl sm:text-[28px] text-ivory mb-3 leading-snug">
                                    {p.name}
                                </h3>

                                {/* Description */}
                                <p className="font-body text-[13px] text-mist leading-[1.7] mb-4">
                                    {p.description}
                                </p>

                                {/* Notes */}
                                <p className="font-body text-[11px] text-gold/60">
                                    {p.notes.join(' · ')}
                                </p>

                                {/* Divider */}
                                <div className="h-px bg-gold/10 my-4" />

                                {/* Price & CTA row — flex-col on very small screens, flex-row otherwise */}
                                <div className="flex flex-col [@media(min-width:380px)]:flex-row items-start [@media(min-width:380px)]:items-center justify-between mt-auto gap-3 [@media(min-width:380px)]:gap-0">
                                    <span className="font-display text-[22px] text-gold">
                                        {p.price} <span className="text-[14px] text-gold/60">دج</span>
                                    </span>
                                    <a
                                        href="#order"
                                        className="w-full [@media(min-width:380px)]:w-auto font-body text-[12px] tracking-wide px-5 py-2
                               border rounded-[2px] transition-all duration-300 text-center"
                                        style={{
                                            borderColor: p.accent,
                                            color: p.accent,
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = p.accent
                                            e.currentTarget.style.color = '#070707'
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent'
                                            e.currentTarget.style.color = p.accent
                                        }}
                                    >
                                        اطلب الآن
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
