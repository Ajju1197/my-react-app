import { combineReducers, configureStore } from '@reduxjs/toolkit'
import loginReducer from './slices/authSlice';
import getAllUsersReducer from './slices/getAllUsersSlice';
import productCartReducer from './slices/productCartSlice';
import blogsReducer from './slices/blogsSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    login: loginReducer,
    users: getAllUsersReducer,
    productCart: productCartReducer,
    blog: blogsReducer,
})

const persistConfig = {
    key:'root',
    storage,
    version: 1,
}

const persistReducers = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistReducers,
})

export const persistor = persistStore(store);