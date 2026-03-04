'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ─── Gold gradient style ───────────────────────────────────────── */
const goldGrad = {
    background: 'linear-gradient(135deg, #8B6914 20%, #E8C96A 50%, #8B6914 80%)',
    WebkitBackgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    backgroundClip: 'text' as const,
}

/* ─── Social icon wrapper ───────────────────────────────────────── */
function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            whileHover={{ scale: 1.1 }}
            className="w-9 h-9 rounded-full flex items-center justify-center
                 border border-[rgba(201,168,76,0.2)] text-gold/70
                 hover:border-gold hover:bg-[rgba(201,168,76,0.1)] hover:text-gold
                 transition-colors duration-300"
        >
            {children}
        </motion.a>
    )
}

/* ─── Nav link ──────────────────────────────────────────────────── */
function FooterLink({ href, label }: { href: string; label: string }) {
    return (
        <a
            href={href}
            className="group flex items-center gap-2 py-1.5 font-body text-[13px] text-mist
                 hover:text-ivory transition-colors duration-200"
        >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gold text-[10px]">
                ←
            </span>
            {label}
        </a>
    )
}

/* ─── Column heading ────────────────────────────────────────────── */
function ColHead({ children }: { children: React.ReactNode }) {
    return (
        <h4 className="font-body text-[11px] tracking-[0.4em] text-gold mb-6">
            {children}
        </h4>
    )
}

/* ─── Contact row ───────────────────────────────────────────────── */
function ContactRow({ icon, label, value, href, ltr }: {
    icon: React.ReactNode
    label: string
    value: string
    href?: string
    ltr?: boolean
}) {
    const textCls = 'font-display text-[14px] text-gold break-all'
    return (
        <div className="flex items-start gap-3 mb-4">
            <span className="text-gold/50 mt-0.5 flex-shrink-0">{icon}</span>
            <div className="min-w-0">
                <span className="font-body text-[10px] text-mist/50 tracking-wider block mb-0.5">{label}</span>
                {href ? (
                    <a href={href} className={textCls} dir={ltr ? 'ltr' : undefined}>
                        {value}
                    </a>
                ) : (
                    <span className={textCls} dir={ltr ? 'ltr' : undefined}>{value}</span>
                )}
            </div>
        </div>
    )
}

