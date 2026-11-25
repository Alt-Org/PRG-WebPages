'use client';
import { ReactNode } from 'react';
import cls from './homeLayout.module.scss';

type Props = {
    children: ReactNode;
};

export default function HomeLayout({ children }: Props) {
    return (
        <div>
            <div className={cls.joinUsLayout}>{children}</div>
        </div>
    );
}
