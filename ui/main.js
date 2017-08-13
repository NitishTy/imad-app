//counter code
var button = document.getElementById('counter');
button.onclick = function() 
{
    //create a request object
    var request = new XMLHttpRequest ();
    //capture the response and store it in a variable
    request.onreadystate = function () {
        if (request.readystatus===XMLHttpRequest.DONE)
        {  //take some action
        if (request.status===200) {
            var counter = request.responseText;
            var span = document.getElementById('count');
            span.innerHTML = counter.toString();
        }
    }
    };
    //Make the request
    request.open('GET','http://nitstyagi0.imad.hasura-app.io/counter',true);
    request.send(null);
};
