import React, { FC, useState } from 'react';
import { App } from '../data/apps';
import styles from './FilterTech.module.css';

interface AggregateLangProps {
    langs: Array<string>
}

const FilterTech: FC<AggregateLangProps> = (props): JSX.Element => {
    const [selected, setSelected] = useState<Array<string>>(['All']);

    const langs = ['All', ...props.langs];

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
        {langs.map((l, i) => {
            return (
                <label className="checkbox mx-2" key={i}>
                    <input type="checkbox"/>
                    {` ${l} `}
                </label>
            )

        })}
    </>)
}

/*
let classes = `tag is-rounded is-normal my-1 mr-2 ${styles.tag}`;
if (selected.includes(l))
    classes += ' is-info';

return <span className={classes} onClick={clickHandler} key={i}>{l}</span>
*/
export default FilterTech;