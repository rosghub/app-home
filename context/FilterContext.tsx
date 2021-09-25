import React, { createContext, useContext, useState } from 'react'

export type FilterContextState = {
    uniqueLangs: string[]
    filterLangs: string[]
    setFilterLangs: (filterLangs: string[]) => void
    filterTech: string[]
    setFilterTech: (filterTech: string[]) => void
    appLangs: Record<string, string[]>
    addAppLangs: (appName: string, langs: string[]) => void
}

const filterContext = createContext<FilterContextState>({
    uniqueLangs: [],
    filterLangs: ['All'],
    setFilterLangs: () => {},
    filterTech: ['All'],
    setFilterTech: () => {},
    appLangs: {},
    addAppLangs: () => {},
});

export const FilterProivder: React.FC = ({ children }) => {
    const [ uniqueLangs, setUniqueLangs ] = useState<string[]>([]);
    const [ filterLangs, setFilterLangs ] = useState<string[]>(['All']);
    const [ filterTech, setFilterTech ] = useState<string[]>(['All']);
    const [ appLangs, setAppLangs ] = useState<Record<string, string[]>>({});

    const addUniqueLanguages = (languages: string[]) => {
        const unique = languages.filter(l => !uniqueLangs.includes(l));
        if (unique.length > 0) {
            const merged = uniqueLangs.slice();
            merged.push(...unique);
            setUniqueLangs(merged);
        }
    };

    const addAppLangs = (appName: string, langs: string[]) => {
        /*
        const newAppLangs = { ...appLangs };
        newAppLangs[appName] = langs;
        setAppLangs(newAppLangs);
        */

        addUniqueLanguages(langs);
    }

    const value = {
        uniqueLangs,
        filterLangs,
        setFilterLangs,
        filterTech,
        setFilterTech,
        appLangs,
        addAppLangs
    }

    return (
        <filterContext.Provider value={value}>
            {children}
        </filterContext.Provider>
    )
}

export function useFilterContext() {
    return useContext(filterContext);
}