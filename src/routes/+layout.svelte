<script lang="ts">
  
    import type { LayoutData } from './$types';
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
  
    // data:
    // - user
    // - timestamp
    // - error
    // - cookies_header
    // - cookies_local
    export let data: LayoutData;
    
    // We should be careful with using stores in Layouts - easily become
    // globals which are then reused between different user sessions...
    // see https://github.com/sveltejs/kit/discussions/4339
    // even though we are working on the 'client side' code (.svelte)
    //
    // Instead, use contexts,

    const user = writable();
    $: user.set(data.user);
    setContext('user', user);

    // Check the console to see if if the timestamp corresponds
    // to the time the request was made, or if we have a cached
    // response from the server.

    console.log("data:", data);
    console.log("Timestamp of request:", data.timestamp);
  
</script>
  
<p class="text-white">
  Serving a response based on a request that arrived:<br/> 
  {data.timestamp}
</p>

<slot/>