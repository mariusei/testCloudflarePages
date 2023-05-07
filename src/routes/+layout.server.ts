import type { LayoutServerLoad } from './$types';
import { SECRET_KEY } from '$env/static/private';

export const load = (async ({cookies, locals}) => {

    // Check if cookie key is set and correct
    let key: string | undefined;

    try {
        key = locals.user;
        console.log("layout - Key: " + key)

        return {
            user: key,
            cookies_header: cookies.getAll(),
            cookies_local: locals.cookies,
            timestamp: new Date(locals.timestamp).toLocaleString()
        }

    } catch (e) {
        console.log(e)
        return {
            user: null,
            error: e
        }
    }

}) satisfies LayoutServerLoad;