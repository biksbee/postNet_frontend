'use client';
import { Provider } from 'react-redux';
import { store } from './store';

// @ts-ignore
export const Providers = ({ children }) => {
    return(
        <Provider store={store}>
            {children}
        </Provider>
    );
}