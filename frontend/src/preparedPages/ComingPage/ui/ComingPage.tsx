'use client';
import cls from './ComingPage.module.scss';
import { useClientTranslation } from '@/shared/i18n';
import useIsMobileSize from '@/shared/lib/hooks/useIsMobileSize';

export type Props = {
  /** the title text that goes on the curved path */
  title: string;
  /** language code, like 'fi' for finnish. changes letter spacing a bit */
  lng?: string;
};

/** the "coming soon" page. curved title with fog, a sign, and characters*/
const ComingPage = (props: Props) => {
  const { title, lng } = props;
  const { t } = useClientTranslation('coming');
  const isFinnish = lng === 'fi';
  const { isMobileSize } = useIsMobileSize();

  const viewBox = '0 -100 1700 200';
  const pathId = 'textArc';
  const pathD = 'M 50 200 Q 850 -300 1650 200';
  const imgX = isMobileSize ? '0' : '50';
  const imgY = isMobileSize ? '-300' : '-220';
  const imgW = isMobileSize ? '1700' : '1600';
  const imgH = isMobileSize ? '600' : '420';

  return (
    <main className={cls.main}>
      <div className={cls.pageContent}>
        <div className={cls.titleSection}>
          <svg
            viewBox={viewBox}
            className={cls.curvedText}
          >
            <path
              id={pathId}
              d={pathD}
              fill="none"
            />
            <text>
              <textPath
                href={`#${pathId}`}
                startOffset="50%"
                textAnchor="middle"
                className={cls.curvedTextPath}
                {...(isMobileSize ? { textLength: '1600', lengthAdjust: 'spacing' } : {})}
                letterSpacing={isFinnish ? '5' : '-10'}
                style={!isFinnish && isMobileSize ? { fontSize: '130px' } : undefined}
              >
                {title}
              </textPath>
            </text>
          </svg>
        </div>
        <div className={cls.bodySection}>
          <div className={cls.signWrapper}>
            <span className={cls.signText}>{t('signTitle')}</span>
          </div>
          <div className={cls.images}></div>
        </div>
      </div>
    </main>
  );
};

export default ComingPage;
