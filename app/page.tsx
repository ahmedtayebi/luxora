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
            

        </>
    )
}
