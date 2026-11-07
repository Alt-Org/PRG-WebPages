'use client';
import { useEffect, useState, type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { createReduxStore, type InitialState } from '../config/store';

interface StoreProviderProps {
    children?: ReactNode;
    initialState?: InitialState;
}

export const StoreProvider = ({ children, initialState }: StoreProviderProps) => {
    const [store] = useState(() => createReduxStore(initialState));

    useEffect(() => setupListeners(store.dispatch), [store]);

    return <Provider store={store}>{children}</Provider>;
};
