import React, { FC, useState } from 'react';
import { App } from '../data/apps';
import styles from './FilterTech.module.css';

interface AggregateTechProps {
    apps: App[],
}

const FilterTech: FC<AggregateTechProps> = (props): JSX.Element => {
    const unique: Array<string> = ['All'];

    props.apps.forEach(app => {
        unique.push(...app.tech.filter(t => unique.indexOf(t) == -1))
    });

    const [selected, setSelected] = useState<Array<string>>(['All']);

    const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
        console.log('Tag clicked: ' + e.currentTarget.textContent);
    }

    return (<>
        {unique.map((t, i) => {
            let classes = `tag is-rounded is-normal my-1 mr-2 ${styles.tag}`;
            if (selected.includes(t))
                classes += ' is-info';

            return <span className={classes} onClick={clickHandler} key={i}>{t}</span>
        })}
    </>)
}

export default FilterTech;