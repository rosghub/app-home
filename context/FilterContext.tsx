import React, { createContext, useContext, useState, useEffect } from 'react'
import apps from '../data/apps';
import { batchFetch } from '../utils/utils';
import useSWR from 'swr';

export type FilterContextState = {
    uniqueLangs: string[]
    filterLangs: string[]
    setFilterLangs: (filterLangs: string[]) => void
    filterTech: string[]
    setFilterTech: (filterTech: string[]) => void
    appLangs: Record<string, string[]>
}

const filterContext = createContext<FilterContextState>({
    uniqueLangs: [],
    filterLangs: ['All'],
    setFilterLangs: () => { },
    filterTech: ['All'],
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
    const [filterLangs, setFilterLangs] = useState<string[]>(['All']);
    const [filterTech, setFilterTech] = useState<string[]>(['All']);
    const [appLangs, setAppLangs] = useState<Record<string, string[]>>({});

    const { isLoading: langsLoading, langs } = useLangs();

    if (!langsLoading) {
        const newUnique: string[] = [];
        Object.keys(langs).forEach(app => {
            const unique = langs[app].filter(l => !newUnique.includes(l));
            newUnique.push(...unique);
        });
        setUniqueLangs(newUnique);
        setAppLangs(langs);
    }

    /*
    const addUniqueLanguages = (languages: string[]) => {
        const unique = languages.filter(l => !uniqueLangs.includes(l));
        if (unique.length > 0) {
            const merged = uniqueLangs.slice();
            merged.push(...unique);
            setUniqueLangs(merged);
        }
    };

    const addAppLangs = (appName: string, langs: string[]) => {
        //const newAppLangs = { ...appLangs };
        //newAppLangs[appName] = langs;
        //setAppLangs(newAppLangs);

        addUniqueLanguages(langs);
    }
    */

    const value = {
        uniqueLangs,
        filterLangs,
        setFilterLangs,
        filterTech,
        setFilterTech,
        appLangs
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