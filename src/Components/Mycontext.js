import { createContext, useContext } from 'react';

const MyContext = createContext();

export function useDataContext() {
    return useContext(MyContext);
}

export const DataProvider = ({ children, data }) => {
    return <MyContext.Provider value={data}>{children}</MyContext.Provider>;
};
