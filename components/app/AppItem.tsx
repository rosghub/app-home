import styles from './AppItem.module.css';
import React from 'react';
import { App } from '../../data/apps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import AppProperty, { APIResult, AppPropertyFetcher, ContributorAPIResult, RepoAPIResult } from '../common/AppProperty';

type AppProps = {
    app: App
}

const AppItem = ({ app }: AppProps) => {

    const { owner, repo } = app.github || {};

    const langFetcher: AppPropertyFetcher = {
        apiEP: `https://api.github.com/repos/${owner}/${repo}/languages`,
        render: (data: APIResult): JSX.Element => {
            return (<>
                {Object.keys(data).map((l, i) => (
                    <span className="tag is-rounded is-warning is-normal m-1" key={i}>{l}</span>
                ))}
            </>)
        }
    };

    const commitCountFetcher: AppPropertyFetcher = {
        apiEP: `https://api.github.com/repos/${owner}/${repo}/contributors`,
        render: (data: APIResult): JSX.Element => {
            const contributors = data as ContributorAPIResult[];
            const count = contributors.find(c => c.login == owner)?.contributions || 0;
            return <p className="help">{count}</p>
        }
    }

    const lastCommitFetcher: AppPropertyFetcher = {
        apiEP: `https://api.github.com/repos/${owner}/${repo}`,
        render: (data: APIResult): JSX.Element => {
            const result = data as RepoAPIResult;
            const date = new Date(result.updated_at);
            return <p className="help">{date.toLocaleDateString()}</p>
        }
    }

    return (
        <div className="column is-6">
            <article className="message">
                <div className="message-header">
                    <p>{app.name}</p>
                    <a href={app.repo} target="_blank">
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                </div>
                <div className="message-body">

                    <p>{app.desc}</p>

                    <p><strong className="help mr-2 mt-5">Built With</strong></p>
                    {app.tech.map((e, i) => (
                        <span className="tag is-rounded is-info is-normal m-1">{e}</span>
                    ))}

                    {app.github && (
                        <>
                            <p><strong className="help mr-2 mt-3">Languages</strong></p>
                            <AppProperty appPropertyFetcher={langFetcher} />
                        </>
                    )}

                    <p><strong className="help mr-2 mt-4">Hosted On</strong></p>
                    <p className="mb-2">{app.host}</p>
                    <a className="mb-2" href={`https://${app.link}`} target="_blank">{app.link}</a>

                    <hr className={`mt-5 mb-4 ${styles.divider}`} />

                    <div className="level has-text-centered">
                        <div className="level-item">
                            <div>
                                <p className="help"><strong>Commits</strong></p>
                                <AppProperty appPropertyFetcher={commitCountFetcher} />
                            </div>
                        </div>

                        <div className="level-item">
                            <div>
                                <p className="help"><strong>Last Updated</strong></p>
                                <AppProperty appPropertyFetcher={lastCommitFetcher} />
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
        </div>
    )
}

export default AppItem;
