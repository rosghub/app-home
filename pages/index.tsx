import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Navbar from '../components/navbar';
import AppItem from '../components/app/AppItem';
import FilterTech from '../components/FilterTech';

import apps from '../data/apps';


const Home: NextPage = () => {
    const [langs, setLangs] = useState<Array<string>>([]);

    const updateUniqueLanguages = (languages: Array<string>) => {
        const unique = languages.filter(l => !langs.includes(l));
        if (unique.length > 0) {
            const merged = langs.slice();
            merged.push(...unique);
            setLangs(merged);
        }
    };

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

                <section className="section">
                    <div className="container" style={{ marginBottom: '3rem' }}>
                        <p><strong>Libraries, frameworks, and databases</strong></p>
                        <FilterTech apps={apps} />

                        <p className="mt-4"><strong>Languages</strong></p>
                        {langs.join(' | ')}
                    </div>

                    <div className="container">

                        <div className="columns">
                            {apps.map((app, i) => (
                                <div className="column is-6" key={i}>
                                    <AppItem app={app} updateUniqueLanguages={updateUniqueLanguages} />
                                </div>
                            ))}
                        </div>

                    </div>
                </section>
            </body>
        </div>
    )
}

export default Home
