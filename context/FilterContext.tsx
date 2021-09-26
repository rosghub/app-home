import React, { createContext, useContext, useState, useEffect } from 'react'
import apps, { App, uniqueTech } from '../data/apps';
import { batchFetch } from '../utils/utils';
import useSWR from 'swr';

export type FilterContextState = {
    uniqueLangs: string[]
    filterLangs: string[]
    relevantLangs: string[]
    relevantTech: string[]
    setFilterLangs: (filterLangs: string[]) => void
    filterTech: string[]
    setFilterTech: (filterTech: string[]) => void
    appLangs: Record<string, string[]>
}

const filterContext = createContext<FilterContextState>({
    uniqueLangs: [],
    filterLangs: [],
    relevantLangs: [],
    relevantTech: [],
    setFilterLangs: () => { },
    filterTech: [],
    setFilterTech: () => { },
    appLangs: {}
});

const useLangs = () => {
    const langEndpoints = apps.map(a => {
        const { owner, repo } = a.github;
        return `https://api.github.com/repos/${owner}/${repo}/languages`
    });
    const { data, error } = useSWR(langEndpoints, batchFetch);

    if (error)
        console.error(error);

    let langs: Record<string, string[]> = {};
    if (data) {
        data.forEach((l, i) => {
            langs[apps[i].name] = Object.keys(l);
        });
    }

    return {
        isLoading: (data || error) == null,
        langs
    }
}


export const FilterProivder: React.FC = ({ children }) => {
    const [uniqueLangs, setUniqueLangs] = useState<string[]>([]);
    const [relevantLangs, setRelevantLangs] = useState<string[]>([]);
    const [relevantTech, setRelevantTech] = useState<string[]>(uniqueTech);
    const [appLangs, setAppLangs] = useState<Record<string, string[]>>({});
    const [filterLangs, _setFilterLangs] = useState<string[]>([]);
    const [filterTech, _setFilterTech] = useState<string[]>([]);

    const { isLoading: langsLoading, langs } = useLangs();

    useEffect(() => {
        if (!langsLoading) {
            const newUnique: string[] = [];
            Object.keys(langs).forEach(app => {
                const unique = langs[app].filter(l => !newUnique.includes(l));
                newUnique.push(...unique);
            });
            setUniqueLangs(newUnique);
            setRelevantLangs(newUnique);
            setAppLangs(langs)
        }
    }, [langsLoading]);

    const setFilterTech = (newFilterTech: string[]) => {
        _setFilterTech(newFilterTech);
    }

    const setFilterLangs = (newFilterLangs: string[]) => {
        _setFilterLangs(newFilterLangs);
    }

    return (
        <filterContext.Provider value={{
            uniqueLangs,
            filterLangs,
            relevantLangs,
            relevantTech,
            setFilterLangs,
            filterTech,
            setFilterTech,
            appLangs
        }}>
            {children}
        </filterContext.Provider>
    )
}

export function useFilterContext() {
    return useContext(filterContext);
}