'use client';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { useParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import {
    initReactI18next,
    useTranslation as useTranslationOrg,
    type UseTranslationOptions,
} from 'react-i18next';
import { getOptions, languages, cookieName } from './settings';

const runsOnServerSide = typeof window === 'undefined';

export const i18n = i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(
        resourcesToBackend(
            (language: string, namespace: string) =>
                import(`../locales/${language}/${namespace}.json`),
        ),
    )
    // .use(LocizeBackend) // locize backend could be used on client side, but prefer to keep it in sync with server side
    .init({
        ...getOptions(),
        lng: undefined, // let detect the language on client side
        detection: {
            order: ['path', 'htmlTag', 'cookie', 'navigator'],
        },
        preload: runsOnServerSide ? languages : [],
    });

/**
 * Hook for using i18n with client-side components.
 */
export function useTranslation(ns: string, options?: UseTranslationOptions<string>) {
    const params = useParams();
    const lng = typeof params.lng === 'string' ? params.lng : undefined;
    const { lng: optionLng, ...translationOptions } = options ?? {};
    const translationLanguage = lng ?? optionLng;
    const [cookies, setCookie] = useCookies([cookieName]);
    // Passing lng makes this react-i18next version skip new namespaces for preloaded languages.
    const { i18n: instance, ready } = useTranslationOrg(ns, translationOptions);
    const t = useMemo(
        () => instance.getFixedT(translationLanguage ?? null, ns, translationOptions.keyPrefix),
        [instance, translationLanguage, ns, translationOptions.keyPrefix],
    );
    const cookieLanguage = cookies[cookieName];

    useEffect(() => {
        if (!translationLanguage || instance.resolvedLanguage === translationLanguage) return;
        void instance.changeLanguage(translationLanguage);
    }, [translationLanguage, instance]);

    useEffect(() => {
        if (!lng || cookieLanguage === lng) return;
        setCookie(cookieName, lng, { path: '/' });
    }, [lng, cookieLanguage, setCookie]);

    const result = [t, instance, ready] satisfies [typeof t, typeof instance, boolean];
    return Object.assign(result, { t, i18n: instance, ready });
}
