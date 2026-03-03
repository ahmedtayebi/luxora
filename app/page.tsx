'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useAnimationFrame } from 'framer-motion'
import Lenis from 'lenis'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Collection from '@/components/Collection'
import Story from '@/components/Story'
import HowToOrder from '@/components/HowToOrder'
import OrderForm from '@/components/OrderForm'
import Footer from '@/components/Footer'

export default function Home() {
    const [isLoading, setIsLoading] = useState(true)
    const [showScrollTop, setShowScrollTop] = useState(false)
    const [showWATooltip, setShowWATooltip] = useState(false)
    const lenisRef = useRef<Lenis | null>(null)

    /* ── Lenis smooth scroll ────────────────────────────────────── */
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.4,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 2,
        })
        lenisRef.current = lenis
        return () => lenis.destroy()
    }, [])

    /* Sync Lenis with Framer Motion raf */
    useAnimationFrame((time) => {
        lenisRef.current?.raf(time)
    })

    /* ── Loading screen ─────────────────────────────────────────── */
    useEffect(() => {
        const t = setTimeout(() => setIsLoading(false), 2500)
        return () => clearTimeout(t)
    }, [])

    /* ── Scroll-to-top visibility ───────────────────────────────── */
    useEffect(() => {
        const onScroll = () => setShowScrollTop(window.scrollY > 500)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    /* ── Gold custom cursor (desktop + non-touch only) ───────────── */
    useEffect(() => {
        // Skip completely on touch devices
        if ('ontouchstart' in window) return

        const dot = document.getElementById('cursor-dot')
        if (!dot) return
        let cx = 0, cy = 0
        let ax = 0, ay = 0
        let raf: number

        const onMove = (e: MouseEvent) => { cx = e.clientX; cy = e.clientY }
        window.addEventListener('mousemove', onMove)

        const lerp = (a: number, b: number, t: number) => a + (b - a) * t
        const loop = () => {
            ax = lerp(ax, cx, 0.18)
            ay = lerp(ay, cy, 0.18)
            dot.style.left = `${ax}px`
            dot.style.top = `${ay}px`
            raf = requestAnimationFrame(loop)
        }
        raf = requestAnimationFrame(loop)

        return () => {
            window.removeEventListener('mousemove', onMove)
            cancelAnimationFrame(raf)
        }
    }, [])

    const scrollToTop = () => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { duration: 1.8 })
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    return (
        <>
            {/* ── Gold cursor dot — hidden on mobile via CSS ────────────── */}
            <div
                id="cursor-dot"
                aria-hidden="true"
                className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]
                   -translate-x-1/2 -translate-y-1/2 hidden md:block
                   shadow-[0_0_6px_rgba(201,168,76,0.6)]"
                style={{ backgroundColor: '#C9A84C' }}
            />

            {/* ── Loading Screen ───────────────────────────────────────── */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-obsidian"
                        style={{
                            paddingTop: 'env(safe-area-inset-top)',
                            paddingBottom: 'env(safe-area-inset-bottom)',
                        }}
                    >
                        {/* LUXORA text — shimmer/transparent */}
                        <motion.h1
                            initial={{ opacity: 0, letterSpacing: '0.2em' }}
                            animate={{ opacity: 1, letterSpacing: '0.5em' }}
                            transition={{ delay: 0.2, duration: 1, ease: 'easeOut' }}
                            className="font-display text-4xl sm:text-5xl shimmer"
                            style={{ color: 'transparent', backgroundClip: 'text', WebkitBackgroundClip: 'text' }}
                        >
                            LUXORA
                        </motion.h1>

                        {/* Growing gold line */}
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: '8rem', opacity: 1 }}
                            transition={{ delay: 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            className="h-px bg-gradient-to-r from-transparent via-gold to-transparent mt-4"
                        />

                        {/* Arabic subtitle */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            transition={{ delay: 1.0, duration: 0.8 }}
                            className="font-body text-[10px] tracking-[0.8em] text-gold mt-3"
                        >
                            لوكسورا
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Main Content ─────────────────────────────────────────── */}
            <main>
                <Navbar />
                <Hero />
                <Collection />
                <Story />
                <HowToOrder />
                <OrderForm />
                <Footer />
            </main>

            {/* ── Scroll To Top — positioned above WhatsApp ─────────────── */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        key="scroll-top"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1.1, borderColor: 'rgba(201,168,76,0.7)' }}
                        onClick={scrollToTop}
                        aria-label="العودة إلى الأعلى"
                        className="fixed bottom-20 sm:bottom-24 left-4 sm:left-8 z-50 w-11 h-11 rounded-full
                       bg-obsidian-card border border-gold/30
                       flex items-center justify-center
                       hover:bg-gold/10 transition-colors duration-300 group"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-[18px] h-[18px] text-gold"
                        >
                            <path d="M12 19V5M5 12l7-7 7 7" />
                        </svg>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* ── WhatsApp Floating Button ──────────────────────────────── */}
            <motion.div
                className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-50 flex flex-col items-center gap-2"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
            >
                {/* Tooltip — desktop only via hover */}
                <AnimatePresence>
                    {showWATooltip && (
                        <motion.div
                            initial={{ opacity: 0, y: 4, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 4, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="bg-obsidian-card border border-obsidian-border rounded-[2px]
                         px-3 py-1.5 whitespace-nowrap pointer-events-none"
                        >
                            <span className="font-body text-[12px] text-gold">
                                تواصل معنا على واتساب
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.a
                    href="https://wa.me/213XXXXXXXXX"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="تواصل معنا على واتساب"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => setShowWATooltip(true)}
                    onHoverEnd={() => setShowWATooltip(false)}
                    className="w-14 h-14 rounded-full flex items-center justify-center
                     shadow-[0_4px_20px_rgba(37,211,102,0.3)]
                     hover:shadow-[0_4px_30px_rgba(37,211,102,0.5)]
                     transition-shadow duration-300"
                    style={{ backgroundColor: '#25D366' }}
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="white"
                        className="w-7 h-7"
                    >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.5 12.5 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 01-4.105-1.137l-.295-.176-2.829.84.84-2.829-.176-.295A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
                    </svg>
                </motion.a>
            </motion.div>
        </>
    )
}
