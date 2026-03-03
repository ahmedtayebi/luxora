'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */
interface Wilaya {
    code: string
    name: string
}

const wilayas: Wilaya[] = [
    { code: '01', name: 'أدرار' },
    { code: '02', name: 'الشلف' },
    { code: '03', name: 'الأغواط' },
    { code: '04', name: 'أم البواقي' },
    { code: '05', name: 'باتنة' },
    { code: '06', name: 'بجاية' },
    { code: '07', name: 'بسكرة' },
    { code: '08', name: 'بشار' },
    { code: '09', name: 'البليدة' },
    { code: '10', name: 'البويرة' },
    { code: '11', name: 'تمنراست' },
    { code: '12', name: 'تبسة' },
    { code: '13', name: 'تلمسان' },
    { code: '14', name: 'تيارت' },
    { code: '15', name: 'تيزي وزو' },
    { code: '16', name: 'الجزائر' },
    { code: '17', name: 'الجلفة' },
    { code: '18', name: 'جيجل' },
    { code: '19', name: 'سطيف' },
    { code: '20', name: 'سعيدة' },
    { code: '21', name: 'سكيكدة' },
    { code: '22', name: 'سيدي بلعباس' },
    { code: '23', name: 'عنابة' },
    { code: '24', name: 'قالمة' },
    { code: '25', name: 'قسنطينة' },
    { code: '26', name: 'المدية' },
    { code: '27', name: 'مستغانم' },
    { code: '28', name: 'المسيلة' },
    { code: '29', name: 'معسكر' },
    { code: '30', name: 'ورقلة' },
    { code: '31', name: 'وهران' },
    { code: '32', name: 'البيض' },
    { code: '33', name: 'إليزي' },
    { code: '34', name: 'برج بوعريريج' },
    { code: '35', name: 'بومرداس' },
    { code: '36', name: 'الطارف' },
    { code: '37', name: 'تندوف' },
    { code: '38', name: 'تيسمسيلت' },
    { code: '39', name: 'الوادي' },
    { code: '40', name: 'خنشلة' },
    { code: '41', name: 'سوق أهراس' },
    { code: '42', name: 'تيبازة' },
    { code: '43', name: 'ميلة' },
    { code: '44', name: 'عين الدفلى' },
    { code: '45', name: 'النعامة' },
    { code: '46', name: 'عين تيموشنت' },
    { code: '47', name: 'غرداية' },
    { code: '48', name: 'غليزان' },
    { code: '49', name: 'تيميمون' },
    { code: '50', name: 'برج باجي مختار' },
    { code: '51', name: 'أولاد جلال' },
    { code: '52', name: 'بني عباس' },
    { code: '53', name: 'عين صالح' },
    { code: '54', name: 'عين قزام' },
    { code: '55', name: 'تقرت' },
    { code: '56', name: 'جانت' },
    { code: '57', name: 'المغير' },
    { code: '58', name: 'المنيعة' },
]

interface PerfumeOption {
    name: string
    price: number
}

const perfumeOptions: PerfumeOption[] = [
    { name: 'ليلة أبدية', price: 8500 },
    { name: 'ضوء ذهبي', price: 9200 },
    { name: 'روح باريس', price: 7800 },
    { name: 'صحراء حمراء', price: 8900 },
    { name: 'فجر البحر', price: 7200 },
    { name: 'حرير أبيض', price: 7500 },
]

/* ═══════════════════════════════════════════════════════════════
   FORM STATE
   ═══════════════════════════════════════════════════════════════ */
interface OrderFormData {
    fullName: string
    phone: string
    phone2: string
    wilaya: string
    address: string
    perfume: string
    quantity: number
    notes: string
}

interface FieldErrors {
    fullName?: string
    phone?: string
    wilaya?: string
    address?: string
    perfume?: string
}

/* ═══════════════════════════════════════════════════════════════
   FLOATING INPUT — min height 48px, font-size 16px (no iOS zoom)
   ═══════════════════════════════════════════════════════════════ */
