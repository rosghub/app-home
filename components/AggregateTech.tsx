import React, { FC } from 'react';
import { App } from '../data/apps';

interface AggregateTechProps {
    apps: App[]
}

const AggregateTech: FC<AggregateTechProps> = (props): JSX.Element => {
    const unique: Array<string> = [];
    props.apps.forEach(app => {
        unique.push(...app.tech.filter(t => unique.indexOf(t) == -1))
    });

    return (<>
        {unique.map((t, i) => (
            <span className="tag is-rounded is-info is-normal my-1 mr-2" key={i}>{t}</span>
        ))}
    </>)
}

export default AggregateTech;