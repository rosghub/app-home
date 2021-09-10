import React from 'react';
import { App } from '../data/apps';

type AppListProps = {
    apps: App[]
};

type AppProps = {
    app: App
}

const AppList = ({ apps }: AppListProps) => {
    return (
        <div>
            {apps.map((app, i) => {
                return <AppItem app={app} key={i} />
            })}
        </div>
    )
}

const AppItem = (props: AppProps) => {
    return (
        <p>{props.app.name}</p>
    )
}

export default AppList;