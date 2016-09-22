var n = {
    s: {
        uXPath: "#xpathval"
    },
    load: function () {
        var xpath = ex.xpath;
          alert("xpath "+xpath);
        $(this.s.uXPath).html("<Span>"+xpath+"</Span>");
//        var html = "";
//        for (var i = 0; i < xpath.length; i++) {
//            html += "<li>" + xpath[i] + "</li>";
//        }
//        $(this.s.uXPath).html('');
//        $(this.s.uXPath).html(html);
    },
    init: function (selectors) {
        this.s = selectors;
        alert("Selectors "+selectors);
        this.load();
    }
};
//window.onload = n.init();
$(document).ready(function () {
    ex = chrome.extension.getBackgroundPage().ex;
    n.init({
        uXPath: "#xpathval"
    });
    
    //Stops the submit request
    $("#myAjaxRequestForm").submit(function(e){
           e.preventDefault();
    });
   
    //checks for the button click event
    $("#myButton").click(function(e){
          alert("button clicked");
            //get the form data and then serialize that
            dataString = $("#myAjaxRequestForm").serialize();
           
            //get the form data using another method 
           var xapthval = $("input#xapthval").val(); 
           var countryCode = $("input#countryCode").val(); 
           var countryCode = $("input#countryCode").val(); 
           dataString = "countryCode=" + countryCode;
           
            //make the AJAX request, dataType is set to json
            //meaning we are expecting JSON data in response from the server
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/POMGenerator/PomGenerateServlet",
                data : {
                xapthval : $('#xapthval').val(),
                actionval : $('#actionval').val(),
                fileName : $('#fileName').val()
                },
                dataType: "json",
               
                //if received a response from the server
                success: function( data, textStatus, jqXHR) {
                    //our country code was correct so we have some information to display
                     if(data.success){
   alert("submitted");
                     } 
                     //display error message
                     else {
                         $("#ajaxResponse").html("<div><b>Country code in Invalid!</b></div>");
                     }
                },
               
                //If there was no resonse from the server
                error: function(jqXHR, textStatus, errorThrown){
                     console.log("Something really bad happened " + textStatus);
                      $("#ajaxResponse").html(jqXHR.responseText);
                },
               
                //capture the request before it was sent to server
                beforeSend: function(jqXHR, settings){
                    //adding some Dummy data to the request
                    settings.data += "&dummyData=whatever";
                    //disable the button until we get the response
                    $('#myButton').attr("disabled", true);
                },
               
                //this is called after the response or error functions are finsihed
                //so that we can take some action
                complete: function(jqXHR, textStatus){
                    //enable the button 
                    $('#myButton').attr("disabled", false);
                }
     
            });        
    });

});