var p = {
    b: {},
    ex: {},
    c: {

    },
    v: {

    },
    s: {

    },
    event: {
        attach: function () {
            return;
        }
    },
    injectScript: function () {
        chrome.tabs.query({active: true, currentWindow : true}, function(tabs){
                if(!tabs || tabs.length <= 0) return;
                var tab = tabs[0];
            //chrome.tabs.getSelected(null, function (tab) {
            try {
                chrome.tabs.executeScript(tab.id, { file: "lib/jquery/jquery.min.js", allFrames: true });
                chrome.tabs.executeScript(tab.id, { file: "js/xpath.js", allFrames: true });
            } catch (err) {
                document.getElementById('dError').innerText = "Error: " + err.message;
            }
        });
    },
    load: function () {
        p.event.attach();
        this.injectScript();
    },
    initControls: function () {
        //var isEnabled = !p.b.ls.isDisabled();
        //if (isEnabled) $(p.s.cEnable).attr('checked', 'checked');
        //else $(p.s.cEnable).removeAttr('checked');
        this.load();
        //var input = document.getElementById('tSearch');
        //input.startSpeechInput();
    },
    init: function (selectorObject) {
        p.s = selectorObject;
        this.initControls();
    }
};

$(document).ready(function () {
    p.b = chrome.extension.getBackgroundPage().b;
    p.ex = chrome.extension.getBackgroundPage().ex;
    p.init({
        
    });
});

