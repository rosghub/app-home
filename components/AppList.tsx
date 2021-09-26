import React, { FC } from 'react'
import { useFilterContext } from '../context/FilterContext'
import AppItem from './app/AppItem';
import { App } from '../data/apps';

interface AppListProps {
    apps: App[],
}

const AppList: FC<AppListProps> = ({ apps }) => {
    const { filterTech, filterLangs, appLangs } = useFilterContext();

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

    // todo langs

    return (
        <div className="columns">
            {filteredApps.map((app, i) => (
                <div className="column is-6" key={i}>
                    <AppItem app={app} />
                </div>
            ))}
        </div>
    )
}

export default AppList;