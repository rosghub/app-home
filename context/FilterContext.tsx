import React, { createContext, useContext, useState } from 'react'

export type FilterContextState = {
    uniqueLangs: Array<string>
    filterLangs: Array<string>,
    setFilterLangs: (filterLangs: Array<string>) => void,
    filterTech: Array<string>,
    setFilterTech: (filterTech: Array<string>) => void,
    addUniqueLanguages: (langs: Array<string>) => void
}

const filterContext = createContext<FilterContextState>({
    uniqueLangs: [],
    filterLangs: ['All'],
    setFilterLangs: () => {},
    filterTech: ['All'],
    setFilterTech: () => {},
    addUniqueLanguages: () => {}
});

export const FilterProivder: React.FC = ({ children }) => {
    const [ uniqueLangs, setUniqueLangs ] = useState<Array<string>>([]);
    const [ filterLangs, setFilterLangs ] = useState<Array<string>>(['All']);
    const [ filterTech, setFilterTech ] = useState<Array<string>>(['All']);

    const addUniqueLanguages = (languages: Array<string>) => {
        const unique = languages.filter(l => !uniqueLangs.includes(l));
        if (unique.length > 0) {
            const merged = uniqueLangs.slice();
            merged.push(...unique);
            setUniqueLangs(merged);
        }
    };

    const value = {
        uniqueLangs,
        filterLangs,
        setFilterLangs,
        filterTech,
        setFilterTech,
        addUniqueLanguages
    };

    return (
        <filterContext.Provider value={value}>
            {children}
        </filterContext.Provider>
    )
}

export function useFilterContext() {
    return useContext(filterContext);
}