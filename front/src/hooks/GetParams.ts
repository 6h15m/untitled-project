import { useLocation } from 'react-router-dom';

export const GetParams = (name: string) => new URLSearchParams(useLocation().search).get(name) || '';
