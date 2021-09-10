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
                    {app.tech.map((e, i) => (
                        <span className="tag is-info m-1" key={i}>{e}</span>
                    ))}
                </div>
            </article>
        </div>
    )
}

export default AppItem;