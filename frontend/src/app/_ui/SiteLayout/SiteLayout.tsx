import Navbar from '@/widgets/Navbar';
import cls from './SiteLayout.module.scss';
import Footer from '@/widgets/Footer';

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={cls.siteLayout}>
            <Navbar />
            <div className={cls.content}>{children}</div>
            <Footer />
        </div>
    );
};

export default SiteLayout;
