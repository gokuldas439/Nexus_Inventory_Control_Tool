import { configureStore } from '@reduxjs/toolkit';
import {companyAuthReducer, loginApi, userAuthReducer} from '../reducers/api/authSlice';


export const store = configureStore({
    reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    userAuth:userAuthReducer,
    companyAuth:companyAuthReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loginApi.middleware)
    })



export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;