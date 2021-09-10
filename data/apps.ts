export type App = {
    name: string,
    desc: string,
    repo: string
};

const apps = [
    {
        name: 'One Time Secret',
        desc: 'Secure way to share secrets',
        repo: 'github.com'
    },
    {
        name: 'Other app',
        desc: 'Other app description',
        repo: 'github.com'
    }
];

export default apps;