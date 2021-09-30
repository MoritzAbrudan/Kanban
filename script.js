setURL('http://gruppe-105.developerakademie.net/smallest_backend_ever');

// Einbinden Navi
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
    setTimeout(naviAnimation, 100);
}

// Navi Animation

function naviAnimation() {
    let url = window.location.href;


    if (url.endsWith('board.html')) {
        document.getElementById('board').classList.add('nav-animation');
    }

    if (url.endsWith('backlog.html')) {
        document.getElementById('backlog').classList.add('nav-animation');
    }

    if (url.endsWith('addTask.html')) {
        document.getElementById('addTask').classList.add('nav-animation');
    }

    if (url.endsWith('help.html')) {
        document.getElementById('help').classList.add('nav-animation');
    }

    if (url.endsWith('login.html')) {
        document.getElementById('login').classList.add('nav-animation');
    }

    if (url.endsWith('impressum.html')) {
        document.getElementById('impressum').classList.add('nav-animation');
    }
}