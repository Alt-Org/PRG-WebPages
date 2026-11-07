import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
  persistReducer,
} from 'redux-persist';
import type { PersistPartial } from 'redux-persist/es/persistReducer';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { envHelper } from '@/shared/const/envHelper';
import { directusApi } from '@/shared/api';
import { StateSchema } from './StateSchema';

const createNoopStorage = () => ({
  getItem(_key: string) {
    return Promise.resolve(null);
  },
  setItem(_key: string, value: string) {
    return Promise.resolve(value);
  },
  removeItem(_key: string) {
    return Promise.resolve();
  },
});

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

export function createReduxStore(initialState?: StateSchema) {
  const rootReducer = combineReducers({
    [directusApi.reducerPath]: directusApi.reducer,
  });

  const persistConfig = {
    key: 'root',
    storage,
    blacklist: [directusApi.reducerPath],
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  type PersistedRootState = ReturnType<typeof rootReducer> & PersistPartial;

  const store = configureStore({
    reducer: persistedReducer,
    devTools: envHelper.isDevMode,
    preloadedState: initialState as PersistedRootState | undefined,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(directusApi.middleware as Middleware),
  });

  const persistor = persistStore(store);

  setupListeners(store.dispatch);

  return { store, persistor };
}
