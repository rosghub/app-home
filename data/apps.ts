export type App = {
    name: string,
    desc: string,
    repo: string,
    tech: string[],
    host: string
};

const apps = [
    {
        name: 'One Time Secret',
        desc: 'Secure way to share secrets',
        repo: 'github.com',
        tech: [ 'NodeJS', 'TypeScript', 'ExpressJS', 'MongoDB', 'EJS', 'BulmaCSS' ],
        host: 'Vultr VPS'
    },
    {
        name: 'Other app',
        desc: 'Other app description',
        repo: 'github.com',
        tech: [ 'NodeJS' ],
        host: 'Firebase'
    }
];

export default apps;