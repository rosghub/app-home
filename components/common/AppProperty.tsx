import React, { FC } from 'react';
import useSWR from 'swr';
import { fetcher } from '../../utils/utils';

export interface AppPropertyFetcher {
    apiEP: string,
    render: (data: APIResult) => JSX.Element
}

type AppPropertyProps = {
    appPropertyFetcher: AppPropertyFetcher
}

export interface APIResult {};

export interface ContributorAPIResult extends APIResult {
    login: string,
    contributions: number
}

export interface RepoAPIResult extends APIResult {
    updated_at: string
}

const AppProperty: FC<AppPropertyProps> = ({ appPropertyFetcher }): JSX.Element => {
    const { apiEP, render } = appPropertyFetcher;
    const { data, error } = useSWR(apiEP, fetcher);

    if (error) {
        console.error('Error reaching API endpoint: ' + apiEP);
        console.error(error);
    }

    return (
        <>
            {data
                ? render(data)
                : <progress className="progress is-small is-warning my-3" max="100" />
            }
        </>
    )
}

export default AppProperty;