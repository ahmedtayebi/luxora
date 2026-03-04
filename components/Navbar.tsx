'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
    { label: 'المجموعة', href: '#collection' },
    { label: 'القصة', href: '#story' },
    { label: 'كيفية الطلب', href: '#how-to-order' },
    { label: 'تواصل معنا', href: '#order' },
]

const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.1 + i * 0.08, duration: 0.4, ease: 'easeOut' },
    }),
    exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
}

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [menuOpen])

    const handleNav = useCallback(
        (href: string) => {
            setMenuOpen(false)
            const el = document.querySelector(href)
            if (el) el.scrollIntoView({ behavior: 'smooth' })
        },
        [],
    )

    return (
        <>
            {/* ── Navbar bar ───────────────────────────────────────────── */}
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 overflow-hidden max-w-full ${scrolled
                    ? 'bg-obsidian/90 backdrop-blur-lg border-b border-gold-subtle py-3'
                    : 'bg-transparent py-3 sm:py-5'
                    }`}
                style={{
                    borderBottomColor: scrolled ? 'rgba(201,168,76,0.08)' : 'transparent',
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between h-12 sm:h-14">
                    {/* ── Logo (right side in RTL) ───────────────────────────── */}
                    <a
                        href="#hero"
                        onClick={(e) => { e.preventDefault(); handleNav('#hero') }}
                        className="group flex flex-col items-start gap-0 relative overflow-hidden"
                    >
                        <span className="font-display text-lg sm:text-xl md:text-2xl text-gold leading-tight group-hover:shimmer transition-all duration-500">
Luxora                        </span>
                        <span className="hidden sm:block font-body text-[8px] tracking-[0.5em] text-mist uppercase leading-none mt-0.5">
                            Haute Parfum
                        </span>
                        {/* Shimmer overlay on hover */}
                        <span
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                            style={{
                                background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.4) 50%, transparent 100%)',
                                backgroundSize: '200% 100%',
                                animation: 'shimmer 2.5s linear infinite',
                            }}
                        />
                    </a>

                    {/* ── Desktop nav links (center) ─────────────────────────── */}
                    <nav className="hidden md:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => { e.preventDefault(); handleNav(link.href) }}
                                className="relative font-body text-[13px] tracking-wide text-mist
                           hover:text-gold transition-colors duration-300 py-1
                           after:absolute after:bottom-0 after:right-0 after:h-[1px]
                           after:w-full after:bg-gold after:origin-right
                           after:scale-x-0 hover:after:scale-x-100
                           after:transition-transform after:duration-300"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* ── Right side: WhatsApp + Hamburger ───────────────────── */}
                    <div className="flex items-center gap-4">
                        {/* WhatsApp button — desktop only */}
                        <motion.a
                            href="https://wa.me/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="WhatsApp"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="hidden md:flex items-center justify-center w-9 h-9
                         rounded-full border border-gold/30
                         hover:border-gold hover:shadow-[0_0_16px_rgba(201,168,76,0.25)]
                         transition-all duration-300"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                className="w-[18px] h-[18px] text-gold"
                            >
                                <path
                                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.174-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 01-4.105-1.137l-.295-.176-2.829.84.84-2.829-.176-.295A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"
                                    fill="currentColor"
                                />
                            </svg>
                        </motion.a>

                        {/* Mobile hamburger — 40x40px minimum touch target */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
                            className="md:hidden relative flex flex-col items-center justify-center gap-[6px] z-[110]"
                            style={{ width: 40, height: 40 }}
                        >
                            <motion.span
                                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="block w-6 h-px bg-gold origin-center"
                            />
                            <motion.span
                                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                                transition={{ duration: 0.2 }}
                                className="block w-6 h-px bg-gold"
                            />
                            <motion.span
                                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="block w-6 h-px bg-gold origin-center"
                            />
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* ── Full-screen mobile menu overlay ──────────────────────── */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="fixed inset-0 z-[105] flex flex-col overflow-y-auto"
                        style={{ backgroundColor: '#070707' }}
                    >
                        {/* Nav links — staggered, top-padded to clear navbar */}
                        <nav className="flex flex-col items-center pt-24 pb-10 flex-1">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => { e.preventDefault(); handleNav(link.href) }}
                                    custom={i}
                                    variants={linkVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="block w-full text-center font-display text-3xl text-ivory
                             hover:text-gold transition-colors duration-300 py-5"
                                    style={{
                                        borderBottom: '1px solid rgba(201,168,76,0.1)',
                                    }}
                                >
                                    {link.label}
                                </motion.a>
                            ))}

                            {/* WhatsApp CTA in mobile menu */}
                            <motion.a
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.4 }}
                                href="https://wa.me/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-8 mx-6 w-[calc(100%-3rem)] flex items-center justify-center gap-3
                         text-gold font-body text-sm tracking-wider
                         border border-gold/30 px-6 py-4 rounded-sm
                         hover:bg-gold/10 transition-colors duration-300"
                                style={{ backgroundColor: 'rgba(201,168,76,0.05)' }}
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.174-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 01-4.105-1.137l-.295-.176-2.829.84.84-2.829-.176-.295A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
                                </svg>
                                تواصل عبر واتساب
                            </motion.a>
                        </nav>

                        {/* Decorative bottom line */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="w-24 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mx-auto mb-12"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
