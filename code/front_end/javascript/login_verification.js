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

function login_manual(){
	var uname = document.getElementById("uname").value;
	var pass = document.getElementById("pass").value;
	if(is_valid_uname(uname)==true && is_valid_pass(pass)==true){
		alert("Logging in...");
		api_auth(uname,pass);
	}
}

function api_auth(uname,pass){
	var json_user = JSON.stringify({username:uname, password:pass}), xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myObj = JSON.parse(this.responseText);
			sessionStorage.setItem("userid", myObj.userid);
			sessionStorage.setItem("username", myObj.username);
			window.location.replace("code/front_end/home.html");
		} else if(this.readyState == 4 && this.status == 400){
			alert("Bad Request: Request is malformed.");
			window.location.replace("code/front_end//index.html");
		} else if(this.readyState == 4 && this.status == 401){
			alert("Unauthorized: Authentication failed.");
			window.location.replace("code/front_end//index.html");
		} else if(this.readyState == 4 && this.status == 409){
			alert("Conflict: User is already authenticated.");
			window.location.replace("code/front_end//index.html");
		} else if(this.readyState == 4 && this.status == 429){
			alert("Too Many Requests: Auth limit is exceeded.");
			window.location.replace("code/front_end//index.html");
		} else if(this.readyState == 4 && this.status == 500){
			alert("Internal Server Error: Back-end error.");
			window.location.replace("code/front_end//index.html");
		}
	};
	xmlhttp.open("POST", "/api/auth", false);
	//xmlhttp.open("POST", "/php/api_auth.txt", false);
	xmlhttp.send(json_user); 
}
