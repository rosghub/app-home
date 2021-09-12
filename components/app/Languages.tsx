import React, { FC } from 'react';
import useSWR from 'swr';
import { Github } from '../../data/apps';
import { fetcher } from '../../utils/utils';

type LangProps = {
    github: Github
}

const lang: FC<LangProps> = ({ github }): JSX.Element => {
    const { owner, repo } = github;
    const { data, error } = useSWR(`https://api.github.com/repos/${owner}/${repo}/languages`, fetcher);

    if (error) {
        console.error('error getting languages');
        console.error(error);
    }

    return (
        <>
            <p><strong className="help mr-2 mt-3">Languages</strong></p>
            {data
                ? Object.keys(data).map((l, i) => (
                    <span className="tag is-rounded is-warning is-normal m-1" key={i}>{l}</span>
                ))
                : <progress className="progress is-small is-warning my-3" max="100" />
            }
        </>
    )
}

export default lang;