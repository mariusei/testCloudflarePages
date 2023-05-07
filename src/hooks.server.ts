import type { Handle } from '@sveltejs/kit';
import { SECRET_KEY } from '$env/static/private';

export const handle = (async ({ event, resolve }) => {

    let key: string | undefined;
    key = event.cookies.get('user_key');
    event.locals.timestamp = Date.now();

    if (key && key === SECRET_KEY) {
        event.locals.user = "ok";
        event.locals.cookies = event.cookies.getAll();
    }
    
    const response = await resolve(event);
    //response.headers.set('x-custom-header', 'potato');

    return response;
}) satisfies Handle;