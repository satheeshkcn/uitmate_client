(function () {
    var _xpath = {
        v: {
            clickNamespace: "click.tejji_extension_XPath",
            isBound: false,
            isClicked: false
        },
        element_click: function (event) {
            if (!_xpath.v.isClicked) {
                event.preventDefault();
                event.stopPropagation();
                var xpath = _xpath.getXPaths(event.currentTarget);
                // $modal = $('<div id="modal">hello</div>');
              //   $modal.show();
              //  var ss = document.getElementById("content");
              //  alert("X path = "+ xpath);
                
               
               //  alert("X div = "+ ss);
                chrome.extension.sendRequest({ method: "showXPath", xpath: xpath }, function (response) {
                    return;
                });
                _xpath.v.isClicked = true;
            }
        },
        getXPaths: function (elt) {
            var xpath = [];
           // xpath.push(this.getXPath_byNo(elt));
            xpath.push(this.getXPath_byId(elt));
            //xpath.push(this.getXPath_byClass(elt));
            return xpath;
        },
        getXPath_byNo: function (elt) {
            var path = '';
            for (; elt && elt.nodeType == 1; elt = elt.parentNode) {
                var idx = $(elt.parentNode).children(elt.tagName).index(elt) + 1;
                idx > 1 ? (idx = '[' + idx + ']') : (idx = '');
                path = '/' + elt.tagName.toLowerCase() + idx + path;
            }
            return path;
        },
        getXPath_byId: function (elt) {
            var path = '';
            for (; elt && elt.nodeType == 1; elt = elt.parentNode) {
                if (elt.id) {
                    path = '//*' + elt.tagName.toLowerCase() + "[@id='" + elt.id + "']" + path;
                    break;
                } else {
                    var idx = $(elt.parentNode).children(elt.tagName).index(elt) + 1;
                    idx > 1 ? (idx = '[' + idx + ']') : (idx = '');
                    path = '/' + elt.tagName.toLowerCase() + idx + path;
                }
            }
            return path;
        },
        getXPath_byClass: function (elt) {
            var path = '';
            for (; elt && elt.nodeType == 1; elt = elt.parentNode) {
                var part = elt.tagName.toLowerCase();
                if (elt.id) {
                    part = part + "#" + elt.id;
                }
                if (elt.className) {
                    part = part + "." + elt.className;
                }
                path = ' ' + part + path;
            }
            return path;
        },
        init: function () {
            if (!this.v.isBound) {
                $("*").bind(this.v.clickNamespace, this.element_click);
                this.v.isBound = true;
            }
            this.v.isClicked = false;
        }
    };
    _xpath.init();
})();