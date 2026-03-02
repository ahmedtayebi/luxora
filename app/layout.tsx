import type { Metadata, Viewport } from 'next'
import { Cairo, Amiri } from 'next/font/google'
import './globals.css'

const cairo = Cairo({
    subsets: ['arabic', 'latin'],
    weight: ['300', '400', '600', '700'],
    variable: '--font-cairo',
    display: 'swap',
})

const amiri = Amiri({
    subsets: ['arabic', 'latin'],
    weight: ['400', '700'],
    variable: '--font-amiri',
    display: 'swap',
})

export const viewport: Viewport = {
    themeColor: '#070707',
}

export const metadata: Metadata = {
    title: 'لوكسورا | عطور الفخامة الراقية',
    description:
        'اكتشف تجربة العطور الراقية — مزيج من التراث الشرقي والفن الباريسي',
    keywords: 'عطور فاخرة، لوكسورا، عطر، الجزائر، بارفان',
    openGraph: {
        title: 'لوكسورا | عطور الفخامة الراقية',
        description:
            'اكتشف تجربة العطور الراقية — مزيج من التراث الشرقي والفن الباريسي',
        type: 'website',
        locale: 'ar_DZ',
    },
    robots: {
        index: true,
        follow: true,
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'لوكسورا',
    alternateName: 'LUXORA',
    description:
        'عطور فاخرة — مزيج من التراث الشرقي والفن الباريسي',
    url: 'https://luxora.dz',
    logo: 'https://luxora.dz/logo.png',
    sameAs: [],
    contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: ['Arabic', 'French'],
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html dir="rtl" lang="ar">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body
                className={`${cairo.variable} ${amiri.variable} font-body antialiased`}
            >
                {/* Gold cursor dot — positioned by JS in page.tsx */}
                <div id="cursor-dot" aria-hidden="true" />
                <div className="relative">{children}</div>
            </body>
        </html>
    )
}
