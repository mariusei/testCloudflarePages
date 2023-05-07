<script lang="ts">
  
    import type { LayoutData } from './$types';
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
    import { onMount } from "svelte";
      import { browser } from "$app/environment";
  
    export let data: LayoutData;
  
    // Create a store and update it when necessary...
    //const user = writable<null | any>(null);
    //$: user.set(data.user);
    //$: user = data.user;
  
    // ...and add it to the context for child components to access
    $: setContext('user', data.user);
    //setContext('user', null);
    onMount(() => {
      console.log("onMount");
      console.log("browser:", browser);
      console.log("data:", data);
    });
    //console.log("GOT DATA:", JSON.stringify(data));
  
  </script>
  
<p class="text-white">The request arrived:<br/> {data.timestamp}</p>
<slot/>