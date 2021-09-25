import React, { FC } from 'react';
import useSWR from 'swr';
import { fetcher } from '../../utils/utils';

import AppProperty from './AppProperty';

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

const RemoteAppProperty: FC<AppPropertyProps> = (props): JSX.Element => {
    const { apiEP, render } = props.appPropertyFetcher;
    const { data, error } = useSWR(apiEP, fetcher);

    if (error) {
        console.error('Error reaching API endpoint: ' + apiEP);
        console.error(error);
    }

    const isLoading = data == null;
    let rendered = null;
    if (!isLoading)
        rendered = render(data);

    return (
        <AppProperty
            isLoading={isLoading}
            label={props.label}
            rendered={rendered}
            labelClassName={props.labelClassName} />
    )
}

export default RemoteAppProperty;