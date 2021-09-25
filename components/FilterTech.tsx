import React, { FC } from 'react';
import { App, uniqueTech } from '../data/apps';
import styles from './FilterTech.module.css';

import { useFilterContext } from '../context/FilterContext'

interface AggregateTechProps {
    apps: App[],
}

const FilterTech: FC<AggregateTechProps> = (props): JSX.Element => {
    const { filterTech, setFilterTech } = useFilterContext();

    const tags = ['All', ...uniqueTech];

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