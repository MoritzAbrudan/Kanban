let allTasks = [];
let selectetPositions = [];

let category = ['Management', 'Marketing', 'Vertrieb', 'Buchhaltung'];
let urgency = ['Sehr Hoch', 'Hoch', 'Normal', 'Hat Zeit'];
let assignedTo = [{
        'name': 'Moritz',
        'email': 'moritz@info.de',
        'img': '',
    },
    {
        'name': 'Destay',
        'email': 'destay@info.de',
        'img': '',
    },
    {
        'name': 'Rohit',
        'email': 'rohit@info.de',
        'img': '',
    },
];

/**
 * 
 * Collection of functions wich are initiated onload
 */
async function init() {
    defineCategory();
    defineUrgency();
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem("allTasks")) || [];
}

function today() {
    let today = new Date();
    document.getElementById('date').setAttribute('min', today);
}

/**
 * 
 * Function for dropdown menu Category
 */
function defineCategory() {
    document.getElementById('category').innerHTML = '';
    for (let i = 0; i < category.length; i++) {
        const cat = category[i];
        document.getElementById('category').innerHTML += `
        <option value="${cat}">
        `;
    };
}

/**
 * 
 * Function for dropdown menu Urgency
 */
function defineUrgency() {
    document.getElementById('urgency').innerHTML = '';
    for (let i = 0; i < urgency.length; i++) {
        const urge = urgency[i];
        document.getElementById('urgency').innerHTML += `
        <option value="${urge}">
        `;
    };
}

/**
 * 
 * saves new task in array onsubmit
 */
function createTask(event) {
    allTasks.push({
        title: document.getElementById('title').value,
        category: document.getElementById('input-cat').value,
        description: document.getElementById('description').value,
        date: document.getElementById('date').value,
        urgency: document.getElementById('input-urge').value,
        status: `toDo`,
        assignedTo: selectetPositions,
    }, );
    event.preventDefault();
    backend.setItem('allTasks', JSON.stringify(allTasks));
    document.getElementById('addTask').reset();
}

function showPosition() {
    document.getElementById('containerWindow').classList.remove('d-none');
    document.getElementById('window').innerHTML = '';

    for (let i = 0; i < assignedTo.length; i++) {
        document.getElementById('window').innerHTML += `
        <div class="containerUser" id="${i}" onclick="addPosition(${i})">
            <div class="userImage">
                <img src="${assignedTo[i]['img']||'./img/face-women1.jpg'}">
            </div>
            <div class="userInfo">
                <span>${assignedTo[i]['name']}</span>
                <span>${assignedTo[i]['email']}</span>
            </div>
        </div>
        `;
    }
}

function hidePosition() {
    document.getElementById('containerWindow').classList.add('d-none');
}

function addPosition(i) {
    if (selectetPositions.includes(assignedTo[i])) {
        alert('Bitte eine andere Person auswählen. Die ausgewählte Person wurde bereits hinzugefügt.');
    } else {
        selectetPositions.push(assignedTo[i]);
        document.getElementById(i).classList.add('selected');
    }
}