import React, { FC } from 'react';
import { useFilterContext } from '../context/FilterContext';

interface AggregateLangProps {
    langs: Array<string>
}

const FilterTech: FC<AggregateLangProps> = (props): JSX.Element => {
    const { uniqueLangs, filterLangs, setFilterLangs } = useFilterContext();

    const langs = ['All', ...uniqueLangs];

    const toggleLang = (index: number) => {
        const l = langs[index];

        if (l == 'All') {
            // Clear selection
            setFilterLangs(['All']);
        }
        else if (filterLangs.includes(l)) {
            // Unselect
            const selection = filterLangs.filter(t => t != l);
            setFilterLangs(selection.length > 0 ? selection : ['All']);
        }
        else {
            // Select
            if (filterLangs.length == 1 && filterLangs[0] == 'All')
                filterLangs.pop();

            setFilterLangs([...filterLangs, l]);
        }
    }

    return (<>
        {langs.map((l, i) => {
            return (
                <label className="checkbox mx-2" key={i}>
                    <input
                        type="checkbox"
                        checked={filterLangs.includes(l)}
                        onChange={() => toggleLang(i)} />
                    {` ${l} `}
                </label>
            )

        })}
    </>)
}

export default FilterTech;