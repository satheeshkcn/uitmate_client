(function () {
    var _title_bar = {
        initLinks: function (urlObj) {
            var url = chrome.extension.getURL('manifest.json');
            if (!url) return;
            url = url.split('/');
            var extId;
            if (url.length < 2) return;
            extId = url[url.length - 2];
            if (!extId) return;
            url = urlObj.urlTemplate.replace(urlObj.replaceText, extId);
            $(urlObj.linkKey).attr(urlObj.param, url);
        },
        init: function () {
            this.initLinks({ linkKey: '#aRate', param: 'href', urlTemplate: 'http://tejji.com/browser/chrome/extensions/detail.aspx?extid=[extensionId]&rate=true', replaceText: '[extensionId]' });
            this.initLinks({ linkKey: '#aComment', param: 'href', urlTemplate: 'http://tejji.com/browser/chrome/extensions/detail.aspx?extid=[extensionId]&comment=true', replaceText: '[extensionId]' });
        }
    };
    $(document).ready(function () {
        _title_bar.init();
    });
})();
