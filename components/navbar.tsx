import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const navbar = () => {
    return (
        <nav className="navbar is-spaced has-background-light" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="https://rosghub.xyz">
                    <span className="title is-5">rosghub.xyz</span>
                </a>
            </div>

            <div className="navbar-end mr-4" style={{ display: 'flex' }}>
                <a href="https://github.com" target="_blank">
                    <span className="icon has-text-black">
                        <FontAwesomeIcon icon={faGithub} size="lg" />
                    </span>
                </a>
            </div>
        </nav>
    )
}

export default navbar;