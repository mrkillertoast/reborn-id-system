<template>
    <div class="id-card-cityhall-window">
        <center><h1>Los Santos Cityhall</h1></center>
        <div class="id-card-cityhall-container">
            <div class="id-card-cityhall-button-wrapper">
                <button class="id-card-cityhall-button" @click="emitServerIdCreation()">Get ID Card</button>
                <p>Registering for an ID-Card is <br />free of charge</p>
            </div>
            <div class="id-card-cityhall-button-wrapper">
                <button class="id-card-cityhall-button">Get lost ID back</button>
                <p>Requesting a new ID-Card<br />costs 500$</p>
            </div>
        </div>
        <div class="id-card-cityhall-abort" @click="WebViewEvents.emitClose">
            <button class="id-card-cityhall-button">Abort</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import WebViewEvents from '@ViewUtility/webViewEvents';
import { IDSystemConfig } from '../shared/config';
import { RebornIdSystemEvents } from '../shared/viewEvents';

// You can also make a function that emits to the server from the WebView
// function emitToServer() {
//     WebViewEvents.emit('someEvent', 'someValue');
// }

function emitServerIdCreation() {
    console.log('test');
    WebViewEvents.emitServer(RebornIdSystemEvents.WebViewToServer.GENERATE_NEW_ID);
    WebViewEvents.emitClose();
}

onMounted(() => {
    // WebViewEvents.on('your-event-name', () => {})

    // Always make sure that this is emitted last in your mount function
    // This should always match the name of your Vue file
    WebViewEvents.emitReady('RebornIdSystem');
});
</script>

<style>
.id-card-cityhall-window {
    width: 30vw;
    height: 25vh;
    background-color: grey;
    border: 2px solid black;
    border-radius: 2rem;
}
.id-card-cityhall-container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.id-card-cityhall-button {
    all: unset;
    width: 8vw;
    text-align: center;
    border: 1px solid darkblue;
    padding: 5% 0;
    font-weight: bold;
    border-radius: 1rem;
}
.id-card-cityhall-button:hover {
    cursor: pointer;
    background-color: lightgray;
    color: black;
}

.id-card-cityhall-abort {
    text-align: center;
}

.id-card-cityhall-abort > button {
    height: 0.5vh;
    width: 25vw;
}
</style>
