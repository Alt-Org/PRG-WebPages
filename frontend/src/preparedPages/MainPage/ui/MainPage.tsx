'use client';

import useSizes from '@/shared/lib/hooks/useSizes';
import { NewsCard } from '@/widgets/NewsCard';
import { useGetNewsQuery, formatNews } from '@/entities/NewsV2';
import { envHelper } from '@/shared/const/envHelper';
import cls from './page.module.scss';
import { useParams } from 'next/navigation';
import { useClientTranslation } from '@/shared/i18n';

function MainPage() {
  const params = useParams();
  const lng = params.lng as string;
  const lngCode = lng === 'en' ? 'en-US' : lng === 'fi' ? 'fi-FI' : lng;
  const { isMobileSize } = useSizes();
  const { data: latestNews } = useGetNewsQuery({ limit: 2, page: 1 });
  const directusBaseUrl = envHelper.directusHost;
  const groupedNews = formatNews(latestNews || [], lngCode || 'fi-FI');
  const { t } = useClientTranslation('main');

  return (
    <div className={cls.MainPage}>
      <div className={cls.sections}>
        <div className={cls.newsSection}>
          <h2 className={cls.newsHeader}>{t('newsSection-title')}</h2>
          <div className={cls.newsGrid}>
            {groupedNews.map((news) => {
              const imageSrc = news.titlePicture?.id
                ? `${directusBaseUrl}/assets/${news.titlePicture.id}`
                : '';

              return (
                <NewsCard
                  key={news.id}
                  titlePicture={imageSrc}
                  title={news.title}
                  previewText={news.previewText}
                  date={news.date}
                  id={news.id}
                />
              );
            })}
          </div>

          <div className={cls.linkWrapper}>
            <a
              className={cls.link}
              href={`/news`}
              rel="noopener noreferrer"
            >
              {t('newsSection-seeMore')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
