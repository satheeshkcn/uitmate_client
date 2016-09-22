var ex = {
    xpath: null,
    showXPath: function (xpath) {
        ex.xpath = xpath;
      //  alert("Xpath = "+xpath);
        //bg1
        var ss = document.getElementById("bg1");
      //  alert("X path = "+ ss);
        var w = 440;
        var h = 220;
        var left = (screen.width/2)-(w/2);
        var top = (screen.height/2)-(h/2); 
        chrome.tabs.create({
            url: chrome.extension.getURL('notification.htm'),
            active: false
        }, function(tab) {
            // After the tab has been created, open a window to inject the tab
            chrome.windows.create({
                tabId: tab.id,
                type: 'popup',
                focused: true,'width': w, 'height': h, 'left': left, 'top': top
                // incognito, top, left, ...
            });
        });
        
        //chrome.tabs.create({url: "notification.htm"});
     //   var notification = webkitNotifications.createHTMLNotification('notification.htm');
      //  notification.show();
    },
    init: function () {
        chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
            if (request.method == "showXPath")
                ex.showXPath(request.xpath);
            else
                sendResponse({}); // snub them.
        });
    }
};

$(document).ready(function () {
    ex.init();
});


