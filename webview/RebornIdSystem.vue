<template>
  <div class="id-card">
    <span class="id-card-header"
      ><center>
        {{ IDSystemConfig.WEBVIEW.ID_CARD_HEADER }} | "No."{{ idNumber }}
      </center>
    </span>
    <div class="id-card-elements">
      <div class="id-card-picture">
        <img
          src="/plugins/avatar-placeholder.png"
          width="150"
          height="150"
        />
      </div>
      <div class="id-card-text">
        <div class="id-card-grid">
          <div class="id-card-text-element id-card-text-state">
            {{ IDSystemConfig.WEBVIEW.LAST_NAME }}:
          </div>
          <div class="id-card-text-element id-card-text-pinfo">
            {{ lastName }}
          </div>
          <div class="id-card-text-element id-card-text-state">
            {{ IDSystemConfig.WEBVIEW.FIRST_NAME }}
          </div>
          <div class="id-card-text-element id-card-text-pinfo">
            {{ firstName }}
          </div>
          <div class="id-card-text-element id-card-text-state">
            {{ IDSystemConfig.WEBVIEW.DATE_OF_BIRTH }}
          </div>
          <div class="id-card-text-element id-card-text-pinfo">
            {{ dateOfBirth }}
          </div>
          <div class="id-card-text-element id-card-text-state">
            {{ IDSystemConfig.WEBVIEW.GENDER }}
          </div>
          <div class="id-card-text-element id-card-text-pinfo">
            {{ gender }}
          </div>
        </div>
      </div>
    </div>
    <div class="id-card-footer id-card-grid">
      <div class="id-card-signature">{{ firstName }} {{ lastName }}</div>
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
import { RebornIdSystemEvents } from '../shared/viewEvents';

// You can also make a function that emits to the server from the WebView
// function emitToServer() {
//     WebViewEvents.emit('someEvent', 'someValue');
// }
let firstName = ref('');
let lastName = ref('');
let dateOfBirth = ref('');
let gender = ref('');
let idNumber = ref('');

function setData(idData: any) {
  firstName = idData.firstName;
  lastName = idData.lastName;
  dateOfBirth = idData.playerDateOfBirth;
  gender = idData.playerGender;
  idNumber = idData.idNumber;
}

function autoClose(time: number) {
  setTimeout(function(time:number) => {
    WebViewEvents.emitClose();
  }, time);
}

onMounted(() => {
  // WebViewEvents.on('your-event-name', () => {})
  WebViewEvents.on(RebornIdSystemEvents.ClientToWebView.LOAD_ID_DATA, setData);
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
