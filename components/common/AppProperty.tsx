import React, { FC } from 'react';
import useSWR from 'swr';
import { fetcher } from '../../utils/utils';

export interface AppPropertyFetcher {
    apiEP: string,
    render: (data: APIResult) => JSX.Element | null
}

type AppPropertyProps = {
    appPropertyFetcher: AppPropertyFetcher
    label: string,
    labelClassName?: string
}

export interface APIResult { };

export interface ContributorAPIResult extends APIResult {
    login: string,
    contributions: number
}

export interface RepoAPIResult extends APIResult {
    updated_at: string
}

export interface WorkflowAPIResult extends APIResult {
    workflows: {
        badge_url: string,
        html_url: string
    }[]
}

const AppProperty: FC<AppPropertyProps> = (props): JSX.Element => {
    const { apiEP, render } = props.appPropertyFetcher;
    const { data, error } = useSWR(apiEP, fetcher);

    if (error) {
        console.error('Error reaching API endpoint: ' + apiEP);
        console.error(error);
    }

    const labelCN = props.labelClassName || '';
    const label = <p><strong className={`help ${labelCN}`}>{props.label}</strong></p>

    if (data) {
        const rendered = render(data);
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