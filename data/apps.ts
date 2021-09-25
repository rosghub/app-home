export type App = {
    name: string,
    desc: string,
    repo: string,
    tech: string[],
    host: string,
    link?: string,
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
        repo: 'https://github.com/rosghub/one-time-secret',
        tech: ['NodeJS', 'Express', 'MongoDB', 'Bulma'],
        host: 'Vultr VPS (Nginx reverse proxy to express server)',
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
        repo: 'https://github.com/rosghub/app-home',
        tech: ['React', 'NextJS', 'Bulma'],
        host: 'Vultr VPS (Nginx)',
        link: 'rosghub.xyz',
        status: 'WIP',
        github: {
            owner: 'rosghub',
            repo: 'app-home'
        }
    }
];

export const uniqueTech: string[] = (() => {
    const unique: Array<string> = [];
    apps.forEach(app => {
        unique.push(...app.tech.filter(t => unique.indexOf(t) == -1))
    });
    return unique;
})()

export default apps;