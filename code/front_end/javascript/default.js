function init(){
	init_header();
	init_menu();
}

function init_header(){
	if(!sessionStorage.getItem("userid")){
		window.location.replace("index.html");
	}else{
		document.getElementById("welcome_section").innerHTML = "Welcome, " + sessionStorage.getItem("username")+".<br/>";
		document.getElementById("date_section").innerHTML = new Date() +".<br/>";
		setInterval(function(){ 
			document.getElementById("date_section").innerHTML = new Date() +".<br/>"; 
		}, 60000);
		document.getElementById("header").innerHTML += '<hr>';
	}
}

function init_menu(){
	document.getElementById("menu").innerHTML = 
		'<button id="home" class="menubtn" onclick="go_home()">Home</button>' +
		'<button id="daily_task" class="menubtn" onclick="go_daily_task()">Daily Tasks</button>' +
		'<button id="logout" class="menubtn" onclick="logout()">Logout</button>' +
		'<br/>'		
		;
}

function go_home(){
	window.location.replace("homepage.html");
}

function go_daily_task(){
	window.location.replace("daily_task.html");
}

function logout(){
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		//alert("state: "this.readyState + ", status: " + this.status);
		if (this.readyState == 4 && this.status == 200) {
			sessionStorage.clear();
			window.location.replace("index.html");
		} else if(this.readyState == 4 && this.status == 400){
			sessionStorage.clear();
			alert("Bad Request: Request is malformed.");
			window.location.replace("index.html");
		} else if(this.readyState == 4 && this.status == 401){
			sessionStorage.clear();
			alert("Unauthorized: Authentication failed.");
			window.location.replace("index.html");
		} else if(this.readyState == 4 && this.status == 500){
			sessionStorage.clear();
			alert("Internal Server Error: Back-end error.");
			window.location.replace("index.html");
		}
	};
	//xmlhttp.open("GET", "/api/logout", false);
	xmlhttp.open("GET", "dummy/logout.txt", false);
	xmlhttp.send(); 
}
