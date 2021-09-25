import React, { FC } from 'react';

type AppPropertyProps = {
    isLoading: boolean,
    label: string,
    rendered: JSX.Element | null,
    labelClassName?: string
}

const AppProperty: FC<AppPropertyProps> = (props): JSX.Element => {

    const { rendered, isLoading } = props;

    const labelCN = props.labelClassName || '';
    const label = <p><strong className={`help ${labelCN}`}>{props.label}</strong></p>

    if (!isLoading) {
        return rendered
            ? (<>
                {label}
                {rendered}
            </>)
            : <></>
    }

    return (<>
        {label}
        <progress className="progress is-small is-danger my-3" max="100" />
    </>)
}

export default AppProperty;