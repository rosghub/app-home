export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const batchFetch = (...urls: string[]) => {
    console.log('fetching ' + urls.length + ' requests');
    return Promise.all(urls.map(fetcher));
}