function FloatingInput({
    label,
    value,
    onChange,
    type = 'text',
    required,
    error,
    dir,
    placeholder,
}: {
    label: string
    value: string
    onChange: (v: string) => void
    type?: string
    required?: boolean
    error?: string
    dir?: string
    placeholder?: string
}) {
    const hasValue = value.length > 0
    return (
        <div className="relative pb-5">
            <label
                className={`absolute right-0 transition-all duration-300 pointer-events-none font-body
          ${hasValue
                        ? 'top-0 text-[10px] tracking-wider text-gold'
                        : 'top-[14px] text-[13px] text-mist/50'
                    }`}
            >
                {label}{required && ' *'}
            </label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                dir={dir}
                placeholder={hasValue ? placeholder : ''}
                style={{ fontSize: '16px', minHeight: '48px' }}
                className="w-full bg-transparent border-b border-[rgba(201,168,76,0.2)]
                   focus:border-gold text-ivory font-body
                   py-2 pt-6 outline-none transition-colors duration-300"
            />
            {error && (
                <p className="absolute bottom-0 right-0 font-body text-[11px] text-red-400">
                    {error}
                </p>
            )}
        </div>
    )
}

/* ═══════════════════════════════════════════════════════════════
   WILAYA BOTTOM-SHEET DROPDOWN (mobile) / regular dropdown (desktop)
   ═══════════════════════════════════════════════════════════════ */
