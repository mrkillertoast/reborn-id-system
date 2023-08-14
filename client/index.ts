import * as alt from 'alt-client';
import * as native from 'natives';
import * as AthenaClient from '@AthenaClient/api';
import { onTicksStart } from '@AthenaClient/events/onTicksStart';
import { Page } from '@AthenaClient/webview/page';

let page: Page;

function init() {
    page = new AthenaClient.webview.Page({
        name: 'RebornIdSystem',
        callbacks: {
            onReady: async () => {},
            onClose: () => {},
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

onTicksStart.add(init);
