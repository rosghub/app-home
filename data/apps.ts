export type App = {
    name: string,
    desc: string,
    repo: string,
    tech: string[],
    host: string,
    link: string,
    status: string
};

const apps = [
    {
        name: 'One Time Secret',
        desc: 'Secure way to share secrets. Generate a disposable one-time use link to share an encrypted secret.',
        repo: 'github.com',
        tech: [ 'NodeJS', 'TypeScript', 'ExpressJS', 'MongoDB', 'EJS', 'Bulma' ],
        host: 'Vultr VPS (Nginx reverse proxy)',
        link: 'secrets.rosghub.xyz',
        status: 'Complete'
    },
    {
        name: 'This Site',
        desc: 'A directory site for my open source web apps.',
        repo: 'github.com',
        tech: [ 'ReactJS', 'NextJS', 'Bulma' ],
        host: 'Firebase',
        link: 'rosghub.xyz',
        status: 'WIP'
    }
];

export default apps;