<template>
    <div class="id-card">
        <span class="id-card-header"
            ><center>{{ IDSystemConfig.WEBVIEW.ID_CARD_HEADER }}</center>
        </span>
        <div class="id-card-elements">
            <div class="id-card-picture">
                <img src="/plugins/avatar-placeholder.png" width="150" height="150" />
            </div>
            <div class="id-card-text">
                <div class="id-card-grid">
                    <div class="id-card-text-element id-card-text-state">{{ IDSystemConfig.WEBVIEW.LAST_NAME }}:</div>
                    <div class="id-card-text-element id-card-text-pinfo">Wilson</div>
                    <div class="id-card-text-element id-card-text-state">
                        {{ IDSystemConfig.WEBVIEW.FIRST_NAME }}
                    </div>
                    <div class="id-card-text-element id-card-text-pinfo">Stan</div>
                    <div class="id-card-text-element id-card-text-state">
                        {{ IDSystemConfig.WEBVIEW.DATE_OF_BIRTH }}
                    </div>
                    <div class="id-card-text-element id-card-text-pinfo">10.10.1000</div>
                    <div class="id-card-text-element id-card-text-state">
                        {{ IDSystemConfig.WEBVIEW.GENDER }}
                    </div>
                    <div class="id-card-text-element id-card-text-pinfo">Male</div>
                </div>
            </div>
        </div>
        <div class="id-card-footer id-card-grid">
            <div class="id-card-signature">John Doe</div>
            <div class="id-card-licences">
                <p></p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import WebViewEvents from '@ViewUtility/webViewEvents';
import { IDSystemConfig } from '../shared/config';

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
    color: white;
    position: absolute;
    top: 0;
    left: 0;
    margin: 2%;
    background-color: green;
    border-radius: 1rem;
    width: 25vw;
    height: 23vh;
}
.id-card > .id-card-header {
    color: white;
    font-style: italic;
    font-size: small;
}
.id-card > .id-card-header > center {
    margin-top: 2.2%;
    padding: 1%;
    background-color: blue;
}

.id-card > .id-card-elements {
    margin-top: 2%;
    display: grid;
    grid-template-columns: 0.75fr 1fr;
    align-items: start;
}

.id-card-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: start;
}

.id-card > .id-card-elements > .id-card-picture {
    justify-self: center;
}

.id-card-text-element {
    padding: 7% 0%;
}

.id-card-text-state {
    font-weight: bold;
    text-transform: uppercase;
}

.id-card-signature {
    font-size: 2rem;
    font-style: italic;
    margin: 2% 0 0 10%;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
</style>
../shared/config
