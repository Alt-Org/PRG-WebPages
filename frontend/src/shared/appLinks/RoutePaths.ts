export enum AppRoutesLinks {
    MAIN = 'MAIN',
    ABOUT = 'ABOUT',
    PRIVACY = 'privacy',
    COOKIES = 'cookies',
    ETHICAL_GUIDELINES = 'ETHICAL_GUIDELINES',
    FORUM = 'FORUM',
    GAME_ART = 'GAME_ART',

    NEWS = 'NEWS',
    NEWSELEMENT = 'NEWSELEMENT',
    MEMBERS = 'MEMBERS',

    JOIN_US = 'JOIN_US',

    NOT_FOUND = 'NOT_FOUND',
    NOT_FOUND_CATCH = 'NOT_FOUND_CATCH',

    COMING = 'COMING',
}

const news = '/news';
/**
 * The values are used as routesLinks throughout the app,
 * if do update , don't forget update also routeConfig at App layer
 * @deprecated use getters instead
 * add new getter functions if new pages are added
 */
export const RoutePaths: Record<AppRoutesLinks, string> = {
    [AppRoutesLinks.MAIN]: '/',
    [AppRoutesLinks.ABOUT]: '/about',
    [AppRoutesLinks.PRIVACY]: '/privacy',
    [AppRoutesLinks.COOKIES]: '/cookies',
    [AppRoutesLinks.ETHICAL_GUIDELINES]: '/ethical-guidelines',
    [AppRoutesLinks.GAME_ART]: '/artGame',

    [AppRoutesLinks.JOIN_US]: '/join-us',

    [AppRoutesLinks.NEWS]: news,
    [AppRoutesLinks.NEWSELEMENT]: news + '/:id',
    [AppRoutesLinks.FORUM]: '/forum',
    [AppRoutesLinks.MEMBERS]: '/team',
    [AppRoutesLinks.NOT_FOUND]: '/404',
    [AppRoutesLinks.COMING]: '/coming',

    // last one
    [AppRoutesLinks.NOT_FOUND_CATCH]: '*',
};

export const getRouteMainPage = () => '/';
export const getRouteTeamPage = () => '/team';

export const getRouteAllNewsPage = () => '/news';
export const getRouteOneNewsPage = (id: string) => `/news/${id}`;
export const getRouteNewsCategoryPage = (slug: string) => `/news/category/${slug}`;

export const getRouteGameArtPage = () => '/artGame';

export const getRouteJoinUsPage = () => '/join-us';

export const getRoutePrivacyPage = () => '/privacy';
export const getRouteCookiesPage = () => '/cookies';
export const getRouteDataPolicyPage = () => '/data-policy';
export const getRouteEthicalGuidelinesPage = () => '/ethical-guidelines';
export const getRouteAboutPage = () => '/about';
export const getRouteComingSoonPage = () => '/coming';
export const getRouteForumPage = () => '/forum';
export const getRoute404Page = () => '/404';

export const getRoutePrgPage = () => '/prg';
