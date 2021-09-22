let allTasks = [{
    "title": "Kanban Board erstellen",
    "category": "Management",
    "description": "Gruppenarbeit bei der Developerakademie",
    "date": "08.10.2021",
    "urgency": "normal",
    "assignedTo": "alle",
}, ];

let category = ['Management', 'Marketing', 'Retail', 'Accounting'];
let urgency = ['Very High', 'High', 'Normal', 'Got Time'];

/**
 * 
 * Collection of functions wich are initiated onload
 */
function init() {
    defineUrgency();
    defineUrgency();
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
        <option value="${cat}"></option>
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
        <option value="${urge}"></option>
        `;
    };
}

/**
 * 
 * Clears all input field of the form
 */
function clearAll() {
    document.getElementById('addTask').reset();
}

/**
 * 
 * saves new task in array
 */
function createTask() {
    allTasks.push({
        title: document.getElementById('title').value,
        //category: document.getElementById('category').value,
        //description: document.getElementById('description').value,
        //date: document.getElementById('date').value,
        //urgency: document.getElementById('urgency').value,
        //assignedTo: document.getElementById('assignedTo').value,
    }, );
}