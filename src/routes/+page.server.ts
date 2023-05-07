import type { Actions } from './$types';
// would usually set an environment variable
//import { SECRET_KEY } from '$env/static/private';
const SECRET_KEY = "1234";

export const actions = {
    default: async ({ request, cookies }) => {

        console.log("GOT LOGIN REQUEST");

        // compare form data to secret key
        const form = await request.formData();
        const key = form.get('loginKey');

        console.log("GOT LOGIN REQUEST - KEY: " + key);

        if (key && key === SECRET_KEY) {
            console.log("GOT LOGIN REQUEST - SUCCESS");
            cookies.set("user_key", key, { path: '/', maxAge: 60*60 });
        } else {
            console.log("GOT LOGIN REQUEST - FAIL");
        }

    }
} satisfies Actions;