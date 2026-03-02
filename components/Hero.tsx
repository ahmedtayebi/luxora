'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/* ─── Particle system types ─────────────────────────────────────── */
interface Particle {
    x: number
    y: number
    size: number
    opacity: number
    vx: number
    vy: number
    life: number
    maxLife: number
}

/* ─── Framer Motion stagger helper ──────────────────────────────── */
const fadeUp = (delay: number) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
})

const fadeUpLarge = (delay: number) => ({
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
})

export default function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    /* ── Layer 1: Particle Canvas ─────────────────────────────────── */
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animId: number
        let particles: Particle[] = []

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        // Create 80 particles
        const createParticle = (): Particle => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: 1 + Math.random() * 2,
            opacity: 0,
            vx: (Math.random() - 0.5) * 0.6,   // -0.3 to 0.3
            vy: -0.2 + Math.random() * 0.3,      // -0.2 to 0.1
            life: 0,
            maxLife: 200 + Math.random() * 300,
        })

        for (let i = 0; i < 80; i++) {
            const p = createParticle()
            p.life = Math.random() * p.maxLife // randomize start phase
            particles.push(p)
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i]

                // advance life
                p.life++
                if (p.life > p.maxLife) {
                    particles[i] = createParticle()
                    continue
                }

                // fade in/out based on lifespan
                const lifePct = p.life / p.maxLife
                if (lifePct < 0.15) {
                    p.opacity = (lifePct / 0.15) * (0.1 + Math.random() * 0.4)
                } else if (lifePct > 0.8) {
                    p.opacity *= 0.98
                }

                // drift
                p.x += p.vx
                p.y += p.vy

                // wrap edges
                if (p.x < 0) p.x = canvas.width
                if (p.x > canvas.width) p.x = 0
                if (p.y < 0) p.y = canvas.height
                if (p.y > canvas.height) p.y = 0

                // draw
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(201, 168, 76, ${Math.min(p.opacity, 0.5)})`
                ctx.fill()
            }

            animId = requestAnimationFrame(draw)
        }

        draw()

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', resize)
        }
    }, [])

    /* ── Smooth scroll handler ───────────────────────────────────── */
    const scrollTo = (id: string) => {
        const el = document.querySelector(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section
            id="hero"
            className="relative w-full h-screen overflow-hidden bg-obsidian"
        >
            {/* ── Layer 1: Particle Canvas ───────────────────────────── */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0"
                aria-hidden="true"
            />

            {/* ── Layer 2: Decorative SVG geometry ───────────────────── */}
            <div className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none">
                <svg
                    viewBox="0 0 500 500"
                    className="w-[500px] h-[500px] md:w-[500px] md:h-[500px] w-[300px] h-[300px] animate-[spin_40s_linear_infinite]"
                    fill="none"
                >
                    {/* Concentric circles */}
                    <circle cx="250" cy="250" r="240" stroke="#C9A84C" strokeOpacity="0.1" strokeWidth="0.5" />
                    <circle cx="250" cy="250" r="160" stroke="#C9A84C" strokeOpacity="0.08" strokeWidth="0.5" />
                    <circle cx="250" cy="250" r="80" stroke="#C9A84C" strokeOpacity="0.06" strokeWidth="0.5" />

                    {/* Diamond / rhombus: N S E W points */}
                    <polygon
                        points="250,10 490,250 250,490 10,250"
                        stroke="#C9A84C"
                        strokeOpacity="0.08"
                        strokeWidth="0.5"
                        fill="none"
                    />

                    {/* Cross lines connecting opposite points */}
                    <line x1="250" y1="10" x2="250" y2="490" stroke="#C9A84C" strokeOpacity="0.06" strokeWidth="0.5" />
                    <line x1="10" y1="250" x2="490" y2="250" stroke="#C9A84C" strokeOpacity="0.06" strokeWidth="0.5" />
                </svg>
            </div>

            {/* ── Layer 3: Text content ──────────────────────────────── */}
            <div className="absolute inset-0 z-[2] flex items-center justify-center">
                <div className="text-center px-6 max-w-2xl mx-auto">

                    {/* Item 1: Collection label */}
                    <motion.p
                        variants={fadeUp(0.2)}
                        initial="hidden"
                        animate="visible"
                        className="font-body text-[11px] tracking-[0.6em] text-gold/70 mb-6"
                    >
                        — مجموعة حصرية ٢٠٢٤ —
                    </motion.p>

                    {/* Item 2: Main brand name */}
                    <motion.h1
                        variants={fadeUpLarge(0.4)}
                        initial="hidden"
                        animate="visible"
                        className="font-display leading-none mb-6"
                        style={{
                            fontSize: 'clamp(72px, 12vw, 140px)',
                            background: 'linear-gradient(135deg, #8B6914 20%, #E8C96A 50%, #8B6914 80%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        لوكسورا
                    </motion.h1>

                    {/* Item 3: Animated divider */}
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 120, opacity: 1 }}
                        transition={{ delay: 0.65, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="h-px bg-gold mx-auto mb-6"
                    />

                    {/* Item 4: Subtitle */}
                    <motion.p
                        variants={fadeUp(0.8)}
                        initial="hidden"
                        animate="visible"
                        className="font-display italic text-[22px] text-ivory/80 mb-5"
                    >
                        حيث تُصنع الفخامة الحقيقية
                    </motion.p>

                    {/* Item 5: Description */}
                    <motion.p
                        variants={fadeUp(1.0)}
                        initial="hidden"
                        animate="visible"
                        className="font-body text-[15px] text-mist leading-[1.8] max-w-[440px] mx-auto mb-10"
                    >
                        عطور حصرية مستوحاة من أرقى المواد الخام العالمية
                    </motion.p>

                    {/* Item 6: CTA Button */}
                    <motion.div
                        variants={fadeUp(1.2)}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.button
                            onClick={() => scrollTo('#collection')}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="px-10 py-4 border border-gold bg-transparent
                         font-body text-[14px] tracking-[0.3em] text-gold
                         hover:bg-gold hover:text-obsidian
                         transition-colors duration-300 cursor-pointer"
                        >
                            اكتشف المجموعة
                        </motion.button>
                    </motion.div>
                </div>
            </div>

            {/* ── Bottom: Scroll indicator ───────────────────────────── */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2">
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6, duration: 0.6 }}
                    className="font-body text-[10px] text-mist tracking-widest"
                >
                    اكتشف
                </motion.span>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 8, 0] }}
                    transition={{
                        opacity: { delay: 1.6, duration: 0.4 },
                        y: { delay: 1.6, duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
                    }}
                >
                    {/* Chevron down */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#C9A84C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </motion.div>
            </div>
        </section>
    )
}
