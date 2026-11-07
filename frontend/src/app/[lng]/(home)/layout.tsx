'use client';
import { ReactNode } from 'react';
import cls from './homeLayout.module.scss';

type Props = {
    children: ReactNode;
};

export default function HomeLayout({ children }: Props) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <div className={cls.joinUsLayout}>{children}</div>
        </div>
    );
}
