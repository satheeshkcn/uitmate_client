//var o = {
//    resetButton: {
//        id: undefined,
//        resetValues: { startIn: 5, darkenIn: 5, iconPath: "img/icon19.png" },
//        init: function (buttonId, iconPath, startIn, darkenIn) {
//            o.resetButton.id = "#" + buttonId;
//            $(o.resetButton.id).click(function () {
//                o.resetButton.click();
//            });
//            o.resetButton.resetValues.startIn = startIn;
//            o.resetButton.resetValues.darkenIn = darkenIn;
//            o.resetButton.resetValues.iconPath = iconPath;
//        },
//        click: function () {
//            //o.disableSwitch.uncheck();
//            o.removeContextMenu.uncheck();
//            o.icon.reset(o.resetButton.resetValues.iconPath);
//        }
//    },
//
//    closeButton: {
//        id: undefined,
//        init: function (buttonId) {
//            o.closeButton.id = "#" + buttonId;
//            $(o.closeButton.id).click(function () {
//                o.closeButton.click();
//            });
//        },
//        click: function () {
//            chrome.tabs.query({active: true, currentWindow : true}, function(tabs){
//                if(!tabs || tabs.length <= 0) return;
//                var tab = tabs[0];
//            //chrome.tabs.getSelected(null, function (tab) {
//                chrome.tabs.remove(tab.id);
//            });
//        }
//    },
//
//    disableSwitch: {
//        id: undefined,
//        init: function (checkBoxId) {
//            o.disableSwitch.id = "#" + checkBoxId;
//            var val = b.ls.isDisabled();
//            $(o.disableSwitch.id).attr("checked", val);
//            $(o.disableSwitch.id).change(function () {
//                if ($(this).is(':checked')) {
//                    o.disableSwitch.check();
//                } else {
//                    o.disableSwitch.uncheck();
//                }
//            });
//        },
//        uncheck: function () {
//            var val = b.ls.isDisabled(false)
//            $(o.disableSwitch.id).attr("checked", val);
//        },
//        check: function () {
//            var val = b.ls.isDisabled(true);
//            $(o.disableSwitch.id).attr("checked", val);
//        }
//    },
//
//    removeContextMenu: {
//        id: undefined,
//        init: function (checkBoxId) {
//            o.removeContextMenu.id = "#" + checkBoxId;
//            var val = !b.ls.isContextMenuOn();
//            $(o.removeContextMenu.id).attr("checked", val);
//            $(o.removeContextMenu.id).change(function () {
//                if ($(this).is(':checked')) {
//                    o.removeContextMenu.check();
//                } else {
//                    o.removeContextMenu.uncheck();
//                }
//            });
//        },
//        uncheck: function () {
//            b.contextMenu.create();
//            var val = !b.ls.isContextMenuOn()
//            $(o.removeContextMenu.id).attr("checked", val);
//        },
//        check: function () {
//            b.contextMenu.remove();
//            var val = !b.ls.isContextMenuOn();
//            $(o.removeContextMenu.id).attr("checked", val);
//        }
//    },
//
//    icon: {
//        id: undefined,
//        localFileId: undefined,
//        localIconId: undefined,
//        init: function (iconIdIdentifier, localFileId, localIconId) {
//            o.icon.id = iconIdIdentifier;
//            o.icon.localFileId = "#" + localFileId;
//            o.icon.localIconId = "#" + localIconId;
//            $(o.icon.id).click(o.icon.click);
//            $(o.icon.localFileId).change(o.icon.change);
//            $(o.icon.localIconId).attr('src', b.ls.iconPath());
//        },
//        click: function () {
//            var iconPath = $(this).attr("src");
//            b.icon.set(iconPath);
//        },
//        change: function (evt) {
//            var files = evt.target.files;
//            for (var i = 0, f; f = files[i]; i++) {
//                if (!f.type.match('image.*')) {
//                    continue;
//                }
//                var reader = new FileReader();
//                reader.onload = (function (theFile) {
//                    return function (e) {
//                        $(o.icon.localIconId).attr('src', e.target.result);
//                    };
//                })(f);
//                reader.readAsDataURL(f);
//            }
//        },
//        reset: function (iconPath) {
//            if (typeof iconPath === 'undefined') iconPath = 'img/icon19.png';
//            b.icon.set(iconPath);
//        }
//    },
//    initLinks: function (urlObj) {
//        var url = chrome.extension.getURL('manifest.json');
//        if (!url) return;
//        url = url.split('/');
//        var extId;
//        if (url.length < 2) return;
//        extId = url[url.length - 2];
//        if (!extId) return;
//        url = urlObj.urlTemplate.replace(urlObj.replaceText, extId);
//        $(urlObj.linkKey).attr('href', url);
//    },
//
//    eventAttacher: function () {
//        $(this.s.tCheckFreq).change(this.tCheckFreq_change);
//        $(this.s.tNotiAutoCloseInterval).change(this.tNotiAutoCloseInterval_change);
//        $(this.s.cNotiEnabled).click(this.cNotiEnabled_click);
//        $(this.s.cNotiAutoCloseInterval).click(this.cNotiAutoCloseInterval_click);
//    },
//    tNotiAutoCloseInterval_change: function () {
//        var interval = $(o.s.tNotiAutoCloseInterval).val();
//        if (isNaN(interval)) { $(o.s.tNotiAutoCloseInterval).addClass(o.s.error_red); return; }
//        interval = parseFloat(interval);
//        if (interval <= 0) { $(o.s.tNotiAutoCloseInterval).addClass(o.s.error_red); return; }
//        interval = interval * 60 * 1000;
//        $(o.s.tNotiAutoCloseInterval).removeClass(o.s.error_red);
//        ex.ls.NotiAutoCloseInterval(interval);
//    },
//    tCheckFreq_change: function () {
//        var checkFreq = $(o.s.tCheckFreq).val();
//        if (isNaN(checkFreq)) { $(o.s.tCheckFreq).addClass(o.s.error_red); return; }
//        checkFreq = parseFloat(checkFreq);
//        if (checkFreq <= 0) { $(o.s.tCheckFreq).addClass(o.s.error_red); return; }
//        checkFreq = checkFreq * 60 * 60 * 1000;
//        $(o.s.tCheckFreq).removeClass(o.s.error_red);
//        ex.ls.CheckFreq(checkFreq);
//    },
//    cNotiAutoCloseInterval_click: function () {
//        var isChecked = $(this).is(':checked');
//        if (isChecked) {
//            $(o.s.tNotiAutoCloseInterval).removeAttr('disabled');
//        } else {
//            $(o.s.tNotiAutoCloseInterval).attr('disabled', true);
//        }
//        ex.ls.isNotiAutoClose(isChecked);
//    },
//    cNotiEnabled_click: function () {
//        var isChecked = $(this).is(':checked');
//        ex.ls.isNotiEnabled(isChecked);
//    },
//    initControls: function () {
//        if (ex.ls.isNotiEnabled()) $(this.s.cNotiEnabled).attr('checked', 'checked');
//        else $(this.s.cNotiEnabled).removeAttr('checked');
//
//        if (ex.ls.isNotiAutoClose()) $(this.s.cNotiAutoCloseInterval).attr('checked', 'checked');
//        else $(this.s.cNotiAutoCloseInterval).removeAttr('checked');
//
//        var mins = ex.ls.NotiAutoCloseInterval();
//        mins = mins / 1000 / 60;
//        $(this.s.tNotiAutoCloseInterval).val(mins);
//
//        var hrs = ex.ls.CheckFreq();
//        hrs = hrs / 1000 / 60 / 60;
//        $(this.s.tCheckFreq).val(hrs);
//    },
//    s: {
//        cNotiEnabled: "#cNotiEnabled", cNotiAutoCloseInterval: "#cNotiAutoCloseInterval", tNotiAutoCloseInterval: "#tNotiAutoCloseInterval",
//        cCheckFreq: "#cCheckFreq", tCheckFreq: "#tCheckFreq",
//        error_red: "error_red"
//    },
//    init: function () {
//        b = chrome.extension.getBackgroundPage().b;
//        ex = chrome.extension.getBackgroundPage().ex;
//        o.disableSwitch.init("cDisable");
//        o.resetButton.init("bReset", "img/icon19.png", 5, 5);
//        o.closeButton.init("bClose");
//        o.icon.init("#dIcon input[type='image']", "bFile", "iconLocal");
//        //o.removeContextMenu.init("cCMenu");
//        //o.resetPositionSize.init("bResetPS");
//        o.initLinks({ urlTemplate: 'https://chrome.google.com/extensions/detail/[extensionId]', replaceText: '[extensionId]', linkKey: '#aRateStars' });
//        o.eventAttacher();
//        //o.initControls();
//    }
//};
//
//window.addEventListener("load", o.init);