import React, { FC, useState } from 'react';
import { App } from '../data/apps';
import styles from './FilterTech.module.css';

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
    const [selected, setSelected] = useState<Array<string>>(['All']);

    const tags = getTags(props.apps);

    const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
        const tag = e.currentTarget.textContent;
        if (tag == null)
            return;

        if (tag == 'All') {
            // Clear selection
            setSelected(['All']);
        }
        else if (selected.includes(tag)) {
            // Unselect
            const selection = selected.filter(t => t != tag);
            setSelected(selection.length > 0 ? selection : ['All']);
        }
        else {
            // Select
            if (selected.length == 1 && selected[0] == 'All')
                selected.pop();

            setSelected([...selected, tag]);
        }
    }

    return (<>
        {tags.map((t, i) => {
            let classes = `tag is-rounded is-normal my-1 mr-2 ${styles.tag}`;
            if (selected.includes(t))
                classes += ' is-info';

            return <span className={classes} onClick={clickHandler} key={i}>{t}</span>
        })}
    </>)
}

export default FilterTech;