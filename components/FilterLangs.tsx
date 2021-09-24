import React, { FC, useState } from 'react';

interface AggregateLangProps {
    langs: Array<string>
}

const FilterTech: FC<AggregateLangProps> = (props): JSX.Element => {
    const [selected, setSelected] = useState<Array<string>>(['All']);

    const langs = ['All', ...props.langs];

    const toggleLang = (index: number) => {
        const l = langs[index];

        if (l == 'All') {
            // Clear selection
            setSelected(['All']);
        }
        else if (selected.includes(l)) {
            // Unselect
            const selection = selected.filter(t => t != l);
            setSelected(selection.length > 0 ? selection : ['All']);
        }
        else {
            // Select
            if (selected.length == 1 && selected[0] == 'All')
                selected.pop();

            setSelected([...selected, l]);
        }
    }

    return (<>
        {langs.map((l, i) => {
            return (
                <label className="checkbox mx-2" key={i}>
                    <input
                        type="checkbox"
                        checked={selected.includes(l)}
                        onChange={() => toggleLang(i)} />
                    {` ${l} `}
                </label>
            )

        })}
    </>)
}

export default FilterTech;