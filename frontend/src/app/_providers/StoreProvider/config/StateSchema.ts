import { strapiApi, directusApi } from '@/shared/api';

export interface StateSchema {
  [strapiApi.reducerPath]: ReturnType<typeof strapiApi.reducer>;
  [directusApi.reducerPath]: ReturnType<typeof directusApi.reducer>;
}
