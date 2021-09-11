import React from 'react';
import { App } from '../data/apps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons'

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

                    <p><strong className="help mr-2 mt-4">Built With</strong></p>
                    {app.tech.map((e, i) => (
                        <span className="tag is-rounded is-info is-normal m-1">{e}</span>
                    ))}

                    <p><strong className="help mr-2 mt-3">Hosted On</strong></p>
                    <p>{app.host}</p>

                    <div className="columns is-mobile py-2">
                        <div className="column">
                            <p className="help"><strong>Commits</strong></p>
                            <p className="help">224</p>
                        </div>
                        <div className="column">
                            <p className="help"><strong>Status</strong></p>
                            <p className="help">{app.status}</p>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    )
}

export default AppItem;