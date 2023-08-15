import * as alt from 'alt-client';
import * as native from 'natives';
import * as AthenaClient from '@AthenaClient/api';
import { onTicksStart } from '@AthenaClient/events/onTicksStart';
import { Page } from '@AthenaClient/webview/page';
import { RebornIdSystemEvents } from '../shared/viewEvents';

let pageIdCard: Page;
let pageCityHall: Page;

function init() {
    pageIdCard = new AthenaClient.webview.Page({
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

    pageCityHall = new AthenaClient.webview.Page({
        name: 'RebornIdSystemCityHall',
        callbacks: {
            onReady: async () => {},
            onClose: () => {},
        },
        options: {
            onOpen: {
                focus: true,
                hideHud: true,
                hideOverlays: true,
                setIsMenuOpenToTrue: true,
                showCursor: true,
                disableControls: 'all',
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

    alt.onServer(RebornIdSystemEvents.ServerClient.OPEN_CITYHALL_WEBVIEW, (playerData: alt.Player) => {
        if (typeof pageCityHall !== 'undefined') {
            pageCityHall.open();
        }
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
