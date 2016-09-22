//var b = {
//    url: "popup.htm",
//    homePageUrl: "http://tejji.com/",
//    homePageText: 'tejji.com',
//
//    ls: {
//        init: function () {
//
//        },
//        keys: {
//            isDisabled: "isDisabled",
//            iconPath: "iconPath",
//            isContextMenuOn: "isContextMenuOn",
//            version: "version"
//        },
//        defaults: {
//            isDisabled: false,
//            iconPath: "img/icon19.png",
//            isContextMenuOn: true
//        },
//        isDisabled: function (val) {
//            if (typeof val !== 'undefined') {
//                localStorage[b.ls.keys.isDisabled] = val;
//            }
//            var v = localStorage[b.ls.keys.isDisabled];
//            if (typeof v === 'undefined') v = b.ls.defaults.isDisabled;
//            v = (v === 'true');
//            if (typeof val !== 'undefined') b.sendRequest.disable();
//            return v;
//        },
//        iconPath: function (val) {
//            if (typeof val !== 'undefined') {
//                localStorage[b.ls.keys.iconPath] = val;
//            }
//            var v = localStorage[b.ls.keys.iconPath];
//            if (typeof v === 'undefined') v = b.ls.defaults.iconPath;
//            return v;
//        },
//        isContextMenuOn: function (val) {
//            if (typeof val !== 'undefined') {
//                localStorage[b.ls.keys.isContextMenuOn] = val;
//            }
//            var v = localStorage[b.ls.keys.isContextMenuOn];
//            if (typeof v === 'undefined') v = b.ls.defaults.isContextMenuOn;
//            v = !(v === 'false');
//            return v;
//        },
//        version: function (val) {
//            if (typeof val !== 'undefined') {
//                localStorage[b.ls.keys.version] = val;
//            }
//            var v = localStorage[b.ls.keys.version];
//            //if (typeof v === 'undefined') v = b.ls.defaults.version;
//            return v;
//        }
//    },
//
//    contextMenu: {
//        id: undefined,
//        title: "",
//        contexts: ["all"],
//        create: function (clickHandler) {
//            alert("button clicked 44");
//            if (b.contextMenu.id !== undefined) return;
//            if (typeof clickHandler === 'undefined' || clickHandler === null) {
//                alert("button clicked441");
//                b.contextMenu.id = chrome.contextMenus.create({ "title": b.contextMenu.title, "contexts": b.contextMenu.contexts
//                });
//            } else {
//                alert("button clicked442");
//                b.contextMenu.id = chrome.contextMenus.create({ "title": b.contextMenu.title, "contexts": b.contextMenu.contexts,
//                    'onclick': clickHandler
//                });
//            }
//            b.ls.isContextMenuOn(true);
//            b.contextMenu.addSubButtons();
//        },
//        remove: function () {
//            if (b.contextMenu.id !== undefined) {
//                chrome.contextMenus.remove(b.contextMenu.id);
//                b.contextMenu.id = undefined;
//            }
//            b.ls.isContextMenuOn(false);
//        },
//        init: function (title, clickHandler) {
//            b.contextMenu.title = title;
//            alert("button clicked - sk33");
//            if (b.ls.isContextMenuOn()) b.contextMenu.create(clickHandler);
//            //b.contextMenu.clickHandler = clickHandler;
//        },
//        addSubButtons: function () {
//            //            chrome.contextMenus.create({ "title": "Scroll to Top", "contexts": b.contextMenu.contexts
//            //            , "parentId": b.contextMenu.id
//            //            , "onclick": b.scrollToTop
//            //            });
//        }
//    },
//
//    browserActions: {
//        init: function () {
//            chrome.browserAction.onClicked.addListener(function (tab) {
//                alert("button clicked");
//                b.toolButtonClick();
//            });
//        }
//    },
//
//   
//
//    omniBox: {
//        init: function () {
//            chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
//                //console.log('inputChanged: ' + text);
//                suggest([
//                        { content: "tejji.com", description: "tejji.com" }
//                    ]);
//            });
//
//            chrome.omnibox.onInputEntered.addListener(function (text) {
//                b.omniBox.navigate(b.homePageUrl);
//            });
//        },
//        navigate: function (url) {
//            chrome.tabs.query({active: true, currentWindow : true}, function(tabs){
//                if(!tabs || tabs.length <= 0) return;
//                var tab = tabs[0];
//            //chrome.tabs.getSelected(null, function (tab) {
//                chrome.tabs.update(tab.id, { url: url });
//            });
//        }
//    },
//
//    icon: {
//        set: function (val) {
//            var iconPath = b.ls.iconPath(val);
//            chrome.browserAction.setIcon({ path: iconPath });
//        },
//        get: function () {
//            return b.ls.iconPath();
//        },
//        init: function () {
//            b.icon.set();
//        }
//    },
//    tag: {
//        outerHTML: "",
//        obj: undefined,
//        init: function (elementSearchKey) {
//            b.tag.outerHTML = $($('<div></div>').html($(elementSearchKey).clone())).html();
//            b.tag.obj = $(elementSearchKey);
//        }
//    },
//
//    openOptions: function (info, tab) {
//        chrome.tabs.create({ url: "options.htm" });
//    },
//
//    ///////////////// Custom to Extensions ///////////////////////////////////////////////////////////////////////////////////////
//
//    sendRequest: {
//        init: function (val) { if (typeof val === 'undefined') val = true; },
//        disable: function () {
//            chrome.windows.getAll({ populate: true }, function (windows) {
//                for (var w = 0; w < windows.length; w++) {
//                    for (var t = 0; t < windows[w].tabs.length; t++) {
//                        var tab = windows[w].tabs[t];
//                        chrome.tabs.sendRequest(tab.id, { method: "disable", isDisabled: b.ls.isDisabled() }, function (response) {
//                            //if (response.status) { }
//                        });
//                    }
//                }
//            });
//        }
//    },
//    receiveRequest: {
//        init: function () {
//            chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
//                if (request.method === "getHTML") {
//                    sendResponse({ outerHTML: b.tag.outerHTML, callback: request.callback });
//                } else if (request.method === "isDisabled") {
//                    var isDisabled = b.ls.isDisabled();
//                    sendResponse({ isDisabled: isDisabled });
//                } else if (request.method === "opacity") {
//                    var o = b.ls.opacity(request.opacity);
//                    sendResponse({ opacity: o });
//                } else sendResponse({});
//            });
//        }
//    },
//
//    outerHTML: function (obj) {
//        return $($('<div></div>').html(obj.clone())).html();
//    },
//    contextMenuClick: function (info, tab) {
//        chrome.tabs.create({ url: b.url });
//    },
//
//    toolButtonClick: function (info, tab) {
//        alert("button toolButtonClick");
//        //Initiate Blackout
//        //b.sendRequest.show();
//    },
//
//    init: function () {
//        //b.tag.init("div#_tejji_scroll_button");                             //should be the first thing
//       // b.ls.init();                                                        // initializes defaults from html obj/tag
//       // b.browserActions.init();
//        //b.contextMenu.init("Cookie Manager", b.contextMenuClick);
//       // b.icon.init();
////        b.install.init();
//       // b.omniBox.init();
//
//        //b.receiveRequest.init();
//        //b.sendRequest.init();
//    }
//};
//


$(document).ready(function () {
    //b.init();
});


