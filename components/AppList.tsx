import React, { FC } from 'react'
import { useFilterContext } from '../context/FilterContext'
import AppItem from './app/AppItem';
import { App } from '../data/apps';

interface AppListProps {
    apps: App[],
}

const AppList: FC<AppListProps> = ({ apps }) => {
    const { filterTech, filterLangs } = useFilterContext();

    let filteredApps = apps;
    if (filterTech.length > 1 || filterTech[0] != 'All')
        filteredApps = filteredApps.filter(app => {
            return app.tech.some(t => filterTech.includes(t))
        });

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