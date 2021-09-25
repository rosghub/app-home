export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const batchFetch = (...urls: string[]) => {
    return Promise.all(urls.map(fetcher));
}