function CustomSelect<T extends { label: string; value: string }>({
    label,
    options,
    value,
    onChange,
    required,
    error,
    placeholder,
}: {
    label: string
    options: T[]
    value: string
    onChange: (v: string) => void
    required?: boolean
    error?: string
    placeholder: string
}) {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [isMobile, setIsMobile] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const searchRef = useRef<HTMLInputElement>(null)

    const selectedOption = options.find((o) => o.value === value)
    const filtered = search
        ? options.filter((o) => o.label.includes(search))
        : options

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    /* Close on click outside (desktop only) */
    useEffect(() => {
        if (isMobile) return
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [isMobile])

    /* Lock body scroll when mobile bottom-sheet is open */
    useEffect(() => {
        if (isMobile && open) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [isMobile, open])

    /* Auto-focus search input when sheet opens */
    useEffect(() => {
        if (open && searchRef.current) {
            setTimeout(() => searchRef.current?.focus(), 100)
        }
    }, [open])

    const handleOpen = () => {
        setOpen(!open)
        setSearch('')
    }

    const handleSelect = (val: string) => {
        onChange(val)
        setOpen(false)
    }

    return (
        <div ref={ref} className="relative pb-5">
            <label
                className={`absolute right-0 transition-all duration-300 pointer-events-none font-body
          ${value
                        ? 'top-0 text-[10px] tracking-wider text-gold'
                        : 'top-[14px] text-[13px] text-mist/50'
                    }`}
            >
                {label}{required && ' *'}
            </label>

            {/* Trigger button */}
            <button
                type="button"
                onClick={handleOpen}
                style={{ minHeight: '48px', fontSize: '16px' }}
                className="w-full bg-transparent border-b border-[rgba(201,168,76,0.2)]
                   focus:border-gold text-right font-body text-ivory
                   py-2 pt-6 outline-none transition-colors duration-300
                   flex items-center justify-between"
            >
                <span className={selectedOption ? 'text-ivory' : 'text-mist/30'}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className={`w-3.5 h-3.5 text-mist/40 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                >
                    <path d="M4 6l4 4 4-4" />
                </svg>
            </button>

            {/* ── Mobile Bottom Sheet ─────────────────────────────────── */}
            <AnimatePresence>
                {open && isMobile && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-[200] bg-black/60"
                            onClick={() => setOpen(false)}
                        />
                        {/* Sheet */}
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="fixed bottom-0 left-0 right-0 z-[201] rounded-t-xl overflow-hidden"
                            style={{
                                height: '60vh',
                                backgroundColor: '#131313',
                                border: '1px solid rgba(201,168,76,0.15)',
                                borderBottom: 'none',
                            }}
                        >
                            {/* Drag handle */}
                            <div className="flex justify-center pt-3 pb-2">
                                <div className="w-12 h-1 rounded-full bg-gold/20" />
                            </div>

                            {/* Search */}
                            <div className="px-4 pb-3 border-b border-[rgba(201,168,76,0.1)] sticky top-0 bg-[#131313]">
                                <input
                                    ref={searchRef}
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="ابحث عن ولايتك..."
                                    style={{ fontSize: '16px' }}
                                    className="w-full bg-[#0D0D0D] px-4 py-3 font-body text-ivory
                           placeholder:text-mist/30 outline-none rounded-sm
                           border border-[rgba(201,168,76,0.1)]"
                                />
                            </div>

                            {/* Options */}
                            <div className="overflow-y-auto h-[calc(60vh-100px)] custom-scrollbar">
                                {filtered.length === 0 && (
                                    <div className="px-4 py-3 text-mist/40 text-[13px] font-body text-center">
                                        لم يتم العثور على نتائج
                                    </div>
                                )}
                                {filtered.map((opt) => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => handleSelect(opt.value)}
                                        style={{ minHeight: '48px' }}
                                        className={`w-full text-right px-4 py-3 font-body text-[14px]
                             transition-colors duration-150
                             ${opt.value === value
                                                ? 'text-gold bg-gold/5'
                                                : 'text-ivory hover:bg-[rgba(201,168,76,0.1)] hover:text-gold'
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* ── Desktop Dropdown ─────────────────────────────────────── */}
            <AnimatePresence>
                {open && !isMobile && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -4 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute top-full left-0 right-0 mt-1 z-50
                       bg-obsidian-card border border-gold-subtle rounded-[2px]
                       shadow-[0_10px_40px_rgba(0,0,0,0.6)] overflow-hidden"
                    >
                        {/* Search */}
                        <div className="p-2 border-b border-obsidian-border sticky top-0 bg-[#131313]">
                            <input
                                ref={searchRef}
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="ابحث عن ولايتك..."
                                style={{ fontSize: '16px' }}
                                className="w-full bg-obsidian-soft px-3 py-2 font-body text-ivory
                           placeholder:text-mist/30 outline-none rounded-[2px]"
                                autoFocus
                            />
                        </div>
                        {/* Options */}
                        <div className="max-h-[50vh] overflow-y-auto custom-scrollbar">
                            {filtered.length === 0 && (
                                <div className="px-4 py-3 text-mist/40 text-[13px] font-body text-center">
                                    لم يتم العثور على نتائج
                                </div>
                            )}
                            {filtered.map((opt) => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => handleSelect(opt.value)}
                                    className={`w-full text-right px-4 py-2.5 font-body text-[13px]
                             transition-colors duration-150
                             ${opt.value === value
                                            ? 'text-gold bg-gold/5'
                                            : 'text-ivory hover:bg-[rgba(201,168,76,0.1)] hover:text-gold'
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {error && (
                <p className="absolute bottom-0 right-0 font-body text-[11px] text-red-400">
                    {error}
                </p>
            )}
        </div>
    )
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function OrderForm() {
    const [form, setForm] = useState<OrderFormData>({
        fullName: '',
        phone: '',
        phone2: '',
        wilaya: '',
        address: '',
        perfume: '',
        quantity: 1,
        notes: '',
    })

    const [errors, setErrors] = useState<FieldErrors>({})
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [shake, setShake] = useState(false)
    const [refNum, setRefNum] = useState('')

    const set = useCallback(
        <K extends keyof OrderFormData>(key: K, val: OrderFormData[K]) =>
            setForm((p) => ({ ...p, [key]: val })),
        [],
    )

    /* ── Derived ────────────────────────────────────────────────── */
    const selectedPerfume = perfumeOptions.find((p) => p.name === form.perfume)
    const selectedWilaya = wilayas.find((w) => w.code === form.wilaya)
    const unitPrice = selectedPerfume?.price ?? 0
    const totalPrice = unitPrice * form.quantity

    /* ── Wilaya options ─────────────────────────────────────────── */
    const wilayaOpts = wilayas.map((w) => ({
        label: `${w.code} - ${w.name}`,
        value: w.code,
    }))

    /* ── Perfume options ────────────────────────────────────────── */
    const perfumeOpts = perfumeOptions.map((p) => ({
        label: p.name,
        value: p.name,
    }))

    /* ── Format price ───────────────────────────────────────────── */
    const fmtPrice = (n: number) => n.toLocaleString('ar-DZ')

    /* ── Validate ───────────────────────────────────────────────── */
    const validate = (): boolean => {
        const e: FieldErrors = {}
        if (form.fullName.trim().length < 3)
            e.fullName = 'الاسم يجب أن يحتوي على ٣ أحرف على الأقل'
        if (!/^0[567]\d{8}$/.test(form.phone))
            e.phone = 'رقم هاتف غير صحيح (10 أرقام تبدأ بـ 05/06/07)'
        if (!form.wilaya) e.wilaya = 'يرجى اختيار الولاية'
        if (!form.address.trim()) e.address = 'يرجى إدخال العنوان'
        if (!form.perfume) e.perfume = 'يرجى اختيار العطر'
        setErrors(e)
        if (Object.keys(e).length > 0) {
            setShake(true)
            setTimeout(() => setShake(false), 500)
            return false
        }
        return true
    }

    /* ── Submit ─────────────────────────────────────────────────── */
    const handleSubmit = async () => {
        if (!validate()) return
        setLoading(true)
        await new Promise((r) => setTimeout(r, 1600))
        /* eslint-disable no-console */
        console.log('LUXORA Order:', {
            ...form,
            wilayaName: selectedWilaya?.name,
            unitPrice,
            totalPrice,
        })
        setRefNum(String(100000 + Math.floor(Math.random() * 900000)))
        setLoading(false)
        setSubmitted(true)
    }

    /* ── Can submit? ────────────────────────────────────────────── */
    const canSubmit =
        form.fullName.trim().length >= 3 &&
        form.phone.length >= 10 &&
        form.wilaya &&
        form.address.trim() &&
        form.perfume

    return (
        <section id="order" className="py-20 sm:py-28 px-4 sm:px-6 relative bg-obsidian">
            {/* Glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse 60% 70% at 50% 40%, rgba(201,168,76,0.03) 0%, transparent 65%)',
                }}
            />

            <div className="max-w-6xl mx-auto relative">
                {/* ── Header ──────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-10 sm:mb-14"
                >
                    <div className="flex items-center justify-center gap-4 mb-5">
                        <span className="block w-16 h-px bg-gradient-to-r from-transparent to-gold/40" />
                        <span className="font-body text-[11px] tracking-[0.5em] text-gold">
                            — اطلب الآن —
                        </span>
                        <span className="block w-16 h-px bg-gradient-to-l from-transparent to-gold/40" />
                    </div>
                    <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-ivory leading-tight">
                        ملكية تليق بك
                    </h2>
                    <p className="font-body text-sm sm:text-[15px] text-mist mt-3 px-4">
                        نموذج الطلب — توصيل إلى جميع ولايات الجزائر
                    </p>
                </motion.div>

                {/* ── Form area ───────────────────────────────────────── */}
                <AnimatePresence mode="wait">
                    {!submitted ? (
                        <motion.div
                            key="form-area"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.35 }}
                            className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8"
                        >
                            {/* ── FORM CARD ─────────────────────────────────── */}
                            <motion.div
                                animate={shake ? { x: [0, -8, 8, -8, 8, 0] } : {}}
                                transition={{ duration: 0.4 }}
                                className="rounded-[2px] p-6 sm:p-8 lg:p-12"
                                style={{
                                    background: 'linear-gradient(180deg, #0F0F0F 0%, #0D0D0D 100%)',
                                    border: '1px solid rgba(201,168,76,0.15)',
                                }}
                            >
                                {/* Row 1 */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                                    <FloatingInput
                                        label="الاسم الكامل"
                                        value={form.fullName}
                                        onChange={(v) => set('fullName', v)}
                                        required
                                        error={errors.fullName}
                                    />
                                    <FloatingInput
                                        label="رقم الهاتف"
                                        value={form.phone}
                                        onChange={(v) => set('phone', v)}
                                        type="tel"
                                        dir="ltr"
                                        placeholder="05xxxxxxxx"
                                        required
                                        error={errors.phone}
                                    />
                                </div>

                                {/* Row 2 */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mt-2">
                                    <FloatingInput
                                        label="رقم هاتف بديل"
                                        value={form.phone2}
                                        onChange={(v) => set('phone2', v)}
                                        type="tel"
                                        dir="ltr"
                                    />
                                    <CustomSelect
                                        label="الولاية"
                                        options={wilayaOpts}
                                        value={form.wilaya}
                                        onChange={(v) => set('wilaya', v)}
                                        required
                                        error={errors.wilaya}
                                        placeholder="اختر ولايتك..."
                                    />
                                </div>

                                {/* Row 3 */}
                                <div className="mt-2">
                                    <FloatingInput
                                        label="العنوان التفصيلي"
                                        value={form.address}
                                        onChange={(v) => set('address', v)}
                                        required
                                        error={errors.address}
                                        placeholder="الحي، الشارع، رقم البناية..."
                                    />
                                </div>

                                {/* Row 4 */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mt-2">
                                    <CustomSelect
                                        label="العطر المختار"
                                        options={perfumeOpts}
                                        value={form.perfume}
                                        onChange={(v) => set('perfume', v)}
                                        required
                                        error={errors.perfume}
                                        placeholder="اختر العطر..."
                                    />

                                    {/* Quantity with +/- — 48px touch targets */}
                                    <div className="relative pb-5">
                                        <label className="absolute right-0 top-0 text-[10px] tracking-wider text-gold font-body pointer-events-none">
                                            الكمية *
                                        </label>
                                        <div className="flex items-center mt-6 border-b border-[rgba(201,168,76,0.2)]">
                                            <button
                                                type="button"
                                                onClick={() => set('quantity', Math.max(1, form.quantity - 1))}
                                                className="w-12 h-12 flex items-center justify-center
                                   text-gold/60 hover:text-gold text-xl font-light
                                   border border-[rgba(201,168,76,0.2)] rounded-sm
                                   transition-colors duration-200 flex-shrink-0"
                                            >
                                                −
                                            </button>
                                            <span className="flex-1 text-center font-display text-[18px] text-ivory min-w-[3rem]">
                                                {form.quantity}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => set('quantity', Math.min(10, form.quantity + 1))}
                                                className="w-12 h-12 flex items-center justify-center
                                   text-gold/60 hover:text-gold text-xl font-light
                                   border border-[rgba(201,168,76,0.2)] rounded-sm
                                   transition-colors duration-200 flex-shrink-0"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Row 5 — Textarea */}
                                <div className="mt-2 relative pb-5">
                                    <label
                                        className={`absolute right-0 transition-all duration-300 pointer-events-none font-body
                       ${form.notes
                                                ? 'top-0 text-[10px] tracking-wider text-gold'
                                                : 'top-[14px] text-[13px] text-mist/50'
                                            }`}
                                    >
                                        ملاحظات إضافية
                                    </label>
                                    <textarea
                                        value={form.notes}
                                        onChange={(e) => set('notes', e.target.value)}
                                        rows={3}
                                        placeholder={form.notes ? 'أي تعليمات خاصة للتوصيل...' : ''}
                                        style={{ fontSize: '16px', minHeight: '100px' }}
                                        className="w-full bg-transparent border-b border-[rgba(201,168,76,0.2)]
                               focus:border-gold text-ivory font-body
                               py-2 pt-6 outline-none resize-none transition-colors duration-300"
                                    />
                                </div>

                                {/* Mobile order summary strip — shown above submit on mobile */}
                                {(form.perfume || form.wilaya) && (
                                    <div
                                        className="lg:hidden rounded-sm p-4 mb-4 flex items-center justify-between gap-2 flex-wrap"
                                        style={{
                                            backgroundColor: '#0F0F0F',
                                            border: '1px solid rgba(201,168,76,0.1)',
                                        }}
                                    >
                                        <div className="font-body text-[12px] text-mist/70 leading-relaxed">
                                            {form.perfume && <span>العطر: <strong className="text-ivory">{form.perfume}</strong></span>}
                                            {form.perfume && form.wilaya && <span className="mx-2 text-gold/30">|</span>}
                                            {form.wilaya && selectedWilaya && <span>الولاية: <strong className="text-ivory">{selectedWilaya.name}</strong></span>}
                                            {form.wilaya && <span className="mx-2 text-gold/30">|</span>}
                                            <span>الكمية: <strong className="text-ivory">{form.quantity}</strong></span>
                                        </div>
                                        {totalPrice > 0 && (
                                            <span className="font-display text-[18px] text-gold flex-shrink-0">
                                                {fmtPrice(totalPrice)} دج
                                            </span>
                                        )}
                                    </div>
                                )}

                                {/* Submit button — sticky on mobile */}
                                <div className="sticky bottom-0 lg:static py-3 lg:py-0" style={{ backgroundColor: 'rgba(7,7,7,0.95)', backdropFilter: 'blur(8px)' }}>
                                    <motion.button
                                        onClick={handleSubmit}
                                        disabled={loading || !canSubmit}
                                        whileHover={canSubmit && !loading ? { y: -2, boxShadow: '0 8px 30px rgba(201,168,76,0.3)' } : {}}
                                        whileTap={canSubmit && !loading ? { scale: 0.99 } : {}}
                                        className="w-full h-14 border border-gold rounded-[2px]
                             font-body text-sm sm:text-[14px] tracking-[0.3em]
                             transition-all duration-300 flex items-center justify-center gap-3
                             disabled:opacity-40 disabled:cursor-not-allowed
                             bg-transparent text-gold
                             hover:bg-gold hover:text-obsidian"
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="30 70" />
                                                </svg>
                                                جارٍ الإرسال...
                                            </>
                                        ) : (
                                            <>
                                                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                                                    <path d="M10 4L6 8l4 4" />
                                                </svg>
                                                إتمام الطلب
                                            </>
                                        )}
                                    </motion.button>
                                </div>
                            </motion.div>

                            {/* ── ORDER SUMMARY SIDEBAR (desktop only) ──────────── */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="hidden lg:block"
                            >
                                <div
                                    className="sticky top-28 rounded-[2px] p-7"
                                    style={{
                                        backgroundColor: '#0F0F0F',
                                        border: '1px solid rgba(201,168,76,0.12)',
                                    }}
                                >
                                    <h3 className="font-display text-[20px] text-ivory mb-6">
                                        ملخص طلبك
                                    </h3>

                                    {/* Selected perfume */}
                                    <div className="flex flex-col gap-4 mb-6">
                                        <div className="flex justify-between items-start">
                                            <span className="font-body text-[13px] text-mist/60">العطر</span>
                                            <motion.span layout className="font-body text-[13px] text-ivory text-left max-w-[60%]">
                                                {form.perfume || '—'}
                                            </motion.span>
                                        </div>
                                        <div className="flex justify-between items-start">
                                            <span className="font-body text-[13px] text-mist/60">الولاية</span>
                                            <motion.span layout className="font-body text-[13px] text-ivory text-left">
                                                {selectedWilaya ? `${selectedWilaya.code} - ${selectedWilaya.name}` : '—'}
                                            </motion.span>
                                        </div>
                                        <div className="flex justify-between items-start">
                                            <span className="font-body text-[13px] text-mist/60">الكمية</span>
                                            <motion.span layout className="font-body text-[13px] text-ivory">
                                                {form.quantity}
                                            </motion.span>
                                        </div>
                                    </div>

                                    <div className="h-px bg-gold/10 mb-6" />

                                    {/* Price breakdown */}
                                    {selectedPerfume && (
                                        <div className="flex flex-col gap-3 mb-4">
                                            <div className="flex justify-between">
                                                <span className="font-body text-[12px] text-mist/50">السعر</span>
                                                <span className="font-body text-[12px] text-mist">
                                                    {fmtPrice(unitPrice)} دج × {form.quantity}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-body text-[12px] text-mist/50">التوصيل</span>
                                                <span className="font-body text-[12px] text-gold">مجاني</span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="h-px bg-gold/10 mb-4" />

                                    <div className="flex justify-between items-center">
                                        <span className="font-body text-[13px] text-mist/70">المجموع</span>
                                        <motion.span
                                            layout
                                            className="font-display text-[24px] text-gold"
                                        >
                                            {totalPrice > 0 ? `${fmtPrice(totalPrice)} دج` : '—'}
                                        </motion.span>
                                    </div>

                                    <p className="font-body text-[12px] text-gold/50 mt-4 text-center leading-relaxed">
                                        التوصيل مجاني لجميع الولايات
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    ) : (
                        /* ── SUCCESS STATE ────────────────────────────────── */
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="max-w-xl mx-auto text-center py-12 px-4"
                        >
                            {/* Animated checkmark */}
                            <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-8">
                                <svg viewBox="0 0 96 96" className="w-full h-full">
                                    <circle
                                        cx="48"
                                        cy="48"
                                        r="42"
                                        stroke="#C9A84C"
                                        strokeWidth="1.5"
                                        fill="none"
                                        strokeOpacity="0.3"
                                    />
                                    <motion.circle
                                        cx="48"
                                        cy="48"
                                        r="42"
                                        stroke="#C9A84C"
                                        strokeWidth="1.5"
                                        fill="none"
                                        strokeDasharray="264"
                                        initial={{ strokeDashoffset: 264 }}
                                        animate={{ strokeDashoffset: 0 }}
                                        transition={{ duration: 0.8, ease: 'easeOut' }}
                                    />
                                    <motion.path
                                        d="M30 48l12 12 24-24"
                                        stroke="#C9A84C"
                                        strokeWidth="2"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeDasharray="60"
                                        initial={{ strokeDashoffset: 60 }}
                                        animate={{ strokeDashoffset: 0 }}
                                        transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' }}
                                    />
                                </svg>
                            </div>

                            <h3 className="font-display text-2xl sm:text-3xl text-ivory mb-3">
                                تم استلام طلبك!
                            </h3>
                            <p className="font-body text-[15px] text-mist leading-[1.8] mb-8 max-w-sm mx-auto">
                                سيتصل بك فريقنا خلال ٢٤ ساعة لتأكيد الطلب وترتيب التوصيل
                            </p>

                            {/* Ref number */}
                            <div className="inline-flex flex-col items-center gap-2 bg-obsidian-card border border-obsidian-border rounded-[2px] px-8 py-5 mb-8">
                                <span className="font-body text-[11px] text-mist/50 tracking-wider">
                                    رقم الطلب
                                </span>
                                <span className="font-display text-[24px] text-gold tracking-widest" dir="ltr">
                                    #{refNum}
                                </span>
                            </div>

                            {/* WhatsApp CTA — full width on mobile */}
                            <div className="px-4">
                                <a
                                    href={`https://wa.me/?text=${encodeURIComponent(`مرحباً، أريد متابعة طلبي رقم #${refNum}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4
                             border border-gold/40 rounded-[2px]
                             font-body text-[13px] tracking-wider text-gold
                             hover:bg-gold/10 hover:border-gold
                             transition-all duration-300"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.5 12.5 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 01-4.105-1.137l-.295-.176-2.829.84.84-2.829-.176-.295A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
                                    </svg>
                                    تابع طلبك عبر واتساب
                                </a>
                            </div>

                            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mx-auto mt-10" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Inline scrollbar style for the dropdown */}
            <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #131313; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.3); border-radius: 2px; }
      `}</style>
        </section>
    )
}
