export const getParams = (name: string) => new URLSearchParams(window.location.search).get(name) || '';
