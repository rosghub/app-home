import styles from './AppItem.module.css';
import Image from 'next/image';
import React from 'react';
import { App } from '../../data/apps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import AppProperty, {
    APIResult,
    AppPropertyFetcher,
    ContributorAPIResult,
    RepoAPIResult,
    WorkflowAPIResult
} from '../common/AppProperty';

type AppProps = {
    app: App
}

const AppItem = ({ app }: AppProps) => {

    const { owner, repo } = app.github || {};

    const langFetcher: AppPropertyFetcher = {
        apiEP: `https://api.github.com/repos/${owner}/${repo}/languages`,
        render: (data: APIResult) => {
            return (<>
                {Object.keys(data).map((l, i) => (
                    <span className="tag is-rounded is-warning is-normal m-1" key={i}>{l}</span>
                ))}
            </>)
        }
    };

    const commitCountFetcher: AppPropertyFetcher = {
        apiEP: `https://api.github.com/repos/${owner}/${repo}/contributors`,
        render: (data: APIResult) => {
            const contributors = data as ContributorAPIResult[];
            const count = contributors.find(c => c.login == owner)?.contributions || 0;
            return <p className="help">{count}</p>
        }
    }

    const lastCommitFetcher: AppPropertyFetcher = {
        apiEP: `https://api.github.com/repos/${owner}/${repo}`,
        render: (data: APIResult) => {
            const result = data as RepoAPIResult;
            const date = new Date(result.updated_at);
            return <p className="help">{date.toLocaleDateString()}</p>
        }
    }

    const ghaFetcher: AppPropertyFetcher = {
        apiEP: `https://api.github.com/repos/${owner}/${repo}/actions/workflows`,
        render: (data: APIResult) => {
            const result = data as WorkflowAPIResult;
            return (result.workflows.length > 0)
                ? (<>
                    {result.workflows.map((w, i) => (
                        <a href={w.html_url} target="_blank" rel="noreferrer" key={i}>
                            {/*<Image className="m-1" src={w.badge_url} />*/}
                            <img className="m-1" src={w.badge_url} alt="wf_badge" />
                        </a>
                    ))}
                </>)
                : null
        }
    }

    return (
        <article className="message">
            <div className="message-header">
                <a className={`${styles.link} mr-3`} href={app.repo} target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faGithub} className="mr-2" />
                    {app.name}
                </a>

                {app.link && (
                    <a className={`${styles.link} has-text-weight-normal is-size-7-mobile`} href={`https://${app.link}`} target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-2" size="sm" />
                        {app.link}
                    </a>
                )}
            </div>

            <div className="message-body">

                <p>{app.desc}</p>

                <p><strong className="help mt-5">Built With</strong></p>
                {app.tech.map((e, i) => (
                    <span className="tag is-rounded is-info is-normal m-1" key={i}>{e}</span>
                ))}

                <AppProperty
                    label="Languages"
                    labelClassName="mt-4"
                    appPropertyFetcher={langFetcher} />

                <p><strong className="help mt-4">Hosted On</strong></p>
                <span className="mb-2">{app.host}</span>

                <AppProperty
                    label="Github Actions"
                    labelClassName="mt-4"
                    appPropertyFetcher={ghaFetcher} />

                <hr className={`mt-5 mb-4 ${styles.divider}`} />

                <div className="level has-text-centered">
                    <div className="level-item">
                        <div>
                            <AppProperty
                                label="Commits"
                                appPropertyFetcher={commitCountFetcher} />
                        </div>
                    </div>

                    <div className="level-item">
                        <div>
                            <AppProperty
                                label="Last Updated"
                                appPropertyFetcher={lastCommitFetcher} />
                        </div>
                    </div>

                    <div className="level-item">
                        <div>
                            <p className="help"><strong>Status</strong></p>
                            <p className="help">{app.status}</p>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default AppItem;
