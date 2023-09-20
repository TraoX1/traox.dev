function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function randomUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}


if (getCookie("browserKey").length < 1) {
    document.cookie = "browserKey=" + randomUUID();
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function checkIfLoggedIn() {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey")
    };
    fetch('https://traoxfish.us-3.evennode.com/checkkey', {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.validKey == "true") {
            window.location.replace("https://www.traox.dev/fish/fish");
        }
    });

}

checkIfLoggedIn()

function createAccount() {

    var username = document.getElementById("username").value
    var password = document.getElementById("password").value

    const data = {
        "username": username,
        "password": password,
        "browserKey": getCookie("browserKey")
    };
    fetch('https://traoxfish.us-3.evennode.com/register', {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.status == "success") {
            document.getElementById("accountstatus").textContent = "Account successfully created!"
            document.getElementById("accountstatus").style.color = "#84ea84";
            delay(2000).then(() => {
                document.getElementById("accountstatus").innerHTML = "<br>";
            });
            delay(500).then(() => { 
                login();
            });
        } else {
            document.getElementById("accountstatus").textContent = json.error;
            document.getElementById("accountstatus").style.color = "#ea7b7b";
            delay(2000).then(() => {
                document.getElementById("accountstatus").innerHTML = "<br>";
            });
        }
    });
}

function login() {
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value

    const data = {
        "username": username,
        "password": password
    };
    fetch('https://traoxfish.us-3.evennode.com/login', {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.status == "success") {
            document.getElementById("accountstatus").textContent = "Logged in!"
            document.getElementById("accountstatus").style.color = "#84ea84";
            document.cookie = "loginKey=" + json.key;
            document.cookie = "username=" + username;
            window.location.replace("https://www.traox.dev/fish/fish");
        } else {
            document.getElementById("accountstatus").textContent = json.error;
            document.getElementById("accountstatus").style.color = "#ea7b7b";
            delay(2000).then(() => {
                document.getElementById("accountstatus").innerHTML = "<br>";
            });
        }
    });
}
