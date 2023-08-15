export const RebornIdSystemEvents = {
    ClientServer: {},
    ServerClient: {
        OPEN_CITYHALL_WEBVIEW: 'rebornidsystem:servertoclient:cityhall:open',
    },
    ClientToWebView: {},
    ServerToWebView: {
        NEW_ID_CREATION_SUCCESS: 'rebornidsyste:servertowebview:cityhall:idcreationsuccess',
    },
    WebViewToClient: {},
    WebViewToServer: {
        GENERATE_NEW_ID: 'rebornidsystem:webviewtoserver:cityhall:generatenewid',
    },

    WebViewEvents: {},
};
