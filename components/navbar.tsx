import React from 'react';

const navbar = () => {
    return (
        <nav className="navbar is-spaced has-background-warning" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="https://rosghub.xyz">
                    <span className="title is-5">rosghub.xyz</span>
                </a>
            </div>

            <div className="navbar-end mr-4" style={{ display: 'flex' }}>
                <a href="https://github.com" target="_blank">
                    <span className="icon has-text-black">
                        <i className="fab fa-github fa-lg"></i>
                    </span>
                </a>
            </div>
        </nav>
    )
}

export default navbar;