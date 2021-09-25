import React, { createContext, useContext, useState } from 'react'

export type FilterContextState = {
    uniqueLangs: Array<string>
    filterLangs: Array<string>
    filterTech: Array<string>
    addUniqueLanguages: (langs: Array<string>) => void
}

const filterContext = createContext<FilterContextState>({
    uniqueLangs: [],
    filterLangs: ['All'],
    filterTech: ['All'],
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
        filterTech,
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