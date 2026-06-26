import { getToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const serverFetch = async (path) => {
    const token = await getToken()
    const res = await fetch(`${baseUrl}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        }
    });
    return res.json();
}

export const serverMutation = async (path, data, method = 'POST') => {
    const token = await getToken()
    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: data ? JSON.stringify(data) : undefined,
    });

    return res.json();
}