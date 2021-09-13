import styles from './AppItem.module.css';
import React from 'react';
import { App } from '../../data/apps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import Languages from './Languages';

type AppProps = {
    app: App
}

const AppItem = ({ app }: AppProps) => {
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
                    <a className="mb-2" href={`https://${app.link}`} target="_blank">{app.link}</a>

                    <p><strong className="help mr-2 mt-5">Built With</strong></p>
                    {app.tech.map((e, i) => (
                        <span className="tag is-rounded is-info is-normal m-1">{e}</span>
                    ))}

                    {app.github && (
                        <Languages github={app.github} />
                    )}

                    <p><strong className="help mr-2 mt-4">Hosted On</strong></p>
                    <p className="mb-2">{app.host}</p>

                    <hr className={`mt-5 mb-4 ${styles.divider}`} />

                    <div className="level has-text-centered">
                        <div className="level-item">
                            <div>
                                <p className="help"><strong>Commits</strong></p>
                                <p className="help">224</p>
                            </div>
                        </div>

                        <div className="level-item">
                            <div>
                                <p className="help"><strong>Last Commit</strong></p>
                                <p className="help">2/2/2022</p>
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
