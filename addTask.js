let allTasks = [];

let category = ['Management', 'Marketing', 'Vertrieb', 'Buchhaltung'];
let urgency = ['Sehr Hoch', 'Hoch', 'Normal', 'Hat Zeit'];
let assignedTo = [{
        'name': 'Moritz',
        'email': 'moritz@info.de'
    },
    {
        'name': 'Destay',
        'email': 'destay@info.de',
    },
    {
        'name': 'Rohit',
        'email': 'rohit@info.de',
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
        //assignedTo: document.getElementById('assignedTo').value,
    }, );
    event.preventDefault();
    backend.setItem('allTasks', JSON.stringify(allTasks));
    document.getElementById('addTask').reset();
}