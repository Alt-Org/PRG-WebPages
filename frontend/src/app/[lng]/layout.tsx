import { dir } from 'i18next';
import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';
import { languages } from '@/shared/i18n/settings/settings';
import { Providers } from '../_providers';
import '../_styles/index.scss';
import localFont from 'next/font/local';
import { baseUrl, defaultOpenGraph } from '@/shared/seoConstants';
import { GoogleAnalytics } from '@next/third-parties/google';
import { envHelper } from '@/shared/const/envHelper';

// const openSans = Open_Sans({
//   subsets: ['latin'],
//   display: 'swap',
// });

const delaGothicOne = localFont({
    src: [
        {
            path: '../fonts/DelaGothicOne-Regular.ttf',
            weight: '400',
            style: 'normal',
        },
    ],
    variable: '--font-family-title',
    fallback: ['system-ui', 'Arial', 'sans-serif'],
    display: 'swap',
});

const interFont = localFont({
    src: [
        {
            path: '../fonts/Inter-VariableFont_opsz,wght.ttf',
            style: 'normal',
        },
    ],
    variable: '--font-family-secondary',
    fallback: ['system-ui', 'Arial', 'sans-serif'],
    display: 'swap',
});

const jostFont = localFont({
    src: [
        {
            path: '../fonts/Jost-VariableFont_wght.ttf',
            weight: '700',
            style: 'normal',
        },
    ],
    variable: '--font-family-nav',
    fallback: ['system-ui', 'Arial', 'sans-serif'],
    display: 'swap',
});

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export function generateStaticParams() {
    return languages.map((lng) => ({ lng }));
}

export function generateMetadata(): Metadata {
    return {
        metadataBase: new URL(baseUrl),
        openGraph: {
            ...defaultOpenGraph,
        },
    };
}

interface Props {
    children: ReactNode;
    params: Promise<{ lng: string }>;
}

export default async function RootLayout(props: Props) {
    const { children, params } = props;
    const { lng } = await params;

    const GA_ID = envHelper.isDevMode ? envHelper.gaDevId : envHelper.gaProdId;

    return (
        <html
            lang={lng}
            dir={dir(lng)}
            data-scroll-behavior="smooth"
            className={`${interFont.variable} ${jostFont.variable} ${delaGothicOne.variable}`}
        >
            <head>
                <link
                    rel="icon"
                    href="/icons/alt_logo.ico"
                    sizes="72x72"
                />
                <link
                    rel="apple-touch-icon"
                    href="/icons/alt_logo.ico"
                    type="image"
                    sizes="72x72"
                />
            </head>
            <body>
                <Providers>{children}</Providers>
            </body>
            {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
        </html>
    );
}
