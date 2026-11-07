import { MainPageProps } from '@/preparedPages/MainPage';
import { getServerTranslation } from '@/shared/i18n';
import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';
import { getRouteMainPage } from '@/shared/appLinks/RoutePaths';
import { createPage } from '@/app/_helpers';
import { defaultOpenGraph } from '@/shared/seoConstants';

export async function _getPage(lng: string) {
  const { t } = await getServerTranslation(lng, 'main');

  return createPage<MainPageProps>({
    buildSeo: () => ({
      title: t('head-title'),
      description: t('head-description'),
      keywords: t('head-keywords'),
      openGraph: {
        ...defaultOpenGraph,
        title: t('og-title'),
        description: t('og-description'),
        url: `${getRouteMainPage()}${lng}`,
      },
      alternates: {
        canonical: `${getRouteMainPage()}${lng}`,
      },
    }),
    buildPage: () => ({
      contactSection: {
        title: t('contact-title'),
        links: [
          {
            link: AppExternalLinks.duunitori,
            text: t('playWithUs-OpenPositions-body'),
          },
          {
            link: AppExternalLinks.discord,
            text: t('contact-discordLinkText'),
          },
        ],
      },
      newsSection: {
        mainTitle: t('newsSection-title'),
      },
    }),
  });
}
