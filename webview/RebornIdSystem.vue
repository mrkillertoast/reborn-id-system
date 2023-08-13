<template>
    <div class="id-card">
        <div class="id-card-elements">
            <div class="id-card-picture">
                <div class="placeholder-image"></div>
            </div>
            <div class="id-card-text">
                <h2>Joe Doe</h2>
                <p>Random City / 29.06.2023</p>
            </div>
        </div>
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
    // WebViewEvents.on('your-event-name', () => {})

    // Always make sure that this is emitted last in your mount function
    // This should always match the name of your Vue file
    WebViewEvents.emitReady('RebornIdSystem');
});
</script>

<style scoped>
.id-card {
    color: red;
    position: absolute;
    top: 0;
    left: 0;
    margin: 2%;
    background-color: green;
    width: 20vw;
    height: 15vh;
}

.id-card > .id-card-elements {
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
    height: 15vh;
}

.id-card > .id-card-elements > .id-card-picture {
    width: 5vw;
    height: 10vh;
    background-color: red;
    margin: 15%;
}
</style>
