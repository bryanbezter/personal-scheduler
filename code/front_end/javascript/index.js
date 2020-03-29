function is_valid_uname(uname){
	if(uname){
		return true;
	}else{
		alert("Please input a valid username.");
		return false;
	}
}

function is_valid_pass(pass){
	if(pass){
		return true;
	}else{
		alert("Please input a valid password.");
		return false;
	}
}

function login(){
	var uname = document.getElementById("uname").value;
	var pass = document.getElementById("pass").value;
	if(is_valid_uname(uname)==true && is_valid_pass(pass)==true){
		api_login(uname,pass);
	}
}

function api_login(uname,pass){
	var json_user = JSON.stringify({username:uname, password:pass}), xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myObj = JSON.parse(this.responseText);
			alert("Welcome, " + myObj.username);
			sessionStorage.setItem("userid", myObj.userid);
			sessionStorage.setItem("username", myObj.username);
			window.location.replace("homepage.html");
		} else if(this.readyState == 4 && this.status == 400){
			alert("Bad Request: Request is malformed.");
		} else if(this.readyState == 4 && this.status == 401){
			alert("Unauthorized: Authentication failed.");
		} else if(this.readyState == 4 && this.status == 409){
			alert("Conflict: User is already authenticated.");
		} else if(this.readyState == 4 && this.status == 429){
			alert("Too Many Requests: Auth limit is exceeded.");
		} else if(this.readyState == 4 && this.status == 500){
			alert("Internal Server Error: Back-end error.");
		}
	};
	//xmlhttp.open("POST", "/api/login", false);
	xmlhttp.open("POST", "dummy/login.txt", false);
	xmlhttp.send(json_user); 
}
