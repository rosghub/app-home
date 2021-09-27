import { FC } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import AppList from '../components/AppList'
import Navbar from '../components/navbar';
import FilterTech from '../components/FilterTech';
import FilterLangs from '../components/FilterLangs';

import { FilterProvider, useFilterContext } from '../context/FilterContext';

import apps from '../data/apps';


const Home: FC = () => {

    const { uniqueLangs, filterTech } = useFilterContext();

    return (
        <div className={styles.container}>
            <Head>
                <title>App Home</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
            </Head>

            <body>

                <Navbar />

                <section className="section">
                    <div className="container has-text-centered">
                        <p className="subtitle">
                            <strong>Welcome</strong><br />
                            This page serves as a directory for my work and a homepage for my VPS.<br />
                            Feel free to use, modify, or ask more about any projects here.
                        </p>
                    </div>
                </section>

                <FilterProvider>
                    <section className="section">
                        <div className="container" style={{ marginBottom: '3rem' }}>
                            <p><strong>Libraries, frameworks, and databases</strong></p>
                            <FilterTech apps={apps} />

                            <p className="mt-4"><strong>Languages</strong></p>
                            <div className="help">
                                <FilterLangs />
                            </div>
                        </div>

                        <div className="container">

                            <AppList apps={apps} />

                        </div>
                    </section>
                </FilterProvider>

            </body>
        </div>
    )
}

export default Home;
