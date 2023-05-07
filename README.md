# Sveltekit on Cloudflare pages

A Cloudflare Pages-project based on Sveltekit and `@sveltejs/adapter-cloudflare`.

Authentication is implemented as a cookie that is either

1. Parsed by a middleware
2. Parsed by layout.server.ts

and compared to the 'true' value. If successful, a user object
is returned to the page, and authenticated content can be viewed.

## The problem

Cloudflare Pages caches the responses, so that only a cached 
middleware response is served. If the request was made with a
secret and subsequentially, an authenticated view was made, 
this response is cached and shown to *all* visitors.

## Method

The goal is to enable a simple cookie-based authentication scheme where

1. A cookie is set on the server after a successful form POST (Sveltekit action) - this works, the cookie is set and forwarded.
2. The cookie is parsed either by a middleware (in hooks.server.ts) or the +layout.server.ts file, and if it is valid, 
    a. `hooks.server.ts`: set a `event.locals.someFlagHere` 
    b. **`+layout.server.ts**`: return a `LayoutData` response (e.g. {user: "ok"})
3. The flag is parsed by the page, and if the user is authenticated, we serve the protected content.

Only step 1 works when the site is deployed to Cloudflare Pages. Step 2 and 3 are partially omitted. With a layout-based flow, the user is signed in once, and then an old cache is served, even though the cookie is present. With a middleware-based flow, the original cached response is always served.

## Discussion

I understand that any server side-functions are bundled to .svelte-kit/cloudflare/**_workers.js**. 

- With the hooks-method, I can find the function corresponding to the middleware I am introducing.
- With the Layout-method, I can see that the cookie is set and a new authenticated version of the page is loaded, before an older cached version is returned.

## To run

This script runs as expected locally. It fails only when submitted as a Cloudflare Pages site.

For a live version - see

https://testcloudflarepages-7vd.pages.dev/