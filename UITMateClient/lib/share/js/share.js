(function () {
    var loader = {
        loadJsCss: function (filetype, url, callback) {
            if (filetype === "js") {
                var e = document.createElement('script');
                e.setAttribute("src", url);
                e.setAttribute("type", "text/javascript");
            }
            else if (filetype === "css") {
                var e = document.createElement("link");
                e.setAttribute("href", url);
                e.setAttribute("type", "text/css");
                e.setAttribute("rel", "stylesheet");
            }
            if (e.readyState) {  //IE
                e.onreadystatechange = function () {
                    if (e.readyState == "loaded" || e.readyState == "complete") {
                        e.onreadystatechange = null;
                        if (callback != "undefined") callback();
                    }
                };
            } else {  //Others
                e.onload = function () {
                    if (typeof callback != typeof undefined) callback();
                };
            }
            document.getElementsByTagName("head")[0].appendChild(e);
        }
    };

    function start() {
        $(document).ready(function () {
            var share = {
                s: {
                    input: ".tejji_share_panel input[type=text]",
                    tejji_share_a_link: "#tejji_share_a_link",
                    tejji_share_t_link: "#tejji_share_t_link",
                    tejji_share_a_anchor: "#tejji_share_a_anchor",
                    tejji_share_t_anchor: "#tejji_share_t_anchor",
                    tejji_share_t_link_short: "#tejji_share_t_link_short",
                    tejji_share_b_link_short: "#tejji_share_b_link_short",
                    tejji_share_b_more: "#tejji_share_b_more",
                    tejji_share_b_mail: "#tejji_share_b_mail"
                },
                c: {
                    qsExtensionId: "[extensionId]",
                    extensionName: "[extensionName]",
                    ExtensionName: "[ExtensionName]"
                },
                v: {
                    url: 'http://tejji.com/browser/chrome/extensions/',
                    manifest: null,
                    extensionId: '',
                    extensionName: "Extensions"
                },
                attach_events: function () {
                    $(this.s.input).click(function () {
                        this.select();
                    });
                    $(this.s.tejji_share_b_link_short).click(function () {
                        share.getShortURL();
                    });
                },
                getSelected: function () {
                    if (document.getSelection) {
                        return document.getSelection();
                    }
                    else if (window.getSelection) {
                        return window.getSelection();
                    } else {
                        var selection = document.selection && document.selection.createRange();
                        if (selection.text) { return selection.text; }
                        return false;
                    }
                    //return false;
                },
                getExtensionId: function () {
                    return this.v.extensionId;
                },
                getExtensionName: function () {
                    if (this.v.manifest === null) return this.v.extensionName;
                    return this.v.manifest.name;
                },
                getShortURL: function () {
                    var url = this.v.url;
                    url = encodeURI(url);
                    var requestURL = "http://api.bitly.com/v3/shorten?"
            + "login=tejji"
            + "&apiKey=R_2226bf330de19bb3589095434627a89b"
            + "&longUrl=" + url
            + "&format=json";
                    //+"&callback=share.";
                    $.getJSON(requestURL, function (data) {
                        var response = data;
                        if (response.status_code === 200) {
                            var shortURL = response.data.url;
                            $(share.s.tejji_share_t_link_short).val(shortURL);
                        }
                    });
                },
                loadManifest: function () {
                    try {
                        var url = chrome.extension.getURL('manifest.json');
                        var urlManifest = url;
                        if (!url) return;
                        url = url.split('/');
                        var extId;
                        if (url.length < 2) return;
                        extId = url[url.length - 2];
                        this.v.extensionId = extId;
                        url = urlManifest;
                        var xhr = new XMLHttpRequest();
                        xhr.open('GET', url, false);
                        xhr.send(null);
                        var manifest = $.parseJSON(xhr.responseText);
                        this.v.manifest = manifest;
                        return manifest;
                    } catch (e) { };
                    return null;
                },
                load: function () {
                    // Link
                    var url = $(this.s.tejji_share_a_link).attr('href');
                    var extId = this.getExtensionId();
                    url = url.replace(this.c.qsExtensionId, extId);
                    $(this.s.tejji_share_t_link).val(url);
                    $(this.s.tejji_share_a_link).attr('href', url);
                    // Anchor
                    var extName = this.getExtensionName();
                    $(this.s.tejji_share_a_anchor).attr('href', url);
                    $(this.s.tejji_share_a_anchor).text(extName);
                    var a = "<a href='" + url + "'>" + extName + "</a>";
                    $(this.s.tejji_share_t_anchor).val(a);
                    this.v.url = url;
                    var shareURL = $(this.s.tejji_share_b_more).attr('href');
                    shareURL = shareURL.replace(this.c.qsExtensionId, extId);
                    $(this.s.tejji_share_b_more).attr('href', shareURL);
                    var mailhref = $(this.s.tejji_share_b_mail).attr('href');
                    mailhref = mailhref.replace(this.c.qsExtensionId, extId);
                    mailhref = mailhref.replace(this.c.extensionName, extName);
                    mailhref = mailhref.replace(this.c.ExtensionName, extName);
                    $(this.s.tejji_share_b_mail).attr('href', mailhref);
                },
                init: function () {
                    this.attach_events();
                    this.loadManifest();
                    this.load();
                }
            };



            var popup = {
                s: {
                    popup: ".tejji_share_panel",
                    element: ".tejji_share_anchor",
                    popupClose: ".tejji_share_panel_close",
                    popupHidden: "tejji_share_panel_hidden"
                },
                v: {
                    html: '<div class="tejji_share_panel tejji_share_panel_hidden">'
                 + '   <div>'
                 + '       <p>'
                 + '           <label>Share <a id="tejji_share_a_link" href="http://tejji.com/browser/chrome/extensions/detail.aspx?extid=[extensionId]" target="_blank">Link</a></label>'
                 + '           <a class="tejji_share_panel_close" href="#">Close</a>'
                 + '           <input id="tejji_share_t_link" type="text" value="http://tejji.com/browser/chrome/extensions/" />'
                 + '       </p>'
                 + '       <p>'
                 + '           <label>Share anchor: <a id="tejji_share_a_anchor" href="http://tejji.com/browser/chrome/extensions/" target="_blank">Extensions</a></label>'
                 + '           <input id="tejji_share_t_anchor" type="text" value="<a href=\'http://tejji.com/browser/chrome/extensions/\'>Extensions</a>" />'
                 + '       </p>'
                 + '       <p>'
                 + '           <input id="tejji_share_b_link_short" type="button" value="Shorten URL"/>'
                 + '           <input id="tejji_share_t_link_short" type="text" title="http://bit.ly/gcExt" value="" />'
                 + '       </p>'
                 + '       <p>'
                 + '           <a id="tejji_share_b_mail" href="mailto:?subject=[extensionName] Extension&body=I found this extension named \'[ExtensionName]\'. It is pretty cool.%0A%0AI would like to share the extension with you. Here is the link...%0Ahttp://tejji.com/browser/chrome/extensions/detail.aspx?extid=[extensionId]%0A%0AHope you like it.%0A%0AThanks," target="_blank">Email</a>'
                 + '           <a id="tejji_share_b_more" href="http://tejji.com/browser/chrome/extensions/share.aspx?extid=[extensionId]" target="_blank">More...</a>'
                 + '       </p>'
                 + '   </div>'
                 + '</div>'
                },
                attach_events: function () {
                    //$(this.s.element).hover(function () { popup.show(); }, function () { popup.hide(); });
                    $(this.s.element).mouseover(function () { popup.show(); });
                    $(this.s.popupClose).click(function (event) { popup.hide(); event.preventDefault(); });
                    $('html').click(function () { popup.hide(); });
                    $(this.s.popup).click(function (event) { event.stopPropagation(); });
                    $(this.s.element).click(function (event) {
                        event.preventDefault();
                        event.stopPropagation();
                        popup.show();
                    });
                },
                getPosition: function () {
                    var scrollTop = $(window).scrollTop();
                    var scrollLeft = $(window).scrollLeft();

                    var shareOffset = $(this.s.element).offset();
                    var shareTop = shareOffset.top - scrollTop;
                    var shareLeft = shareOffset.left - scrollLeft;
                    var shareHeight = $(this.s.element).outerHeight();
                    var shareWidth = $(this.s.element).outerWidth();

                    var popupHeight = $(this.s.popup).outerHeight();
                    var popupWidth = $(this.s.popup).outerWidth();

                    var windowHeight = $(window).height();
                    var windowWidth = $(window).width();

                    var popupLeft = scrollLeft, popupTop = scrollTop;
                    if (shareTop + shareHeight + popupHeight < windowHeight) {
                        popupTop = shareOffset.top + shareHeight;
                    } else if (shareTop - popupHeight > 0) {
                        popupTop = shareOffset.top - popupHeight;
                    }
                    if (shareLeft + popupWidth < windowWidth) {
                        if (shareLeft >= 0) {
                            popupLeft = shareOffset.left;
                        } else {
                            popupLeft = scrollLeft;
                        }
                    } else if (shareLeft + shareWidth - popupWidth > 0) {
                        if (shareLeft + shareWidth <= windowWidth) {
                            popupLeft = shareOffset.left + shareWidth - popupWidth;
                        } else {
                            popupLeft = scrollLeft + windowWidth - popupWidth;
                        }
                    }
                    var pos = { left: popupLeft, top: popupTop };
                    return pos;
                },
                show: function () {
                    var position = this.getPosition();
                    $(this.s.popup).css({ "left": position.left + "px", "top": position.top + "px", "position": "absolute" });
                    $(this.s.popup).removeClass(this.s.popupHidden);
                    $(this.s.popup).fadeIn();
                },
                hide: function () {
                    $(this.s.popup).fadeOut();
                },
                init: function () {
                    $('body').append(this.v.html);
                    this.attach_events();
                }
            };









            //    $(share.s.tejji_share_copy).click(function () {
            //        var selectedText = share.getSelected();
            //        var ret = document.execCommand("copy", false, null);
            //        var ret = document.execCommand("copy", false, selectedText);
            //        return ret;
            //    });
            popup.init();
            share.init();

        });
    };

    loader.loadJsCss("css", "lib/share/css/share.css");
    loader.loadJsCss("js", "lib/jquery/jquery.min.js", start);
    //loader.loadJsCss("js", "https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js", start);

})();


