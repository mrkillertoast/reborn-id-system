<template>
    <div class="make-big">
        <p>{{ test }}</p>
        <br />
        <p>Times Clicked: {{ count }}</p>
        <button @click="clickButtonEvent">Click Me!</button>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
// @ts-ignore
import WebViewEvents from '@ViewUtility/webViewEvents';

let test = ref('hello world');
let count = ref(0);

function clickButtonEvent() {
    count.value += 1;
}

// You can also make a function that emits to the server from the WebView
// function emitToServer() {
//     WebViewEvents.emit('someEvent', 'someValue');
// }

onMounted(() => {
    console.log('Bind events here!');
    // WebViewEvents.on('your-event-name', () => {})

    // Always make sure that this is emitted last in your mount function
    // This should always match the name of your Vue file
    WebViewEvents.emitReady('RebornIdSystem');
});
</script>

<style scoped>
.make-big {
    font-size: 24px;
    color: red;
}
</style>
