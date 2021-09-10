import React from 'react';
import { App } from '../data/apps';

import AppItem from './AppItem';

type AppListProps = {
    apps: App[]
};

const AppList = ({ apps }: AppListProps) => {
    return (
        <div className="columns">
            {apps.map((app, i) => {
                return <AppItem app={app} key={i} />
            })}
        </div>
    )
}

export default AppList;