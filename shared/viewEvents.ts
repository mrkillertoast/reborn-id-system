export const RebornIdSystemEvents = {
    ClientServer: {},
    ServerClient: {
        OPEN_CITYHALL_WEBVIEW: 'rebornidsystem:servertoclient:cityhall:open',
        OPEN_ID_WEBVIEW: 'rebornidsystem:servertoclient:id:open',
    },
    ClientToWebView: {
        LOAD_ID_DATA: 'rebornidsytem:clienttowebview:id:loaddata',
    },
    ServerToWebView: {
        NEW_ID_CREATION_SUCCESS: 'rebornidsystem:servertowebview:cityhall:idcreationsuccess',
    },
    WebViewToClient: {},
    WebViewToServer: {
        GENERATE_NEW_ID: 'rebornidsystem:webviewtoserver:cityhall:generatenewid',
    },

    WebViewEvents: {},
};
