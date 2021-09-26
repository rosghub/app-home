import React, { FC } from 'react';
import { useFilterContext } from '../context/FilterContext';

const FilterTech: FC = (): JSX.Element => {
    const { uniqueLangs, filterLangs, setFilterLangs } = useFilterContext();

    const langs = ['All', ...uniqueLangs];

    const toggleLang = (index: number) => {
        const l = langs[index];

        if (l == 'All') {
            // Clear selection
            setFilterLangs([]);
        }
        else if (filterLangs.includes(l)) {
            // Unselect
            const selection = filterLangs.filter(t => t != l);
            setFilterLangs(selection.length > 0 ? selection : []);
        }
        else {
            // Select
            setFilterLangs([...filterLangs, l]);
        }
    }

    return (<>
        {langs.map((l, i) => {
            return (
                <label className="checkbox mx-2" key={i}>
                    <input
                        type="checkbox"
                        checked={(filterLangs.length + i) == 0 || filterLangs.includes(l)}
                        onChange={() => toggleLang(i)} />
                    {` ${l} `}
                </label>
            )
        })}
    </>)
}

export default FilterTech;