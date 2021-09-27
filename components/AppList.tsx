import React, { FC } from 'react'
import { useFilterContext } from '../context/FilterContext'
import AppItem from './app/AppItem';
import { App } from '../data/apps';

interface AppListProps {
    apps: App[],
}

const AppList: FC<AppListProps> = ({ apps }) => {
    const { filteredApps } = useFilterContext();

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