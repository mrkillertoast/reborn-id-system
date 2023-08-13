import * as alt from 'alt-client';
import * as native from 'natives';
import * as AthenaClient from '@AthenaClient/api';
import { onTicksStart } from '@AthenaClient/events/onTicksStart';
import { Page } from '@AthenaClient/webview/page';

let page: Page;

function init() {
    console.log('test even here?');
    page = new AthenaClient.webview.Page({
        name: 'RebornIdSystem',
        callbacks: {
            onReady: async () => {
                // AthenaClient.webview.emit('loading-something-event');
                console.log('Test do i get it?');
            },
            onClose: () => {
                // Do something when the page is closed...
            },
        },
        keybind: {
            key: 186, // The Letter U
            useSameKeyToClose: true,
            description: 'RebornIdSystem',
            identifier: 'RebornIdSystem',
            allowInSpecificPage: 'RebornIdSystem',
        },
        options: {
            onOpen: {
                focus: true,
                hideHud: true,
                hideOverlays: true,
                setIsMenuOpenToTrue: true,
                showCursor: true,
                disableControls: 'camera',
                disablePauseMenu: true,
            },
            onClose: {
                hideCursor: true,
                showHud: true,
                showOverlays: true,
                unfocus: true,
                setIsMenuOpenToFalse: true,
                enableControls: true,
                enablePauseMenu: true,
            },
        },
    });

    // You can also manually open the page without a keybind
    // alt.onServer('onPageOpenFromServerSideMaybeInteraction?', () => {
    //    if (typeof page !== 'undefined') {
    //        page.open();
    //    }
    //
    // });

    // You can also manually close the page without a keybind
    // alt.onServer(INVENTORY_EVENTS.TO_CLIENT.CLOSE, () => {
    //    if (typeof page !== 'undefined') {
    //        page.close(true);
    //    }
    // });
}

alt.on('keyup', (e) => {
    console.log(e);
});

onTicksStart.add(init);
