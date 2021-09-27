import React, { createContext, useContext, useState, useEffect } from 'react'
import apps, { App } from '../data/apps';
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
    appLangs: Record<string, string[]>,
    filteredApps: App[]
}

const filterContext = createContext<FilterContextState>({
    uniqueLangs: [],
    filterLangs: [],
    relevantLangs: [],
    relevantTech: [],
    setFilterLangs: () => { },
    filterTech: [],
    setFilterTech: () => { },
    appLangs: {},
    filteredApps: apps
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

function getAvailableTech(
    filteredApps: App[]
): string[] {
    const unique: Array<string> = [];
    filteredApps.forEach(app => {
        unique.push(...app.tech.filter(t => unique.indexOf(t) == -1))
    });
    return unique;
}

function getAvailableLangs(
    filteredApps: App[],
    appLangs: Record<string, string[]>
): string[] {
    const unique: string[] = [];
    filteredApps.forEach(({ name }) => {
        const u = appLangs[name]?.filter(l => !unique.includes(l));
        if (u)
            unique.push(...u);
    });
    return unique;
}

export const FilterProvider: React.FC = ({ children }) => {
    const [uniqueLangs, setUniqueLangs] = useState<string[]>([]);
    const [appLangs, setAppLangs] = useState<Record<string, string[]>>({});
    const [filterLangs, setFilterLangs] = useState<string[]>([]);
    const [filterTech, setFilterTech] = useState<string[]>([]);

    const { isLoading: isLoadingLangs, langs } = useLangs();

    useEffect(() => {
        if (!isLoadingLangs) {
            const newUnique = getAvailableLangs(apps, langs);
            setUniqueLangs(newUnique);
            setAppLangs(langs)
        }
    }, [isLoadingLangs]);

    let filteredApps = apps;

    if (filterTech.length > 0) {
        filteredApps = filteredApps.filter(app => {
            return app.tech.some(t => filterTech.includes(t));
        });
    }

    if (filterLangs.length > 0) {
        filteredApps = filteredApps.filter(app => {
            return appLangs[app.name].some(l => filterLangs.includes(l));
        })
    }

    return (
        <filterContext.Provider value={{
            uniqueLangs,
            filterLangs,
            relevantLangs: getAvailableLangs(filteredApps, appLangs),
            relevantTech: getAvailableTech(filteredApps),
            setFilterLangs,
            filterTech,
            setFilterTech,
            appLangs,
            filteredApps
        }}>
            {children}
        </filterContext.Provider>
    )
}

export function useFilterContext() {
    return useContext(filterContext);
}