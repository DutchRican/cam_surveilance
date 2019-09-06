export const serverUrl = 'http://localhost:3000';
export const fetcher = (url, method = 'GET') => {
    return fetch(`${serverUrl}${url}`, {method});
}