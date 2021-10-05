setURL('http://gruppe-105.developerakademie.net/smallest_backend_ever');
let allTasks = [];

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
    setTimeout(naviAnimation, 50);
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

    if (url.endsWith('start.html')) {
        document.getElementById('start').classList.add('nav-animation');
    }

    if (url.endsWith('impressum.html')) {
        document.getElementById('impressum').classList.add('nav-animation');
    }
}

// Teilt den Tasks Farben nach Eiligkeit zu
function chooseColor(array) {
    if (array['urgency'] == 'Hat Zeit') {
        color = 'green';
    } else if (array['urgency'] == 'Hoch') {
        color = 'orange';
    } else if (array['urgency'] == 'Sehr Hoch') {
        color = 'red';
    } else {
        color = 'blue';
    };
    return color;
};

// Lädt Array vom Server runter und gibt ihn in der Konsole aus
async function loadFromBackend() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
}

// Login Warnung
function nologin() {
    window.alert('Achtung! Login zurzeit ausser Betrieb. Bitte logge dich als Gast ein.');
}