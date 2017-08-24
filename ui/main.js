
// Submit username

var submit = document.getElementById('submit_btn');
submit.onclick = function () {
    // Make a request to the server and send the name
      //create a request object
    var request = new XMLHttpRequest ();
    //capture the response and store it in a variable
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE)
        {  //take some action
        if (request.status === 200) {
             alert('Logged in successfully'); }
            else if(request.status=== 403) {
                alert('username/password is incorrect');
            } else if (request.status === 500) { 
                alert('Something went wrong with the server'); }
        }
            
    };
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
    //Make the request
    request.open('POST','http://nitstyagi0.imad.hasura-app.io/login' ,true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username: username, password: password}));
    // Capture the list of names and render it as a list
   
};