<script lang="ts">
    import type {ActionData} from './$types';

    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';

    // Retrieve user store from context
    const user = <Writable<string>>getContext('user');

    // If we want to set a server cookie:
    // we send a form action to page.server.ts
    // if we want to use the response, we can do so here:
    // export let form: ActionData;

    // usually, the user would submit a password
    // that is hashed and compared to the true value on the server side
    const superSecretKey = "1234";

</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#if $user}
    <p>Logged in as {$user}</p>
{:else}
    <p>Not logged in</p>
    <form method="POST">
        <input type="hidden" name="loginKey" value="{superSecretKey}">
        <button type="submit">Log in</button>
    </form>
{/if}

<h2>Debug</h2>
<p>Try and reload the page after logging in. Use the browser developer
    tools and inspect the Storage -> Cookies and see that a valid cookie
    still is set, even after reloading the page.
</p>
<p>This cookie
    should be parsed, and the user should be logged in automatically.
</p>
<p>However, a cached version of the page is shown. See the cached
    response date as the timestamp above.
</p>