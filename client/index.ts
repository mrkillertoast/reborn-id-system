import * as alt from 'alt-client';
import * as native from 'natives';
import * as AthenaClient from '@AthenaClient/api';
import { onTicksStart } from '@AthenaClient/events/onTicksStart';
import { Page } from '@AthenaClient/webview/page';
import { RebornIdSystemEvents } from '../shared/viewEvents';
import { IIdData } from '../shared/interface/IIdData';

let pageIdCard: Page;
let pageCityHall: Page;
let idData: IIdData;

function init() {
    pageIdCard = new AthenaClient.webview.Page({
        name: 'RebornIdSystem',
        callbacks: {
            onReady: () => {
                AthenaClient.webview.emit(RebornIdSystemEvents.ClientToWebView.LOAD_ID_DATA, idData);
            },
            onClose: () => {
                idData = null;
            },
        },
        // keybind: {
        //     key: 186, // The Letter U
        //     useSameKeyToClose: true,
        //     description: 'RebornIdSystem',
        //     identifier: 'RebornIdSystem',
        //     allowInSpecificPage: 'RebornIdSystem',
        // },
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

    alt.onServer(RebornIdSystemEvents.ServerClient.OPEN_ID_WEBVIEW, (...args) => {
        idData = args[0];
        pageIdCard.open();
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
