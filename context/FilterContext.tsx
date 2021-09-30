import React, { createContext, useContext, useState, useEffect } from 'react'
import apps, { App } from '../data/apps';
import { batchFetch } from '../utils/utils';
import useSWR from 'swr';

export type FilterContextState = {
    filterLangs: string[]
    relevantLangs: string[]
    allLangs: string[]
    relevantTech: string[]
    allTech: string[]
    setFilterLangs: (filterLangs: string[]) => void
    filterTech: string[]
    setFilterTech: (filterTech: string[]) => void
    filteredApps: App[],
    langData: Record<string, string[]>
}

const filterContext = createContext<FilterContextState>({
    filterLangs: [],
    relevantLangs: [],
    allLangs: [],
    relevantTech: [],
    allTech: [],
    setFilterLangs: () => { },
    filterTech: [],
    setFilterTech: () => { },
    filteredApps: apps,
    langData: {}
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
        langData: langs,
        allLangs: getAllLangs(langs)
    }
}

function getAllLangs(appLangs: Record<string, string[]>): string[] {
    const unique: string[] = [];
    apps.forEach(({ name }) => {
        const u = appLangs[name]?.filter(l => !unique.includes(l));
        if (u)
            unique.push(...u);
    });
    return unique;
}

const allTech: string[] = (() => {
    const unique: Array<string> = [];
    apps.forEach(app => {
        unique.push(...app.tech.filter(t => unique.indexOf(t) == -1))
    });
    return unique;
})()

function getAvailableTech(filteredApps: App[]): string[] {
    const unique: Array<string> = [];
    filteredApps.forEach(app => {
        unique.push(...app.tech.filter(t => unique.indexOf(t) == -1))
    });
    return unique;
}

function getAvailableLangs(filteredApps: App[], appLangs: Record<string, string[]>): string[] {
    const unique: string[] = [];
    filteredApps.forEach(({ name }) => {
        const u = appLangs[name]?.filter(l => !unique.includes(l));
        if (u)
            unique.push(...u);
    });
    return unique;
}

export const FilterProvider: React.FC = ({ children }) => {
    const [filterLangs, setFilterLangs] = useState<string[]>([]);
    const [filterTech, setFilterTech] = useState<string[]>([]);

    const { langData, allLangs } = useLangs();

    let filteredApps = apps;

    if (filterTech.length > 0) {
        filteredApps = filteredApps.filter(app => {
            return app.tech.some(t => filterTech.includes(t));
        });
    }

    if (filterLangs.length > 0) {
        filteredApps = filteredApps.filter(app => {
            return langData[app.name].some(l => filterLangs.includes(l));
        })
    }

    return (
        <filterContext.Provider value={{
            filterLangs,
            relevantLangs: getAvailableLangs(filteredApps, langData),
            allLangs,
            relevantTech: getAvailableTech(filteredApps),
            allTech,
            setFilterLangs,
            filterTech,
            setFilterTech,
            filteredApps,
            langData
        }}>
            {children}
        </filterContext.Provider>
    )
}

export function useFilterContext() {
    return useContext(filterContext);
}