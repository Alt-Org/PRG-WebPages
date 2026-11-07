import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { envHelper } from '@/shared/const/envHelper';
import { directusApi } from '@/shared/api/directusApi';

export const rootReducer = combineReducers({
    [directusApi.reducerPath]: directusApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type InitialState = Partial<RootState>;

export function createReduxStore(initialState?: InitialState) {
    return configureStore({
        reducer: rootReducer,
        devTools: envHelper.isDevMode,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(directusApi.middleware),
    });
}

export type AppStore = ReturnType<typeof createReduxStore>;
export type AppDispatch = AppStore['dispatch'];
