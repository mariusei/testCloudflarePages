import type { LayoutServerLoad } from './$types';

// can optionally compare server set cookie to secret key
//import { SECRET_KEY } from '$env/static/private';
const SECRET_KEY="1234";

export const load = (async ({cookies, locals}) => {


    let user: string | undefined;

    // // Cookie based method
    // // here in Layout.server.ts (no middleware):

    let user_cookie: string | undefined;
    try {
        user_cookie = cookies.get('user_key');
        console.log("layout - user from cookie: " + user_cookie)

        if (user_cookie && user_cookie === SECRET_KEY) {
            user = user_cookie;
        } else {
            user = undefined;
        }

        return {
            user: user,
            cookies_header: cookies.getAll(),
            cookies_local: locals.cookies,
            // convert timestamp from middleware to readable format
            timestamp: new Date(locals.timestamp).toLocaleString()
        }
        
    } catch (error) {
        console.error(error)
        return {
            user: null,
            error: error
        }
    }

    // Locals/middleware-based method: from hoooks.server.ts
    // try {
    //     // Did the middleware return a user?
    //     user = locals.user;
    //     console.log("layout - user from middleware: " + user)

    //     return {
    //         user: user,
    //         cookies_header: cookies.getAll(),
    //         cookies_local: locals.cookies,
    //         // convert timestamp from middleware to readable format
    //         timestamp: new Date(locals.timestamp).toLocaleString()
    //     }

    // } catch (e) {
    //     console.log(e)
    //     return {
    //         user: null,
    //         error: e
    //     }
    // }

}) satisfies LayoutServerLoad;