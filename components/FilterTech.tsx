import React, { FC } from 'react';
import { App } from '../data/apps';
import styles from './FilterTech.module.css';

import { useFilterContext } from '../context/FilterContext'

interface AggregateTechProps {
    apps: App[],
}

function getTags(apps: App[]): string[] {
    const unique: Array<string> = ['All'];
    apps.forEach(app => {
        unique.push(...app.tech.filter(t => unique.indexOf(t) == -1))
    });
    return unique;
}

const FilterTech: FC<AggregateTechProps> = (props): JSX.Element => {
    const { filterTech, setFilterTech } = useFilterContext();

    const tags = getTags(props.apps);

    const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
        const tag = e.currentTarget.textContent;
        if (tag == null)
            return;

        if (tag == 'All') {
            // Clear selection
            setFilterTech(['All']);
        }
        else if (filterTech.includes(tag)) {
            // Unselect
            const selection = filterTech.filter(t => t != tag);
            setFilterTech(selection.length > 0 ? selection : ['All']);
        }
        else {
            // Select
            if (filterTech.length == 1 && filterTech[0] == 'All')
                filterTech.pop();

            setFilterTech([...filterTech, tag]);
        }
    }

    return (<>
        {tags.map((t, i) => {
            let classes = `tag is-rounded is-normal my-1 mr-2 ${styles.tag}`;
            if (filterTech.includes(t))
                classes += ' is-info';

            return <span className={classes} onClick={clickHandler} key={i}>{t}</span>
        })}
    </>)
}

export default FilterTech;