export type App = {
    name: string,
    desc: string,
    repo: string,
    tech: string[],
    langs: string[],
    host: string,
    link: string,
    status: string,
    github?: Github
};

export type Github = {
    owner: string,
    repo: string
};

const apps: App[] = [
    {
        name: 'One Time Secret',
        desc: 'Secure way to share secrets. Generate a disposable one-time use link to share an encrypted secret.',
        repo: 'github.com',
        tech: [ 'NodeJS', 'ExpressJS', 'MongoDB', 'Bulma' ],
        langs: [ 'TypeScript', 'EJS', 'CSS', 'HTML' ],
        host: 'Vultr VPS (Nginx reverse proxy)',
        link: 'secrets.rosghub.xyz',
        status: 'Complete',
        github: {
            owner: 'rosghub',
            repo: 'one-time-secret'
        }
    },
    {
        name: 'This Site',
        desc: 'A directory site for my open source web apps.',
        repo: 'github.com',
        tech: [ 'ReactJS', 'NextJS', 'Bulma' ],
        langs: [ 'TypeScript', 'CSS', 'HTML' ],
        host: 'Firebase',
        link: 'rosghub.xyz',
        status: 'WIP'
    }
];

export default apps;