export default function Footer() {
    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault()
        if (email) setSubscribed(true)
    }

    return (
        <footer className="bg-obsidian" style={{ borderTop: '1px solid rgba(201,168,76,0.12)' }}>

            {/* ════════════════════════════════════════════════════════
          NEWSLETTER STRIP
      ════════════════════════════════════════════════════════ */}
            {/* <div
                className="py-10 px-4 sm:px-6 text-center"
                style={{
                    backgroundColor: '#0F0F0F',
                    borderBottom: '1px solid rgba(201,168,76,0.08)',
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7 }}
                    className="max-w-lg mx-auto"
                >
                    <h3 className="font-display text-[22px] sm:text-[24px] text-ivory">
                        اشترك في نشرتنا البريدية
                    </h3>
                    <p className="font-body text-[13px] text-mist mt-2 mb-6">
                        كن أول من يعلم عن إطلاق العطور الحصرية
                    </p>

                    <AnimatePresence mode="wait">
                        {!subscribed ? (
                            <motion.form
                                key="newsletter-form"
                                initial={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onSubmit={handleSubscribe}
                                className="flex flex-col sm:flex-row max-w-sm mx-auto gap-2 sm:gap-0"
                            >
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="بريدك الإلكتروني"
                                    required
                                    dir="ltr"
                                    style={{ fontSize: '16px' }}
                                    className="flex-1 bg-obsidian-soft border border-[rgba(201,168,76,0.15)]
                             sm:border-l-0 px-4 py-3 font-body text-[13px] text-ivory
                             placeholder:text-mist/30 outline-none focus:border-gold/40
                             transition-colors duration-300 rounded-sm sm:rounded-r-[2px] sm:rounded-l-none
                             w-full"
                                />
                                <button
                                    type="submit"
                                    className="px-8 py-3 border border-[rgba(201,168,76,0.3)]
                             rounded-sm sm:rounded-l-[2px] sm:rounded-r-none
                             font-body text-[12px] tracking-wider text-gold
                             hover:bg-gold hover:text-obsidian hover:border-gold
                             transition-all duration-300 whitespace-nowrap w-full sm:w-auto"
                                >
                                    اشتراك
                                </button>
                            </motion.form>
                        ) : (
                            <motion.p
                                key="newsletter-success"
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="font-body text-[13px] text-gold flex items-center justify-center gap-2"
                            >
                                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 10l4 4 8-8" />
                                </svg>
                                تم تسجيلك بنجاح!
                            </motion.p>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div> */}

            {/* ════════════════════════════════════════════════════════
          MAIN FOOTER GRID
      ════════════════════════════════════════════════════════ */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">

                    {/* ── Column 1: Brand ─────────────────────────────── */}
                    <div className="lg:col-span-1 text-center sm:text-right">
                        <a href="#hero">
                            <span className="font-display text-[32px] leading-none" style={goldGrad}>
                                Luxora
                            </span>
                        </a>
                        <p className="font-body text-[9px] tracking-[0.6em] text-mist mt-1">
                            HAUTE PARFUM
                        </p>
                        <div className="w-12 h-px bg-gradient-to-l from-gold/50 to-transparent mt-4 mb-5 mx-auto sm:mx-0" />
                        <p className="font-body text-[13px] text-mist leading-[1.9] max-w-[240px] mx-auto sm:mx-0">
                            دار عطور فاخرة تجمع بين روح الشرق وأناقة باريس.
                            كل عطر قصة، كل قطرة ذاكرة.
                        </p>

                        {/* Social icons */}
                        <div className="flex gap-3 mt-6 justify-center sm:justify-start">
                            {/* Instagram */}
                            <SocialIcon href="#" label="Instagram">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                                    <rect x="2" y="2" width="20" height="20" rx="5" />
                                    <circle cx="12" cy="12" r="4" />
                                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                                </svg>
                            </SocialIcon>
                            {/* TikTok */}
                            <SocialIcon href="#" label="TikTok">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                                    <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" />
                                </svg>
                            </SocialIcon>
                            {/* WhatsApp */}
                            <SocialIcon href="https://wa.me/213699596108" label="WhatsApp">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52C13.775 9.25 13.181 7.787 12.934 7.192c-.242-.579-.487-.5-.669-.51a12.5 12.5 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 01-4.105-1.137l-.295-.176-2.829.84.84-2.829-.176-.295A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
                                </svg>
                            </SocialIcon>
                        </div>
                    </div>

                    {/* ── Columns 2 & 3 in a subgrid on mobile ────────── */}
                    {/* On mobile these 2 columns sit side-by-side (2 cols each half) */}
                    <div className="grid grid-cols-2 md:contents gap-8 md:gap-0">
                        {/* Column 2: Quick links */}
                        <div>
                            <ColHead>روابط سريعة</ColHead>
                            <nav className="flex flex-col">
                                <FooterLink href="#collection" label="المجموعة" />
                                <FooterLink href="#story" label="قصتنا" />
                                <FooterLink href="#how-to-order" label="كيفية الطلب" />
                                <FooterLink href="#order" label="اطلب الآن" />
                            </nav>
                        </div>

                        {/* Column 3: Collections */}
                        <div>
                            <ColHead>مجموعاتنا</ColHead>
                            <nav className="flex flex-col">
                                <FooterLink href="#collection" label="المجموعة السوداء" />
                                <FooterLink href="#collection" label="المجموعة الذهبية" />
                                <FooterLink href="#collection" label="المجموعة الكلاسيكية" />
                                <FooterLink href="#collection" label="المجموعة الشرقية" />
                                <FooterLink href="#collection" label="المجموعة الزرقاء" />
                            </nav>
                        </div>
                    </div>

                    {/* ── Column 4: Contact ────────────────────────────── */}
                    <div>
                        <ColHead>تواصل معنا</ColHead>
                        <ContactRow
                            href="https://wa.me/213600506108"
                            label="واتساب"
                            value="+213 XX XX XX XX"
                            ltr
                            icon={
                                <svg viewBox="0 0 18 18" fill="currentColor" className="w-4 h-4">
                                    <path d="M13.1 10.79c-.22-.11-1.32-.65-1.52-.72-.2-.07-.35-.11-.5.11-.15.22-.58.72-.71.87-.13.15-.26.17-.48.06-.22-.11-.94-.35-1.79-1.1-.66-.59-1.11-1.32-1.24-1.54-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.39C7.45 6.94 7 5.84 6.82 5.4c-.18-.43-.36-.37-.5-.38-.13 0-.28-.01-.43-.01s-.39.06-.59.28c-.2.22-.78.76-.78 1.86s.8 2.16.91 2.31c.11.15 1.57 2.4 3.81 3.37.53.23.95.37 1.27.47.53.17 1.02.15 1.4.09.43-.06 1.32-.54 1.5-1.06.18-.52.18-.97.13-1.06-.05-.09-.2-.15-.42-.26z" />
                                    <path d="M9 0C4.03 0 0 4.03 0 9c0 1.58.42 3.06 1.16 4.34l-1.1 4.04 4.14-1.08A9 9 0 109 0zm0 16.4a7.39 7.39 0 01-3.76-.97l-.27-.16-2.6.68.69-2.53-.18-.26A7.4 7.4 0 119 16.4z" />
                                </svg>
                            }
                        />
                        <ContactRow
                            href="tel:+213699596108"
                            label="هاتف"
                            value="+213 XX XX XX XX"
                            ltr
                            icon={
                                <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                                    <path d="M16.5 12.69v2.25a1.5 1.5 0 01-1.635 1.5A14.85 14.85 0 018.4 14.2a14.625 14.625 0 01-4.5-4.5A14.85 14.85 0 011.62 3.135 1.5 1.5 0 013.113 1.5H5.36A1.5 1.5 0 016.86 2.79c.315.945.84 1.83 1.553 2.64a1.5 1.5 0 01-.338 1.582l-.953.953a12 12 0 004.545 4.545l.953-.953a1.5 1.5 0 011.582-.337c.81.713 1.695 1.238 2.64 1.553a1.5 1.5 0 011.29 1.507z" />
                                </svg>
                            }
                        />
                        <ContactRow
                            href="mailto:contact@luxora.dz"
                            label="البريد"
                            value="contact@luxora.dz"
                            ltr
                            icon={
                                <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                                    <path d="M2.25 4.5l6.75 4.5 6.75-4.5M2.25 4.5h13.5v9a.75.75 0 01-.75.75H3a.75.75 0 01-.75-.75v-9z" />
                                </svg>
                            }
                        />
                        <ContactRow
                            label="الموقع"
                            value="الجزائر العاصمة، الجزائر"
                            icon={
                                <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                                    <path d="M9 9.75a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
                                    <path d="M9 1.5A5.25 5.25 0 013.75 6.75C3.75 10.5 9 16.5 9 16.5s5.25-6 5.25-9.75A5.25 5.25 0 009 1.5z" />
                                </svg>
                            }
                        />
                        <p className="font-body text-[12px] text-mist/50 mt-1">
                            الأحد – الخميس
                        </p>
                    </div>
                </div>
            </div>

            {/* ════════════════════════════════════════════════════════
          BOTTOM BAR
      ════════════════════════════════════════════════════════ */}
            <div
                className="px-4 sm:px-6 py-6"
                style={{ borderTop: '1px solid rgba(201,168,76,0.08)' }}
            >
                <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:justify-between">
                    <p className="font-body text-[11px] text-mist/40">
                        © 2026 لوكسورا. جميع الحقوق محفوظة.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
                        <a href="#" className="font-body text-[11px] text-mist/40 hover:text-gold transition-colors duration-200">
                            سياسة الخصوصية
                        </a>
                        <span className="text-mist/20">·</span>
                        <a href="#" className="font-body text-[11px] text-mist/40 hover:text-gold transition-colors duration-200">
                            الشروط والأحكام
                        </a>
                    </div>
                </div>
            </div>

        </footer>
    )
}
