import Image from 'next/image';
import cls from './Navbar.module.scss';
import PrgLogo from '@/shared/assets/logos/PRG-logo.png';
import Link from 'next/dist/client/link';

const Navbar = () => {
    return (
        <div className={cls.navbarContainer}>
            <nav className={cls.navbar}>
                <Image
                    src={PrgLogo}
                    alt="Logo"
                    width={100}
                    height={100}
                />
                <ul className={cls.navLinks}>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
