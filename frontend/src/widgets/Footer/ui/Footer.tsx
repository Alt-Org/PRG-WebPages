import Image from 'next/image';
import cls from './Footer.module.scss';
import PrgLogo from '@/shared/assets/logos/PRG-logo.png';

const Footer = () => {
    return (
        <footer className={cls.footer}>
            <div className={cls.footerContent}>
                <Image
                    src={PrgLogo}
                    alt="Logo"
                    width={350}
                    height={350}
                />
                <p>
                    &copy; {new Date().getFullYear()} Psyche's Royale Gaming ry - Y-tunnus:
                    1459866-4
                </p>
            </div>
        </footer>
    );
};

export default Footer;
