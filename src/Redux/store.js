import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import loginReducer from './slices/authSlice';
import { createStore, applyMiddleware } from 'redux';
import getAllUsersReducer from './slices/getAllUsersSlice';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    login: loginReducer,
    users: getAllUsersReducer,
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