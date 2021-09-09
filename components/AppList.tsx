import React from 'react';

type AppListProps = {
    apps: string[]
};

type AppProps = {
    appName: string
}

const AppList = ({ apps }: AppListProps) => {
    return (
        <div>
            {apps.map((name, i) => {
                return <AppItem appName={name} key={i} />
            })}
        </div>
    )
}

const AppItem = (props: AppProps) => {
    return (
        <p>{props.appName}</p>
    )
}

export default AppList;